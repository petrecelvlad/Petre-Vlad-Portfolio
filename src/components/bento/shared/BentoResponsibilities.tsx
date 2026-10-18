import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronRight, FileText, Images, ListChecks, Pointer, type LucideIcon } from 'lucide-react';
import { Text } from '@/src/components/atoms/Text';
import { InstantPhoto } from '@/src/components/atoms/InstantPhoto';
import { ResponsibilitiesSlotProps } from '@/src/components/bento/ports';
import { formatDateToQuarter, formatDuration } from '@/src/core/domain/formatDate';
import { splitUnconfirmed } from '@/src/core/domain/unconfirmedCopy';
import { dismissDetailsHint, useDetailsHintDismissed } from '@/src/hooks/useDetailsHint';
import {
  HERITAGE_PALETTE, saturate, darken, EMBOSS_LIGHT, EMBOSS_DARK, EMBOSS_AMBIENT_SHADOW,
  BOARD_COLOR, PAPER_COLOR, BOARD_UNDERSHADOW,
} from './palette';

type SectionType = 'overview' | 'details' | 'gallery';

interface ClipboardSection {
  type: SectionType;
  side: 'left' | 'right';
  label: string;
  Icon: LucideIcon;
  isPresent: (props: ResponsibilitiesSlotProps) => boolean;
}

// Tab order is this array's order. A project only gets a tab for the sections it
// has content for; a new section type is one entry here plus its renderSectionBody case.
// Each tab keeps its side of the binder clip whether or not the others are present.
const SECTIONS: ClipboardSection[] = [
  { type: 'overview', side: 'left', label: 'Overview', Icon: FileText, isPresent: () => true },
  { type: 'details', side: 'left', label: 'Details', Icon: ListChecks, isPresent: (p) => p.responsibilities.length > 0 },
  { type: 'gallery', side: 'right', label: 'Gallery', Icon: Images, isPresent: (p) => p.galleryScreenshots.length > 0 },
];

// How far the binder clip sticks up above the board. Tabs rise the same distance
// so their tops line up with the clip's, plus a tucked-in part hidden behind the board.
const CLIP_OVERHANG_PX = 27;
const TAB_TUCK_PX = 14;
// How long the Overview stays open before the hand points at the Details tab.
const DETAILS_HINT_DWELL_MS = 2000;

const PAPER_UNDERSHADOW = '2px 2px 0px rgba(43, 32, 22, 0.15)';
// The project icon itself (frame, scotch tape, shadow) is the shared InstantPhoto atom
// (components/atoms/InstantPhoto.tsx) — also used by SkillTree's project photos, same recipe,
// sized differently per consumer. Used to be a bespoke torn-edge clip-path here; replaced
// 2026-07-27 so the two stop drifting into different shapes.
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
// The open tab: a deeper shade of its own color, so which page is open reads at a glance.
const OPEN_TAB_ACCENTS = HERITAGE_PALETTE.map((c) => darken(saturate(c, 55), 16));

// The heritage emboss (see palette.ts's top-of-file comment, and its
// EMBOSS_LIGHT/EMBOSS_DARK/EMBOSS_AMBIENT_SHADOW exports) is normally
// consumed as `boxShadow: 'var(--shadow-raised)'` / `shadow-[var(--shadow-
// raised)]` directly — that was tried here first and was wrong: box-shadow
// is computed from the element's rectangular bounding box, not an SVG
// path's actual alpha shape, so it rendered as a visible stray rectangle
// around the clip icon's transparent corners. Same class of bug the old
// torn-edge photo frame (now InstantPhoto, a plain rectangle — moot for
// this shape) once had to solve too. Fixed the same way: the ambient/ombré part of the shadow becomes
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

// The ruled paper: RULE_HEIGHT is the background's line spacing. Every text element has
// line-height RULE_HEIGHT, and every fixed-height block (the cover header, a badge's line) is a
// whole number of lines tall, so all text below it stays on the lines whatever wraps.
// PAPER_BASELINE_NUDGE is the one whole-block phase correction against the rule background.
const RULE_HEIGHT = 30;
const PAPER_BASELINE_NUDGE = 0;

// The cover: the photo with the title, role, dates and duration beside it; the summary under the
// photo, never beside it. The photo is as large as the sheet allows: the first
// size whose minimum sheet width and height fit. The smallest leaves the text column room for the
// date badge on a phone, and its slightly smaller text keeps a sideways tablet's page from overflowing.
const COVER_SIZES = [
  { minWidth: 480, minHeight: 600, photoClassName: 'w-[160px]', gapClassName: 'gap-5', headerLines: 7, titleClassName: 'text-2xl', roleClassName: 'tracking-widest', summaryClassName: 'text-lg' },
  { minWidth: 400, minHeight: 0, photoClassName: 'w-[112px]', gapClassName: 'gap-4', headerLines: 5, titleClassName: 'text-xl', roleClassName: 'tracking-widest', summaryClassName: 'text-lg' },
  { minWidth: 0, minHeight: 0, photoClassName: 'w-[96px]', gapClassName: 'gap-3', headerLines: 5, titleClassName: 'text-lg', roleClassName: 'tracking-wider', summaryClassName: 'text-base' },
];

// Bulldog-clip silhouette: a tapering trapezoid body with a crease line —
// reads as "pinned paper" without a wire-loop handle (which read as a bag).
function BinderClip() {
  const clipId = useId();
  const clipPath = 'M6 2 H50 L38 27 Q28 33 18 27 Z';
  return (
    <svg
      viewBox="0 0 56 32"
      className="absolute left-1/2 -translate-x-1/2 w-24 h-auto rotate-[-2deg] z-30"
      style={{ top: -CLIP_OVERHANG_PX, filter: EMBOSS_AMBIENT_SHADOW }}
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

function CopyWithGaps({ copy }: { copy: string }) {
  return (
    <>
      {splitUnconfirmed(copy).map((segment, i) =>
        segment.isConfirmed ? segment.text : <span key={i} className="text-error">{segment.text}</span>
      )}
    </>
  );
}

// One empty ruled line between bullets, dropped when the spaced list would run past the page.
// Bullet line-height is locked to RULE_HEIGHT so every line, wrapped or not, advances in the
// same steps as the ruled background.
function DetailsList({ items }: { items: string[] }) {
  const listRef = useRef<HTMLUListElement>(null);
  useLayoutEffect(() => {
    const list = listRef.current!;
    const page = list.closest<HTMLElement>('[data-ruled-page]')!;
    const fit = () => {
      list.style.rowGap = `${RULE_HEIGHT}px`;
      if (page.scrollHeight > page.clientHeight) list.style.rowGap = '0px';
    };
    const observer = new ResizeObserver(fit);
    observer.observe(page);
    observer.observe(list);
    return () => observer.disconnect();
  }, []);
  return (
    <ul ref={listRef} className="flex flex-col" style={{ rowGap: RULE_HEIGHT }}>
      {items.map((item, i) => (
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
  );
}

export function BentoResponsibilities(props: ResponsibilitiesSlotProps) {
  const { overview, responsibilities, role, title, icon, startDate, endDate, galleryScreenshots, showDetailsHint = false } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const sections = SECTIONS.filter((section) => section.isPresent(props));
  const activeSection = sections[activeIndex];
  const detailsIndex = sections.findIndex((section) => section.type === 'details');

  const sheetRef = useRef<HTMLDivElement>(null);
  const [cover, setCover] = useState(COVER_SIZES[0]);
  useLayoutEffect(() => {
    const sheet = sheetRef.current!;
    const observer = new ResizeObserver(() => setCover(COVER_SIZES.find(
      (size) => sheet.clientWidth >= size.minWidth && sheet.clientHeight >= size.minHeight,
    )!));
    observer.observe(sheet);
    return () => observer.disconnect();
  }, []);
  const ruledLine = { lineHeight: `${RULE_HEIGHT}px` };

  const isHintDismissed = useDetailsHintDismissed();
  const isHintDue = showDetailsHint && !isHintDismissed && detailsIndex !== -1 && activeIndex === 0;
  const [isHintShown, setIsHintShown] = useState(false);
  useEffect(() => {
    if (!isHintDue) return;
    const timer = setTimeout(() => setIsHintShown(true), DETAILS_HINT_DWELL_MS);
    return () => {
      clearTimeout(timer);
      setIsHintShown(false);
    };
  }, [isHintDue]);

  const openSection = (index: number) => {
    setActiveIndex(index);
    dismissDetailsHint();
  };

  const renderTab = (section: ClipboardSection, index: number) => {
    const isActive = index === activeIndex;
    return (
      <button
        key={section.type}
        type="button"
        onClick={() => openSection(index)}
        aria-label={section.label}
        aria-current={isActive}
        title={section.label}
        className={`w-10 md:w-11 flex justify-center pt-[3px] rounded-t-md border-[length:var(--border-width-md)] border-ink-base shadow-[var(--shadow-raised)] origin-bottom transition-[translate,scale,background-color] ${
          isActive ? 'relative z-[1] scale-110 cursor-default' : 'translate-y-[3px] hover:translate-y-px brightness-95 hover:brightness-100 cursor-pointer'
        }`}
        style={{
          height: CLIP_OVERHANG_PX + TAB_TUCK_PX,
          backgroundColor: (isActive ? OPEN_TAB_ACCENTS : TAB_ACCENTS)[index % TAB_ACCENTS.length],
          color: 'var(--color-ink-base)',
        }}
      >
        <section.Icon className="w-4 h-4" strokeWidth={2.5} aria-hidden />
      </button>
    );
  };

  const renderSectionBody = (type: SectionType) => {
    switch (type) {
      case 'overview':
        return (
          <>
            <div className={`flex items-start ${cover.gapClassName}`} style={{ minHeight: cover.headerLines * RULE_HEIGHT }}>
              {icon && (
                <InstantPhoto
                  src={icon}
                  alt={title ?? role}
                  rotation={3}
                  photoAspect={1}
                  className={`flex-none mt-2 ${cover.photoClassName}`}
                />
              )}
              <div className="flex-1 min-w-0">
                <p style={{ fontFamily: 'var(--font-hand)', ...ruledLine }} className={`m-0 text-ink-base ${cover.titleClassName}`}>
                  {title}
                </p>
                <Text variant="mono" size="sm" color="subtle" className={`uppercase ${cover.roleClassName}`} style={ruledLine}>
                  {role}
                </Text>
                {startDate && endDate && (
                  <>
                    <div className="flex items-center" style={{ height: RULE_HEIGHT }}>
                      <Text variant="mono" size="sm" className="px-2 rounded bg-slot-casing text-slot-text whitespace-nowrap" style={{ lineHeight: `${RULE_HEIGHT - 4}px` }}>
                        {formatDateToQuarter(startDate)} - {formatDateToQuarter(endDate)}
                      </Text>
                    </div>
                    <div className="flex items-center" style={{ height: RULE_HEIGHT }}>
                      <span className="px-2 rounded border-[1.5px] border-slot-casing font-mono font-bold text-xs uppercase tracking-wider text-slot-casing whitespace-nowrap" style={{ lineHeight: `${RULE_HEIGHT - 10}px` }}>
                        {formatDuration(startDate, endDate)}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-hand)', ...ruledLine }} className={`m-0 text-ink-base ${cover.summaryClassName}`}>
              <CopyWithGaps copy={overview.summary} />
            </p>
            {detailsIndex !== -1 && (
              <div className="mt-auto flex justify-end">
                <button
                  type="button"
                  onClick={() => openSection(detailsIndex)}
                  style={{ fontFamily: 'var(--font-hand)', ...ruledLine }}
                  className="flex items-center gap-0.5 text-lg font-bold text-sky-deep underline decoration-2 underline-offset-4 hover:text-ink-base cursor-pointer"
                >
                  Read more
                  <ChevronRight className="w-4 h-4" strokeWidth={3} aria-hidden />
                </button>
              </div>
            )}
          </>
        );
      case 'details':
        return <DetailsList items={responsibilities} />;
      case 'gallery':
        return (
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            {galleryScreenshots.map((src, i) => (
              <InstantPhoto
                key={src}
                src={src}
                alt={`${title ?? role} screenshot ${i + 1}`}
                rotation={i % 2 === 0 ? -2 : 2}
                className={`${galleryScreenshots.length === 1 ? 'w-[85%]' : 'w-[calc(50%-16px)]'} aspect-[4/3]`}
              />
            ))}
          </div>
        );
    }
  };

  return (
    <div className="relative h-full pl-1 pr-1" style={{ perspective: 1600 }}>
      <BinderClip />

      {/* Section tabs — behind the board, poking up past its top edge on either
          side of the binder clip. The board's z-10 is what keeps them behind it.
          The active tab stands at full height; the rest sit a little lower. */}
      {sections.length > 1 && (
        <>
          <div className="absolute left-6 flex gap-1" style={{ top: -CLIP_OVERHANG_PX }}>
            {sections.map((section, i) => section.side === 'left' && renderTab(section, i))}
          </div>
          <div className="absolute right-6 flex gap-1" style={{ top: -CLIP_OVERHANG_PX }}>
            {sections.map((section, i) => section.side === 'right' && renderTab(section, i))}
          </div>
        </>
      )}

      {/* Tutorial hand: a row mirroring the left tabs, above the board, with the hand under the
          Details tab's slot pointing up at it. */}
      <AnimatePresence>
        {isHintShown && (
          <motion.div
            className="absolute left-6 top-0 z-30 flex gap-1 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            aria-hidden
          >
            {sections.slice(0, detailsIndex + 1).map((section, i) => section.side === 'left' && (
              <div key={section.type} className="w-10 md:w-11 flex justify-center">
                {i === detailsIndex && (
                  <div className="hint-bob">
                    <Pointer className="w-9 h-9 text-ink-base drop-shadow-[2px_3px_0_rgba(43,32,22,0.35)]" fill="#FFFFFF" strokeWidth={2} />
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clipboard board — bottom layer, rounded corners, the only rounded
          element in the stack; the papers on top stay sharp-cornered. */}
      <div
        className="relative z-10 h-full rounded-2xl border-[length:var(--border-width-md)] border-ink-base p-[10px] md:p-3"
        style={{ backgroundColor: BOARD_COLOR, boxShadow: `${BOARD_UNDERSHADOW}, var(--shadow-raised)` }}
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
            verified via getComputedStyle). Negating both values of the
            original rotate(3deg) translateX(4px) is the direct mirror;
            the angle was later eased to 1deg (2026-10-17). */}
        <div
          className="absolute inset-[10px] md:inset-3 border border-ink-whisper"
          style={{ backgroundColor: PAPER_COLOR, transform: 'rotate(-1deg) translateX(-4px)' }}
          aria-hidden
        />

        {/* Front sheet — sharp corners, thin paper-like border, the actual content.
            Tilt mirrored (Vlad, 2026-07-24): rotate(-1deg) -> rotate(1deg), same
            "negate the angle" mirror as the back sheet. Content stays readable —
            confirmed with Vlad that a true scaleX(-1) here (which would also
            mirror all the text/photo, rendering it backwards) was not wanted. */}
        <div
          ref={sheetRef}
          className="relative z-20 h-full border-[1.5px] border-ink-base overflow-hidden rotate-[1deg]"
          style={{
            backgroundColor: PAPER_COLOR,
            boxShadow: PAPER_UNDERSHADOW,
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeIndex}
              data-ruled-page
              initial={{ rotateX: -100, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: 100, opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              style={{
                transformOrigin: 'top center',
                // Ruled lines live here (2026-07-24), on the same padded
                // element the text sits in — background-origin
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
              className="relative tablet:absolute tablet:inset-0 p-6 md:p-8 overflow-hidden flex flex-col"
            >
              {/* Single shared phase correction for EVERYTHING below — see
                  the RULE_HEIGHT/PAPER_BASELINE_NUDGE comment above. Every
                  child here is positioned relative to EACH OTHER by normal
                  flow plus the box-quantization rule (each block's own
                  height is a RULE_HEIGHT multiple, centered within it) —
                  this wrapper's translateY is the ONLY absolute offset
                  against the fixed rule background in the whole subtree. */}
              <div className="relative flex-1 flex flex-col" style={{ transform: `translateY(${PAPER_BASELINE_NUDGE}px)` }}>
                {activeSection && renderSectionBody(activeSection.type)}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
