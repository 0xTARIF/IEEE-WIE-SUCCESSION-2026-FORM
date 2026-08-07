'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export default function LandingPage() {
  // Parallax cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const moveX = useTransform(mouseX, [-500, 500], [-20, 20]);
  const moveY = useTransform(mouseY, [-500, 500], [-20, 20]);
  const reverseX = useTransform(mouseX, [-500, 500], [20, -20]);
  const reverseY = useTransform(mouseY, [-500, 500], [20, -20]);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F3EEF8] via-[#E8DEF2] to-[#F3EEF8] text-[#1A1A1A] font-sans flex flex-col justify-between overflow-hidden relative selection:bg-[#6A2874] selection:text-white">
      
      {/* ================= GRAINY SVG NOISE OVERLAY ================= */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-25 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* ================= LIGHT PURPLE GRAIN & DOODLE COSMIC ANIMATIONS ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-60">
        
        {/* Soft Ambient Light Nebulae */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#6A2874]/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#006699]/15 rounded-full blur-[120px]" />

        {/* Twinkling Doodled Stars */}
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
            style={{
              top: `${(i * 17) % 92}%`,
              left: `${(i * 23) % 96}%`,
            }}
            className="absolute text-[#6A2874] font-bold text-lg select-none"
          >
            ✦
          </motion.div>
        ))}

        {/* Doodled Pencil Sketch Crescent Moon */}
        <motion.div 
          style={{ x: reverseX, y: reverseY }}
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-6 sm:right-16 opacity-50"
        >
          <svg className="w-20 h-20 sm:w-28 sm:h-28 text-[#6A2874]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        </motion.div>

        {/* Doodled Pencil Sketch Orbiting Satellite */}
        <motion.div 
          style={{ x: moveX, y: moveY }}
          animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-12 left-6 sm:left-16 opacity-40"
        >
          <svg className="w-20 h-20 sm:w-24 sm:h-24 text-[#006699]" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" strokeLinecap="round" viewBox="0 0 24 24">
            <path d="M12 2v4m0 12v4M2 12h4m12 0h4m-3.5-6.5l-2.8 2.8m-7.4 7.4l-2.8 2.8m0-13l2.8 2.8m7.4 7.4l2.8 2.8" />
            <circle cx="12" cy="12" r="4" strokeWidth="2.5" />
          </svg>
        </motion.div>

        {/* ROAMING DOODLE ROCKET 1 (Floating diagonally across the screen) */}
        <motion.div
          animate={{
            x: ['-10vw', '110vw'],
            y: ['80vh', '20vh'],
            rotate: [-35, -40, -30]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            delay: 0
          }}
          className="absolute z-10 pointer-events-none opacity-70"
        >
          <div className="relative">
            {/* Hand-Drawn / Doodled Pencil Rocket SVG */}
            <svg className="w-16 h-16 sm:w-20 sm:h-20 text-[#6A2874]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              {/* Rocket Body */}
              <path d="M4.5 16.5c-1.5 1.5-1.5 3.5-1.5 3.5s2 0 3.5-1.5c.75-.75 2.5-3 2.5-3l-4.5-4.5s-2.25 1.75-3 2.5z" />
              <path d="M12 15l-3-3s3.5-6 8.5-9c0 0 .5 5-2.5 8.5l-3 3.5z" strokeWidth="2.5" strokeDasharray="8 1" />
              {/* Porthole Window */}
              <circle cx="14.5" cy="9.5" r="1.5" strokeWidth="2" />
              {/* Fins */}
              <path d="M9 12l-2 3M12 9l3-2" strokeWidth="2" />
            </svg>
            
            {/* Doodled Flame Trail */}
            <motion.div 
              animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 0.3, repeat: Infinity }}
              className="absolute -bottom-3 left-2 text-[#FFC72C] font-black text-sm select-none"
            >
              ⌇⌇⌇
            </motion.div>
          </div>
        </motion.div>

        {/* ROAMING DOODLE ROCKET 2 (Drifting horizontally top right) */}
        <motion.div
          animate={{
            x: ['110vw', '-10vw'],
            y: ['15vh', '50vh'],
            rotate: [125, 135, 130]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 7
          }}
          className="absolute z-10 pointer-events-none opacity-60"
        >
          <div className="relative">
            {/* Hand-Drawn / Doodled Pencil Rocket SVG */}
            <svg className="w-14 h-14 sm:w-16 sm:h-16 text-[#006699]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M4.5 16.5c-1.5 1.5-1.5 3.5-1.5 3.5s2 0 3.5-1.5c.75-.75 2.5-3 2.5-3l-4.5-4.5s-2.25 1.75-3 2.5z" />
              <path d="M12 15l-3-3s3.5-6 8.5-9c0 0 .5 5-2.5 8.5l-3 3.5z" strokeWidth="2.5" strokeDasharray="6 1" />
              <circle cx="14.5" cy="9.5" r="1.5" strokeWidth="2" />
            </svg>
            <motion.div 
              animate={{ scale: [0.8, 1.3, 0.8] }}
              transition={{ duration: 0.3, repeat: Infinity }}
              className="absolute -bottom-2 left-2 text-orange-400 font-black text-xs select-none"
            >
              ⌇⌇
            </motion.div>
          </div>
        </motion.div>

      </div>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-12 flex flex-col justify-center items-center relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-8 flex flex-col items-center">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 4 }} 
            className="relative w-24 h-24 mb-3 bg-white p-2 rounded-2xl border-3 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
          >
            <Image src="/wie-logo.png" alt="IEEE NSU SB WIE AG Logo" fill className="object-contain p-1" priority />
          </motion.div>

          <span className="bg-[#6A2874] text-white text-xs font-black px-4 py-1.5 uppercase tracking-widest rounded-full border-2 border-black mb-3 inline-block shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            IEEE NSU SB WIE Affinity Group
          </span>
          
          <h1 className="text-4xl sm:text-6xl font-black tracking-wider leading-none uppercase text-[#6A2874] drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            SUCCESSION 2026
          </h1>
          
          <p className="font-extrabold text-sm sm:text-lg mt-3 max-w-2xl mx-auto leading-snug text-gray-800">
            Celebrating Leadership Transitions, Honoring Alumni Legacy & Inspiring Future Engineers
          </p>
        </div>

        {/* Event Quick Info Banner */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-xl mb-8">
          <div className="bg-white text-black border-3 border-black rounded-2xl p-3 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="block text-[10px] font-black uppercase text-[#6A2874]">Date</span>
            <span className="font-black text-xs sm:text-sm">15 Feb 2025</span>
          </div>
          <div className="bg-white text-black border-3 border-black rounded-2xl p-3 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="block text-[10px] font-black uppercase text-[#6A2874]">Time</span>
            <span className="font-black text-xs sm:text-sm">3:00 PM</span>
          </div>
          <div className="bg-white text-black border-3 border-black rounded-2xl p-3 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="block text-[10px] font-black uppercase text-[#6A2874]">Venue</span>
            <span className="font-black text-xs sm:text-sm leading-tight block">Beansprout</span>
          </div>
        </div>

        {/* Action Cards: Alumni vs General Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
          
          {/* Alumni Registration Card */}
          <motion.div 
            whileHover={{ translateY: -4 }}
            className="bg-white text-[#1A1A1A] border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(106,40,116,1)] flex flex-col justify-between text-left"
          >
            <div>
              <span className="bg-purple-100 text-[#6A2874] text-[10px] font-black px-3 py-1 uppercase rounded-full border border-black inline-block mb-3">
                For Alumni
              </span>
              <h2 className="text-xl font-black text-[#6A2874] uppercase mb-2">Alumni RSVP Confirmation</h2>
              <p className="text-xs font-extrabold text-gray-700 leading-relaxed mb-6">
                Are you a former executive panelist, advisor, or mentor of IEEE NSU SB WIE AG? Please confirm your presence for our succession ceremony.
              </p>
            </div>
            
            <Link 
              href="" 
              className="w-full py-3.5 bg-[#6A2874] hover:bg-[#006699] text-white font-black text-xs uppercase tracking-wider rounded-xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all block text-center"
            >
              Confirm Alumni RSVP →
            </Link>
          </motion.div>

          {/* General Members Card */}
          <motion.div 
            whileHover={{ translateY: -4 }}
            className="bg-white text-[#1A1A1A] border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(0,102,153,1)] flex flex-col justify-between text-left"
          >
            <div>
              <span className="bg-blue-100 text-[#006699] text-[10px] font-black px-3 py-1 uppercase rounded-full border border-black inline-block mb-3">
                For General Members
              </span>
              <h2 className="text-xl font-black text-[#006699] uppercase mb-2">General Registration</h2>
              <p className="text-xs font-extrabold text-gray-700 leading-relaxed mb-6">
                Join us to witness the grand panel handover, interact with our alumni network, and celebrate our group&apos;s achievements.
              </p>
            </div>

            <Link 
              href="/register" 
              className="w-full py-3.5 bg-[#006699] hover:bg-[#6A2874] text-white font-black text-xs uppercase tracking-wider rounded-xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all block text-center"
            >
              Member Registration →
            </Link>
          </motion.div>

        </div>

      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-6 text-center relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-1.5">
        <p className="text-xs font-extrabold uppercase tracking-wider text-gray-700">
          © 2026 IEEE NSU SB WIE AG. All Rights Reserved.
        </p>
        <p className="text-[11px] font-black uppercase tracking-widest text-[#6A2874] bg-white/80 px-4 py-1.5 rounded-full border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          Maintained by <span className="text-[#006699] font-black">IEEE NSU STUDENT BRANCH WEBSITE DEVELOPMENT TEAM</span>
        </p>
      </footer>

    </div>
  );
}