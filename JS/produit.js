import { initSelectors } from "./selector.js";
import { decreaseQuantity, increaseQuantity } from "./addToCart.js";
import { Previewer } from "./Previewer.js";


const Storage = {
    get(key) {
        return sessionStorage.getItem(key) || undefined;
    },
    set(key, value) {
        sessionStorage.setItem(key, value);
    }
}

const increaseQuantityButton = document.querySelector('#increase-quantity-btn');
const decreaseQuantityButton = document.querySelector('#decrease-quantity-btn');

increaseQuantityButton?.addEventListener('click', increaseQuantity);
decreaseQuantityButton?.addEventListener('click', decreaseQuantity);


export const previewer = new Previewer();
previewer.renderPreview({
    scale: Storage.get('selectedSize'),
    color: Storage.get('selectedColor'),
    roughness: Storage.get('selectedFinish'),
    interactive: true
});

initSelectors();

