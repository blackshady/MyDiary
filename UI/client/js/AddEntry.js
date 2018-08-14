const dispalyArea = document.querySelector('.l-display__area');
const addEntryBtn = document.getElementById('add__Entry');
const storyTitle = document.querySelector('.story__title');
const storyText = document.querySelector('.story__text');


const token = JSON.parse(localStorage.getItem('token'));
addEntryBtn.addEventListener('click', addEntry)


async function getEntryOnLoad() {

  if (token) {
    const fetchData = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer: ${token}`,
        'Content-type': 'application/json',
      },
    };
    const res = await fetch(
      `http://localhost:9000/api/v1/entries`,
      fetchData
    );
    const data = await res.json();
    const entries = data.entries;
    this.getMessage(entries);
  }
  if (!token) {
    window.location.href = `${location.protocol}/UI/pages/login.html`;
  }

}

function getMessage(entries) {
  if (entries.length === 0) {
    const h1 = document.createElement('h1');
    h1.innerHTML = 'You do not have an entry, Please add an entry';
    h1.className = 'h-color__white'
    dispalyArea.appendChild(h1);
  }
  const entry = entries[entries.length - 1];
  this.displayEntry(entry);
}


function modifyPost(e) {
  if (e.target.classList.contains('button')) {

  }
}

async function addEntry() {
  const title = storyTitle.value;
  const story = storyText.value;
  const userData = {
    title,
    story,
  }
  const fetchData = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer: ${token}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify(userData)
  }

  const res = await fetch(
    `http://localhost:9000/api/v1/entries`,
    fetchData
  );
  const data = await res.json();
  const entry = data.entry;
  displayEntry(entry);
}


function displayEntry(entry) {
  dispalyArea.innerHTML = '';
  // Dairy Title
  const title = document.createElement('span');
  title.className = 'title__display';
  title.innerHTML = `${entry.title}`;

  // Dairy story
  const story = document.createElement('div');
  story.className = 'story__display';
  story.innerHTML = `${entry.story}`;

  // Date created
  const date = document.createElement('div');
  date.className = 'date__posted';
  date.innerHTML = `${entry.created_at}`;

  // Modify Button
  const modifyBtn = document.createElement('button');
  modifyBtn.className = 'edit__post button';
  modifyBtn.innerHTML = 'Edit';

  // Options
  const option = document.createElement('div');
  option.className = 'l-story__option';
  option.appendChild(date);
  option.appendChild(modifyBtn);

  dispalyArea.appendChild(title);
  dispalyArea.appendChild(story);
  dispalyArea.appendChild(option);
  dispalyArea.addEventListener('click', this.modifyPost);
}


document.addEventListener('DOMContentLoaded', (e) => getEntryOnLoad());