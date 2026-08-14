import React from 'react';

export interface GamifiedBannerPlaqueProps {
  title?: string;
}

export function GamifiedBannerPlaque({ title = "HERO SKILL TREE" }: GamifiedBannerPlaqueProps) {
  return (
    <div className="absolute top-[-23px] left-1/2 -translate-x-1/2 z-30 pointer-events-none drop-shadow-[0_4px_8px_rgba(14,9,5,0.6)] flex justify-center">
      <svg width="310" height="46" viewBox="0 0 310 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Angled Hexagonal Ribbon Backplate */}
        <path d="M 5,20 L 20,3 L 285,3 L 300,20 L 285,43 L 20,43 Z" fill="#671118" stroke="#1C1610" strokeWidth="2.5" strokeLinejoin="round" />

        {/* Main Crimson Banner Front Plaque — flat fill, no bevel (thin decorative
            strip, not a surface needing a depth cue). */}
        <rect x="25" y="6" width="255" height="34" rx="4" fill="#9B111E" stroke="#1C1610" strokeWidth="2" />

        {/* Inner Dashed Gold Border */}
        <rect x="29" y="10" width="247" height="26" rx="2" fill="none" stroke="#FFC72C" strokeWidth="1" strokeDasharray="6 3" />

        {/* Banner Text */}
        <text
          x="152.5"
          y="28"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontSize="14"
          fontWeight="900"
          fill="#FFE875"
          letterSpacing="2"
          stroke="#1C1610"
          strokeWidth="0.8"
          paintOrder="stroke fill"
          style={{ filter: 'drop-shadow(1px 1px 0px #000)' }}
        >
          {title}
        </text>
      </svg>
    </div>
  );
}
