import React from 'react';
import { BehanceCard } from './BehanceCard.jsx';
import { SliderWrapper } from './SliderWrapper.jsx';
import { BEHANCE_PROJECTS } from '../data/portfolioData.js';
import { ExternalLink, Layers } from 'lucide-react';

export function BehanceSection({ onOpenModal }) {
  return (
    <section id="behance-projects" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Divider & Header */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 flex-1">
          <div className="w-2.5 h-2.5 rounded-full bg-[#C86D51]"></div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-[#2A211D] tracking-tight">
            BEHANCE PROJECTS & CASE STUDIES
          </h2>
          <div className="h-px bg-[#DFCEBE]/80 flex-1 ml-4 hidden sm:block"></div>
        </div>

        {/* Direct Link to Behance Profile */}
        <a
          href="https://www.behance.net"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/80 hover:bg-white text-xs font-semibold text-[#0057FF] border border-[#0057FF]/20 shadow-2xs hover:shadow-xs transition-all hover:-translate-y-0.5 shrink-0"
        >
          <span className="font-black text-sm">Bē</span>
          <span className="text-[#2A211D] hidden sm:inline">Behance Profile</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#7A675B]" />
        </a>
      </div>

      {/* Slider Wrapper matching other portfolio sections */}
      <SliderWrapper
        id="slider-behance-projects"
        title="Editorial Carousels, Identity & Packaging Systems"
        subtitle="Multi-slide news carousels, brand marks, packaging redesigns, and editorial visuals embedded directly from Behance."
        tag="Interactive Behance Embeds"
        itemCount={BEHANCE_PROJECTS.length}
      >
        {BEHANCE_PROJECTS.map((project) => (
          <BehanceCard
            key={project.id}
            item={project}
            onOpenModal={onOpenModal}
          />
        ))}
      </SliderWrapper>

    </section>
  );
}
