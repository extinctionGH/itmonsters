'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero3D from './Hero3D';

gsap.registerPlugin(ScrollTrigger);

export default function Scrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Pin the 3D canvas
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%',
        pin: true,
        pinSpacing: true,
      });

      // Fade out text, slide up grid
      gsap.to(textRef.current, {
        opacity: 0,
        y: -50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: true,
        }
      });

      gsap.fromTo(gridRef.current, 
        { y: '100vh' },
        {
          y: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=200%',
            scrub: true,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
      <Hero3D />
      
      <div ref={textRef} className="absolute bottom-10 left-4 md:left-10 z-10 pointer-events-none">
        <h1 className="text-5xl md:text-8xl font-black leading-none text-im-black">
          CREATIVITY<br />BORN FROM<br />
          <span className="text-im-pink">CHAOS.</span>
        </h1>
      </div>

      <div ref={gridRef} className="absolute top-0 left-0 w-full h-screen bg-im-white z-20 pt-24 px-4 md:px-10 overflow-y-auto rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-7xl mx-auto pb-20">
          {/* Mock Portfolio Items */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="group relative aspect-square bg-im-gray rounded-lg overflow-hidden cursor-pointer border border-transparent hover:border-im-pink transition-colors">
              <div className="absolute inset-0 bg-im-pink translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end z-10 mix-blend-difference text-im-white">
                <h3 className="text-2xl font-bold">Project 0{i}</h3>
                <p className="text-sm">Branding & 3D</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}