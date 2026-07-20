import React from 'react';
import { Globe, ArrowUpRight, ArrowRight } from 'lucide-react';
import { GridBackdrop } from '../components/ui';
import { WEBSITE_URL, X_URL, X_HANDLE, WHATSAPP_QUOTE_LINK } from '../siteConfig';

export function Contact() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
      <GridBackdrop className="opacity-40" />
      <div className="relative max-w-4xl mx-auto text-center mb-10 sm:mb-14">
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Contact Us
        </h1>
        <p className="text-base sm:text-lg text-gray-700 font-medium max-w-xl mx-auto px-2">
          Ready to start your project or have a question? Reach out - we usually respond within
          the hour.
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-14">
        <a
          href={WEBSITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 sm:gap-4 p-5 sm:p-6 rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#E8291C] to-[#FF6A00] shrink-0 shadow-md">
            <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="text-left overflow-hidden">
            <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide font-bold font-mono">
              Website
            </div>
            <div className="text-gray-900 font-extrabold font-display text-sm sm:text-base truncate">{WEBSITE_URL.replace('https://', '')}</div>
          </div>
          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 ml-auto shrink-0" />
        </a>

        <a
          href={X_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 sm:gap-4 p-5 sm:p-6 rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#E8291C] to-[#FF6A00] shrink-0 font-black text-white text-lg sm:text-xl shadow-md">
            𝕏
          </div>
          <div className="text-left overflow-hidden">
            <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide font-bold font-mono">
              X (Twitter)
            </div>
            <div className="text-gray-900 font-extrabold font-display text-sm sm:text-base truncate">{X_HANDLE}</div>
          </div>
          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 ml-auto shrink-0" />
        </a>
      </div>

      <div className="relative max-w-3xl mx-auto text-center p-6 sm:p-12 rounded-3xl sm:rounded-[2rem] border border-gray-200 bg-white/80 backdrop-blur-xl shadow-xl">
        <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 sm:mb-3">
          Have a project in mind?
        </h3>
        <p className="text-sm sm:text-lg text-gray-600 font-medium mb-6 sm:mb-8">
          Tell us what you're building and get a tailored quote - no obligation.
        </p>
        <a 
          href={WHATSAPP_QUOTE_LINK}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#E8291C] to-[#FF6A00] shadow-lg hover:-translate-y-1 transition-all text-sm sm:text-base"
        >
          Get A Quote <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
        </a>
      </div>
    </section>
  );
}