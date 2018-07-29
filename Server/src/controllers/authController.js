import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import database from '../config/databaseConnection';
import find from '../models/queries/find.json';
import insert from '../models/queries/insert.json';


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
        success: 'success',
        message: `${username} is now logged in`,
        redirectUrl: 'https://mydiary.com/pages/index.html',
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
      userName,
      email,
      surname,
      firstName,
      phoneNumber,
      password,
    } = req.body;

    // Check if there is a user with an existing email

    const user = await database.query(find.userByEmail, [email]);

    if (typeof user.rows[0] !== 'undefined') {
      return res.status(400).json({
        status: 'error',
        message: 'User with this email already exist',
      });
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const credentials = [email, surname, userName, firstName, phoneNumber, passwordHash];

    database
      .query(insert.userCredentials, credentials)
      .then(({
        rows,
      }) => {
        const {
          userid,
          username,
        } = rows[0];
        const token = jwt.sign({
          userid,
          email,
          username,
        }, config.jwtSecret, {
          expiresIn: '24h',
        });
        res.status(201).json({
          status: 'success',
          message: 'Your account have been created successful',
          user: rows[0],
          token,
        });
      })
      .catch(err => res.status(500).json({
        message: err.message,
      }));
  }
}

export default AuthController;
