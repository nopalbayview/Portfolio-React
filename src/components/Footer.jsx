import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaWhatsapp, FaInstagram, FaDiscord } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative w-full min-h-screen flex flex-col border-t border-[#121212]/10 dark:border-white/10 bg-white dark:bg-[#121212] pt-10 transition-colors duration-300 overflow-hidden">
      
      {/* Container Utama untuk seluruh Footer */}
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col flex-1 relative z-10">
        
        {/* =========================================
            BAHAGIAN ATAS: Sosmed & Navigasi
        ========================================= */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16 lg:gap-10 pb-12">
          
          {/* SISI KIRI: Sosmed Cards & Copyright */}
          <div className="flex flex-col space-y-6 w-full lg:w-auto">
            
            <div className="flex flex-wrap items-center gap-3">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="group flex items-center gap-2.5 px-4 py-2 border-2 border-[#121212]/15 dark:border-white/15 rounded-none bg-transparent hover:bg-[#121212]/5 dark:hover:bg-white/5 transition-all duration-300 hover:border-cyan-500/50 dark:hover:border-cyan-500/50"
              >
                <FaGithub className="text-base text-[#121212]/70 dark:text-gray-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors" />
                <span className="text-xs font-semibold font-sans text-[#121212]/80 dark:text-gray-300 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                  Github
                </span>
              </a>

              <a 
                href="https://wa.me" 
                target="_blank" 
                rel="noreferrer" 
                className="group flex items-center gap-2.5 px-4 py-2 border-2 border-[#121212]/15 dark:border-white/15 rounded-none bg-transparent hover:bg-[#121212]/5 dark:hover:bg-white/5 transition-all duration-300 hover:border-cyan-500/50 dark:hover:border-cyan-500/50"
              >
                <FaWhatsapp className="text-base text-[#121212]/70 dark:text-gray-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors" />
                <span className="text-xs font-semibold font-sans text-[#121212]/80 dark:text-gray-300 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                  Whatsapp
                </span>
              </a>

              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="group flex items-center gap-2.5 px-4 py-2 border-2 border-[#121212]/15 dark:border-white/15 rounded-none bg-transparent hover:bg-[#121212]/5 dark:hover:bg-white/5 transition-all duration-300 hover:border-cyan-500/50 dark:hover:border-cyan-500/50"
              >
                <FaInstagram className="text-base text-[#121212]/70 dark:text-gray-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors" />
                <span className="text-xs font-semibold font-sans text-[#121212]/80 dark:text-gray-300 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                  Instagram
                </span>
              </a>

              <a 
                href="https://discord.com" 
                target="_blank" 
                rel="noreferrer" 
                className="group flex items-center gap-2.5 px-4 py-2 border-2 border-[#121212]/15 dark:border-white/15 rounded-none bg-transparent hover:bg-[#121212]/5 dark:hover:bg-white/5 transition-all duration-300 hover:border-cyan-500/50 dark:hover:border-cyan-500/50"
              >
                <FaDiscord className="text-base text-[#121212]/70 dark:text-gray-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors" />
                <span className="text-xs font-semibold font-sans text-[#121212]/80 dark:text-gray-300 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                  Discord
                </span>
              </a>
            </div>

            <div>
              <p className="text-xs text-[#121212]/60 dark:text-gray-400 font-sans tracking-tight font-medium">
                © 2026 Nouval Adibayu Kencono. All rights reserved.
              </p>
            </div>

          </div>

          {/* SISI KANAN: Grid Columns Navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 md:gap-14 w-full lg:w-auto lg:flex-1 lg:max-w-2xl lg:justify-end">
            
            <div className="flex flex-col space-y-5 lg:mx-auto">
              <h4 className="text-sm font-semibold uppercase tracking-widest text-[#121212] dark:text-white font-sans">HOME</h4>
              <div className="flex flex-col space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <Link to="/#hero" className="hover:text-cyan-500 dark:hover:text-cyan-400 font-medium font-sans transition-colors">Home</Link>
                <Link to="/#techstack" className="hover:text-cyan-500 dark:hover:text-cyan-400 font-medium font-sans transition-colors">Techstack</Link>
                <Link to="/#education" className="hover:text-cyan-500 dark:hover:text-cyan-400 font-medium font-sans transition-colors">Education</Link>
              </div>
            </div>

            <div className="flex flex-col space-y-5 lg:mx-auto">
              <h4 className="text-sm font-semibold uppercase tracking-widest text-[#121212] dark:text-white font-sans">ABOUT</h4>
              <div className="flex flex-col space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <Link to="/about#hero" className="hover:text-cyan-500 dark:hover:text-cyan-400 font-medium font-sans transition-colors">About</Link>
                <Link to="/about#workflow" className="hover:text-cyan-500 dark:hover:text-cyan-400 font-medium font-sans transition-colors">Workflow</Link>
              </div>
            </div>

            <div className="flex flex-col space-y-5 lg:mx-auto">
              <h4 className="text-sm font-semibold uppercase tracking-widest text-[#121212] dark:text-white font-sans">PROJECTS</h4>
              <div className="flex flex-col space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <Link to="/projects#hero" className="hover:text-cyan-500 dark:hover:text-cyan-400 font-medium font-sans transition-colors">Projects</Link>
              </div>
            </div>

            <div className="flex flex-col space-y-5 lg:mx-auto">
              <h4 className="text-sm font-semibold uppercase tracking-widest text-[#121212] dark:text-white font-sans">CONTACT</h4>
              <div className="flex flex-col space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <Link to="/contact#hero" className="hover:text-cyan-500 dark:hover:text-cyan-400 font-medium font-sans transition-colors">Contact</Link>
              </div>
            </div>

          </div>
        </div>

        {/* =========================================
            GARIS PEMBATAS TENGAH
        ========================================= */}
        <div className="w-full border-t-2 border-[#121212]/10 dark:border-white/10" />

        {/* =========================================
            BAHAGIAN BAWAH: Teks Raksasa & Motivasi
        ========================================= */}
        {/* flex-1 akan membuat kotak ini membesar mengisi seluruh sisa layar ke bawah */}
        <div className="flex-1 flex flex-col justify-center items-center text-center py-16">
          
          <h1 className="text-6xl md:text-8xl lg:text-[130px] leading-none font-bold uppercase tracking-widest font-sans text-[#121212] dark:text-white mb-6">
            NOPALBAY
          </h1>
          
          <p className="text-sm md:text-sm font-semibold tracking-[0.2em] text-[#121212]/60 dark:text-gray-400 uppercase">
            DON'T THINK TO HARD. MAKE MORE, IF YOU KNOW JUST DO IT.
          </p>

        </div>

      </div>

    </footer>
  );
}