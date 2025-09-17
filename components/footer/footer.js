const footer = document.getElementById('footer');
const templateFooter = document.getElementById('custom-footer');
console.log(footer);
const clone = document.importNode(templateFooter.content, true);
footer.appendChild(clone);