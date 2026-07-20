import React from 'react';
import { Menu, X as CloseIcon } from 'lucide-react';
import logo from '../assets/logo.png'; // Direct import for huge logo sizing
import { NAV_ITEMS, WHATSAPP_QUOTE_LINK } from '../siteConfig';

export function Navbar({ page, onNavigate, mobileOpen, setMobileOpen }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 border-b border-white/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24"> {/* Taller header for bigger logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 shrink-0"
            aria-label="Go to home"
          >
            <img src={logo} alt="Virusinferno Digital Studio" className="h-16 md:h-20 w-auto object-contain" />
          </button>

          <nav className="hidden md:flex items-center gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-colors duration-200 ${
                  page === item.id ? 'text-[#FF6A00] bg-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:block shrink-0">
            <a
              href={WHATSAPP_QUOTE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-display font-bold text-white bg-gradient-to-r from-[#E8291C] to-[#FF6A00] shadow-lg shadow-orange-500/30 hover:scale-105 transition-transform duration-300"
            >
              Get A Quote
            </a>
          </div>

          <button
            className="md:hidden text-gray-900 p-2 -mr-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <CloseIcon className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-gray-200 ${
          mobileOpen ? 'max-h-96' : 'max-h-0 border-b-0'
        }`}
      >
        <div className="px-4 py-4 flex flex-col gap-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileOpen(false);
              }}
              className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors duration-200 ${
                page === item.id ? 'text-[#FF6A00] bg-orange-50' : 'text-gray-700'
              }`}
            >
              {item.label}
            </button>
          ))}
          <a
            href={WHATSAPP_QUOTE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-center px-5 py-3 rounded-xl text-sm font-display font-bold text-white bg-gradient-to-r from-[#E8291C] to-[#FF6A00] shadow-md"
          >
            Get A Quote
          </a>
        </div>
      </div>
    </header>
  );
}