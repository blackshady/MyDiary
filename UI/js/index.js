const reminderButton = document.querySelector('.set__reminder');
const reminderModal = document.querySelector('.reminder__modal');
const closeModal = document.querySelector('.close__modal');

const openReminderModal = () => {
  reminderModal.style.display = "block";
}

const closeReminderModal = () => {
  reminderModal.style.display = "none";
}

window.onclick = event => {
  if (event.target == reminderModal) {
    reminderModal.style.display = 'none';
  }
};

closeModal.addEventListener('click', closeReminderModal);
reminderButton.addEventListener('click', openReminderModal);