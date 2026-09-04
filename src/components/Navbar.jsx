import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, FolderCode, MessageSquare, Sun, Moon, Menu, X } from 'lucide-react';
// 1. IMPORT FRAMER MOTION
import { motion, useScroll, useSpring } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();

  // 2. LOGIKA SCROLL PROGRESS BAR
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // STATE & LOGIKA THEME LIGHT / DARK
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });
  
  // STATE UNTUK MOBILE HAMBURGER MENU
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark'); 
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light'); 
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  // DAFTAR MENU NAVIGASI
  const navItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/' },
    { id: 'about', icon: User, label: 'About', path: '/about' },
    { id: 'projects', icon: FolderCode, label: 'Projects', path: '/projects' },
    { id: 'contact', icon: MessageSquare, label: 'Contact', path: '/contact' },
  ];

  // HANDLER SAAT LINK DIKLIK
  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <>
      {/* =========================================
          LOADING BAR SCROLL INDICATOR
      ========================================= */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-cyan-400 z-[9999] origin-left transform-gpu rounded-none"
        style={{ scaleX }}
      />

      <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center w-full max-w-fit px-4 md:px-0">
        
        {/* =========================================
            A. DESKTOP NAV
        ========================================= */}
        <nav className="hidden md:flex items-center gap-3 bg-white/30 dark:bg-[#121212]/40 backdrop-blur-xl px-3 py-2 rounded-full border border-[#121212]/10 dark:border-white/10 shadow-2xl transition-all duration-300">
          
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={handleNavClick}
                className={`relative group w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ease-out origin-center ${
                  isActive
                    ? 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.8)] scale-105 border border-cyan-400'
                    : 'border border-[#121212]/15 dark:border-white/15 text-[#121212]/60 dark:text-gray-400 hover:text-cyan-400 dark:hover:text-cyan-400 hover:border-cyan-400/80 dark:hover:border-cyan-400/80 hover:bg-cyan-400/10 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]'
                } active:scale-95`}
              >
                <Icon size={18} className="transition-transform duration-300 ease-out group-hover:scale-110" />
                <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white dark:bg-[#181818] text-[#121212] dark:text-white text-[11px] font-mono py-1 px-2.5 rounded-md border border-[#121212]/10 dark:border-white/10 shadow-xl opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 whitespace-nowrap">
                  {item.label}
                </span>
              </Link>
            );
          })}

          <div className="w-[1px] h-6 bg-[#121212]/10 dark:bg-white/10 mx-0.5 transition-colors duration-300" />

          <button 
            onClick={toggleTheme}
            className="relative group w-11 h-11 rounded-full border border-[#121212]/15 dark:border-white/15 text-[#121212]/60 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-300 hover:border-amber-500 dark:hover:border-amber-300/80 hover:bg-amber-300/10 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(252,211,77,0.5)] flex items-center justify-center transition-all duration-300 ease-out origin-center active:scale-95"
          >
            {isDark ? (
              <Sun size={18} className="transition-transform duration-500 ease-out group-hover:rotate-180" />
            ) : (
              <Moon size={18} className="transition-transform duration-500 ease-out group-hover:-rotate-12 text-amber-500" />
            )}
            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white dark:bg-[#181818] text-[#121212] dark:text-white text-[11px] font-mono py-1 px-2.5 rounded-md border border-[#121212]/10 dark:border-white/10 shadow-xl opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 whitespace-nowrap">
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>
        </nav>

        {/* =========================================
            B. MOBILE NAV
        ========================================= */}
        <nav className="flex md:hidden items-center justify-center gap-4 w-fit bg-white/30 dark:bg-[#161618]/40 backdrop-blur-xl px-5 py-2.5 rounded-full border border-[#121212]/10 dark:border-white/10 shadow-2xl transition-colors duration-300">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#121212] dark:text-white hover:text-cyan-400 dark:hover:text-cyan-400 transition-colors active:scale-90"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="w-[1px] h-5 bg-[#121212]/20 dark:bg-white/20" />
          <button 
            onClick={toggleTheme}
            className="text-[#121212]/60 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-300 transition-colors active:scale-90"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>

        {/* =========================================
            C. MOBILE DROPDOWN MENU
        ========================================= */}
        <div 
          className={`md:hidden absolute top-full mt-4 w-[240px] bg-white/70 dark:bg-[#161618]/70 backdrop-blur-lg border border-[#121212]/10 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ease-out origin-top ${
            isOpen ? 'scale-y-100 opacity-100 translate-y-0' : 'scale-y-95 opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={handleNavClick}
                className={`flex items-center gap-5 px-6 py-4 transition-colors duration-300 border-b border-[#121212]/5 dark:border-white/5 last:border-b-0 ${
                  isActive 
                    ? 'bg-cyan-50 dark:bg-[#122b2e] text-cyan-400 dark:text-cyan-400' 
                    : 'text-[#121212]/70 dark:text-gray-300 hover:bg-[#121212]/5 dark:hover:bg-white/5 hover:text-[#121212] dark:hover:text-white'
                }`}
              >
                <Icon size={18} className={isActive ? "text-cyan-400 dark:text-cyan-400" : "text-[#121212]/50 dark:text-gray-400"} />
                <span className="font-sans text-sm tracking-wide uppercase font-medium">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </header>
    </>
  );
}