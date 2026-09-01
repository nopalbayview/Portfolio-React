import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';

export default function MainLayout({ children }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Jika ada tag hash (misal #hero, #education, #workflow)
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Jika pindah halaman biasa tanpa hash, scroll ke paling atas
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-white transition-colors duration-300 overflow-x-hidden">

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
      </div>

    </div>
  );
}