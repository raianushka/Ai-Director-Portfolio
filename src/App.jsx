import React, { useState } from 'react';
import { Navbar } from './components/Navbar.jsx';
import { HeroBentoGrid } from './components/HeroBentoGrid.jsx';
import { AboutSection } from './components/AboutSection.jsx';
import { SliderWrapper } from './components/SliderWrapper.jsx';
import { PhoneMockupCard } from './components/PhoneMockupCard.jsx';
import { LandscapeVideoCard } from './components/LandscapeVideoCard.jsx';
import { ContactFooter } from './components/ContactFooter.jsx';
import { DetailModal } from './components/DetailModal.jsx';
import PerformanceMetricsBanner from './components/PerformanceMetricsBanner.jsx';
import { BehanceSection } from './components/BehanceSection.jsx';
import TrackocityMetricsModal from './components/TrackocityMetricsModal.jsx';

import {
  AI_STORY_REELS,
  AI_BRAND_REELS,
  SIMPLE_BRAND_VIDEOS,
  TRAVEL_VLOGS,
  SMALL_ANIMATIONS
} from './data/portfolioData.js';

export default function App() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isTrackocityModalOpen, setIsTrackocityModalOpen] = useState(false);


  const handleOpenContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen mesh-bg text-[#241A15] relative overflow-x-hidden selection:bg-[#C86D51]/25 selection:text-[#84361E]">
      
      {/* Top Fixed Navbar */}
      <Navbar onOpenContact={handleOpenContact} />

      <main>
        {/* 1. HERO BENTO GRID */}
        <HeroBentoGrid 
          onOpenModal={(media) => setSelectedMedia(media)} 
          onOpenContact={handleOpenContact} 
        />

        {/* 2. ABOUT SECTION */}
        <AboutSection />

        {/* 3. PORTFOLIO SLIDERS */}
        <section id="portfolio" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-[#C86D51]"></div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-[#2A211D] tracking-tight">
              PORTFOLIO SHOWCASE
            </h2>
            <div className="h-px bg-[#DFCEBE]/80 flex-1 ml-4"></div>
          </div>

          {/* CATEGORY 1: AI STORY REELS (9:16) */}
          <SliderWrapper
            id="slider-ai-story-reels"
            title="AI Story Reels"
            subtitle="Speculative fiction, cultural mythos, and solarpunk narratives engineered with generative tools."
            tag="9:16 Smartphones"
            itemCount={AI_STORY_REELS.length}
          >
            {AI_STORY_REELS.map((item) => (
              <PhoneMockupCard
                key={item.id}
                item={item}
                onOpenModal={(media) => setSelectedMedia(media)}
              />
            ))}
          </SliderWrapper>

          {/* CATEGORY 2: AI BRAND REELS (9:16) */}
          <SliderWrapper
            id="slider-ai-brand-reels"
            title="AI Brand Reels"
            subtitle="High-impact commercial teasers blending real products with generative fluid dynamics & lighting."
            tag="9:16 Smartphones"
            itemCount={AI_BRAND_REELS.length}
          >
            {AI_BRAND_REELS.map((item) => (
              <PhoneMockupCard
                key={item.id}
                item={item}
                onOpenModal={(media) => setSelectedMedia(media)}
              />
            ))}
          </SliderWrapper>

          {/* CATEGORY 3: SIMPLE BRAND VIDEOS (9:16) */}
          <SliderWrapper
            id="slider-simple-brand-videos"
            title="Simple Brand Videos & UGC"
            subtitle="Fast-paced, high-retention short-form hooks cut for consumer lifestyle and digital drops."
            tag="9:16 Smartphones"
            itemCount={SIMPLE_BRAND_VIDEOS.length}
          >
            {SIMPLE_BRAND_VIDEOS.map((item) => (
              <PhoneMockupCard
                key={item.id}
                item={item}
                onOpenModal={(media) => setSelectedMedia(media)}
              />
            ))}
          </SliderWrapper>

           {/* META AD PERFORMANCE & METRICS BENCHMARK BANNER */}
          <PerformanceMetricsBanner
            onOpenDetails={() => setIsTrackocityModalOpen(true)}
          />

          {/* CATEGORY 4: TRAVEL VLOGS (16:9) */}
          <SliderWrapper
            id="slider-travel-vlogs"
            title="Travel Vlogs (@Explorersx2)"
            subtitle="Cinematic travel documentaries, atmospheric natural pacing, and cultural field recordings."
            tag="16:9 YouTube Embeds"
            itemCount={TRAVEL_VLOGS.length}
          >
            {TRAVEL_VLOGS.map((item) => (
              <LandscapeVideoCard
                key={item.id}
                item={item}
                onOpenModal={(media) => setSelectedMedia(media)}
              />
            ))}
          </SliderWrapper>

          {/* CATEGORY 5: SMALL ANIMATIONS (16:9) */}
          <SliderWrapper
            id="slider-animations"
            title="Small Animations & Motion Graphics"
            subtitle="Kinetic typography title sequences, HUD graphics, and liquid logo reveals."
            tag="9:16 Smartphones"
            itemCount={SMALL_ANIMATIONS.length}
          >
            {SMALL_ANIMATIONS.map((item) => (
              <PhoneMockupCard
                key={item.id}
                item={item}
                onOpenModal={(media) => setSelectedMedia(media)}
              />
            ))}
          </SliderWrapper>

        </section>

        {/* 4. BEHANCE EDITORIAL & BRANDING PROJECTS */}
        <BehanceSection onOpenModal={(media) => setSelectedMedia(media)} />


        {/* 5. CONTACT & FOOTER */}
        <ContactFooter />

      </main>

      {/* Lightbox Modal */}
      <DetailModal
        media={selectedMedia}
        onClose={() => setSelectedMedia(null)}
      />

        {/* Trackocity Metrics Details Modal */}
      <TrackocityMetricsModal
        isOpen={isTrackocityModalOpen}
        onClose={() => setIsTrackocityModalOpen(false)}
      />

    </div>
  );
}
