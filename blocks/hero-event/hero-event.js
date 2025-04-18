/**
 * Builds hero-event block based on the Adobe Document Authoring structure.
 * @param {Element} main The container element
 */
function buildHeroEventBlock(main) {
    // Find all hero-event containers
    const heroEventContainers = main.querySelectorAll('.hero-event-container');
    if (!heroEventContainers.length) return;
    
    heroEventContainers.forEach(container => {
      // Get the original hero-event block
      const originalBlock = container.querySelector('.hero-event');
      if (!originalBlock) return;
      
      // Create new structure
      const heroEventWrapper = document.createElement('div');
      heroEventWrapper.className = 'hero-event-wrapper';
      
      const heroEventBlock = document.createElement('div');
      heroEventBlock.className = 'hero-event block';
      heroEventBlock.setAttribute('data-block-name', 'hero-event');
      heroEventBlock.setAttribute('data-block-status', 'loaded');
      
      // Create content container
      const contentContainer = document.createElement('div');
      contentContainer.className = 'hero-event-content-container';
      
      // Extract content from original structure
      let backgroundImageElement = null;
      let overlayElement = null;
      let logoElement = null;
      let eventDateElement = null;
      let titleElement = null;
      let descriptionElement = null;
      let buttonLink1Element = null;
      let buttonLink2Element = null;
      
      // Process each content div
      const contentDivs = originalBlock.querySelectorAll(':scope > div');
      contentDivs.forEach(div => {
        const labelDiv = div.querySelector(':scope > div:first-child');
        const contentDiv = div.querySelector(':scope > div:last-child');
        
        if (!labelDiv || !contentDiv) return;
        
        const labelText = labelDiv.textContent.trim().toLowerCase();
        
        switch (labelText) {
          case 'background-image':
            backgroundImageElement = contentDiv.querySelector('picture');
            break;
          case 'overlay':
            overlayElement = contentDiv;
            break;
          case 'logo':
            logoElement = contentDiv;
            break;
          case 'event-date':
            eventDateElement = contentDiv;
            break;
          case 'title':
            titleElement = contentDiv;
            break;
          case 'description':
            descriptionElement = contentDiv;
            break;
          case 'button-link-1':
            buttonLink1Element = contentDiv;
            break;
          case 'button-link-2':
            buttonLink2Element = contentDiv;
            break;
        }
      });
      
      // Add background image
      if (backgroundImageElement) {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'hero-event-image-container';
        imageContainer.appendChild(backgroundImageElement.cloneNode(true));
        heroEventBlock.appendChild(imageContainer);
      }
      
      // Add overlay (swirl)
      if (overlayElement) {
        // Check if the overlay already has content
        const existingImg = overlayElement.querySelector('img');
        
        if (!existingImg) {
          // If no image exists, try to add one
          overlayElement.innerHTML = `
            <img 
              src="../../img/innovate-track-art4.png" 
              alt="Decorative swirl" 
              style="
                position: absolute;
                right: 0;
                top: -180px;
                transform: rotate(10deg) scale(0.7);
                -webkit-mask-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 10%);
                mask-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 10%);
                z-index: 1;
                pointer-events: none;
              "
            >
          `;
        }
        
        const overlayContainer = document.createElement('div');
        overlayContainer.className = 'hero-event-overlay-container';
        overlayContainer.innerHTML = overlayElement.innerHTML;
        heroEventBlock.appendChild(overlayContainer);
      }
      
      // Add logo
      if (logoElement) {
        const logoContainer = document.createElement('div');
        logoContainer.className = 'hero-event-logo-container';
        logoContainer.innerHTML = logoElement.innerHTML;
        contentContainer.appendChild(logoContainer);
      }
      
      // Add event date
      if (eventDateElement) {
        const eventDateContainer = document.createElement('div');
        eventDateContainer.className = 'hero-event-date-container';
        eventDateContainer.innerHTML = eventDateElement.innerHTML;
        contentContainer.appendChild(eventDateContainer);
      }
      
      // Add title
      if (titleElement) {
        const titleContainer = document.createElement('div');
        titleContainer.className = 'hero-event-title-container';
        titleContainer.innerHTML = titleElement.innerHTML;
        contentContainer.appendChild(titleContainer);
      }
      
      // Add description
      if (descriptionElement) {
        const descriptionContainer = document.createElement('div');
        descriptionContainer.className = 'hero-event-description-container';
        descriptionContainer.innerHTML = descriptionElement.innerHTML;
        contentContainer.appendChild(descriptionContainer);
      }
      
      // Add buttons container
      const buttonsContainer = document.createElement('div');
      buttonsContainer.className = 'hero-event-buttons-container';
      
      // Add button 1
      if (buttonLink1Element) {
        const button1Container = document.createElement('div');
        button1Container.className = 'hero-event-button-container button-1';
        
        // Clone the original button container content
        const originalButton1 = buttonLink1Element.querySelector('.button-container');
        if (originalButton1) {
          // Get the button element directly
          const originalButtonElement = originalButton1.querySelector('a.button');
          if (originalButtonElement) {
            // Create a direct button without paragraph wrapper
            const buttonElement = originalButtonElement.cloneNode(true);
            buttonElement.classList.add('button-1');
            button1Container.appendChild(buttonElement);
          } else {
            button1Container.innerHTML = originalButton1.innerHTML;
          }
          buttonsContainer.appendChild(button1Container);
        }
      }
      
      // Add button 2
      if (buttonLink2Element) {
        const button2Container = document.createElement('div');
        button2Container.className = 'hero-event-button-container button-2';
        
        // Clone the original button container content
        const originalButton2 = buttonLink2Element.querySelector('.button-container');
        if (originalButton2) {
          // Get the button element directly
          const originalButtonElement = originalButton2.querySelector('a.button');
          if (originalButtonElement) {
            // Create a direct button without paragraph wrapper
            const buttonElement = originalButtonElement.cloneNode(true);
            buttonElement.classList.add('button-2');
            button2Container.appendChild(buttonElement);
          } else {
            button2Container.innerHTML = originalButton2.innerHTML;
          }
          buttonsContainer.appendChild(button2Container);
        }
      }
      
      // Add buttons container to content container
      contentContainer.appendChild(buttonsContainer);
      
      // Add content container to hero-event block
      heroEventBlock.appendChild(contentContainer);
      
      // Add gradients for better text visibility
      const gradients = document.createElement('div');
      gradients.className = 'gradients';
      
      const leftGradient = document.createElement('div');
      leftGradient.className = 'left';
      
      const rightGradient = document.createElement('div');
      rightGradient.className = 'right';
      
      gradients.appendChild(leftGradient);
      gradients.appendChild(rightGradient);
      
      heroEventBlock.appendChild(gradients);
      
      // Add hero-event block to wrapper
      heroEventWrapper.appendChild(heroEventBlock);
      
      // Replace original content with new structure
      container.innerHTML = '';
      container.appendChild(heroEventWrapper);
      
      // Adjust margin if sub-header is present
      adjustHeroMarginForSubHeader(container);
    });
    
    // Function to adjust hero margin when sub-header is present
    function adjustHeroMarginForSubHeader(heroContainer) {
      // Check if sub-header exists and is inside the header
      const subHeaderInHeader = document.querySelector('.sub-header-in-header');
      
      if (subHeaderInHeader) {
        // Get the height of the sub-header
        const subHeaderHeight = subHeaderInHeader.offsetHeight;
        
        // Apply margin to the hero container
        if (subHeaderHeight > 0) {
          heroContainer.style.marginTop = `${subHeaderHeight}px`;
        }
        
        // Listen for window resize to adjust margin
        window.addEventListener('resize', () => {
          const updatedHeight = subHeaderInHeader.offsetHeight;
          if (updatedHeight > 0) {
            heroContainer.style.marginTop = `${updatedHeight}px`;
          }
        });
      }
    }
  }
  
  // Add the block to the blocks object for initialization
  (function() {
    const { buildBlock, loadBlocks } = window.nx;
    
    // Define the hero-event block builder
    buildBlock('hero-event', buildHeroEventBlock);
    
    // Run on document load
    document.addEventListener('DOMContentLoaded', () => {
      loadBlocks(document.querySelector('main'));
    });
  })();