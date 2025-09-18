const cart = {}
const product = { taille, finition, couleur, prix }
const pro = {}
const option = {}
const productList = {}

function calculatePrice(size, finition, couleur, basePrice) {

}

// * Avoir le prix de chaque option quelque part
// * Préparer un template pour l'affichage des items dans le panier 

// * Ecouter et récupérer les valeurs des options dans le formulaire 
// couleur, taille, finition
// * Au clic sur "Valider" ou "Ajouter au panier" (page produit), calculer le prix associé à chaque item selon les options et la quantité
// prixCouleur, prixTaille, prixFinition, quantité, prixItem
// * Au clique sur le le bouton panier : Adaptez le template pour l'affichage des produits


const shoppingListe = document.getElementById('liste');
console.log(shoppingListe);

const articleTemplate = document.getElementById('liste-item');
console.log(articleTemplate);

const produits = ["café", "thé", "mug", "chocolat"]

produits.forEach(produit => {

    const clone = document.importNode(articleTemplate.content, true);

    clone.querySelector('.nom').textContent = produit;
    clone.querySelector('.quantite').textContent = produit;
    clone.querySelector('.nom').options = produit;
    clone.querySelector('.prix').textContent = produit;

    shoppingListe.appendChild(clone)
})
