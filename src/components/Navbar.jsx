import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Folder, MessageSquare, Sun, Moon } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion';

// ============================================================================
// KOMPONEN ITEM DOCK (MAC-OS STYLE POP-OUT)
// ============================================================================
function DockItem({ mouseX, item, isActive }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // 1. Kalkulasi jarak horizontal
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // 2. SIMPLIFIKASI: Gabung width dan height menjadi satu variabel "size"
  const springConfig = { mass: 0.1, stiffness: 200, damping: 15 };
  const size = useSpring(useTransform(distance, [-150, 0, 150], [44, 72, 44]), springConfig);
  const iconSize = useSpring(useTransform(distance, [-150, 0, 150], [20, 32, 20]), springConfig);

  const Icon = item.icon;

  const handleClick = (e) => {
    if (item.onClick) item.onClick(e);
    else if (item.path === '/' && window.location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 3. SIMPLIFIKASI: Dynamic Component (Link atau Button)
  const Wrapper = item.path ? Link : 'button';
  const wrapperProps = item.path ? { to: item.path } : { type: 'button' };

  return (
    <Wrapper {...wrapperProps} onClick={handleClick} className="focus:outline-none flex items-center justify-center">
      <motion.div
        ref={ref}
        style={{ width: size, height: size }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileTap={{ scale: 0.9 }}
        className={`relative flex items-center justify-center rounded-full transition-colors duration-200 cursor-pointer select-none ${
          isActive
            ? 'bg-cyan-400 text-[#121212] shadow-[0_0_20px_rgba(34,211,238,0.5)]'
            : 'bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-700/80 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white border border-neutral-300/60 dark:border-white/10'
        }`}
      >
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 5, x: '-50%' }}
              transition={{ duration: 0.15 }}
              className="absolute -top-12 left-1/2 px-3 py-1.5 rounded-md bg-black/40 dark:bg-black/40 backdrop-blur-lg text-white text-xs font-bold border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] whitespace-nowrap pointer-events-none z-50 font-sans tracking-wide"
            >
              {item.label}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div style={{ width: iconSize, height: iconSize }} className="flex items-center justify-center pointer-events-none">
          <Icon className="w-full h-full" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </Wrapper>
  );
}

// ============================================================================
// KOMPONEN UTAMA NAVBAR
// ============================================================================
export default function Navbar() {
  const location = useLocation();
  const mouseX = useMotionValue(Infinity);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // SIMPLIFIKASI: Logika Dark Mode dibuat 1 baris
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') !== 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'about', label: 'About', icon: User, path: '/about' },
    { id: 'projects', label: 'Projects', icon: Folder, path: '/projects' },
    { id: 'contact', label: 'Contact', icon: MessageSquare, path: '/contact' },
    { id: 'theme', label: isDark ? 'Light Mode' : 'Dark Mode', icon: isDark ? Sun : Moon, onClick: () => setIsDark(!isDark) },
  ];

  // SIMPLIFIKASI: Fungsi terpisah agar kode JSX di bawah lebih bersih
  const checkActive = (path) => {
    if (!path) return false;
    if (path === '/') return location.pathname === '/' && (!location.hash || location.hash === '#hero');
    if (path.includes('#')) {
      const [route, hash] = path.split('#');
      return location.pathname === route && location.hash === `#${hash}`;
    }
    return location.pathname === path;
  };

  return (
    <>
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-cyan-400 z-[9999] origin-left transform-gpu" style={{ scaleX }} />

      <header className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-end justify-center max-w-fit pointer-events-auto h-[90px]">
        <motion.nav
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="relative flex items-end gap-2.5 sm:gap-3 px-3 sm:px-4 pb-2 pt-4"
        >
          {/* Latar Belakang Dock */}
          <div className="absolute bottom-0 left-0 right-0 h-[60px] rounded-2xl md:rounded-2xl bg-white/75 dark:bg-[#141414]/85 backdrop-blur-xl border border-neutral-200/80 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-colors duration-300 -z-10" />

          {/* Mapping Item */}
          {navItems.map((item) => (
            <DockItem key={item.id} mouseX={mouseX} item={item} isActive={checkActive(item.path)} />
          ))}
        </motion.nav>
      </header>
    </>
  );
}