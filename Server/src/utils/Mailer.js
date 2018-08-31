import nodemailer from 'nodemailer';
import config from '../config/config';


const url = process.env.BASE_URL;

class Mailer {
  /**
   * Sends mail
   * @async
   * @param  {string} to - to whom the mail would be sent to
   * @param {string} subject - the subject of the mail
   * @param {text} text - message to be sent
   * @return {nothing} Returns json object
   * @static
   */
  static async sendMail({
    to,
    subject,
    text,
  }) {
    const transporter = nodemailer.createTransport(config.stmpConfig);

    const mailOptions = {
      from: '"My Diary" <noreply@my-1-and-only-diary.com>',
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
  }


  /**
   * Mail reset password link to user
   * @async
   * @method sendResetPasswordEmail
   * @param {string} token
   * @param {string} email
   * @returns {nothing} returns nothing
   * @static
   */
  static async sendResetPasswordEmail(email, token) {

    return await Mailer.sendMail({
      to: email,
      subject: 'Reset Password',
      text: `To reset password follow this link  
      https://${url}/reset_password.html?token=${token}`,
    });
  }
  /**
   * Mail password reset confarmation 
   * @method resetPasswordConfirmation
   * @param {string} email
   * @returns {objuct} returns nothing
   */
  static async resetPasswordConfirmation(email) {
    return await Mailer.sendMail({
      to: email,
      subject: 'Password Reset successful',
      text: `Your Password has been reset successfully`,
    });
  }
}

export default Mailer;