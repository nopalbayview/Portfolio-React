import React, { useState, useEffect, useRef } from 'react';
import { profileCardsData } from '../../data/about/about';

export default function AboutHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % profileCardsData.length);
    }, 2000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []); 

  // Mengubah fungsi agar saat diklik selalu lanjut ke foto berikutnya
  const handleNextCard = () => {
    setActiveIndex((prev) => (prev + 1) % profileCardsData.length);
    startTimer(); // Reset timer manual agar tidak berbenturan dengan auto-slide
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen w-full flex items-center justify-center pt-24 pb-16 transition-colors duration-300"
    >
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center md:items-start justify-center gap-12 lg:gap-24">
        
        {/* KIRI: STACKED ANIMATED PHOTOS */}
        <div className="relative w-56 sm:w-64 md:w-72 h-[320px] sm:h-[360px] md:h-[390px] shrink-0">
          {profileCardsData.map((card, idx) => {
            const offset = (idx - activeIndex + profileCardsData.length) % profileCardsData.length;
            
            // Mengecek apakah kartu ini adalah kartu yang paling depan
            const isFront = offset === 0;

            let topPosition = 'top-0';
            let zIndex = 40;
            let opacity = 'opacity-100';
          
            if (offset === 0) {
              topPosition = 'top-9'; zIndex = 40; opacity = 'opacity-100';
            } else if (offset === 1) {
              topPosition = 'top-6'; zIndex = 30; opacity = 'opacity-90';
            } else if (offset === 2) {
              topPosition = 'top-3'; zIndex = 20; opacity = 'opacity-80';
            } else {
              topPosition = 'top-0'; zIndex = 10; opacity = 'opacity-70';
            }
          
            return (
              <div
                key={card.id}
                // Hanya izinkan klik jika ini adalah kartu paling depan
                onClick={() => {
                  if (isFront) handleNextCard();
                }}
                style={{ zIndex }}
                // Mengatur kursor dan efek hover border hanya aktif untuk kartu depan
                className={`absolute left-0 right-0 bottom-0 ${topPosition} rounded-2xl overflow-hidden border border-[#121212]/10 dark:border-white/10 shadow-2xl transition-all duration-700 ease-in-out select-none ${opacity} ${
                  isFront 
                    ? 'cursor-pointer hover:border-cyan-400 dark:hover:border-cyan-400' 
                    : 'cursor-default'
                }`}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  // Efek membesar (scale) saat di-hover juga hanya untuk kartu paling depan
                  className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-700 ${
                    isFront ? 'hover:scale-105' : ''
                  }`}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            );
          })}
        </div>

        {/* KANAN: TEXT BIOGRAFI */}
        <div className="flex-1 space-y-6 text-left md:pt-2">
          <h1 className="inline-block text-3xl sm:text-4xl md:text-4xl uppercase font-bold tracking-tight hover-shimmer cursor-pointer select-none">
            About Me
          </h1>
          <div className="space-y-4 text-sm sm:text-base text-[#121212]/80 dark:text-gray-300 leading-relaxed font-sans max-w-xl">
            <p>
              Hi, I'm <strong className="text-[#121212] dark:text-white">Nouval Adibayu Kencono</strong>. I am a passionate Software Engineer and digital builder focused on creating performant, minimalist, and responsive web applications.
            </p>
            <p>
              Driven by the philosophy of <em>"Make more, if you know just do it,"</em> I constantly transform concepts into functional software, bridging clean code architecture with seamless user experiences.
            </p>
          </div>
        </div>
        
      </div>
    </section>
  );
}