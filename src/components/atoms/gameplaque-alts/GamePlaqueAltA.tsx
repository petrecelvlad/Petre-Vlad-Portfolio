import React, { useState, useEffect, useRef, useId } from 'react';
import type { GamePlaqueAltProps } from './types';
import { DEFAULT_ALT_PROPS } from './types';

/**
 * @propolis
 * {
 *   "role": "COMPONENT",
 *   "constraints": ["outlinePath is hand-traced against image.png — tune the constants below by screenshot comparison, not by re-deriving from written numbers"],
 *   "agent_instructions": "Alt A of the GamePlaque shape rebuild (cone/project/specs/GAME_PLAQUE_SVG_BRIEF.md, Alt A). Every corner in the outline (tab top, tab-to-banner fillet, banner's four corners) is a cubic/quadratic Bezier with hand-chosen control points, not an arc-radius primitive — tuned by rendering this component and eyeballing it against image.png, the opposite method from GamePlaqueAltC's programmatic trace. The fillet in particular (FILLET_*  constants) is two cubic Beziers per side: one carrying the tab's vertical side down into a concave dip, one carrying that dip back up into the banner's near-horizontal top edge — a single continuous curve, not two arcs meeting at a seam."
 * }
 */

export const GamePlaqueAltA: React.FC<GamePlaqueAltProps> = ({
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

  // Tab cap: flat-ish top, wide enough to read "about a third" of the banner's face width.
  const tabHalfWidth = Math.max(30, W * 0.155);
  const tabCenterX = W / 2;
  const tabTopY = 0;
  const tabCornerRadius = 9;

  // Tab's flat vertical side runs from the top cap down to where the fillet begins.
  const bannerTopY = H * 0.225;
  const filletStartY = bannerTopY * 0.34; // where the tab's own straight side ends and the fillet takes over

  // Fillet: tab's side sweeps outward+down into the banner's top edge as ONE cubic Bezier per
  // side (not two joined at a midpoint — that seam wasn't tangent-continuous and showed up as a
  // small bump/wiggle right next to the tab on the first pass, confirmed by screenshot). A single
  // cubic with a horizontal tangent at the banner end and a vertical tangent at the tab end reads
  // as one continuous curve, matching how quickly the reference's own shoulder flares outward.
  //
  // CORRECTED 2026-08-18: the banner body is not a trapezoid (one straight diagonal per side).
  // Re-examining image.png at high zoom, unoccluded by the info/close icons, shows each side
  // bulging OUT past both the top and bottom edge widths to a single soft apex roughly 40% of the
  // way down the body, then curving back in to the bottom corner — a smooth "banner ribbon" belly,
  // not a sharp trapezoid taper and not a sharp angular point either (the icons that overlap this
  // exact region make an angular vertex unverifiable either way; a continuous curve is the
  // defensible reading of what's actually visible). topInset/bottomInset/bulgeYRatio below are
  // tuned by rendering and comparing against image.png, same as the fillet — not re-derived from
  // pixel forensics on the reference crop, which has already produced contradictory readings.
  const filletOuterX = tabCenterX - tabHalfWidth - H * 0.72; // where the banner's top edge reaches, just outside the tab
  const filletReach = (filletOuterX - (tabCenterX - tabHalfWidth)) * 0.68;
  // Ratios cross-checked against GamePlaqueAltC's independent programmatic trace of image.png
  // (top corner x=56.4, bulge x=19.4/587.3, bottom corner x=46.0/560.1, out of TRACE_W=601;
  // vertex y=74.8-81.8 out of banner range 35-133) — both methods converge on the same shape.
  const topInset = W * 0.093;
  const bottomInset = W * 0.072;
  const cornerRadius = 13;
  const bulgeY = bannerTopY + (H - bannerTopY) * 0.44;
  const bulgeReach = (bulgeY - bannerTopY) * 0.42;
  const returnReach = (H - cornerRadius - bulgeY) * 0.4;

  const leftFillet =
    `L ${filletOuterX} ${bannerTopY} ` +
    `C ${filletOuterX - filletReach} ${bannerTopY} ${tabCenterX - tabHalfWidth} ${filletStartY + (bannerTopY - filletStartY) * 0.62} ${tabCenterX - tabHalfWidth} ${filletStartY}`;

  const rightFilletOuterX = tabCenterX + tabHalfWidth + H * 0.72;

  const rightFillet =
    `C ${tabCenterX + tabHalfWidth} ${filletStartY + (bannerTopY - filletStartY) * 0.62} ${rightFilletOuterX + filletReach} ${bannerTopY} ${rightFilletOuterX} ${bannerTopY} ` +
    `L ${W - topInset} ${bannerTopY}`;

  // Right side belly: top-corner → bulge (vertical tangent at the apex) → bottom-corner.
  const rightBelly =
    `C ${W - topInset * 0.3} ${bannerTopY + bulgeReach} ${W} ${bulgeY - bulgeReach} ${W} ${bulgeY} ` +
    `C ${W} ${bulgeY + returnReach} ${W - bottomInset * 0.4} ${H - cornerRadius - returnReach} ${W - bottomInset} ${H - cornerRadius}`;

  // Left side belly: mirror of the right.
  const leftBelly =
    `C ${bottomInset * 0.4} ${H - cornerRadius - returnReach} 0 ${bulgeY + returnReach} 0 ${bulgeY} ` +
    `C 0 ${bulgeY - bulgeReach} ${topInset * 0.3} ${bannerTopY + bulgeReach} ${topInset} ${bannerTopY}`;

  const outlinePath = [
    `M ${tabCenterX - tabHalfWidth + tabCornerRadius} ${tabTopY}`,
    `L ${tabCenterX + tabHalfWidth - tabCornerRadius} ${tabTopY}`,
    `Q ${tabCenterX + tabHalfWidth} ${tabTopY} ${tabCenterX + tabHalfWidth} ${tabTopY + tabCornerRadius}`,
    `L ${tabCenterX + tabHalfWidth} ${filletStartY}`,
    rightFillet,
    rightBelly,
    `A ${cornerRadius} ${cornerRadius} 0 0 1 ${W - bottomInset - cornerRadius} ${H}`,
    `L ${bottomInset + cornerRadius} ${H}`,
    `A ${cornerRadius} ${cornerRadius} 0 0 1 ${bottomInset} ${H - cornerRadius}`,
    leftBelly,
    leftFillet,
    `L ${tabCenterX - tabHalfWidth} ${tabTopY + tabCornerRadius}`,
    `Q ${tabCenterX - tabHalfWidth} ${tabTopY} ${tabCenterX - tabHalfWidth + tabCornerRadius} ${tabTopY}`,
    'Z',
  ].join(' ');

  const clipId = `game-plaque-alta-clip-${uniqueId}`;
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
            y={filletStartY * 0.35}
            width={tabHalfWidth * 1.44}
            height={filletStartY * 0.5}
            rx={(filletStartY * 0.5) / 2}
            fill={indentColor}
          />
        )}
      </svg>

      {label && (
        <span
          className="absolute left-1/2 -translate-x-1/2 z-10 font-arcade font-extrabold text-[7px] sm:text-[8px] tracking-widest uppercase leading-none pointer-events-none"
          style={{ top: filletStartY * 0.35 + filletStartY * 0.25, color: labelTextColor }}
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

export default GamePlaqueAltA;
