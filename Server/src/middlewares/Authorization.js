import jwt from 'jsonwebtoken';
import config from '../config/config';
/**
 * @exports
 * @class Authorization
 * @description Protects route and handles token
 * got tips from (Treversy Media) https://www.youtube.com/watch?v=7nafaH9SddU&t=57s
 *  */
class Authorization {
  /**
   * Get the token from the request
   * @param  {object} req - Request object
   * @return {string} Returns the user token
   * @static
   */
  static getToken(req) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');

      const bearerToken = bearer[1];
      return bearerToken;
    }
    return 'error';
  }

  /**
   * Verifies the user token
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - calls the next middleware
   * @return {json} Returns json object
   * @static
   */
  static verifyToken(req, res, next) {
    const token = Authorization.getToken(req);

    if (!token || token === 'error' || typeof token === 'undefined') {
      return res.status(401).json({
        status: 'error',
        message: ' Unauthorized User can not access this page, please login or signup',
      });
    }
    jwt.verify(token, config.jwtSecret, (err, authData) => {
      if (err) {
        return res.status(403).json({
          status: 'error',
          message: ' Access forbidden, Invalid user token',
        });
      }
      req.authData = authData;
    });
    return next();
  }
}

export default Authorization;
