import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

function decorateFootNav(block) {
  const bc = block.querySelector('.icon-breadcrumb');
  if (bc) {
    const nav = bc.parentElement.parentElement;
    nav.classList.add('navigation');
    const lnks = nav.querySelectorAll('ul');
    const links = document.createElement('div');
    links.classList.add('links');
    links.append(...lnks);
    nav.append(links);
    const crumb = bc.parentElement;
    crumb.classList.add('breadcrumbs');
    const pagetitle = getMetadata('og:title');
    const home = document.createElement('a');
    home.classList.add('homelink');
    const link = document.createElement('strong');
    const linkText = document.createTextNode('Home');
    link.appendChild(linkText);
    home.appendChild(link);
    home.href = '/';
    crumb.append(home, pagetitle);

    const logo = block.querySelector('.icon-sas-logo-footer');
    if (logo) {
      const logop = logo.parentElement;
      logop.parentElement.insertBefore(logo, logo.parentNode);
      logop.remove();
    }

    const fbicon = block.querySelector('.icon-Facebook');
    if (fbicon) {
      fbicon.parentElement.classList.add('socials');
    }
  }
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
  decorateFootNav(block);
}
