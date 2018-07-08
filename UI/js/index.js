let userDetails = [];


const inputLabel = Array.from((document.getElementsByClassName("input__label")));
const inputField = Array.from((document.getElementsByClassName("input__field")));
const siginUpBtn = document.getElementById("signup__button");


//EVENTS
document.addEventListener('DOMContentLoaded', transformLabel);
siginUpBtn.addEventListener("click", validate);


function validate(e) {
  e.preventDefault();
  //Check that no field is empty
  inputField.map((field) => {
    field.value !== "" ? ((userDetails.push(field.value)),
        (field.style.borderBottom = `solid 3px #3d272a`)) :
      (field.style.borderBottom = `solid 3px red`);
  })
  userDetails.length !== 6 ? userDetails = [] : (window.location.href = "../pages/index.html");
}


function transformLabel() {
  for (let i = 0; i < inputField.length; i++) {
    inputField[i].focus();
    inputLabel[i].style.marginBottom = `21px`;
    inputLabel[i].style.fontSize = `12px`;
  }
}