import { options } from './Data.js';
import { Previewer } from './Previewer.js';

const listElement = document.querySelector('#list');
const totalPriceElement = document.querySelector('#total');
let articlesList = JSON.parse(localStorage.getItem('cart')) || [];
console.log("article", articlesList);

const prixTotal = () => {
    let total = 0;
    articlesList.forEach(article => total += article.price * article.quantity);
    return total;
};

const renderArticle = ({ color, finish, price, quantity, size, isGift }, id) =>
    `<div class="flex" style="gap: 1rem; align-items: center; width: 100%">
        <div id="cContainer${id}" style="width: 10rem; aspect-ratio: 1;">
            <canvas id="c${id}"></canvas>
        </div>
        <div>
            <h2 style="font-weight: bold; margin-bottom:.5rem">Mug x${quantity}</h2>
            <ul class="flex" style="gap: 2rem; margin-left: 1rem;">
                <li>Couleur : ${color}</li>
                <li>Finition : ${finish}</li>
                <li>Taille : ${size}</li>
                <li>Emballage : ${isGift == 'true' ? 'Oui' : 'Non'}</li>
            </ul>
        </div>
        <h3 style="margin-left: auto;margin-top: .5rem">Prix : ${price} €</h3>
    </div>
    <hr style="width: 100%; margin: 1rem 0">`
    ;

const html = articlesList.map((article, id) => renderArticle(article, id)).join('');

listElement.innerHTML = html;

articlesList.forEach(({ color, finish, size }, id) => {
    const renderer = new Previewer({ canvasId: 'c' + id, containerId: 'cContainer' + id });
    renderer.renderPreview({
        scale: size,
        color: color,
        roughness: finish,
        interactive: false
    });
});

totalPriceElement.innerText = prixTotal() + " €";

