'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero3D from './Hero3D';

gsap.registerPlugin(ScrollTrigger);

const PORTFOLIO_ITEMS = [
  { title: 'Kalasig-lasigan Sumisip', desc: 'Event branding merging Bauhaus structure with Yakan Tennun.', tags: ['Branding', 'Identity', 'Arts & Culture'], col: 'md:col-span-8' },
  { title: 'HAPIsabela ZPRAA', desc: 'Colorful and playful event branding for regional athletics.', tags: ['Branding', 'Apparel', 'Sports'], col: 'md:col-span-4' },
  { title: 'Solaz Fiesta de Musica', desc: 'Celebrating original Chavacano music with vibrant motion design.', tags: ['3D', 'Motion Graphics', 'Events'], col: 'md:col-span-6' },
  { title: 'Gretchen Ho Collab', desc: 'Custom apparel design for broadcast personalities.', tags: ['Apparel Design', 'Fashion'], col: 'md:col-span-6' },
  { title: 'I saw.Design', desc: 'Creative partnership and visual identity execution.', tags: ['Web Design', 'UI-UX', 'Technology'], col: 'md:col-span-4' },
  { title: 'ITMonsters Showreel', desc: 'A chaotic, high-energy compilation of our best film and 3D work.', tags: ['Film', '3D Visualization'], col: 'md:col-span-8' }
];

const DISCIPLINES = ['Everything', 'Branding', '3D', 'Motion Graphics', 'Web Design', 'Apparel Design', 'Film'];

export default function Scrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textAct1Ref = useRef<HTMLDivElement>(null);
  const textAct2Ref = useRef<HTMLDivElement>(null);
  const flexAct2Ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const hero3DRef = useRef<HTMLDivElement>(null);
  const filterTextRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  
  const [activeDiscipline, setActiveDiscipline] = useState('Everything');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showFloatingFilter, setShowFloatingFilter] = useState(false);
  const [showModel, setShowModel] = useState(true);
  const [visibleIndexItems, setVisibleIndexItems] = useState(8);

  // Filter logic
  const filteredProjects = activeDiscipline === 'Everything' 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(p => p.tags.some(tag => tag.includes(activeDiscipline)));

  const indexProjects = filteredProjects.slice(6);
  const hasMoreIndexItems = visibleIndexItems < indexProjects.length;

  // Scroll listener for floating dock and model optimization
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const totalScroll = document.documentElement.scrollHeight - windowHeight;
      const progress = scrollY / totalScroll;

      if (filterTextRef.current) {
        const rect = filterTextRef.current.getBoundingClientRect();
        setShowFloatingFilter(rect.bottom < 100);
      }

      // Optimization: Unload model when deep into the grid (progress > 0.7)
      // and reload when scrolling back up.
      if (progress > 0.7 && showModel) {
        setShowModel(false);
      } else if (progress <= 0.7 && !showModel) {
        setShowModel(true);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [showModel]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main Narrative Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%', 
          scrub: true,
          onUpdate: (self) => {
            scrollProgress.current = self.progress;
          },
        }
      });

      // Act 1 -> Act 2 (Progress 0 to 0.15)
      tl.to(textAct1Ref.current, { opacity: 0, y: -50, duration: 0.15 }, 0)
        .to(bgRef.current, { backgroundColor: '#C03B62', duration: 0.15 }, 0)
        .to([textAct2Ref.current, flexAct2Ref.current], { opacity: 1, x: 0, duration: 0.15 }, 0.15)
        
      // Act 2 Pause (Progress 0.40 to 0.60)
      
      // Act 3 Fade: Fade out Act 2 and the Eye Model together to ensure a polished transition
        .to([textAct2Ref.current, flexAct2Ref.current], { opacity: 0, x: -50, duration: 0.20 }, 0.60)
        .to(hero3DRef.current, { opacity: 0, duration: 0.20 }, 0.60);

      // Grid border-radius animation
      gsap.to(gridRef.current, {
        borderTopLeftRadius: '0px',
        borderTopRightRadius: '0px',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 100px',
          end: 'top top',
          scrub: true,
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleFilterClick = (d: string) => {
    setActiveDiscipline(d);
    setIsFilterOpen(false);
    // Smooth scroll back to the filter text if they filter from way down
    if (showFloatingFilter && filterTextRef.current) {
      const topPos = filterTextRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: topPos - 120, behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full bg-[#C03B62]">
      
      {/* Sticky Scene */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        {/* Background Layer */}
        <div ref={bgRef} className="absolute inset-0 w-full h-full bg-[#FFFFFF] z-0"></div>

        {/* 3D Hero - Wrapped in ref for GSAP fade and conditional for performance */}
        <div ref={hero3DRef} className="absolute inset-0 z-10 transition-opacity duration-300">
          {showModel && <Hero3D scrollProgress={scrollProgress} />}
        </div>
        
        {/* Act 1 Text: The Chaos */}
        <div ref={textAct1Ref} className="absolute inset-0 flex flex-col justify-center items-center text-center z-20 pointer-events-none px-4">
          <h1 className="text-[15vw] md:text-[12vw] font-black leading-[0.8] text-im-black tracking-tighter uppercase">
            Creativity<br />
            <span className="font-serif font-light italic text-im-pink tracking-normal">Born From</span><br />
            <span className="text-transparent" style={{ WebkitTextStroke: '4px #000' }}>Chaos.</span>
          </h1>
          <p className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs md:text-sm font-bold tracking-[0.4em] uppercase text-im-black/60">
            Zamboanga City // Philippines
          </p>
        </div>

        {/* Act 2 Text: The Structure */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-12 z-20 pointer-events-none max-w-5xl w-full">
          <div ref={textAct2Ref} className="opacity-0 -translate-x-10 mix-blend-difference">
            <h2 className="text-5xl md:text-[7rem] lg:text-[9rem] font-black leading-[0.85] uppercase tracking-tighter text-im-yellow">
              We Engineer<br />
              <span className="italic">Visual Order.</span>
            </h2>
            <p className="mt-8 text-lg md:text-3xl font-medium leading-snug max-w-3xl text-white">
              ITMonsters is a creative studio operating at the intersection of brand identity, immersive 3D, and digital platforms. We transform chaotic ideas into highly structured, premium digital realities.
            </p>
          </div>
          <div ref={flexAct2Ref} className="opacity-0 -translate-x-10 mt-10 flex flex-wrap gap-4 text-xs md:text-sm font-bold text-im-yellow uppercase tracking-[0.2em]">
            <span>Branding</span> <span>{'//'}</span>
            <span>Motion</span> <span>{'//'}</span>
            <span>3D Design</span> <span>{'//'}</span>
            <span>Web Dev</span> <span>{'//'}</span>
            <span>Film</span>
          </div>
        </div>
      </div>

      {/* Spacer to define when the grid slides up */}
      <div className="w-full h-[300vh] pointer-events-none"></div>

      {/* Act 3 Grid - Added solid Deep Purple background to prevent model bleed-through */}
      <div ref={gridRef} className="relative w-full z-30 pt-[100vh] px-4 md:px-10 min-h-screen bg-[#541D40]">
        
        {/* Pentagram-style Interactive Filter Overlay - Massive Brutalist Type (Single Line) */}
        <div ref={filterTextRef} className="max-w-[1600px] mx-auto pb-32 flex flex-row flex-wrap items-center justify-start text-[6vw] md:text-[4.5vw] font-black tracking-tighter text-white uppercase relative z-[60] leading-none">
          <span className="opacity-30 whitespace-nowrap">We produce&nbsp;</span>
          
          <div 
            className="relative cursor-pointer group inline-block z-[70]"
            onMouseEnter={() => setIsFilterOpen(true)}
            onMouseLeave={() => setIsFilterOpen(false)}
          >
            <span className="text-im-yellow flex items-center border-b-[0.3vw] border-im-yellow pb-1 hover:text-im-green hover:border-im-green transition-colors duration-300">
              {activeDiscipline === 'Everything' ? 'Everything' : activeDiscipline} 
              <svg className={`w-[4vw] h-[4vw] md:w-[2vw] md:h-[2vw] ml-4 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
            
            {/* Mega Menu Overlay - Added pt-4 bridge to prevent hover loss */}
            <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 transform origin-top z-[100] ${isFilterOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-95 invisible pointer-events-none'}`}>
              <div className="bg-im-white text-im-black rounded-[32px] p-8 shadow-2xl border border-white/10">
                <div className="flex flex-wrap gap-3 w-[300px] md:w-[600px] justify-center">
                  {DISCIPLINES.map(d => (
                    <button 
                      key={d} 
                      onClick={() => handleFilterClick(d)} 
                      className={`text-sm font-bold tracking-widest uppercase px-6 py-3 rounded-full transition-all duration-300 ${activeDiscipline === d ? 'bg-im-pink text-im-white shadow-lg scale-105' : 'bg-[#EAEAEA] hover:bg-im-black hover:text-im-white'}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <span className="opacity-80 whitespace-nowrap">&nbsp;for everyone.</span>
        </div>

        {/* Latest Projects Section */}
        <div className="max-w-[1600px] mx-auto mb-12 flex justify-between items-end border-b border-white/20 pb-4">
          <h2 className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-white/40">Latest Projects</h2>
          <span className="font-mono text-[10px] opacity-20">[{filteredProjects.slice(0, 6).length}]</span>
        </div>

        {/* Dynamic Portfolio Grid - Editorial Abstract Matrix (Featured) */}
        <div className="grid grid-cols-1 md:grid-cols-12 max-w-[1600px] mx-auto border-t border-white/10">
          {filteredProjects.slice(0, 6).map((project, i) => (
            <div 
              key={`${project.title}-${i}`} 
              className={`group block relative overflow-hidden animate-in fade-in zoom-in duration-500 ${project.col} border-b border-white/10 ${i % 2 === 0 ? 'md:border-r' : ''} cursor-none transition-all duration-500 hover:bg-white/[0.02]`}
            >
              
              {/* Image / Asset Placeholder with Editorial Padding */}
              <div className="p-4 md:p-8">
                <div className="relative aspect-[16/10] w-full bg-white/5 overflow-hidden border border-white/10 transition-colors duration-500 group-hover:border-im-yellow/30">
                  <div className="absolute inset-0 z-10 opacity-0 group-hover:animate-flash-brand pointer-events-none mix-blend-overlay"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-white/10 font-black tracking-[0.2em] uppercase text-xs md:text-sm">
                    [ Case Study Asset ]
                  </div>
                  
                  {/* Subtle Corner Accents (Engineered look) */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20"></div>
                </div>
              </div>
              
              {/* Editorial Metadata Section */}
              <div className="px-4 md:px-8 pb-8 md:pb-12 relative z-20">
                <h3 className="text-2xl md:text-4xl font-black tracking-tighter text-white uppercase leading-none">{project.title}</h3>
                <p className="mt-4 text-sm md:text-base text-white/60 font-medium leading-relaxed max-w-xl">
                  {project.desc}
                </p>
                
                {/* Sliding Metadata Tags (Revealed on Hover) */}
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                  <div className="overflow-hidden">
                    <div className="flex flex-row flex-wrap gap-2 pt-6">
                      {project.tags.map((tag, tIndex) => (
                        <span key={tIndex} className="text-[10px] font-bold tracking-widest uppercase text-im-yellow border border-im-yellow/30 rounded-full px-3 py-1 hover:bg-im-yellow hover:text-im-black transition-colors duration-300 cursor-pointer">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          ))}
        </div>

        {/* Project Index Section (Compact Matrix) */}
        {filteredProjects.length > 6 && (
          <div className="mt-32">
            <div className="max-w-[1600px] mx-auto mb-12 flex justify-between items-end border-b border-white/20 pb-4">
              <h2 className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-white/40">Project Index</h2>
              <span className="font-mono text-[10px] opacity-20">[{filteredProjects.slice(6).length}]</span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 max-w-[1600px] mx-auto border-t border-white/10">
              {indexProjects.slice(0, visibleIndexItems).map((project, i) => (
                <div 
                  key={`index-${project.title}-${i}`} 
                  className="group block relative overflow-hidden p-6 border-b border-white/10 border-r last:border-r-0 lg:[&:nth-child(4n)]:border-r-0 cursor-none transition-all duration-500 hover:bg-white/[0.02]"
                >
                  <div className="relative aspect-square w-full bg-white/5 mb-6 border border-white/10 group-hover:border-im-yellow/30 transition-colors">
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] text-white/10 font-bold tracking-widest">
                      ARCHIVE
                    </div>
                  </div>
                  <h4 className="text-lg font-black text-white uppercase leading-tight group-hover:text-im-yellow transition-colors">{project.title}</h4>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {project.tags.slice(0, 2).map((tag, tIndex) => (
                      <span key={tIndex} className="text-[8px] font-mono uppercase opacity-40">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Show More Button - Brutalist Style */}
            {hasMoreIndexItems && (
              <div className="flex justify-center mt-16">
                <button 
                  onClick={() => setVisibleIndexItems(prev => prev + 8)}
                  className="px-10 py-4 border border-white/20 text-white font-bold tracking-[0.2em] uppercase text-xs hover:bg-white hover:text-im-black transition-all duration-300 rounded-full cursor-none group-play"
                >
                  Show More <span className="opacity-40 ml-2">[{indexProjects.length - visibleIndexItems}]</span>
                </button>
              </div>
            )}
          </div>
        )}
          
          {filteredProjects.length === 0 && (
             <div className="col-span-12 text-center py-20 text-im-white text-xl font-bold tracking-widest uppercase">
                No projects found for {activeDiscipline}.
             </div>
          )}
        </div>

      {/* Floating Dynamic Island Filter (Bottom Dock) - Glassmorphic Noir Style */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${showFloatingFilter ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'}`}>
        <div className="flex items-center gap-1 bg-white/10 backdrop-blur-xl border border-white/20 p-1.5 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.1)] max-w-[95vw] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {DISCIPLINES.map(d => (
            <button 
              key={`dock-${d}`}
              onClick={() => handleFilterClick(d)}
              className={`text-[10px] md:text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap ${activeDiscipline === d ? 'bg-im-yellow text-im-black shadow-[0_0_20px_rgba(255,195,0,0.4)] scale-105' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
            >
              {d === 'Everything' ? 'All' : d}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
