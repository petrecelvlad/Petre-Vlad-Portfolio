import type { Key } from 'react';

export interface InstantPhotoProps {
  key?: Key;
  src: string;
  alt: string;
  rotation?: number;
  /** Controls the outer footprint (size, position) — the atom owns the frame/tape/shadow recipe only. */
  className?: string;
}

// The one shared "instant photo" recipe — white frame with a deeper bottom margin (the
// polaroid tell), a scotch-tape strip pinned at the top only. Used by both the clipboard's
// project icon (skins/heritage/BentoResponsibilities.tsx) and SkillTree's project photos —
// same shape and tape everywhere, callers only vary size/position/rotation via props.
//
// No border anywhere in this component (2026-07-27, per reference: a real instant-photo print
// has no ink outline at all — its edges read purely from shadow). Two separate shadows do that
// job: a soft ambient shadow on the frame (lifts the whole card off whatever it's sitting on)
// and a soft inset shadow on the photo itself (reads as the print sitting slightly recessed
// into the white mat, which is what actually separates "photo" from "frame" without a stroke).
// Deliberately soft/blurred, not the site's usual hard-offset --shadow-raised — that flat-offset
// language is correct for UI cards (WindowCard, badges, etc.) but reads as a drawn-on outline
// here; this is a physical object shadow, not a UI element's, same "opt out of the shared card
// language on purpose" reasoning as the --chrome-device-* lock (Token_Contract.md §13).
const TAPE_ROTATION = -4;
const FRAME_SHADOW = '1.5px 4px 6px rgba(20, 14, 8, 0.3), 0 1px 2px rgba(20, 14, 8, 0.18)';
const PHOTO_INSET_SHADOW = 'inset 0 0 4px rgba(0, 0, 0, 0.35), inset 0 0 0 1px rgba(0, 0, 0, 0.08)';

export function InstantPhoto({ src, alt, rotation = 0, className = '' }: InstantPhotoProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
      title={alt}
    >
      <div
        className="absolute -top-[8%] left-1/2 -translate-x-1/2 w-[38%] aspect-[7/3] bg-white/50 border border-white/70 z-10"
        style={{ transform: `rotate(${TAPE_ROTATION}deg)` }}
        aria-hidden
      />
      <div className="relative w-full h-full bg-white p-[5%] pb-[16%]" style={{ boxShadow: FRAME_SHADOW }}>
        <img src={src} alt={alt} className="w-full h-full object-cover" style={{ boxShadow: PHOTO_INSET_SHADOW }} />
      </div>
    </div>
  );
}
