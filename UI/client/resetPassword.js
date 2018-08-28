const email = document.querySelector('.reset_pass-input');
const message = document.querySelector('.message');

async function sendLink(e) {
  e.preventDefault();
  message.innerHTML = '';
  const userEmail = email.value;
  if (userEmail === '') return message.innerHTML = 'please input your email';

  const fetchData = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(userEmail)
  }

  const res = await fetch(`https://my-1-and-only-diary.herokuapp.com/api/v1/auth/reset_password_request`, fetchData);
  const data = await res.json();
  if (data.status === 'error') {
    return message.innerHTML = data.message;
  }
  if (data.status === 'success') {
    return message.innerHTML = data.message;
  }
  console.log(data);
}

document.addEventListener('submit', sendLink);