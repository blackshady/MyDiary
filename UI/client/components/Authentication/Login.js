const inputField = Array.from(document.getElementsByClassName('input__field'));
const error = document.querySelector('.error__filed');
import Validator from '../../utils/Validator';

/**
 * @exports Login
 * @class Login
 * @description Login in a user to the application
 * */
class Login {
  constructor() {
    this.userData = {};
    this.fetchData = {};
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
    if (userDetails.length === 2) return userDetails;
  }

  static validate() {
    const user = Login.getData();
    if (typeof user !== 'undefined') {
      if (!Validator.isEmail(user[0])) return this.errors = 'User Email is invalid';

      return this.userData = {
        email: user[0],
        password: user[1]
      }
    }
  }


  async onSubmit() {
    const userData = await Login.validate();
    if (typeof userData === 'string') return (error.innerHTML = userData);
    if (typeof userData === 'object') {
      this.userData = userData;
      this.fetchData = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(this.userData)
      }
      const res = await fetch(`http://localhost:9000/api/v1/auth/login`, this.fetchData)
      const data = await res.json();
      if (data.status === 'success') {
        localStorage.setItem('token', JSON.stringify(data.token))
        location.href = '../pages/dashboard.html';

      }
      error.innerHTML = '';
      return error.innerHTML = data.message;
    }
  }

}

export default new Login;