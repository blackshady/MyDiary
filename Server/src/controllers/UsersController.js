import cloudinary from 'cloudinary';
import database from '../config/databaseConnection';
import find from '../models/queries/find';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
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
    console.log(userid);
    const {
      rows,
    } = await database.query(find.userById, [userid]);
    console.log(rows[0]);
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

    cloudinary.uploader.upload(req.files.image.path, (result) => {});

    return res.status(201).json({
      status: 'success',
      message: 'image uploaded successful',
    });
  }
}


export default UsersController;
