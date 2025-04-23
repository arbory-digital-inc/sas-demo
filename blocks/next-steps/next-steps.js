import { createOptimizedPicture } from '../../scripts/aem.js';

function handleStackCard(block) {
  block.classList.add('stacked');
  const title = block.querySelector('p strong');
  title.parentElement.remove();
  title.classList.add('title');
  block.prepend(title);
  const btn = block.querySelector('.button');
  btn.classList.remove('button');
  btn.classList.add('stacklink');
  const span = document.createElement('span');
  span.classList.add('arrow');
  span.innerHTML = '&#x2192;';
  btn.append(span);
}

export default function decorate(block) {
  /* change to ul, li */
  const isStack = block.classList.contains('stacks');

  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'next-steps-card-image';
      else div.className = 'next-steps-card-body';
    });
    if (isStack) handleStackCard(li);
    
    // Make the entire card clickable
    const link = li.querySelector('a');
    if (link) {
      li.addEventListener('click', (e) => {
        // Only trigger if the click wasn't on the link itself
        if (!e.target.closest('a')) {
          e.preventDefault();
          link.click();
        }
      });
    }
    
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
