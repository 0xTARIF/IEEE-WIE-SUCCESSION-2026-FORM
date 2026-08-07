'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export default function LandingPage() {
  // Parallax cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const moveX = useTransform(mouseX, [-500, 500], [-25, 25]);
  const moveY = useTransform(mouseY, [-500, 500], [-25, 25]);
  const reverseX = useTransform(mouseX, [-500, 500], [25, -25]);
  const reverseY = useTransform(mouseY, [-500, 500], [25, -25]);

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
    <div className="min-h-screen bg-[radial-gradient(circle_at_50%_20%,_#3B1B63_0%,_#180B2B_70%,_#0D051A_100%)] text-white font-sans flex flex-col justify-between overflow-hidden relative selection:bg-[#6A2874] selection:text-white">
      
      {/* ================= GRAINY SVG NOISE OVERLAY ================= */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* ================= DYNAMIC COSMIC BACKGROUND ANIMATIONS ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* Ambient Purple Nebulae */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#6A2874]/30 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#006699]/20 rounded-full blur-[120px]" />

        {/* Twinkling Stars */}
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1.3, 0.7] }}
            transition={{ duration: 2 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
            style={{
              top: `${(i * 17) % 92}%`,
              left: `${(i * 23) % 96}%`,
            }}
            className="absolute text-purple-200 font-bold"
          >
            ✦
          </motion.div>
        ))}

        {/* Floating Moon */}
        <motion.div 
          style={{ x: reverseX, y: reverseY }}
          animate={{ rotate: [-4, 4, -4] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-6 sm:right-16 opacity-40"
        >
          <svg className="w-20 h-20 sm:w-28 sm:h-28 text-purple-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </motion.div>

        {/* Orbiting Space Station */}
        <motion.div 
          style={{ x: moveX, y: moveY }}
          animate={{ y: [0, -12, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-12 left-6 sm:left-16 opacity-30"
        >
          <svg className="w-20 h-20 sm:w-28 sm:h-28 text-purple-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </motion.div>

        {/* ROAMING ROCKET 1 (Floating diagonally across the bottom left) */}
        <motion.div
          animate={{
            x: ['-10vw', '110vw'],
            y: ['80vh', '20vh'],
            rotate: [-30, -35, -25]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
            delay: 0
          }}
          className="absolute z-10 pointer-events-none opacity-80"
        >
          <div className="relative">
            <svg className="w-16 h-16 sm:w-20 sm:h-20 text-purple-300 drop-shadow-[0_0_12px_rgba(168,85,247,0.7)]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.13 2.21a1 1 0 0 0-1.26 0C8.5 4.81 6 9.5 6 14c0 1.93.58 3.5 1.5 4.75l-2.2 2.2a1 1 0 0 0 1.41 1.41l2.84-2.84c.78.3 1.61.48 2.45.48s1.67-.18 2.45-.48l2.84 2.84a1 1 0 0 0 1.41-1.41l-2.2-2.2c.92-1.25 1.5-2.82 1.5-4.75 0-4.5-2.5-9.19-5.87-11.79zM12 15a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
            </svg>
            <motion.div 
              animate={{ scale: [0.8, 1.4, 0.8] }}
              transition={{ duration: 0.3, repeat: Infinity }}
              className="absolute -bottom-4 left-4 w-6 h-10 bg-gradient-to-b from-yellow-300 via-orange-400 to-transparent rounded-full blur-xs -z-10"
            />
          </div>
        </motion.div>

        {/* ROAMING ROCKET 2 (Drifting horizontally across the top right) */}
        <motion.div
          animate={{
            x: ['110vw', '-10vw'],
            y: ['15vh', '45vh'],
            rotate: [120, 130, 125]
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "linear",
            delay: 6
          }}
          className="absolute z-10 pointer-events-none opacity-60"
        >
          <div className="relative">
            <svg className="w-14 h-14 sm:w-16 sm:h-16 text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.13 2.21a1 1 0 0 0-1.26 0C8.5 4.81 6 9.5 6 14c0 1.93.58 3.5 1.5 4.75l-2.2 2.2a1 1 0 0 0 1.41 1.41l2.84-2.84c.78.3 1.61.48 2.45.48s1.67-.18 2.45-.48l2.84 2.84a1 1 0 0 0 1.41-1.41l-2.2-2.2c.92-1.25 1.5-2.82 1.5-4.75 0-4.5-2.5-9.19-5.87-11.79zM12 15a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
            </svg>
            <motion.div 
              animate={{ scale: [0.8, 1.3, 0.8] }}
              transition={{ duration: 0.3, repeat: Infinity }}
              className="absolute -bottom-3 left-3 w-5 h-8 bg-gradient-to-b from-cyan-300 via-blue-500 to-transparent rounded-full blur-xs -z-10"
            />
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
          
          <h1 className="text-4xl sm:text-6xl font-black tracking-wider leading-none uppercase text-purple-200 drop-shadow-[0_0_12px_rgba(232,222,242,0.6)]">
            SUCCESSION 2026
          </h1>
          
          <p className="font-extrabold text-sm sm:text-lg mt-3 max-w-2xl mx-auto leading-snug text-purple-100">
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
              href="" {/*For later */}
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
      <footer className="w-full py-4 px-6 text-center relative z-10 max-w-5xl mx-auto">
        <p className="text-xs font-extrabold uppercase tracking-wider text-purple-200">
          © 2026 IEEE NSU SB WIE AG. All Rights Reserved.
        </p>
      </footer>

    </div>
  );
}