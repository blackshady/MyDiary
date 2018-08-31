// const email = document.querySelector('.password__field');
// const message = document.querySelector('.message');
// const passwordInput = document.querySelector('.password__field');
// const passwordInputVerify = document.querySelector('.password__field-verify');
// const restPasswordBtn = document.querySelector('.reset_pass-btn');

// const validateToken = () => {
//   // const isValid = false;
//   const token = location.search.substring(1).split("=")[1];
//   if (typeof token === 'undefined' || token === '') return window.location.replace('invalidToken.html');
//   return token;
//   // !isValid && window.location.replace('invalidToken.html');
// }

// async function resetPassword(e) {
//   e.preventDefault();
//   const token = validateToken();
//   if (passwordInput.value === '' || passwordInputVerify.value === '') {
//     message.innerHTML = '';
//     return message.innerHTML = 'fields should not be empty'
//   }
//   if (passwordInput.value !== passwordInputVerify.value) {
//     message.innerHTML = '';
//     return message.innerHTML = 'Password does not match';
//   }
//   if ((passwordInput.value.length) < 5 || (passwordInputVerify.value.length) < 5) {
//     message.innerHTML = '';
//     return message.innerHTML = 'Password length must be greater than five';
//   }
//   const password = passwordInput.value;
//   const userData = {
//     password,
//   };

//   const fetchData = {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json',
//     },
//     body: JSON.stringify(userData)
//   }
//   const res = await fetch(`https://my-1-and-only-diary.herokuapp.com/api/v1/auth/reset_password?token=${token}`, fetchData);
//   const data = await res.json();
//   if (data.status === 'success') {
//     message.innerHTML = '';
//     return message.innerHTML = data.message;
//   }
//   if (data.status === 'error') return window.location.replace('invalidToken.html');
// }

// //window.onload = validateToken;
// document.addEventListener('DOMContentLoaded', validate);
// document.addEventListener('submit', resetPassword);