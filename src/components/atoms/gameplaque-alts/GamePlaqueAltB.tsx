import React, { useState, useEffect, useRef, useId } from 'react';
import type { GamePlaqueAltProps } from './types';
import { DEFAULT_ALT_PROPS } from './types';

/**
 * @propolis
 * {
 *   "role": "COMPONENT",
 *   "constraints": ["Fillet radii below come from tangent-circle geometry, not hand-tuned bezier control points — see agent_instructions"],
 *   "agent_instructions": "Alt B of the GamePlaque shape rebuild (cone/project/specs/GAME_PLAQUE_SVG_BRIEF.md, Alt B). Started as a live SVG goo filter (feGaussianBlur+feColorMatrix threshold) merging two independent primitives (a flat-topped rounded tab rect + a straightforward rounded trapezoid banner) — confirmed via a standalone screenshot test (see session notes) that at this component's actual render size (~90px tall) the blur+threshold edge is visibly soft/blocky at 5x zoom, failing the brief's crispness bar against the rest of the site's flat vector strokes. Per the brief's own fallback instruction, baked to a static-geometry merge instead: the tab (flat bottom, no bottom rounding) and banner (flat top, no top rounding) are two primitives that meet at a sharp square notch where tab-side meets banner-top; the concave fillet arc is the exact circle tangent to both lines at that notch (center at (tabEdgeX -/+ R, bannerTopY - R), radius FILLET_R), not eyeballed — this is the 'round the background notch's corner' construction, the mechanical dual of rounding a normal convex corner. No boolean-path library available in node_modules, so the merge is this closed-form tangent-circle case rather than a general polygon union."
 * }
 */

export const GamePlaqueAltB: React.FC<GamePlaqueAltProps> = ({
  children,
  label = 'ROLE',
  className = '',
  topBandColor = DEFAULT_ALT_PROPS.topBandColor,
  faceColor = DEFAULT_ALT_PROPS.faceColor,
  bottomBandColor = DEFAULT_ALT_PROPS.bottomBandColor,
  indentColor = DEFAULT_ALT_PROPS.indentColor,
  strokeColor = DEFAULT_ALT_PROPS.strokeColor,
  shadowColor = DEFAULT_ALT_PROPS.shadowColor,
  labelTextColor = DEFAULT_ALT_PROPS.labelTextColor,
  strokeWidth = DEFAULT_ALT_PROPS.strokeWidth,
  shadowOffset = DEFAULT_ALT_PROPS.shadowOffset,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 260, height: 90 });
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

  // Primitive 1: the tab — flat-topped rounded rect, flat (unrounded) bottom, sized as a
  // straightforward fraction of the banner width. No fillet math here at all.
  const tabHalfWidth = Math.max(30, W * 0.155);
  const tabCenterX = W / 2;
  const tabLeftX = tabCenterX - tabHalfWidth;
  const tabRightX = tabCenterX + tabHalfWidth;
  const tabCornerRadius = 9;

  // Primitive 2: the banner — a straight-sided taper, wide at the top (where the tab sits),
  // narrow at the bottom, per cone/project/specs/GAME_PLAQUE_SHAPE_ONLY.md. CORRECTED 2026-08-18:
  // an earlier version of this file replaced the straight taper with a "belly bulge" (sides
  // bulging out past both the top and bottom edge widths to a soft apex ~40-44% down, then
  // curving back in), reasoning from a programmatic contour trace of image.png. That trace was
  // wrong — GAME_PLAQUE.md §2 documents that this crop's corner radii are large enough that
  // edge-tracing keeps mistaking corner-rounding curvature for a mid-height bulge; a direct visual
  // read of the reference shows one continuous diagonal per side, not a bulge. Reverted to a
  // straight taper: one `L` per side from the top corner's arc-end to the bottom corner's
  // arc-start, no cubic bellies.
  const bannerTopY = H * 0.225;
  const bannerCornerRadius = 13;
  const bottomInset = W * 0.11;

  // The merge: tab's flat bottom (at bannerTopY) meets the banner's flat top (also at
  // bannerTopY) outside the tab — a sharp square notch at (tabLeftX, bannerTopY) and
  // (tabRightX, bannerTopY). FILLET_R is the radius of the circle tangent to both the tab's
  // vertical side and the banner's horizontal top edge at that notch.
  const filletR = Math.min(18, bannerTopY * 0.7);

  const outlinePath = [
    `M ${tabLeftX + tabCornerRadius} 0`,
    `L ${tabRightX - tabCornerRadius} 0`,
    `A ${tabCornerRadius} ${tabCornerRadius} 0 0 1 ${tabRightX} ${tabCornerRadius}`,
    `L ${tabRightX} ${bannerTopY - filletR}`,
    `A ${filletR} ${filletR} 0 0 0 ${tabRightX + filletR} ${bannerTopY}`,
    `L ${W - bannerCornerRadius} ${bannerTopY}`,
    `A ${bannerCornerRadius} ${bannerCornerRadius} 0 0 1 ${W} ${bannerTopY + bannerCornerRadius}`,
    `L ${W - bottomInset} ${H - bannerCornerRadius}`,
    `A ${bannerCornerRadius} ${bannerCornerRadius} 0 0 1 ${W - bottomInset - bannerCornerRadius} ${H}`,
    `L ${bottomInset + bannerCornerRadius} ${H}`,
    `A ${bannerCornerRadius} ${bannerCornerRadius} 0 0 1 ${bottomInset} ${H - bannerCornerRadius}`,
    `L 0 ${bannerTopY + bannerCornerRadius}`,
    `A ${bannerCornerRadius} ${bannerCornerRadius} 0 0 1 ${bannerCornerRadius} ${bannerTopY}`,
    `L ${tabLeftX - filletR} ${bannerTopY}`,
    `A ${filletR} ${filletR} 0 0 0 ${tabLeftX} ${bannerTopY - filletR}`,
    `L ${tabLeftX} ${tabCornerRadius}`,
    `A ${tabCornerRadius} ${tabCornerRadius} 0 0 1 ${tabLeftX + tabCornerRadius} 0`,
    'Z',
  ].join(' ');

  const clipId = `game-plaque-altb-clip-${uniqueId}`;
  const topBandHeight = Math.max(6, H * 0.09);
  const bottomBandHeight = Math.max(6, H * 0.09);

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

        {shadowOffset > 0 && (
          <path d={outlinePath} fill={shadowColor} transform={`translate(0, ${shadowOffset})`} />
        )}

        <path d={outlinePath} fill={faceColor} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />

        <g clipPath={`url(#${clipId})`}>
          <rect x={0} y={bannerTopY} width={W} height={topBandHeight} fill={topBandColor} />
          <rect x={0} y={H - bottomBandHeight} width={W} height={bottomBandHeight} fill={bottomBandColor} />
        </g>

        {label && (
          <rect
            x={tabCenterX - tabHalfWidth * 0.72}
            y={bannerTopY * 0.32}
            width={tabHalfWidth * 1.44}
            height={bannerTopY * 0.4}
            rx={(bannerTopY * 0.4) / 2}
            fill={indentColor}
          />
        )}
      </svg>

      {label && (
        <span
          className="absolute left-1/2 -translate-x-1/2 z-10 font-arcade font-extrabold text-[7px] sm:text-[8px] tracking-widest uppercase leading-none pointer-events-none"
          style={{ top: bannerTopY * 0.32 + bannerTopY * 0.2, color: labelTextColor }}
        >
          {label}
        </span>
      )}

      <div
        className="relative z-10"
        style={{
          paddingTop: bannerTopY + 8,
          paddingBottom: 10,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default GamePlaqueAltB;
