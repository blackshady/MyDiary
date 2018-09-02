const logoutBtn = document.getElementsByClassName('btn__logout')[0];
const userProfileIcon = document.querySelector('.menu__user');
const userProfileItem = document.getElementById('userProfileItem');
const userImage = document.getElementById('profile_img');
const totalEntries = document.getElementsByClassName('total__entries')[0];
const userName = document.getElementsByClassName('profile__option')[0];
const userAvater = document.getElementsByClassName('user__profile')[0];
const setReminderBtn = document.querySelector('.reminder__button');
const reminderTitle = document.querySelector('.reminder__title');
const setReminderDate = document.querySelector('.reminder__date');
const setReminderTime = document.querySelector('.reminder__time');
const reminderMessage = document.querySelector('.message');



const logoutUser = () => {
  localStorage.removeItem('token');
  window.location.replace('../pages/index.html');
};

//display User Profile 
userProfileIcon.addEventListener('click', event => {
  event.stopPropagation();
  displayGrid(userProfileItem);
  getUserDetails();
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

logoutBtn.addEventListener('click', logoutUser);
userImage && userImage.addEventListener('change', (e) => {
  const file = e.target.files[0];
  uploadImage(file);
})

async function uploadImage(file) {

  const image = new FormData();
  image.append('image', file);

  const fetchData = {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer: ${token}`,

    },
    body: image
  };
  const res = await fetch(`https://my-1-and-only-diary.herokuapp.com/api/v1/users/upload`, fetchData);
  const data = await res.json();

  if (data.status === 'success') {
    userAvater.firstElementChild.src = data.image[0].profileimageurl;
  }
}

async function getUserDetails() {

  const fetchData = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer: ${token}`,
      'Content-type': 'application/json',
    },
  };
  const res = await fetch(`https://my-1-and-only-diary.herokuapp.com/api/v1/users/info`, fetchData);
  const data = await res.json();
  if (data.status === 'success') {
    totalEntries.lastElementChild.innerHTML = data.user.totalcreatedentries;
    userName.firstElementChild.innerHTML = data.user.username;
    userAvater.firstElementChild.src = data.user.profileimageurl;
  }

}

// const validateDate = (date) => {
//   const currentDate = (new Date().toISOString().split('T')[0]);
//   const reminderDate = (new Date(date).toISOString().split('T')[0]);

//   // split current date to get the DAY, MONTH and YEAR
//   currentDay = currentDate.split('-')[2];
//   currentMonth = currentDate.split('-')[1];
//   currentYear = currentDate.split('-')[0];

//   // split reminder Date to get the DAY, MONTH and YEAR
//   reminderDay = reminderDate.split('-')[2];
//   reminderMonth = reminderDate.split('-')[1];
//   reminderYear = reminderDate.split('-')[0];

//   if(date){

//   }
//   console.log(reminderDay, reminderMonth, reminderYear);
// }

async function setReminder() {
  const title = reminderTitle.value;
  const reminderDate = setReminderDate.value;
  const reminderTime = setReminderTime.value;

  reminderMessage.innerHTML = '';
  if (typeof title === 'undefined' || title.length < 10) {
    return reminderMessage.innerHTML = 'Your title is too short';
  }
  if (typeof reminderDate === 'undefined' || reminderDate.length === 0) {
    return reminderMessage.innerHTML = 'Your  date is empty';
  }
  if (typeof reminderTime === 'undefined' || reminderTime.length === 0) {
    return reminderMessage.innerHTML = 'Time filed should not be is empty';
  }
  // validateDate(reminderDate);
  const date = (new Date(reminderDate).toISOString().split('T')[0]);

  const userData = {
    title,
    date,
    time: reminderTime,
  }

  const fetchData = {
    method: 'post',
    headers: {
      'Authorization': `Bearer: ${token}`,
      'Content-type': 'application/json',
    },
    body: userData,
  };

  const res await fetch('', fetchData)
  console.log(userData)
}

setReminderBtn.addEventListener('click', setReminder);