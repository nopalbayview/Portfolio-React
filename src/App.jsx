import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';

import MainLayout from './layouts/MainLayout';
import Preloader from './components/Preloader';

// 1. CHUNKING: Tetap menggunakan lazy loading
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));

// 2. KOMPONEN INTI (Di dalam Router agar bisa baca perubahan URL)
function AppContent() {
  const location = useLocation();
  
  // State untuk melacak rute mana saja yang sudah pernah dibuka
  const [visitedRoutes, setVisitedRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [prevPath, setPrevPath] = useState(location.pathname);

  // LOGIKA SMART PRELOADER:
  // Cek secara instan apakah URL berubah
  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname);
    
    // Jika halaman INI belum ada di daftar "visitedRoutes", nyalakan loading!
    if (!visitedRoutes.includes(location.pathname)) {
      setIsLoading(true);
    }
  }

  // Fungsi saat loading 3 detik selesai
  const handleComplete = () => {
    setIsLoading(false);
    // Masukkan halaman ini ke daftar yang sudah dibuka agar besok-besok tidak loading lagi
    if (!visitedRoutes.includes(prevPath)) {
      setVisitedRoutes((prev) => [...prev, prevPath]);
    }
  };

  return (
    <>
      {/* Jika sedang loading, TAMPILKAN HANYA Preloader */}
      {isLoading ? (
        <Preloader 
          key={`preloader-${prevPath}`} 
          onComplete={handleComplete} 
        />
      ) : (
        /* Jika loading SELESAI, baru render MainLayout (animasi akan terpicu di momen ini) */
        <MainLayout>
          <Suspense fallback={
          // Dibuat otomatis menyesuaikan tema (bg-gray-50 untuk light, bg-[#121212] untuk dark)
            <div className="min-h-screen w-full bg-gray-50 dark:bg-[#121212] transition-colors duration-300" />
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </MainLayout>
      )}
    </>
  );
}

// Komponen App utama yang membungkus dengan Router
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}