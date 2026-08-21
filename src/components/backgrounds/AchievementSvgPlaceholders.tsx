import type { LiveShaderType } from './AchievementLiveShaders';

// Placeholder-only stand-ins for the SVG animation path. Swap each entry's <svg> content for the
// real hand-authored animation as it becomes available — the wiring (AchievementShaderCanvas.tsx's
// dispatcher, the "SVG" option in the Navbar path selector) doesn't need to change when that happens.
// All 4 shaders now have their real animations — see AchievementFactorySvg, AchievementLevelUpSvg,
// AchievementTeamsLeadSvg and AchievementCartridgeSvg below. Nothing is a placeholder type anymore;
// AchievementSvgPlaceholder/PLACEHOLDER_STYLE are unreachable dead code at this point but left as-is
// since removing them is outside the scope of wiring up Cartridge's real asset.
type PlaceholderType = Exclude<LiveShaderType, 'factory' | 'levelup' | 'teamslead' | 'cartridge'>;

const PLACEHOLDER_STYLE: Record<PlaceholderType, { bg: string; accent: string; label: string }> = {};

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

// Level-Up's real hand-authored animation (see cone/project/specs/SVG_Recreation_Prompts.md Prompt 1
// for the plain-language brief; the asset itself was built directly off LevelUpShaderCanvas's cycleTime
// math in AchievementLiveShaders.tsx for closer fidelity). Same self-contained, JS-free, <img>-rendered
// pattern as AchievementFactorySvg above.
export function AchievementLevelUpSvg({ className }: { className?: string; isVisible?: boolean }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}achievements/levelup-animated.svg`}
      alt=""
      className={`w-full h-full block object-cover ${className ?? ''}`}
    />
  );
}

// Teams Lead's real hand-authored animation (see cone/project/specs/SVG_Recreation_Prompts.md Prompt 3
// for the plain-language brief; node positions, badge colors and the hero's walk timing are pulled
// directly from TeamsLeadShaderCanvas's NODE1..4/tLoop math in AchievementLiveShaders.tsx — the organic
// island coastlines are a hand-drawn stand-in for the shader's FBM noise, which a vector recreation
// can't reproduce exactly). Same self-contained, JS-free, <img>-rendered pattern as the others above.
export function AchievementTeamsLeadSvg({ className }: { className?: string; isVisible?: boolean }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}achievements/teamslead-animated.svg`}
      alt=""
      className={`w-full h-full block object-cover ${className ?? ''}`}
    />
  );
}

// Cartridge's real hand-authored animation. The shader raymarches a true 3D rotating box, which
// isn't reproducible in CSS/SVG with correct perspective/occlusion — per an explicit product
// decision (cone/project/roadmap/board/T-026), this stays front-facing on the alien sticker face
// and fakes depth with a scaleX "turn and return" wobble instead of a full spin. Body geometry and
// the 8x8 alien bitmap are read directly off mapCartridge()/getAlienPixel() in
// AchievementLiveShaders.tsx. Same self-contained, JS-free, <img>-rendered pattern as the others above.
export function AchievementCartridgeSvg({ className }: { className?: string; isVisible?: boolean }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}achievements/cartridge-animated.svg`}
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
