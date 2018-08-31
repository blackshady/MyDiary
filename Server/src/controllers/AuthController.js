import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import database from '../config/databaseConnection';
import find from '../models/queries/find';
import insert from '../models/queries/insert';
import update from '../models/queries/update';
import Mailer from '../utils/Mailer';


/**
 * @exports AuthController
 * @class AuthController
 * @description Handles the Sigin and logout of a user
 * Got tips from   https://node-postgres.com/guides/async-express
 * */
class AuthController {
  /**
   * Authenticate and Login the User to the application
   * @async
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} Returns json object
   * @static
   */
  // eslint-disable-next-line
  static async login(req, res) {
    const {
      email,
      password,
    } = req.body;
    const {
      rows,
    } = await database.query(find.userByEmail, [email]);
    if (rows[0] && bcrypt.compareSync(password, rows[0].passwordhash)) {
      const {
        userid,
        username,
      } = rows[0];
      // Create token for the user
      const token = jwt.sign({
        userid,
        email,
        username,
      },
      config.jwtSecret, {
        expiresIn: '24h',
      });
      return res.status(200).json({
        status: 'success',
        message: 'Login successfully',
        token,
      });
    }
    return res.status(401).json({
      status: 'error',
      message: 'Invalid Users Credentials',
    });
  }

  /**
   * Register the Users Account to the application
   * @async
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} Returns json object
   * @static
   */
  // eslint-disable-next-line
  static async signUp(req, res) {
    const {
      username,
      email,
      password,
    } = req.body;

    // Check if there is a user with an existing email

    const user = await database.query(find.userByEmail, [email]);

    if (typeof user.rows[0] !== 'undefined') {
      return res.status(409).json({
        status: 'error',
        message: 'User with this email already exist',
      });
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const credentials = [email, username, passwordHash];

    database
      .query(insert.userCredentials, credentials)
      .then(({
        rows,
      }) => {
        const {
          userid,
          userName,
        } = rows[0];
        const token = jwt.sign({
          userid,
          email,
          userName,
        }, config.jwtSecret, {
          expiresIn: '24h',
        });
        database.query(update.defualtTotalEntry, [userid]);
        return res.status(201).json({
          status: 'success',
          message: 'Your account have been created successful',
          token,
        });
      })
      .catch(err => res.status(500).json({
        message: err.message,
      }));
  }


  /**
   * Sends password reset link to user
   * @async
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} Returns json object
   * @static
   */
  static async resetPasswordRequest(req, res) {
    const {
      email,
    } = req.body;

    const {
      rows,
    } = await database.query(find.userByEmail, [email]);
    if (rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'user with this email does not exist',
        user: rows,
      });
    }
    const token = jwt.sign({
      email,
    },
    process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    await Mailer.sendResetPasswordEmail(email, token);
    return res.status(200).json({
      status: 'success',
      message: 'please check your mail',
    });
  }

  /**
   * validate password reset token and rest password
   * @async
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} Returns json object
   * @static
   */
  static async resetPassword(req, res) {
    const {
      token,
    } = req.query;

    await jwt.verify(token, config.jwtSecret, (err, authData) => {
      if (err) {
        return res.status(400).json({
          status: 'error',
          message: 'Password reset token has expired or is Invalid',
        });
      }
      if (authData) {
        console.log(authData);
        const {
          password,
        } = req.body;
        const {
          email,
        } = authData;
        const passwordHash = bcrypt.hashSync(password, 10);
        database.query(update.userPassword, [passwordHash, email]);
        Mailer.resetPasswordConfirmation(email);

        res.status(200).json({
          status: 'success',
          message: 'Password reset successful',
        });
      }
    });
  }
}

export default AuthController;
