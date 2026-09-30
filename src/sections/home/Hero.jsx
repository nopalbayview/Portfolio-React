'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Lanyard from '../../components/Lanyard';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-screen w-full flex items-center justify-center px-6 md:px-12"
    >
      {/* WRAPPER UTAMA: Menggunakan max-w-6xl dan flex agar posisinya stabil saat zoom-out */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 py-20">
        
        {/* KOLOM KIRI: QUOTE & NAMA */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight text-[#121212] dark:text-white transition-colors duration-300"
          >
            MAKE{' '}
            {/* MORE DENGAN BACKGROUND LOADING EXPAND */}
            <span className="relative inline-block px-3 py-0.5 mx-1 rounded-md text-black overflow-hidden align-middle">
              <span className="absolute inset-0 bg-[#00e5ff] dark:bg-cyan-400 rounded-md z-0 animate-fill-more shadow-[0_0_20px_rgba(6,182,212,0.6)]" />
              <span className="relative z-10 font-black">MORE</span>
            </span>{' '}
            <br className="hidden sm:inline" />
            IF YOU KNOW<br className="hidden sm:inline" />
            JUST{' '}
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            className="mt-6 text-xs sm:text-sm font-mono tracking-[0.25em] text-[#121212]/60 dark:text-gray-400 uppercase transition-colors duration-300"
          >
            Nouval Adibayu Kencono
          </motion.p>
        </div>

        {/* KOLOM KANAN: LANYARD */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-[380px] h-[500px] flex items-center justify-center relative"
        >
          {/* Catatan: Pastikan path foto di bawah ini sesuai dengan folder public project kamu */}
          <Lanyard photo="/public/about/Jiwoo1.png" alt="Nouval Adibayu" accent="#00e5ff" />
        </motion.div>

      </div>
    </section>
  );
}