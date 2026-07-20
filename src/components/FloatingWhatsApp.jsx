import React from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_ENQUIRY_LINK } from '../siteConfig';

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_ENQUIRY_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message Virusinferno Digital Studio on WhatsApp"
      className="group fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50"
    >
      <span className="absolute inset-0 rounded-full bg-whatsapp opacity-60 animate-ping" />
      <span className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-whatsapp shadow-2xl hover:scale-110 transition-transform duration-300">
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="white" strokeWidth={1.5} />
      </span>
      <span className="hidden md:block absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-white text-void px-3 py-1.5 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg pointer-events-none">
        Chat with us
      </span>
    </a>
  );
}
