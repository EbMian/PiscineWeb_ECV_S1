import { options } from './Data.js';

const listElement = document.querySelector('#list');
const totalPriceElement = document.querySelector('#total');
let articlesList = JSON.parse(localStorage.getItem('cart')) || [];
console.log("article", articlesList);

const prixTotal = () => {
    let total = 0;
    articlesList.forEach(article => total += article.price * article.quantity);
    return total;
};

const renderArticle = ({ color, finish, price, quantity, size }) =>
    `<div class="flex" style="gap: .5rem; align-items: center; width: 100%">
        <img src="../assets/images/mug-blanc.png" alt="Mug blanc" style="width:100px">
        <div>
            <h2 style="font-weight: bold; margin-bottom:.5rem">Mug x${quantity}</h2>
            <ul class="flex" style="gap: 2rem; margin-left: .5rem;">
                <li>Couleur : ${color}</li>
                <li>Finition : ${finish}</li>
                <li>Taille : ${size}</li>
            </ul>
        </div>
        <h3 style="margin-left: auto;margin-top: .5rem">Prix : ${price} €</h3>
    </div>
    <hr style="width: 100%; margin: 1rem 0">`
    ;

const html = articlesList.map(article => renderArticle(article)).join('');

listElement.innerHTML = html;
totalPriceElement.innerText = prixTotal() + " €";

