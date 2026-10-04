import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function SliderWrapper({
  id,
  title,
  subtitle,
  tag,
  children,
  itemCount,
}) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    return () => window.removeEventListener('resize', checkScrollability);
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.75;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScrollability, 350);
    }
  };

  const handleMouseDown = (e) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeftPos(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeftPos - walk;
    checkScrollability();
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <div id={id} className="py-8 sm:py-10">
      
      {/* Slider Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {tag && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#C86D51]/15 text-[#A84E32]">
                {tag}
              </span>
            )}
            {itemCount && (
              <span className="text-[11px] font-mono text-[#7A675B]">
                {itemCount} Projects
              </span>
            )}
          </div>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-[#2A211D] tracking-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs sm:text-sm text-[#7A675B]">
              {subtitle}
            </p>
          )}
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            id={`${id}-prev-btn`}
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous items"
            className={`p-2.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 transition-all duration-200 shadow-xs ${
              canScrollLeft 
                ? 'hover:bg-white text-[#2A211D] hover:text-[#C86D51] hover:shadow-md cursor-pointer' 
                : 'text-[#C5B3A6] opacity-50 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <button
            id={`${id}-next-btn`}
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Next items"
            className={`p-2.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 transition-all duration-200 shadow-xs ${
              canScrollRight 
                ? 'hover:bg-white text-[#2A211D] hover:text-[#C86D51] hover:shadow-md cursor-pointer' 
                : 'text-[#C5B3A6] opacity-50 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Track */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScrollability}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={`flex items-stretch gap-5 sm:gap-6 overflow-x-auto no-scrollbar pb-4 pt-1 px-1 scroll-smooth select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {children}
      </div>

    </div>
  );
}
