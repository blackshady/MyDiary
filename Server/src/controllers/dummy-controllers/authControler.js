import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import usersDb from '../../models/dummy-db/Users.json';


/**
 * @exports
 * @class AuthController
 */
class AuthController {
  /**
   * Authenticate and Login the User to the application
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} Returns json object
   * @static
   */
  static login(req, res) {
    const { email, password } = res.body;
    const userIsAuth = usersDb.find(user => user.email === email && user.password === password);
    if (userIsAuth) {
      return res.status(200).json({
        status: 'success',
        userIsAuth,
        'redirect uri': 'https://mydiary.com/pages/index.html',
      });
    }
    return res.status(401).json({
      error: 'Invalid Users Credentials',
    });
  }
}

export default AuthController;
