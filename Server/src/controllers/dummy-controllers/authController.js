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
    const isUser = usersDb.find(user => user.email === email);
    if (isUser && bcrypt.compareSync(password, isUser.passwordHash)) {
      return res.status(200).json({
        status: 'success',
        'redirect uri': 'https://mydiary.com/pages/index.html',
        isUser,
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
    const { userId } = req.params;
    const userTotalEntries = usersDb.find(user => user.userId === userId);
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
