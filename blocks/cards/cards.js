import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const isStack = block.classList.contains('stacks');
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    if (isStack) {
      li.classList.add('stacked');
      const title = li.querySelector('p strong');
      title.parentElement.remove();
      title.classList.add('title');
      li.prepend(title);
      const btn = li.querySelector('.button');
      btn.classList.remove('button');
      btn.classList.add('stacklink');
      const span = document.createElement('span');
      span.classList.add('arrow');
      span.innerHTML = '&#x2192;';
      btn.append(span);
    }
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
