import React from 'react';
import { motion } from 'framer-motion';
import { capabilitiesData } from '../../data/about/about';
import GlowCard from '../../components/Glowcard';

export default function Workflow() {
  return (
    <section 
      id="workflow" 
      className="relative w-full py-15 border-t-2 border-[#121212]/10 dark:border-white/5 overflow-hidden transition-colors duration-300"
    >

      <div 
        aria-hidden="true" 
        className="absolute top-0 bottom-0 left-[50%] w-[100vw] -translate-x-1/2 bg-grid-pattern opacity-70 pointer-events-none" 
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pb-16">
      <div className="mb-12">
        <h2 className="inline-block text-3xl sm:text-4xl md:text-3xl uppercase font-bold tracking-tight hover-shimmer cursor-pointer select-none">
          What I Do?
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {capabilitiesData.map((item, index) => {
          const Icon = item.icon;
          return (
            // MENGGUNAKAN GLOWCARD
            <GlowCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0}}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }} 
              // Min-height dan animasi hover scale
              className="group w-full h-full min-h-[260px] shadow-md dark:shadow-none transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
            >
              
              {/* Padding dipindahkan ke sini */}
              <div className="relative p-8 h-full w-full flex flex-col justify-between">
                <div className="flex-1 flex flex-col justify-start space-y-3 py-2">
                  <Icon size={28} className="text-cyan-500 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-bold text-[#121212] dark:text-white font-sans group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>
                <div className="pt-6 border-t border-black/10 dark:border-white/10 transition-colors duration-300">
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-sans leading-relaxed transition-colors duration-300">
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