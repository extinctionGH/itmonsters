'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Showreel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a cinematic parallax effect for the video
      gsap.to(videoRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[80vh] md:h-screen bg-im-pink overflow-hidden flex items-center justify-center group-play cursor-none">
      
      {/* Cinematic noise/grain overlay */}
      <div className="absolute inset-0 z-10 opacity-20 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\"0 0 200 200\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cfilter id=\\"noiseFilter\\"%3E%3CfeTurbulence type=\\"fractalNoise\\" baseFrequency=\\"0.85\\" numOctaves=\\"3\\" stitchTiles=\\"stitch\\"/%3E%3C/filter%3E%3Crect width=\\"100%25\\" height=\\"100%25\\" filter=\\"url(%23noiseFilter)\\"/%3E%3C/svg%3E")' }}></div>

      {/* Fallback pink background while waiting for video */}
      <div className="absolute inset-0 bg-im-pink z-0"></div>

      {/* The actual video player (using a placeholder free-use liquid video URL) */}
      <video 
        ref={videoRef}
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute w-full h-[120%] object-cover opacity-50 mix-blend-luminosity scale-110 -translate-y-[10%]"
        src="https://cdn.pixabay.com/vimeo/32832049/liquid-20677.mp4?width=1280&hash=6dc88c3be31e3d364ba95fecf5c531d044bc2fde" 
      />

      {/* Central Typography overlaying the video */}
      <div className="relative z-20 text-center pointer-events-none">
        <h2 className="text-6xl md:text-[10rem] font-black text-im-white uppercase tracking-tighter mix-blend-overlay opacity-90 leading-none">
          The<br/>Showreel
        </h2>
      </div>

    </section>
  );
}
