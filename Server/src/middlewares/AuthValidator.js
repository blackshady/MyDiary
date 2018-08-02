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

    if (!email) {
      return res.status(400).json({
        status: 'error',
        message: 'Email must not be empty',
      });
    }
    if (!password) {
      return res.status(400).json({
        status: 'error',
        message: 'Password must not be empty',
      });
    }
    if (!Validator.isMaxLen(email) || !Validator.isMaxLen(password)) {
      return res.status(400).json({
        status: 'error',
        message: 'Fields length must not be less than five',
      });
    }
    if (!Validator.isEmail(email)) {
      return res.status(400).json({
        status: 'error',
        message: 'It seems your email is not valid, or is incorrect',
      });
    }
    req.body = {
      email: email.trim(),
      password,
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
    const {
      username,
      email,
      surname,
      firstname,
      phonenumber,
      password,
    } = req.body;
    if (!username) {
      return res.status(400).json({
        status: 'error',
        message: 'username must not be empty',
      });
    }
    if (!email) {
      return res.status(400).json({
        status: 'error',
        message: 'email must not be empty',
      });
    }
    if (!surname) {
      return res.status(400).json({
        status: 'error',
        message: 'surname must not be empty',
      });
    }
    if (!firstname) {
      return res.status(400).json({
        status: 'error',
        message: 'firstname must not be empty',
      });
    }
    if (!phonenumber) {
      return res.status(400).json({
        status: 'error',
        message: 'phonenumber must not be empty',
      });
    }
    if (!password) {
      return res.status(400).json({
        status: 'error',
        message: 'password must not be empty',
      });
    }
    if (!Validator.isMaxLen(email) || !Validator.isMaxLen(password) || !Validator.isMaxLen(firstname) || !Validator.isMaxLen(username) || !Validator.isMaxLen(surname) || !Validator.isMaxLen(phonenumber)) {
      return res.status(400).json({
        status: 'error',
        message: 'Fields length must not be less than five',
      });
    }
    if (!Validator.isEmail(email)) {
      return res.status(400).json({
        status: 'error',
        message: 'It seems your email is not valid, or is incorrect',
      });
    }
    if (!Validator.isNumber(phonenumber)) {
      return res.status(400).json({
        status: 'error',
        message: 'Please enter a valid Phone Number',
      });
    }
    req.body = {
      username: username.trim(),
      email: email.trim(),
      surname: surname.trim(),
      firstname: firstname.trim(),
      phonenumber: phonenumber.trim(),
      password,
    }
    return next();
  }
}

export default AuthValidator;