'use client';

import React from 'react';
import Link from 'next/link';
import { FaGithub, FaWhatsapp, FaInstagram, FaDiscord, FaLinkedin } from 'react-icons/fa';

const socials = [
  { Icon: FaGithub, label: 'Github', href: 'https://github.com/nopalbayview/' },
  { Icon: FaWhatsapp, label: 'Whatsapp', href: 'https://wa.me/62895360571733' },
  { Icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com' },
  { Icon: FaDiscord, label: 'Discord', href: 'https://discord.com' },
  { Icon: FaLinkedin, label: 'LinkedIn', href: 'https://linkedin.com/in' },
];

const navColumns = [
  {
    title: 'HOME',
    links: [
      { label: 'Home', href: '/#hero' },
      { label: 'Techstack', href: '/#techstack' },
      { label: 'Education', href: '/#education' },
    ],
  },
  {
    title: 'ABOUT',
    links: [
      { label: 'About', href: '/about#hero' },
      { label: 'Workflow', href: '/about#workflow' },
    ],
  },
  {
    title: 'PROJECTS',
    links: [{ label: 'Projects', href: '/projects#hero' }],
  },
  {
    title: 'CONTACT',
    links: [{ label: 'Contact', href: '/contact#hero' }],
  },
];

export default function Footer() {
  return (
    <footer className="relative w-full min-h-screen flex flex-col border-t-2 border-[#121212]/10 dark:border-white/10 bg-white dark:bg-[#121212] pt-10 md:pt-12 transition-colors duration-300 overflow-hidden">

      {/* Container Utama untuk seluruh Footer */}
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col flex-1 relative z-10">

        {/* =========================================
            BAGIAN ATAS: Signature, Copyright & Navigasi
        ========================================= */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 pb-10 md:pb-12">

          {/* SISI KIRI: Signature & Copyright */}
          <div className="flex flex-col items-center gap-3 lg:items-start lg:gap-4 text-center lg:text-left lg:shrink-0">

            <span className="font-sarina text-5xl md:text-6xl leading-none text-[#121212] dark:text-white select-none">
              BYV
            </span>

            <p className="text-[10px] md:text-xs text-[#121212]/60 dark:text-gray-400 font-sans tracking-tight font-medium">
              © 2026 Nouval Adibayu Kencono. All rights reserved.
            </p>

          </div>

          {/* SISI KANAN: Grid Columns Navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 lg:flex-1">
            {navColumns.map((column) => (
              <div key={column.title} className="flex flex-col gap-4 lg:mx-auto">
                <h4 className="text-xs md:text-sm font-semibold uppercase tracking-widest text-[#121212] dark:text-white font-sans">
                  {column.title}
                </h4>
                <div className="flex flex-col gap-2.5 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  {column.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="hover:text-cyan-500 dark:hover:text-cyan-400 font-medium font-sans transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* =========================================
            GARIS PEMBATAS TENGAH
        ========================================= */}
        <div className="w-full border-t-2 border-[#121212]/10 dark:border-white/10" />

        {/* =========================================
            BAGIAN BAWAH: Sosmed, Teks Raksasa & Motivasi
        ========================================= */}
        <div className="flex-1 flex flex-col items-center text-center pt-5 md:pt-6 pb-8 md:pb-10 px-4">

          {/* SOSMED */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10 md:mb-12">
            {socials.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="group flex items-center justify-center gap-0 md:gap-2.5 w-11 h-11 md:w-auto md:h-auto px-0 md:px-4 py-0 md:py-2 border-2 border-[#121212]/15 dark:border-white/15 rounded-none bg-transparent hover:bg-cyan-400 transition-all duration-300 hover:border-cyan-400"
              >
                <Icon className="text-base md:text-base text-[#121212]/70 dark:text-gray-400 group-hover:text-black transition-colors shrink-0" />
                <span className="hidden md:inline text-xs font-semibold font-sans text-[#121212]/80 dark:text-gray-300 group-hover:text-black transition-colors whitespace-nowrap">
                  {label}
                </span>
              </a>
            ))}
          </div>

          <div className="flex-1 w-full flex flex-col justify-center items-center pb-12 md:pb-16">

            <h1 className="hidden md:block text-8xl lg:text-[130px] leading-none font-bold uppercase tracking-widest font-sans text-[#121212] dark:text-white mb-6 transition-all duration-500 hover:text-transparent dark:hover:text-transparent hover:[-webkit-text-stroke:3px_#22d3ee] dark:hover:[-webkit-text-stroke:3px_#22d3ee] hover:drop-shadow-[0_0_30px_rgba(34,211,238,0.4)] cursor-default">
              NOPALBAY
            </h1>

            <p className="text-[10px] md:text-sm font-semibold tracking-[0.2em] text-[#121212]/60 dark:text-gray-400 uppercase pointer-events-none">
              DON'T THINK TO HARD. MAKE MORE, IF YOU KNOW JUST DO IT.
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
}
