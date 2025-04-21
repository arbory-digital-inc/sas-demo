export default function createSvgIcon(name, size, iconName = null) {
  const wrap = document.createElement('div');
  wrap.classList.add(name);
  const icon = document.createElement('img');
  icon.setAttribute('src', `/icons/${iconName || name}.svg`);
  icon.setAttribute('width', size);
  icon.setAttribute('height', size);
  icon.setAttribute('alt', `${name} icon`);
  wrap.append(icon);
  return wrap;
}
