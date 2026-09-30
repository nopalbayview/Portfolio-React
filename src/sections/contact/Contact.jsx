'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { FaGithub, FaWhatsapp } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('idle');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const payload = {
      // API KEY WEB3FORMS
      access_key: "a71213b8-8f31-401e-8c0a-fe676ca860f0", 
      ...formData,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' }); 
        setTimeout(() => setStatus('idle'), 3000); 
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus('error');
    }
  };

  return (
    <div className="relative overflow-hidden w-full min-h-screen pt-20 pb-24 text-[#121212] dark:text-white font-sans transition-colors duration-300">
      
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-12">
        
        {/* =========================================
            HEADER & SUBTITLE
        ========================================= */}
        <div className="mb-10 flex flex-col items-start text-left space-y-1">
          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-fit text-5xl md:text-6xl lg:text-[80px] font-sans font-black tracking-tighter max-w-3xl leading-none text-black dark:text-white"
          >
            Contact
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-base md:text-sm font-bold text-gray-400 font-plex tracking-tight"
          >
            Get In Touch
          </motion.p>
        </div>

        {/* =========================================
            KARTU UTAMA (FORM & INFO)
        ========================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-5xl mx-auto rounded-none border-3 border-[#121212]/10 dark:border-white/10 p-6 lg:p-8 overflow-hidden bg-white/50 dark:bg-[#1a1a1c]/40 backdrop-blur-xl"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-cyan-500/10 dark:bg-cyan-500/15 blur-[80px] md:blur-[120px] rounded-full pointer-events-none -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            
            {/* BAGIAN KIRI: INFORMASI KONTAK LENGKAP (MENGGANTIKAN QUOTE) */}
            <div className="flex flex-col justify-between h-full relative z-10 space-y-6">
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-2 text-[#121212] dark:text-white">
                  INFO
                </h3>
              </div>

              <div className="space-y-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-500 dark:text-cyan-400">Direct Contacts</h4>
                
                {/* Email Card */}
                <a 
                  href="mailto:nouvaladibayu08@gmail.com" 
                  className="flex items-center gap-3 p-3.5 border-3 border-[#121212]/10 dark:border-white/10 rounded-none bg-white/30 dark:bg-[#121212]/50 hover:border-cyan-500 dark:hover:border-cyan-400 transition-colors group"
                >
                  <Mail size={18} className="text-cyan-500 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="block text-[10px] uppercase font-mono text-gray-400 tracking-wider">Email</span>
                    <span className="text-xs font-bold text-[#121212] dark:text-white">nouvaladibayu08@gmail.com</span>
                  </div>
                </a>

                {/* WhatsApp Card */}
                <a 
                  href="https://wa.me/62895360571733" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3.5 border-3 border-[#121212]/10 dark:border-white/10 rounded-none bg-white/30 dark:bg-[#121212]/50 hover:border-cyan-500 dark:hover:border-cyan-400 transition-colors group"
                >
                  <FaWhatsapp size={18} className="text-cyan-500 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="block text-[10px] uppercase font-mono text-gray-400 tracking-wider">WhatsApp</span>
                    <span className="text-xs font-bold text-[#121212] dark:text-white">+62 895-3605-71733</span>
                  </div>
                </a>

                {/* GitHub Card */}
                <a 
                  href="https://github.com/nopalbayview/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3.5 border-3 border-[#121212]/10 dark:border-white/10 rounded-none bg-white/30 dark:bg-[#121212]/50 hover:border-cyan-500 dark:hover:border-cyan-400 transition-colors group"
                >
                  <FaGithub size={18} className="text-cyan-500 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="block text-[10px] uppercase font-mono text-gray-400 tracking-wider">GitHub</span>
                    <span className="text-xs font-bold text-[#121212] dark:text-white">github.com/nopalbayview</span>
                  </div>
                </a>

                {/* Location Card */}
                <div className="flex items-center gap-3 p-3.5 border-3 border-[#121212]/10 dark:border-white/10 rounded-none bg-white/30 dark:bg-[#121212]/50">
                  <MapPin size={18} className="text-cyan-500 dark:text-cyan-400" />
                  <div>
                    <span className="block text-[10px] uppercase font-mono text-gray-400 tracking-wider">Location</span>
                    <span className="text-xs font-bold text-[#121212] dark:text-white">Malang East Java, Indonesia</span>
                  </div>
                </div>
              </div>
            </div>

            {/* BAGIAN KANAN: FORMULIR */}
            <div className="relative z-10 flex flex-col justify-start">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                <div>
                  <label className="block text-xs font-black mb-1.5 text-[#121212] dark:text-white">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#121212]/5 dark:bg-[#18181a]/80 border border-[#121212]/20 dark:border-white/10 rounded-none px-4 py-3 text-sm outline-none focus:border-cyan-500 dark:focus:border-cyan-400 transition-colors shadow-inner" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-black mb-1.5 text-[#121212] dark:text-white">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#121212]/5 dark:bg-[#18181a]/80 border border-[#121212]/20 dark:border-white/10 rounded-none px-4 py-3 text-sm outline-none focus:border-cyan-500 dark:focus:border-cyan-400 transition-colors shadow-inner" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-black mb-1.5 text-[#121212] dark:text-white">
                    Subject
                  </label>
                  <input 
                    type="text" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-[#121212]/5 dark:bg-[#18181a]/80 border border-[#121212]/20 dark:border-white/10 rounded-none px-4 py-3 text-sm outline-none focus:border-cyan-500 dark:focus:border-cyan-400 transition-colors shadow-inner" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-black mb-1.5 text-[#121212] dark:text-white">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full resize-none bg-[#121212]/5 dark:bg-[#18181a]/80 border border-[#121212]/20 dark:border-white/10 rounded-none px-4 py-3 text-sm outline-none focus:border-cyan-500 dark:focus:border-cyan-400 transition-colors shadow-inner" 
                  />
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className={`mt-1 w-full font-bold tracking-wide py-4 px-6 rounded-none flex justify-center items-center gap-2 transition-all duration-300 active:scale-95 
                    ${status === 'loading' ? 'bg-neutral-800 dark:bg-neutral-800 text-white border-2 border-neutral-700 cursor-not-allowed opacity-85' : 
                      status === 'success' ? 'bg-green-400 hover:bg-green-300 text-black border-2 border-green-400' : 
                      status === 'error' ? 'bg-red-400 hover:bg-red-300 text-black border-2 border-red-400' : 
                      'bg-white dark:bg-neutral-900 border-2 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white hover:bg-cyan-400 hover:text-black hover:border-cyan-400'
                    }`}
                >
                  {status === 'loading' && <><Loader2 size={18} className="animate-spin" /> Sending...</>}
                  {status === 'success' && <><CheckCircle2 size={18} /> Message Sent!</>}
                  {status === 'error' && <>Failed. Try Again</>}
                  {status === 'idle' && <>Send Message <ArrowRight size={18} /></>}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}