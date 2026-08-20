import { useEffect, useMemo, useRef, useState } from 'react';
import {
  buildColumn1FillPath,
  buildColumn2FillPath,
  buildEdgeSamples,
  buildStrokePath,
} from './segmentedDivider';
import { CloudColumnBackground } from './CloudColumnBackground';

/**
 * @propolis
 * {
 *   "role": "COMPONENT",
 *   "constraints": [
 *     "SVG/CSS + native SMIL only — no per-frame JavaScript at all, no requestAnimationFrame.",
 *     "The jagged-edge motion is precomputed ONCE at module load into a fixed set of poses across one",
 *     "exact loop period, then handed to the browser's own <animate> (SMIL) engine via a `values` list",
 *     "with the first pose repeated as the last — a mathematically exact loop by construction, not an",
 *     "approximation. The browser interpolates between poses natively; nothing in this file runs per frame."
 *   ],
 *   "agent_instructions": "Middle-ground fork between SegmentedGalaxianBackground.tsx (live per-frame recompute, expensive — see the T-022 measurement: 112 path writes/2s) and SegmentedGalaxianBackgroundLite.tsx (fully frozen, zero motion). This one keeps the organic wave motion but pays for it once at module load instead of every frame. Same pass='full'/'overlay' split and layer meaning as the other two — see SegmentedGalaxianBackground.tsx for the full layout rationale."
 * }
 */

const SIZE = 1000;
const STEPS = 48;
const EDGE1_BASE = 0.3;
const EDGE2_BASE = 0.7;

// The animation's only real parameters: how many distinct poses to precompute, and how long one
// full loop takes. Neither needs to match anything about the underlying wave math exactly — the
// loop is closed by construction (see buildLoopedValues below), not by finding a "true" period.
const POSE_COUNT = 30;
const LOOP_SECONDS = 10;

/** Precomputes POSE_COUNT samples of one edge across [0, LOOP_SECONDS), evenly spaced. */
function buildEdgePoses(baseX: number, seed: number) {
  const poses = [];
  for (let i = 0; i < POSE_COUNT; i++) {
    const time = (i / POSE_COUNT) * LOOP_SECONDS;
    poses.push(buildEdgeSamples(baseX, seed, time, STEPS, SIZE));
  }
  return poses;
}

/** Joins a list of per-pose path strings into a SMIL `values` list, repeating pose 0 at the end
 *  so the animation returns to its exact starting shape — a seamless loop guaranteed by
 *  construction, regardless of whether the underlying wave function is "truly" periodic at
 *  LOOP_SECONDS. */
function buildLoopedValues(pathStrings: string[]): string {
  return [...pathStrings, pathStrings[0]].join(';');
}

const EDGE1_POSES = buildEdgePoses(EDGE1_BASE, 0.0);
const EDGE2_POSES = buildEdgePoses(EDGE2_BASE, 4.5);

const COL1_VALUES = buildLoopedValues(EDGE1_POSES.map((edge) => buildColumn1FillPath(edge, SIZE)));
const COL2_VALUES = buildLoopedValues(EDGE1_POSES.map((edge1, i) => buildColumn2FillPath(edge1, EDGE2_POSES[i], SIZE)));
const EDGE1_STROKE_VALUES = buildLoopedValues(EDGE1_POSES.map((edge) => buildStrokePath(edge)));
const EDGE2_STROKE_VALUES = buildLoopedValues(EDGE2_POSES.map((edge) => buildStrokePath(edge)));

// Static fallback for the very first paint, before the <animate> element's first frame lands —
// same "avoid an empty-path pop-in" reasoning as the other two variants' INITIAL_* constants.
const INITIAL_COL1_D = buildColumn1FillPath(EDGE1_POSES[0], SIZE);
const INITIAL_COL2_D = buildColumn2FillPath(EDGE1_POSES[0], EDGE2_POSES[0], SIZE);
const INITIAL_EDGE1_STROKE_D = buildStrokePath(EDGE1_POSES[0]);
const INITIAL_EDGE2_STROKE_D = buildStrokePath(EDGE2_POSES[0]);

interface SegmentedGalaxianBackgroundLoopedProps {
  pass?: 'full' | 'overlay';
  className?: string;
  isVisible?: boolean;
}

const RAY_COUNT = 12;
const RAY_WIDTH_DEG = 10;

function buildRayWedges(cx: number, cy: number, radius: number): string[] {
  const wedges: string[] = [];
  for (let i = 0; i < RAY_COUNT; i++) {
    const centerDeg = (360 / RAY_COUNT) * i;
    const a0 = ((centerDeg - RAY_WIDTH_DEG / 2) * Math.PI) / 180;
    const a1 = ((centerDeg + RAY_WIDTH_DEG / 2) * Math.PI) / 180;
    const x0 = cx + radius * Math.cos(a0);
    const y0 = cy + radius * Math.sin(a0);
    const x1 = cx + radius * Math.cos(a1);
    const y1 = cy + radius * Math.sin(a1);
    wedges.push(`M${cx},${cy} L${x0.toFixed(1)},${y0.toFixed(1)} L${x1.toFixed(1)},${y1.toFixed(1)} Z`);
  }
  return wedges;
}

export function SegmentedGalaxianBackgroundLooped({ pass = 'full', className = '' }: SegmentedGalaxianBackgroundLoopedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Hero is never square, and the outer <svg preserveAspectRatio="none"> stretches its
  // 1000x1000 viewBox non-uniformly to fill it — CloudColumnBackground needs the real
  // rendered aspect ratio to cancel that stretch out, or its pixel-art clouds skew.
  const [containerAspect, setContainerAspect] = useState(0.5);

  useEffect(() => {
    if (pass !== 'full') return;
    const el = containerRef.current;
    if (!el) return;

    const updateAspect = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) setContainerAspect(rect.height / rect.width);
    };

    updateAspect();
    const observer = new ResizeObserver(updateAspect);
    observer.observe(el);
    return () => observer.disconnect();
  }, [pass]);

  const rayWedges = useMemo(() => buildRayWedges(SIZE * ((EDGE1_BASE + EDGE2_BASE) / 2), SIZE * 0.5, SIZE * 0.6), []);

  return (
    <div ref={containerRef} className={`absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 ${className}`}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} preserveAspectRatio="none" className="absolute inset-0 w-full h-full" aria-hidden>
        <defs>
          <style>{`
            @keyframes segSpin {
              to { transform: rotate(360deg); }
            }
            .seg-rays {
              animation: segSpin 7.85s linear infinite;
              transform-origin: ${(SIZE * (EDGE1_BASE + EDGE2_BASE)) / 2}px ${SIZE * 0.5}px;
            }
          `}</style>

          {pass === 'full' && (
            <clipPath id="segLoopCol1Clip">
              <path d={INITIAL_COL1_D}>
                <animate attributeName="d" values={COL1_VALUES} dur={`${LOOP_SECONDS}s`} repeatCount="indefinite" calcMode="linear" />
              </path>
            </clipPath>
          )}
          {pass === 'overlay' && (
            <>
              <linearGradient id="segLoopCol2Grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0A" />
                <stop offset="100%" stopColor="#D97505" />
              </linearGradient>
              <pattern id="segLoopHalftone" width="25" height="25" patternUnits="userSpaceOnUse">
                <circle cx="12.5" cy="12.5" r="5.5" fill="#FFF2B3" fillOpacity="0.08" />
              </pattern>
              <clipPath id="segLoopCol2Clip">
                <path d={INITIAL_COL2_D}>
                  <animate attributeName="d" values={COL2_VALUES} dur={`${LOOP_SECONDS}s`} repeatCount="indefinite" calcMode="linear" />
                </path>
              </clipPath>
            </>
          )}
        </defs>

        {pass === 'full' && (
          <g clipPath="url(#segLoopCol1Clip)">
            <CloudColumnBackground visibleWidthFraction={EDGE1_BASE} containerAspect={containerAspect} />
          </g>
        )}

        {pass === 'overlay' && (
          <>
            <rect width={SIZE} height={SIZE} fill="url(#segLoopCol2Grad)" clipPath="url(#segLoopCol2Clip)" />
            <g clipPath="url(#segLoopCol2Clip)">
              <g className="seg-rays">
                {rayWedges.map((d, i) => (
                  <path key={i} d={d} fill="#FFF2B3" fillOpacity={0.15} />
                ))}
              </g>
              <rect width={SIZE} height={SIZE} fill="url(#segLoopHalftone)" />
            </g>
            <path d={INITIAL_EDGE1_STROKE_D} stroke="#000000" strokeWidth={8} fill="none" vectorEffect="non-scaling-stroke">
              <animate attributeName="d" values={EDGE1_STROKE_VALUES} dur={`${LOOP_SECONDS}s`} repeatCount="indefinite" calcMode="linear" />
            </path>
            <path d={INITIAL_EDGE2_STROKE_D} stroke="#000000" strokeWidth={8} fill="none" vectorEffect="non-scaling-stroke">
              <animate attributeName="d" values={EDGE2_STROKE_VALUES} dur={`${LOOP_SECONDS}s`} repeatCount="indefinite" calcMode="linear" />
            </path>
          </>
        )}
      </svg>
    </div>
  );
}
