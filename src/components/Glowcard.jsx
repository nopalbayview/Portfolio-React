'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';

export default function GlowCard({ children, className = '', radius = 'rounded-2xl', glowColor = [34, 211, 238], glowColorSecondary = [99, 102, 241], ...rest }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const rgba = (color, alpha) => `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;

  const isSquare = radius === 'rounded-none';
  const bloomRadius = isSquare ? 'rounded-none' : 'rounded-3xl';
  const contentRadius = isSquare ? 'rounded-none' : 'rounded-[14px]';

  const handleMouseMove = (e) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative p-[3px] ${radius} bg-[#121212]/10 dark:bg-white/5 ${className}`}
      {...rest}
    >
      
      {/* LAYER 1: OUTER BLOOM (Pendaran Neon Keluar Kartu) */}
      <motion.div
        className={`absolute inset-4 z-0 pointer-events-none blur-xl mix-blend-screen transition-opacity duration-500 ${bloomRadius}`}
        style={{
          opacity: isHovered ? 1 : 0,
          background: useMotionTemplate`radial-gradient(circle 250px at ${mouseX}px ${mouseY}px, ${rgba(glowColor, 0.9)}, ${rgba(glowColorSecondary, 0.5)} 40%, transparent 75%)`
        }}
      />

      {/* LAYER 2: SHARP BORDER (Garis Neon Tajam) */}
      <div className={`absolute inset-0 z-0 pointer-events-none ${radius} overflow-hidden`}>
        <motion.div 
          className="absolute inset-0 w-full h-full transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: useMotionTemplate`radial-gradient(circle 350px at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 1) 0%, ${rgba(glowColor, 1)} 15%, ${rgba(glowColorSecondary, 0.8)} 50%, transparent 80%)`
          }}
        />
      </div>

      {/* LAYER 3: HOTSPOT (Titik Terang di Kursor) */}
      <div className={`absolute inset-0 z-0 pointer-events-none ${radius} overflow-hidden`}>
        <motion.div
          className="absolute inset-0 w-full h-full transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: useMotionTemplate`radial-gradient(circle 60px at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.9), transparent 70%)`
          }}
        />
      </div>

      {/* KONTEN UTAMA KARTU */}
      <div className={`relative z-10 w-full h-full bg-white dark:bg-[#151515] ${contentRadius} overflow-hidden flex flex-col`}>
        {children}
      </div>
      
    </motion.div>
  );
}   