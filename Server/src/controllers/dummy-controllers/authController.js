import bcrypt from 'bcrypt';
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
    const { email, password } = req.body;
    const userIsAuth = usersDb.find(user => user.email === email && user.password === password);
    if (userIsAuth) {
      return res.status(200).json({
        status: 'success',
        'redirect uri': 'https://mydiary.com/pages/index.html',
        userIsAuth,
      });
    }
    return res.status(401).json({
      error: 'Invalid Users Credentials',
    });
  }
}

export default AuthController;
