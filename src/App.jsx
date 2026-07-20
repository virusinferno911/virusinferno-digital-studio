import React, { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Training } from './pages/Training';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin'; 

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [splashExiting, setSplashExiting] = useState(false);
  const [page, setPage] = useState('home');
  const [displayPage, setDisplayPage] = useState('home');
  const [pageTransition, setPageTransition] = useState('in');
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // State for dynamic global background
  const [globalBg, setGlobalBg] = useState('/fire-bg.png'); // Default

  // Update background when navigating between pages
  useEffect(() => {
    const customBg = localStorage.getItem('vi_bg_image');
    if (customBg) {
      setGlobalBg(customBg);
    } else {
      setGlobalBg('/fire-bg.png');
    }
  }, [displayPage]);

  const handleGetStarted = () => {
    setSplashExiting(true);
    setTimeout(() => setShowSplash(false), 550);
  };

  const handleBackToSplash = () => {
    setSplashExiting(false);
    setShowSplash(true);
    setPage('home');
    setDisplayPage('home');
  };

  const navigateTo = (target) => {
    setMobileOpen(false);
    setPage(target);
    if (target === displayPage) return;
    setPageTransition('out');
    setTimeout(() => {
      setDisplayPage(target);
      setPageTransition('in');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 220);
  };

  if (showSplash) {
    return <SplashScreen onGetStarted={handleGetStarted} exiting={splashExiting} />;
  }

  return (
    <div className="min-h-screen w-full font-sans text-gray-900 relative bg-gradient-to-br from-[#FFF5F0] via-white to-[#FFE8E0]">
      
      {/* DYNAMIC GLOBAL BACKGROUND */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none transition-all duration-700"
        style={{ 
          backgroundImage: `url(${globalBg})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.15
        }}
      ></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        {displayPage !== 'admin' && (
          <Navbar page={page} onNavigate={navigateTo} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        )}

        <main
          className={`transition-all duration-300 ease-out flex-grow ${
            pageTransition === 'out' ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
          }`}
        >
          {displayPage === 'home' && <Home onNavigate={navigateTo} onBackToSplash={handleBackToSplash} />}
          {displayPage === 'services' && <Services />}
          {displayPage === 'training' && <Training />}
          {displayPage === 'contact' && <Contact />}
          {displayPage === 'admin' && <Admin onNavigate={navigateTo} />}
        </main>

        {displayPage !== 'admin' && <Footer onNavigate={navigateTo} />}
        {displayPage !== 'admin' && <FloatingWhatsApp />}
      </div>
    </div>
  );
}