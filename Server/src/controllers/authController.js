import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import database from '../config/databaseConnection';
import find from '../models/queries/find.json';


/**
 * @exports
 * @class AuthController
 * @description Handles the Sigin and logout of a user
 * Got tips from   https://node-postgres.com/guides/async-express
 *
 *  */
class AuthController {
  /**
   * Authenticate and Login the User to the application
   * @async
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} Returns json object
   * @static
   */
  static async login(req, res) {
    const {
      email,
      password,
    } = req.body;

    const {
      user,
    } = await database.query(find.userByEmail, [email]);
    if (user[0] && bcrypt.compareSync(password, user[0].passwordHash)) {
      const {
        userId,
        userName,
      } = user[0];
      // Create token for the user
      const token = jwt.sign({
          userId,
          email,
          userName,
        },
        config.jwtSecret, {
          expiresIn: '24h',
        });
      return res.status(200).json({
        success: 'success',
        message: `${userName} is now logged in`,
        'redirect url: '
        https: //mydiary.com/pages/index.html',
          token
      });
    }
    return res.status(401).json({
      status: 'error',
      message: 'Invalid Users Credentials',
    });
  }


  /**
   * The Number off diary entries since registration to the application
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} Returns json object
   * @static
   */
  static getNumberOfEntries(req, res) {
    const {
      userId,
    } = req.params;
    const userTotalEntries = usersDb.find(user => user.userId === parseInt(userId, 10));
    if (userTotalEntries && userTotalEntries.totalCreatedEntries !== '') {
      return res.status(200).json({
        status: 'success',
        totalNumberOfEntries: userTotalEntries.totalCreatedEntries,
      });
    }
    return res.status(404).json({
      status: 'error',
      message: 'no entry created yet',
    });
  }
}

export default AuthController;