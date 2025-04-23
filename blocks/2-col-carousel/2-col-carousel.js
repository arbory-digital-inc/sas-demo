/**
 * Decorates the 2-col-carousel block.
 * @param {Element} block The 2-col-carousel block element
 */
export default function decorate(block) {
  // Find the parent wrapper
  let wrapper = block.closest('div');
  if (wrapper && wrapper.classList.contains('block')) {
    wrapper = wrapper.parentElement;
    wrapper.classList.add('two-col-carousel-wrapper');
  }
  
  // Get all rows from the block
  const rows = Array.prototype.slice.call(block.children);
  
  // Create the container for our restructured content
  const container = document.createElement('div');
  container.className = 'col-carousel-container';
  
  // Create left column (40%) for title and image
  const leftColumn = document.createElement('div');
  leftColumn.className = 'col-carousel-left';
  
  // Create right column (60%) for carousel
  const rightColumn = document.createElement('div');
  rightColumn.className = 'col-carousel-right';
  
  // Extract title and image from the first two rows
  let titleContent = '', imageContent = '';
  
  // Process title row
  if (rows[0]) {
    const titleRow = rows[0];
    const titleCells = Array.prototype.slice.call(titleRow.children);
    if (titleCells.length > 1) {
      titleContent = titleCells[1].innerHTML;
    }
  }
  
  // Process image row
  if (rows[1]) {
    const imageRow = rows[1];
    const imageCells = Array.prototype.slice.call(imageRow.children);
    if (imageCells.length > 1) {
      imageContent = imageCells[1].innerHTML;
    }
  }
  
  // Create title element
  const titleElement = document.createElement('div');
  titleElement.className = 'col-carousel-title';
  titleElement.innerHTML = titleContent;
  
  // Create image element
  const imageElement = document.createElement('div');
  imageElement.className = 'col-carousel-image';
  imageElement.innerHTML = imageContent;
  
  // Add title and image to left column
  leftColumn.appendChild(titleElement);
  leftColumn.appendChild(imageElement);
  
  // Create carousel container
  const carouselContainer = document.createElement('div');
  carouselContainer.className = 'carousel-container';
  
  // Create carousel slides container
  const slidesContainer = document.createElement('div');
  slidesContainer.className = 'carousel-slides';
  
  // Extract carousel slides from remaining rows
  const carouselSlides = [];
  
  for (let i = 2; i < rows.length; i++) {
    const row = rows[i];
    const cells = Array.prototype.slice.call(row.children);
    if (cells.length > 1) {
      const slideContent = cells[1].innerHTML;
      carouselSlides.push(slideContent);
    }
  }
  
  // Create slides
  for (let i = 0; i < carouselSlides.length; i++) {
    const slideContent = carouselSlides[i];
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    slide.setAttribute('data-index', i);
    slide.innerHTML = slideContent;
    
    if (i === 0) {
      slide.classList.add('active');
    }
    
    slidesContainer.appendChild(slide);
  }
  
  // Create SVG for left arrow
  const leftArrowSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  leftArrowSvg.setAttribute('viewBox', '0 0 24 24');
  leftArrowSvg.setAttribute('width', '24');
  leftArrowSvg.setAttribute('height', '24');
  leftArrowSvg.setAttribute('aria-hidden', 'true');
  
  const leftArrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  leftArrowPath.setAttribute('d', 'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z');
  leftArrowSvg.appendChild(leftArrowPath);
  
  // Create SVG for right arrow
  const rightArrowSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  rightArrowSvg.setAttribute('viewBox', '0 0 24 24');
  rightArrowSvg.setAttribute('width', '24');
  rightArrowSvg.setAttribute('height', '24');
  rightArrowSvg.setAttribute('aria-hidden', 'true');
  
  const rightArrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  rightArrowPath.setAttribute('d', 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z');
  rightArrowSvg.appendChild(rightArrowPath);
  
  // Create navigation arrows
  const prevArrow = document.createElement('button');
  prevArrow.className = 'carousel-arrow prev-arrow';
  prevArrow.appendChild(leftArrowSvg);
  prevArrow.setAttribute('aria-label', 'Previous slide');
  
  const nextArrow = document.createElement('button');
  nextArrow.className = 'carousel-arrow next-arrow';
  nextArrow.appendChild(rightArrowSvg);
  nextArrow.setAttribute('aria-label', 'Next slide');
  
  // Create indicators
  const indicators = document.createElement('div');
  indicators.className = 'carousel-indicators';
  indicators.setAttribute('role', 'tablist');
  
  for (let i = 0; i < carouselSlides.length; i++) {
    const indicator = document.createElement('button');
    indicator.className = 'carousel-indicator';
    indicator.setAttribute('data-index', i);
    indicator.setAttribute('role', 'tab');
    indicator.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    indicator.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    
    if (i === 0) {
      indicator.classList.add('active');
    }
    
    // Use closure to capture the current index
    (function(index) {
      indicator.addEventListener('click', function() {
        goToSlide(index);
      });
    })(i);
    
    indicators.appendChild(indicator);
  }
  
  // Add elements to carousel container
  carouselContainer.appendChild(prevArrow);
  carouselContainer.appendChild(slidesContainer);
  carouselContainer.appendChild(nextArrow);
  
  // Add carousel and indicators to right column
  rightColumn.appendChild(carouselContainer);
  rightColumn.appendChild(indicators);
  
  // Add columns to container
  container.appendChild(leftColumn);
  container.appendChild(rightColumn);
  
  // Clear the block and add our new structure
  block.innerHTML = '';
  block.appendChild(container);
  
  // Carousel functionality
  let currentSlide = 0;
  const totalSlides = carouselSlides.length;
  
  function goToSlide(index) {
    // Hide all slides
    const slides = slidesContainer.querySelectorAll('.carousel-slide');
    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove('active');
    }
    
    // Show selected slide
    const selectedSlide = slidesContainer.querySelector('.carousel-slide[data-index="' + index + '"]');
    if (selectedSlide) {
      selectedSlide.classList.add('active');
    }
    
    // Update indicators
    const indicatorElements = indicators.querySelectorAll('.carousel-indicator');
    for (let i = 0; i < indicatorElements.length; i++) {
      indicatorElements[i].classList.remove('active');
      indicatorElements[i].setAttribute('aria-selected', 'false');
    }
    
    const selectedIndicator = indicators.querySelector('.carousel-indicator[data-index="' + index + '"]');
    if (selectedIndicator) {
      selectedIndicator.classList.add('active');
      selectedIndicator.setAttribute('aria-selected', 'true');
    }
    
    // Announce slide change for screen readers
    const liveRegion = document.getElementById('carousel-live-region');
    if (!liveRegion) {
      const newLiveRegion = document.createElement('div');
      newLiveRegion.id = 'carousel-live-region';
      newLiveRegion.className = 'screen-reader-only';
      newLiveRegion.setAttribute('aria-live', 'polite');
      document.body.appendChild(newLiveRegion);
    }
    
    document.getElementById('carousel-live-region').textContent = 'Showing slide ' + (index + 1) + ' of ' + totalSlides;
    
    // Update current slide
    currentSlide = index;
  }
  
  function nextSlide() {
    const newIndex = (currentSlide + 1) % totalSlides;
    goToSlide(newIndex);
  }
  
  function prevSlide() {
    const newIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(newIndex);
  }
  
  // Add event listeners to arrows
  prevArrow.addEventListener('click', function() {
    prevSlide();
  });
  
  nextArrow.addEventListener('click', function() {
    nextSlide();
  });
  
  // Add keyboard navigation
  document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
      prevSlide();
    } else if (event.key === 'ArrowRight') {
      nextSlide();
    }
  });
  
  // Add swipe support for touch devices
  let touchStartX = 0;
  let touchEndX = 0;
  
  slidesContainer.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });
  
  slidesContainer.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      // Swipe left, go to next slide
      nextSlide();
    } else if (touchEndX > touchStartX + 50) {
      // Swipe right, go to previous slide
      prevSlide();
    }
  }
}