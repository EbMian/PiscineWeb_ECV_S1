
import { getPrice } from './selector.js';

// Utilitaires de stockage
const Storage = {
    get(key) {
        return sessionStorage.getItem(key) || undefined;
    },
    set(key, value) {
        sessionStorage.setItem(key, value ?? '');
    }
};

// Gestion du panier
const Cart = {
    get() {
        return JSON.parse(localStorage.getItem('cart') || '[]');
    },
    add(item) {
        const cart = Cart.get();
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
};

// Gestion de la quantité
let quantity = 1;
const quantityElement = document.querySelector('#quantity');

function updateQuantityDisplay() {
    if (quantityElement) quantityElement.innerText = quantity;
}

export function increaseQuantity() {
    quantity++;
    updateQuantityDisplay();
}

export function decreaseQuantity() {
    if (quantity > 1) {
        quantity--;
        updateQuantityDisplay();
    }
}

// Ajout au panier
const addToCartButton = document.querySelector('#add-to-cart-btn');
addToCartButton?.addEventListener('click', () => {
    const selectedSize = Storage.get('selectedSize');
    const selectedColor = Storage.get('selectedColor');
    const selectedFinish = Storage.get('selectedFinish');
    if (!selectedSize || !selectedColor || !selectedFinish) {
        alert('Veuillez sélectionner la taille, la couleur et la finition avant d\'ajouter au panier.');
        return;
    }
    Cart.add({
        size: selectedSize,
        color: selectedColor,
        finish: selectedFinish,
        price: getPrice(),
        quantity: quantity,
    });
    alert('Article ajouté au panier !');
});