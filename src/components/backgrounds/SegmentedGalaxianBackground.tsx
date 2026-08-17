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
 *     "SVG/CSS only — no WebGL. Replaces the removed Segmented3ShaderBackground for the galaxian look.",
 *     "The `d` attributes of the jagged-boundary paths are set imperatively via refs every rAF tick, bypassing React state, to avoid a 60fps re-render."
 *   ],
 *   "agent_instructions": "pass='full' renders column 1 only — CloudColumnBackground (a self-contained parallax cloud scene), clipped by the animated edge1 curve. pass='overlay' renders column 2 (gradient wash + sunburst rays + halftone dots) plus both divider strokes, meant to sit above FloatingIslandBackdrop so the strokes and column 2 art stay crisp over it — mirrors the two-layer placement Hero.tsx already used for the WebGL version. Column 3 is intentionally left empty in both passes: GalaxianBackground.tsx renders there instead."
 * }
 */

const SIZE = 1000;
const STEPS = 48;
const EDGE1_BASE = 0.3;
const EDGE2_BASE = 0.7;

// Precomputed at module load (time=0), so the very first paint already has real
// geometry instead of an empty path — avoids the second-paint "pop in" that
// happens if a clip/stroke path starts with no `d` and waits for an effect to set one.
const INITIAL_EDGE1 = buildEdgeSamples(EDGE1_BASE, 0.0, 0, STEPS, SIZE);
const INITIAL_EDGE2 = buildEdgeSamples(EDGE2_BASE, 4.5, 0, STEPS, SIZE);
const INITIAL_COL1_D = buildColumn1FillPath(INITIAL_EDGE1, SIZE);
const INITIAL_COL2_D = buildColumn2FillPath(INITIAL_EDGE1, INITIAL_EDGE2, SIZE);
const INITIAL_EDGE1_STROKE_D = buildStrokePath(INITIAL_EDGE1);
const INITIAL_EDGE2_STROKE_D = buildStrokePath(INITIAL_EDGE2);

interface SegmentedGalaxianBackgroundProps {
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

export function SegmentedGalaxianBackground({ pass = 'full', className = '', isVisible = true }: SegmentedGalaxianBackgroundProps) {
  const isVisibleRef = useRef(isVisible);
  isVisibleRef.current = isVisible;

  const containerRef = useRef<HTMLDivElement>(null);
  // Hero is never square, and the outer <svg preserveAspectRatio="none"> stretches its
  // 1000x1000 viewBox non-uniformly to fill it — CloudColumnBackground needs the real
  // rendered aspect ratio to cancel that stretch out, or its pixel-art clouds skew.
  const [containerAspect, setContainerAspect] = useState(0.5);

  const col1PathRef = useRef<SVGPathElement>(null);
  const edge1StrokeRef = useRef<SVGPathElement>(null);
  const col2PathRef = useRef<SVGPathElement>(null);
  const edge2StrokeRef = useRef<SVGPathElement>(null);

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

  useEffect(() => {
    let animationFrameId: number;
    const startTime = performance.now();

    const tick = () => {
      if (!isVisibleRef.current) {
        animationFrameId = requestAnimationFrame(tick);
        return;
      }

      const time = (performance.now() - startTime) * 0.001;
      const edge1 = buildEdgeSamples(EDGE1_BASE, 0.0, time, STEPS, SIZE);

      if (pass === 'full') {
        if (col1PathRef.current) col1PathRef.current.setAttribute('d', buildColumn1FillPath(edge1, SIZE));
      } else {
        const edge2 = buildEdgeSamples(EDGE2_BASE, 4.5, time, STEPS, SIZE);
        if (col2PathRef.current) col2PathRef.current.setAttribute('d', buildColumn2FillPath(edge1, edge2, SIZE));
        if (edge1StrokeRef.current) edge1StrokeRef.current.setAttribute('d', buildStrokePath(edge1));
        if (edge2StrokeRef.current) edge2StrokeRef.current.setAttribute('d', buildStrokePath(edge2));
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();
    return () => cancelAnimationFrame(animationFrameId);
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

          {pass === 'full' && <clipPath id="segCol1Clip"><path ref={col1PathRef} d={INITIAL_COL1_D} /></clipPath>}
          {pass === 'overlay' && (
            <>
              <linearGradient id="segCol2Grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0A" />
                <stop offset="100%" stopColor="#D97505" />
              </linearGradient>
              <pattern id="segHalftone" width="25" height="25" patternUnits="userSpaceOnUse">
                <circle cx="12.5" cy="12.5" r="5.5" fill="#FFF2B3" fillOpacity="0.08" />
              </pattern>
              <clipPath id="segCol2Clip"><path ref={col2PathRef} d={INITIAL_COL2_D} /></clipPath>
            </>
          )}
        </defs>

        {pass === 'full' && (
          <g clipPath="url(#segCol1Clip)">
            <CloudColumnBackground visibleWidthFraction={EDGE1_BASE} containerAspect={containerAspect} />
          </g>
        )}

        {pass === 'overlay' && (
          <>
            <rect width={SIZE} height={SIZE} fill="url(#segCol2Grad)" clipPath="url(#segCol2Clip)" />
            <g clipPath="url(#segCol2Clip)">
              <g className="seg-rays">
                {rayWedges.map((d, i) => (
                  <path key={i} d={d} fill="#FFF2B3" fillOpacity={0.15} />
                ))}
              </g>
              <rect width={SIZE} height={SIZE} fill="url(#segHalftone)" />
            </g>
            <path ref={edge1StrokeRef} d={INITIAL_EDGE1_STROKE_D} stroke="#000000" strokeWidth={8} fill="none" vectorEffect="non-scaling-stroke" />
            <path ref={edge2StrokeRef} d={INITIAL_EDGE2_STROKE_D} stroke="#000000" strokeWidth={8} fill="none" vectorEffect="non-scaling-stroke" />
          </>
        )}
      </svg>
    </div>
  );
}
