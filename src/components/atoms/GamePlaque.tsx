import React, { useState, useEffect, useRef, useId } from 'react';

interface GamePlaqueProps {
  children: React.ReactNode;
  label?: string;
  className?: string;
  topBandColor?: string;
  faceColor?: string;
  bottomBandColor?: string;
  indentColor?: string;
  strokeColor?: string;
  shadowColor?: string;
  labelTextColor?: string;
  strokeWidth?: number;
  shadowOffset?: number;
  tabWidthRatio?: number;
  tabHeight?: number;
  tabCornerRadius?: number;
  filletRadius?: number;
  bannerCornerRadius?: number;
  topBandHeight?: number;
  bottomBandHeight?: number;
  bottomTaperRatio?: number;
}

/**
 * GamePlaque: a flat-color, embossed banner with an integrated top handle tab holding `label`.
 * Shape and color spec: cone/project/architecture/systems/GAME_PLAQUE.md — one continuous SVG
 * outline (banner + tab, concave fillet where they meet), flat color bands, no gradients. Read
 * that doc before changing any geometry/color default below.
 */
export const GamePlaque: React.FC<GamePlaqueProps> = ({
  children,
  label = 'ROLE',
  className = '',
  topBandColor = '#FFE233',
  faceColor = '#FBBA0D',
  bottomBandColor = '#C99106',
  indentColor = '#D06B03',
  strokeColor = '#1C1610',
  shadowColor = '#1C1610',
  labelTextColor = '#FFFDF7',
  strokeWidth = 3,
  shadowOffset = 4,
  tabWidthRatio = 0.34,
  tabHeight = 30,
  tabCornerRadius = 8,
  filletRadius = 10,
  bannerCornerRadius = 14,
  topBandHeight = 8,
  bottomBandHeight = 8,
  bottomTaperRatio = 0.06,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 220, height: 74 });
  const uniqueId = useId().replace(/:/g, '');

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setDimensions({ width: Math.round(rect.width), height: Math.round(rect.height) });
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { width: W, height: H } = dimensions;
  const bannerTopY = tabHeight;
  const tabHalfWidth = Math.max(24, (W * tabWidthRatio) / 2);
  const tabCenterX = W / 2;
  // Trapezoid, not a rounded rectangle: the top edge (where the tab sits) is the wide end, the
  // bottom edge is narrower — a funnel pointing down. Direction per GAME_PLAQUE.md §2 (corrected
  // 2026-08-17, flipped back to the first pass). bottomInset is per side, so the bottom edge is
  // narrower by 2x this amount.
  const bottomInset = (W * bottomTaperRatio) / 2;
  // Tab-to-banner concave fillet: the exact circle tangent to both the tab's vertical side and
  // the banner's horizontal top edge at their notch (ported from GamePlaqueAltB's derivation,
  // gameplaque-alts/GamePlaqueAltB.tsx). Capped relative to bannerTopY so a short tab never gets
  // a fillet radius larger than the tab is tall.
  const filletR = Math.min(filletRadius, bannerTopY * 0.7);

  // One continuous outline: banner top-left corner → banner top edge → concave fillet up into
  // the tab's left side → tab's rounded top → concave fillet back down → banner top edge →
  // banner's remaining three rounded corners, with the left/right edges diagonal (wide top,
  // narrow bottom) instead of vertical. A single path/stroke, not two separately-outlined
  // shapes — see GAME_PLAQUE.md §2.
  const outlinePath = [
    `M ${bannerCornerRadius} ${bannerTopY}`,
    `L ${tabCenterX - tabHalfWidth - filletR} ${bannerTopY}`,
    `A ${filletR} ${filletR} 0 0 0 ${tabCenterX - tabHalfWidth} ${bannerTopY - filletR}`,
    `L ${tabCenterX - tabHalfWidth} ${tabCornerRadius}`,
    `A ${tabCornerRadius} ${tabCornerRadius} 0 0 1 ${tabCenterX - tabHalfWidth + tabCornerRadius} 0`,
    `L ${tabCenterX + tabHalfWidth - tabCornerRadius} 0`,
    `A ${tabCornerRadius} ${tabCornerRadius} 0 0 1 ${tabCenterX + tabHalfWidth} ${tabCornerRadius}`,
    `L ${tabCenterX + tabHalfWidth} ${bannerTopY - filletR}`,
    `A ${filletR} ${filletR} 0 0 0 ${tabCenterX + tabHalfWidth + filletR} ${bannerTopY}`,
    `L ${W - bannerCornerRadius} ${bannerTopY}`,
    `A ${bannerCornerRadius} ${bannerCornerRadius} 0 0 1 ${W} ${bannerTopY + bannerCornerRadius}`,
    `L ${W - bottomInset} ${H - bannerCornerRadius}`,
    `A ${bannerCornerRadius} ${bannerCornerRadius} 0 0 1 ${W - bottomInset - bannerCornerRadius} ${H}`,
    `L ${bottomInset + bannerCornerRadius} ${H}`,
    `A ${bannerCornerRadius} ${bannerCornerRadius} 0 0 1 ${bottomInset} ${H - bannerCornerRadius}`,
    `L 0 ${bannerTopY + bannerCornerRadius}`,
    `A ${bannerCornerRadius} ${bannerCornerRadius} 0 0 1 ${bannerCornerRadius} ${bannerTopY}`,
    'Z',
  ].join(' ');

  const clipId = `game-plaque-clip-${uniqueId}`;

  return (
    <div ref={containerRef} className={`relative inline-flex select-none ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id={clipId}>
            <path d={outlinePath} />
          </clipPath>
        </defs>

        {/* Drop shadow — same silhouette, flat color, offset straight down. Matches the site's
            hard offset shadow convention (shadow-[0_4px_0_0_#1C1610]), not a blurred shadow. */}
        {shadowOffset > 0 && (
          <path d={outlinePath} fill={shadowColor} transform={`translate(0, ${shadowOffset})`} />
        )}

        {/* Base flat face fill + the one continuous outline stroke */}
        <path d={outlinePath} fill={faceColor} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />

        {/* Flat top-highlight and bottom-undershadow bands, clipped to the true silhouette so
            they never spill past the outline (rounded corners, tab fillets included) */}
        <g clipPath={`url(#${clipId})`}>
          <rect x={0} y={bannerTopY} width={W} height={topBandHeight} fill={topBandColor} />
          <rect x={0} y={H - bottomBandHeight} width={W} height={bottomBandHeight} fill={bottomBandColor} />
        </g>

        {/* Tab indent — recessed groove holding the label text */}
        {label && (
          <rect
            x={tabCenterX - tabHalfWidth * 0.72}
            y={tabHeight * 0.28}
            width={tabHalfWidth * 1.44}
            height={tabHeight * 0.46}
            rx={(tabHeight * 0.46) / 2}
            fill={indentColor}
          />
        )}
      </svg>

      {/* Label centered over the indent's exact bounding box (not a hand-tuned top offset) so
          it stays centered regardless of tabHeight/font metrics. */}
      {label && (
        <div
          className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center pointer-events-none"
          style={{ top: tabHeight * 0.28, height: tabHeight * 0.46, width: tabHalfWidth * 1.44 }}
        >
          <span
            className="font-arcade font-extrabold text-[7px] sm:text-[8px] tracking-widest uppercase leading-none"
            style={{ color: labelTextColor }}
          >
            {label}
          </span>
        </div>
      )}

      <div
        className="relative z-10"
        style={{
          paddingTop: bannerTopY + 18,
          paddingBottom: 24,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default GamePlaque;
