import { basePrice, options } from './Data.js';


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

export const getPrice = (isGift) => {
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