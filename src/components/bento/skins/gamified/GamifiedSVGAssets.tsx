import React from 'react';

/**
 * Corner bracket geometry — parametric, not hand-scaled.
 *
 * Two rounds of resizing this bracket by scaling the whole SVG (64px, then 40px)
 * both missed, because scaling stretches two unrelated things together: the
 * rounded apex (which has exactly one correct value — it must match
 * GamifiedBoard's own frame radius, --radius-lg, 16px, or the cap won't hug the
 * frame's real corner) and the arm reach (a pure style choice, no formula for it).
 * Below, CORNER_RADIUS is pinned to the frame's actual radius so the apex is
 * always correct regardless of size; CORNER_REACH is the one number to adjust
 * if the overall footprint still isn't right — everything else (thickness,
 * rivet placement, all 4 mirrored corners) is derived from these 3 constants,
 * not re-drawn by hand each time.
 */
const CORNER_RADIUS = 16; // must match GamifiedBoard's rounded-[var(--radius-lg)] (Token_Contract.md §09)
const CORNER_REACH = 38; // interpolated from the two rejected sizes (64px "too big", 40px "too small") — the one value to re-tune if still off
const CORNER_THICKNESS = Math.round(CORNER_REACH * (18 / 44)); // keeps the original artwork's arm-thickness-to-reach ratio
const FRAME_BORDER_WIDTH = 4; // GamifiedBoard's outer frame border-[4px]
const INNER_RADIUS = CORNER_RADIUS - FRAME_BORDER_WIDTH; // the panel's own inner border curve — CSS renders a rounded border's inner edge at (outer radius − border width), so this is what "the inside of the panel's border" actually curves at
const FRAME_PADDING = 16; // GamifiedBoard's frame also has p-3 md:p-4 BEFORE the cork div starts — the visible brown band is border + padding, not the border alone; using the md:p-4 (16px) value as the representative size
const FRAME_VISUAL_DEPTH = FRAME_BORDER_WIDTH + FRAME_PADDING; // the actual width of the visible wooden band the rivets need to center on
const CORNER_PAD = 2; // breathing room around the shape so the 2.5px stroke never clips against the SVG edge
const CORNER_SIZE = CORNER_REACH + CORNER_PAD * 2; // render size in px — viewBox and width/height both use this, 1:1 scale, so CORNER_RADIUS always renders as exactly 16px
const METAL_COLOR = '#64748B'; // matches GamifiedParchmentPanel.tsx's hanging-bar rivets exactly — one shiny steel tone across both panels, not two distinct metal materials

type Corner = 'tl' | 'tr' | 'bl' | 'br';

function mirror([x, y]: [number, number], corner: Corner): [number, number] {
  const px = x + CORNER_PAD;
  const py = y + CORNER_PAD;
  const mx = corner === 'tr' || corner === 'br' ? CORNER_SIZE - px : px;
  const my = corner === 'bl' || corner === 'br' ? CORNER_SIZE - py : py;
  return [mx, my];
}

/** Stepped-L bracket path, generalized from the original hand-authored top-left
 * artwork (`M 0,44 L 26,44 L 26,26 L 44,26 L 44,0 L 16,0 C 6,0 0,6 0,16 Z` when
 * radius=16/reach=44/thickness=18 — confirmed to reproduce exactly). The apex
 * arc's control-point ratio (radius × 0.375) is a standard single-cubic-bezier
 * circular-arc approximation (control point = corner + 0.375×(endpoint − corner)),
 * not a magic number — it holds for any radius and any corner (convex or concave).
 *
 * The inner notch (where the two arms meet) used to be a sharp 90° corner, so it
 * didn't overlap the panel's own inner border curve the way the outer apex overlaps
 * the panel's outer curve. Rounded it with the same construction, mirrored: this is
 * a CONCAVE corner (the curve bulges toward the vertex, into the notch, not away from
 * it like the convex apex does), but it's the identical formula relative to its own
 * corner point (the vertex), so no arc-flag/sweep-direction reasoning was needed —
 * just the same "corner + 0.375×(endpoint − corner)" rule applied to a different
 * corner point, which stays correct under mirroring for free. */
function buildCornerBracketPath(corner: Corner): string {
  const innerReach = CORNER_REACH - CORNER_THICKNESS;
  const outerArcCtrl = CORNER_RADIUS * 0.375;
  const innerArcCtrl = INNER_RADIUS * 0.375;

  const [p0x, p0y] = mirror([0, CORNER_REACH], corner);
  const [p1x, p1y] = mirror([innerReach, CORNER_REACH], corner);
  const [p1bx, p1by] = mirror([innerReach, innerReach + INNER_RADIUS], corner);
  const [ic1x, ic1y] = mirror([innerReach, innerReach + innerArcCtrl], corner);
  const [ic2x, ic2y] = mirror([innerReach + innerArcCtrl, innerReach], corner);
  const [p2bx, p2by] = mirror([innerReach + INNER_RADIUS, innerReach], corner);
  const [p3x, p3y] = mirror([CORNER_REACH, innerReach], corner);
  const [p4x, p4y] = mirror([CORNER_REACH, 0], corner);
  const [p5x, p5y] = mirror([CORNER_RADIUS, 0], corner);
  const [c1x, c1y] = mirror([outerArcCtrl, 0], corner);
  const [c2x, c2y] = mirror([0, outerArcCtrl], corner);
  const [exx, exy] = mirror([0, CORNER_RADIUS], corner);

  return `M ${p0x},${p0y} L ${p1x},${p1y} L ${p1bx},${p1by} C ${ic1x},${ic1y} ${ic2x},${ic2y} ${p2bx},${p2by} L ${p3x},${p3y} L ${p4x},${p4y} L ${p5x},${p5y} C ${c1x},${c1y} ${c2x},${c2y} ${exx},${exy} Z`;
}

/** Both rivets sit on the actual visible wooden band's centerline, one per arm.
 * Corrected twice now: first attempt centered on the bracket's own 16px arm
 * thickness (too deep into the interior). Second attempt centered on just
 * FRAME_BORDER_WIDTH (4px) — overcorrected, landing almost on the outer edge,
 * further from the true centerline than the first attempt. The actual visible
 * wood band is border-width PLUS the frame's own padding (`p-3 md:p-4`) before
 * the cork div begins — FRAME_VISUAL_DEPTH accounts for both. */
function getRivetPositions(corner: Corner): { horizontal: [number, number]; vertical: [number, number] } {
  const bandCenter = FRAME_VISUAL_DEPTH / 2;
  const horizontal = mirror([(CORNER_RADIUS + CORNER_REACH) / 2, bandCenter], corner);
  const vertical = mirror([bandCenter, (CORNER_RADIUS + CORNER_REACH) / 2], corner);
  return { horizontal, vertical };
}

const INNER_DETAIL_MARGIN = 4; // kept from the previous pass, unrelated to this fix

/** Dashed inset line echoing the outer bracket's own step shape, pulled inward
 * by a fixed margin — same generalization approach as the main path, reproduces
 * the original artwork's `M 4,40 L 22,40 L 22,22 L 40,22 L 40,4` exactly at
 * radius=16/reach=44/thickness=18. This line is a concentric inset of the main
 * path by INNER_DETAIL_MARGIN, so its own notch corner shrinks by that same
 * margin (INNER_RADIUS − m) instead of reusing INNER_RADIUS directly — same
 * rounding construction as the main path's notch, just at the smaller radius
 * that keeps the two curves reading as parallel/concentric rather than one
 * rounded and one still sharp. */
function buildInnerDetailPath(corner: Corner): string {
  const innerReach = CORNER_REACH - CORNER_THICKNESS;
  const m = INNER_DETAIL_MARGIN;
  const dashRadius = INNER_RADIUS - m;
  const dashArcCtrl = dashRadius * 0.375;
  const notchX = innerReach - m;
  const notchY = innerReach - m;

  const [p0x, p0y] = mirror([m, CORNER_REACH - m], corner);
  const [p1x, p1y] = mirror([notchX, CORNER_REACH - m], corner);
  const [p1bx, p1by] = mirror([notchX, notchY + dashRadius], corner);
  const [c1x, c1y] = mirror([notchX, notchY + dashArcCtrl], corner);
  const [c2x, c2y] = mirror([notchX + dashArcCtrl, notchY], corner);
  const [p2bx, p2by] = mirror([notchX + dashRadius, notchY], corner);
  const [p3x, p3y] = mirror([CORNER_REACH - m, notchY], corner);
  const [p4x, p4y] = mirror([CORNER_REACH - m, m], corner);

  return `M ${p0x},${p0y} L ${p1x},${p1y} L ${p1bx},${p1by} C ${c1x},${c1y} ${c2x},${c2y} ${p2bx},${p2by} L ${p3x},${p3y} L ${p4x},${p4y}`;
}

const POSITION_CLASS: Record<Corner, string> = {
  tl: 'absolute -top-1.5 -left-1.5',
  tr: 'absolute -top-1.5 -right-1.5',
  bl: 'absolute -bottom-1.5 -left-1.5',
  br: 'absolute -bottom-1.5 -right-1.5',
};

function CornerBracket({ corner }: { corner: Corner }) {
  const d = buildCornerBracketPath(corner);
  const innerDetailD = buildInnerDetailPath(corner);
  const { horizontal, vertical } = getRivetPositions(corner);

  return (
    <svg
      className={`${POSITION_CLASS[corner]} pointer-events-none z-20`}
      style={{ width: CORNER_SIZE, height: CORNER_SIZE }}
      viewBox={`0 0 ${CORNER_SIZE} ${CORNER_SIZE}`}
    >
      <path d={d} fill={METAL_COLOR} stroke="#1C1610" strokeWidth="2.5" />
      <path d={innerDetailD} fill="none" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 2" opacity="0.75" />

      <circle cx={horizontal[0]} cy={horizontal[1]} r="3.5" fill={METAL_COLOR} stroke="#1C1610" strokeWidth="1.5" />
      <line x1={horizontal[0]} y1={horizontal[1] - 2} x2={horizontal[0]} y2={horizontal[1] + 2} stroke="#1C1610" strokeWidth="1.2" />

      <circle cx={vertical[0]} cy={vertical[1]} r="3.5" fill={METAL_COLOR} stroke="#1C1610" strokeWidth="1.5" />
      <line x1={vertical[0] - 2} y1={vertical[1]} x2={vertical[0] + 2} y2={vertical[1]} stroke="#1C1610" strokeWidth="1.2" />
    </svg>
  );
}

export function SteelCornerBrackets() {
  return (
    <>
      <CornerBracket corner="tl" />
      <CornerBracket corner="tr" />
      <CornerBracket corner="bl" />
      <CornerBracket corner="br" />
    </>
  );
}
