/**
 * Decorates the full-width-banner block.
 * @param {Element} block The full-width-banner block element
 */
export default function decorate(block) {
  // Get the content container
  const contentDiv = block.querySelector(':scope > div > div');
  if (!contentDiv) return;
  
  // Create a container for the inline content
  const inlineContainer = document.createElement('div');
  inlineContainer.className = 'full-width-banner-content';
  
  // Get the intro text
  const introText = contentDiv.querySelector('p');
  if (introText) {
    const introSpan = document.createElement('span');
    introSpan.className = 'full-width-banner-intro';
    introSpan.textContent = introText.textContent;
    inlineContainer.appendChild(introSpan);
  }
  
  // Get the list items
  const listItems = contentDiv.querySelectorAll('li');
  if (listItems.length) {
    listItems.forEach((item, index) => {
      // Create a container for each item
      const itemSpan = document.createElement('span');
      itemSpan.className = 'full-width-banner-item';
      itemSpan.innerHTML = item.innerHTML;
      
      // Add to the container
      inlineContainer.appendChild(itemSpan);
      
      // Add bullet separator if not the last item
      if (index < listItems.length - 1) {
        const bullet = document.createElement('span');
        bullet.className = 'full-width-banner-bullet';
        bullet.innerHTML = '&bull;';
        inlineContainer.appendChild(bullet);
      }
    });
  }
  
  // Clear the block and add the new structure
  block.innerHTML = '';
  block.appendChild(inlineContainer);
}