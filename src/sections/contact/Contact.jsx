import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

export default function Contact() {
  // 1. STATE UNTUK MENYIMPAN INPUT DARI USER
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 2. FUNGSI MENGIRIM EMAIL KE WEB3FORMS
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const payload = {
      
      // ===================================================================
      // DI SINILAH TEMPAT API KEY-NYA! 
      // Ganti tulisan "YOUR_ACCESS_KEY_HERE" dengan kode dari emailmu.
      // Jangan hapus tanda kutip (" ") nya ya.
      // ===================================================================
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
        setFormData({ name: '', email: '', subject: '', message: '' }); // Kosongkan form
        setTimeout(() => setStatus('idle'), 3000); // Kembalikan tombol ke normal setelah 3 detik
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus('error');
    }
  };

  return (
    <div className="relative overflow-hidden w-full min-h-screen pt-32 pb-24 text-[#121212] dark:text-white font-sans transition-colors duration-300">
      <div 
          aria-hidden="true" 
          className="absolute top-0 bottom-0 left-[50%] w-[100vw] -translate-x-1/2 bg-grid-pattern opacity-70 pointer-events-none" 
        />
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* HEADER */}
        <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-1 space-y-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-fit text-4xl md:text-5xl lg:text-6xl font-sans font-black tracking-tighter max-w-3xl leading-tight text-black dark:text-white">Contact
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-sm md:text-base font-bold text-[#121212]/70 dark:text-gray-300"
          >
            Get In Touch
          </motion.p>
        </div>

        {/* KARTU UTAMA (FORM & INFO) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative w-full rounded-[2rem] border border-[#121212]/10 dark:border-white/10 p-6 lg:p-10 overflow-hidden bg-white/50 dark:bg-[#1a1a1c]/40 backdrop-blur-xl shadow-2xl"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-cyan-500/10 dark:bg-cyan-500/15 blur-[80px] md:blur-[120px] rounded-full pointer-events-none -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            
            {/* BAGIAN KIRI: TIPOGRAFI & INFO */}
            <div className="flex flex-col justify-between h-full relative z-10">
              <div className="mb-10">
                <h2 className="text-4xl sm:text-4xl md:text-5xl font-black leading-[1.2] tracking-tight uppercase">
                  DON'T THINK TO <br />
                  <span className="relative inline-block pl-2 pr-2 md:pl-2 md:pr-2">
                    <span className="absolute top-0.5 bottom-0 md:top-0 md:bottom-0 inset-x-0 bg-cyan-400 rounded-md transform shadow-sm animate-fill-more"></span>
                    <span className="relative z-10 text-black">HARD</span>
                  </span> <br />
                  MAKE 
                  <span className="relative inline-block pl-4 pr-4 md:pl-4 md:pr-1">
                    <span className="absolute top-0.5 bottom-0 md:top-0 md:bottom-0 inset-x-2 bg-cyan-400 rounded-md transform shadow-sm animate-fill-more"></span>
                    <span className="relative z-10 text-black">MORE</span>
                  </span> <br />
                  IF YOU KNOW <br />
                  JUST <span className="glitch-text text-cyan-400 dark:text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" data-text="DO IT">DO IT</span>
                </h2>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3 text-[#121212] dark:text-white">Info</h3>
                <div className="border border-[#121212]/10 dark:border-white/10 rounded-xl p-6 bg-white/30 dark:bg-[#121214]/50 backdrop-blur-md space-y-4">
                  <div className="flex items-center gap-4">
                    <Mail size={18} className="text-[#121212]/70 dark:text-gray-300" />
                    <a href="mailto:nouvaladibayu08@gmail.com" className="text-sm font-semibold hover:text-cyan-400 dark:hover:text-cyan-400 transition-colors underline-offset-4 hover:underline">
                      nouvaladibayu08@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin size={18} className="text-[#121212]/70 dark:text-gray-300" />
                    <span className="text-sm font-semibold text-[#121212]/90 dark:text-white">
                      Malang East Java, Indonesia
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* BAGIAN KANAN: FORMULIR */}
            <div className="relative z-10 flex flex-col justify-start mt-1">
              
              {/* 3. PASTIKAN onSubmit DITAMBAHKAN KE FORM */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                
                <div>
                  <label className="block text-xs font-black mb-2 text-[#121212] dark:text-white">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="name" // WAJIB ADA
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#121212]/5 dark:bg-[#18181a]/80 border border-[#121212]/20 dark:border-white/10 rounded-xl p-3.5 text-sm outline-none focus:border-cyan-500 dark:focus:border-cyan-400 transition-colors shadow-inner" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-black mb-2 text-[#121212] dark:text-white">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    name="email" // WAJIB ADA
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#121212]/5 dark:bg-[#18181a]/80 border border-[#121212]/20 dark:border-white/10 rounded-xl p-3.5 text-sm outline-none focus:border-cyan-500 dark:focus:border-cyan-400 transition-colors shadow-inner" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-black mb-2 text-[#121212] dark:text-white">
                    Subject
                  </label>
                  <input 
                    type="text" 
                    name="subject" // WAJIB ADA
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-[#121212]/5 dark:bg-[#18181a]/80 border border-[#121212]/20 dark:border-white/10 rounded-xl p-3.5 text-sm outline-none focus:border-cyan-500 dark:focus:border-cyan-400 transition-colors shadow-inner" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-black mb-2 text-[#121212] dark:text-white">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    name="message" // WAJIB ADA
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full resize-none bg-[#121212]/5 dark:bg-[#18181a]/80 border border-[#121212]/20 dark:border-white/10 rounded-xl p-3.5 text-sm outline-none focus:border-cyan-500 dark:focus:border-cyan-400 transition-colors shadow-inner" 
                  />
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className={`mt-2 w-full font-black tracking-wide py-4 px-6 rounded-xl flex justify-center items-center gap-2 transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.3)] 
                    ${status === 'loading' ? 'bg-cyan-600 cursor-not-allowed opacity-70 text-black' : 
                      status === 'success' ? 'bg-green-400 hover:bg-green-300 text-black' : 
                      status === 'error' ? 'bg-red-400 hover:bg-red-300 text-black' : 
                      'bg-cyan-400 hover:bg-cyan-300 text-black active:scale-95 hover:shadow-[0_0_25px_rgba(34,211,238,0.5)]'
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