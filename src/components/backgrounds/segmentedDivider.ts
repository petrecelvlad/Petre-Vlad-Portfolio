/**
 * @propolis
 * {
 *   "role": "UTILITY",
 *   "constraints": ["Pure functions only — no DOM, no React, no side effects"],
 *   "agent_instructions": "Direct JS port of the jagged comic-panel-divider math that used to live in Segmented3ShaderBackground.tsx's GLSL fragment shader (see git history for the removed WebGL version). The GL version evaluated this per-fragment with uv.y in [0,1] bottom-origin; buildEdgeSamples() converts a top-origin screen-space y into that same convention so the curve shape matches exactly."
 * }
 */

export interface EdgeSample {
  x: number;
  y: number;
}

function fract(x: number): number {
  return x - Math.floor(x);
}

function mix(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function hash11(p: number): number {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

function cellDrift(c: number, seed: number, time: number): number {
  const f1 = 0.35 + hash11(c * 3.13 + seed * 7.71) * 0.75;
  const p1 = hash11(c * 7.31 + seed * 13.91) * 6.28318;
  const f2 = 0.2 + hash11(c * 11.27 + seed * 5.13) * 1.1;
  const p2 = hash11(c * 19.43 + seed * 3.37) * 6.28318;
  return Math.sin(time * f1 + p1) * 0.25 + Math.cos(time * f2 + p2) * 0.18;
}

function cellTilt(c: number, seed: number, time: number): number {
  const f1 = 0.4 + hash11(c * 5.17 + seed * 3.31) * 0.8;
  const p1 = hash11(c * 13.11 + seed * 9.77) * 6.28318;
  const f2 = 0.25 + hash11(c * 8.91 + seed * 11.23) * 0.9;
  const p2 = hash11(c * 17.37 + seed * 2.19) * 6.28318;
  return Math.sin(time * f1 + p1) * 0.8 + Math.cos(time * f2 + p2) * 0.5;
}

/** Fractional horizontal offset (in the same units as edge1/edge2's 0.30/0.70 base) at GL-space y, seed, and elapsed time. */
export function jaggedLineOffset(y: number, seed: number, time: number): number {
  const warpedY = y * 3.2 + Math.sin(y * 1.8 + seed * 3.1) * 0.95 + Math.cos(y * 4.3 - seed * 2.7) * 0.45 + seed;
  const cell = Math.floor(warpedY);
  const f = fract(warpedY);

  const x0 = hash11(cell + seed * 17.1) - 0.5;
  const x1 = hash11(cell + 1 + seed * 17.1) - 0.5;

  const drift0 = cellDrift(cell, seed, time);
  const drift1 = cellDrift(cell + 1, seed, time);

  const tilt0 = cellTilt(cell, seed, time);
  const tilt1 = cellTilt(cell + 1, seed, time);

  const seg0 = (x0 + drift0) * 0.0045 + (f - 0.5) * tilt0 * 0.0035;
  const seg1 = (x1 + drift1) * 0.0045 + (f - 1 - 0.5) * tilt1 * 0.0035;

  const kinkPoint = 0.65 + (hash11(cell * 5.3 + seed * 9.1) - 0.5) * 0.35;
  const kinkWidth = 0.025;
  const k = smoothstep(kinkPoint - kinkWidth, kinkPoint + kinkWidth, f);

  return mix(seg0, seg1, k);
}

/**
 * Samples one jagged divider curve top-to-bottom in a `size`×`size` SVG user-unit
 * square, converting screen-space (top-origin) y into the GL convention (bottom-origin)
 * the original shader's math was written against.
 */
export function buildEdgeSamples(baseX: number, seed: number, time: number, steps: number, size: number): EdgeSample[] {
  const samples: EdgeSample[] = [];
  for (let i = 0; i <= steps; i++) {
    const screenY = i / steps;
    const glY = 1 - screenY;
    const offset = jaggedLineOffset(glY, seed, time);
    samples.push({ x: (baseX + offset) * size, y: screenY * size });
  }
  return samples;
}

function toPathD(points: EdgeSample[]): string {
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
}

/** Open stroke path following one edge curve top to bottom. */
export function buildStrokePath(edge: EdgeSample[]): string {
  return toPathD(edge);
}

/** Closed fill shape for the leftmost column: viewBox left border + the edge curve as its right boundary. */
export function buildColumn1FillPath(edge1: EdgeSample[], size: number): string {
  return `${toPathD([{ x: 0, y: 0 }, ...edge1, { x: 0, y: size }])} Z`;
}

/** Closed fill shape for the middle column: bounded by edge1 (left) and edge2 (right). */
export function buildColumn2FillPath(edge1: EdgeSample[], edge2: EdgeSample[], size: number): string {
  return `${toPathD([...edge1, ...[...edge2].reverse()])} Z`;
}
