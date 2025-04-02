import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import { motion } from "motion/react"

const Header = () => {
  return (
    <div className='w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4'>
      <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100}}
      >
        <Image src={assets.profile_img} alt="" className= 'rounded-full w-32' />
      </motion.div>
      
      <motion.h3
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 100}}
        className='flex items-end gap-2 text-xl md:text-2xl md-3 font-Ovo'>Hi! I'm Jakob Lauterwasser <Image src={assets.hand_icon} alt="" className='w-6'/>
      </motion.h3>
      
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100}}
        className='text-3xl sm:text-6xl lg:text-[66px] font-Ovo'>Frontend web developer based in Munich.
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7}}
        className='max-w-2xl mx-auto font-Ovo'>
        I am an aspiring frontend web developer with a passion for creating visually stunning and user-friendly websites.
      </motion.p>

      <div className='flex flex-col sm:flex-row items-center gap-4 mt-4'>
        
        <motion.a
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1}}
          href="#contact" className='px-10 py-3 border border-white rounded-full bg-black text-white flex items-center gap-2 dark:bg-transparent'>Contact me <Image src={assets.right_arrow_white} alt="" className= 'w-4' />
        </motion.a>
        
        <motion.a
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2}}
          href="/sample-resume.pdf" download className='px-10 py-3 border border-gray-500 rounded-full flex items-center gap-2 bg-white dark:text-black'>My resume <Image src={assets.download_icon} alt="" className='w-4 h-4 object-contain' />
        </motion.a>
        
      </div>
    </div>
  )
}

export default Header
