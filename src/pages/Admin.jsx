import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, LayoutDashboard, ImagePlus, LogOut, UploadCloud, Trash2, Settings, Plus, Edit2, X, Check, Loader2 } from 'lucide-react';
import logo from '../assets/logo.png';
import { supabase } from '../lib/supabase';

export function Admin({ onNavigate }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isUploading, setIsUploading] = useState(false);
  
  const carouselInputRef = useRef(null);
  const portraitInputRef = useRef(null);
  const bgInputRef = useRef(null);

  // State populated from Supabase
  const [services, setServices] = useState([]);
  const [carousel, setCarousel] = useState([]);

  // Local storage for global site media (kept simple)
  const [portraitImg, setPortraitImg] = useState(() => localStorage.getItem('vi_portrait') || '');
  const [bgImg, setBgImg] = useState(() => localStorage.getItem('vi_bg_image') || '');

  // Form states
  const [newServiceTitle, setNewServiceTitle] = useState('');
  const [newServiceDesc, setNewServiceDesc] = useState('');
  const [newServiceIcon, setNewServiceIcon] = useState('Code2');
  
  const [newCarouselTitle, setNewCarouselTitle] = useState('');
  const [newCarouselDesc, setNewCarouselDesc] = useState('');
  
  // Temporary states for holding files before they are pushed to Supabase
  const [selectedCarouselFile, setSelectedCarouselFile] = useState(null);
  const [carouselPreview, setCarouselPreview] = useState('');

  // Editing Carousel Item State
  const [editingCarouselId, setEditingCarouselId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editImage, setEditImage] = useState('');

  // Fetch data from Supabase when logged in
  useEffect(() => {
    if (isLoggedIn) {
      fetchServices();
      fetchCarousel();
    }
  }, [isLoggedIn]);

  const fetchServices = async () => {
    const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: true });
    if (data) setServices(data);
    if (error) console.error("Error fetching services:", error);
  };

  const fetchCarousel = async () => {
    const { data, error } = await supabase.from('carousel_items').select('*').order('created_at', { ascending: true });
    if (data) setCarousel(data);
    if (error) console.error("Error fetching carousel:", error);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'sheymania@gmail.com' && password === 'Datboi@20') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid credentials. Access denied.');
    }
  };

  // Helper to upload files to Supabase Storage Bucket
  const uploadToBucket = async (file, folder) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('website-media')
      .upload(fileName, file, { cacheControl: '3600', upsert: false });

    if (error) {
      alert("Error uploading image: " + error.message);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from('website-media')
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  };

  // ==============================
  // SERVICES (DATABASE)
  // ==============================
  const addService = async () => {
    if (!newServiceTitle || !newServiceDesc) return alert("Please fill both title and description.");
    setIsUploading(true);
    const { error } = await supabase.from('services').insert([
      { title: newServiceTitle, desc: newServiceDesc, icon: newServiceIcon }
    ]);
    setIsUploading(false);
    
    if (error) return alert("Error adding service: " + error.message);
    
    setNewServiceTitle(''); setNewServiceDesc('');
    fetchServices(); // Refresh list
  };

  const deleteService = async (id) => {
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (!error) fetchServices();
  };

  // ==============================
  // CAROUSEL (DATABASE + STORAGE)
  // ==============================
  const handleCarouselSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1500000) return alert("File is too large! Please upload under 1.5MB.");
      setSelectedCarouselFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setCarouselPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const addCarouselItem = async () => {
    if (!newCarouselTitle || !newCarouselDesc || !selectedCarouselFile) return alert("Fill all fields and select an image.");
    
    setIsUploading(true);
    // 1. Upload Image
    const imageUrl = await uploadToBucket(selectedCarouselFile, 'carousel');
    
    // 2. Insert to Database
    if (imageUrl) {
      const { error } = await supabase.from('carousel_items').insert([
        { title: newCarouselTitle, desc: newCarouselDesc, image_url: imageUrl }
      ]);
      if (error) alert("Error saving to database: " + error.message);
    }
    setIsUploading(false);
    
    setNewCarouselTitle(''); setNewCarouselDesc(''); 
    setSelectedCarouselFile(null); setCarouselPreview('');
    fetchCarousel();
  };

  const startEditingCarousel = (item) => {
    setEditingCarouselId(item.id);
    setEditTitle(item.title);
    setEditDesc(item.desc);
    setEditImage(item.image_url);
  };

  const saveEditedCarousel = async (id) => {
    setIsUploading(true);
    const { error } = await supabase.from('carousel_items')
      .update({ title: editTitle, desc: editDesc })
      .eq('id', id);
    setIsUploading(false);
    
    if (!error) {
      setEditingCarouselId(null);
      fetchCarousel();
    }
  };

  const deleteCarouselItem = async (id) => {
    const { error } = await supabase.from('carousel_items').delete().eq('id', id);
    if (!error) fetchCarousel();
  };

  // ==============================
  // SITE MEDIA (STORAGE -> LOCAL)
  // ==============================
  const handleSiteMediaUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 1500000) return alert("File is too large! Please upload under 1.5MB.");
    
    setIsUploading(true);
    const imageUrl = await uploadToBucket(file, type);
    setIsUploading(false);

    if (imageUrl) {
      if (type === 'portrait') {
        setPortraitImg(imageUrl);
        localStorage.setItem('vi_portrait', imageUrl);
      } else {
        setBgImg(imageUrl);
        localStorage.setItem('vi_bg_image', imageUrl);
      }
    }
  };


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
          <p className="text-gray-600 font-medium">Welcome back, Oluwasheyi. Powered by Supabase Cloud.</p>
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
          
          {/* TAB 1: MANAGE SERVICES */}
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
                  <button onClick={addService} disabled={isUploading} className="px-6 py-2 bg-[#FF6A00] text-white font-bold rounded-lg flex items-center gap-2 disabled:opacity-50">
                    {isUploading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Plus className="w-4 h-4"/>} Add
                  </button>
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

          {/* TAB 2: CAROUSEL MANAGMENT */}
          {activeTab === 'carousel' && (
            <div className="space-y-6">
              <div className="bg-white/60 backdrop-blur-md border border-white/80 p-8 rounded-2xl shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Upload New Carousel Item</h3>
                <input type="file" accept="image/*" ref={carouselInputRef} onChange={handleCarouselSelect} className="hidden" />
                
                <div onClick={() => carouselInputRef.current.click()} className="border-2 border-dashed border-[#FF6A00]/50 rounded-xl p-8 flex flex-col items-center justify-center text-gray-500 bg-orange-50/50 cursor-pointer hover:bg-orange-50 transition-colors mb-6">
                  {carouselPreview ? <img src={carouselPreview} alt="Preview" className="h-32 object-contain rounded-lg mb-3 shadow-md" /> : <UploadCloud className="w-12 h-12 mb-3 text-[#FF6A00]" />}
                  <p className="font-semibold text-gray-800">{carouselPreview ? "Click to change image" : "Click here to select an image from your device"}</p>
                  <p className="text-xs mt-1 text-gray-500">JPG, PNG, WebP (Max 1.5MB)</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <input type="text" value={newCarouselTitle} onChange={(e) => setNewCarouselTitle(e.target.value)} placeholder="Carousel Title" className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/80" />
                  <input type="text" value={newCarouselDesc} onChange={(e) => setNewCarouselDesc(e.target.value)} placeholder="Short Description" className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/80" />
                </div>
                
                <div className="flex justify-end">
                  <button onClick={addCarouselItem} disabled={isUploading} className="flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-xl font-bold shadow-md hover:bg-[#FF6A00] transition-colors disabled:opacity-50">
                    {isUploading && <Loader2 className="w-4 h-4 animate-spin"/>} Save to Cloud Carousel
                  </button>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-md border border-white/80 p-8 rounded-2xl shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Manage Existing Carousel ({carousel.length})</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {carousel.map((item) => (
                    <div key={item.id} className="flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden relative">
                      {editingCarouselId === item.id ? (
                        <div className="p-4 space-y-3 bg-orange-50/40">
                          <p className="text-xs font-bold text-[#FF6A00] uppercase">Editing Item</p>
                          <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm font-bold bg-white" placeholder="Title" />
                          <textarea value={editDesc} onChange={(e) => setEditDesc(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-xs bg-white resize-none" rows="2" placeholder="Description"></textarea>
                          <div className="flex justify-end gap-2 pt-2">
                            <button onClick={() => setEditingCarouselId(null)} className="px-3 py-1.5 text-xs font-bold text-gray-600 bg-gray-200 rounded-lg flex items-center gap-1"><X className="w-3.5 h-3.5"/> Cancel</button>
                            <button onClick={() => saveEditedCarousel(item.id)} disabled={isUploading} className="px-3 py-1.5 text-xs font-bold text-white bg-[#FF6A00] rounded-lg flex items-center gap-1">
                              {isUploading ? <Loader2 className="w-3 h-3 animate-spin"/> : <Check className="w-3.5 h-3.5"/>} Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <img src={item.image_url} alt={item.title} className="w-full h-36 object-cover" />
                          <div className="p-4 flex-grow">
                            <h4 className="font-bold text-gray-900 text-base mb-1">{item.title}</h4>
                            <p className="text-xs text-gray-600 font-medium line-clamp-2">{item.desc}</p>
                          </div>
                          <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
                            <button onClick={() => startEditingCarousel(item)} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-bold flex items-center gap-1 hover:border-[#FF6A00] transition-colors"><Edit2 className="w-3.5 h-3.5"/> Edit</button>
                            <button onClick={() => deleteCarouselItem(item.id)} className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-red-100 transition-colors"><Trash2 className="w-3.5 h-3.5"/> Delete</button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SITE MEDIA */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div className="bg-white/60 backdrop-blur-md border border-white/80 p-8 rounded-2xl shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Homepage Portrait Image</h3>
                <p className="text-gray-600 text-sm mb-6">Upload directly to your Supabase Cloud Storage bucket.</p>
                <input type="file" accept="image/*" ref={portraitInputRef} onChange={(e) => handleSiteMediaUpload(e, 'portrait')} className="hidden" />
                <div className="flex items-center gap-6">
                  {portraitImg && <img src={portraitImg} alt="Current Portrait" className="w-24 h-24 object-cover rounded-2xl shadow-md border-2 border-white" />}
                  <button onClick={() => portraitInputRef.current.click()} disabled={isUploading} className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-800 rounded-xl font-bold shadow-sm hover:border-[#FF6A00] transition-colors disabled:opacity-50">
                    {isUploading && <Loader2 className="w-4 h-4 animate-spin"/>} Upload New Portrait
                  </button>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-md border border-white/80 p-8 rounded-2xl shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Global Background Image</h3>
                <p className="text-gray-600 text-sm mb-6">Change the master background pattern/image for the entire website.</p>
                <input type="file" accept="image/*" ref={bgInputRef} onChange={(e) => handleSiteMediaUpload(e, 'background')} className="hidden" />
                <div className="flex flex-wrap items-center gap-4">
                  {bgImg && <img src={bgImg} alt="Current BG" className="w-32 h-20 object-cover rounded-xl shadow-md border-2 border-white" />}
                  <button onClick={() => bgInputRef.current.click()} disabled={isUploading} className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-800 rounded-xl font-bold shadow-sm hover:border-[#FF6A00] transition-colors disabled:opacity-50">
                    {isUploading && <Loader2 className="w-4 h-4 animate-spin"/>} Upload New Background
                  </button>
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