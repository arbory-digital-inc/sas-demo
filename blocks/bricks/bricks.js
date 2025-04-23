export default function decorate(block) {
  const mortar = block.firstElementChild;
  mortar.classList.add('brick-mortar');
  const heads = document.querySelectorAll('h2');
  heads.forEach((head) => {
    const line = document.createElement('span');
    line.classList.add('line-space');
    head.parentElement.insertBefore(line, head);
  });
  [...mortar.children].forEach((brick, i) => {
    const bgs = ['#0767d1', '#f0f2f4', '#e8eaed', '#f8fafc'];
    brick.style.backgroundColor = bgs[i];
  });
}
