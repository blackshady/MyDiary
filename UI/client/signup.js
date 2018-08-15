const inputLabel = Array.from(document.getElementsByClassName('input__label'));
const inputField = Array.from(document.getElementsByClassName('input__field'));
const siginUpBtn = document.getElementById('signup__button');
const error = document.querySelector('.error');

const baseUrl = 'https://my-1-and-only-diary.herokuapp.com';

// Default action on DOM Load
const transformItems = () => {
  inputLabel.forEach(field => {
    field.style.marginBottom = `21px`;
    field.style.fontSize = `12px`;
  });
};

const getData = () => {
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

const isEmail = (email) => {
  return (email.match(/\S+@\S+\.\S+/));
}

const validate = () => {
  const user = getData();
  if (typeof user !== 'undefined') {
    if (!isEmail(user[1])) return errors = 'User Email is invalid';

    return this.userData = {
      username: user[0],
      email: user[1],
      password: user[2]
    }
  }
}

async function userSignup() {
  const userData = validate();
  if (typeof userData === 'string') return (error.innerHTML = userData);
  if (typeof userData === 'object') {
    const fetchData = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userData)
    }
    const res = await fetch(`${baseUrl}/api/v1/auth/signup`, fetchData);
    const data = await res.json();
    if (data.status === 'success') {
      localStorage.setItem('token', JSON.stringify(data.token))
      location.href = '../pages/dashboard.html';
    }
    error.innerHTML = data.message;
  }
}

document.addEventListener('DOMContentLoaded', transformItems);
siginUpBtn.addEventListener('click', userSignup);