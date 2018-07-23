const inputLabel = Array.from((document.getElementsByClassName("input__label")));
const inputField = Array.from((document.getElementsByClassName("input__field")));
const userMenuIcon = document.getElementsByClassName("menu__user")[0];
const eidthPostBtn = document.getElementsByClassName("edit__post")[0];
const postField = document.getElementsByClassName("story__text");
const titleField = document.getElementsByClassName("story__title");
const logoutBtn = document.getElementById("btn__logout");
const siginUpBtn = document.getElementById("signup__button");
const loginBtn = document.getElementById("login__button");
let userDetails = [];

// Default action on DOM Load
const transformItems = () => {
	inputLabel.forEach((field) => {
		field.style.marginBottom = `21px`;
		field.style.fontSize = `12px`;
	});
};

let hideItem = (item) => (item ? (item.style.display = "none") : 0);

// Validate Signup form
const validateSignup = (e) => {
	e.preventDefault();
	validateInputs();
	userDetails.length !== 6 ? userDetails = [] : (window.location.href = "../pages/dashboard.html");
};

// Validate login Form
const validateLogin = (e) => {
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

let displayGrid = (item) => (item ? (item.style.display = "grid") : 0);

// Logout the user
const logoutUser = () => window.location.href = "../pages/index.html";

// Modify Post
const edithPost = () => {
	const postInField = postField[0];
	const postOutField = postField[1];
	const titleInField = titleField[0];
	const titleOutField = titleField[1];
	titleInField.value = titleOutField.innerHTML.trim();
	postInField.innerHTML = postOutField.value;
};

// EVENTS
document.addEventListener('DOMContentLoaded', transformItems);

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