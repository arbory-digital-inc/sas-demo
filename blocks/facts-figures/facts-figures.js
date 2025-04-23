/**
 * Decorates the facts-figures block.
 * @param {Element} block The facts-figures block element
 */
export default function decorate(block) {
  // Get all the rows in the block
  const rows = [...block.children];
  
  // Based on the HTML structure, we need to rearrange the content
  // First row has title info
  const titleRow = rows[0];
  
  // Extract the title (second cell in the first row)
  const titleText = titleRow.children[1]?.querySelector('p')?.textContent || '';
  
  // Create a proper title element
  const titleElement = document.createElement('div');
  titleElement.className = 'facts-figures-title';
  const titleHeading = document.createElement('h2');
  titleHeading.textContent = titleText;
  titleElement.appendChild(titleHeading);
  
  // The rows are currently in the wrong order:
  // Row 0: Title info (with "title" label)
  // Row 1: Images
  // Row 2: Stats
  // Missing: Descriptions row with yearly attendance, etc.
  
  // Correct row assignments
  const imageRow = rows[1]; // Contains the images
  imageRow.classList.add('facts-figures-images');
  
  const statsRow = rows[2]; // Contains the numbers (682,000, 100%, 20%)
  statsRow.classList.add('facts-figures-stats');
  
  // Create a descriptions row with the correct content
  const descRow = document.createElement('div');
  descRow.classList.add('facts-figures-descriptions');
  
  // Add three columns to the descriptions row
  const desc1 = document.createElement('div');
  desc1.innerHTML = '<p>yearly attendance</p>';
  
  const desc2 = document.createElement('div');
  desc2.innerHTML = '<p>of season ticket holders use team app</p>';
  
  const desc3 = document.createElement('div');
  desc3.innerHTML = '<p>increase in fan satisfaction with in-venue technology</p>';
  
  descRow.appendChild(desc1);
  descRow.appendChild(desc2);
  descRow.appendChild(desc3);
  
  // Make sure all images are properly sized
  const images = block.querySelectorAll('img');
  images.forEach(img => {
    // Set height to 100px while maintaining aspect ratio
    img.style.height = '100px';
    img.style.width = 'auto';
  });
  
  // Clear the block and rebuild it with our structure
  block.innerHTML = '';
  
  // Add title row
  block.appendChild(titleElement);
  
  // Add content rows
  block.appendChild(imageRow);
  block.appendChild(statsRow);
  block.appendChild(descRow);
}