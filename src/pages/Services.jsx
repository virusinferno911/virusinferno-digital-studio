import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Gauge,
  Fingerprint,
  LayoutTemplate,
  Code2,
  MessageSquare,
  Mic,
  Bot,
} from 'lucide-react';

const ICON_MAP = { Gauge, Fingerprint, LayoutTemplate, Code2, MessageSquare, Mic, Bot };

export function Services() {
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('vi_services');
    if (saved) {
      setServicesData(JSON.parse(saved));
    } else {
      setServicesData([
        { id: 1, title: 'SEO & Speed Optimization', desc: 'Technical SEO and performance tuning that gets you found.', icon: 'Gauge' },
        { id: 2, title: 'Premium Landing Pages', desc: 'Conversion-focused landing pages, from static to dynamic.', icon: 'LayoutTemplate' },
        { id: 3, title: 'WhatsApp Chatbots', desc: 'Automated WhatsApp flows with seamless human handoff.', icon: 'MessageSquare' }
      ]);
    }
  }, []);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
      <div className="relative max-w-6xl mx-auto">
        
        <div className="text-center mb-14">
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-gray-600 font-medium max-w-2xl mx-auto text-lg">
            Full-stack digital capability, from search visibility to AI-driven automation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => {
            const Icon = ICON_MAP[service.icon] || Code2;
            return (
              <div
                key={service.id}
                className="group relative p-8 rounded-[2rem] border border-gray-200 bg-white/80 backdrop-blur-md shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#E8291C] to-[#FF6A00] shrink-0 shadow-md">
                    <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-[#FF6A00] shrink-0" />
                </div>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-3 leading-snug">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm font-medium leading-relaxed">
                  {service.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}