/**
 * Decorates the hero-customer-story block.
 * @param {Element} block The hero-customer-story block element
 */
export default function decorate(block) {
  // Hide the label divs that contain the authoring labels
  block.querySelectorAll(':scope > div > div:first-child').forEach((label) => {
    label.classList.add('screen-reader-only');
  });

  // Get all content elements
  const contentElements = [...block.children];
  
  // Create the three-column layout
  const leftColumn = document.createElement('div');
  leftColumn.className = 'hero-customer-story-left-column';
  
  const middleColumn = document.createElement('div');
  middleColumn.className = 'hero-customer-story-middle-column';
  
  const rightColumn = document.createElement('div');
  rightColumn.className = 'hero-customer-story-right-column';
  
  // Create containers for the columns
  const titleContainer = document.createElement('div');
  titleContainer.className = 'hero-customer-story-title-container';
  
  const logoContainer = document.createElement('div');
  logoContainer.className = 'hero-customer-story-logo-container';
  
  const quoteContainer = document.createElement('div');
  quoteContainer.className = 'hero-customer-story-quote-container';
  
  const bottomRow = document.createElement('div');
  bottomRow.className = 'hero-customer-story-bottom-row';
  
  // Process each content element
  contentElements.forEach((div) => {
    const labelDiv = div.querySelector(':scope > div:first-child');
    const contentDiv = div.querySelector(':scope > div:last-child');
    
    if (!labelDiv || !contentDiv) return;
    
    const labelText = labelDiv.textContent.trim().toLowerCase();
    
    switch (labelText) {
      case 'background-image':
        // Add background image to left column
        const imageContainer = document.createElement('div');
        imageContainer.className = 'hero-customer-story-image-container';
        imageContainer.appendChild(contentDiv.cloneNode(true));
        leftColumn.appendChild(imageContainer);
        break;
        
      case 'title':
        // Add title to left column as an overlay
        titleContainer.appendChild(contentDiv.cloneNode(true));
        break;
        
      case 'quote-text':
        // Add quote to middle column
        quoteContainer.appendChild(contentDiv.cloneNode(true));
        break;
        
      case 'customer-logo':
        // Add logo to middle column
        logoContainer.appendChild(contentDiv.cloneNode(true));
        break;
        
      case 'icon':
        // Add icon to right column
        const iconContainer = document.createElement('div');
        iconContainer.className = 'hero-customer-story-icon-container';
        iconContainer.appendChild(contentDiv.cloneNode(true));
        bottomRow.appendChild(iconContainer);
        break;
        
      case 'icon-title':
      case 'icon-subtitle':
        // Add stats to right column
        if (!bottomRow.querySelector('.hero-customer-story-stats-container')) {
          const statsContainer = document.createElement('div');
          statsContainer.className = 'hero-customer-story-stats-container';
          bottomRow.appendChild(statsContainer);
        }
        
        const statsContainer = bottomRow.querySelector('.hero-customer-story-stats-container');
        const statContainer = document.createElement('div');
        statContainer.className = `hero-customer-story-${labelText}`;
        statContainer.appendChild(contentDiv.cloneNode(true));
        statsContainer.appendChild(statContainer);
        break;
    }
  });
  
  // Add title to left column
  leftColumn.appendChild(titleContainer);
  
  // Add elements to middle column
  middleColumn.appendChild(logoContainer);
  middleColumn.appendChild(quoteContainer);
  
  // Add elements to right column
  rightColumn.appendChild(bottomRow);
  
  // Clear the block and add the new structure
  block.innerHTML = '';
  block.appendChild(leftColumn);
  block.appendChild(middleColumn);
  block.appendChild(rightColumn);
}