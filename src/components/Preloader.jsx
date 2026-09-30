'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Preloader() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gray-50 dark:bg-black overflow-hidden transition-colors duration-300">
      
      <div className="relative w-64 md:w-80 h-16 md:h-20 border-3 border-black/10 dark:border-white/10 overflow-hidden bg-transparent transition-colors duration-300">
        
        {/* Layer 1: Teks dasar (Hitam di Light Mode, Putih di Dark Mode) */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <span className="text-xl md:text-2xl font-black uppercase tracking-widest font-sans text-gray-900 dark:text-white transition-colors duration-300">
            Loading<span className="animate-pulse">...</span>
          </span>
        </div>

        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut", repeat: Infinity }}
          className="absolute left-0 top-0 h-full bg-cyan-400 z-10 overflow-hidden"
        >
          {/* Layer 3: Teks terbalik (Putih di Light Mode, Hitam di Dark Mode) */}
          <div className="w-64 md:w-80 h-16 md:h-20 flex items-center justify-center">
            <span className="text-xl md:text-2xl font-black uppercase tracking-widest font-sans text-white dark:text-[#121212] transition-colors duration-300">
              Loading<span className="animate-pulse">...</span>
            </span>
          </div>
        </motion.div>

      </div>
      
      {/* Efek cahaya yang menyesuaikan intensitas berdasarkan tema */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[100px] bg-cyan-500/20 dark:bg-cyan-500/10 blur-[80px] pointer-events-none" />

    </div>
  );
}