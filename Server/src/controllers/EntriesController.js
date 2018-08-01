import database from '../config/databaseConnection';
import find from '../models/queries/find';
import insert from '../models/queries/insert';


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
    const createdAt = new Date();
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
}

export default EntriesController;
