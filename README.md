# PiscineWeb_ECV_S1

Projet de personnalisation et d'achat de mugs en ligne

## Fonctionnalités principales
- Prévisualisation 3D interactive du mug (Three.js)
- Personnalisation du mug : taille, couleur, finition, image (Nice)
- Calcul dynamique du prix selon les options
- Ajout au panier et gestion des quantités
- Stockage des sélections et du panier (sessionStorage/localStorage)
- Interface responsive et moderne

## Structure du projet
```
index.html
README.md
assets/
	icons/
	images/
models/
	mug-cup/
	plain-mug/
components/
	footer/
	header/
JS/
	app.js
	main.js
	selector.js
	addToCart.js
	components/
		OptionSelector.js
		Previewer/Previewer.js
	Routing/
	services/
pages/
	accueil.html
	panier.html
	produit.html
styles/
	accueil.css
	advice.css
	main.css
	panier.css
	produit.css
```

## Installation et lancement
1. Cloner le dépôt
2. Ouvrir le dossier dans VS Code
3. Lancer Live Server sur `index.html` ou `pages/produit.html`

## Utilisation
- Personnalisez votre mug sur la page produit
- Visualisez le rendu 3D en temps réel
- Ajoutez au panier et gérez la quantité
- Finalisez votre commande

## Technologies utilisées
- HTML, CSS, JavaScript
- Three.js (prévisualisation 3D)
- Stockage Web (sessionStorage, localStorage)

## Auteurs
- EbMian
- Rthery

## Licence
Voir les fichiers `license.txt` dans le dossier `models/` pour les modèles 3D.
