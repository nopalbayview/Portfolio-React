import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  User,
  Folder,
  MessageSquare,
  Sun,
  Moon,
} from 'lucide-react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  AnimatePresence,
} from 'framer-motion';

// ============================================================================
// KOMPONEN ITEM DOCK (DOCK ICON)
// ============================================================================
function DockItem({ mouseX, item, isActive }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // 1. Menghitung jarak horizontal mouseX ke titik tengah tombol ikon ini
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // 2. Magnification Transform:
  const widthSync = useTransform(distance, [-150, 0, 150], [42, 72, 42]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const heightSync = useTransform(distance, [-150, 0, 150], [42, 72, 42]);
  const height = useSpring(heightSync, { mass: 0.1, stiffness: 150, damping: 12 });

  // 3. Ukuran ikon SVG di dalamnya ikut membesar proporsional
  const iconSizeSync = useTransform(distance, [-150, 0, 150], [20, 36, 20]);
  const iconSize = useSpring(iconSizeSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const Icon = item.icon;

  const handleClick = (e) => {
    if (item.onClick) {
      item.onClick(e);
    } else if (item.path === '/' && window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const buttonContent = (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.9 }}
      // Perubahan di sini: Mengembalikan gaya aktif persis seperti desain aslimu (Solid Cyan)
      className={`relative flex items-center justify-center rounded-full transition-colors duration-200 cursor-pointer select-none ${
        isActive
          ? 'bg-cyan-400 text-[#121212] shadow-[0_0_20px_rgba(34,211,238,0.5)]'
          : 'bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-700/80 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white border border-neutral-300/60 dark:border-white/10'
      }`}
    >
      {/* Tooltip Popup di atas ikon saat di-hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 5, x: '-50%' }}
            transition={{ duration: 0.15 }}
            // 1. Ubah bg-neutral-900/95 menjadi /60 atau /70
            // 2. Tambahkan backdrop-blur-md untuk efek kaca buram
            className="absolute -top-12 left-1/2 px-3 py-1.5 rounded-md bg-neutral-900/60 dark:bg-neutral-900/60 backdrop-blur-md text-white text-xs font-bold border border-neutral-700/50 shadow-xl whitespace-nowrap pointer-events-none z-50 font-sans tracking-wide"
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ikon di dalam lingkaran (diubah ke strokeWidth 1.5 agar lebih tajam dan elegan) */}
      <motion.div
        style={{ width: iconSize, height: iconSize }}
        className="flex items-center justify-center pointer-events-none"
      >
        <Icon className="w-full h-full" strokeWidth={1.5} />
      </motion.div>
    </motion.div>
  );

  if (item.path) {
    return (
      <Link
        to={item.path}
        onClick={handleClick}
        className="focus:outline-none flex items-center justify-center"
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      onClick={handleClick}
      type="button"
      className="focus:outline-none flex items-center justify-center bg-transparent border-none p-0 cursor-pointer"
    >
      {buttonContent}
    </button>
  );
}

// ============================================================================
// KOMPONEN UTAMA NAVBAR (FLOATING DOCK)
// ============================================================================
export default function Navbar() {
  const location = useLocation();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

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
  const mouseX = useMotionValue(Infinity);

  // Dikembalikan ke formasi 5 Ikon sesuai desain aslimu
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      path: '/',
    },
    {
      id: 'about',
      label: 'About',
      icon: User,
      path: '/about',
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: Folder,
      path: '/projects',
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: MessageSquare,
      path: '/contact',
    },
    {
      id: 'theme',
      label: isDark ? 'Light Mode' : 'Dark Mode',
      icon: isDark ? Sun : Moon,
      onClick: toggleTheme,
    },
  ];

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-cyan-400 z-[9999] origin-left transform-gpu"
        style={{ scaleX }}
      />

      <header className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center max-w-fit pointer-events-auto">
        <motion.nav
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="relative flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl md:rounded-3xl bg-white/75 dark:bg-[#141414]/85 backdrop-blur-xl border border-neutral-200/80 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-colors duration-300 overflow-visible"
        >
          {navItems.map((item) => {
            const isPathActive = item.path && (
              item.path === '/'
                ? location.pathname === '/' && (!location.hash || location.hash === '#hero')
                : (item.path.includes('#')
                    ? location.pathname === item.path.split('#')[0] && location.hash === `#${item.path.split('#')[1]}`
                    : location.pathname === item.path)
            );

            return (
              <DockItem
                key={item.id}
                mouseX={mouseX}
                item={item}
                isActive={Boolean(isPathActive)}
              />
            );
          })}
        </motion.nav>
      </header>
    </>
  );
}