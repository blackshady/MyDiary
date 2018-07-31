import moment from 'moment';
import database from '../config/databaseConnection';
import find from '../models/queries/find.json';
import entriesDb from '../models/dummy-db/Entries.json';
import insert from '../models/queries/insert.json';


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
      return res.status(404).json({
        status: 'error',
        message: 'User does not have an entry yet',
      });
    }
    return res.status(200).json({
      status: 'success',
      entries: rows,
    });
  }

  /**
   * Returns a specific Diary entries
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} Returns json object
   * @static
   */
  static getEntry(req, res) {
    const {
      entryId,
    } = req.params;
    const diary = entriesDb.find(entry => entry.entryId === parseInt(entryId, 10));
    if (diary) {
      return res.status(200).json({
        status: 'success',
        diary,
      });
    }
    return res.status(404).json({
      status: 'error',
      message: 'Diary not found',
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
    if (!title && !story) {
      return res.status(400).json({
        status: 'error',
        message: 'Bad Request, fail to save entry, filed cannot be empty',
      });
    }
    const createdAt = moment().format('MMMM DD YYYY, h:mm:s A z').trim();
    const userData = [
      userid,
      title,
      story,
      createdAt,
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
   * Delete a Diary entry
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} Returns json object
   * @static
   */
  static deleteEntry(req, res) {
    const {
      entryId,
    } = req.params;
    const entryIndex = entriesDb.findIndex(entry => entry.entryId === parseInt(entryId, 10));
    if (entryIndex !== -1) {
      entriesDb.splice(entryIndex, 1);
      return res.status(200).json({
        status: 'success',
        message: 'Entry has be deleted successfully',
        entriesDb,
      });
    }
    return res.status(404).json({
      status: 'error',
      message: 'Entry not Found',
    });
  }

  /**
   * update the content of an entry
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} Returns json object
   * @static
   */
  static updateEntry(req, res) {
    const {
      entryId,
    } = req.params;
    const {
      title,
      story,
    } = req.body;
    const entryIndex = entriesDb.findIndex(entry => entry.entryId === parseInt(entryId, 10));
    if (entryIndex !== -1) {
      entriesDb[entryIndex].title = title || entriesDb[entryIndex].story;
      entriesDb[entryIndex].story = story || entriesDb[entryIndex].story;
      entriesDb[entryIndex].lastModified = moment().format('MMMM DD YYYY, h:mm:s A z').trim();
      return res.status(200).json({
        status: 'success',
        message: 'Entry updated successfully',
        entriesDb: entriesDb[entryIndex],
      });
    }
    return res.status(404).json({
      status: 'error',
      message: 'Entry not Found',
    });
  }
}

export default EntriesController;