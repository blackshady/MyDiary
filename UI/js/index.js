// import AuthUser from '../client/AuthUser';

// const inputLabel = Array.from(
//   document.getElementsByClassName('input__label')
// );
// const inputField = Array.from(
//   document.getElementsByClassName('input__field')
// );
// const eidthPostBtn = document.getElementsByClassName('edit__post')[0];
// const postField = document.getElementsByClassName('story__text');
// const titleField = document.getElementsByClassName('story__title');
// const storyDisplay = document.getElementsByClassName('story__display');
// const titleDisplay = document.getElementsByClassName('title__display');
// const siginUpBtn = document.getElementById('signup__button');
// const loginBtn = document.getElementById('login__button');
// const userProfileIcon = document.getElementById('menu__user');
// const userProfileItem = document.getElementById('userProfileItem');
// const logoutBtn = document.getElementsByClassName('btn__logout')[0];
// let userDetails = [];

// // Default action on DOM Load
// const transformItems = () => {
//   inputLabel.forEach(field => {
//     field.style.marginBottom = `21px`;
//     field.style.fontSize = `12px`;
//   });
// };

// let hideItem = item => (item ? (item.style.display = 'none') : 0);
// let displayGrid = item => (item ? (item.style.display = 'grid') : 0);

// // Validate Signup form
// const validateSignup = e => {
//   e.preventDefault();
//   validateInputs();
//   if (userDetails.length !== 3) {
//     return userDetails = [];
//   }
//   const newUser = new AuthUser(userDetails[1], userDetails[2], userDetails[0]);
//   newUser.signUp().catch(err => console.log(err));
// };

// // Validate login Form
// const validateLogin = e => {
//   e.preventDefault();
//   validateInputs();
//   userDetails.length !== 2 ?
//     (userDetails = []) :
//     (window.location.href = '../pages/dashboard.html');
// };

// // checks if input field is empty
// let validateInputs = () => {
//   inputField.map(field => {
//     field.value !== '' ?
//       (userDetails.push(
//         field.value
//       ), (field.style.borderBottom = `solid 3px #3d272a`)) :
//       (field.style.borderBottom = `solid 3px red`);
//   });
// };

// // Logout the user
// const logoutUser = () => {
//   window.location.href = '../pages/index.html';
// };

// // Modify Post
// const edithPost = () => {
//   postField[0].value = storyDisplay[0].innerHTML.trim();
//   titleField[0].value = titleDisplay[0].innerHTML;
// };

// // display user profile
// if (userProfileIcon) {
//   userProfileIcon.addEventListener('click', event => {
//     event.stopPropagation();
//     displayGrid(userProfileItem);
//   });
// }

// // EVENTS
// document.addEventListener('DOMContentLoaded', transformItems);

// // hide user profile
// document.addEventListener('click', event => {
//   if (
//     event.target.id !== 'userProfileItem' ||
//     event.target.id == 'menu__user'
//   ) {
//     hideItem(userProfileItem);
//   }
// });

// if (logoutBtn) {
//   logoutBtn.addEventListener('click', logoutUser);
// }

// if (loginBtn) {
//   loginBtn.addEventListener('click', validateLogin);
// }

// if (siginUpBtn) {
//   siginUpBtn.addEventListener('click', validateSignup);
// }

// if (eidthPostBtn) {
//   eidthPostBtn.addEventListener('click', edithPost);
// }