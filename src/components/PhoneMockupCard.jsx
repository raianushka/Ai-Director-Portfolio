import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw } from 'lucide-react';
import { extractYouTubeId, getYouTubeThumbnail, getYouTubeEmbedUrl } from '../utils/mediaHelper.js';

export function PhoneMockupCard({ item, onOpenModal }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  const youtubeId = item.youtubeId || extractYouTubeId(item.videoUrl);
  const isYouTube = Boolean(youtubeId);
  const displayPoster = item.posterUrl || (isYouTube ? getYouTubeThumbnail(youtubeId, 'hqdefault') : '');
  const embedUrl = isYouTube ? getYouTubeEmbedUrl(youtubeId, { autoplay: true, mute: false }) : null;

  const handleMouseEnter = () => {
    if (!isYouTube && videoRef.current && !isPlaying) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (!isYouTube && videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    if (isYouTube) {
      setIsPlaying(!isPlaying);
      return;
    }
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div 
      id={`reel-card-${item.id}`}
      className="shrink-0 w-[260px] sm:w-[280px] group transition-all duration-300 hover:-translate-y-1.5"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 9:16 SMARTPHONE MOCKUP SHELL */}
      <div className="relative rounded-[40px] p-2.5 bg-gradient-to-b from-[#382C26] via-[#241A15] to-[#1A120E] shadow-[0_16px_35px_-8px_rgba(40,25,18,0.25)] border-[2.5px] border-[#665347]/40 ring-1 ring-white/20">
        
        {/* Phone Speaker & Dynamic Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#140E0B] rounded-full z-30 flex items-center justify-between px-2.5 shadow-inner pointer-events-none">
          <div className="w-2.5 h-2.5 rounded-full bg-[#2A211D] border border-white/10 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-[#1A120E]"></div>
          </div>
          <div className="w-6 h-1 rounded-full bg-[#35261F]"></div>
        </div>

        {/* Screen Display Area (9:16 Ratio) */}
        <div 
          className="relative aspect-[9/16] rounded-[32px] overflow-hidden bg-black flex items-center justify-center cursor-pointer select-none"
          onClick={togglePlay}
        >
          
          {isYouTube ? (
            isPlaying ? (
              <iframe
                src={embedUrl}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full rounded-[30px] border-0"
              />
            ) : (
              <>
                <img
                  src={displayPoster}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/85 pointer-events-none"></div>
              </>
            )
          ) : (
            <>
              <video
                ref={videoRef}
                src={item.videoUrl}
                poster={displayPoster}
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/85 pointer-events-none"></div>
            </>
          )}

          {/* Top Status Indicators (Hidden when YouTube is actively playing in-place) */}
          {(!isYouTube || !isPlaying) && (
            <div className="absolute top-5 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
              {item.duration && item.duration !== 'YouTube Short' && (
                <span className="px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-md text-[10px] font-mono text-white/90">
                  {item.duration}
                </span>
              )}
              {item.categoryLabel && (
                <span className="ml-auto px-2 py-0.5 rounded-md bg-[#C86D51]/80 backdrop-blur-md text-[9px] font-bold tracking-wider uppercase text-white">
                  {item.categoryLabel}
                </span>
              )}
            </div>
          )}

          {/* Center Play Button Overlay */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 m-auto w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg z-20 cursor-pointer opacity-90 group-hover:opacity-100"
              aria-label="Play short"
            >
              <Play className="w-5 h-5 fill-white ml-0.5" />
            </button>
          )}

          {/* Sound Toggle (for MP4 only) */}
          {!isYouTube && (
            <button
              onClick={toggleMute}
              className="absolute top-12 right-3 z-20 p-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-white/90 hover:text-white hover:bg-black/80 transition-all cursor-pointer"
              title={isMuted ? "Unmute audio" : "Mute audio"}
              aria-label="Toggle mute"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#E28A4E]" />}
            </button>
          )}

          {/* In-place close / reset for playing YouTube short */}
          {isYouTube && isPlaying && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(false);
              }}
              className="absolute top-4 right-3 z-30 p-1.5 rounded-lg bg-black/70 backdrop-blur-md text-white/90 hover:text-white hover:bg-black transition-all cursor-pointer border border-white/20"
              title="Stop playback"
              aria-label="Stop short playback"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Bottom Video Metadata (Visible when not actively streaming in-place) */}
          {(!isYouTube || !isPlaying) && (
            <div className="absolute bottom-3 left-3 right-3 z-20 space-y-2 pointer-events-auto">
              <div>
                <h4 className="font-display font-bold text-sm text-white line-clamp-1 leading-snug">
                  {item.title}
                </h4>
                <p className="text-[11px] text-white/70 line-clamp-1">
                  {item.subtitle}
                </p>
              </div>

              {/* Tools Used Chips */}
              <div className="flex flex-wrap gap-1">
                {item.toolsUsed && item.toolsUsed.slice(0, 3).map((tool) => (
                  <span 
                    key={tool} 
                    className="px-1.5 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-[9px] font-medium text-white/95 border border-white/10"
                  >
                    {tool}
                  </span>
                ))}
                {item.toolsUsed && item.toolsUsed.length > 3 && (
                  <span className="px-1.5 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-[9px] font-medium text-white/80">
                    +{item.toolsUsed.length - 3}
                  </span>
                )}
              </div>

              {/* Optional Inspect Details Button */}
              {onOpenModal && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenModal(item);
                  }}
                  className="w-full py-1.5 rounded-xl bg-white/20 hover:bg-[#C86D51] backdrop-blur-md text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 border border-white/20 shadow-xs transition-all cursor-pointer"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>Inspect Details</span>
                </button>
              )}
            </div>
          )}

        </div>

      </div>

      <div className="mt-3 px-2 text-center">
        <h5 className="font-display font-semibold text-xs text-[#2A211D] truncate">
          {item.title}
        </h5>
        <p className="text-[11px] text-[#7A675B] truncate">
          {item.toolsUsed && item.toolsUsed.join(' • ')}
        </p>
      </div>
    </div>
  );
}
