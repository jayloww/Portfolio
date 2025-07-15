import React from 'react'
import { assets, workData } from '@/assets/assets'
import Image from 'next/image'
import { motion } from 'motion/react'
import { easeOut } from 'motion'

const Work = ({ isDarkMode }) => {
  return (
    <motion.div 
    initial={{ opacity: 0}}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    id='work' 
    className='w-full px-[12%] py-10 scroll-mt-20'>
      <motion.h4 
      initial={{ y: -20, opacity: 0}}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className='text-center mb-2 text-lg font-Ovo'>
        My Portfolio
      </motion.h4>
      <motion.h2 
      initial={{ y: -20, opacity: 0}}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className='text-center text-5xl font-Ovo'>
        My latest Work
      </motion.h2>
      
      <motion.p 
      initial={{ opacity: 0}}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className='text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo'>
        Welcome to my web development portfolio! Explore a collection of projects showcasing my expertise in front-end development.
      </motion.p>
    <motion.div 
    initial={{y : 10, opacity: 0, scale: 0.8 }}
    whileInView={{
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        duration: 0.8,
        delay: 0.6,
        opacity: { duration: 0.8, delay: 0.6 },
        scale: { duration: 1.0, delay: 0.6 }
      }
    }}
    transition={{ delay: 0.6, duration: 0.5 }}
    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 gap-5 dark:text-black' style={{ gridGap: '20px' }}>
        {workData.map((project, index)=>(
            <motion.div key={index} 
            className='relative w-full max-w-[464px] aspect-[464/295] rounded-lg overflow-hidden mx-auto cursor-pointer'
            initial="initial"
            whileHover="hover"
            >
              <div
              className={`absolute inset-0 bg-cover bg-center`}
              style={{backgroundImage: `url(${project.bgImage})`}}
              ></div>
              <motion.div
              variants={{
                initial: { y: '100%', opacity: 0 },
                hover: { y: '0%', opacity: 0.95 }
              }}
              transition={{ duration: 0.6,ease: [0.0, 0.0, 0.3, 1] }}
              className="absolute inset-0"
              style={{ backgroundColor: project.bgcolor, color: project.fontcolor }}
              >
                <div className="flex flex-col justify-center items-center h-full text-center p-6">
                  <h3 className="text-2xl font-semibold mb-3" style={{ color: project.fontcolor, whiteSpace: 'pre-line' }}>{project.title}</h3>
                  <p className="text-xl leading-relaxed max-w-[80%] font-Ovo" style={{ color: project.fontcolor }}>{project.description}</p>
                </div>
              </motion.div>  
            </motion.div>
        ))}
    </motion.div>
      <motion.a href="/projects" 
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1, ease: 'linear'}}
      className='w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] border-gray-700 rounded-full py-3 px-10 mx-auto my-20 hover:bg-lightHover duration-500 dark:text-white dark:border-white dark:hover:bg-darkHover'>
        Show more 
        <Image src={isDarkMode ? assets.right_arrow_bold_dark : assets.right_arrow_bold} alt='right arrow' className='w-4'/>
      </motion.a>
    </motion.div>
  )
}

export default Work
