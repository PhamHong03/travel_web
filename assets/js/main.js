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



// contact form
const form1 = document.getElementById('form');
const fname = document.getElementById('name');
const email = document.getElementById('email')
const title = document.getElementById('title');
const text = document.getElementById('message');


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