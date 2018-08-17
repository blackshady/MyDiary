import database from '../config/databaseConnection';
import find from '../models/queries/find';
/**
 * @exports
 * @class UsersController
 */
class UsersController {
  /**
   * Returns a specific  user details
   * @async
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} Returns json object
   * @static
   */
  static async getDetails(req, res) {
    const {
      userid,
    } = req.params;
    console.log(userid);
    const {
      rows,
    } = await database.query(find.userById, [userid]);
    console.log(rows);
    return res.status(200).json({
      status: 'success',
      rows,
    });
  }

  /**
   * Uploads the users image
   * @async
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} Returns json object
   * @static
   */
  static async uploadImage(req, res) {
    return res.status(201).json({
      status: 'success',
      message: 'image uploaded successful',
    });
  }
}


export default UsersController;
