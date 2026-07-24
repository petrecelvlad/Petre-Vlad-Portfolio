import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Text } from '../../../atoms/Text';
import { ResponsibilitiesSlotProps } from '../../ports';
import { formatDateToQuarter } from '@/src/core/domain/formatDate';
import { HERITAGE_PALETTE, saturate, EMBOSS_LIGHT, EMBOSS_DARK, EMBOSS_AMBIENT_SHADOW } from './palette';

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
// Page tabs used to pull their color from a mix of a bauhaus role token and
// three raw palette colors (--role-responsibilities-accent, --color-butter,
// --color-sky, --color-mint) — none of those are heritage colors at all,
// which is why they read as too dark/saturated next to the desk's soft
// palette. Derived from the same six HERITAGE_PALETTE colors as the Skills
// sticky notes instead (2026-07-24), so this is one shared color language,
// not two. Pushed noticeably more saturated than the flat notes — these are
// meant to read as buttons, not paper — via saturate(), the per-component
// knob palette.ts exists for, rather than hand-picking a one-off tab palette.
const TAB_ACCENTS = HERITAGE_PALETTE.map((c) => saturate(c, 45));

// The heritage emboss (see palette.ts's top-of-file comment, and its
// EMBOSS_LIGHT/EMBOSS_DARK/EMBOSS_AMBIENT_SHADOW exports) is normally
// consumed as `boxShadow: 'var(--shadow-raised)'` / `shadow-[var(--shadow-
// raised)]` directly — that was tried here first and was wrong: box-shadow
// is computed from the element's rectangular bounding box, not an SVG
// path's actual alpha shape, so it rendered as a visible stray rectangle
// around the clip icon's transparent corners. Same class of bug
// TORN_EDGE_CLIP/PHOTO_SHADOW above already solved once for the photo
// frame. Fixed the same way: the ambient/ombré part of the shadow becomes
// a `filter: drop-shadow()` (respects real alpha shape), and the emboss's
// two solid inset LINES become actual SVG rects clipped to the clip's own
// path via an SVG <clipPath> (which follows the real curve exactly,
// unlike a CSS clip-path polygon() approximation of it) — colors imported
// from palette.ts, not redeclared here.
//
// EMBOSS_LINE_HEIGHT is this SVG's own viewBox-unit thickness for both
// bars — a separate number from the shared 3px CSS value (different unit
// systems, this viewBox is 32 units tall) but deliberately the same value
// for both rects, for the same "equal thickness" reason the CSS token
// itself was fixed. The bottom bar's visible result is the tapering
// silhouette's own clipped tip, not a uniform line the way the flat top
// edge produces — an inherent limit of approximating a curved edge with a
// clipped rectangle, not a bug to chase further.
const EMBOSS_LINE_HEIGHT = 3;

// ============================================================================
// THE RULED-PAPER ALIGNMENT SYSTEM — read this before touching ANY text
// position inside the clipboard's front sheet.
//
// v2 (2026-07-24, Vlad) — replaces the v1 "quantize each block's own height
// to a RULE_HEIGHT multiple" approach. v1's real flaw wasn't the concept,
// it was that "quantize" meant hand-computing a margin (mb-[14px]/md:mb-6)
// for one specific RULE_HEIGHT value (28) — the moment RULE_HEIGHT changed
// (to 30, tuning the bullets), that margin math silently went stale, and
// title/role/date-badge drifted again. Fixed properly this time: every text
// element gets an EXPLICIT LINE NUMBER (the _LINE constants below) instead
// of an inferred position derived from a neighboring element's height. Move
// something by changing ITS line number — never by adjusting a margin,
// height, or a second offset value anywhere in this file.
//
// RULE_HEIGHT is the ruled background's own line spacing (used below where
// the background itself is defined, and by lineTop()).
//
// lineTop(n) converts a 1-indexed line number to a pixel offset: line 1 is
// the very top of the content area (before any rule), line 2's box bottom
// coincides with the first rule, etc. Any element placed at top: lineTop(n)
// with height RULE_HEIGHT (or a multiple, for taller/multi-line content)
// and vertically centered (flex items-center) inside that box reads
// correctly against the grid by construction — centering, not baseline
// math, is what makes it font-size-independent. Every header-area text
// element (title, role, the date badge) uses this now; the icon does too,
// for its own left/top anchor, even though it isn't line-grid content
// itself. The bullet list is the one exception that can't use box-
// centering (it's flowing, wrapping paragraph text, not a fixed-height
// block) — it keeps its own line-height: RULE_HEIGHT instead, and its
// start position is set via its own _LINE constant as a marginTop.
//
// PAPER_BASELINE_NUDGE is still the one whole-block phase correction against
// the fixed rule background (applied once, via transform: translateY() on
// the content wrapper) — it moves EVERYTHING together after all the _LINE
// constants have placed things correctly relative to each other. Tune the
// _LINE constants first for relative position; use this only for the final
// shared phase, same as before.
const RULE_HEIGHT = 30;
const PAPER_BASELINE_NUDGE = 0;

function lineTop(line: number) {
  return (line - 1) * RULE_HEIGHT;
}

// Explicit per-element line assignments — the only numbers that should ever
// need changing to move something. Two elements can share the same line
// number (e.g. TITLE_LINE === DATE_BADGE_LINE) and will sit side by side on
// it, since each element's HORIZONTAL position (left/right) is set
// independently of its line number.
const TITLE_LINE = 2;
const ROLE_LINE = 3;
const DATE_BADGE_LINE = 1;
const BULLETS_START_LINE = 7;

// Bulldog-clip silhouette: a tapering trapezoid body with a crease line —
// reads as "pinned paper" without a wire-loop handle (which read as a bag).
function BinderClip() {
  const clipId = useId();
  const clipPath = 'M6 2 H50 L38 27 Q28 33 18 27 Z';
  return (
    <svg
      viewBox="0 0 56 32"
      className="absolute -top-[27px] left-1/2 -translate-x-1/2 w-24 h-auto rotate-[-2deg] z-30"
      style={{ filter: EMBOSS_AMBIENT_SHADOW }}
      aria-hidden
    >
      <defs>
        <clipPath id={clipId}>
          <path d={clipPath} />
        </clipPath>
      </defs>
      <path
        d={clipPath}
        fill="var(--role-responsibilities-accent)"
        stroke="var(--color-ink-base)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <g clipPath={`url(#${clipId})`}>
        <rect x="0" y="2" width="56" height={EMBOSS_LINE_HEIGHT} fill={EMBOSS_LIGHT} />
        <rect x="0" y={30 - EMBOSS_LINE_HEIGHT} width="56" height={EMBOSS_LINE_HEIGHT} fill={EMBOSS_DARK} />
      </g>
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
        {/* Back sheet — a second piece of paper peeking out behind, sharp corners.
            Flipped horizontally (Vlad, 2026-07-23) so it peeks out past the
            front sheet's LEFT edge instead of its right. Mirroring a
            rotate+translate pair across a vertical axis means negating both
            the angle and the x-offset, not appending scaleX(-1) — that
            first attempt applied the flip to the point space before the
            rotation composed on top of it, so the peek stayed on the same
            (right) side instead of moving to the left as intended (and a
            second attempt via a Tailwind `-scale-x-100` class compiled to
            `transform: none` entirely, dropping the rotate/translate too —
            verified via getComputedStyle). rotate(-3deg) translateX(-4px)
            is the direct, unambiguous mirror of the original
            rotate(3deg) translateX(4px). */}
        <div
          className="absolute inset-[10px] md:inset-3 border border-ink-whisper"
          style={{ backgroundColor: PAPER_COLOR, transform: 'rotate(-3deg) translateX(-4px)' }}
          aria-hidden
        />

        {/* Page tabs — sandwiched between the board and the front sheet
            (Vlad, 2026-07-24): visible against the board's own brown where
            they poke past the front sheet's right edge, hidden under the
            front sheet everywhere they overlap it. This is a DOM-order
            child of the board now (was a sibling positioned before the
            whole board, reading as "emerging from behind the clipboard" —
            a different, previously-requested effect); the front sheet
            below still wins the paint order regardless of DOM position
            because it carries an explicit z-20 (tabs and the back sheet
            above stay at the implicit z-index:auto == 0), so this only
            needs to sit after the back sheet and before the front sheet
            for readability, not for correctness.
            Went through two rounds live with Vlad (2026-07-24): right-1/2
            was barely past the board's own padding (front sheet, which
            fills the board's full padded width, covered almost the whole
            tab); -right-3/-4 still wasn't enough. Pushed further still —
            comparable to the old "emerge from behind the clipboard" pass's
            own poke-out distance, just with the front sheet now covering
            the near side instead of the board doing the covering. Border/
            emboss/size/top-anchoring unchanged from that pass — same
            square click targets, same var(--shadow-raised) depth cue, no
            gradient. */}
        {totalPages > 1 && (
          <div className="absolute top-14 md:top-16 -right-6 md:-right-8 flex flex-col gap-0.5">
            {chunks.map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Page ${i + 1}`}
                className={`w-11 h-11 md:w-14 md:h-14 rounded-md border-[length:var(--border-width-md)] border-ink-base shadow-[var(--shadow-raised)] text-lg md:text-xl font-mono font-bold flex items-center justify-center transition-all ${
                  i === activePage ? 'translate-x-1.5' : 'brightness-95 hover:brightness-100'
                }`}
                style={{
                  backgroundColor: TAB_ACCENTS[i % TAB_ACCENTS.length],
                  color: 'var(--color-ink-base)',
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {/* Front sheet — sharp corners, thin paper-like border, the actual content.
            Tilt mirrored (Vlad, 2026-07-24): rotate(-1deg) -> rotate(1deg), same
            "negate the angle" mirror as the back sheet. Content stays readable —
            confirmed with Vlad that a true scaleX(-1) here (which would also
            mirror all the text/photo, rendering it backwards) was not wanted. */}
        <div
          className="relative z-20 h-full border-[1.5px] border-ink-base overflow-hidden rotate-[1deg]"
          style={{
            backgroundColor: PAPER_COLOR,
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
              style={{
                transformOrigin: 'top center',
                // Ruled lines live here (2026-07-24), on the same padded,
                // scrolling element the text sits in — background-origin
                // defaults to padding-box, so this gradient's own y=0
                // lands exactly at the padding edge, the same coordinate
                // the text content starts from, and scrolls together with
                // it since it's the same element. See RULE_HEIGHT/
                // PAPER_BASELINE_NUDGE above for how every text block
                // inside stays in phase with this from here on.
                background: `repeating-linear-gradient(
                  to bottom,
                  transparent, transparent ${RULE_HEIGHT - 1}px,
                  var(--color-rule-soft) ${RULE_HEIGHT - 1}px, var(--color-rule-soft) ${RULE_HEIGHT}px
                )`,
              }}
              className="absolute inset-0 p-6 md:p-8 overflow-y-auto"
            >
              {/* Single shared phase correction for EVERYTHING below — see
                  the RULE_HEIGHT/PAPER_BASELINE_NUDGE comment above. Every
                  child here is positioned relative to EACH OTHER by normal
                  flow plus the box-quantization rule (each block's own
                  height is a RULE_HEIGHT multiple, centered within it) —
                  this wrapper's translateY is the ONLY absolute offset
                  against the fixed rule background in the whole subtree. */}
              <div className="relative" style={{ transform: `translateY(${PAPER_BASELINE_NUDGE}px)` }}>
                {isCover && startDate && endDate && (
                  // Text's props don't include `style` (this project has no
                  // @types/react installed, so React.HTMLAttributes doesn't
                  // resolve for it — a pre-existing gap, not something to
                  // fix here) — the line-number position goes on this
                  // wrapper div instead; Text itself just fills it (h-full)
                  // and centers its own content.
                  <div
                    className="absolute right-4 md:right-5 z-10"
                    style={{ top: lineTop(DATE_BADGE_LINE), height: RULE_HEIGHT }}
                  >
                    <Text
                      variant="mono"
                      size="sm"
                      className="h-full px-2 flex items-center rounded bg-slot-casing text-slot-text"
                    >
                      {formatDateToQuarter(startDate)} — {formatDateToQuarter(endDate)}
                    </Text>
                  </div>
                )}

                {isCover && (
                  // Explicit line-number placement (see the system comment
                  // above) — icon anchored top-left, title/role each
                  // independently positioned via their own _LINE constant
                  // instead of being centered as a stack within a height
                  // inferred from the icon. This container's own height is
                  // set to exactly lineTop(BULLETS_START_LINE) so the ul
                  // (next in normal flow, right after this div) starts
                  // there automatically — no separate margin to keep in
                  // sync with RULE_HEIGHT by hand anymore.
                  <div className="relative" style={{ height: lineTop(BULLETS_START_LINE) }}>
                    {icon && (
                      <div
                        className="absolute left-0 top-0 rotate-[3deg]"
                        style={{ filter: PHOTO_SHADOW }}
                      >
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
                    {/* left matches icon width (126/144) + the old gap-3
                        (12px); right leaves room for the date badge, same
                        pr-20/pr-28 the row used to reserve. Setting both
                        left and right on an absolutely positioned element
                        defines its width via the gap between them — no
                        separate width/max-width needed. */}
                    <p
                      style={{ fontFamily: 'var(--font-hand)', top: lineTop(TITLE_LINE), height: RULE_HEIGHT }}
                      className="absolute left-[138px] md:left-[156px] right-20 md:right-28 m-0 flex items-center text-xl md:text-2xl leading-tight text-ink-base truncate"
                    >
                      {title}
                    </p>
                    {/* Same Text-has-no-style-prop workaround as the date
                        badge above — position on the wrapper, Text fills
                        it (h-full) and centers its own content. */}
                    <div
                      className="absolute left-[138px] md:left-[156px] right-20 md:right-28"
                      style={{ top: lineTop(ROLE_LINE), height: RULE_HEIGHT }}
                    >
                      <Text
                        variant="mono"
                        size="sm"
                        color="subtle"
                        className="h-full flex items-center uppercase tracking-widest"
                      >
                        {role}
                      </Text>
                    </div>
                  </div>
                )}

                {/* Bullet line-height locked to the paper's own rule spacing
                    (RULE_HEIGHT, same constant the background above uses)
                    so every line of text — including wrapped lines and
                    separate bullets — advances in the same steps as the
                    ruled lines. space-y-2.5 is dropped for the same reason:
                    an extra gap between bullets that wasn't a RULE_HEIGHT
                    multiple would break the rhythm back apart between
                    items. No marginTop here — the isCover header container
                    above has an explicit height of lineTop(BULLETS_START_LINE),
                    so this list (next in normal flow right after it) always
                    starts exactly on BULLETS_START_LINE by construction, not
                    by a margin that has to be kept in sync with RULE_HEIGHT
                    by hand. Non-cover pages render no header at all, so the
                    list is the wrapper's first child and starts at line 1
                    instead — also correct with no extra offset. The single
                    PAPER_BASELINE_NUDGE on the wrapper above is still the
                    only whole-subtree phase correction. */}
                <ul>
                  {chunks[activePage]?.map((item, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-ink-base mt-[11px]" />
                      <p
                        style={{ fontFamily: 'var(--font-hand)', lineHeight: `${RULE_HEIGHT}px` }}
                        className="m-0 text-lg text-ink-base"
                      >
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
