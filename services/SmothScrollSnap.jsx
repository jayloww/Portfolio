import { useEffect } from 'react';

const useSnapScroll = (sectionIds) => {
  useEffect(() => {
    let isScrolling = false;
    let scrollTimeout = null;
    let isSnapScrollEnabled = window.innerWidth >= 1024;
    
    const mainSections = ['top', 'about', 'work', 'contact'];
    
    const checkSnapScrollEnabled = () => {
      isSnapScrollEnabled = window.innerWidth >= 1024;
    };
    
    const getSection = (id) => document.getElementById(id);
    
    const scrollToSection = (id) => {
      const section = getSection(id);
      if (!section) return false;
      
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
      return true;
    };
    
    const isInFooterArea = () => {
      const footer = getSection('footer');
      if (!footer) return false;
      
      const scrollPosition = window.scrollY + window.innerHeight;
      const footerTop = footer.offsetTop;
      
      return scrollPosition >= footerTop + (footer.offsetHeight / 3);
    };
    
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
    
    const handleScroll = (direction) => {
      if (isInFooterArea() && direction === -1) {
        console.log('Detected scroll up from footer, going to contact section');
        return scrollToSection('contact');
      }
      const currentIndex = getCurrentSectionIndex();
      
      if (currentIndex === mainSections.length - 1 && direction === 1) {
        return scrollToSection('footer');
      }
      
      let targetIndex = currentIndex + direction;
      
      targetIndex = Math.max(0, Math.min(targetIndex, mainSections.length - 1));
      
      if (targetIndex === currentIndex) return false;
      
      return scrollToSection(mainSections[targetIndex]);
    };
    
    const handleWheel = (e) => {
      if (!isSnapScrollEnabled) return;
      
      if (isScrolling) {
        e.preventDefault();
        return;
      }
      
      const direction = e.deltaY > 0 ? 1 : -1;
      e.preventDefault();
      
      isScrolling = true;
      if (handleScroll(direction)) {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => isScrolling = false, 800);
      } else {
        isScrolling = false;
      }
    };
    
    const handleKeyDown = (e) => {
      if (!isSnapScrollEnabled) return;
      
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
      
      const direction = e.key === 'ArrowDown' ? 1 : -1;
      e.preventDefault();
      
      handleScroll(direction);
    };
    
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', checkSnapScrollEnabled);
    
    checkSnapScrollEnabled();
    
    return () => {
      window.removeEventListener('wheel', handleWheel, { passive: false });
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', checkSnapScrollEnabled);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [sectionIds]);
};

export default useSnapScroll;
