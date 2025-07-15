import {useEffect, useState} from 'react';

const useSnapScroll = (sectionIds) => {

    const [sections, setSections] = useState()
    const [activeSection, setActiveSection] = useState(0)
    const [targetSection, setTargetSection] = useState(null)
    const [hash, setHash] = useState('')
    const [scrollTimeoutId, setScrollTimeoutId] = useState(null)
    const [timeoutId, setTimeoutId] = useState(null)
    const [isScrolling, setIsScrolling] = useState(false)

    useEffect(() => {
        const idStrings = sectionIds.map(id => `#${id}`).join(', ')
        setSections(document.querySelectorAll(idStrings))
    }, [])

    useEffect(() => {
        if(!sections) return
        
        const hashValue = hash.replace('#', '')
        const index = sectionIds.indexOf(hashValue)
        
        if (index !== -1) {
            setActiveSection(index)
        }
    }, [hash])

    useEffect(() => {
        if (!sections || targetSection === null) return
        window.scrollTo({
            top: sections[targetSection].offsetTop - 80,
            behavior: 'smooth'
        })
        setTimeoutId(setTimeout(() => { setTargetSection(null); setActiveSection(targetSection)}, 450))
    }, [targetSection]);

    const scroll = (dir) => {
        const currentDir = targetSection - activeSection
        if(currentDir !== dir) {
            clearTimeout(timeoutId)
        }
        if(dir < 0 && activeSection > 0) {
            setTargetSection(activeSection - 1)
        }
        if(dir > 0 && activeSection < sections.length - 1) {
            setTargetSection(activeSection + 1)
        }
    }

    const handleScroll = (e) => {
        e.preventDefault();

        if (!sections || isScrolling || targetSection !== null) return
        
        if (scrollTimeoutId) {
            clearTimeout(scrollTimeoutId);
        }

        setIsScrolling(true);
        const direction = e.deltaY > 0 ? 1 : -1;
        setScrollTimeoutId(setTimeout(() => {
            scroll(direction);
            setScrollTimeoutId(null);

            setTimeout(() => {
                setIsScrolling(false);
            }, 750);
        }, 150))
    }

    const handleKeyDown = (e) => {
        if(!sections) return
        
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === ' ') {
            e.preventDefault()
            
            if (e.key === 'ArrowUp') {
                scroll(-1)
            }
            if (e.key === 'ArrowDown') {
                scroll(1)
            }
            if (e.key === ' ') {
                scroll(1) 
            }
        }
    }

    const handleNavLinkClick = () => {
        setTimeout(() => {
            const newHash = window.location.hash
            const hashValue = newHash.replace('#', '')
            const index = sectionIds.indexOf(hashValue)
            
            if (index !== -1) {
                setActiveSection(index)
            }
        }, 50)
    }

    useEffect(() => {
        if(typeof window == 'undefined') return
        
        const navLinks = document.querySelectorAll('a[href^="#"]')
        navLinks.forEach(link => {
            link.addEventListener('click', handleNavLinkClick)
        })
        
        window.addEventListener('wheel', handleScroll, {passive: false});
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('hashchange', () => setHash(window.location.hash));
        
        return () => {
            navLinks.forEach(link => {
                link.removeEventListener('click', handleNavLinkClick)
            })
            window.removeEventListener('wheel', handleScroll);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('hashchange', () => setHash(window.location.hash));
        }
    }, [ sectionIds]);
};

export default useSnapScroll;