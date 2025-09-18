//* Gestion de la sélection des paramètrees de customization

let selectedSize = sessionStorage.getItem('selectedSize') || undefined;
let selectedColor = sessionStorage.getItem('selectedColor') || undefined;
let selectedFinish = sessionStorage.getItem('selectedFinish') || undefined;

const sizeSelectors = document.querySelectorAll('input[name="size-setting"]');
const colorSelectors = document.querySelectorAll('input[name="color-setting"]');
const finishSelectors = document.querySelectorAll('input[name="finish-setting"]');

const updateSelectedSize = () => {
    selectedSize = document.querySelector('input[name="size-setting"]:checked')?.dataset.value;
    sessionStorage.setItem('selectedSize', selectedSize ?? '');
    updatePriceElement();
};

const updateSelectedColor = () => {
    selectedColor = document.querySelector('input[name="color-setting"]:checked')?.dataset.value;
    sessionStorage.setItem('selectedColor', selectedColor ?? '');
    updatePriceElement();
};

const updateSelectedFinish = () => {
    selectedFinish = document.querySelector('input[name="finish-setting"]:checked')?.dataset.value;
    sessionStorage.setItem('selectedFinish', selectedFinish ?? '');
    updatePriceElement();
};


sizeSelectors.forEach(selector => selector.addEventListener('change', updateSelectedSize));
colorSelectors.forEach(selector => selector.addEventListener('change', updateSelectedColor));
finishSelectors.forEach(selector => selector.addEventListener('change', updateSelectedFinish));


//* Adaptation du prix

const basePrice = 5;
const options = {
    size: { small: 0, medium: 2, large: 3 },
    colors: { white: 0, black: 1, beige: 2, green: 2 },
    finish: { matte: 0, glossy: 2 },
    image: 3,
    gift: 2,
};


const getPrice = (isGift) => {
    let p = basePrice + options.size[selectedSize] + options.colors[selectedColor] + options.finish[selectedFinish];
    // if (customImage) p += options.image;
    if (isGift) p += options.gift;
    return p;
};


const updatePriceElement = () => {
    const priceElement = document.querySelector('#price');
    priceElement.innerText = `${getPrice(false)},00 €`;
};


//* Initialisation des sélections à partir du sessionStorage

if (selectedSize) {
    const el = document.querySelector(`input[name="size-setting"][data-value="${selectedSize}"]`);
    if (el) el.checked = true;
}
if (selectedColor) {
    const el = document.querySelector(`input[name="color-setting"][data-value="${selectedColor}"]`);
    if (el) el.checked = true;
}
if (selectedFinish) {
    const el = document.querySelector(`input[name="finish-setting"][data-value="${selectedFinish}"]`);
    if (el) el.checked = true;
}

updateSelectedSize();
updateSelectedColor();
updateSelectedFinish();

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
