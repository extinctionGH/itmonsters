import React from 'react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 md:p-6 bg-transparent mix-blend-difference text-im-white pointer-events-none">
      <div className="flex items-center gap-2 pointer-events-auto">
        <span className="font-bold text-xl tracking-tighter" style={{ fontFamily: 'cursive' }}>itmonsters</span>
      </div>
      <nav className="flex gap-6 font-bold text-xs tracking-widest uppercase pointer-events-auto">
        <a href="#work" className="hover:text-im-pink transition-colors">Work</a>
        <a href="#services" className="hover:text-im-pink transition-colors">Services</a>
      </nav>
    </header>
  );
}