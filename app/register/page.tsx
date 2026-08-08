'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function RegisterPage() {
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
    email: '',
    name: '',
    studentId: '',
    contactNo: '',
    isIeeeMember: 'Yes',
    ieeeEmail: '',
    trxId: '',
    expectations: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Replace with your General Members Google Apps Script Web App URL once deployed
  const GENERAL_MEMBER_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwotCtakz5FHCMeO1KvxbcJ8rrbm9XWphJxnBATXWZ0FCG4uchGuigJt2p9Ajb-hfAl6g/exec";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.studentId.trim() || !formData.trxId.trim()) return;

    setStatus('submitting');

    const payload = {
      email: formData.email,
      name: formData.name,
      studentId: formData.studentId,
      contactNo: formData.contactNo,
      isIeeeMember: formData.isIeeeMember,
      ieeeEmail: formData.ieeeEmail || 'N/A',
      trxId: formData.trxId,
      expectations: formData.expectations || 'N/A',
    };

    try {
      await fetch(GENERAL_MEMBER_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      confetti({
        particleCount: 90,
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
    <div className="min-h-screen bg-gradient-to-b from-[#F3EEF8] via-[#E8DEF2] to-[#F3EEF8] text-[#1A1A1A] font-sans flex flex-col justify-center items-center p-4 py-12 relative overflow-hidden selection:bg-[#6A2874] selection:text-white">
      
      {/* BACKGROUND NOISE & DOODLE STARS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <motion.div style={{ x: moveX, y: moveY }} className="absolute top-10 left-6 sm:left-16">
          <svg className="w-20 h-20 text-[#006699]" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" viewBox="0 0 24 24">
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

      {/* MAIN REGISTRATION FORM CARD */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-lg w-full bg-white border-4 border-black rounded-3xl p-6 sm:p-8 shadow-[10px_10px_0px_0px_rgba(0,102,153,1)] relative z-10"
      >
        
        <Link href="/" className="inline-flex items-center text-xs font-black text-[#006699] hover:underline mb-4 gap-1">
          ← Back to Main Page
        </Link>

        {status === 'success' ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-black text-[#006699] uppercase mb-2">Registration Submitted!</h2>
            <p className="text-sm font-bold text-gray-700 mb-6 leading-relaxed">
              Thank you for registering for IEEE NSU SB WIE AG Succession 2026. We look forward to seeing you at Bosco Cafe and Bistro!
            </p>
            <button 
              onClick={() => router.push('/')}
              className="py-3.5 px-6 bg-[#006699] hover:bg-[#6A2874] text-white font-black text-xs uppercase tracking-wider rounded-xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer"
            >
              Return to Home Page
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="text-center mb-6">
              <span className="bg-[#006699] text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest rounded-full border border-black inline-block mb-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                General Member Registration
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#6A2874] uppercase tracking-wide">
                IEEE NSU SB WIE AG SUCCESSION 2026
              </h1>
              <div className="mt-3 bg-purple-50 border-2 border-black rounded-xl p-3 text-left text-xs font-bold text-gray-800 space-y-1">
                <p><span className="text-[#6A2874]">Amount:</span> 700</p>
                <p><span className="text-[#6A2874]">bKash:</span> +880 1775-397602</p>
                <p className="text-[10px] text-gray-500 font-extrabold">* Enter your name as reference when making payment.</p>
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-xs font-black uppercase text-gray-800 mb-1">Email Address *</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
                className="w-full p-3 bg-[#FAF8FC] border-3 border-black rounded-2xl font-extrabold text-sm outline-none focus:border-[#006699] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
              />
            </div>

            {/* NAME */}
            <div>
              <label className="block text-xs font-black uppercase text-gray-800 mb-1">Full Name *</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your Full Name"
                className="w-full p-3 bg-[#FAF8FC] border-3 border-black rounded-2xl font-extrabold text-sm outline-none focus:border-[#006699] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
              />
            </div>

            {/* STUDENT ID */}
            <div>
              <label className="block text-xs font-black uppercase text-gray-800 mb-1">NSU Student ID *</label>
              <input 
                type="text" 
                required
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                placeholder="e.g. 2121234642"
                className="w-full p-3 bg-[#FAF8FC] border-3 border-black rounded-2xl font-extrabold text-sm outline-none focus:border-[#006699] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
              />
            </div>

            {/* CONTACT NO */}
            <div>
              <label className="block text-xs font-black uppercase text-gray-800 mb-1">Contact No *</label>
              <input 
                type="tel" 
                required
                value={formData.contactNo}
                onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
                placeholder="01XXXXXXXXX"
                className="w-full p-3 bg-[#FAF8FC] border-3 border-black rounded-2xl font-extrabold text-sm outline-none focus:border-[#006699] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
              />
            </div>

            {/* IEEE MEMBER? (YES/NO TOGGLE) */}
            <div>
              <label className="block text-xs font-black uppercase text-gray-800 mb-1">Are you an IEEE Member? *</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isIeeeMember: 'Yes' })}
                  className={`p-3 rounded-2xl border-3 border-black font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    formData.isIeeeMember === 'Yes'
                      ? 'bg-[#006699] text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-[#FAF8FC] text-black hover:bg-blue-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isIeeeMember: 'No' })}
                  className={`p-3 rounded-2xl border-3 border-black font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    formData.isIeeeMember === 'No'
                      ? 'bg-[#6A2874] text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-[#FAF8FC] text-black hover:bg-purple-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {/* IEEE EMAIL (OPTIONAL / CONDITIONAL) */}
            <div>
              <label className="block text-xs font-black uppercase text-gray-800 mb-1">
                IEEE Email <span className="text-gray-400 font-bold">(Optional)</span>
              </label>
              <input 
                type="email" 
                value={formData.ieeeEmail}
                onChange={(e) => setFormData({ ...formData, ieeeEmail: e.target.value })}
                placeholder="name@ieee.org"
                className="w-full p-3 bg-[#FAF8FC] border-3 border-black rounded-2xl font-extrabold text-sm outline-none focus:border-[#006699] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
              />
            </div>

            {/* BKASH TRANSACTION ID */}
            <div>
              <label className="block text-xs font-black uppercase text-gray-800 mb-1">bKash Transaction ID *</label>
              <input 
                type="text" 
                required
                value={formData.trxId}
                onChange={(e) => setFormData({ ...formData, trxId: e.target.value })}
                placeholder="e.g. BLX8923K9A"
                className="w-full p-3 bg-[#FAF8FC] border-3 border-black rounded-2xl font-extrabold text-sm outline-none focus:border-[#006699] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
              />
            </div>

            {/* WHAT ARE YOU LOOKING FORWARD TO */}
            <div>
              <label className="block text-xs font-black uppercase text-gray-800 mb-1">
                What are you looking forward to the most from the event? <span className="text-gray-400 font-bold">(Optional)</span>
              </label>
              <textarea 
                rows={2}
                value={formData.expectations}
                onChange={(e) => setFormData({ ...formData, expectations: e.target.value })}
                placeholder="Networking, panel handover, celebration..."
                className="w-full p-3 bg-[#FAF8FC] border-3 border-black rounded-2xl font-extrabold text-sm outline-none focus:border-[#006699] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all resize-none"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={status === 'submitting'}
              className="w-full py-3.5 mt-2 bg-[#006699] hover:bg-[#6A2874] text-white font-black text-sm uppercase tracking-wider rounded-2xl border-3 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
            >
              {status === 'submitting' ? 'Submitting...' : 'COMPLETE REGISTRATION'}
            </motion.button>

          </form>
        )}

      </motion.div>

    </div>
  );
}
