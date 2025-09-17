// Import du header
const header = document.getElementById('header');
const templateHeader = document.getElementById('custom-header');
const cloneHeader = document.importNode(templateHeader.content, true);
header.appendChild(cloneHeader);

// Import du footer
const footer = document.getElementById('footer');
const templateFooter = document.getElementById('custom-footer');
const cloneFooter = document.importNode(templateFooter.content, true);
footer.appendChild(cloneFooter);
