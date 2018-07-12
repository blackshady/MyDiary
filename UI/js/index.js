const inputLabel = Array.from((document.getElementsByClassName("input__label")));
const inputField = Array.from((document.getElementsByClassName("input__field")));
const userMenuIcon = document.getElementsByClassName("menu__user")[0];
const eidthPostBtn = document.getElementsByClassName("edit__post")[0];
const postField = document.getElementsByClassName("story__text");
const titleField = document.getElementsByClassName("story__title");
const profileNameInput = document.getElementsByClassName("profile__name-i")[0];
const resetPassBtn = document.getElementsByClassName("reset__pass")[0];
const restPassInput = document.getElementsByClassName("reset__pass-i")[0];
const reminderBtn = document.getElementsByClassName("button__remind")[0];
const reminderContent = document.getElementsByClassName("reminder__item");
const leftPane = document.getElementsByClassName("l-left__pane")[0];
const rightPane = document.getElementsByClassName("l-right__pane")[0];
const middlePane = document.getElementsByClassName("l-middle__pane")[0];
const mainColumn = document.getElementsByTagName("section")[0];

const logoutBtn = document.getElementById("btn__logout");
const allEntriesBtn = document.getElementById("btn__all-entries");
const profileBtn = document.getElementById("btn__profile");
const mainAreaBtn = document.getElementById("btn__main-area");
const siginUpBtn = document.getElementById("signup__button");
const loginBtn = document.getElementById("login__button");
const changeNameBtn = document.getElementById("change__name");



//EVENTS
document.addEventListener('DOMContentLoaded', transformLabel);
window.addEventListener("resize", showAllPane);

(siginUpBtn ? (siginUpBtn.addEventListener("click", validateSignup)) : 0);
(loginBtn ? (loginBtn.addEventListener("click", validateLogin)) : 0);
(userMenuIcon ? (userMenuIcon.addEventListener("click", DisplayBtn)) : 0);
(logoutBtn ? (logoutBtn.addEventListener("click", logoutUser)) : 0);
(eidthPostBtn ? (eidthPostBtn.addEventListener("click", edithPost)) : 0);
(changeNameBtn ? (changeNameBtn.addEventListener("click", changeUserName)) : 0);
(resetPassBtn ? (resetPassBtn.addEventListener("click", resetPass)) : 0);
(reminderBtn ? (reminderBtn.addEventListener("click", setReminder)) : 0);
(profileBtn ? (profileBtn.addEventListener("click", showProfile)) : 0);
(allEntriesBtn ? (allEntriesBtn.addEventListener("click", showEntries)) : 0);
(mainAreaBtn ? (mainAreaBtn.addEventListener("click", showMainArea)) : 0);

let userDetails = [];
// Default action on DOM Load
function transformLabel() {
  for (let i = 0; i < inputField.length; i++) {
    inputField[i].focus();
    inputLabel[i].style.marginBottom = `21px`;
    inputLabel[i].style.fontSize = `12px`;
  }
  // button should not display init
  (allEntriesBtn ? (allEntriesBtn.style.display = "none") : 0);
  (profileBtn ? (profileBtn.style.display = "none") : 0);
  (mainAreaBtn ? (mainAreaBtn.style.display = "none") : 0);
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


function DisplayBtn() {
  this.lastElementChild.style.opacity = 1;
  if (window.innerWidth <= 730) {
    mainAreaBtn.style.display = "grid";
    profileBtn.style.display = "grid";
    allEntriesBtn.style.display = "grid";
  }


}

// Show all the Pane if on dom load
function showAllPane() {
  if (window.innerWidth > 730) {
    mainAreaBtn.style.display = "grid";
    profileBtn.style.display = "grid";
    allEntriesBtn.style.display = "grid";
    location.reload();
  }

}

function showProfile() {

  (middlePane ? middlePane.style.display = "none" : 0);
  (leftPane ? leftPane.style.display = "grid" : 0);
  (rightPane ? rightPane.style.display = "none" : 0);


}

function showMainArea() {

  (middlePane ? middlePane.style.display = "grid" : 0);
  (leftPane ? leftPane.style.display = "none" : 0);
  (rightPane ? rightPane.style.display = "none" : 0);

}

function showEntries() {

  (middlePane ? middlePane.style.display = "none" : 0);
  (leftPane ? leftPane.style.display = "none" : 0);
  (rightPane ? rightPane.style.display = "grid" : 0);

}


// Logout the user
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