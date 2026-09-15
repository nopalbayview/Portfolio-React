'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react'; // Icon panah yang sama dengan contact
import { techRow1, techRow2 } from '../../data/home/techstack';

export default function TechStack() {
  const row1 = [...techRow1, ...techRow1, ...techRow1];
  const row2 = [...techRow2, ...techRow2, ...techRow2];

  return (
    <section id="techstack"
      className="relative w-full py-24 overflow-hidden transition-colors duration-300">

      <div 
        aria-hidden="true" 
        className="absolute top-0 bottom-0 left-[50%] w-[100vw] -translate-x-1/2 bg-grid-pattern opacity-70 pointer-events-none"
      />
      
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-6 mb-20 flex flex-col items-start text-left space-y-1">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0}}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          // Ukuran dibesarkan (lg:text-[80px]) dan jarak atas-bawah dirapatkan (leading-none)
          className="w-fit text-5xl md:text-6xl lg:text-[80px] font-sans font-black tracking-tighter max-w-3xl leading-none text-black dark:text-white">Tech Stack
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          // Subtitle dibuat tebal (font-bold) dengan warna Cyan menyala
          className="text-base md:text-sm font-bold text-gray-400 font-plex tracking-tight">Tools & Technologies
        </motion.p>
      </div>

      {/* GRID ANIMASI MARQUEE */}
      <div className="w-full flex flex-col gap-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        
        {/* BARIS 1 */}
        <div className="flex w-max animate-marquee-left hover:[animation-play-state:paused] gap-12">
          {row1.map((tech, index) => (
            <div 
              key={`row1-${index}`} 
              // Background, border, dan shadow dihapus. Diganti dengan padding yang lebih kecil.
              className="group flex items-center justify-center gap-4 px-2 py-2 min-w-[140px] cursor-pointer transition-all duration-300 hover:-translate-y-1"
            >
              <img 
                src={tech.icon} 
                alt={tech.name} 
                // Menambahkan sedikit efek glow (drop-shadow) pada icon saat di-hover
                className="w-8 h-8 md:w-9 md:h-9 object-contain transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" 
              />
              <span className="text-[#121212]/80 dark:text-gray-400 font-bold font-mono text-base md:text-lg group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                {tech.name}
              </span>
            </div>
          ))}
        </div>

        {/* BARIS 2 */}
        <div className="flex w-max animate-marquee-right hover:[animation-play-state:paused] gap-12">
          {row2.map((tech, index) => (
            <div 
              key={`row2-${index}`} 
              className="group flex items-center justify-center gap-4 px-2 py-2 min-w-[140px] cursor-pointer transition-all duration-300 hover:-translate-y-1"
            >
              <img 
                src={tech.icon} 
                alt={tech.name} 
                className="w-8 h-8 md:w-9 md:h-9 object-contain transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" 
              />
              <span className="text-[#121212]/80 dark:text-gray-400 font-bold font-mono text-base md:text-lg group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                {tech.name}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* TOMBOL "SEE MY PROJECTS" */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="mt-24 px-6 flex justify-center relative z-10 mb-10"
      >
        <Link 
          href="/projects" 
          className="inline-flex w-max bg-cyan-400 hover:bg-cyan-300 text-black font-black tracking-wide py-4 px-8 rounded-xl justify-center items-center gap-2 transition-all duration-300 active:scale-95 shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)]"
        >
          See My Projects <ArrowRight size={18} />
        </Link>
      </motion.div>

    </section>
  );
}