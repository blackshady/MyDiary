const dispalyArea = document.querySelector('.l-display__area');
const addEntryBtn = document.getElementById('add__Entry');
const storyTitle = document.querySelector('.story__title')
const storyText = document.querySelector('.story__text')

const token = JSON.parse(localStorage.getItem('token'));
let userEntryId = '';
async function getEntryOnLoad() {
  if (!token) return window.location.replace('../pages/index.html');
  const entryId = location.search.substring(1).split("=")[1];
  if (!entryId) {
    if (token) {
      const fetchData = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer: ${token}`,
          'Content-type': 'application/json',
        },
      };
      const res = await fetch(`https://my-1-and-only-diary.herokuapp.com/api/v1/entries`, fetchData);
      const data = await res.json();
      const entries = data.entries;
      getMessage(entries);
    }
    if (!token) {
      window.location.href = `${location.protocol}/UI/pages/login.html`;

    }
  }
};

const getMessage = (entries) => {
  if (typeof entries === 'undefined' || entries.length === 0) {
    return dispalyArea.innerHTML = `<h1 class="h-color__white">You do not have an entry, Please add an entry</h1>`;
  }
  const entry = entries[entries.length - 1];
  dispalyArea.innerHTML = '';
  displayEntry(entry);
};

const modifyPost = (e) => {
  if (!token) return window.location.replace('../pages/index.html');
  if (e.target.classList.contains('button')) {
    storyTitle.value = e.target.parentElement.parentElement.children[0].innerHTML;
    storyText.value = e.target.parentElement.parentElement.children[1].innerHTML;
    userEntryId = e.target.parentElement.parentElement.getAttribute('data-entryid');
  }
};

async function modifyPostRequest(entryId, title, story) {
  const userData = {
    title,
    story
  }
  const fetchData = {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer: ${token}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify(userData)
  };
  const res = await fetch(`https://my-1-and-only-diary.herokuapp.com/api/v1/entries/${entryId}`, fetchData);
  const data = await res.json();
  const entry = data.entry;
  const modEntry = {
    entryid: entry.entryid,
    title: entry.title,
    story: entry.story,
    created_at: entry.updated_at,
  }
  dispalyArea.innerHTML = '';
  displayEntry(modEntry);
  storyTitle.value = 'Title';
  storyText.value = 'Whats on your mind...';
}

const displayEntry = (entry) => {
  if (entry) {
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
    modifyBtn.innerHTML = 'Edith';

    // Options
    const option = document.createElement('div');
    option.className = 'l-story__option';
    option.appendChild(date);
    option.appendChild(modifyBtn);

    dispalyArea.appendChild(title);
    dispalyArea.appendChild(story);
    dispalyArea.appendChild(option);
    dispalyArea.setAttribute('data-entryid', entry.entryid);
    dispalyArea.addEventListener('click', modifyPost);
  }
}

async function addEntry() {
  if (!token) return window.location.replace('../pages/index.html');
  const title = storyTitle.value;
  const story = storyText.value;

  if (userEntryId !== '') {
    return modifyPostRequest(userEntryId, title, story);
  }

  const userData = {
    title,
    story,
  };
  const fetchData = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer: ${token}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify(userData)
  };
  const res = await fetch(`https://my-1-and-only-diary.herokuapp.com/api/v1/entries`, fetchData);
  const data = await res.json();
  if (data.status === 'success') {
    const entry = data.entry;
    dispalyArea.innerHTML = '';
    displayEntry(entry);
    storyTitle.value = 'Title';
    storyText.value = 'Whats on your mind...';
  }

}

(async function loadSpecificEntry() {
  if (!token) return window.location.replace('../pages/index.html');
  const entryId = location.search.substring(1).split("=")[1];
  if (entryId) {
    const fetchData = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer: ${token}`,
        'Content-type': 'application/json',
      },
    };
    const res = await fetch(`https://my-1-and-only-diary.herokuapp.com/api/v1/entries/${entryId}`, fetchData);
    const data = await res.json();
    const entry = data.entry;
    dispalyArea.innerHTML = '';
    displayEntry(entry);
  }
})();


window.onload = getEntryOnLoad;
addEntryBtn.addEventListener('click', addEntry);