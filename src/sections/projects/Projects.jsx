import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { projectList } from '../../data/projects/projects';
import GlowCard from '../../components/Glowcard';

export default function Projects() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative overflow-hidden w-full min-h-screen pt-20 pb-24 text-[#121212] dark:text-white font-sans transition-colors duration-300">
      <div 
        aria-hidden="true" 
        className="absolute top-0 bottom-0 left-[50%] w-[100vw] -translate-x-1/2 bg-grid-pattern opacity-70 pointer-events-none"
      />
      
      {/* PERUBAHAN: Pembungkus UTAMA untuk Judul DAN Grid agar sejajar rapi */}
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
            // Teks dikoreksi menjadi "Projects"
            className="w-fit text-5xl md:text-6xl lg:text-[80px] font-sans font-black tracking-tighter max-w-3xl leading-none text-black dark:text-white"
          >
            Projects
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            // Subtitle diubah sedikit agar relevan dan memakai warna Cyan
            className="text-base md:text-sm font-bold text-gray-400 font-plex tracking-tight"
          >
            My recent works and creations.
          </motion.p>
        </div>

        {/* =========================================
            GRID KARTU PROJECT
        ========================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projectList.map((item, idx) => (

            <GlowCard
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              // PERUBAHAN: hover:-translate-y-2 dihapus agar kartu diam saat di-hover
              className="group w-full shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >

              {/* BAGIAN GAMBAR */}
              <div className="w-full aspect-[4/3] bg-gray-100 dark:bg-[#121214] flex items-center justify-center overflow-hidden relative border-b border-[#121212]/5 dark:border-white/5">
                <div className="absolute inset-0 opacity-20 bg-grid-pattern pointer-events-none" />
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>

              {/* BAGIAN KONTEN BAWAH */}
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  {item.tags?.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className={`text-[11px] font-medium px-3 py-1 rounded-full border transition-colors duration-300 ${tIdx === 0
                          ? 'bg-transparent text-cyan-400 dark:text-cyan-400 border-[#121212]/15 dark:border-white/15'
                          : 'bg-transparent text-gray-600 dark:text-gray-400 border-[#121212]/15 dark:border-white/15'
                        }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-[#121212] dark:text-white mb-3 font-sans group-hover:text-cyan-400 dark:group-hover:text-cyan-400 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-[#121212]/70 dark:text-gray-400 leading-relaxed mb-8 flex-1">
                  {item.description}
                </p>
                <div className="flex items-center justify-between mt-auto pt-5 border-t border-[#121212]/5 dark:border-white/5">
                  <a
                    href={item.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#121212] dark:text-white group-hover:text-cyan-400 dark:group-hover:text-cyan-400 transition-colors duration-300"
                  >
                    View project <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                  <span className="text-sm font-mono text-[#121212]/50 dark:text-gray-500">
                    {item.year}
                  </span>
                </div>
              </div>

            </GlowCard>
          ))}
        </div>

      </div>
    </div>
  );
}