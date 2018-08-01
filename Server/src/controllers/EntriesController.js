import moment from 'moment';
import database from '../config/databaseConnection';
import find from '../models/queries/find.json';
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
}

export default EntriesController;
