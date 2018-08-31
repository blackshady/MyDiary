const email = document.querySelector('.password__field');
const message = document.querySelector('.message');



const asyncCatchErrors = fn => fn().catch((error) => console.log(error));

async function validateToken() {
  const isValid = false;
  const token = location.search.substring(1).split("=")[1];
  typeof token === 'undefined' || token === '' && window.location.replace('invalidToken.html');

  !isValid && window.location.replace('invalidToken.html');

}

document.addEventListener('DOMContentLoaded', asyncCatchErrors(validateToken));