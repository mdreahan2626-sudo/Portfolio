'use client';

import React, { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const percentTextRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;
      const percent = scrollHeight > 0 ? Math.min(100, Math.max(0, Math.round((scrollY / scrollHeight) * 100))) : 0;

      if (percentTextRef.current) {
        percentTextRef.current.textContent = `${percent}%`;
      }
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleY(${percent / 100})`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initialize
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4 select-none">
      {/* Top indicator dots */}
      <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase rotate-90 mb-4 origin-center">
        SCROLL
      </span>

      {/* Vertical bar container */}
      <div className="h-32 w-[1px] bg-white/10 relative rounded-full overflow-hidden">
        {/* Active filling progress bar */}
        <div 
          ref={progressBarRef}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-400 via-violet-500 to-fuchsia-500 origin-top transition-transform duration-75 ease-out scale-y-0"
        />
      </div>

      {/* Numerical percentage text */}
      <span 
        ref={percentTextRef}
        className="text-[11px] font-mono font-medium text-zinc-300 w-10 text-center tracking-tighter"
      >
        0%
      </span>
    </div>
  );
}
