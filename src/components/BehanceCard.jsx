import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { getBehanceEmbedUrl, getBehanceGalleryUrl } from '../utils/mediaHelper.js';

export function BehanceCard({ item }) {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  const embedUrl = item.embedUrl || getBehanceEmbedUrl(item.projectId || item.projectUrl);
  const galleryUrl = item.projectUrl || getBehanceGalleryUrl(item.projectId || item.embedUrl);

  return (
    <div 
      id={`behance-card-${item.id}`}
      className="shrink-0 w-[315px] sm:w-[365px] md:w-[405px] glass-panel rounded-3xl p-4 sm:p-5 flex flex-col justify-between group transition-all duration-300 hover:shadow-xl hover:border-white relative overflow-hidden"
    >
      {/* Top Header */}
      <div className="h-7 flex items-center justify-between gap-2.5 mb-3 shrink-0">
        <div className="flex items-center gap-2 truncate">
          <span className="w-2 h-2 rounded-full bg-[#C86D51] shrink-0"></span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A84E32] truncate">
            {item.categoryLabel || 'Behance Project'}
          </span>
        </div>

        {/* Behance Brand Link */}
        <a
          href={galleryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/80 hover:bg-white text-[11px] font-bold text-[#0057FF] border border-[#0057FF]/20 shadow-2xs hover:shadow-xs transition-all hover:scale-105 shrink-0"
          title="Open on Behance"
        >
          <span className="font-extrabold tracking-tight">Bē</span>
          <span className="text-[#2A211D] font-medium hidden sm:inline">Behance</span>
          <ExternalLink className="w-3 h-3 text-[#7A675B]" />
        </a>
      </div>

      {/* Embedded Behance Interactive Frame */}
      <div className="relative w-full h-[316px] rounded-2xl overflow-hidden bg-[#241A15] shadow-inner border border-white/60 shrink-0">
        
        {/* Loading placeholder skeleton */}
        {!isIframeLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#2A211D] text-white/70 space-y-2.5 animate-pulse z-0">
            <div className="w-9 h-9 rounded-xl bg-[#0057FF]/30 flex items-center justify-center text-white font-bold text-sm">
              Bē
            </div>
            <p className="text-xs font-medium text-white/80">Loading Behance Showcase...</p>
          </div>
        )}

        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={item.title}
            height="316"
            width="100%"
            scrolling="no"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="clipboard-write"
            onLoad={() => setIsIframeLoaded(true)}
            className="w-full h-[316px] border-0 rounded-2xl relative z-10 overflow-hidden block"
            style={{ overflow: 'hidden' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-xs">
            Behance project link not configured
          </div>
        )}
      </div>

      {/* Project Details */}
      <div className="mt-3.5 flex-1 flex flex-col justify-between">
        <div>
          <div className="min-h-[3.5rem] flex flex-col justify-start">
            <h3 className="font-display font-bold text-base text-[#2A211D] leading-snug group-hover:text-[#C86D51] transition-colors line-clamp-2">
              {item.title}
            </h3>
            {item.subtitle && (
              <p className="text-xs text-[#C86D51] font-medium line-clamp-1 mt-0.5">
                {item.subtitle}
              </p>
            )}
          </div>
          
          <p className="text-xs text-[#5A483E] leading-relaxed line-clamp-2 mt-1 mb-2.5">
            {item.description}
          </p>
        </div>

        {/* Tools Used Section */}
        {item.toolsUsed && item.toolsUsed.length > 0 && (
          <div className="pt-2 border-t border-[#DFCEBE]/60 mb-2.5">
            <span className="text-[10px] font-semibold text-[#8C7667] uppercase tracking-wider block mb-1">
              Tools Architecture
            </span>
            <div className="flex flex-wrap gap-1.5">
              {item.toolsUsed.map((tool) => (
                <span
                  key={tool}
                  className="px-2 py-0.5 rounded-lg bg-white/70 border border-white/90 text-[10px] sm:text-[11px] font-medium text-[#45362E] shadow-2xs"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="mt-auto pt-2.5 border-t border-[#DFCEBE]/60 flex items-center">
          <a
            href={galleryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-[#C86D51] to-[#A84E32] hover:from-[#B85D41] hover:to-[#964026] text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all duration-200"
          >
            <span>View Full Case Study</span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          </a>
        </div>

      </div>
    </div>
  );
}
