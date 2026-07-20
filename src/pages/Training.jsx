import React from 'react';
import { Video, Users, Globe, Clock, ArrowRight } from 'lucide-react';
import { GridBackdrop } from '../components/ui';
import { TRAINING_FEATURES, WHATSAPP_TRAINING_LINK } from '../siteConfig';

const ICON_MAP = { Video, Users, Globe, Clock };

export function Training() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-24 overflow-hidden">
      <GridBackdrop className="opacity-40" />

      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight">
          Available Training
        </h1>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center mb-6 sm:mb-8">
          <span className="font-display text-xl sm:text-3xl font-extrabold text-gray-900">
            Virtual Tech Training
          </span>
          <span className="bg-orange-100 text-[#FF6A00] px-2 py-1 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-wider">
            STATUS: 100% VIRTUAL
          </span>
        </div>

        <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto mb-10 sm:mb-14 leading-relaxed font-medium px-2">
          Learn cloud, DevOps, and modern web engineering skills from anywhere in the world. Every
          session runs online with live mentorship and real, hands-on projects - no classroom
          required.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-10 sm:mb-14">
          {TRAINING_FEATURES.map((f) => {
            const Icon = ICON_MAP[f.icon];
            return (
              <div
                key={f.label}
                className="flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-5 rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-md shadow-sm hover:shadow-md transition-shadow"
              >
                {Icon ? <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#FF6A00]" strokeWidth={2} /> : null}
                <span className="text-xs sm:text-sm text-gray-900 font-bold text-center leading-snug">{f.label}</span>
              </div>
            );
          })}
        </div>

        <a 
          href={WHATSAPP_TRAINING_LINK}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 sm:px-10 sm:py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#E8291C] to-[#FF6A00] shadow-lg hover:-translate-y-1 transition-all text-sm sm:text-base"
        >
          Book Training <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
        </a>
      </div>
    </section>
  );
}