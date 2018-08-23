import database from '../config/databaseConnection';
import find from '../models/queries/find';
import update from '../models/queries/update';


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
    } = req.authData;
    const {
      rows,
    } = await database.query(find.userById, [userid]);
    return res.status(200).json({
      status: 'success',
      user: rows[0],
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
    const {
      imageUrl,
      userid,
    } = req.imageData;

    const {
      rows,
    } = await database.query(update.userImage, [imageUrl, userid]);

    return res.status(200).json({
      status: 'success',
      message: 'image uploaded successful',
      image: rows,
    });
  }
}


export default UsersController;