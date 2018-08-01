import Validator from './validators/Validator';
/**
 * @exports AuthValidation
 * @class AuthValidation
 * @description Handles all Authentication route validation
 * Status code tip gotten from https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 * */
class AuthValidator {
  /**
   * Validates user input values
   * @param  {req} req - Request object
   * @param {res} res - Request object
   * @param {next} next - calls next middleware
   * @return {res} Returns response message
   * @static
   */
  static validateLogin(req, res, next) {
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'fields must not be empty',
      });
    }
    if (!Validator.isMaxLen(email) || !Validator.isMaxLen(password)) {
      return res.status(400).json({
        status: 'error',
        message: 'Fields length must not be less than five',
      })
    }
    if (!Validator.isEmail(email)) {
      return res.status(400).json({
        status: 'error',
        message: 'It seems your email is not valid, or is incorrect',
      });
    }
    return next();
  }

  /**
   * Validates user input for sign up
   * @param  {req} req - Request object
   * @param {res} res - Request object
   * @param {next} next - calls next middleware
   * @return {res} Returns response message
   * @static
   */
  static validateSignup(req, res, next) {
    // const {
    //   userName,
    //   email,
    //   surname,
    //   firstName,
    //   phoneNumber,
    //   password,
    // } = req.body;

    // if (!userName || !email || !surname || !firstName || !phoneNumber || !password) {
    //   return res.status(400).json({
    //     status: 'error',
    //     message: 'fields must not be empty',
    //   });
    // }
    return next()
  }
}

export default AuthValidator;