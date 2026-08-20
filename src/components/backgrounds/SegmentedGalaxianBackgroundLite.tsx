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
 *     "SVG/CSS only — no WebGL, no per-frame JS. Performance-test fork of SegmentedGalaxianBackground:",
 *     "identical markup/visuals at a single frozen moment, but the jagged-edge geometry is computed",
 *     "once at module load and never touched again — no requestAnimationFrame loop, no per-frame",
 *     "setAttribute('d', ...) path rewrites. Exists to test whether that per-frame cost was the source",
 *     "of Hero's scroll-in/out sluggishness (see cone/agent/sessions/.../04_SHADER_BAKE_LOOP_AUDIT.md)."
 *   ],
 *   "agent_instructions": "Same pass='full'/'overlay' split and layer meaning as SegmentedGalaxianBackground.tsx — see that file for the full layout rationale. If this variant measurably fixes the sluggishness, consider promoting it (or a cheap CSS-animated version of it) to replace the original rather than keeping both long-term."
 * }
 */

const SIZE = 1000;
const STEPS = 48;
const EDGE1_BASE = 0.3;
const EDGE2_BASE = 0.7;

// Computed once, ever — this is the entire "animation." No rAF loop touches these again.
const EDGE1 = buildEdgeSamples(EDGE1_BASE, 0.0, 0, STEPS, SIZE);
const EDGE2 = buildEdgeSamples(EDGE2_BASE, 4.5, 0, STEPS, SIZE);
const COL1_D = buildColumn1FillPath(EDGE1, SIZE);
const COL2_D = buildColumn2FillPath(EDGE1, EDGE2, SIZE);
const EDGE1_STROKE_D = buildStrokePath(EDGE1);
const EDGE2_STROKE_D = buildStrokePath(EDGE2);

interface SegmentedGalaxianBackgroundLiteProps {
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

export function SegmentedGalaxianBackgroundLite({ pass = 'full', className = '' }: SegmentedGalaxianBackgroundLiteProps) {
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

          {pass === 'full' && <clipPath id="segLiteCol1Clip"><path d={COL1_D} /></clipPath>}
          {pass === 'overlay' && (
            <>
              <linearGradient id="segLiteCol2Grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0A" />
                <stop offset="100%" stopColor="#D97505" />
              </linearGradient>
              <pattern id="segLiteHalftone" width="25" height="25" patternUnits="userSpaceOnUse">
                <circle cx="12.5" cy="12.5" r="5.5" fill="#FFF2B3" fillOpacity="0.08" />
              </pattern>
              <clipPath id="segLiteCol2Clip"><path d={COL2_D} /></clipPath>
            </>
          )}
        </defs>

        {pass === 'full' && (
          <g clipPath="url(#segLiteCol1Clip)">
            <CloudColumnBackground visibleWidthFraction={EDGE1_BASE} containerAspect={containerAspect} />
          </g>
        )}

        {pass === 'overlay' && (
          <>
            <rect width={SIZE} height={SIZE} fill="url(#segLiteCol2Grad)" clipPath="url(#segLiteCol2Clip)" />
            <g clipPath="url(#segLiteCol2Clip)">
              <g className="seg-rays">
                {rayWedges.map((d, i) => (
                  <path key={i} d={d} fill="#FFF2B3" fillOpacity={0.15} />
                ))}
              </g>
              <rect width={SIZE} height={SIZE} fill="url(#segLiteHalftone)" />
            </g>
            <path d={EDGE1_STROKE_D} stroke="#000000" strokeWidth={8} fill="none" vectorEffect="non-scaling-stroke" />
            <path d={EDGE2_STROKE_D} stroke="#000000" strokeWidth={8} fill="none" vectorEffect="non-scaling-stroke" />
          </>
        )}
      </svg>
    </div>
  );
}
