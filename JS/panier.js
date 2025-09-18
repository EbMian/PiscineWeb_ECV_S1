import { options } from './Data.js';

const shoppingListe = document.querySelector('#list');
let articlesList = JSON.parse(localStorage.getItem('cart')) || [];
console.log("article", articlesList);

const prixTotal = () => {
    let total = 0;
    articlesList.forEach(article => total += article.price * article.quantity);
    return total;
};

const renderArticle = ({ color, finish, price, quantity, size }) => 
  `<div class="flex spaceBetween">
        <div class="flex">
            <div>
                <img src="../assets/images/mug-blanc.png" alt="Mug blanc" style="width:100px">
            </div>
            <div>
                <p style="font-weight: bold;">Produit</p>
                <li>Couleur : ${color}</li>
                <li>Finition : ${finish}</li>
                <li>Taille : ${size}</li>
                <li>Quantité : ${quantity}</li>
            </div>
        </div>
        <div><p>Prix : ${price} €</p></div>
    </div>
    <br>`
;

const html = articlesList.map(article => renderArticle(article)).join('');

document.querySelector('#list').innerHTML = html;

document.querySelector('#total').innerText = prixTotal() + " €";

