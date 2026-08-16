import React from 'react';

export interface GamifiedBannerPlaqueProps {
  title?: string;
}

/**
 * Crimson/Oxblood alloy stops, matching the same directional light→shadow
 * construction Tactile_Style.md §2 defines for steel/brass/silver, and tying
 * into GamifiedParchmentPanel's wax-seal reds (#991B1B/#7F1D1D/#B91C1C) so the
 * skin has one consistent red family instead of a one-off banner-only palette.
 */
const CRIMSON_HIGHLIGHT = '#F87171';
const CRIMSON_MID = '#B91C1C';
const CRIMSON_DEEP = '#7F1D1D';
const CRIMSON_DARKEST = '#450A0A';
const CONTOUR = '#1C1610';
const GOLD = '#FFC72C';
const METAL_COLOR = '#64748B'; // matches SteelCornerBrackets / ParchmentPanel hanging-bar rivets

export function GamifiedBannerPlaque({ title = "HERO SKILL TREE" }: GamifiedBannerPlaqueProps) {
  return (
    <div className="absolute top-[-23px] left-1/2 -translate-x-1/2 z-30 pointer-events-none drop-shadow-[0_4px_8px_rgba(14,9,5,0.6)] flex justify-center">
      <svg width="330" height="50" viewBox="0 0 330 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="banner-crimson-face" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={CRIMSON_HIGHLIGHT} />
            <stop offset="35%" stopColor={CRIMSON_MID} />
            <stop offset="75%" stopColor={CRIMSON_DEEP} />
            <stop offset="100%" stopColor={CRIMSON_DARKEST} />
          </linearGradient>
        </defs>

        {/* Pointed ribbon-end backplate — same darkest crimson stop as the face
            gradient's shadow end, so the mounting tabs read as the same
            material extending out from behind the face, not a separate color. */}
        <path d="M 4,25 L 21,4 L 309,4 L 326,25 L 309,46 L 21,46 Z" fill={CRIMSON_DARKEST} stroke={CONTOUR} strokeWidth="2.5" strokeLinejoin="round" />

        {/* Extruded base — 3px darker-crimson step peeking out from under the
            face's bottom edge, same "extruded 3D base" construction as
            buttons/plaques elsewhere (Skin_Gamified.md §3E). */}
        <rect x="24" y="9" width="282" height="34" rx="5" fill={CRIMSON_DARKEST} />

        {/* Main face — real directional gradient (top-left highlight →
            bottom-right shadow) instead of a flat fill. */}
        <rect x="24" y="6" width="282" height="34" rx="5" fill="url(#banner-crimson-face)" stroke={CONTOUR} strokeWidth="2" />

        {/* Specular highlight sliver along the top edge. */}
        <rect x="28" y="8" width="274" height="4" rx="2" fill="#FECACA" opacity="0.5" />

        {/* Inner dashed gold trim */}
        <rect x="28" y="10" width="274" height="26" rx="2" fill="none" stroke={GOLD} strokeWidth="1" strokeDasharray="6 3" />

        {/* Blued-steel rivets pinning the ribbon to the frame — same metal and
            micro-detailing (screw-slot line) as SteelCornerBrackets and the
            Parchment Panel's hanging-bar rivets. */}
        {[13, 317].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="25" r="4" fill={METAL_COLOR} stroke={CONTOUR} strokeWidth="1.2" />
            <line x1={cx - 2} y1="25" x2={cx + 2} y2="25" stroke={CONTOUR} strokeWidth="1" />
          </g>
        ))}

        {/* Banner Text */}
        <text
          x="165"
          y="28"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontSize="14"
          fontWeight="900"
          fill="#FFE875"
          letterSpacing="2"
          stroke={CONTOUR}
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
