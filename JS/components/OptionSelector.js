const VariantRadioInput = ({ label, name, dataValue }) => {
    const variantElement = document.createElement('label');
    variantElement.innerText = label;

    const inputElement = document.createElement('input');
    inputElement.type = 'radio';
    inputElement.name = name;
    inputElement.dataset.value = dataValue;

    variantElement.appendChild(inputElement);
    return variantElement;
}


const createVariantOptions = (options) => {
    const inputContainer = document.getElementById('input-container');

    for (const [category, variants] of Object.entries(options)) {
        const categoryContainer = document.createElement('div');
        categoryContainer.className = 'product-option-category';
        categoryContainer.innerHTML = `<h3>${category.charAt(0).toUpperCase() + category.slice(1)} :</h3>`;

        for (const [label, dataValue] of Object.entries(variants)) {
            const variantInput = VariantRadioInput({ label, name: `${category}-setting`, dataValue });
            categoryContainer.appendChild(variantInput);
        }

        inputContainer.appendChild(categoryContainer);
    }
};

const options = {
    taille: { small: 0, medium: 2, large: 3 },
    couleur: { white: 0, black: 1, beige: 2, green: 2 },
    finition: { matte: 0, glossy: 2 },
    image: 3,
    cadeau: 2,
};

createVariantOptions(options);
