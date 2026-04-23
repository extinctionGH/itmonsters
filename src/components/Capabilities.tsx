'use client';

import React from 'react';

const CAPABILITIES = [
  {
    index: '01',
    title: 'Branding',
    services: [
      'Identity Design',
      'Visual Systems',
      'Brand Strategy',
      'Logo Design',
      'Typography',
      'Tone of Voice'
    ]
  },
  {
    index: '02',
    title: '3D / Motion',
    services: [
      'CGI Visualization',
      'Product Rendering',
      'Motion Graphics',
      'Environment Design',
      'Visual Effects',
      '3D Animation'
    ]
  },
  {
    index: '03',
    title: 'Web / App',
    services: [
      'Next.js Development',
      'UI-UX Design',
      'Immersive WebGL',
      'E-commerce',
      'Interaction Design',
      'App Architecture'
    ]
  },
  {
    index: '04',
    title: 'Film / Art',
    services: [
      'Cinematography',
      'Art Direction',
      'Creative Direction',
      'Film Editing',
      'Post-Production',
      'Visual Storytelling'
    ]
  }
];

export default function Capabilities() {
  return (
    <section className="bg-[#541D40] text-white px-4 md:px-10 py-20 md:py-32 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Massive Brutalist Header */}
        <div className="border-b border-white/20 pb-10 mb-20">
          <h2 className="text-[18vw] font-black leading-[0.75] tracking-tighter uppercase select-none">
            What<br />
            We Do.
          </h2>
        </div>

        {/* 4-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {CAPABILITIES.map((cap) => (
            <div key={cap.index} className="flex flex-col group">
              <span className="font-mono text-xs md:text-sm opacity-40 mb-6 tracking-widest">
                / {cap.index}
              </span>
              
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-8 border-b-2 border-[#39FF14] self-start pb-2">
                {cap.title}
              </h3>
              
              <ul className="flex flex-col gap-3">
                {cap.services.map((service) => (
                  <li 
                    key={service} 
                    className="text-lg md:text-xl font-medium opacity-70 hover:opacity-100 hover:text-[#39FF14] transition-all duration-300 cursor-default"
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Closing Editorial Rule */}
        <div className="mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="font-bold text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-40">
            ITMonsters Production Co. // Zamboanga City
          </div>
          <div className="font-bold text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-40">
            Engineered Visual Order // 2026
          </div>
        </div>

      </div>
    </section>
  );
}
