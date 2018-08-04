import Validator from './validators/Validator';

/**
 * @exports EntriesValidator
 * @class EntriesValidator
 * @description Handles all entries validation
 * Status code tip gotten from https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 * */
class EntriesValidator {
  /**
   * Validates values for create entry route
   * @param  {req} req - Request object
   * @param {res} res - Request object
   * @param {next} next - calls next middleware
   * @return {res} Returns  response
   * @static
   */
  static validateCreateEntry(req, res, next) {
    const {
      title,
      story,
    } = req.body;

    if (!title || !story) {
      return res.status(400).json({
        status: 'error',
        message: 'Bad request, fields should not be empty',
      });
    }

    if (Validator.isEmpty(title) || Validator.isEmpty(story)) {
      return res.status(400).json({
        status: 'error',
        message: 'please ensure you provide a Title and a Story',
      });
    }
    if (!Validator.isMaxLen(title) || !Validator.isMaxLen(story)) {
      return res.status(400).json({
        status: 'error',
        message: 'Fields length must not be less than five',
      });
    }

    req.body = {
      title: title.trim(),
      story: story.trim(),
    };
    return next();
  }

  /**
   * Validates the params to get the entry
   * @param  {req} req - Request object
   * @param {res} res - Request object
   * @param {next} next - calls next middleware
   * @return {res} Returns  response
   * @static
   */
  static validateParams(req, res, next) {
    const {
      entryId,
    } = req.params;
    if (!Validator.isNumber(entryId)) {
      return res.status(400).json({
        status: 'error',
        message: 'Entry Id should be a number',
      });
    }
    return next();
  }

  /**
   * Validates input to of the diary
   * @param  {req} req - Request object
   * @param {res} res - Request object
   * @param {next} next - calls next middleware
   * @return {res} Returns  response
   * @static
   */
  static validateModifyEntry(req, res, next) {
    const {
      title,
      story,
    } = req.body;
    if ((title && title.length > 50)) {
      return res.status(400).json({
        status: 'error',
        message: 'Title should not be more than 50 characters',
      });
    }
    req.body = {
      title: (title && title.trim()),
      story: (story && story.trim()),
    };
    return next();
  }
}

export default EntriesValidator;