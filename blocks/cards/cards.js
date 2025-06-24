import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  // Check if the current URL contains '/ar/' to identify Arabic pages
  const isArabicPage = window.location.pathname.includes('/ar/');
  if (isArabicPage) {
    block.dataset.arPage = 'true';
  }
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    // Check if the row has a 'swap-layout' class and apply it to the li element
    if (row.classList.contains('swap-layout')) {
      li.classList.add('swap-layout');
    }
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
