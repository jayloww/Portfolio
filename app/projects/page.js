'use client'
import { useState, useEffect } from "react";
import ProjectNavbar from "@/components/ProjectNavbar";
import { motion } from "motion/react";
import Image from "next/image";
import { assets, workData } from "@/assets/assets";
import useSnapScroll from "@/services/SmothScrollSnap";
import Footer from "@/components/Footer";

export default function Projects() {
  // Get project IDs for smooth scrolling (one section per project)
  const projectSections = workData.map(project => {
    // Create valid CSS selector IDs - replace spaces, colons, and other invalid characters
    const safeId = `project-${(project.id || project.title)
      .replace(/[^a-zA-Z0-9]/g, '-') // Replace any non-alphanumeric character with dash
      .replace(/-{2,}/g, '-') // Replace multiple consecutive dashes with a single dash
      .toLowerCase()}`;
    return safeId;
  });
  
  // Enable smooth scrolling between project sections
  useSnapScroll(['project-header', ...projectSections, 'footer']);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    // Check if there's a hash in the URL to directly navigate to a project
    if (window.location.hash) {
      const projectId = window.location.hash.substring(1);
      setActiveProject(projectId);
    } else {
      // Default to first project if no hash
      setActiveProject(projectSections[0]);
    }
    
    // Handle dark mode
    if (localStorage.getItem("theme") === "dark" || (!('theme' in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "";
    }
  }, [isDarkMode]);

  return (
    <>
      //<ProjectNavbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      {/* Project Header Section */}
      <motion.div
        id="project-header"
        className="w-full px-[12%] py-10 scroll-mt-20 h-screen flex flex-col justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h4
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-center mb-2 text-lg font-Ovo"
        >
          My Portfolio
        </motion.h4>
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-center text-5xl font-Ovo"
        >
          Project Showcase
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo"
        >
          Explore my featured projects in detail. Scroll down to view each project or use the navigation menu.
        </motion.p>
        
        {/* Project Navigation */}
        <motion.div
          initial={{ y: 20, opacity: 0, scale: 0.8 }}
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
            }
          }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          {workData.map((project, index) => (
            <a
              key={index}
              href={`#${projectSections[index]}`}
              className={`px-6 py-2 rounded-full border transition-all duration-300 ${
                activeProject === projectSections[index]
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'border-gray-400 hover:bg-gray-100 dark:border-white/50 dark:hover:bg-darkHover'
              }`}
            >
              {project.title}
            </a>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Individual Project Sections */}
      {workData.map((project, index) => (
        <motion.div
          key={index}
          id={projectSections[index]}
          className="w-full px-[12%] py-20 min-h-screen scroll-mt-20 flex flex-col justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Project Header */}
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h2 className="text-4xl font-Ovo mb-4">{project.title}</h2>
              <p className="text-xl font-Ovo max-w-3xl mx-auto">{project.description}</p>
            </motion.div>
            
            {/* Project Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="w-full aspect-video mb-16 overflow-hidden rounded-xl"
              style={{ backgroundColor: project.bgcolor }}
            >
              <Image
                src={project.bgImage}
                alt={project.title}
                width={1200}
                height={675}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <h3 className="text-2xl font-Ovo mb-4">Project Overview</h3>
                <p className="text-lg mb-6">
                  This is a detailed description of the {project.title} project. Add more comprehensive information about the project goals, challenges, and solutions.
                </p>
                
                <h4 className="text-xl font-Ovo mb-2">Technologies Used</h4>
                <ul className="list-disc pl-5 mb-6">
                  <li>React.js</li>
                  <li>Next.js</li>
                  <li>Tailwind CSS</li>
                  <li>Framer Motion</li>
                </ul>
                
                <div className="flex gap-4 mt-8">
                  <a
                    href="#"
                    className="px-6 py-2 bg-black text-white rounded-full flex items-center gap-2 dark:bg-transparent dark:border dark:border-white"
                  >
                    Live Demo
                    <Image src={assets.right_arrow_white} alt="arrow" className="w-4" />
                  </a>
                  <a
                    href="#"
                    className="px-6 py-2 border border-gray-400 rounded-full flex items-center gap-2 dark:border-white/50"
                  >
                    Source Code
                    <Image
                      src={isDarkMode ? assets.right_arrow_white : assets.right_arrow_bold}
                      alt="arrow"
                      className="w-4"
                    />
                  </a>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <h3 className="text-2xl font-Ovo mb-4">Key Features</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white shrink-0 mt-1 dark:bg-white dark:text-black">
                      1
                    </div>
                    <p>Responsive design that works seamlessly across all devices</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white shrink-0 mt-1 dark:bg-white dark:text-black">
                      2
                    </div>
                    <p>Modern animations and transitions for enhanced user experience</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white shrink-0 mt-1 dark:bg-white dark:text-black">
                      3
                    </div>
                    <p>Intuitive navigation and user-friendly interface</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white shrink-0 mt-1 dark:bg-white dark:text-black">
                      4
                    </div>
                    <p>Performance optimized for fast loading times</p>
                  </li>
                </ul>
              </motion.div>
            </div>
            
            {/* Navigation Between Projects */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex justify-between mt-20"
            >
              <a
                href={`#${index > 0 ? projectSections[index - 1] : 'project-header'}`}
                className="flex items-center gap-2 px-6 py-2 border border-gray-400 rounded-full dark:border-white/50"
              >
                <Image
                  src={isDarkMode ? assets.right_arrow_white : assets.right_arrow_bold}
                  alt="Previous"
                  className="w-4 rotate-180"
                />
                Previous Project
              </a>
              <a
                href={`#${index < workData.length - 1 ? projectSections[index + 1] : 'footer'}`}
                className="flex items-center gap-2 px-6 py-2 border border-gray-400 rounded-full dark:border-white/50"
              >
                Next Project
                <Image
                  src={isDarkMode ? assets.right_arrow_white : assets.right_arrow_bold}
                  alt="Next"
                  className="w-4"
                />
              </a>
            </motion.div>
          </div>
        </motion.div>
      ))}
      
      <Footer isDarkMode={isDarkMode} />
    </>
  );
}