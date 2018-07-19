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
    console.log(req.url);
    return res.status(200).json({
      status: 'success',
      entriesDb,
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
    const { userId } = req.query.userId;
    console.log(userId);
    const diary = entriesDb.map((entry) => {
      if (entry.userId === userId) return entry;
    });
    if (typeof (diary[0]) !== 'undefined') {
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
}

export default EntriesController;
