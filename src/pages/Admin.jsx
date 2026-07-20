import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, LayoutDashboard, ImagePlus, LogOut, UploadCloud, Trash2, Settings, Plus } from 'lucide-react';
import logo from '../assets/logo.png';

export function Admin({ onNavigate }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const carouselInputRef = useRef(null);
  const portraitInputRef = useRef(null);
  const bgInputRef = useRef(null);

  const defaultServices = [
    { id: 1, title: 'SEO & Speed Optimization', desc: 'Technical SEO and performance tuning that gets you found.', icon: 'Gauge' },
    { id: 2, title: 'Premium Landing Pages', desc: 'Conversion-focused landing pages, from static to dynamic.', icon: 'LayoutTemplate' },
    { id: 3, title: 'WhatsApp Chatbots', desc: 'Automated WhatsApp flows with seamless human handoff.', icon: 'MessageSquare' }
  ];

  const defaultCarousel = [
    { id: 1, title: "SEO & Speed Optimization", desc: "Rank higher and load faster with our performance architecture.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80" },
    { id: 2, title: "Next-Gen Web Development", desc: "Full-stack solutions built for scale and high conversion.", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80" },
    { id: 3, title: "AI Voice Agents", desc: "24/7 intelligent calling and human-in-loop automation.", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80" },
    { id: 4, title: "Digital Identity", desc: "Brand strategy that positions you as the authority in your space.", image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff0f?w=600&q=80" },
    { id: 5, title: "Premium Landing Pages", desc: "High-conversion static and dynamic experiences.", image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=600&q=80" }
  ];

  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('vi_services');
    return saved ? JSON.parse(saved) : defaultServices;
  });

  const [carousel, setCarousel] = useState(() => {
    const saved = localStorage.getItem('vi_carousel');
    return saved ? JSON.parse(saved) : defaultCarousel;
  });

  const [portraitImg, setPortraitImg] = useState(() => localStorage.getItem('vi_portrait') || '');
  const [bgImg, setBgImg] = useState(() => localStorage.getItem('vi_bg_image') || '');

  const [newServiceTitle, setNewServiceTitle] = useState('');
  const [newServiceDesc, setNewServiceDesc] = useState('');
  const [newServiceIcon, setNewServiceIcon] = useState('Code2');
  
  const [newCarouselTitle, setNewCarouselTitle] = useState('');
  const [newCarouselDesc, setNewCarouselDesc] = useState('');
  const [uploadedCarouselBase64, setUploadedCarouselBase64] = useState('');

  useEffect(() => { localStorage.setItem('vi_services', JSON.stringify(services)); }, [services]);
  useEffect(() => { localStorage.setItem('vi_carousel', JSON.stringify(carousel)); }, [carousel]);
  useEffect(() => { if (portraitImg) localStorage.setItem('vi_portrait', portraitImg); }, [portraitImg]);
  useEffect(() => { if (bgImg) localStorage.setItem('vi_bg_image', bgImg); }, [bgImg]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'sheymania@gmail.com' && password === 'Datboi@20') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid credentials. Access denied.');
    }
  };

  const handleImageUpload = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1500000) { 
        alert("File is too large! Please upload an image under 1.5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setter(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const addService = () => {
    if (!newServiceTitle || !newServiceDesc) return alert("Please fill both title and description.");
    setServices([...services, { id: Date.now(), title: newServiceTitle, desc: newServiceDesc, icon: newServiceIcon }]);
    setNewServiceTitle(''); setNewServiceDesc('');
  };
  const deleteService = (id) => setServices(services.filter(s => s.id !== id));

  const addCarouselItem = () => {
    if (!newCarouselTitle || !newCarouselDesc || !uploadedCarouselBase64) return alert("Fill all fields and upload an image.");
    setCarousel([...carousel, { id: Date.now(), title: newCarouselTitle, desc: newCarouselDesc, image: uploadedCarouselBase64 }]);
    setNewCarouselTitle(''); setNewCarouselDesc(''); setUploadedCarouselBase64('');
  };
  const deleteCarouselItem = (id) => setCarousel(carousel.filter(c => c.id !== id));

  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white/60 backdrop-blur-xl border border-white/70 p-8 rounded-[2rem] shadow-2xl relative">
          <button onClick={() => onNavigate('home')} className="absolute top-6 left-6 text-gray-400 hover:text-gray-800"><ArrowLeft className="w-5 h-5" /></button>
          <div className="flex justify-center mb-8 mt-4"><img src={logo} alt="Logo" className="h-16 object-contain" /></div>
          <h2 className="text-2xl font-extrabold text-center text-gray-900 mb-8">Admin Portal</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#FF6A00]" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#FF6A00]" required />
            </div>
            {error && <p className="text-red-500 text-sm font-semibold text-center">{error}</p>}
            <button type="submit" className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#E8291C] to-[#FF6A00] hover:shadow-lg transition-all">Secure Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Command Center</h1>
          <p className="text-gray-600 font-medium">Welcome back, Oluwasheyi. Any changes made here reflect instantly.</p>
        </div>
        <button onClick={() => { setIsLoggedIn(false); onNavigate('home'); }} className="flex items-center gap-2 px-4 py-2 bg-white/50 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors shadow-sm">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="space-y-3 col-span-1">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl font-bold transition-all ${activeTab === 'dashboard' ? 'bg-white border-gray-200 text-[#FF6A00] shadow-sm' : 'bg-white/40 text-gray-600 border-transparent hover:bg-white'}`}>
            <LayoutDashboard className="w-5 h-5" /> Manage Services
          </button>
          <button onClick={() => setActiveTab('carousel')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl font-bold transition-all ${activeTab === 'carousel' ? 'bg-white border-gray-200 text-[#FF6A00] shadow-sm' : 'bg-white/40 text-gray-600 border-transparent hover:bg-white'}`}>
            <ImagePlus className="w-5 h-5" /> Carousel Images
          </button>
          <button onClick={() => setActiveTab('media')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl font-bold transition-all ${activeTab === 'media' ? 'bg-white border-gray-200 text-[#FF6A00] shadow-sm' : 'bg-white/40 text-gray-600 border-transparent hover:bg-white'}`}>
            <Settings className="w-5 h-5" /> Site Media
          </button>
        </div>

        <div className="md:col-span-3 space-y-6">
          
          {activeTab === 'dashboard' && (
            <div className="bg-white/60 backdrop-blur-md border border-white/80 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Current Active Services</h3>
              <div className="grid gap-3 mb-6 bg-white/80 p-5 rounded-xl border border-gray-200">
                <p className="text-sm font-bold text-gray-700 mb-2">Add New Service</p>
                <input type="text" value={newServiceTitle} onChange={(e) => setNewServiceTitle(e.target.value)} placeholder="Service Title" className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white" />
                <textarea value={newServiceDesc} onChange={(e) => setNewServiceDesc(e.target.value)} placeholder="Short description for the card..." className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white resize-none" rows="2"></textarea>
                <div className="flex gap-2">
                  <select value={newServiceIcon} onChange={(e) => setNewServiceIcon(e.target.value)} className="flex-grow px-4 py-2 rounded-lg border border-gray-200 bg-white">
                    <option value="Code2">Web Icon</option>
                    <option value="Gauge">Speed/SEO Icon</option>
                    <option value="MessageSquare">Chatbot Icon</option>
                    <option value="Fingerprint">Identity Icon</option>
                    <option value="Bot">AI/Bot Icon</option>
                    <option value="LayoutTemplate">Layout Icon</option>
                  </select>
                  <button onClick={addService} className="px-6 py-2 bg-[#FF6A00] text-white font-bold rounded-lg flex items-center gap-2"><Plus className="w-4 h-4"/> Add</button>
                </div>
              </div>

              <div className="space-y-3">
                {services.map((service) => (
                  <div key={service.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white rounded-lg border border-gray-100 shadow-sm gap-4">
                    <div>
                      <span className="font-bold text-gray-900 block">{service.title}</span>
                      <span className="text-sm text-gray-500 line-clamp-1">{service.desc}</span>
                    </div>
                    <button onClick={() => deleteService(service.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors bg-gray-50 rounded-lg"><Trash2 className="w-5 h-5" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'carousel' && (
            <div className="space-y-6">
              <div className="bg-white/60 backdrop-blur-md border border-white/80 p-8 rounded-2xl shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Upload New Carousel Item</h3>
                <input type="file" accept="image/*" ref={carouselInputRef} onChange={(e) => handleImageUpload(e, setUploadedCarouselBase64)} className="hidden" />
                
                <div onClick={() => carouselInputRef.current.click()} className="border-2 border-dashed border-[#FF6A00]/50 rounded-xl p-8 flex flex-col items-center justify-center text-gray-500 bg-orange-50/50 cursor-pointer hover:bg-orange-50 transition-colors mb-6">
                  {uploadedCarouselBase64 ? <img src={uploadedCarouselBase64} alt="Preview" className="h-32 object-contain rounded-lg mb-3 shadow-md" /> : <UploadCloud className="w-12 h-12 mb-3 text-[#FF6A00]" />}
                  <p className="font-semibold text-gray-800">{uploadedCarouselBase64 ? "Click to change image" : "Click here to select an image from your device"}</p>
                  <p className="text-xs mt-1 text-gray-500">JPG, PNG, GIF (Max 1.5MB)</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <input type="text" value={newCarouselTitle} onChange={(e) => setNewCarouselTitle(e.target.value)} placeholder="Carousel Title" className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/80" />
                  <input type="text" value={newCarouselDesc} onChange={(e) => setNewCarouselDesc(e.target.value)} placeholder="Short Description" className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/80" />
                </div>
                
                <div className="flex justify-end">
                  <button onClick={addCarouselItem} className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold shadow-md hover:bg-[#FF6A00] transition-colors">Save to Carousel</button>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-md border border-white/80 p-8 rounded-2xl shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Manage Existing Carousel</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {carousel.map((item) => (
                    <div key={item.id} className="flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden relative group">
                      <img src={item.image} alt={item.title} className="w-full h-32 object-cover" />
                      <div className="p-4">
                        <h4 className="font-bold text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                      <button onClick={() => deleteCarouselItem(item.id)} className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4"/></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="space-y-6">
              <div className="bg-white/60 backdrop-blur-md border border-white/80 p-8 rounded-2xl shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Homepage Portrait Image</h3>
                <p className="text-gray-600 text-sm mb-6">Update the main picture of yourself displayed on the Home screen.</p>
                <input type="file" accept="image/*" ref={portraitInputRef} onChange={(e) => handleImageUpload(e, setPortraitImg)} className="hidden" />
                <div className="flex items-center gap-6">
                  {portraitImg && <img src={portraitImg} alt="Current Portrait" className="w-24 h-24 object-cover rounded-2xl shadow-md border-2 border-white" />}
                  <button onClick={() => portraitInputRef.current.click()} className="px-6 py-3 bg-white border border-gray-200 text-gray-800 rounded-xl font-bold shadow-sm hover:border-[#FF6A00] transition-colors">Upload New Portrait</button>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-md border border-white/80 p-8 rounded-2xl shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Global Background Image</h3>
                <p className="text-gray-600 text-sm mb-6">Change the master background pattern/image for the entire website.</p>
                <input type="file" accept="image/*" ref={bgInputRef} onChange={(e) => handleImageUpload(e, setBgImg)} className="hidden" />
                <div className="flex flex-wrap items-center gap-4">
                  {bgImg && <img src={bgImg} alt="Current BG" className="w-32 h-20 object-cover rounded-xl shadow-md border-2 border-white" />}
                  <button onClick={() => bgInputRef.current.click()} className="px-6 py-3 bg-white border border-gray-200 text-gray-800 rounded-xl font-bold shadow-sm hover:border-[#FF6A00] transition-colors">Upload New Background</button>
                  {bgImg && (
                    <button onClick={() => { setBgImg(''); localStorage.removeItem('vi_bg_image'); }} className="px-4 py-3 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-colors">Reset Default</button>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}