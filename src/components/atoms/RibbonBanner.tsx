import React, { useState, useEffect, useRef, useId } from 'react';
import { darken } from '@/src/components/bento/shared/palette';

export interface RibbonBannerProps {
  children: React.ReactNode;
  className?: string;
  faceColor?: string;
  highlightColor?: string;
  bottomBandColor?: string;
  tailColor?: string;
  tailShadowColor?: string;
  outlineColor?: string;
  shadowColor?: string;
  strokeWidth?: number;
  shadowOffset?: number;
  foldCreaseColor?: string;
}

/**
 * RibbonBanner: a swallow-tailed ribbon banner — two pointed tails flaring out from behind a
 * rounded main body, flat highlight/shadow bands (no gradients), one continuous dark outline, a
 * hard offset drop shadow. Ported from a model-generated reference
 * (`cone/project/reference/data/samples/candy_banner.md`, its `candy-ribbon` group) with the
 * outline/shadow color swapped to this site's standard `#1C1610` so it matches every other Hero
 * element (`GamePlaque`, `TornPaperPanel`, the EXPLORE button) instead of the reference's own
 * near-black purple.
 */
export const RibbonBanner: React.FC<RibbonBannerProps> = ({
  children,
  className = '',
  faceColor = '#FF2A6D',
  highlightColor = '#FF7EAD',
  bottomBandColor = '#C40047',
  tailColor = '#D81B60',
  tailShadowColor = '#A3003F',
  outlineColor = '#1C1610',
  shadowColor = '#1C1610',
  strokeWidth = 3,
  shadowOffset = 4,
  foldCreaseColor,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 70 });
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

  // Main body occupies the top ~88% of the box; the tails start partway down the main body and
  // extend to the box's own bottom edge (no leftover invisible slack below the shape) — the CSS
  // negative margin used to overlap this onto the paper below is measured from this same box, so
  // any slack here would silently eat into that overlap and undershoot it.
  const bodyH = H * 0.88;
  const rx = bodyH * 0.3;
  // Must stay strictly greater than rx — the tail has to attach along the body's straight right/
  // left edge, after the corner arc has fully resolved, or the fold-crease bevel below would have
  // to splice mid-arc.
  const tailTopY = rx + bodyH * 0.12;
  const tailBottomY = H;

  const tailW = Math.max(24, W * 0.14);
  const overlap = tailW * 0.38; // hidden behind the main body
  const outerTailW = tailW - overlap;
  const notchX = outerTailW * 0.55;

  // A short diagonal — not a hard right angle — where the tail meets the body's straight edge,
  // so it reads as one ribbon folding back rather than two shapes glued at a corner.
  const foldDepth = Math.max(6, (tailTopY - rx) * 0.5);
  const topBevelY = tailTopY - foldDepth;

  const leftTailPath = `M 0 ${tailTopY} L ${tailW} ${tailTopY} L ${tailW} ${tailBottomY} L 0 ${tailBottomY} L ${notchX} ${H / 2} Z`;
  const rightTailPath = `M ${W} ${tailTopY} L ${W - tailW} ${tailTopY} L ${W - tailW} ${tailBottomY} L ${W} ${tailBottomY} L ${W - notchX} ${H / 2} Z`;
  const bodyPath = `M ${overlap + rx} 0 L ${W - overlap - rx} 0 A ${rx} ${rx} 0 0 1 ${W - overlap} ${rx} L ${W - overlap} ${bodyH - rx} A ${rx} ${rx} 0 0 1 ${W - overlap - rx} ${bodyH} L ${overlap + rx} ${bodyH} A ${rx} ${rx} 0 0 1 ${overlap} ${bodyH - rx} L ${overlap} ${rx} A ${rx} ${rx} 0 0 1 ${overlap + rx} 0 Z`;

  // The true merged silhouette of tails + body, walked as one continuous clockwise boundary —
  // this, not the three shapes above, is what ever gets a stroke or casts a shadow. Those three
  // shapes still exist purely as fill/clip masks for the two-tone coloring below.
  const unionOutlinePath = [
    `M ${overlap + rx} 0`,
    `L ${W - overlap - rx} 0`,
    `A ${rx} ${rx} 0 0 1 ${W - overlap} ${rx}`,
    `L ${W - overlap} ${topBevelY}`,
    `L ${W} ${tailTopY}`,
    `L ${W - notchX} ${H / 2}`,
    `L ${W} ${H}`,
    `L ${W - tailW} ${H}`,
    `L ${W - tailW} ${bodyH}`,
    `L ${W - overlap} ${bodyH - rx}`,
    `A ${rx} ${rx} 0 0 1 ${W - overlap - rx} ${bodyH}`,
    `L ${overlap + rx} ${bodyH}`,
    `A ${rx} ${rx} 0 0 1 ${overlap} ${bodyH - rx}`,
    `L ${tailW} ${bodyH}`,
    `L ${tailW} ${H}`,
    `L 0 ${H}`,
    `L ${notchX} ${H / 2}`,
    `L 0 ${tailTopY}`,
    `L ${overlap} ${topBevelY}`,
    `L ${overlap} ${rx}`,
    `A ${rx} ${rx} 0 0 1 ${overlap + rx} 0`,
    'Z',
  ].join(' ');

  const unionClipId = `ribbon-union-clip-${uniqueId}`;
  const bodyClipId = `ribbon-body-clip-${uniqueId}`;
  const leftTailClipId = `ribbon-left-tail-clip-${uniqueId}`;
  const rightTailClipId = `ribbon-right-tail-clip-${uniqueId}`;

  const tailBandY = tailTopY + (tailBottomY - tailTopY) * 0.55;
  const tailBandHeight = (tailBottomY - tailTopY) * 0.45;
  const bandHeight = bodyH * 0.16;
  const creaseColor = foldCreaseColor ?? darken(tailColor, 22);

  return (
    <div ref={containerRef} className={`relative min-h-[56px] sm:min-h-[62px] lg:min-h-[68px] ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id={unionClipId}>
            <path d={unionOutlinePath} />
          </clipPath>
          <clipPath id={bodyClipId}>
            <path d={bodyPath} />
          </clipPath>
          <clipPath id={leftTailClipId}>
            <path d={leftTailPath} />
          </clipPath>
          <clipPath id={rightTailClipId}>
            <path d={rightTailPath} />
          </clipPath>
        </defs>

        {/* Drop shadow — the one merged silhouette, flat color, offset straight down (this site's
            hard offset shadow convention, not a blurred shadow). Exactly one shadow for the whole
            ribbon, not one per piece. */}
        {shadowOffset > 0 && (
          <path d={unionOutlinePath} fill={shadowColor} transform={`translate(0, ${shadowOffset})`} />
        )}

        {/* Base fill + the ONE outline stroke for the entire ribbon (tails + body) — this is what
            makes it read as one molded object instead of three shapes glued together. */}
        <path d={unionOutlinePath} fill={faceColor} stroke={outlineColor} strokeWidth={strokeWidth} strokeLinejoin="round" />

        {/* Recolor the tail zones and their shadow bands — fill only, no stroke, so they never
            introduce a second outline on top of the union stroke above. */}
        <path d={leftTailPath} fill={tailColor} />
        <path d={rightTailPath} fill={tailColor} />
        <g clipPath={`url(#${leftTailClipId})`}>
          <rect x={0} y={tailBandY} width={tailW} height={tailBandHeight} fill={tailShadowColor} />
        </g>
        <g clipPath={`url(#${rightTailClipId})`}>
          <rect x={W - tailW} y={tailBandY} width={tailW} height={tailBandHeight} fill={tailShadowColor} />
        </g>

        {/* Reassert the body's own color on top, fill only — reproduces the original "body drawn
            after tails" z-order as a recolor pass instead of a second stroked shape. */}
        <path d={bodyPath} fill={faceColor} />
        <g clipPath={`url(#${bodyClipId})`}>
          <rect x={0} y={0} width={W} height={bandHeight} fill={highlightColor} />
          <rect x={0} y={bodyH - bandHeight} width={W} height={bandHeight} fill={bottomBandColor} />
        </g>

        {/* Fold-crease accent — a thin flat line along each bevel where a tail meets the body, so
            it reads as the ribbon material folding back rather than two pieces touching. Clipped
            to the true silhouette so it can never escape it. */}
        <g clipPath={`url(#${unionClipId})`} stroke={creaseColor} strokeWidth={1.5} strokeLinecap="round" opacity={0.55}>
          <line x1={overlap} y1={topBevelY} x2={0} y2={tailTopY} />
          <line x1={W - overlap} y1={topBevelY} x2={W} y2={tailTopY} />
        </g>
      </svg>

      {/* Centered within the pink main body's own bounds (0..bodyH), not the full box — the box
          extends past bodyH only to fit the tails' overshoot, and centering against the full box
          would visibly push the text upward off the body's true center. */}
      <div
        className="absolute left-0 top-0 z-10 w-full flex items-center justify-center"
        style={{
          height: bodyH,
          paddingLeft: tailW * 0.9,
          paddingRight: tailW * 0.9,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default RibbonBanner;
