import { decorateIcons } from '../../scripts/aem.js';

export default function decorate(block) {
  // Add desktop-only class to hide on mobile
  block.classList.add('desktop-only');
  
  // Social media platforms and their brand colors
  const socialPlatforms = {
    facebook: {
      color: '#1877F2',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="white" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>'
    },
    twitter: {
      color: '#1DA1F2',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="white" d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>'
    },
    linkedin: {
      color: '#0A66C2',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="white" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>'
    },
    x: {
      color: '#000000',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="white" d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>'
    }
  };
  
  // Create a wrapper to maintain position
  const wrapper = document.createElement('div');
  wrapper.className = 'social-sidebar-wrapper';
  wrapper.style.position = 'relative'; // Important for absolute positioning
  
  // Create the sidebar content container
  const sidebarContent = document.createElement('div');
  sidebarContent.className = 'social-sidebar';

  
  // Process rows to find social media platforms and create social buttons
  const rows = [...block.children];
  
  rows.forEach(row => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const platformText = cells[0].textContent.trim().toLowerCase();
      const shareUrl = cells[1].textContent.trim();
      
      // Check if this is a social media platform
      for (const platformName in socialPlatforms) {
        if (platformText.includes(platformName)) {
          const platform = socialPlatforms[platformName];
          
          // Create a TOC entry for the social button
          const tocEntry = document.createElement('div');
          tocEntry.className = 'toc-entry social-entry';
          
          // Create the social button as a link
          const socialButton = document.createElement('a');
          socialButton.className = 'social-button';
          socialButton.href = shareUrl;
          socialButton.target = '_blank';
          socialButton.rel = 'noopener noreferrer';
          socialButton.setAttribute('aria-label', `Share on ${platformName}`);
          socialButton.style.backgroundColor = platform.color;
          socialButton.innerHTML = platform.icon;
          
          // Add the social button to the TOC entry
          tocEntry.appendChild(socialButton);
          
          // Add the TOC entry to the sidebar
          sidebarContent.appendChild(tocEntry);
        }
      }
    }
  });
  
  // Clear existing content
  while (block.firstChild) {
    block.removeChild(block.firstChild);
  }
  
  // Add the sidebar to the wrapper
  wrapper.appendChild(sidebarContent);
  
  // Add the wrapper to the block
  block.appendChild(wrapper);
  
  // Decorate icons if any
  decorateIcons(block);
  
  // Initialize sidebar immediately instead of waiting for load event
  setTimeout(initWebSidebar, 500);
  
  function initWebSidebar() {
    // Find the parent section or main content area
    const parentSection = findParentSection(block);
    const mainContent = findMainContent();
    
    // Get the sidebar's initial position and dimensions
    const rect = sidebarContent.getBoundingClientRect();
    const sidebarTop = rect.top + window.scrollY;
    const headerHeight = 80; // Estimated header height, adjust if needed
    
    // Get the wrapper width for proper sizing
    const wrapperWidth = wrapper.offsetWidth;
    
    // Store the original left position relative to the wrapper
    const originalLeft = rect.left;
    
    console.log('Initial sidebar position:', {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      wrapperWidth: wrapperWidth,
      height: rect.height,
      sidebarTop: sidebarTop
    });
    
    // Function to handle scrolling
    function handleScroll() {
      const scrollY = window.scrollY;
      const sidebarHeight = sidebarContent.offsetHeight;
      
      // Calculate the bottom boundary of the parent section
      const parentBottom = parentSection ? 
        parentSection.getBoundingClientRect().bottom + window.scrollY : 
        document.body.scrollHeight;
      
      // Calculate the point where the sidebar should stop (accounting for sidebar height)
      const stopPoint = parentBottom - sidebarHeight;
      
      // Determine if we should be sticky and how
      if (scrollY > sidebarTop - headerHeight) {
        // Check if we've hit the bottom boundary
        if (parentSection && scrollY > stopPoint - headerHeight) {
          // Switch to absolute positioning at the bottom
          sidebarContent.style.position = 'absolute';
          sidebarContent.style.top = `${stopPoint - sidebarTop}px`;
          sidebarContent.style.width = `${wrapperWidth}px`;
          sidebarContent.style.left = '0'; // Keep it aligned with the wrapper
        } else {
          // Normal fixed positioning
          sidebarContent.style.position = 'fixed';
          sidebarContent.style.top = `${headerHeight + 20}px`;
          sidebarContent.style.width = `${wrapperWidth}px`;
          
          // Calculate the correct left position to keep it in its container
          const wrapperRect = wrapper.getBoundingClientRect();
          sidebarContent.style.left = `${wrapperRect.left}px`;
        }
      } else {
        // Reset sidebar to normal flow
        sidebarContent.style.position = '';
        sidebarContent.style.top = '';
        sidebarContent.style.width = '';
        sidebarContent.style.left = '';
      }
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    // Add click event handling for smooth scrolling
    sidebarContent.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (link && !link.classList.contains('social-button')) {
        event.preventDefault();
        const targetId = link.getAttribute('href')?.substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          // Scroll to the target with smooth behavior and account for header
          const headerHeight = 80; // Match the header height used elsewhere
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Highlight this section in the TOC
          const allLinks = sidebarContent.querySelectorAll('.toc-entry a:not(.social-button)');
          allLinks.forEach(link => {
            link.classList.remove('active');
          });
          link.classList.add('active');
          
          console.log('Scrolling to section:', targetId);
        }
      }
    });
  }
  
  // Helper function to find the parent section or main content area
  function findParentSection(element) {
    // Look for parent section, main, or specific container classes
    let current = element.parentElement;
    while (current) {
      if (current.tagName === 'SECTION' || 
          current.tagName === 'MAIN' || 
          current.classList.contains('section') ||
          current.classList.contains('main-content')) {
        return current;
      }
      current = current.parentElement;
    }
    return null; // Fall back to document body if no suitable container found
  }
  
  // Helper function to find the main content area
  function findMainContent() {
    // Look for the parent section of the sidebar
    const parentSection = findParentSection(block);
    
    // If we found a parent section, use that
    if (parentSection) {
      return parentSection;
    }
    
    // Fallback to main content container
    const mainContent = document.querySelector('main');
    if (mainContent) return mainContent;
    
    // Further fallback to article or content div
    return document.querySelector('article') || document.querySelector('.content');
  }
}