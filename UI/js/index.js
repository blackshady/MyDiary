let userDetails = [];


const inputLabel = Array.from((document.getElementsByClassName("input__label")));
const inputField = Array.from((document.getElementsByClassName("input__field")));
const siginUpBtn = document.getElementById("signup__button");
const loginBtn = document.getElementById("login__button");
const userMenuIcon = document.getElementsByClassName("menu__user")[0];
const logouBtn = document.getElementsByClassName("logout__btn")[0];
//EVENTS
document.addEventListener('DOMContentLoaded', transformLabel);

(siginUpBtn ? (siginUpBtn.addEventListener("click", validateSignup)) : 0);
(loginBtn ? (loginBtn.addEventListener("click", validateLogin)) : 0);
(userMenuIcon ? (userMenuIcon.addEventListener("click", DisplayLogoutBtn)) : 0);
(logouBtn ? (logouBtn.addEventListener("click", logoutUser)) : 0);

// Default action on DOM Load
function transformLabel() {
  for (let i = 0; i < inputField.length; i++) {
    inputField[i].focus();
    inputLabel[i].style.marginBottom = `21px`;
    inputLabel[i].style.fontSize = `12px`;
  }
}

// Validate Signup form
function validateSignup(e) {
  e.preventDefault();
  validateInputs();
  userDetails.length !== 6 ? userDetails = [] : (window.location.href = "../pages/dashboard.html");
}

// Validate login Form
function validateLogin(e) {
  e.preventDefault();
  validateInputs();
  userDetails.length !== 2 ? userDetails = [] : (window.location.href = "../pages/dashboard.html");
}

// checks if input field is empty
function validateInputs() {
  inputField.map((field) => {
    field.value !== "" ? ((userDetails.push(field.value)),
        (field.style.borderBottom = `solid 3px #3d272a`)) :
      (field.style.borderBottom = `solid 3px red`);
  });
}

// Logout the user

function DisplayLogoutBtn() {
  logouBtn.style.opacity = 1;
  setTimeout(() => {
    logouBtn.style.opacity = 0;
  }, 5000);
}

function logoutUser() {
  window.location.href = "../pages/index.html";
}