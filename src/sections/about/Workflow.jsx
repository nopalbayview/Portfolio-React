import React from 'react';
import { motion } from 'framer-motion';
import { capabilitiesData } from '../../data/about/about';
import GlowCard from '../../components/Glowcard';

export default function Workflow() {
  return (
    <section 
      id="workflow" 
      className="relative w-full py-24 overflow-hidden transition-colors duration-300"
    >
      {/* Background Grid */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 bottom-0 left-[50%] w-[100vw] -translate-x-1/2 bg-grid-pattern opacity-70 pointer-events-none" 
      />

      {/* PERUBAHAN: Container Utama yang membungkus Judul DAN Grid */}
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-6">
        
        {/* =========================================
            HEADER & SUBTITLE
        ========================================= */}
        <div className="mb-16 flex flex-col items-start text-left space-y-1">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0}}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-fit text-5xl md:text-6xl lg:text-[80px] font-sans font-black tracking-tighter max-w-3xl leading-none text-black dark:text-white"
          >
            What I Do?
          </motion.h2>
  
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            // Warna disesuaikan dengan Cyan agar konsisten dengan tema
            className="text-base md:text-sm font-bold text-gray-400 font-plex tracking-tight"
          >
            Services
          </motion.p>
        </div>

        {/* =========================================
            GRID CARDS
        ========================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {capabilitiesData.map((item, index) => {
            const Icon = item.icon;
            return (
              <GlowCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0}}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }} 
                className="group w-full h-full min-h-[300px] shadow-xl transition-all duration-500 cursor-pointer"
              >
                
                <div className="relative p-8 h-full w-full flex flex-col justify-between">
                  <div className="flex-1 flex flex-col justify-start space-y-3 py-2">
                    <Icon size={28} className="text-cyan-500 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-2xl font-bold text-[#121212] dark:text-white font-sans group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                  <div className="pt-6 border-t border-black/10 dark:border-white/10 transition-colors duration-300">
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-sans leading-relaxed transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>
                </div>

              </GlowCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}