import React, { useState, useEffect } from 'react';
import { MapPin, MessageCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { WHATSAPP_ENQUIRY_LINK } from '../siteConfig';
import defaultPortrait from '../assets/Oluwasheyi.webp'; 
import devicesMockup from '../assets/devices-mockup.webp';

export function Home({ onNavigate, onBackToSplash }) {
  const defaultCarouselItems = [
    { id: 1, title: "SEO & Speed Optimization", desc: "Rank higher and load faster with our performance architecture.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80" },
    { id: 2, title: "Next-Gen Web Development", desc: "Full-stack solutions built for scale and high conversion.", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80" },
    { id: 3, title: "AI Voice Agents", desc: "24/7 intelligent calling and human-in-loop automation.", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80" },
    { id: 4, title: "Digital Identity", desc: "Brand strategy that positions you as the authority in your space.", image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff0f?w=600&q=80" },
    { id: 5, title: "Premium Landing Pages", desc: "High-conversion static and dynamic experiences.", image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=600&q=80" }
  ];

  const [carouselItems, setCarouselItems] = useState([]);
  const [userPortrait, setUserPortrait] = useState(defaultPortrait);

  useEffect(() => {
    const savedCarousel = localStorage.getItem('vi_carousel');
    if (savedCarousel) {
      const parsed = JSON.parse(savedCarousel);
      if (parsed.length > 0) {
        setCarouselItems(parsed);
      } else {
        setCarouselItems(defaultCarouselItems);
      }
    } else {
      setCarouselItems(defaultCarouselItems);
    }

    const savedPortrait = localStorage.getItem('vi_portrait');
    if (savedPortrait) setUserPortrait(savedPortrait);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
          display: flex;
          width: max-content;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.7);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.05);
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-12 pb-12 sm:pt-20 sm:pb-24 max-w-7xl mx-auto">
        <button onClick={onBackToSplash} className="absolute top-2 left-2 sm:top-8 sm:left-8 z-50 p-2 sm:p-3 glass-card rounded-full hover:bg-white/80 transition-all flex items-center gap-2 text-gray-600 hover:text-[#FF6A00] shadow-sm group">
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-xs font-bold hidden group-hover:block pr-2">Intro Screen</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-10 sm:mt-12 lg:mt-0">
          <div className="order-1">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full mb-4 sm:mb-6 glass-card shadow-sm">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF6A00]" />
              <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-gray-700 font-mono">Virusinferno Digital Studio · Est. 2026</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-4 sm:mb-6">
              Change Your Life <br/><span className="text-[#6B4226]">Permanently.</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-xl leading-relaxed font-medium">
              We design, build, and automate premium digital infrastructure - websites, AI agents,
              and digital identities engineered for speed, scale, and conversion.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-start sm:items-center">
              <button onClick={() => onNavigate('services')} className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-white bg-[#D25C38] hover:bg-[#B54A2A] shadow-xl hover:-translate-y-1 transition-all text-sm sm:text-base">
                Explore Our Services <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <a href={WHATSAPP_ENQUIRY_LINK} target="_blank" rel="noreferrer" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-gray-900 glass-card hover:bg-white/80 shadow-md hover:-translate-y-1 transition-all text-sm sm:text-base">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#25D366]" /> Message Us on WhatsApp
              </a>
            </div>
          </div>

          <div className="order-2 flex flex-col items-center justify-center relative mt-6 sm:mt-0">
            <div className="relative w-full max-w-[16rem] sm:max-w-md glass-card rounded-[2rem] sm:rounded-[3rem] p-3 sm:p-4 z-10 shadow-2xl mx-auto">
              <img src={userPortrait} className="w-full h-auto object-cover rounded-2xl sm:rounded-3xl shadow-inner" alt="Oluwasheyi Portrait" style={{ maxHeight: '420px' }} />
            </div>
            <div className="relative w-full max-w-[18rem] sm:max-w-lg mt-[-40px] sm:mt-[-60px] z-20 mx-auto transform hover:scale-105 transition-transform duration-500">
              <img src={devicesMockup} className="w-full h-auto object-contain drop-shadow-2xl" alt="Website displayed on Mockup" />
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC CAROUSEL */}
      <section className="py-8 sm:py-12 overflow-hidden border-t border-white/40 bg-white/10">
        <div className="max-w-7xl mx-auto px-4 mb-6 sm:mb-8"><h2 className="text-xl sm:text-2xl font-bold text-gray-900">Featured Uploads & Services</h2></div>
        <div className="relative w-full overflow-hidden flex py-4 sm:py-6 min-h-[180px] sm:min-h-[200px]">
          <div className="animate-scroll hover:[animation-play-state:paused]">
            {[...carouselItems, ...carouselItems, ...carouselItems].map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="w-64 sm:w-72 mx-3 sm:mx-4 p-4 sm:p-5 glass-card rounded-2xl flex-shrink-0 cursor-pointer hover:-translate-y-2 transition-transform duration-300 hover:shadow-xl hover:bg-white/60">
                <div className="w-full h-28 sm:h-36 bg-white/50 rounded-xl mb-3 sm:mb-4 border border-white/50 overflow-hidden flex items-center justify-center shadow-inner">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1 leading-tight">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 font-medium line-clamp-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}