const inputLabel = Array.from(document.getElementsByClassName('input__label'));
const inputField = Array.from(document.getElementsByClassName('input__field'));
const loginBtn = document.getElementById('login__button');
const error = document.querySelector('.error__filed');

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
  if (userDetails.length === 2) return userDetails;
}

const validate = () => {
  const user = getData();
  if (typeof user !== 'undefined') {
    if (!isEmail(user[0])) return error.innerHTML = 'User Email is invalid'
    return this.userData = {
      email: user[0],
      password: user[1]
    }
  }
}

const isEmail = (email) => {
  return (email.match(/\S+@\S+\.\S+/));
}

async function userLogin() {
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

    const res = await fetch(`${baseUrl}/api/v1/auth/login`, fetchData);
    const data = await res.json();
    if (data.status === 'success') {
      localStorage.setItem('token', JSON.stringify(data.token));
      setTimeout((location.href = '../pages/dashboard.html'), 5000);
    }
    error.innerHTML = data.message;
  }
}


document.addEventListener('DOMContentLoaded', transformItems);
loginBtn.addEventListener('click', userLogin);