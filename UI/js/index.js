const inputLabel = Array.from((document.getElementsByClassName("input__label")));
const inputField = Array.from((document.getElementsByClassName("input__field")));
const siginUpBtn = document.getElementById("signup__button");
const loginBtn = document.getElementById("login__button");
const userMenuIcon = document.getElementsByClassName("menu__user")[0];
const logouBtn = document.getElementsByClassName("logout__btn")[0];
const eidthPostBtn = document.getElementsByClassName("edit__post")[0];
const postField = document.getElementsByClassName("story__text");
const titleField = document.getElementsByClassName("story__title");
const changeNameBtn = document.getElementById("change__name");
const profileNameInput = document.getElementsByClassName("profile__name-i")[0];
const resetPassBtn = document.getElementsByClassName("reset__pass")[0];
const restPassInput = document.getElementsByClassName("reset__pass-i")[0];
const reminderBtn = document.getElementsByClassName("button__remind")[0];
const reminderContent = document.getElementsByClassName("reminder__item");

//EVENTS
document.addEventListener('DOMContentLoaded', transformLabel);

(siginUpBtn ? (siginUpBtn.addEventListener("click", validateSignup)) : 0);
(loginBtn ? (loginBtn.addEventListener("click", validateLogin)) : 0);
(userMenuIcon ? (userMenuIcon.addEventListener("click", DisplayLogoutBtn)) : 0);
(logouBtn ? (logouBtn.addEventListener("click", logoutUser)) : 0);
(eidthPostBtn ? (eidthPostBtn.addEventListener("click", edithPost)) : 0);
(changeNameBtn ? (changeNameBtn.addEventListener("click", changeUserName)) : 0);
(resetPassBtn ? (resetPassBtn.addEventListener("click", resetPass)) : 0);
(reminderBtn ? (reminderBtn.addEventListener("click", setReminder)) : 0);

let userDetails = [];
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

// Modify Post
function edithPost() {
  let postInField = postField[0];
  let postOutField = postField[1];
  let titleInField = titleField[0];
  let titleOutField = titleField[1];
  titleInField.value = titleOutField.innerHTML.trim();
  postInField.innerHTML = postOutField.value;
}

// Modify user Details
let numClick = 0;

function changeUserName() {
  (numClick == 1 ? ((profileNameInput.style.display = "none"), (numClick = 0)) : ((profileNameInput.style.display = "inline"), (numClick = 1)));
}
// Reset Password
let passNumClick = 0;

function resetPass() {
  (passNumClick == 1 ? ((restPassInput.style.display = "none"), (passNumClick = 0)) : ((restPassInput.style.display = "inline"), (passNumClick = 1)));
};

// set Reminder
let remClick = 0;

function setReminder() {

  if (remClick == 1) {
    reminderContent[0].style.display = "none";
    reminderContent[1].style.display = "none";
    remClick = 0;
  } else {
    reminderContent[0].style.display = "inline";
    reminderContent[1].style.display = "inline";
    remClick++;
  }

}