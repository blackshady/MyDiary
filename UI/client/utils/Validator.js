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
    return (email.match(/\S+@\S+\.\S+/));
  }

}