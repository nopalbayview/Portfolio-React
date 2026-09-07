import React from 'react';
import { motion } from 'framer-motion';
import { educations } from '../../data/home/education';
import EducationShader from './EducationShader';
import GlowCard from '../../components/Glowcard';

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
              // MENGGUNAKAN GLOWCARD
              <GlowCard 
                key={idx} 
                glowColor={glow.primary}
                glowColorSecondary={glow.secondary} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0}}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 + (idx * 0.15), ease: "easeOut" }}
                // Hapus border & bg, biarkan GlowCard bekerja
                className={`group w-full h-full shadow-xl transition-all duration-500 hover:scale-[1.02] cursor-pointer ${edu.hoverBorder}`}
              >
                
                {/* Pindahkan padding dan relative ke dalam div ini */}
                <div className="relative p-8 h-full w-full flex flex-col">
                  
                  {/* Kirim warnanya ke komponen Shader */}
                  <EducationShader color={shaderColor} />
                  
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
                </div>

              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  )
}