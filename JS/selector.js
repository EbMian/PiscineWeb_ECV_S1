import { basePrice, options } from './Data.js';
import { previewer } from './produit.js';

// Stockage et récupération des paramètres de personnalisation
const Storage = {
    get(key) {
        return sessionStorage.getItem(key) || undefined;
    },
    set(key, value) {
        sessionStorage.setItem(key, value ?? '');
    }
};

// Sélection courante
let selectedSize = Storage.get('selectedSize');
let selectedColor = Storage.get('selectedColor');
let selectedFinish = Storage.get('selectedFinish');

// Sélecteurs DOM
const sizeSelectors = document.querySelectorAll('input[name="size-setting"]');
const colorSelectors = document.querySelectorAll('input[name="color-setting"]');
const finishSelectors = document.querySelectorAll('input[name="finish-setting"]');

function handleSelectionChange(type) {
    const selector = `input[name="${type}-setting"]:checked`;
    const value = document.querySelector(selector)?.dataset.value;
    console.log(`Selected ${type}:`, value);

    if (type === 'size') {
        selectedSize = value;
        previewer.changeSize(value);
    }
    if (type === 'color') {
        selectedColor = value;
        previewer.changeColor(value);
    }
    if (type === 'finish') {
        selectedFinish = value;
        previewer.changeRoughness(value);
    }
    Storage.set(`selected${capitalize(type)}`, value);
    updatePriceElement();
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function updatePriceElement() {
    const priceElement = document.querySelector('#price');
    if (priceElement) priceElement.innerText = `${getPrice(false)},00 €`;
}

function restoreSelections() {
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
}

export function getPrice() {
    let p = basePrice + options.size[selectedSize] + options.colors[selectedColor] + options.finish[selectedFinish];
    // if (customImage) p += options.image;
    return p;
}

export function initSelectors() {
    restoreSelections();
    sizeSelectors.forEach(selector => selector.addEventListener('change', () => handleSelectionChange('size')));
    colorSelectors.forEach(selector => selector.addEventListener('change', () => handleSelectionChange('color')));
    finishSelectors.forEach(selector => selector.addEventListener('change', () => handleSelectionChange('finish')));
    // Mise à jour initiale du prix
    handleSelectionChange('size');
    handleSelectionChange('color');
    handleSelectionChange('finish');
}