'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function GuestRegisterPage() {
  const router = useRouter();

  // Mouse tracking for parallax background
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const moveX = useTransform(mouseX, [-500, 500], [-20, 20]);
  const moveY = useTransform(mouseY, [-500, 500], [-20, 20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gradYear: '',
    attending: 'Yes, I will attend',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Guest / Alumni Google Apps Script URL
  const GUESTS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwMJPX36eSIjD45mdFpmjhipx-76bE-dLBnC-vOD5fE69sL1leLKZAjDK1SzXgV95IL/exec";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setStatus('submitting');

    const payload = {
      name: formData.name,
      email: formData.email || 'N/A',
      gradYear: formData.gradYear || 'N/A',
      attending: formData.attending,
    };

    try {
      await fetch(GUESTS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#006699', '#6A2874', '#FFC72C']
      });

      setStatus('success');
    } catch (err) {
      console.error("Submission error:", err);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F3EEF8] via-[#E8DEF2] to-[#F3EEF8] text-[#1A1A1A] font-sans flex flex-col justify-center items-center p-4 relative overflow-hidden selection:bg-[#6A2874] selection:text-white">
      
      {/* BACKGROUND NOISE & DOODLE STARS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <motion.div style={{ x: moveX, y: moveY }} className="absolute top-10 left-6 sm:left-16">
          <svg className="w-20 h-20 text-[#6A2874]" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" viewBox="0 0 24 24">
            <path d="M12 2v4m0 12v4M2 12h4m12 0h4" />
            <circle cx="12" cy="12" r="4" strokeWidth="2" />
          </svg>
        </motion.div>

        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            style={{ top: `${(i * 17) % 90}%`, left: `${(i * 23) % 95}%` }}
            className="absolute text-[#6A2874] font-bold text-lg select-none"
          >
            ✦
          </motion.div>
        ))}
      </div>

      {/* GUEST RSVP CARD */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-white border-4 border-black rounded-3xl p-6 sm:p-8 shadow-[10px_10px_0px_0px_rgba(106,40,116,1)] relative z-10"
      >
        
        <Link href="/" className="inline-flex items-center text-xs font-black text-[#6A2874] hover:underline mb-4 gap-1">
          ← Back to Main Page
        </Link>

        {status === 'success' ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-black text-[#6A2874] uppercase mb-2">Thanks for confirming!</h2>
            <p className="text-sm font-bold text-gray-700 mb-6 leading-relaxed">
              We look forward to welcoming you to the IEEE NSU SB WIE AG Succession Ceremony at Beansprout.
            </p>
            <button 
              onClick={() => router.push('/')}
              className="py-3.5 px-6 bg-[#6A2874] hover:bg-[#006699] text-white font-black text-xs uppercase tracking-wider rounded-xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer"
            >
              Return to Landing Page
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="text-center mb-6">
              <span className="bg-[#6A2874] text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest rounded-full border border-black inline-block mb-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                Alumni / Guest RSVP
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#006699] uppercase tracking-wide">
                ALUMNI CONFIRMATION
              </h1>
            </div>

            {/* FULL NAME */}
            <div>
              <label className="block text-xs font-black uppercase text-gray-800 mb-1">Full Name *</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Dr. Jane Doe"
                className="w-full p-3 bg-[#FAF8FC] border-3 border-black rounded-2xl font-extrabold text-sm outline-none focus:border-[#6A2874] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-xs font-black uppercase text-gray-800 mb-1">
                Email Address <span className="text-gray-400 font-bold">(Optional)</span>
              </label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full p-3 bg-[#FAF8FC] border-3 border-black rounded-2xl font-extrabold text-sm outline-none focus:border-[#6A2874] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
              />
            </div>

            {/* BATCH YEAR */}
            <div>
              <label className="block text-xs font-black uppercase text-gray-800 mb-1">
                Graduation / Batch Year <span className="text-gray-400 font-bold">(Optional)</span>
              </label>
              <input 
                type="text" 
                value={formData.gradYear}
                onChange={(e) => setFormData({ ...formData, gradYear: e.target.value })}
                placeholder="e.g. 2020 / Batch 16"
                className="w-full p-3 bg-[#FAF8FC] border-3 border-black rounded-2xl font-extrabold text-sm outline-none focus:border-[#6A2874] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
              />
            </div>

            {/* ATTENDING TOGGLE */}
            <div>
              <label className="block text-xs font-black uppercase text-gray-800 mb-1">Will you attend? *</label>
              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: 'Yes, I will attend' })}
                  className={`w-full p-3 rounded-2xl border-3 border-black font-black text-xs uppercase tracking-wider text-left transition-all flex items-center justify-between cursor-pointer ${
                    formData.attending === 'Yes, I will attend'
                      ? 'bg-[#6A2874] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-[#FAF8FC] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-purple-100'
                  }`}
                >
                  <span>Yes, I will attend</span>
                  {formData.attending === 'Yes, I will attend' && <span>✔</span>}
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: 'No, I cannot attend' })}
                  className={`w-full p-3 rounded-2xl border-3 border-black font-black text-xs uppercase tracking-wider text-left transition-all flex items-center justify-between cursor-pointer ${
                    formData.attending === 'No, I cannot attend'
                      ? 'bg-[#006699] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-[#FAF8FC] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-100'
                  }`}
                >
                  <span>No, I cannot attend</span>
                  {formData.attending === 'No, I cannot attend' && <span>✖</span>}
                </button>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={status === 'submitting'}
              className="w-full py-3.5 mt-2 bg-[#6A2874] hover:bg-[#006699] text-white font-black text-sm uppercase tracking-wider rounded-2xl border-3 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
            >
              {status === 'submitting' ? 'Confirming...' : 'CONFIRM ATTENDANCE'}
            </motion.button>

          </form>
        )}

      </motion.div>

    </div>
  );
}