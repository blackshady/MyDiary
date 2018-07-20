import moment from 'moment';
import entriesDb from '../../models/dummy-db/Entries.json';

/**
 * @exports
 * @class EntriesController
 */
class EntriesController {
  /**
   * Returns all Diary entries
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} Returns json object
   * @static
   */
  static getAllEntries(req, res) {
    if (entriesDb.length !== 0) {
      return res.status(200).json({
        status: 'success',
        entriesDb,
      });
    }
    return res.status(404).json({
      status: 'error',
      message: 'No entry found',
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
    const { entryId } = req.params;
    const diary = entriesDb.find(entry => entry.entryId === entryId);
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
  static createEntry(req, res) {
    const { title, story } = req.body;
    let userId, entryId;
    if (entriesDb.length === 0) {
      userId = 1;
      entryId = 1;
    } else {
      userId = String(entriesDb.length + 1);
      entryId = String(entriesDb.length + 1);
    }
    const createdAt = moment().format('MMMM DD YYYY, h:mm:s A z').trim();
    const newDiary = {
      userId,
      entryId,
      title,
      story,
      createdAt,
    };
    if ((title.length && story.length) !== 0) {
      entriesDb.push(newDiary);
      return res.status(201).json({
        status: 'success',
        message: 'entry created successfully ',
        entriesDb,
      });
    }
    return res.status(409).json({
      status: 'error',
      message: 'fail to save entry',
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
    const { entryId } = req.params;
    const entryIndex = entriesDb.findIndex(entry => entry.entryId === entryId);
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
    const { entryId } = req.params;
    const { title, story } = req.body;
    const entryIndex = entriesDb.findIndex(entry => entry.entryId === entryId);
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
