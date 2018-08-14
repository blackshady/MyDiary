const cardBody = document.querySelector('.l-content__body');

const token = JSON.parse(localStorage.getItem('token'));

async function loadAllEntries() {
  if (!token) window.location.replace('../pages/index.html');
  const fetchData = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer: ${token}`,
      'Content-type': 'application/json',
    },
  };
  const res = await fetch('http://localhost:9000/api/v1/entries', fetchData);
  const data = await res.json();
  console.log(data);
  const entries = data.entries;
  if (entries.length !== 0) return entryDisplay(entries);
  return cardBody.innerHTML = `<h1 class ='h-color__white' >You do not have an entry yet</h1>`;
}

const entryDisplay = (entries) => {
  if (entries) {
    entries.map((entry) => {
      createCard(entry);
    });
  }
};

let createCard = (entry) => {
  const story = shortStory(entry.story);
  const title = shortTitle(entry.title);
  // card Wrapper
  const entryWrapper = document.createElement('div');
  entryWrapper.className = 'l-content__card';

  // title
  const entryTitle = document.createElement('div');
  entryTitle.className = 'card__header';
  entryTitle.innerHTML = `${title}`

  // story
  const entryStory = document.createElement('div');
  entryStory.className = 'card__body';
  entryStory.innerHTML = `${story}`;

  // options wrapper
  const options = document.createElement('div');
  options.className = 'card__footer';

  // View entry button
  const viewEntryBtn = document.createElement('button');
  viewEntryBtn.className = 'view__entry button';
  viewEntryBtn.innerHTML = 'View';

  // Delete Entry Button
  const deleteEntryBtn = document.createElement('button');
  deleteEntryBtn.className = 'delete__entry button';
  deleteEntryBtn.innerHTML = 'Delete';

  // append button to the option wrapper
  options.appendChild(viewEntryBtn);
  options.appendChild(deleteEntryBtn);

  entryWrapper.appendChild(entryTitle);
  entryWrapper.appendChild(entryStory);
  entryWrapper.appendChild(options);

  cardBody.appendChild(entryWrapper);


}

const buttonOption = (e) => {

  if (e.target.classList.contains('view__entry')) {
    console.log('view entry');
  }

  if (e.target.classList.contains('delete__entry')) {
    console.log('delete button');
  }
}
// display only the first 20 lines of the story
const shortStory = (story) => {
  if (story.length > 20) {
    const newStory = story.slice(0, 190);
    return newStory;
  }
}

const shortTitle = (title) => {
  if (title.length > 30) {
    const newTitle = title.slice(0, 30);
    return newTitle;
  }
  return title;
};

window.onload = loadAllEntries;

cardBody.addEventListener('click', buttonOption);