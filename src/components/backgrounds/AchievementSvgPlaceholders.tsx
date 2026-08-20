import type { LiveShaderType } from './AchievementLiveShaders';

// Placeholder-only stand-ins for the SVG animation path. Swap each entry's <svg> content for the
// real hand-authored animation as it becomes available — the wiring (AchievementShaderCanvas.tsx's
// dispatcher, the "SVG" option in the Navbar path selector) doesn't need to change when that happens.
// `factory` already has its real animation — see AchievementFactorySvg below — so it's excluded here.
type PlaceholderType = Exclude<LiveShaderType, 'factory'>;

const PLACEHOLDER_STYLE: Record<PlaceholderType, { bg: string; accent: string; label: string }> = {
  cartridge: { bg: '#0284C7', accent: '#F59E0B', label: 'CARTRIDGE' },
  levelup: { bg: '#1E1B4B', accent: '#EAB308', label: 'LEVEL UP' },
  teamslead: { bg: '#0F172A', accent: '#22C55E', label: 'TEAMS LEAD' },
};

// Factory's real hand-authored animation (see cone/project/specs/SVG_Recreation_Prompts.md for the
// brief it was built from). Self-contained SVG with its own CSS-driven animations, no JS involved —
// served as a static asset and rendered via <img> so `object-fit: cover` handles sizing for free.
// The asset's viewBox is cropped to the artwork's own intended 16:9 "screen" region (its outer
// canvas is 4:3 with a drawn bezel around that region) so no further cropping math is needed here.
export function AchievementFactorySvg({ className }: { className?: string; isVisible?: boolean }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}achievements/factory-animated.svg`}
      alt=""
      className={`w-full h-full block object-cover ${className ?? ''}`}
    />
  );
}

export function AchievementSvgPlaceholder({ type, className }: { type: PlaceholderType; className?: string; isVisible?: boolean }) {
  const { bg, accent, label } = PLACEHOLDER_STYLE[type];

  return (
    <svg
      viewBox="0 0 512 288"
      className={`w-full h-full block object-cover ${className ?? ''}`}
      role="img"
      aria-label={`${label} animation placeholder`}
    >
      <rect width="512" height="288" fill={bg} />
      <circle cx="256" cy="144" r="36" fill={accent}>
        <animate attributeName="r" values="30;42;30" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
      </circle>
      <text
        x="256"
        y="230"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="20"
        fontWeight="bold"
        fill="#FFFFFF"
        opacity="0.85"
      >
        {label}
      </text>
    </svg>
  );
}
