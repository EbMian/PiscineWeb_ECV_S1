//* Gestion de la sélection des paramètrees de customization

let selectedSize;
let selectedColor;
let selectedFinish;

const sizeSelectors = document.querySelectorAll('input[name="size-setting"]');
const colorSelectors = document.querySelectorAll('input[name="color-setting"]');
const finishSelectors = document.querySelectorAll('input[name="finish-setting"]');


const updateSelectedSize = () => {
    selectedSize = document.querySelector('input[name="size-setting"]:checked')?.dataset.value;
    updatePriceElement();
};

const updateSelectedColor = () => {
    selectedColor = document.querySelector('input[name="color-setting"]:checked')?.dataset.value;
    updatePriceElement();
};

const updateSelectedFinish = () => {
    selectedFinish = document.querySelector('input[name="finish-setting"]:checked')?.dataset.value;
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

updateSelectedSize();
updateSelectedColor();
updateSelectedFinish();