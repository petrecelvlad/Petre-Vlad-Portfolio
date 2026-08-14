import React from 'react';
import { BOARD_COLOR, darken, lighten } from '@/src/components/bento/skins/heritage/palette';

function PlankGrain() {
  return (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-multiply" 
      preserveAspectRatio="none"
      viewBox="0 0 800 100"
      aria-hidden
    >
      <g fill="none" strokeLinecap="round">
        <path d="M 0 35 Q 160 15 340 38 T 800 28" stroke="#B97640" strokeWidth="4" />
        <path d="M 0 70 Q 220 92 420 68 T 800 82" stroke="#F0C489" strokeWidth="3" />
        <path d="M 0 10 Q 250 25 500 5 T 800 20" stroke="#A8672F" strokeWidth="3" />
        <path d="M 0 85 Q 300 60 600 90 T 800 70" stroke="#AC6C34" strokeWidth="4" />
      </g>
    </svg>
  );
}

export function SkillTreeBannerPlank() {
  const OUTLINE_COLOR = '#6B4423';
  const ELEVATION_DARKEN_PCT = 20;
  const BOARD_ELEVATION_COLOR = darken(BOARD_COLOR, ELEVATION_DARKEN_PCT);
  const BOARD_HIGHLIGHT_COLOR = lighten(BOARD_COLOR, ELEVATION_DARKEN_PCT);

  return (
    <div
      className="absolute flex flex-col drop-shadow-md"
      style={{
        left: 70,
        right: 70,
        top: 5,
        height: 80,
        backgroundColor: OUTLINE_COLOR,
        padding: 3,
        transform: 'rotate(-1deg)',
        zIndex: -1,
      }}
    >
      <div style={{ height: 2, backgroundColor: BOARD_HIGHLIGHT_COLOR }} />
      <div className="flex-1 relative overflow-hidden" style={{ backgroundColor: BOARD_COLOR }}>
        <PlankGrain />
      </div>
      <div style={{ height: 6, backgroundColor: BOARD_ELEVATION_COLOR }} />
    </div>
  );
}

export function SkillTreeBanner() {
  return (
    <div className="absolute top-[-23px] left-1/2 -translate-x-1/2 z-30 pointer-events-none drop-shadow-[0_4px_8px_rgba(14,9,5,0.6)] flex justify-center">
      <svg width="310" height="46" viewBox="0 0 310 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="st-banner-crimson" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E63946" />
            <stop offset="100%" stopColor="#9B111E" />
          </linearGradient>
        </defs>

        <path d="M 5,20 L 20,3 L 285,3 L 300,20 L 285,43 L 20,43 Z" fill="#671118" stroke="#1C1610" strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="25" y="6" width="255" height="34" rx="4" fill="url(#st-banner-crimson)" stroke="#1C1610" strokeWidth="2" />
        <rect x="29" y="10" width="247" height="26" rx="2" fill="none" stroke="#FFC72C" strokeWidth="1" strokeDasharray="6 3" />

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
          SKILLTREE
        </text>
      </svg>
    </div>
  );
}
