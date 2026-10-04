import React, { useState } from 'react';
import { X, Volume2, VolumeX, Sparkles, Workflow, Layers, Check, Youtube, ExternalLink } from 'lucide-react';
import { extractYouTubeId, getYouTubeEmbedUrl } from '../utils/mediaHelper.js';

export function DetailModal({ media, onClose }) {
  const [isMuted, setIsMuted] = useState(false);

  if (!media) return null;

  // Check if media contains a YouTube link or ID
  const youtubeId = media.youtubeId || extractYouTubeId(media.videoUrl);
  const isYouTubeVideo = Boolean(youtubeId);
  const embedUrl = isYouTubeVideo ? getYouTubeEmbedUrl(youtubeId, { autoplay: true, mute: false }) : null;

  return (
    <div 
      id="detail-lightbox-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md transition-all animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] glass-panel rounded-3xl p-5 sm:p-7 overflow-y-auto bg-[#FAF4EE]/95 border border-white shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 pb-3 border-b border-[#DFCEBE]/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C86D51]/15 text-[#A84E32]">
                {media.categoryLabel || 'Portfolio Showcase'}
              </span>
              {media.duration && (
                <span className="text-[11px] font-mono text-[#7A675B]">
                  Duration: {media.duration}
                </span>
              )}
              {isYouTubeVideo && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-100 text-red-700 border border-red-200">
                  <Youtube className="w-3 h-3 text-red-600" />
                  <span>YouTube Stream</span>
                </span>
              )}
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#2A211D]">
              {media.title}
            </h3>
            {media.subtitle && (
              <p className="text-xs sm:text-sm text-[#C86D51] font-medium">
                {media.subtitle}
              </p>
            )}
          </div>

          <button
            id="modal-close-btn"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/80 hover:bg-white text-[#2A211D] border border-white/80 transition-all shadow-xs cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Preview Stage */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-[#1A120E] flex items-center justify-center shadow-inner">
          {isYouTubeVideo ? (
            <div className={`relative w-full ${media.aspectRatio === '9:16' ? 'max-w-[340px] aspect-[9/16] my-2' : 'aspect-video'}`}>
              <iframe
                src={embedUrl}
                title={media.title || 'YouTube Video Player'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full rounded-xl border-0"
              />
            </div>
          ) : media.videoUrl ? (
            <div className={`relative w-full ${media.aspectRatio === '9:16' ? 'max-w-[320px] aspect-[9/16] my-2' : 'aspect-video'}`}>
              <video
                src={media.videoUrl}
                poster={media.posterUrl || media.thumbnailUrl}
                controls
                autoPlay
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover rounded-xl"
              />
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute bottom-4 right-4 z-20 p-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-black/80 transition-all cursor-pointer"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#E28A4E]" />}
              </button>
            </div>
          ) : (
            <div className="relative w-full max-w-lg aspect-[4/5] my-2">
              <img
                src={media.posterUrl || media.thumbnailUrl}
                alt={media.title}
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
          )}
        </div>

        {/* Deep Dive Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          
          {/* Left: Description & Creative Intent */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#7A675B]">
              <Sparkles className="w-3.5 h-3.5 text-[#C86D51]" />
              <span>Creative Intent & Narrative</span>
            </div>
            <p className="text-xs sm:text-sm text-[#45362E] leading-relaxed">
              {media.description || 'Custom crafted generative sequences, narrative hook engineering, and color science tuned for modern high-retention feeds.'}
            </p>

            {media.workflowStep && (
              <div className="p-3.5 rounded-2xl bg-white/70 border border-white space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2A211D]">
                  <Workflow className="w-3.5 h-3.5 text-[#C86D51]" />
                  <span>Workflow Execution:</span>
                </div>
                <p className="text-xs text-[#5A483E] leading-relaxed">
                  {media.workflowStep}
                </p>
              </div>
            )}

            {isYouTubeVideo && (
              <a
                href={`https://youtube.com/watch?v=${youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/80 hover:bg-white border border-[#DFCEBE] text-xs font-semibold text-[#2A211D] hover:text-[#C86D51] transition-colors shadow-xs"
              >
                <Youtube className="w-4 h-4 text-red-600" />
                <span>Watch on YouTube</span>
                <ExternalLink className="w-3 h-3 text-[#7A675B]" />
              </a>
            )}
          </div>

          {/* Right: Tools & Architecture Nodes */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#7A675B]">
              <Layers className="w-3.5 h-3.5 text-[#C86D51]" />
              <span>Technology & Neural Stack</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {media.toolsUsed && media.toolsUsed.map((tool) => (
                <div 
                  key={tool}
                  className="px-3 py-1.5 rounded-xl bg-white/80 border border-white text-xs font-semibold text-[#2A211D] flex items-center gap-1.5 shadow-xs"
                >
                  <span className="w-2 h-2 rounded-full bg-[#C86D51]"></span>
                  <span>{tool}</span>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
