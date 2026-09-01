import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { projectList } from '../../data/projects/projects'; 

export default function Projects() {
  // Memastikan halaman selalu mulai dari atas saat baru dibuka
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen pt-32 pb-24 text-[#121212] dark:text-white font-sans transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* HEADER HALAMAN */}
        <div className="mb-16 md:mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-fit text-4xl sm:text-5xl md:text-4xl uppercase font-bold tracking-tight hover-shimmer mb-6 select-none"
          >
            All Projects
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-base md:text-1 text-[#121212]/70 dark:text-gray-400 max-w-2xl leading-relaxed"
          >
            A collection of my recent work, ranging from web development to data analysis and system architecture.
          </motion.p>
        </div>

        {/* GRID KARTU PROJECT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projectList.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              // Container Kartu dengan warna bg sedikit beda agar kontras
              className="group flex flex-col w-full bg-white dark:bg-[#18181a] rounded-2xl overflow-hidden border border-[#121212]/10 dark:border-white/5 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              
              {/* BAGIAN GAMBAR */}
              <div className="w-full aspect-[4/3] bg-gray-100 dark:bg-[#121214] flex items-center jus overflow-hidden relative border-b border-[#121212]/5 dark:border-white/5">
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
                
                {/* Tag Kapsul (Persis Referensi) */}
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  {item.tags?.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className={`text-[11px] font-medium px-3 py-1 rounded-full border transition-colors duration-300 ${
                        tIdx === 0 
                          // Tag pertama diberi aksen Cyan (atau oranye/merah jika ingin persis gambar)
                          ? 'bg-transparent text-cyan-400 dark:text-cyan-400 border-[#121212]/15 dark:border-white/15' 
                          : 'bg-transparent text-gray-600 dark:text-gray-400 border-[#121212]/15 dark:border-white/15'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Judul & Deskripsi */}
                <h3 className="text-xl font-bold text-[#121212] dark:text-white mb-3 font-sans group-hover:text-cyan-400 dark:group-hover:text-cyan-400 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-[#121212]/70 dark:text-gray-400 leading-relaxed mb-8 flex-1">
                  {item.description}
                </p>

                {/* Footer Link & Tahun */}
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
              
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}