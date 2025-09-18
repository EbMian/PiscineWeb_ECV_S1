// Import du header
const header = document.querySelector('#header');
const templateHeader = document.querySelector('#custom-header');
const cloneHeader = document.importNode(templateHeader.content, true);
header.appendChild(cloneHeader);

// Import du footer
const footer = document.querySelector('#footer');
const templateFooter = document.querySelector('#custom-footer');
const cloneFooter = document.importNode(templateFooter.content, true);
footer.appendChild(cloneFooter);
