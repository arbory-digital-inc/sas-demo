export default function decorate(block) {
  // Get the rows from the block
  const rows = [...block.children];
  
  if (rows.length < 2) {
    console.warn('Sub-header block is missing expected rows');
    return;
  }
  
  try {
    // Extract title and button elements
    const titleRow = rows[0];
    const buttonRow = rows[1];
    
    // Get the actual title content (second div in first row)
    const titleDiv = titleRow.children[1];
    
    // Get the button container (second div in second row)
    const buttonDiv = buttonRow.children[1];
    
    if (!titleDiv || !buttonDiv) {
      console.warn('Required elements not found in sub-header');
      return;
    }
    
    // Create a new container for our restructured content
    const newContainer = document.createElement('div');
    newContainer.className = 'sub-header-content';
    
    // Create and populate title element
    const titleElement = document.createElement('div');
    titleElement.className = 'sub-header-title';
    titleElement.innerHTML = titleDiv.innerHTML;
    
    // Create and populate button element
    const buttonElement = document.createElement('div');
    buttonElement.className = 'sub-header-button';
    buttonElement.innerHTML = buttonDiv.innerHTML;
    
    // Add elements to the new container
    newContainer.appendChild(titleElement);
    newContainer.appendChild(buttonElement);
    
    // Replace the block's content with our new structure
    block.innerHTML = '';
    block.appendChild(newContainer);
    
    // Make the sub-header sticky to the header
    const setupStickySubHeader = () => {
      // Get the sub-header container and wrapper
      const subHeaderContainer = document.querySelector('.sub-header-container');
      const subHeaderWrapper = block.closest('.sub-header-wrapper');
      
      if (!subHeaderContainer || !subHeaderWrapper) return;
      
      // Get the header
      const header = document.querySelector('header');
      if (!header) return;
      
      // Move the sub-header into the header
      const headerWrapper = header.querySelector('.nav-wrapper');
      if (headerWrapper) {
        // Create a container for the sub-header inside the header
        const subHeaderInHeader = document.createElement('div');
        subHeaderInHeader.className = 'sub-header-in-header';
        subHeaderInHeader.style.width = '100%';
        subHeaderInHeader.style.backgroundColor = '#032954';
        
        // Clone the sub-header content
        subHeaderInHeader.appendChild(newContainer.cloneNode(true));
        
        // Add the sub-header to the header
        headerWrapper.appendChild(subHeaderInHeader);
        
        // Hide the original sub-header
        subHeaderContainer.style.display = 'none';
      }
    };
    
    // Setup after a short delay to ensure DOM is ready
    setTimeout(setupStickySubHeader, 100);
    
  } catch (error) {
    console.error('Error in sub-header block:', error);
  }
}