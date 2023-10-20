

const getCartList = () => {
    const cartItem = localStorage.getItem('cartItem');
    return cartItem ? JSON.parse(cartItem) : [];
}

const saveCartList = (cartItem) => {
    localStorage.setItem('cartItem', JSON.stringify(cartItem));
}

const removeFromCart = (productId) => {
    let cartItem = getCartList();
    cartItem = cartItem.filter(item => item.idItem !== productId); // Use the correct property for comparison
    saveCartList(cartItem);

}

const clearLocalStrorage = () => {
    localStorage.clear();
    location.reload();
};
  
const cartList = getCartList()
console.log(cartList)
const btnBook = document.querySelectorAll('.btn--book')
if(btnBook.length){
    btnBook.forEach(bnt => {
        bnt.addEventListener('click', () => {
            const tour = {};
            const parentNode = bnt.parentElement.parentElement;    

            tour.id = parentNode.querySelector('.id').textContent; 
            const existedTour = cartList.find(item => item.id == tour.id);
            if (existedTour) {
                existedTour.quantity++
            } 
            else {
                tour.img = parentNode.querySelector('.item-one__img img').getAttribute('src');
                tour.name = parentNode.querySelector('.item-one__name span').textContent;
                tour.prices = parseInt(parentNode.querySelector('.item-prices span').textContent);
                tour.quantity = 1;                

                cartList.unshift(tour);
            }

            saveCartList(cartList);
            alert("Add your cart successfull!");
        })
    })
} 