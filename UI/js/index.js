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

let userDetails = [];

// Default action on DOM Load
let transformItems = () => {
  inputLabel.forEach((field) => {
    field.style.marginBottom = `21px`;
    field.style.fontSize = `12px`;
  });
  hideItem(allEntriesBtn);
  hideItem(profileBtn);
  hideItem(profileBtn);
  hideItem(mainAreaBtn);
};

let hideItem = (item) => (item ? (item.style.display = "none") : 0);


// Validate Signup form
let validateSignup = (e) => {
  e.preventDefault();
  validateInputs();
  userDetails.length !== 6 ? userDetails = [] : (window.location.href = "../pages/dashboard.html");
};


// Validate login Form
let validateLogin = (e) => {
  e.preventDefault();
  validateInputs();
  userDetails.length !== 2 ? userDetails = [] : (window.location.href = "../pages/dashboard.html");
};

// checks if input field is empty
let validateInputs = () => {
  inputField.map((field) => {
    field.value !== "" ? ((userDetails.push(field.value)),
        (field.style.borderBottom = `solid 3px #3d272a`)) :
      (field.style.borderBottom = `solid 3px red`);
  });
};

let menuClick = 0;
let DisplayBtn = () => {
  (menuClick == 1 ? ((hideItem(userMenuIcon.lastElementChild)), (menuClick = 0)) : ((displayGrid(userMenuIcon.lastElementChild)), (menuClick = 1)));
  userMenuIcon.lastElementChild.style.opacity = 1;
  if (window.innerWidth <= 730) {
    displayGrid(mainAreaBtn);
    displayGrid(profileBtn);
    displayGrid(allEntriesBtn);
  }
};

let displayGrid = (item) => (item ? (item.style.display = "grid") : 0);


// Show all the Pane if on dom load
let showAllPane = () => {
  if (window.innerWidth > 730) {
    displayGrid(mainAreaBtn);
    displayGrid(profileBtn);
    displayGrid(allEntriesBtn);
    location.reload();
  }
};

let showProfile = () => {
  displayGrid(leftPane);
  hideItem(rightPane);
  hideItem(middlePane);
};

let showMainArea = () => {
  displayGrid(middlePane);
  hideItem(rightPane);
  hideItem(leftPane);
};

let showEntries = () => {
  displayGrid(rightPane);
  hideItem(middlePane);
  hideItem(leftPane);
};


// Logout the user
let logoutUser = () => window.location.href = "../pages/index.html";


// Modify Post
let edithPost = () => {
  let postInField = postField[0];
  let postOutField = postField[1];
  let titleInField = titleField[0];
  let titleOutField = titleField[1];
  titleInField.value = titleOutField.innerHTML.trim();
  postInField.innerHTML = postOutField.value;
};

// Modify user Details
let numClick = 0;

let changeUserName = () => {
  (numClick == 1 ? ((hideItem(profileNameInput)), (numClick = 0)) : ((profileNameInput.style.display = "inline"), (numClick = 1)));
};

// Reset Password
let passNumClick = 0;

let resetPass = () => {
  (passNumClick == 1 ? ((hideItem(restPassInput)), (passNumClick = 0)) : ((restPassInput.style.display = "inline"), (passNumClick = 1)));
};

// set Reminder
let remClick = 0;

let setReminder = () => {
  if (remClick === 1) {
    hideItem(reminderContent[0]);
    hideItem(reminderContent[1]);
    remClick = 0;
  } else {
    reminderContent[0].style.display = "inline";
    reminderContent[1].style.display = "inline";
    remClick++;
  }
};

//EVENTS
document.addEventListener('DOMContentLoaded', transformItems);
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