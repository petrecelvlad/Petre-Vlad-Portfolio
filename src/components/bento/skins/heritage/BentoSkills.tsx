import React from 'react';
import {
  Gamepad2,
  Palette,
  Coins,
  Layout,
  Users,
  BarChart3,
  Search,
  Layers,
  Code2,
  Box,
} from 'lucide-react';
import { SkillsSlotProps } from '../../ports';

// No panel — these sit loose on the wood, like real sticky notes. Six fixed
// washed-out colors, one per slot position (not per skill), so the same
// slot always reads the same color across projects. Rotations are fixed
// per slot too, not randomized per render, so the layout doesn't jitter on
// re-render/HMR.
const NOTE_COLORS = ['#F5E9A8', '#F0C9C9', '#BFDCE6', '#C9DFB2', '#F2CDA0', '#D8C7E3'];
const NOTE_ROTATIONS = [-4, 3, -2, 4, -3, 2];

// Same standardized "glossy bump" light-source treatment used on the
// clipboard's binder clip and board (BentoResponsibilities.tsx's
// glossyStops/GLOSS_*_PCT) — lighter tint at the top, darker at the bottom,
// same two percentages — reused here per Vlad's direction that the effect
// should carry over to future elements, not stay a one-off.
const GLOSS_LIGHTEN_PCT = 35;
const GLOSS_DARKEN_PCT = 20;
function glossyBackground(hex: string) {
  return `linear-gradient(to bottom, color-mix(in srgb, ${hex} 100%, white ${GLOSS_LIGHTEN_PCT}%) 0%, ${hex} 55%, color-mix(in srgb, ${hex} 100%, black ${GLOSS_DARKEN_PCT}%) 100%)`;
}

// image.png's reference sheet varies the embellishment per note (tape,
// thumbtack, paperclip, folded corner). Current direction (Vlad, 2026-07-23):
// every note is a fold now, tape/pin/clip disabled — not deleted, so they're
// a one-line revert (change NOTE_EFFECTS back) if a future pass wants the mix
// again. PIN_COLORS/TapeCorner/PinTack/PaperClip below are unused while this
// holds.
type NoteEffect = 'tape' | 'pin' | 'clip' | 'fold';
const NOTE_EFFECTS: NoteEffect[] = ['fold', 'fold', 'fold', 'fold', 'fold', 'fold'];
const PIN_COLORS = ['#B8483F', '#3D6B8C', '#B8483F', '#3D6B8C', '#B8483F', '#3D6B8C'];

// Which corner each note's fold sits in — fixed per slot position, same
// reasoning as NOTE_ROTATIONS (a real per-render random would jitter on
// every re-render/HMR). Deliberately not all the same corner, so six folded
// notes in a row don't read as one repeated stamp.
type FoldCorner = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
const NOTE_FOLD_CORNERS: FoldCorner[] = [
  'bottom-left',
  'top-right',
  'bottom-right',
  'top-left',
  'top-right',
  'bottom-left',
];

function getIcon(skill: string) {
  const s = skill.toLowerCase();
  if (s.includes('game design')) return <Gamepad2 />;
  if (s.includes('economy')) return <Palette />;
  if (s.includes('monetization')) return <Coins />;
  if (s.includes('product')) return <Box />;
  if (s.includes('ux') || s.includes('layout')) return <Layout />;
  if (s.includes('team') || s.includes('management')) return <Users />;
  if (s.includes('marketing') || s.includes('analysis')) return <BarChart3 />;
  if (s.includes('research')) return <Search />;
  if (s.includes('level design')) return <Layers />;
  if (s.includes('blockchain') || s.includes('code')) return <Code2 />;
  return <Box />;
}

// Re-derived from raw pixel sampling of image.png (GetPixel grids at the
// actual corner, not a visual guess) on BOTH reference notes — orange
// (bottom-left fold) and purple (bottom-right fold, mirrored). Both share
// one structure: take the corner's [0-F%] x [(100-F)-100%] rectangle (F =
// FOLD_SIZE). Split it by the diagonal running corner-to-corner across that
// rectangle. The half AWAY from the true corner, flush against the note's
// own remaining edge, is a solid darker flap. The half AT the true corner is
// cut away from the note's own silhouette entirely, revealing whatever sits
// behind the note (the desk). Earlier attempts inverted this — flap at the
// corner, gap next to the note body — which reads as a stain, not a lifted
// corner. So: the front layer is clipped to a plain rectangular notch (the
// diagonal lives entirely on the flap piece, not here), and a separate flap
// div, clipped to the diagonal triangle, sits behind it, filling only the
// half nearer the note body. FOLD_CLIPS below is that same pair of shapes
// mirrored/rotated into each of the 4 corners so any note can fold in any
// corner — bottom-left is the one actually measured from the reference, the
// other three are its reflections, not independently re-derived.
const FOLD_SIZE = 20;
const F = FOLD_SIZE;
const R = 100 - FOLD_SIZE;
const FOLD_CLIPS: Record<FoldCorner, { notch: string; flap: string }> = {
  'bottom-left': {
    notch: `polygon(0% 0%, 100% 0%, 100% 100%, ${F}% 100%, ${F}% ${R}%, 0% ${R}%)`,
    flap: `polygon(0% ${R}%, ${F}% ${R}%, ${F}% 100%)`,
  },
  'bottom-right': {
    notch: `polygon(0% 0%, 100% 0%, 100% ${R}%, ${R}% ${R}%, ${R}% 100%, 0% 100%)`,
    flap: `polygon(${R}% ${R}%, 100% ${R}%, ${R}% 100%)`,
  },
  'top-left': {
    notch: `polygon(${F}% 0%, 100% 0%, 100% 100%, 0% 100%, 0% ${F}%, ${F}% ${F}%)`,
    flap: `polygon(0% ${F}%, ${F}% ${F}%, ${F}% 0%)`,
  },
  'top-right': {
    notch: `polygon(0% 0%, ${R}% 0%, ${R}% ${F}%, 100% ${F}%, 100% 100%, 0% 100%)`,
    flap: `polygon(${R}% 0%, ${R}% ${F}%, 100% ${F}%)`,
  },
};

function FoldFlap({ color, corner }: { color: string; corner: FoldCorner }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        clipPath: FOLD_CLIPS[corner].flap,
        backgroundColor: `color-mix(in srgb, ${color} 100%, black 25%)`,
      }}
      aria-hidden
    />
  );
}

function TapeCorner({ rotation }: { rotation: number }) {
  return (
    <div
      className="absolute -top-2 left-1/2 -translate-x-1/2 w-9 h-4 bg-white/50 border border-white/70"
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-hidden
    />
  );
}

function PinTack({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 20 24"
      className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-6 drop-shadow-sm"
      aria-hidden
    >
      <ellipse cx="10" cy="19" rx="2.5" ry="1" fill="black" opacity="0.2" />
      <path d="M10 12 L10 19" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="8" r="6" fill={color} />
      <circle cx="7.5" cy="5.5" r="2" fill="white" opacity="0.4" />
    </svg>
  );
}

function PaperClip() {
  return (
    <svg
      viewBox="0 0 20 26"
      className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-5 drop-shadow-sm"
      aria-hidden
    >
      <path
        d="M6 12 V6 a4 4 0 0 1 8 0 v11 a2.5 2.5 0 0 1 -5 0 V9"
        fill="none"
        stroke="#8B93A0"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface StickyNoteProps {
  key?: React.Key;
  color: string;
  rotation: number;
  skill?: string;
  active: boolean;
  effect: NoteEffect;
  pinColor: string;
  foldCorner: FoldCorner;
}

function StickyNote({ color, rotation, skill, active, effect, pinColor, foldCorner }: StickyNoteProps) {
  const isFold = active && effect === 'fold';
  return (
    <div
      className="relative w-[124px] h-[124px] md:w-[148px] md:h-[148px] flex-shrink-0"
      style={{
        transform: `rotate(${rotation}deg)`,
        // clip-path (the fold notch) clips away box-shadow along with it, so
        // the notched variant needs filter: drop-shadow() instead — same
        // incompatibility documented for the clipboard's torn photo frame.
        filter: isFold ? 'drop-shadow(0 5px 6px rgba(43, 32, 22, 0.35))' : undefined,
      }}
    >
      {isFold && <FoldFlap color={color} corner={foldCorner} />}

      <div
        className={`relative z-10 w-full h-full flex flex-col items-center justify-center gap-1 p-1.5 ${
          active ? '' : 'border border-dashed border-ink-base/25'
        }`}
        style={{
          background: active ? glossyBackground(color) : 'transparent',
          clipPath: isFold ? FOLD_CLIPS[foldCorner].notch : undefined,
          boxShadow: active && !isFold ? '0 6px 12px -2px rgba(43, 32, 22, 0.35)' : 'none',
        }}
      >
        {active && skill && (
          <>
            <div className="text-ink-base flex-shrink-0">
              {React.cloneElement(getIcon(skill) as React.ReactElement, { size: 18, strokeWidth: 2 })}
            </div>
            <span
              style={{ fontFamily: 'var(--font-hand)' }}
              className="text-[11px] leading-[1.05] text-ink-base text-center line-clamp-2"
            >
              {skill}
            </span>
          </>
        )}

        {active && effect === 'tape' && <TapeCorner rotation={rotation >= 0 ? -6 : 6} />}
        {active && effect === 'pin' && <PinTack color={pinColor} />}
        {active && effect === 'clip' && <PaperClip />}
      </div>
    </div>
  );
}

export function BentoSkills({ skills }: SkillsSlotProps) {
  const displaySkills = skills.slice(0, 6);
  const slots = Array.from({ length: 6 }, (_, i) => displaySkills[i]);

  return (
    <div className="flex flex-col items-center gap-2 md:gap-3 py-2">
      {/* SKILLS label — a handwritten tag planted above the row, not
          wedged between two halves of it (that read as two separate
          groups of three notes rather than one set of six). */}
      <span
        style={{ fontFamily: 'var(--font-hand)' }}
        className="flex-shrink-0 rotate-[-2deg] text-xl md:text-2xl font-bold text-ink-base px-1"
      >
        Skills
      </span>

      <div className="grid grid-cols-6 w-full place-items-center gap-1 md:gap-2">
        {slots.map((skill, i) => (
          <StickyNote
            key={i}
            color={NOTE_COLORS[i]}
            rotation={NOTE_ROTATIONS[i]}
            skill={skill}
            active={!!skill}
            effect={NOTE_EFFECTS[i]}
            pinColor={PIN_COLORS[i]}
            foldCorner={NOTE_FOLD_CORNERS[i]}
          />
        ))}
      </div>
    </div>
  );
}
