import React from 'react';
import { motion } from 'framer-motion';
import { educations } from '../../data/home/education';

export default function Education () {
    return (
        <section 
        id="education" 
        className="relative w-full py-28 border-t-2 border-[#121212]/10 dark:border-white/5 overflow-hidden transition-colors duration-300"
      >
        {/* Layer Grid Pattern Khusus Education */}
        <div 
          aria-hidden="true" 
          className="absolute inset-0 w-full h-full bg-grid-pattern opacity-70 pointer-events-none" 
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 space-y-20">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0}}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-fit text-3xl sm:text-4xl md:text-3xl uppercase font-bold tracking-tight max-w-3xl leading-tight text-[#121212] dark:text-white transition-colors duration-300 hover-shimmer cursor-pointer select-none">
            Education
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {educations.map((edu, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0}}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 + (idx * 0.15), ease: "easeOut" }}
                className={`group relative p-8 rounded-2xl overflow-hidden border border-[#121212]/10 dark:border-white/10 shadow-xl transition-all duration-500 hover:scale-[1.02] ${edu.hoverBorder}`}
              >
                {/* Background Foto Abstrak */}
                <img 
                  src={edu.bgImage} 
                  alt={`${edu.title} Abstract`} 
                  className="absolute inset-0 w-full h-full object-cover -z-20 transition-transform duration-700 group-hover:scale-110 opacity-30 dark:opacity-40"
                />
                
                {/* Overlay Tint & Blur */}
                <div className="absolute inset-0 bg-white/80 dark:bg-[#121214]/85 backdrop-blur-md -z-10 transition-colors duration-300" />

                {/* Konten Kartu */}
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#121212] dark:text-white font-sans">
                      {edu.title}
                    </h3>
                    <div className="my-4 h-[1px] w-full bg-[#121212]/10 dark:bg-white/10" />
                    <span className="text-xs font-mono text-cyan-400 dark:text-cyan-400">
                      {edu.period}
                    </span>
                    <p className="mt-2 text-xs text-[#121212]/70 dark:text-gray-400 leading-relaxed font-sans">
                      {edu.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
}