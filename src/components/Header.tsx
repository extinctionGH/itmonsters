import React from 'react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center p-4 md:p-6 bg-transparent text-white mix-blend-difference pointer-events-none transition-opacity duration-300">
      <div className="flex items-center gap-2 pointer-events-auto">
        <span className="font-bold text-xl tracking-tighter" style={{ fontFamily: 'cursive' }}>itmonsters</span>
      </div>
      <nav className="flex gap-6 font-bold text-xs tracking-widest uppercase pointer-events-auto">
        <a href="#work" className="hover:text-im-yellow transition-colors">Work</a>
        <a href="#services" className="hover:text-im-yellow transition-colors">Services</a>
      </nav>
    </header>
  );
}