import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Text } from '../../../atoms/Text';
import { ResponsibilitiesSlotProps } from '../../ports';
import { formatDateToQuarter } from '@/src/core/domain/formatDate';

const CHUNK_SIZE = 3;
// Sampled from image.png's mockup: the clipboard board is a saturated warm
// peach/kraft tan, distinctly darker and warmer than the near-white paper —
// local to this component, not the shared --color-surface-* tokens (BentoAchievement
// still reads those directly via --role-achievement-accent and doesn't need
// this much contrast).
const BOARD_COLOR = '#E4B77E';
const PAPER_COLOR = '#FDF7E9';
// Bauhaus's own flat shadow (--shadow-raised on every other slot: the
// phone, skills, achievement) is a fully OPAQUE straight-down offset —
// `0 var(--ui-depth) 0 0 #000000` — which is what actually reads as a
// solid grounding line under those elements, not just "a shadow." A
// translucent rgba offset (what this was) never matches that solid-line
// weight regardless of opacity tuning — it has to be fully opaque. This
// mirrors that exact mechanism with heritage's own ink color instead of
// literal black, layered in FRONT of the embossed shadow (box-shadow
// paints first-listed on top; listed behind, it gets masked by the blur).
const UNDERSHADOW = '0 var(--ui-depth) 0px var(--color-ink-base)';
const PAPER_UNDERSHADOW = '2px 2px 0px rgba(43, 32, 22, 0.15)';
// Irregular perimeter (small in/out jitter on all four sides) so the photo
// frame reads as a torn scrap of paper instead of a perfect rectangle.
const TORN_EDGE_CLIP =
  'polygon(2% 5%, 15% 1%, 28% 4%, 42% 0%, 56% 3%, 70% 0%, 85% 4%, 100% 6%, ' +
  '96% 20%, 100% 34%, 95% 48%, 100% 62%, 96% 78%, 100% 94%, ' +
  '88% 97%, 75% 100%, 60% 96%, 46% 100%, 32% 97%, 18% 100%, 4% 96%, ' +
  '0% 82%, 4% 68%, 0% 54%, 5% 40%, 0% 26%, 4% 12%)';
// box-shadow is computed from the box's rectangular geometry, not its
// clip-path — paired with TORN_EDGE_CLIP it was getting clipped away
// entirely (the shadow bleeds outside the polygon's 0-100% area, which
// clip-path treats as outside the rendered region). filter: drop-shadow()
// is the right tool here for a soft depth cue, since it shadows the
// element's actual rendered alpha shape (post-clipping).
//
// This used to also carry a tight all-around (0-offset) blur pair meant to
// double as the "outline" the photo needed to read against PAPER_COLOR —
// pushed larger across several passes (2px -> 5px -> 10-20px blur) with no
// visible improvement each time. Root cause: blur is inherently soft/
// diffuse, so no radius makes it read as a defined line — outline duty now
// belongs to the solid dark shape sitting behind the frame (see the JSX),
// a real stroke made of color contrast, not opacity. This constant is only
// the directional "lifted off the paper" depth cue now, not the outline.
const PHOTO_SHADOW = 'drop-shadow(2.5px 3px 0px rgba(43, 32, 22, 0.3))';
const TAB_ACCENTS = [
  '--role-responsibilities-accent',
  '--color-butter',
  '--color-sky',
  '--color-mint',
];

// Standardized "glossy bump" treatment for this skin — reserved for hard/
// molded surfaces (this clip), never for paper (Vlad, 2026-07-23; see the
// matching note in BentoSkills.tsx for why the sticky notes lost theirs).
// A lighter tint of an element's own base color at the top, a darker tint
// at the bottom, same two percentages everywhere it's used. The board/front
// paper get their depth via --shadow-raised's inset highlight/shadow
// instead (see UNDERSHADOW/PAPER_UNDERSHADOW above) — that's a shadow, not
// gloss, which is exactly why paper doesn't get this treatment.
//
// Previously computed via CSS color-mix(var(--role-...-accent), white/black
// N%) — color-mix() only shipped in Chrome 111 (Mar 2023), and since this
// accent is a CSS custom property (its resolved color isn't known in JS,
// only in the browser's cascade), it can't be precomputed with plain JS
// math the way BentoSkills.tsx's fold-flap tone was. Fixed instead by
// rendering the gloss as a SECOND, translucent copy of the same shape on
// top of the flat-filled base: alpha-compositing a translucent white/black
// layer over an opaque color is mathematically identical to color-mixing
// toward white/black by the same percentage (both reduce to
// base*(1-p) + tint*p), so this reproduces the exact same visual at every
// percentage — over any accent color, without ever needing to resolve it —
// using only gradient stop-opacity, which every SVG-capable browser supports.
const GLOSS_LIGHTEN_PCT = 35;
const GLOSS_DARKEN_PCT = 25;

// Bulldog-clip silhouette: a tapering trapezoid body with a crease line —
// reads as "pinned paper" without a wire-loop handle (which read as a bag).
function BinderClip() {
  const glossId = useId();
  const clipPath = 'M6 2 H50 L38 27 Q28 33 18 27 Z';
  return (
    <svg
      viewBox="0 0 56 32"
      className="absolute -top-[27px] left-1/2 -translate-x-1/2 w-24 h-auto rotate-[-2deg] z-30 drop-shadow-md"
      aria-hidden
    >
      <defs>
        <linearGradient id={glossId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity={GLOSS_LIGHTEN_PCT / 100} />
          <stop offset="45%" stopColor="#fff" stopOpacity={0} />
          <stop offset="100%" stopColor="#000" stopOpacity={GLOSS_DARKEN_PCT / 100} />
        </linearGradient>
      </defs>
      <path
        d={clipPath}
        fill="var(--role-responsibilities-accent)"
        stroke="var(--color-ink-base)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d={clipPath} fill={`url(#${glossId})`} />
      <line x1="13" y1="12" x2="43" y2="12" stroke="var(--color-ink-base)" strokeWidth="2" opacity="0.35" />
    </svg>
  );
}

export function BentoResponsibilities({
  responsibilities,
  role,
  title,
  icon,
  startDate,
  endDate,
}: ResponsibilitiesSlotProps) {
  const [page, setPage] = useState(0);
  const chunks: string[][] = [];
  for (let i = 0; i < responsibilities.length; i += CHUNK_SIZE) {
    chunks.push(responsibilities.slice(i, i + CHUNK_SIZE));
  }
  const totalPages = Math.max(1, chunks.length);
  const activePage = Math.min(page, totalPages - 1);
  const isCover = activePage === 0;

  return (
    <div className="relative h-full pl-1 pr-1" style={{ perspective: 1600 }}>
      <BinderClip />

      {/* Clipboard board — bottom layer, rounded corners, the only rounded
          element in the stack; the papers on top stay sharp-cornered. */}
      <div
        className="relative h-full rounded-2xl border-[length:var(--border-width-md)] border-ink-base p-[10px] md:p-3"
        style={{ backgroundColor: BOARD_COLOR, boxShadow: `${UNDERSHADOW}, var(--shadow-raised)` }}
      >
        {/* Back sheet — a second piece of paper peeking out behind, sharp corners */}
        <div
          className="absolute inset-[10px] md:inset-3 border border-ink-whisper rotate-[3deg] translate-x-1"
          style={{ backgroundColor: PAPER_COLOR }}
          aria-hidden
        />

        {/* Page tabs — colored bookmarks inserted between the sheets, poking
            above the front paper's top edge. Sit above the back sheet but
            behind the front paper, so only their top half is visible. */}
        {totalPages > 1 && (
          <div className="absolute -top-5 right-8 flex gap-1.5 z-10">
            {chunks.map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Page ${i + 1}`}
                className={`w-7 h-11 rounded-t-md border-[1.5px] border-b-0 border-ink-base shadow-sm text-[10px] font-mono font-bold flex items-start justify-center pt-1.5 transition-all ${
                  i === activePage ? '-translate-y-0.5' : 'brightness-90 hover:brightness-100'
                }`}
                style={{
                  backgroundColor: `var(${TAB_ACCENTS[i % TAB_ACCENTS.length]})`,
                  color: 'var(--color-surface-base)',
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {/* Front sheet — sharp corners, thin paper-like border, the actual content */}
        <div
          className="relative z-20 h-full border-[1.5px] border-ink-base overflow-hidden rotate-[-1deg]"
          style={{
            background: `${PAPER_COLOR} repeating-linear-gradient(
              to bottom,
              transparent, transparent 27px,
              var(--color-rule-soft) 27px, var(--color-rule-soft) 28px
            )`,
            boxShadow: PAPER_UNDERSHADOW,
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activePage}
              initial={{ rotateX: -100, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: 100, opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top center' }}
              className="absolute inset-0 p-6 md:p-8 overflow-y-auto"
            >
              {isCover && startDate && endDate && (
                <Text
                  variant="mono"
                  size="sm"
                  className="absolute top-4 right-4 md:top-5 md:right-5 px-2 py-0.5 rounded bg-slot-casing text-slot-text z-10"
                >
                  {formatDateToQuarter(startDate)} — {formatDateToQuarter(endDate)}
                </Text>
              )}

              {isCover && (
                <div className="flex items-start gap-3 mb-3 pr-20 md:pr-28">
                  {icon && (
                    <div className="relative flex-shrink-0 rotate-[3deg]" style={{ filter: PHOTO_SHADOW }}>
                      {/* Outline layer: a solid dark copy of the same torn shape, a few
                          px larger, sitting directly behind — a real stroke made of
                          solid color contrast. drop-shadow's blur (below, on this same
                          wrapper) is inherently soft/diffuse and can't substitute for
                          this no matter how large it's pushed — that was the actual
                          bug behind every earlier "still not visible" report. */}
                      <div
                        className="absolute -inset-[1px]"
                        style={{ backgroundColor: 'var(--color-ink-base)', clipPath: TORN_EDGE_CLIP }}
                        aria-hidden
                      />
                      <div
                        className="relative w-[126px] h-[126px] md:w-[144px] md:h-[144px] p-[9px] bg-white"
                        style={{ clipPath: TORN_EDGE_CLIP }}
                      >
                        <img src={icon} alt={title ?? role} className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute -top-[9px] left-1/2 -translate-x-1/2 w-[54px] h-[23px] bg-white/50 border border-white/70 rotate-[-4deg]" />
                    </div>
                  )}
                  <div className="min-w-0 flex-grow">
                    <p
                      style={{ fontFamily: 'var(--font-hand)' }}
                      className="m-0 text-xl md:text-2xl leading-tight text-ink-base truncate"
                    >
                      {title}
                    </p>
                    <Text variant="mono" size="sm" color="subtle" className="uppercase tracking-widest mt-0.5">
                      {role}
                    </Text>
                  </div>
                </div>
              )}

              <ul className="space-y-2.5">
                {chunks[activePage]?.map((item, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-ink-base mt-2" />
                    <p
                      style={{ fontFamily: 'var(--font-hand)' }}
                      className="m-0 text-lg leading-snug text-ink-base"
                    >
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
