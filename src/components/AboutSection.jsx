import React from 'react';
import { 
  Sparkles, 
  Workflow, 
  MapPin, 
  ExternalLink,
  CheckCircle,
  Compass
} from 'lucide-react';

export function AboutSection() {
 
  return (
    <section id="about" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-2.5 h-2.5 rounded-full bg-[#C86D51]"></div>
        <h2 className="font-display font-bold text-xl sm:text-2xl text-[#2A211D] tracking-tight">
          ABOUT ANUSHKA
        </h2>
        <div className="h-px bg-[#DFCEBE]/80 flex-1 ml-4"></div>
      </div>

      {/* 2-Column Blueprint Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        
        {/* ======================================================== */}
        {/* LEFT COLUMN: PHOTO & CREATIVE BADGES (5 cols)           */}
        {/* ======================================================== */}
        <div 
          id="about-photo-block"
          className="lg:col-span-5 glass-panel rounded-3xl p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden group transition-all duration-300 hover:shadow-xl hover:border-white"
        >
          {/* Main Portrait Frame */}
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#E2D5C8] shadow-md">
            <img 
              src="public/Anushka.png"
              alt="Anushka Rai - Video Editor and AI Video Creator"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#2A211D]/80 via-[#2A211D]/10 to-transparent"></div>

            {/* Top Floating Badge */}
            <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/80 backdrop-blur-md text-[#2A211D] border border-white/80 shadow-xs">
                Creative Director &bull; Editor
              </span>
            </div>

            {/* Bottom Glass Card on Photo */}
            <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3.5 rounded-xl bg-white/85 backdrop-blur-md border border-white/80 text-[#2A211D] shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="font-display font-bold text-sm text-[#2A211D]">Anushka Rai</span>
                <span className="text-[10px] font-semibold text-[#C86D51] uppercase tracking-wider">Video Editor & AI Video Creator</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#5A483E]">
                <MapPin className="w-3 h-3 text-[#C86D51]" />
                <span> Global Remote </span>
              </div>
            </div>
          </div>

          {/* Quick Creator Focus Tags */}
          <div className="mt-4 pt-3 border-t border-white/60 flex flex-wrap items-center justify-between gap-2 text-xs text-[#5A483E]">
            <div className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#C86D51]" />
              <span>Co-Creator @ <strong className="text-[#2A211D]">Explorersx2</strong> (Travel Series)</span>
            </div>
            <a 
              href="https://youtube.com/@Explorersx2" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#C86D51] font-semibold hover:underline inline-flex items-center gap-1"
            >
              <span>Watch Series</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: BIO & WORKFLOW METHODOLOGY (7 cols)       */}
        {/* ======================================================== */}
        <div 
          id="about-bio-block"
          className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-white"
        >
          <div className="space-y-6">
            
            {/* Main Greeting & Bio Paragraphs */}
            <div className="space-y-3.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#C86D51]/10 text-[#A84E32] border border-[#C86D51]/20">
                <Sparkles className="w-3.5 h-3.5 text-[#C86D51]" />
                <span>MEET THE EDITOR</span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#2A211D] tracking-tight">
                Hi, I'm Anushka Rai.
              </h3>
              <h4 className="font-display font-bold text-lg text-[#2A211D]">
                Who am I?
              </h4>

              <p className="text-sm sm:text-base text-[#45362E] leading-relaxed">
                A video editor and creator obsessed with pacing, rhythm, and viewer psychology. Since February 2026, I’ve worked full-time as an AI Video Editor, crafting direct-response D2C brand reels, AI avatar ads, travel docs (@Explorersx2), and motion explainers.
              </p>

              <h4 className="font-display font-bold text-lg text-[#2A211D]">
                My Educational Background?
              </h4>

              <p className="text-sm sm:text-base text-[#5A483E] leading-relaxed">
                <strong>B.Tech in Computer Science (8.37 CGPA)</strong> with roots in UI/UX design. Studying code taught me to treat video like a system: engineered for human attention, clear visual hierarchy, and measurable retention.
              </p>
              <h4 className="font-display font-bold text-lg text-[#2A211D]">
                Why CapCut over "industry-standard" suites?
              </h4>
              <p>Let’s be completely transparent: Premiere Pro refuses to cooperate with my current laptop. Instead of waiting for high-end gear, I mastered the tools in front of me. Audiences don't care about the software—they care about the story. Paired with ElevenLabs and HeyGen, my cuts consistently pull 48% hook rates, 10%+ CTRs, and 25x ROAS.</p>

            </div>

          
          </div>

          {/* Bottom Commitment */}
          <div className="mt-6 pt-4 border-t border-white/60 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-[#5A483E]">
              <CheckCircle className="w-4 h-4 text-[#C86D51]" />
              <span>Concept to Final Cut &bull; Pacing & Rhythm &bull; Sound Design</span>
            </div>
            <a
              href="#contact"
              className="text-xs font-semibold text-[#C86D51] hover:underline"
            >
              Discuss Your Project &rarr;
            </a>
          </div>

        </div>

      </div>

    </section>
  );
}
