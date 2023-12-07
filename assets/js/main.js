function showSearchInput() {
  document.querySelector(".head__search").style.transform = "translateX(8%)";
  let searchInput = document.querySelector(".head__search--input");
  searchInput.style.display = "block";
  searchInput.focus();

  // Option 2
  // document
  //   .querySelector(".head__search")
  //   .classList.toggle("head__search--active");
  // let searchInput = document.querySelector(".head__search--input");
  // searchInput.classList.toggle("head__search-input--active");
  // document
  //   .querySelector(".head__search--btn")
  //   .classList.toggle("head__search-btn--active");
  // searchInput.focus();
}

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    header.classList.add("header__change");
  } else {
    header.classList.remove("header__change");
  }
});

// const cartQuantityIcon = document.querySelector(".head__cart-quantity");
// console.log(cartQuantityIcon);
// if (cartQuantityIcon) {
//   const cartItem = localStorage.getItem("cartItem")
//     ? JSON.parse(localStorage.getItem("cartItem"))
//     : [];
//   console.log(cartItem.length);
//   cartQuantityIcon.innerHTML = `<div class="cart__quantity">${cartItem.length}</div>`;
// }



// Contact Form
const form1 = document.getElementById('form');
const fname = document.getElementById('name');
const email = document.getElementById('email')
const title = document.getElementById('title');
const text = document.getElementById('message');
const container = document.querySelector('.section__contact--form');

function checkName(){
  if(fname.value === ''){
    errorMessage(fname, "This error!");
  }else{
    successMessage(fname);
  }
}
function checkTile(){
  if(title.value === ''){
    errorMessage(title, "This error!");
  }else{
    successMessage(title);
  }
}
function checkText(){
  if(text.value === ''){
    errorMessage(text, "This error!");
  }else{
    successMessage(text);
  }
}
function validationemal(email){
  var emailform = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailform.test(String(email).toLowerCase());
}
function checkEmail(){
  if(email.value === ''){
    errorMessage(email, "This error!");
  }else if(!validationemal(email.value)){
    errorMessage(email, "This error!");
  }else{
    successMessage(email);
  }
}


function errorMessage (pElement, message) {
  const formRow = pElement.parentElement;
  if(formRow.classList.contains('success')){
    formRow.classList.remove('success');
    formRow.classList.add('error');
  }else{
    formRow.classList.add('error');
  }
}

function successMessage(pElement){
  const formRow = pElement.parentElement;
  if(formRow.classList.contains('error')){
    formRow.classList.remove('error');
    formRow.classList.add('success');
  }else{
    formRow.classList.add('success');
  }
}


if(fname) {
  fname.addEventListener('blur', checkName, true);
}
if(email){
  email.addEventListener('blur', checkEmail, true);
}
if(title){
  title.addEventListener('blur', checkTile, true);
}
if(text){
  text.addEventListener('blur', checkText, true);
}
if(form1) {    
  form1.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formRow = document.querySelectorAll('.form-row');
    let arrFomrRow = Array.from(formRow);

    arrFomrRow.pop();
    let isValid = true;
    arrFomrRow.forEach(item => {
      if(!item.classList.contains('success')){
        isValid = false;
      }
    });
    if(isValid){
      container.classList.add('complete');
      alert("You sent your problem successfully and wait for respond!");
    }else{
      container.classList.remove('complete');
    }
  });
}