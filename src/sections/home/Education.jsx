import React from 'react';
import { motion } from 'framer-motion';
import { educations } from '../../data/home/education';
import EducationShader from './EducationShader'; // <-- IMPORT SHADER DI SINI

export default function Education () {
    return (
      <section 
        id="education" 
        className="relative w-full py-28 border-t-2 border-[#121212]/10 dark:border-white/5 overflow-hidden transition-colors duration-300"
      >
        {/* Layer Grid Pattern Khusus Education */}
        <div 
          aria-hidden="true" 
          className="absolute top-0 bottom-0 left-[50%] w-[100vw] -translate-x-1/2 bg-grid-pattern opacity-70 pointer-events-none" 
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
            {educations.map((edu, idx) => {
              // Menentukan warna RGB (0.0 sampai 1.0) berdasarkan urutan kartu
              let shaderColor = [0.0, 0.8, 0.3]; // Default Hijau
              
              if (idx === 0) {
                shaderColor = [0.9, 0.1, 0.1]; // SD: Merah
              } else if (idx === 1) {
                shaderColor = [0.1, 0.2, 0.6]; // SMP: Biru Dongker
              } else if (idx === 2) {
                shaderColor = [0.4, 0.4, 0.4]; // SMK: Abu-abu
              }

              return (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0}}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.2 + (idx * 0.15), ease: "easeOut" }}
                  className={`group relative p-8 rounded-2xl overflow-hidden border border-[#121212]/10 dark:border-white/10 shadow-xl transition-all duration-500 hover:scale-[1.02] bg-[#121212] dark:bg-[#0c0c0e] ${edu.hoverBorder}`}
                >
                  
                  {/* Kirim warnanya ke komponen Shader */}
                  <EducationShader color={shaderColor} />
                  
                  {/* Sisa kode kartumu tetap sama... */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10" />

                  <div className="relative z-20 flex flex-col h-full justify-between"> 
                      <h3 className="text-lg font-bold text-white font-sans group-hover:text-cyan-400 transition-colors duration-300">
                        {edu.title}
                      </h3>
                      <div className="my-4 h-[1px] w-full bg-white/10" />
                      <span className="text-xs font-mono text-cyan-400">
                        {edu.period}
                      </span>
                      <p className="mt-2 text-xs text-gray-300 leading-relaxed font-sans">
                        {edu.desc}
                      </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    )
}