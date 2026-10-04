import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, MapPin, Youtube } from 'lucide-react';
import { extractYouTubeId, getYouTubeThumbnail } from '../utils/mediaHelper.js';

export function LandscapeVideoCard({ item, onOpenModal }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const youtubeId = item.youtubeId || extractYouTubeId(item.videoUrl);
  const isYouTube = Boolean(youtubeId);
  const displayThumbnail = item.thumbnailUrl || (isYouTube ? getYouTubeThumbnail(youtubeId, 'hqdefault') : '');

  const handleMouseEnter = () => {
    if (!isYouTube && videoRef.current) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (!isYouTube && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    if (isYouTube) {
      onOpenModal(item);
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
      id={`landscape-card-${item.id}`}
      className="shrink-0 w-[300px] sm:w-[360px] glass-panel rounded-3xl p-3.5 sm:p-4 flex flex-col justify-between group transition-all duration-300 hover:shadow-xl hover:border-white hover:-translate-y-1.5 cursor-pointer"
      onClick={() => onOpenModal(item)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 16:9 Video Canvas */}
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#1E1714] shadow-md flex items-center justify-center">
        
        {isYouTube ? (
          <img
            src={displayThumbnail}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <video
            ref={videoRef}
            src={item.videoUrl}
            poster={displayThumbnail}
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none"></div>

        {/* Top Floating Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-20 pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-mono text-white/90">
              {item.duration || '16:9 HD'}
            </span>
            {isYouTube && (
              <span className="px-2 py-0.5 rounded-lg bg-red-600/90 backdrop-blur-md text-[9px] font-bold tracking-wider uppercase text-white flex items-center gap-1 shadow-xs">
                <Youtube className="w-2.5 h-2.5" />
                <span>YouTube</span>
              </span>
            )}
          </div>
          {item.tag && (
            <span className="px-2 py-0.5 rounded-lg bg-[#C86D51]/90 backdrop-blur-md text-[9px] font-bold tracking-wider uppercase text-white">
              {item.tag}
            </span>
          )}
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className={`absolute inset-0 m-auto w-12 h-12 rounded-2xl bg-white/25 backdrop-blur-md border border-white/50 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-md z-20 cursor-pointer ${
            isYouTube
              ? 'opacity-90 group-hover:opacity-100 group-hover:scale-110'
              : (isPlaying ? 'opacity-0 group-hover:opacity-80' : 'opacity-100')
          }`}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
        </button>

        {/* Mute Control (Only for direct MP4) */}
        {!isYouTube && (
          <button
            onClick={toggleMute}
            className="absolute bottom-2.5 right-2.5 z-20 p-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-white/90 hover:text-white transition-all cursor-pointer"
            title={isMuted ? "Unmute audio" : "Mute audio"}
            aria-label="Toggle mute"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#E28A4E]" />}
          </button>
        )}

        {/* Location if travel vlog */}
        {item.location && (
          <div className="absolute bottom-2.5 left-2.5 z-20 flex items-center gap-1 text-[11px] font-medium text-white/90 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-md">
            <MapPin className="w-3 h-3 text-[#E28A4E]" />
            <span>{item.location}</span>
          </div>
        )}

      </div>

      {/* Card Content & Metadata */}
      <div className="mt-3.5 space-y-2 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-display font-bold text-sm sm:text-base text-[#2A211D] line-clamp-1 leading-snug">
            {item.title}
          </h4>
          <p className="text-xs text-[#5A483E] line-clamp-2 mt-1 leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="pt-2 border-t border-white/60 flex items-center justify-between gap-2">
          {/* Tools */}
          <div className="flex flex-wrap gap-1">
            {item.toolsUsed && item.toolsUsed.slice(0, 3).map((tool) => (
              <span 
                key={tool}
                className="px-2 py-0.5 rounded-md bg-white/70 border border-white/80 text-[10px] font-medium text-[#45362E]"
              >
                {tool}
              </span>
            ))}
          </div>

          {/* Action */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(item);
            }}
            className="p-1.5 rounded-xl bg-white/80 hover:bg-[#C86D51] text-[#45362E] hover:text-white border border-white/80 transition-all duration-200 shadow-xs cursor-pointer"
            title="Inspect project details"
            aria-label="Inspect project"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
}
