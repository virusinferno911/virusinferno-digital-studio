import React from 'react';
import { ArrowRight } from 'lucide-react';
import logo from '../assets/logo.webp'; 
import { useTypewriter } from '../hooks/useTypewriter';

export function SplashScreen({ onGetStarted, exiting }) {
  const { displayed } = useTypewriter('INITIALIZING DIGITAL ARCHITECTURE...', 30, 500);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500 ${
        exiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        backgroundImage: "url('/splash-bg.webp')", 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Reduced opacity and removed blur so the background image is highly visible */}
      <div className="absolute inset-0 bg-white/20 z-0"></div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center w-full max-w-5xl">
        <div
          className={`transition-all duration-700 w-full flex justify-center ${
            exiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          {/* MASSIVELY INCREASED LOGO SIZE */}
          <img 
            src={logo} 
            className="w-[20rem] sm:w-[28rem] md:w-[36rem] lg:w-[45rem] object-contain drop-shadow-2xl" 
            alt="Virusinferno Digital Studio Logo" 
          />
        </div>

        <div className="h-6 mt-12 font-mono text-xs sm:text-sm tracking-widest text-gray-900 font-bold bg-white/60 px-5 py-1.5 rounded-full backdrop-blur-md shadow-sm">
          <span className="text-[#FF6A00]">{'>'}</span> {displayed}
          <span className="inline-block w-2 -mb-0.5 animate-blink-cursor bg-gray-900 h-4 ml-1"></span>
        </div>

        <button
          onClick={onGetStarted}
          className="mt-12 inline-flex items-center gap-2 px-12 py-5 rounded-2xl font-display font-extrabold text-lg text-white bg-gradient-to-r from-[#E8291C] to-[#FF6A00] shadow-2xl shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20"
        >
          Get Started <ArrowRight className="w-6 h-6" />
        </button>

        <p className="mt-10 text-xs tracking-[0.25em] text-gray-800 font-mono uppercase font-extrabold drop-shadow-md bg-white/40 px-4 py-1 rounded-full">
          Est. 2026 · Virusinferno Digital Studio
        </p>
      </div>
    </div>
  );
}