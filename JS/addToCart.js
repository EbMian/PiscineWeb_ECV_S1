import { getPrice } from './selector.js';

let selectedSize = sessionStorage.getItem('selectedSize') || undefined;
let selectedColor = sessionStorage.getItem('selectedColor') || undefined;
let selectedFinish = sessionStorage.getItem('selectedFinish') || undefined;

let quantity = 1;

const quantityElement = document.querySelector('#quantity');
const increaseQuantityButton = document.querySelector('#increase-quantity-btn');
const decreaseQuantityButton = document.querySelector('#decrease-quantity-btn');

increaseQuantityButton.addEventListener('click', () => {
    quantity++;
    quantityElement.innerText = quantity;
});

decreaseQuantityButton.addEventListener('click', () => {
    if (quantity > 1) {
        quantity--;
        quantityElement.innerText = quantity;
    }
});


const addToCartButton = document.querySelector('#add-to-cart-btn');
addToCartButton.addEventListener('click', () => {
    if (!selectedSize || !selectedColor || !selectedFinish) {
        alert('Please select size, color, and finish before adding to cart.');
        return;
    }
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({
        size: selectedSize,
        color: selectedColor,
        finish: selectedFinish,
        price: getPrice(false),
        quantity: quantity,
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item added to cart!');
});
