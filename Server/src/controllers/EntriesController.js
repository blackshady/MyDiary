import database from '../config/databaseConnection';
import find from '../models/queries/find';
import insert from '../models/queries/insert';
import remove from '../models/queries/remove';
import update from '../models/queries/update';


/**
 * @exports
 * @class EntriesController
 */
class EntriesController {
  /**
   * Returns all Diary entries for an Authenticated user
   * @async
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} Returns json object
   * @static
   */
  static async getAllEntries(req, res) {
    const {
      userid,
    } = req.authData;
    //  check if user has an entry
    const {
      rows,
    } = await database.query(find.userEntries, [userid]);
    if (rows.length === 0) {
      return res.status(200).json({
        status: 'success',
        message: 'User does not have an entry yet',
      });
    }
    return res.status(200).json({
      status: 'success',
      entries: rows,
    });
  }

  /**
   * Create a  Diary entry
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} Returns json object
   * @static
   */
  static async createEntry(req, res) {
    const {
      userid,
    } = req.authData;
    const {
      title,
      story,
    } = req.body;

    const userData = [
      userid,
      title,
      story,
    ];
    const {
      rows,
    } = await database.query(insert.userEntries, userData);

    return res.status(201).json({
      status: 'success',
      message: 'entry created successfully',
      entries: rows,
    });
  }

  /**
   * Get a Specific diary entry
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} Returns json object
   * @static
   */
  static async getEntry(req, res) {
    const {
      entryId,
    } = req.params;
    const {
      userid,
    } = req.authData;

    const {
      rows,
    } = await database.query(find.specificUserDiary, [entryId, userid]);
    if (rows.length !== 0) {
      return res.status(200).json({
        status: 'success',
        message: ' entry found',
        dairy: rows[0],
      });
    }
    return res.status(404).json({
      status: 'error',
      message: 'Diary Entry can not be found',
    });
  }

  /**
   * delete a  Specific diary entry
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} Returns json object
   * @static
   */
  static async deleteDiary(req, res) {
    const {
      entryId,
    } = req.params;
    const {
      userid,
    } = req.authData;

    const {
      rows,
    } = await database.query(find.specificUserDiary, [entryId, userid]);

    if (rows.length !== 0) {
      await database.query(remove.userEntry, [entryId, userid]);
      return res.status(204).json({
        status: 'success',
        message: 'Diary entry deleted successfully',
      });
    }
    return res.status(404).json({
      status: 'error',
      message: 'Diary Entry can not be found',
    });
  }

  /**
   * modify a  Specific diary entry
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} Returns json object
   * @static
   */
  static async updateDiary(req, res) {
    const {
      entryId,
    } = req.params;
    const {
      userid,
    } = req.authData;

    // Check if the entry exist
    const {
      rows,
    } = await database.query(find.specificUserDiary, [entryId, userid]);
    if (rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Diary can not be found or does not exist',
      });
    }
    const oldData = rows[0];

    if (oldData) {
      const today = new Date();
      // get the diary content that existed
      const oldTitle = oldData.title;
      const oldStory = oldData.story;
      const time = new Date(oldData.created_at);
      time.setHours(time.getHours() + 24);

      if (today >= time) {
        return res.status(403).json({
          status: 'success',
          message: 'Sorry you can not update your diary after 24 hours',
        });
      }

      // get the users value
      const {
        title,
        story,
      } = req.body;

      const updatedAt = new Date();
      const userData = [title || oldTitle, story || oldStory, updatedAt, entryId, userid];

      const newValue = await database.query(update.userEntry, userData);
      return res.status(200).json({
        status: 'success',
        message: 'diary have been updated successfully',
        dairy: newValue.rows[0],
      });
    }
  }
}

export default EntriesController;
