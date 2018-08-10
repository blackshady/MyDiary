const inputLabel = Array.from(document.getElementsByClassName('input__label'));
const siginUpBtn = document.getElementById('signup__button');
import Signup from '../components/Authentication/Signup';

class SignupPage {
  constructor() {
    this.transformItems();
  }

  // Default action on DOM Load
  transformItems() {
    inputLabel.forEach(field => {
      field.style.marginBottom = `21px`;
      field.style.fontSize = `12px`;
    });
    siginUpBtn.addEventListener('click', Signup.onSubmit);
  };

}

document.addEventListener('DOMContentLoaded', (e) => new SignupPage());