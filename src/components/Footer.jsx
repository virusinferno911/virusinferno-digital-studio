import React from 'react';
import { Lock } from 'lucide-react';
import logo from '../assets/logo.webp'; 
import { NAV_ITEMS, WEBSITE_URL, X_URL, X_HANDLE } from '../siteConfig';

export function Footer({ onNavigate }) {
  return (
    <footer className="px-4 sm:px-6 lg:px-8 py-12 border-t border-white/50 bg-white/40 backdrop-blur-md mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        
        {/* Bold Logo */}
        <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate('home')}>
          <img src={logo} alt="Virusinferno Digital Studio" className="h-16 w-auto object-contain" />
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="text-sm font-bold text-gray-600 hover:text-[#FF6A00] transition-colors duration-200"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* External Links */}
        <div className="flex items-center gap-5 font-mono text-sm font-bold">
          <a
            href={WEBSITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#FF6A00] transition-colors duration-200"
          >
            virusinferno.xyz
          </a>
          <a
            href={X_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#FF6A00] transition-colors duration-200"
          >
            {X_HANDLE}
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-white/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-500 font-mono font-bold text-center sm:text-left flex-grow">
          © 2026 Virusinferno Digital Studio. All rights reserved.
        </p>
        
        {/* VISIBLE SUBTLE ADMIN ICON */}
        <button 
          onClick={() => onNavigate('admin')}
          className="opacity-40 hover:opacity-100 transition-opacity duration-300 p-2 text-gray-500 hover:text-[#FF6A00]"
          title="Admin Access"
        >
          <Lock className="w-5 h-5" />
        </button>
      </div>
    </footer>
  );
}