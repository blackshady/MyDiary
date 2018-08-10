const inputField = Array.from(document.getElementsByClassName('input__field'));
const error = document.querySelector('.error');
import Validator from '../../utils/Validator';

/**
 * @exports Signup
 * @class Signup
 * @description Register visitor credentials to the app 
 * */
class Signup {
  constructor() {
    this.userData = {}
    this.fetchData = {}
    this.errors = '';
  }

  static getData() {
    const userDetails = [];
    inputField.map(field => {
      field.value !== '' ?
        (userDetails.push(
          field.value
        ), (field.style.borderBottom = `solid 3px #3d272a`)) :
        (field.style.borderBottom = `solid 3px red`);
    });
    if (userDetails.length === 3) return userDetails;
  }

  static validate() {
    const user = Signup.getData();
    if (typeof user !== 'undefined') {
      if (!Validator.isEmail(user[1])) return this.errors = 'User Email is invalid';

      return this.userData = {
        username: user[0],
        email: user[1],
        password: user[2]
      }
    }
  }

  async onSubmit() {
    const userData = await Signup.validate();
    if (typeof userData === 'string') return error.innerHTML = userData;
    if (typeof userData === 'object') {
      this.userData = userData;
      this.fetchData = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(this.userData)
      }
      const res = await fetch(`https://my-1-and-only-diary.herokuapp.com/api/v1/auth/signup`, this.fetchData)
      const data = await res.json();
      if (data.status === 'success') {
        window.location.href = '../pages/dashboard.html';
      }
      return error.innerHTML = data.message;
    }
  }

}
export default new Signup;