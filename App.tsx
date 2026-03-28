
import React, { useState, useEffect } from 'react';
import WebGLCanvas from './components/WebGLCanvas';
import CustomCursor from './components/CustomCursor';
import { Theme, SOCIAL_LINKS, PROJECTS, ACHIEVEMENTS, PHILOSOPHY } from './types';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [hoveredOrb, setHoveredOrb] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    document.body.className = theme;
    let ticking = false;
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 200); // Longer timeout for better performance
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const winScroll = window.scrollY;
          const height = document.documentElement.scrollHeight - window.innerHeight;
          const scrolled = winScroll / height;
          setScrollProgress(scrolled);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Use passive scroll with throttling
    let lastScrollTime = 0;
    const throttledScroll = (e: Event) => {
      const now = Date.now();
      if (now - lastScrollTime >= 16) { // ~60fps
        lastScrollTime = now;
        handleScroll();
      }
    };
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(scrollTimeout);
    };
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <div className="relative w-full">
      {/* CustomCursor disabled - causing lag */}
      <WebGLCanvas theme={theme} onOrbHover={setHoveredOrb} scrollProgress={scrollProgress} isScrolling={isScrolling} />

      {/* Floating UI Elements - Clickable Social Links - Hidden on mobile */}
      <div className="hidden md:flex fixed left-4 lg:left-8 top-1/2 -translate-y-1/2 z-50 flex-col gap-3 lg:gap-5">
        {SOCIAL_LINKS.map((link) => {
          const activeColor = theme === 'dark' ? link.darkColor : link.lightColor;
          return (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 glass rounded-xl lg:rounded-2xl border border-white/5 transition-all duration-500 shadow-2xl hover:scale-110 cursor-pointer"
            >
              <div className="text-lg lg:text-xl" style={{ color: activeColor }}>
                <i className={link.icon}></i>
              </div>
              <span className="absolute left-14 lg:left-16 px-3 lg:px-4 py-2 glass text-[9px] lg:text-[10px] uppercase tracking-widest font-bold rounded-xl opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap" 
                    style={{ color: activeColor, background: theme === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)' }}>
                {link.name === 'fa-brands fa-x-twitter' ? 'X' : link.name}
              </span>
            </a>
          );
        })}
      </div>

      <div className="ui-overlay w-full relative z-10">
        
        {/* Navigation */}
        <nav className="fixed top-0 left-0 w-full p-4 md:p-8 px-4 md:px-12 flex justify-between items-center interactive z-50 pointer-events-none">
          <div className="flex items-center gap-2 md:gap-5 ml-0 md:ml-16 pointer-events-auto group">
            <div className={`w-8 h-8 md:w-12 md:h-12 rounded-xl md:rounded-2xl border border-blue-500/30 overflow-hidden transition-all duration-1000 ${scrollProgress > 0.05 ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
              <img src="/profile-main.jpg" alt="Raihan Guntur Ramadhan" className="w-full h-full object-cover" />
            </div>
            <div className="text-sm md:text-2xl font-black tracking-tighter text-blue-500 drop-shadow-lg uppercase">RAIHAN GUNTUR</div>
          </div>
          <button onClick={toggleTheme} className="pointer-events-auto w-12 md:w-16 h-6 md:h-8 glass rounded-full flex items-center p-1 md:p-1.5 border border-white/10 transition-all active:scale-90">
            <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full transition-all duration-700 shadow-xl flex items-center justify-center text-[8px] md:text-[10px] ${theme === 'light' ? 'translate-x-6 md:translate-x-8 bg-blue-600 text-white' : 'translate-x-0 bg-white text-black'}`}>
              <i className={theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'}></i>
            </div>
          </button>
        </nav>

        {/* 1. Hero - Instant Impact */}
        <section className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 pt-20 md:pt-8 text-center">
          <div className={`transition-all duration-1000 ease-out transform ${scrollProgress < 0.2 ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 blur-2xl'}`}>
            <div className="relative mb-8 md:mb-14 inline-block">
              <div className="absolute inset-0 bg-blue-500/20 blur-[80px] md:blur-[120px] rounded-full scale-150 animate-pulse" />
              <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-[24px] md:rounded-[36px] border-2 md:border-4 border-white/10 p-1 md:p-2 overflow-hidden glass shadow-[0_0_60px_rgba(59,130,246,0.2)] md:shadow-[0_0_100px_rgba(59,130,246,0.2)] transition-all duration-700 ease-out bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                <img 
                  src="/profile-main.jpg"
                  alt="Raihan Guntur Ramadhan" 
                  className="w-full h-full object-cover object-center rounded-[18px] md:rounded-[28px]"
                />
              </div>
            </div>
            <h1 className="text-3xl md:text-6xl lg:text-8xl xl:text-[10rem] font-black tracking-tighter leading-[0.9] md:leading-[0.85] mb-4 md:mb-8 text-white px-2 md:px-4">
              Raihan <br /> <span className="text-blue-500 italic">Guntur Ramadhan</span>
            </h1>
            <p className="text-base md:text-xl lg:text-3xl text-white/40 font-light max-w-xs md:max-w-2xl mx-auto tracking-wide px-4">
              Software Engineer & Creative Developer
            </p>
          </div>
        </section>

        {/* 2. Identity - Direct Appearance */}
        <section className="min-h-screen py-16 md:py-32 px-4 md:px-12 lg:px-32 flex flex-col items-center justify-center pointer-events-none">
          <div className="max-w-6xl w-full pointer-events-auto">
             <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center transition-all duration-1000 ease-out transform ${scrollProgress > 0.1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                <div className="space-y-6 md:space-y-12 text-center lg:text-left">
                   <div className="text-blue-500 font-black uppercase tracking-[0.4em] md:tracking-[0.8em] text-[10px] md:text-[12px]">The Developer</div>
                   <h2 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-none text-white">Who is <br /><span className="text-blue-500 italic">RAIHAN?</span></h2>
                   <div className="space-y-4 md:space-y-8 text-sm md:text-lg lg:text-2xl text-white/50 font-light leading-relaxed">
                      <p>
                        I am <span className="text-white font-bold">Raihan Guntur Ramadhan</span>. I build modern applications and creative digital solutions. Technology is my passion, and innovation is my drive.
                      </p>
                      <p>
                        Showcasing a diverse collection of projects from <span className="text-blue-500 italic font-medium underline underline-offset-4 md:underline-offset-8 decoration-blue-500/30">Web Development, UI/UX Design, and Software Engineering.</span>
                      </p>
                   </div>
                </div>
                <div className="flex justify-center lg:justify-end order-first lg:order-last">
                   <div className="relative w-56 h-72 md:w-72 md:h-96 lg:w-[450px] lg:h-[600px] glass rounded-[50px] md:rounded-[90px] border border-white/10 p-1 md:p-2 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-1000 overflow-hidden bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                      <img 
                        src="/profile-side.jpg"
                        alt="Raihan Guntur Ramadhan" 
                        className="w-full h-full object-cover rounded-[42px] md:rounded-[82px]"
                      />
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* 3. Achievements - Fast Reactivity */}
        <section className="min-h-screen py-16 md:py-32 px-4 md:px-12 lg:px-32 flex flex-col items-center justify-center pointer-events-none">
          <div className="max-w-7xl w-full pointer-events-auto">
             <div className={`text-center mb-12 md:mb-32 transition-all duration-1000 ease-out transform ${scrollProgress > 0.25 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <div className="text-blue-500 font-black uppercase tracking-[0.4em] md:tracking-[0.8em] text-[10px] md:text-[12px] mb-4 md:mb-6">Track Record</div>
                <h2 className="text-4xl md:text-7xl lg:text-[11rem] font-black tracking-tighter mb-4 md:mb-8 italic text-white">Skills <span className="text-blue-500 not-italic">& Stats</span>.</h2>
                <div className="h-1 md:h-2 w-24 md:w-48 bg-blue-500/30 mx-auto rounded-full blur-[1px]"></div>
             </div>
             
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-12">
                {ACHIEVEMENTS.map((item, i) => (
                  <div 
                    key={i} 
                    className={`glass p-6 md:p-14 rounded-[30px] md:rounded-[80px] border border-white/5 flex flex-col items-center text-center group transition-all duration-700 ease-out transform hover:scale-105 ${scrollProgress > 0.28 + (i * 0.03) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
                  >
                     <div className="w-14 h-14 md:w-24 md:h-24 rounded-[20px] md:rounded-[40px] bg-blue-500/10 flex items-center justify-center mb-4 md:mb-10 group-hover:bg-blue-500 group-hover:rotate-12 transition-all duration-500">
                        <i className={`fa-solid ${item.icon} text-xl md:text-4xl text-blue-500 group-hover:text-white`}></i>
                     </div>
                     <div className="text-3xl md:text-6xl font-black tracking-tighter mb-2 md:mb-4 text-white group-hover:text-blue-500 transition-colors">{item.metric}</div>
                     <div className="text-[8px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.6em] text-blue-500/50 mb-4 md:mb-8">{item.label}</div>
                     <p className="text-xs md:text-base opacity-40 font-light leading-relaxed group-hover:opacity-100 transition-opacity hidden md:block">{item.detail}</p>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* 3.1 Projects Showcase */}
        <section className="min-h-screen py-16 md:py-32 px-4 md:px-12 lg:px-32 flex flex-col items-center justify-center pointer-events-none">
          <div className="max-w-7xl w-full pointer-events-auto">
             <div className={`text-center mb-12 md:mb-20 transition-all duration-1000 ease-out transform ${scrollProgress > 0.4 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <div className="text-blue-500 font-black uppercase tracking-[0.4em] md:tracking-[0.8em] text-[10px] md:text-[12px] mb-4 md:mb-6">Portfolio</div>
                <h2 className="text-4xl md:text-7xl lg:text-[9rem] font-black tracking-tighter mb-4 md:mb-8 italic text-white">Selected <span className="text-blue-500 not-italic">Works</span>.</h2>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                {PROJECTS.map((project, i) => (
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={i} 
                    className={`glass rounded-[30px] md:rounded-[50px] overflow-hidden border border-white/5 group hover:border-blue-500/50 transition-all duration-700 ease-out transform hover:-translate-y-4 hover:shadow-2xl ${scrollProgress > 0.45 + (i * 0.05) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
                  >
                     <div className="h-48 md:h-72 w-full overflow-hidden relative">
                        <div className="absolute inset-0 bg-blue-500/20 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-overlay"></div>
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out" />
                     </div>
                     <div className="p-6 md:p-10 relative">
                        <div className="absolute top-0 right-10 -translate-y-1/2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg translate-y-4 group-hover:-translate-y-1/2">
                          <i className="fa-solid fa-arrow-right -rotate-45"></i>
                        </div>
                        <div className="text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-500 mb-3">{project.category}</div>
                        <h3 className="text-2xl md:text-4xl font-black tracking-tighter mb-4 text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
                        <p className="text-sm md:text-lg text-white/50 font-light leading-relaxed">{project.description}</p>
                     </div>
                  </a>
                ))}
             </div>
          </div>
        </section>

        {/* 4. Philosophy - Sleek Layout */}
        <section className="min-h-screen py-16 md:py-32 px-4 md:px-12 lg:px-32 flex flex-col items-center justify-center pointer-events-none">
          <div className="max-w-5xl w-full pointer-events-auto">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-12">
                {PHILOSOPHY.map((item, i) => (
                  <div key={i} className={`glass p-6 md:p-12 rounded-[30px] md:rounded-[50px] border border-white/5 hover:border-blue-500/30 transition-all duration-700 ease-out transform hover:scale-105 ${scrollProgress > 0.65 + (i * 0.05) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
                     <h4 className="text-blue-500 font-black uppercase tracking-widest text-[10px] md:text-xs mb-4 md:mb-8">Concept {i+1} // {item.title}</h4>
                     <p className="text-lg md:text-2xl text-white/70 font-light leading-relaxed italic group-hover:text-white transition-colors">"{item.text}"</p>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* 5. Contact - Grand Finale */}
        <section className="min-h-screen flex items-center justify-center p-4 md:p-12 text-center pointer-events-none">
          <div className="max-w-5xl pointer-events-auto">
             <div className={`transition-all duration-1000 ease-out transform ${scrollProgress > 0.82 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
                <h2 className="text-4xl md:text-8xl lg:text-[14rem] font-black tracking-tighter mb-8 md:mb-16 leading-[0.85] md:leading-[0.75] text-white">
                  Let's Build <br /> <span className="italic text-blue-500">Together</span>.
                </h2>
                <div className="flex flex-col gap-4 md:gap-12 justify-center items-center px-4">
                   <a href="https://github.com/raihang7913" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto px-8 md:px-24 py-4 md:py-8 bg-blue-600 text-white rounded-[30px] md:rounded-[50px] font-black uppercase tracking-wider md:tracking-widest text-sm md:text-base shadow-[0_10px_40px_rgba(59,130,246,0.4)] md:shadow-[0_20px_60px_rgba(59,130,246,0.5)] hover:bg-blue-700 transition-all hover:-translate-y-2 active:scale-95">View GitHub</a>
                </div>
                <div className="mt-16 md:mt-32 opacity-10 text-[10px] md:text-[12px] tracking-[0.5em] md:tracking-[2em] uppercase font-black text-white">Raihan Guntur Ramadhan © 2025</div>
             </div>
          </div>
        </section>

      </div>

      {/* Mobile Social Links - Bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 glass border-t border-white/5">
        <div className="flex justify-center gap-6">
          {SOCIAL_LINKS.map((link) => {
            const activeColor = theme === 'dark' ? link.darkColor : link.lightColor;
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 active:scale-90"
              >
                <div className="text-xl" style={{ color: activeColor }}>
                  <i className={link.icon}></i>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Progress Scrollbar - Hidden on mobile */}
      <div className="hidden md:flex fixed right-10 top-1/2 -translate-y-1/2 flex-col gap-10 z-40">
        {[0, 0.2, 0.4, 0.6, 0.8, 1].map((mark, i) => (
          <div 
            key={i} 
            className={`w-1 transition-all duration-500 ease-out rounded-full ${scrollProgress >= mark ? 'bg-blue-500 h-24 shadow-[0_0_40px_rgba(59,130,246,1)]' : 'bg-white/5 h-12'}`} 
          />
        ))}
      </div>

      <style>{`
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        body { 
          overflow-y: auto !important; 
          scrollbar-width: none; 
          background: #050505;
        }
        body::-webkit-scrollbar { display: none; }
        .glass { 
          background: rgba(15, 18, 22, 0.85); 
          backdrop-filter: blur(20px); 
          -webkit-backdrop-filter: blur(20px); 
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .light .glass { 
          background: rgba(255, 255, 255, 0.9); 
          border: 1px solid rgba(0, 0, 0, 0.05); 
        }
        .light { background: #f5f5f5; }
        .light body { background: #f5f5f5; }
        .light .text-white { color: #111 !important; }
        .light .text-white\/40 { color: rgba(17, 17, 17, 0.4) !important; }
        .light .text-white\/50 { color: rgba(17, 17, 17, 0.5) !important; }
        .light .text-white\/70 { color: rgba(17, 17, 17, 0.7) !important; }
        .light .border-white\/5 { border-color: rgba(0, 0, 0, 0.1) !important; }
        .light .border-white\/10 { border-color: rgba(0, 0, 0, 0.15) !important; }
        .light .bg-white\/5 { background-color: rgba(0, 0, 0, 0.05) !important; }
        .light .opacity-40 { color: rgba(17, 17, 17, 0.4) !important; }
        .light .opacity-10 { color: rgba(17, 17, 17, 0.1) !important; }
        .light h1, .light h2, .light h3, .light h4, .light p, .light div, .light span { color: inherit; }
        .light .group-hover\\:text-white:hover { color: #111 !important; }
        .ui-overlay > section {
          contain: layout style paint;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        .interactive {
          cursor: pointer;
        }
        a, button {
          cursor: pointer;
        }
        * { transition: background-color 0.8s ease, border-color 0.8s ease; }
      `}</style>
    </div>
  );
};

export default App;
