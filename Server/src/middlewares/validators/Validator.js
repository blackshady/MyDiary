/**
 * @exports Validator
 * @class Validator
 * @description  Contains simple validation Methods
 *  */
export default class Validator {
  /**
   * @param{String} email - the email be verified
   * @return {Boolean} Returns boolean
   */
  static isEmail(email) {
    return email.matches(/\S+@\S+\.\S+/);
  }

  /**
   * @param  {String} value - the value to verify if it empty
   * @returns  {Boolean} Returns boolean
   */
  static isEmpty(value) {
    return (value.length === 0 || value === '' || typeof value === 'undefined');
  }

  /**
   * @param  {String} data - the value to verify the length is up to 5
   * @returns  {Boolean} Returns boolean
   */
  static isMaxLen(data) {
    return data.length >= 5;
  }

  /**
   * @param  {number} number - the value to verify if it is a number
   * @returns  {Boolean} Returns boolean
   */
  static isNumber(number) {
    return number.matches(/[0-9]g/);
  }
}