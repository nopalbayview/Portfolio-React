import React from 'react';
import { motion } from 'framer-motion';
import { educations } from '../../data/home/education';
import EducationShader from './EducationShader';
import GlowCard from '../../components/Glowcard';

export default function Education () {
  return (
    <section id="education" 
      className="relative w-full py-15 overflow-hidden transition-colors duration-300">

      {/* Layer Grid Pattern Khusus Education */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 bottom-0 left-[50%] w-[100vw] -translate-x-1/2 bg-grid-pattern opacity-70 pointer-events-none" 
      />

      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-6 mb-20 flex flex-col items-start text-left space-y-1">
        <motion.h2
          initial={{ opacity: 0, x: -50 }} // Disamakan dengan Tech Stack (muncul dari kiri)
          whileInView={{ opacity: 1, x: 0}}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-fit text-4xl md:text-5xl lg:text-6xl font-sans font-black tracking-tighter max-w-3xl leading-tight text-black dark:text-white">Education
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          // Subtitle dibuat tebal (font-bold) dengan warna Cyan menyala
          className="text-base md:text-sm font-bold text-gray-400 font-plex tracking-tight mb-16">Graduation
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {educations.map((edu, idx) => {
            let shaderColor = [0.0, 0.8, 0.3]; 
            
            if (idx === 0) {
              shaderColor = [0.9, 0.1, 0.1]; 
            } else if (idx === 1) {
              shaderColor = [0.1, 0.2, 0.6]; 
            } else if (idx === 2) {
              shaderColor = [0.4, 0.4, 0.4]; 
            }

            const glowColors = [
              { primary: [239, 68, 68], secondary: [239, 68, 68] },
              { primary: [37, 99, 235], secondary: [37, 99, 235] },
              { primary: [148, 163, 184], secondary: [148, 163, 184] },
            ];
            const glow = glowColors[idx % glowColors.length];

            return (
              <GlowCard 
                key={idx} 
                glowColor={glow.primary}
                glowColorSecondary={glow.secondary} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0}}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 + (idx * 0.15), ease: "easeOut" }}
                // PERUBAHAN: Menambahkan min-h-[350px] agar card lebih tinggi secara seragam
                className={`group w-full h-full min-h-[350px] shadow-xl transition-all duration-500 hover:scale-[1.02] cursor-pointer ${edu.hoverBorder}`}
              >
                
                <div className="relative p-8 h-full w-full flex flex-col">
                  
                  <EducationShader color={shaderColor} />
                  
                  {/* Gradient hitam ditinggikan sedikit (via-black/60) agar teks lebih mudah dibaca di atas shader */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none z-10" />

                  {/* PERUBAHAN: Menggunakan justify-end agar teks mengelompok rapi di bagian bawah card */}
                  <div className="relative z-20 flex flex-col h-full justify-end"> 
                      <h3 className="text-xl font-bold text-white font-sans group-hover:text-cyan-400 transition-colors duration-300">
                        {edu.title}
                      </h3>
                      <div className="my-4 h-[1px] w-full bg-white/10" />
                      <span className="text-sm font-mono text-cyan-400">
                        {edu.period}
                      </span>
                      <p className="mt-2 text-sm text-gray-300 leading-relaxed font-sans">
                        {edu.desc}
                      </p>
                  </div>
                </div>

              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  )
}