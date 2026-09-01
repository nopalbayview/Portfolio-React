import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
      <section 
        id="hero" 
        className="min-h-screen w-full flex flex-col items-center justify-center text-center px-6"
      >
        <motion.h1
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0}}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut"  }}
        className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight max-w-3xl leading-tight text-[#121212] dark:text-white transition-colors duration-300"
        >
          MAKE{' '}
          {/* MORE DENGAN BACKGROUND LOADING EXPAND */}
          <span className="relative inline-block px-3 py-0.5 mx-1 rounded-md text-black overflow-hidden align-middle">
            <span 
              className="absolute inset-0 bg-[#00e5ff] dark:bg-cyan-400 rounded-md z-0 animate-fill-more shadow-[0_0_20px_rgba(6,182,212,0.6)]" 
            />
            <span className="relative z-10 font-black">
              MORE
            </span>
          </span>
          , IF YOU <br className="hidden sm:inline" />
          KNOW JUST{' '}
          {/* DO IT DENGAN GLITCH & CYAN GLOW */}
          <span 
            className="glitch-text text-cyan-500 dark:text-cyan-400 font-black tracking-wider drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]"
            data-text="DO IT"
          >
            DO IT
          </span>
        </motion.h1>
        <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0}}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }} 
        className="mt-6 text-xs sm:text-sm font-mono tracking-[0.25em] text-[#121212]/60 dark:text-gray-400 uppercase transition-colors duration-300">
          Nouval Adibayu Kencono
        </motion.p>
      </section>
    );
}