const inputLabel = Array.from(document.getElementsByClassName('input__label'));
const siginUpBtn = document.getElementById('signup__button');
const loginBtn = document.getElementById('login__button');
import Signup from '../components/Authentication/Signup';
import Login from '../components/Authentication/Login';

class AuthPage {
  constructor() {
    this.transformItems();
  }

  // Default action on DOM Load
  transformItems() {
    inputLabel.forEach(field => {
      field.style.marginBottom = `21px`;
      field.style.fontSize = `12px`;
    });
    if (siginUpBtn) siginUpBtn.addEventListener('click', Signup.onSubmit);
    if (loginBtn) loginBtn.addEventListener('click', Login.onSubmit)
  };

}

document.addEventListener('DOMContentLoaded', (e) => new AuthPage());