function handleReveal(index, block) {
  const btns = block.querySelectorAll('.select-btn');
  btns.forEach((btn, i) => {
    btn.setAttribute('aria-selected', i === index);
  });
  const contents = block.querySelectorAll('.content-item');
  contents.forEach((content, i) => {
    content.setAttribute('aria-selected', i === index);
  });
}

export default function decorate(block) {
  const menu = document.createElement('div');
  menu.classList.add('menu');
  const content = document.createElement('div');
  content.classList.add('content');
  [...block.children].forEach((section, i) => {
    const menuItem = section.firstElementChild;
    menuItem.classList.add('select-btn');
    menuItem.setAttribute('aria-selected', i === 0);
    menuItem.addEventListener('click', () => handleReveal(i, block));
    menu.append(menuItem);
    const contentItem = section.lastElementChild;
    contentItem.classList.add('content-item');
    contentItem.setAttribute('aria-selected', i === 0);
    content.append(contentItem);
  });
  block.replaceChildren(menu, content);
}
