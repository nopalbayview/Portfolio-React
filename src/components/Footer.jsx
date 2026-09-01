import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaWhatsapp, FaInstagram, FaDiscord } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full border-t border-b border-black/10 dark:border-white/10 bg-white dark:bg-[#121212] py-10 transition-colors duration-300">
      {/* Container Utama */}
      <div className="max-w-6xl mx-auto px-6 pl-16 md:pl-16 flex flex-col space-y-8">
        
        {/* BARIS ATAS: Logo + Sosmed (Kiri) dan Grid Navigasi (Kanan) */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">
          <div className="flex flex-col space-y-4">
            <span className="text-4xl font-black tracking-tighter text-[#121212] dark:text-white font-mono">
              NV
            </span>

            {/* Ikon Sosmed */}
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-cyan-400 hover:scale-110 transition-all duration-300 text-3xl hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]"
              >
                <FaGithub />
              </a>
              <a 
                href="https://wa.me" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-cyan-400 hover:scale-110 transition-all duration-300 text-3xl hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]"
              >
                <FaWhatsapp />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-cyan-400 hover:scale-110 transition-all duration-300 text-3xl hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://discord.com" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-cyan-400 hover:scale-110 transition-all duration-300 text-3xl hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]"
              >
                <FaDiscord />
              </a>
            </div>
          </div>

          {/* SISI KANAN: Grid Columns Navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 md:gap-14 flex-1 max-w-3xl">
            
            {/* HOME */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#121212] dark:text-white font-sans">
                HOME
              </h4>
              <div className="flex flex-col space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <Link to="/#hero" className="hover:text-cyan-400 font-normal hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] font-sans transition-all">Home</Link>
                <Link to="/#techstack" className="hover:text-cyan-400 font-normal hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] font-sans transition-all">Techstack</Link>
                <Link to="/#education" className="hover:text-cyan-400 font-normal hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] font-sans transition-all">Education</Link>
              </div>
            </div>

            {/* ABOUT */}
            <div className="flex flex-col space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#121212] dark:text-white font-sans">
                ABOUT
              </h4>
              <div className="flex flex-col space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <Link to="/about#hero" className="hover:text-cyan-400 font-normal hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] font-sans transition-all">About</Link>
                <Link to="/about#workflow" className="hover:text-cyan-400 font-normal hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] font-sans transition-all">Workflow</Link>
              </div>
            </div>

            {/* PROJECTS */}
            <div className="flex flex-col space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#121212] dark:text-white font-sans">
                PROJECTS
              </h4>
              <div className="flex flex-col space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <Link to="/projects#hero" className="hover:text-cyan-400 font-normal hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] font-sans transition-all">Projects</Link>
              </div>
            </div>

            {/* CONTACT */}
            <div className="flex flex-col space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#121212] dark:text-white font-sans">
                CONTACT
              </h4>
              <div className="flex flex-col space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <Link to="/contact#hero" className="hover:text-cyan-400 font-normal hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] font-sans transition-all">Contact</Link>
              </div>
            </div>

          </div>

        </div>

        {/* BARIS BAWAH: Copyright */}
        <div className="text-center pt-4">
          <p className="text-sm text-gray-600 dark:text-gray-500 font-sans tracking-tight">
            © 2026 Nouval Adibayu Kencono. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}