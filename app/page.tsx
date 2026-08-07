'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function AlumniRSVPPage() {
  const GOOGLE_FORM_EMBED_URL = "https://docs.google.com/forms/d/e/1FAIpQLSc0pn-XtE4I4rnZg0h5Sdb92C--a2Px08BnkD2afqEt6SNGUQ/viewform?embedded=true";

  // Mouse position hooks for interactive background parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth transforms for interactive parallax shifts
  const moveX = useTransform(mouseX, [-500, 500], [-30, 30]);
  const moveY = useTransform(mouseY, [-500, 500], [-30, 30]);
  const reverseX = useTransform(mouseX, [-500, 500], [30, -30]);
  const reverseY = useTransform(mouseY, [-500, 500], [30, -30]);

  useEffect(() => {
    // Initial welcome celebration burst
    confetti({
      particleCount: 45,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#006699', '#6A2874', '#FFC72C']
    });

    // Track mouse coordinates relative to window center
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F3EEF8] via-[#E8DEF2] to-[#F3EEF8] text-[#1A1A1A] font-sans flex flex-col justify-between overflow-hidden relative selection:bg-[#6A2874] selection:text-white">
      
      {/* ================= BACKGROUND SPACE & ENGINEERING ANIMATIONS ================= */}
      <div className="absolute inset-0 pointer-events-none opacity-25 overflow-hidden">
        
        {/* CONTINUOUS ORBITING ROCKET 1 (Loops around the screen) */}
        <motion.div
          animate={{
            x: ['-10vw', '110vw', '110vw', '-10vw'],
            y: ['10vh', '80vh', '-10vh', '10vh'],
            rotate: [45, 135, 225, 45],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 left-0"
        >
          <svg className="w-16 h-16 sm:w-20 sm:h-20 text-[#6A2874]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.58-5.84l2.58 2.58" />
          </svg>
        </motion.div>

        {/* ORBITING ROCKET 2 (Opposite direction loop) */}
        <motion.div
          animate={{
            x: ['105vw', '-15vw'],
            y: ['70vh', '15vh'],
            rotate: [-45, -45],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
            delay: 4,
          }}
          className="absolute top-0 left-0"
        >
          <svg className="w-12 h-12 sm:w-16 sm:h-16 text-[#006699]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.58-5.84l2.58 2.58" />
          </svg>
        </motion.div>

        {/* MOON DOODLE (Top Right) */}
        <motion.div 
          style={{ x: reverseX, y: reverseY }}
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-8 right-6 sm:right-16"
        >
          <svg className="w-20 h-20 sm:w-28 sm:h-28 text-[#6A2874]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </motion.div>

        {/* SPACE STATION DOODLE (Top Left) */}
        <motion.div 
          style={{ x: moveX, y: moveY }}
          animate={{ y: [0, -12, 0], rotate: [-3, 3, -3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-12 left-6 sm:left-16"
        >
          <svg className="w-20 h-20 sm:w-28 sm:h-28 text-[#006699]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </motion.div>

        {/* WIE GEAR / CIRCUIT DOODLE (Mid Left) */}
        <motion.div 
          style={{ x: reverseX, y: moveY }}
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 left-8 sm:left-12"
        >
          <svg className="w-20 h-20 sm:w-24 sm:h-24 text-[#006699]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          </svg>
        </motion.div>

        {/* ATOM / PHYSICS DOODLE (Mid Right) */}
        <motion.div 
          style={{ x: moveX, y: reverseY }}
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 right-8 sm:right-16"
        >
          <svg className="w-18 h-18 sm:w-24 sm:h-24 text-[#6A2874]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.93 4.93c4.97 4.97 12.07 1.93 14.14 0s4.97 12.07 0 14.14-12.07 1.93-14.14 0-4.97-12.07 0-14.14z" />
          </svg>
        </motion.div>

        {/* TWINKLING STARS DOODLE (Bottom Left & Right) */}
        <motion.div 
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-10 sm:left-20"
        >
          <svg className="w-14 h-14 text-[#6A2874]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
          </svg>
        </motion.div>

        <motion.div 
          animate={{ scale: [1.2, 0.8, 1.2], opacity: [0.8, 0.3, 0.8] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-16 right-10 sm:right-24"
        >
          <svg className="w-16 h-16 text-[#006699]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
          </svg>
        </motion.div>

      </div>

      {/* ================= MAIN CONTENT CONTAINER ================= */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 flex flex-col justify-center items-center relative z-10">
        
        {/* Animated Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 120 }}
          className="text-center mb-6 flex flex-col items-center"
        >
          {/* Logo with Interactive Hover Pop */}
          <motion.div 
            whileHover={{ scale: 1.12, rotate: 4 }}
            whileTap={{ scale: 0.92 }}
            className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3 bg-white p-2 rounded-2xl border-3 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
          >
            <Image 
              src="/wie-logo.png" 
              alt="IEEE NSU SB WIE AG Logo" 
              fill 
              className="object-contain p-1"
              priority
            />
          </motion.div>

          {/* Badge */}
          <motion.span 
            animate={{ rotate: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="bg-[#6A2874] text-white text-[11px] sm:text-xs font-black px-4 py-1.5 uppercase tracking-widest rounded-full border-2 border-black mb-3 inline-block shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          >
            Alumni Confirmation Portal
          </motion.span>
          
          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl font-black text-[#006699] tracking-wider leading-none uppercase drop-shadow-[2px_2px_0px_rgba(255,255,255,1)]">
            WELCOME ALUMNI!
          </h1>
          
          <p className="text-black font-extrabold text-xs sm:text-base mt-2 max-w-xl mx-auto leading-snug">
            IEEE NSU SB WIE Affinity Group Succession Ceremony 2025
          </p>
        </motion.div>

        {/* Animated Main Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="w-full max-w-2xl bg-white border-4 border-black rounded-3xl p-4 sm:p-6 shadow-[10px_10px_0px_0px_rgba(106,40,116,1)] flex flex-col items-center"
        >
          
          {/* Event Details Grid with Spring Hovers */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full mb-4">
            
            <motion.div 
              whileHover={{ scale: 1.06, translateY: -3 }}
              className="bg-[#FAF8FC] border-2 border-black rounded-xl p-2 sm:p-3 text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              <span className="block text-[9px] sm:text-[10px] font-black uppercase text-[#6A2874]">Date</span>
              <span className="font-black text-xs sm:text-sm text-black">15 Feb 2025</span>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.06, translateY: -3 }}
              className="bg-[#FAF8FC] border-2 border-black rounded-xl p-2 sm:p-3 text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              <span className="block text-[9px] sm:text-[10px] font-black uppercase text-[#6A2874]">Time</span>
              <span className="font-black text-xs sm:text-sm text-black">3:00 PM</span>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.06, translateY: -3 }}
              className="bg-[#FAF8FC] border-2 border-black rounded-xl p-2 sm:p-3 text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              <span className="block text-[9px] sm:text-[10px] font-black uppercase text-[#6A2874]">Venue</span>
              <span className="font-black text-[10px] sm:text-xs text-black leading-tight block mt-0.5">Beansprout, Bashundhara</span>
            </motion.div>

          </div>

          {/* Embedded Google Form Wrapper */}
          <div className="w-full bg-[#FAF8FC] border-3 border-black rounded-2xl overflow-hidden shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] relative">
            <iframe 
              src={GOOGLE_FORM_EMBED_URL}
              className="w-full h-[650px] sm:h-[720px] border-none"
              title="IEEE NSU SB WIE AG Alumni Confirmation Form"
            >
              Loading form...
            </iframe>
          </div>

        </motion.div>

      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-6 text-center relative z-10">
        <p className="text-xs font-extrabold text-[#6A2874] uppercase tracking-wider">
          © 2025 IEEE NSU SB WIE AG. All Rights Reserved.
        </p>
      </footer>

    </div>
  );
}