import { useMemo } from 'react';

/**
 * @propolis
 * {
 *   "role": "COMPONENT",
 *   "constraints": [
 *     "Pure SVG/CSS — no JS animation, no requestAnimationFrame.",
 *     "Ported from cone/project/reference/data/samples/clouds.md — all ids/classes prefixed with `cloud-` so they never collide with a sibling SVG's ids.",
 *     "The nested <svg>'s viewBox aspect ratio must equal the caller's real rendered pixel aspect ratio (containerAspect = height/width), not any fixed value — the outer <svg preserveAspectRatio=\"none\"> that hosts this component stretches its 1000x1000 viewBox non-uniformly onto Hero's actual (non-square, responsive) pixel box, so only matching that real aspect ratio here cancels the stretch back out to uniform. A hardcoded square viewBox looked right by coincidence only when the outer container happened to be square — it isn't, ever, for a landscape hero banner."
 *   ],
 *   "agent_instructions": "Renders inside a clipped <g> that only shows a `visibleWidthFraction` slice of this component's own canvas — the caller (SegmentedGalaxianBackground) fills the whole parent viewBox and then clips down to column 1's width, and reports its own measured containerAspect via ResizeObserver. viewBoxW is chosen so that visibleWidthFraction * viewBoxW covers most of the original 800-wide clouds.md layout (TARGET_VISIBLE_UNITS); viewBoxH = viewBoxW * containerAspect so real-pixel scale is identical on both axes — no skew regardless of Hero's actual width/height at the moment. Every repeating layer (clouds + sparkles) is re-tiled across the resulting viewBoxH via repeatOffsets so the column reads as more, smaller, correctly-proportioned clouds rather than a stretched crop."
 * }
 */

const CONTENT_W = 800;
const REPEAT_UNIT_H = 600;
// How much of the original 800-wide cloud layout should be visible through the column's
// clip — 720/800 = 90%, leaving a small margin so nothing looks abruptly cut off at the edge.
const TARGET_VISIBLE_UNITS = 720;

interface CloudColumnBackgroundProps {
  /** Fraction (0-1) of the parent's viewBox width that survives the caller's clip-path. */
  visibleWidthFraction: number;
  /** The caller's real rendered height/width ratio — required to scale both axes uniformly. */
  containerAspect: number;
}

export function CloudColumnBackground({ visibleWidthFraction, containerAspect }: CloudColumnBackgroundProps) {
  const viewBoxW = useMemo(() => TARGET_VISIBLE_UNITS / visibleWidthFraction, [visibleWidthFraction]);
  const viewBoxH = useMemo(() => viewBoxW * containerAspect, [viewBoxW, containerAspect]);

  // Repeat offsets covering the whole (taller) viewBox, plus one extra unit past each
  // edge so the -600px scroll animation never exposes an uncovered gap at either end.
  const repeatOffsets = useMemo(() => {
    const offsets: number[] = [];
    for (let y = -REPEAT_UNIT_H; y <= viewBoxH + REPEAT_UNIT_H; y += REPEAT_UNIT_H) {
      offsets.push(y);
    }
    return offsets;
  }, [viewBoxH]);

  return (
    <svg
      x={0}
      y={0}
      width="100%"
      height="100%"
      viewBox={`0 0 ${viewBoxW} ${viewBoxH}`}
      preserveAspectRatio="none"
      shapeRendering="crispEdges"
      aria-hidden
    >
      <defs>
        <g id="cloud-cs1">
          <rect x="12" y="0" width="24" height="6" />
          <rect x="6" y="6" width="36" height="6" />
          <rect x="0" y="12" width="48" height="12" />
        </g>
        <g id="cloud-cs2">
          <rect x="12" y="0" width="20" height="6" />
          <rect x="6" y="6" width="42" height="6" />
          <rect x="0" y="12" width="56" height="12" />
        </g>
        <g id="cloud-cs3">
          <rect x="8" y="0" width="16" height="4" />
          <rect x="4" y="4" width="24" height="4" />
          <rect x="0" y="8" width="32" height="8" />
        </g>
        <g id="cloud-cm1">
          <rect x="20" y="0" width="30" height="10" />
          <rect x="10" y="10" width="80" height="10" />
          <rect x="0" y="20" width="110" height="20" />
        </g>
        <g id="cloud-cm2">
          <rect x="20" y="0" width="30" height="10" />
          <rect x="70" y="0" width="30" height="10" />
          <rect x="10" y="10" width="105" height="12" />
          <rect x="0" y="22" width="130" height="23" />
        </g>
        <g id="cloud-cl1">
          <rect x="48" y="0" width="64" height="16" />
          <rect x="24" y="16" width="136" height="16" />
          <rect x="0" y="32" width="192" height="32" />
        </g>
        <g id="cloud-cl2">
          <rect x="48" y="0" width="64" height="16" />
          <rect x="144" y="16" width="48" height="16" />
          <rect x="32" y="16" width="96" height="16" />
          <rect x="16" y="32" width="208" height="16" />
          <rect x="0" y="48" width="240" height="32" />
        </g>
        <g id="cloud-star">
          <rect x="3" y="0" width="3" height="9" />
          <rect x="0" y="3" width="9" height="3" />
        </g>

        <g id="cloud-far-clouds">
          <use href="#cloud-cs1" x="40" y="50" />
          <use href="#cloud-cs2" x="270" y="110" />
          <use href="#cloud-cs3" x="530" y="40" />
          <use href="#cloud-cs1" x="710" y="150" />
          <use href="#cloud-cs2" x="130" y="260" />
          <use href="#cloud-cs3" x="390" y="320" />
          <use href="#cloud-cs1" x="610" y="280" />
          <use href="#cloud-cs2" x="70" y="440" />
          <use href="#cloud-cs3" x="490" y="480" />
          <use href="#cloud-cs1" x="730" y="520" />
          <use href="#cloud-cs2" x="310" y="570" />
        </g>

        <g id="cloud-mid-clouds">
          <use href="#cloud-cm1" x="170" y="30" />
          <use href="#cloud-cm2" x="530" y="90" />
          <use href="#cloud-cm1" x="30" y="210" />
          <use href="#cloud-cm2" x="410" y="270" />
          <use href="#cloud-cm1" x="650" y="390" />
          <use href="#cloud-cm2" x="110" y="470" />
          <use href="#cloud-cm1" x="480" y="530" />
        </g>

        <g id="cloud-near-clouds">
          <use href="#cloud-cl1" x="310" y="30" />
          <use href="#cloud-cl2" x="30" y="180" />
          <use href="#cloud-cl1" x="490" y="330" />
          <use href="#cloud-cl2" x="210" y="480" />
        </g>

        <g id="cloud-sparkles">
          <use href="#cloud-star" x="100" y="80" className="cloud-sp-1" />
          <use href="#cloud-star" x="680" y="120" className="cloud-sp-2" />
          <use href="#cloud-star" x="250" y="240" className="cloud-sp-3" />
          <use href="#cloud-star" x="550" y="350" className="cloud-sp-1" />
          <use href="#cloud-star" x="180" y="480" className="cloud-sp-2" />
          <use href="#cloud-star" x="720" y="520" className="cloud-sp-3" />
        </g>
      </defs>

      <style>{`
        .cloud-bg { fill: #3ca0ee; }

        @keyframes cloudScrollUp {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-${REPEAT_UNIT_H}px); }
        }

        @keyframes cloudPulse {
          0% { opacity: 0.15; }
          100% { opacity: 0.55; }
        }

        .cloud-layer-far { animation: cloudScrollUp 38s linear infinite; fill: #ffffff; opacity: 0.11; }
        .cloud-layer-mid { animation: cloudScrollUp 23s linear infinite; fill: #ffffff; opacity: 0.21; }
        .cloud-layer-near { animation: cloudScrollUp 14s linear infinite; fill: #ffffff; opacity: 0.33; }

        .cloud-sparkle { fill: #ffffff; }
        .cloud-sp-1 { animation: cloudPulse 3s ease-in-out infinite alternate; }
        .cloud-sp-2 { animation: cloudPulse 4s ease-in-out infinite alternate 1.5s; }
        .cloud-sp-3 { animation: cloudPulse 2.5s ease-in-out infinite alternate 0.8s; }
      `}</style>

      <rect className="cloud-bg" width={viewBoxW} height={viewBoxH} />

      <g className="cloud-sparkle">
        {repeatOffsets.map((y) => (
          <use key={y} href="#cloud-sparkles" x="0" y={y} />
        ))}
      </g>

      <g className="cloud-layer-far">
        {repeatOffsets.map((y) => (
          <use key={y} href="#cloud-far-clouds" x="0" y={y} />
        ))}
      </g>

      <g className="cloud-layer-mid">
        {repeatOffsets.map((y) => (
          <use key={y} href="#cloud-mid-clouds" x="0" y={y} />
        ))}
      </g>

      <g className="cloud-layer-near">
        {repeatOffsets.map((y) => (
          <use key={y} href="#cloud-near-clouds" x="0" y={y} />
        ))}
      </g>
    </svg>
  );
}
