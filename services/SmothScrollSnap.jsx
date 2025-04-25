import { useEffect } from 'react';

const useSnapScroll = (sectionIds) => {
  useEffect(() => {
    // Variables to track scrolling state
    let isScrolling = false;
    let scrollTimeout = null;
    
    // Sections in order (excluding footer which is handled separately)
    const mainSections = ['top', 'about', 'work', 'contact'];
    
    // Get the element for a section by ID
    const getSection = (id) => document.getElementById(id);
    
    // Scroll to a specific section
    const scrollToSection = (id) => {
      const section = getSection(id);
      if (!section) return false;
      
      window.scrollTo({
        top: section.offsetTop - 80, // 20 tailwind units = 5rem = ~80px
        behavior: 'smooth'
      });
      return true;
    };
    
    // Determine if we're in the footer area
    const isInFooterArea = () => {
      const footer = getSection('footer');
      if (!footer) return false;
      
      const scrollPosition = window.scrollY + window.innerHeight;
      const footerTop = footer.offsetTop;
      
      // We're in footer area if we've scrolled to at least 1/3 of the footer
      return scrollPosition >= footerTop + (footer.offsetHeight / 3);
    };
    
    // Find the current section index
    const getCurrentSectionIndex = () => {
      const scrollPosition = window.scrollY;
      let currentIndex = 0;
      
      for (let i = 0; i < mainSections.length; i++) {
        const section = getSection(mainSections[i]);
        if (!section) continue;
        
        if (scrollPosition >= section.offsetTop - 100) {
          currentIndex = i;
        } else break;
      }
      
      return currentIndex;
    };
    
    // Handle scroll events
    const handleScroll = (direction) => {
      // Special case: When in footer and scrolling up, always go to contact
      if (isInFooterArea() && direction === -1) {
        console.log('Detected scroll up from footer, going to contact section');
        return scrollToSection('contact');
      }
      
      // Get current section index
      const currentIndex = getCurrentSectionIndex();
      
      // Special case: When in contact section and scrolling down, go to footer
      if (currentIndex === mainSections.length - 1 && direction === 1) {
        return scrollToSection('footer');
      }
      
      let targetIndex = currentIndex + direction;
      
      // Ensure target index is within bounds
      targetIndex = Math.max(0, Math.min(targetIndex, mainSections.length - 1));
      
      // If already at target section, don't do anything
      if (targetIndex === currentIndex) return false;
      
      // Scroll to target section
      return scrollToSection(mainSections[targetIndex]);
    };
    
    // Handle wheel events
    const handleWheel = (e) => {
      if (isScrolling) {
        e.preventDefault();
        return;
      }
      
      const direction = e.deltaY > 0 ? 1 : -1;
      e.preventDefault();
      
      // Set scrolling flag and navigate
      isScrolling = true;
      if (handleScroll(direction)) {
        // Reset scrolling flag after animation completes
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => isScrolling = false, 800);
      } else {
        isScrolling = false;
      }
    };
    
    // Handle keyboard navigation
    const handleKeyDown = (e) => {
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
      
      const direction = e.key === 'ArrowDown' ? 1 : -1;
      e.preventDefault();
      
      handleScroll(direction);
    };
    
    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    
    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener('wheel', handleWheel, { passive: false });
      window.removeEventListener('keydown', handleKeyDown);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [sectionIds]);
};

export default useSnapScroll;
