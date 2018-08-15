const logoutBtn = document.getElementsByClassName('btn__logout')[0];
const userProfileIcon = document.querySelector('.menu__user');
const userProfileItem = document.getElementById('userProfileItem');

const baseUrl = window.location.origin;

const logoutUser = () => {
  localStorage.removeItem('token');
  window.location.replace('../pages/index.html');
};


//display User Profile 
userProfileIcon.addEventListener('click', event => {
  event.stopPropagation();
  displayGrid(userProfileItem);
});


// hide user profile
document.addEventListener('click', event => {
  if (
    event.target.id !== 'userProfileItem' ||
    event.target.id == 'menu__user'
  ) {
    hideItem(userProfileItem);
  }
});

let hideItem = item => (item ? (item.style.display = 'none') : 0);
let displayGrid = item => (item ? (item.style.display = 'grid') : 0);

logoutBtn.addEventListener('click', logoutUser)