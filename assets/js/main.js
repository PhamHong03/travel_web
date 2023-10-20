

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

const header = document.querySelector('.header')

window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    header.classList.add('header__change')
  }
  else {
    header.classList.remove('header__change')
  }

})
