'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [hoverType, setHoverType] = useState<'default' | 'project' | 'play'>('default');

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.group-play')) {
        setHoverType('play');
        gsap.to(cursor, {
          scale: 6,
          backgroundColor: '#FFFFFF', 
          mixBlendMode: 'difference',
          duration: 0.3,
        });
      } else if (target.closest('.group')) {
        setHoverType('project');
        gsap.to(cursor, {
          scale: 4,
          backgroundColor: '#FFFFFF',
          mixBlendMode: 'difference',
          duration: 0.3,
        });
      } else {
        setHoverType('default');
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: '#FFFFFF',
          mixBlendMode: 'difference',
          duration: 0.3,
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-colors overflow-hidden mix-blend-difference"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <span ref={textRef} className={`text-[5px] font-bold text-black tracking-widest transition-opacity duration-200 ${hoverType === 'play' ? 'opacity-100' : 'opacity-0'}`}>
        PLAY
      </span>
    </div>
  );
}
