/**
 * Decorates the quote-customer-story block.
 * @param {Element} block The quote-customer-story block element
 */
export default function decorate(block) {
  // Get all rows from the block
  const rows = [...block.children];
  
  // Process each row from the original content
  let imageContent, quoteContent, nameContent, positionContent, companyContent;
  
  rows.forEach(row => {
    const cells = [...row.children];
    const labelCell = cells[0];
    const contentCell = cells[1];
    
    if (!labelCell || !contentCell) return;
    
    const label = labelCell.textContent.trim().toLowerCase();
    
    switch (label) {
      case 'image':
        imageContent = contentCell.innerHTML;
        break;
      case 'quote':
        quoteContent = contentCell.innerHTML;
        break;
      case 'name':
        nameContent = contentCell.innerHTML;
        break;
      case 'position':
        positionContent = contentCell.innerHTML;
        break;
      case 'company':
        companyContent = contentCell.innerHTML;
        break;
    }
  });
  
  // Create the container for our restructured content
  const quoteContainer = document.createElement('div');
  quoteContainer.className = 'quote-customer-story-container';
  
  // Create the quote mark row
  const quoteMarkRow = document.createElement('div');
  quoteMarkRow.className = 'quote-mark-row';
  const quoteMarkImg = document.createElement('img');
  quoteMarkImg.src = '../../img/quote-mark-grey.png';
  quoteMarkImg.alt = 'Quote';
  quoteMarkRow.appendChild(quoteMarkImg);
  
  // Create the quote text row
  const quoteTextRow = document.createElement('div');
  quoteTextRow.className = 'quote-text-row';
  quoteTextRow.innerHTML = quoteContent;
  
  // Create the image row
  const imageRow = document.createElement('div');
  imageRow.className = 'quote-image-row';
  imageRow.innerHTML = imageContent;
  
  // Create the attribution row
  const attributionRow = document.createElement('div');
  attributionRow.className = 'quote-attribution-row';
  
  // Create attribution content with inline elements
  let attributionHTML = '';
  
  if (nameContent) {
    attributionHTML += `<span class="quote-name">${nameContent}</span>`;
  }
  
  if (positionContent) {
    attributionHTML += `<span class="quote-bullet"> • </span><span class="quote-position">${positionContent}</span>`;
  }
  
  if (companyContent) {
    attributionHTML += `<span class="quote-bullet"> • </span><span class="quote-company">${companyContent}</span>`;
  }
  
  attributionRow.innerHTML = attributionHTML;
  
  // Add all rows to the container
  quoteContainer.appendChild(quoteMarkRow);
  quoteContainer.appendChild(quoteTextRow);
  quoteContainer.appendChild(imageRow);
  quoteContainer.appendChild(attributionRow);
  
  // Clear the block and add our new structure
  block.innerHTML = '';
  block.appendChild(quoteContainer);
}
