import React, { useState, useEffect, useRef, useId } from 'react';
import type { GamePlaqueAltProps } from './types';
import { DEFAULT_ALT_PROPS } from './types';

/**
 * @propolis
 * {
 *   "role": "COMPONENT",
 *   "constraints": ["outlinePath below is baked, not hand-authored — see agent_instructions"],
 *   "agent_instructions": "Alt C of the GamePlaque shape rebuild (cone/project/specs/GAME_PLAQUE_SVG_BRIEF.md, Alt C). The outlinePath/TRACE_W/TRACE_H constants were produced by a one-off Python pipeline run against image.png: yellow-family color threshold -> largest 4-connected component -> flood-fill hole closing (fills the WEEKLY MISSIONS text and tab indent) -> per-row leftmost/rightmost boundary scan (valid because the silhouette is single-interval per scanline, confirmed by inspection) -> Ramer-Douglas-Peucker polygon simplification (epsilon 1.15px) -> local per-vertex corner rounding (quadratic Bezier cut-ins, radius 7px; NOT a global Catmull-Rom fit, which overshot badly at the sharp fillet corners because it mixes long straight runs with tight corners). The trace was cut at y=133 (out of 150) because a separate UI badge below the banner in the source crop bleeds into the same connected component past that row. No human-tuned control points anywhere in this path. Re-derive by re-running that pipeline against image.png, not by hand-editing these coordinates."
 * }
 */

const TRACE_W = 601;
const TRACE_H = 150;

const OUTLINE_PATH =
  'M 245.78 0.00 Q 241.00 0.00 237.40 3.15 L 236.60 3.85 Q 233.00 7.00 230.41 11.02 L 218.79 29.11 Q 215.00 35.00 208.00 35.08 L 56.36 36.92 Q 50.00 37.00 49.10 43.30 L 48.46 47.79 Q 48.00 51.00 46.20 53.70 L 45.80 54.30 Q 44.00 57.00 41.33 58.85 L 35.94 62.58 Q 31.00 66.00 25.15 67.35 L 23.85 67.65 Q 18.00 69.00 19.43 74.83 L 29.93 117.63 Q 31.00 122.00 33.70 125.60 L 35.19 127.59 Q 37.00 130.00 39.70 131.35 L 40.30 131.65 Q 43.00 133.00 46.02 133.00 L 560.13 133.00 Q 565.00 133.00 569.05 130.30 L 570.65 129.23 Q 574.00 127.00 575.80 123.40 L 576.20 122.60 Q 578.00 119.00 578.98 115.10 L 587.30 81.79 Q 589.00 75.00 582.36 72.79 L 580.64 72.21 Q 574.00 70.00 568.62 65.52 L 566.33 63.61 Q 562.00 60.00 559.30 55.05 L 558.70 53.95 Q 556.00 49.00 555.20 43.42 L 554.90 41.30 Q 554.00 35.00 547.64 34.96 L 401.00 34.04 Q 394.00 34.00 390.12 28.18 L 381.88 15.82 Q 378.00 10.00 372.62 5.52 L 371.38 4.48 Q 366.00 0.00 359.00 0.00 L 245.78 0.00 Z';

// Where the tab ends and the banner's own top edge begins, in trace-space y (see agent_instructions).
const BANNER_TOP_Y = 35;
const TOP_BAND_Y = 35;
const TOP_BAND_H = 9;
const BOTTOM_BAND_H = 9;
const INDENT_X = 268;
const INDENT_Y = 9;
const INDENT_W = 70;
const INDENT_H = 18;

export const GamePlaqueAltC: React.FC<GamePlaqueAltProps> = ({
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
  const clipId = `game-plaque-altc-clip-${uniqueId}`;
  const labelTopFraction = (BANNER_TOP_Y * 0.32) / TRACE_H;

  return (
    <div ref={containerRef} className={`relative inline-flex select-none ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        width={W}
        height={H}
        viewBox={`0 0 ${TRACE_W} ${TRACE_H}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id={clipId}>
            <path d={OUTLINE_PATH} />
          </clipPath>
        </defs>

        {shadowOffset > 0 && (
          <path
            d={OUTLINE_PATH}
            fill={shadowColor}
            transform={`translate(0, ${(shadowOffset / H) * TRACE_H})`}
          />
        )}

        <path d={OUTLINE_PATH} fill={faceColor} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />

        <g clipPath={`url(#${clipId})`}>
          <rect x={0} y={TOP_BAND_Y} width={TRACE_W} height={TOP_BAND_H} fill={topBandColor} />
          <rect x={0} y={TRACE_H - BOTTOM_BAND_H} width={TRACE_W} height={BOTTOM_BAND_H} fill={bottomBandColor} />
        </g>

        {label && (
          <rect x={INDENT_X} y={INDENT_Y} width={INDENT_W} height={INDENT_H} rx={INDENT_H / 2} fill={indentColor} />
        )}
      </svg>

      {label && (
        <span
          className="absolute left-1/2 -translate-x-1/2 z-10 font-arcade font-extrabold text-[7px] sm:text-[8px] tracking-widest uppercase leading-none pointer-events-none"
          style={{ top: `${labelTopFraction * 100}%`, color: labelTextColor }}
        >
          {label}
        </span>
      )}

      <div
        className="relative z-10"
        style={{
          paddingTop: (BANNER_TOP_Y / TRACE_H) * H + 8,
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

export default GamePlaqueAltC;
