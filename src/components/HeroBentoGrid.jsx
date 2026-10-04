import React, { useState, useRef, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Sparkles, 
  Zap, 
  ArrowDown, 
  Cpu, 
  CheckCircle2,
  Workflow,
  Youtube
} from 'lucide-react';
import { TECH_STACK } from '../data/portfolioData.js';

export function HeroBentoGrid({ onOpenModal, onOpenContact }) {
  const [isMuted, setIsMuted] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const iframeRef = useRef(null);

  const showreelData = {
    title: 'Anushka Rai — Showreel 2026',
    subtitle: 'Showreel 2026: Personality, Performance & AI Pipelines',
    categoryLabel: 'Showreel',
    videoUrl: 'https://youtu.be/Iix7CYhyk2M',
    youtubeId: 'Iix7CYhyk2M',
    toolsUsed: ['CapCut'],
    description: 'A punchy, personality-driven showreel crafted entirely within CapCut. Directly takes on the software debate with humor and confidence, blending kinetic paper-cutout motion, high-retention D2C brand reels, travel vlogging, and end-to-end AI brand commercials to prove that pacing, timing, and storytelling beat tool dogma.',
    aspectRatio: '16:9',
  };

  // Attempt unmute on very first user interaction if browser policy initially blocked unmuted autoplay
  useEffect(() => {
    const handleFirstGesture = () => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'unMute', args: '' }),
          '*'
        );
        setIsMuted(false);
      }
    };

    window.addEventListener('pointerdown', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };
  }, []);

  const toggleMute = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      if (isMuted) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'unMute', args: '' }),
          '*'
        );
        setIsMuted(false);
      } else {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'mute', args: '' }),
          '*'
        );
        setIsMuted(true);
      }
    }
  };

  return (
    <section id="hero-bento" className="pt-28 pb-12 sm:pt-32 sm:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
        
        {/* ======================================================== */}
        {/* LARGE BLOCK: AUTO-PLAYING SHOWREEL VIDEO (7 cols)       */}
        {/* ======================================================== */}
        <div 
          id="hero-showreel-block"
          className="lg:col-span-7 glass-panel rounded-3xl p-4 sm:p-5 relative overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:shadow-xl hover:border-white"
        >
          {/* Top Bar Header inside Glass Panel */}
          <div className="flex items-center justify-between gap-3 mb-3 z-10">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#2A211D]/90 text-white backdrop-blur-md border border-white/20">
                <span className="w-2 h-2 rounded-full bg-[#C86D51] animate-ping"></span>
                <span>SHOWREEL 2026</span>
              </span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <button
                id="showreel-sound-toggle"
                onClick={toggleMute}
                className="p-2 rounded-xl bg-white/80 hover:bg-white text-[#2A211D] hover:text-[#C86D51] transition-colors border border-white/80 shadow-xs cursor-pointer"
                title={isMuted ? "Unmute audio" : "Mute audio"}
                aria-label="Toggle mute"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#C86D51]" />}
              </button>
              
              <button
                id="showreel-expand-modal"
                onClick={() => onOpenModal(showreelData)}
                className="p-2 rounded-xl bg-white/80 hover:bg-white text-[#2A211D] hover:text-[#C86D51] transition-colors border border-white/80 shadow-xs cursor-pointer"
                title="Open full view"
                aria-label="Expand showreel"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Video Container with Rounded Mask - Real YouTube Iframe Player */}
         {/* Video Container with Pure White Background & Edge Bleed */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-white border border-[#E8DFD8] shadow-sm flex items-center justify-center">
            <iframe
              ref={iframeRef}
              id="hero-youtube-showreel"
              src="https://www.youtube.com/embed/Iix7CYhyk2M?autoplay=1&mute=0&loop=1&playlist=Iix7CYhyk2M&enablejsapi=1&controls=0&modestbranding=1&rel=0&playsinline=1"
              title="Anushka Rai — Showreel 2026"
              className="w-full h-full border-0 absolute inset-0 scale-[1.03] origin-center"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          {/* Bottom Showreel Workflow Notes */}
          <div className="mt-3.5 pt-3 border-t border-white/60 flex flex-wrap items-center justify-between gap-2 text-xs text-[#7A675B]">
            <div className="flex items-center gap-1.5">
              <Workflow className="w-3.5 h-3.5 text-[#C86D51]" />
              <span>This Video is made in <strong className="text-[#2A211D] font-medium">Capcut</strong> completely</span>
            </div>
            <button
              onClick={() => onOpenModal(showreelData)}
              className="text-[#C86D51] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              Inspect Details &rarr;
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MEDIUM BLOCK: INTRO TEXT & VALUE PROPOSITION (5 cols)   */}
        {/* ======================================================== */}
        <div className="lg:col-span-5 flex flex-col gap-5 lg:gap-6 justify-between">
          
          {/* Main Intro Card */}
          <div 
            id="hero-intro-block"
            className="glass-panel rounded-3xl p-6 sm:p-7 flex-1 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-white"
          >
            {/* Ambient subtle glow decor */}
            <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-[#E28A4E]/15 blur-2xl pointer-events-none"></div>

            <div className="space-y-4 relative z-10">
              {/* Category Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#C86D51]/10 text-[#A84E32] border border-[#C86D51]/20">
                <Sparkles className="w-3.5 h-3.5 text-[#C86D51]" />
                <span>VIDEO EDITOR &bull; AI VIDEO CREATOR</span>
              </div>

              {/* Exact Blueprint Heading */}
              <div className="space-y-1.5">
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-[32px] leading-[1.15] text-[#2A211D] tracking-tight">
                  ANUSHKA RAI
                </h1>
                <p className="font-display font-semibold text-lg sm:text-xl text-[#C86D51] leading-snug">
                  Editing That Holds Attention. Built Fast.
                </p>
              </div>

              {/* Bio Summary */}
              <p className="text-sm text-[#5A483E] leading-relaxed">
                I edit high-retention video content for brands and modern social feeds. 
                By combining agile timeline editing in CapCut with generative AI tools{' '}
                <strong className="text-[#2A211D] font-medium">(HeyGen, ElevenLabs, Magnific, Chatgpt)</strong>, I build scroll-stopping ad reels, founder stories, and explainers engineered to keep viewers watching.
              </p>

              {/* Highlights Chips */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="p-2.5 rounded-xl bg-white/60 border border-white/80 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C86D51] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-[#2A211D]">Efficient Delivery</div>
                    <div className="text-[11px] text-[#7A675B]">Reliable timelines & smooth iterations</div>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/60 border border-white/80 flex items-start gap-2">
                  <Zap className="w-4 h-4 text-[#BE7538] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-[#2A211D]">Retention-First Pacing</div>
                    <div className="text-[11px] text-[#7A675B]">Dynamic hooks & beat-matched sound</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-6 border-t border-white/60 flex flex-wrap items-center gap-3">
              <a
                id="hero-cta-explore"
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#C86D51] to-[#A84E32] hover:from-[#B85D41] hover:to-[#964026] shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Portfolio</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                id="hero-cta-contact"
                onClick={onOpenContact}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium text-[#2A211D] bg-white/70 hover:bg-white border border-white/90 transition-all duration-200 shadow-xs cursor-pointer"
              >
                <span>Direct Inquiry</span>
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* WIDE BLOCK: TECH STACK MARQUEE TICKER (12 cols)         */}
        {/* ======================================================== */}
        <div 
          id="hero-tech-stack-block"
          className="lg:col-span-12 glass-panel rounded-3xl p-5 sm:p-6 overflow-hidden relative transition-all duration-300 hover:shadow-xl hover:border-white"
        >
          {/* Ticker Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#C86D51]/10 text-[#C86D51]">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-sm tracking-wide text-[#2A211D] uppercase">
                Tech Stack & Neural Engine Pipeline
              </span>
            </div>
            <span className="text-[11px] text-[#7A675B] hidden sm:block">
              Hover over any tool to view workflow role &bull; Continuous Live Ticker
            </span>
          </div>

          {/* Marquee Container */}
          <div className="relative w-full overflow-hidden py-1">
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#FAF4EE] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#FAF4EE] to-transparent z-10 pointer-events-none"></div>

            <div className="animate-marquee flex items-center gap-3">
              {[...TECH_STACK, ...TECH_STACK].map((tool, idx) => (
                <button
                  key={`${tool.name}-${idx}`}
                  id={`tech-tool-badge-${tool.name.toLowerCase().replace(/\s+/g, '-')}-${idx}`}
                  onClick={() => setSelectedTool(tool)}
                  onMouseEnter={() => setSelectedTool(tool)}
                  className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/70 hover:bg-white border border-white/90 hover:border-[#C86D51]/40 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-left"
                >
                  <span 
                    className="w-2.5 h-2.5 rounded-full shrink-0 group-hover:scale-125 transition-transform" 
                    style={{ backgroundColor: tool.color || '#C86D51' }}
                  ></span>
                  <div>
                    <span className="font-semibold text-xs text-[#2A211D] block group-hover:text-[#C86D51] transition-colors">
                      {tool.name}
                    </span>
                    <span className="text-[10px] text-[#7A675B] block font-normal">
                      {tool.category}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Tool Spotlight */}
          {selectedTool && (
            <div className="mt-4 p-3.5 rounded-2xl bg-white/80 border border-white backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span 
                  className="w-3 h-3 rounded-full shrink-0" 
                  style={{ backgroundColor: selectedTool.color || '#C86D51' }}
                ></span>
                <span className="font-bold text-xs text-[#2A211D]">{selectedTool.name}</span>
                <span className="text-xs text-[#C86D51] font-medium">[{selectedTool.category}]:</span>
                <span className="text-xs text-[#5A483E]">{selectedTool.role}</span>
              </div>
              <button 
                onClick={() => setSelectedTool(null)}
                className="text-[11px] text-[#7A675B] hover:text-[#2A211D] self-end sm:self-auto underline cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}

        </div>

      </div>

    </section>
  );
}
