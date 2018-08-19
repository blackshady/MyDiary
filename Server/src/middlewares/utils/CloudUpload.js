import cloudinary from 'cloudinary';


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
/**
 * @exports
 * @class UsersController
 */
class CloudUpload {
  /**
   * Stores users image on cloud
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - calls the next middleware
   * @return {json} Returns json object
   * @static
   */
  static async uploadToCloud(req, res, next) {
    const {
      userid,
    } = req.authData;
    const content = await (cloudinary.uploader.upload(req.files.image.path, result => result));
    const imageUrl = content.secure_url;
    req.imageData = {
      imageUrl,
      userid,
    };
    return next();
  }
}
export default CloudUpload;