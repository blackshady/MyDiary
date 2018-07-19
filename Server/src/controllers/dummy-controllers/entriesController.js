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
      message: 'no entry found',
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
    const { userId } = req.params;
    const diary = new Set(entriesDb.map((entry) => {
      if (entry.userId === userId) {
        return entry;
      }
    }));
    diary.delete(undefined);
    if (diary.size !== 0) {
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
