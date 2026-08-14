import React from 'react';
import {
  RIVET_SIZE,
  OUTLINE_COLOR,
  OUTLINE_WIDTH,
  HIGHLIGHT_HEIGHT_PX,
  ELEVATION_HEIGHT_PX,
  RIVET_HIGHLIGHT_COLOR,
  RIVET_COLOR,
  RIVET_ELEVATION_COLOR,
} from './DeskBoardConstants';

export const JAGGED_RAIL_TOP_1 = "M 0 0 L 180 0 L 183 7 L 186 0 L 680 0 L 684 12 L 688 0 L 890 0 L 893 8 L 896 0 L 1000 0";
export const JAGGED_RAIL_BOTTOM_1 = "L 1000 100 L 810 100 L 805 88 L 800 100 L 320 100 L 317 93 L 314 100 L 0 100 Z";

export const JAGGED_RAIL_TOP_2 = "M 0 0 L 120 0 L 123 5 L 126 0 L 450 0 L 454 10 L 458 0 L 920 0 L 923 6 L 926 0 L 1000 0";
export const JAGGED_RAIL_BOTTOM_2 = "L 1000 100 L 870 100 L 865 92 L 860 100 L 620 100 L 617 89 L 614 100 L 250 100 L 247 94 L 244 100 L 0 100 Z";

export const JAGGED_POST_LEFT_1 = "M 0 0 L 0 220 L 8 223 L 0 226 L 0 760 L 14 764 L 0 768 L 0 1000";
export const JAGGED_POST_RIGHT_1 = "L 100 1000 L 100 620 L 92 617 L 100 614 L 100 140 L 88 135 L 100 130 L 100 0 Z";

export const JAGGED_POST_LEFT_2 = "M 0 0 L 0 150 L 7 154 L 0 158 L 0 540 L 12 543 L 0 546 L 0 880 L 9 883 L 0 886 L 0 1000";
export const JAGGED_POST_RIGHT_2 = "L 100 1000 L 100 810 L 94 807 L 100 804 L 100 480 L 85 476 L 100 472 L 100 230 L 93 227 L 100 224 L 100 0 Z";

export function Rivet({ className }: { className: string }) {
  return (
    <div
      className={`absolute z-10 ${RIVET_SIZE} ${className}`}
      style={{ backgroundColor: OUTLINE_COLOR, padding: OUTLINE_WIDTH }}
      aria-hidden
    >
      <div style={{ height: `${HIGHLIGHT_HEIGHT_PX}px`, backgroundColor: RIVET_HIGHLIGHT_COLOR }} />
      <div className="h-[16px] md:h-[19px]" style={{ backgroundColor: RIVET_COLOR }} />
      <div style={{ height: `${ELEVATION_HEIGHT_PX}px`, backgroundColor: RIVET_ELEVATION_COLOR }} />
    </div>
  );
}

export function PlankGrain({ vertical = false }: { vertical?: boolean }) {
  return (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-multiply" 
      preserveAspectRatio="none"
      viewBox={vertical ? "0 0 100 800" : "0 0 800 100"}
      aria-hidden
    >
      <g fill="none" strokeLinecap="round">
        {vertical ? (
          <>
            <path d="M 35 0 Q 15 160 38 340 T 28 800" stroke="#B97640" strokeWidth="4" />
            <path d="M 70 0 Q 92 220 68 420 T 82 800" stroke="#F0C489" strokeWidth="3" />
            <path d="M 10 0 Q 25 250 5 500 T 20 800" stroke="#A8672F" strokeWidth="3" />
            <path d="M 85 0 Q 60 300 90 600 T 70 800" stroke="#AC6C34" strokeWidth="4" />
          </>
        ) : (
          <>
            <path d="M 0 35 Q 160 15 340 38 T 800 28" stroke="#B97640" strokeWidth="4" />
            <path d="M 0 70 Q 220 92 420 68 T 800 82" stroke="#F0C489" strokeWidth="3" />
            <path d="M 0 10 Q 25 250 5 500 T 20 800" stroke="#A8672F" strokeWidth="3" />
            <path d="M 0 85 Q 300 60 600 90 T 800 70" stroke="#AC6C34" strokeWidth="4" />
          </>
        )}
      </g>
    </svg>
  );
}

export function PlankGrainPaths({ vertical = false, flip = false }: { vertical?: boolean; flip?: boolean }) {
  const transform = flip ? (vertical ? "scale(1, -1) translate(0, -800)" : "scale(-1, 1) translate(-800, 0)") : "";
  return (
    <g fill="none" strokeLinecap="round" style={{ opacity: 0.4, mixBlendMode: 'multiply' }} transform={transform}>
      {vertical ? (
        <>
          <path d="M 35 0 Q 15 160 38 340 T 28 800" stroke="#B97640" strokeWidth="4" />
          <path d="M 70 0 Q 92 220 68 420 T 82 800" stroke="#F0C489" strokeWidth="3" />
          <path d="M 10 0 Q 25 250 5 500 T 20 800" stroke="#A8672F" strokeWidth="3" />
          <path d="M 85 0 Q 60 300 90 600 T 70 800" stroke="#AC6C34" strokeWidth="4" />
        </>
      ) : (
        <>
          <path d="M 0 35 Q 160 15 340 38 T 800 28" stroke="#B97640" strokeWidth="4" />
          <path d="M 0 70 Q 220 92 420 68 T 800 82" stroke="#F0C489" strokeWidth="3" />
          <path d="M 0 10 Q 25 250 5 500 T 20 800" stroke="#A8672F" strokeWidth="3" />
          <path d="M 0 85 Q 300 60 600 90 T 800 70" stroke="#AC6C34" strokeWidth="4" />
        </>
      )}
    </g>
  );
}
