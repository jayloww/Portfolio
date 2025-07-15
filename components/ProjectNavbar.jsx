import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import Link from 'next/link'

const ProjectNavbar = ({ isDarkMode, setIsDarkMode }) => {
  const [isScroll, setIsScroll] = useState(false);
  const sideMenuRef = useRef();

  const openMenu = () => {
    sideMenuRef.current.style.transform = 'translateX(-16rem)'
  }

  const closeMenu = () => {
    sideMenuRef.current.style.transform = 'translateX(16rem)'
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (scrollY > 50) {
        setIsScroll(true)
      } else {
        setIsScroll(false)
      }
    })
  }, [])

  return (
    <>
      <div className='fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] dark:hidden'>
        <Image src={assets.header_bg_color} alt="" className='w-full' priority />
      </div>

      <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 ${isScroll ? 'bg-white bg-opacity-50 backdrop-blur-lg shadow-sm dark:bg-darkTheme dark:shadow-white/20' : ''}`}>
        <Link href="/">
          <div className='flex items-center gap-2 cursor-pointer'>
            <Image src={isDarkMode ? assets.right_arrow_white : assets.right_arrow_bold} alt="Back" className='w-4 rotate-180' />
            <span className='font-Ovo'>Back to Home</span>
          </div>
        </Link>

        <div className='hidden md:flex items-center rounded-full px-6 py-2 absolute left-1/2 transform -translate-x-1/2'>
          <h2 className='font-Ovo text-lg'>My Projects</h2>
        </div>

        <div className='flex items-center gap-4'>
          <button onClick={() => setIsDarkMode(prev => !prev)}>
            <Image src={isDarkMode ? assets.sun_icon : assets.moon_icon} alt="" className='w-6' />
          </button>

          <button className='block md:hidden ml-3' onClick={openMenu}>
            <Image src={isDarkMode ? assets.menu_white : assets.menu_black} alt="" className='w-6' />
          </button>
        </div>

        {/* Mobile menu */}
        <ul ref={sideMenuRef} className='flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500 dark:bg-darkHover dark:text-white'>
          <div className='absolute right-6 top-6' onClick={closeMenu}>
            <Image src={isDarkMode ? assets.close_white : assets.close_black} alt="" className='w-5 cursor-pointer' />
          </div>

          {/* Project navigation links will be dynamically generated based on projects */}
          <li><Link href="/" className='font-Ovo' onClick={closeMenu}>Back to Home</Link></li>
        </ul>
      </nav>
    </>
  )
}

export default ProjectNavbar