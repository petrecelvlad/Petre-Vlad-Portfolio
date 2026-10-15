import { useMemo, useEffect, useLayoutEffect, useRef, useState, lazy, Suspense } from 'react';
import { motion } from 'motion/react';
import { AchievementShaderCanvas, ShaderType } from '@/src/components/backgrounds/AchievementShaderCanvas';
import { FloatingIslandBackdrop } from '@/src/components/backgrounds/FloatingIslandBackdrop';
import { Button, BUTTON_COLORS } from '@/src/components/atoms/Button';
import { PixelRibbonBanner } from '@/src/components/atoms/PixelRibbonBanner';
import { TornPaperPanel } from '@/src/components/atoms/TornPaperPanel';
import { useIsVisible } from '@/src/hooks/useIsVisible';
import { useIsScrolling } from '@/src/hooks/useIsScrolling';
import { useDeferredMount } from '@/src/hooks/useDeferredMount';
import { useIslandPosition } from '@/src/context/IslandPositionContext';
import { useScreenTier } from '@/src/hooks/useScreenTier';

// Code-split: three.js is large, and this background can fail to even initialize on
// GPUs/drivers without usable WebGL (see ThreeNatureFieldBackground's own try/catch fallback).
// Splitting it out means the ~1MB main bundle doesn't ship three.js to every visitor whether or
// not their hardware can render it — same pattern as SkillTree/Timeline in App.tsx.
const ThreeNatureFieldBackground = lazy(() =>
  import('@/src/components/backgrounds/ThreeNatureFieldBackground').then((m) => ({ default: m.ThreeNatureFieldBackground }))
);

// The hero's own snap wrapper (App.tsx) ends where the next section starts, at every screen tier.
function scrollPast(hero: HTMLElement) {
  const wrapper = hero.parentElement!;
  document.querySelector('main')!.scrollTo({ top: wrapper.offsetTop + wrapper.offsetHeight, behavior: 'smooth' });
}

interface AchievementData {
  id: string;
  shaderType: ShaderType;
  value: string;
  label: string;
}

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: heroRef, isVisible } = useIsVisible<HTMLDivElement>();
  // Pauses the Three.js background's render loop (shadows, wind shaders, grass instancing,
  // camera orbit) for the whole scroll gesture, not just once Hero's visibility ratio crosses
  // a threshold — the threshold-based approach still let a full-cost frame render for however
  // long it took to scroll past 50%. Scroll detection now owns that job, so isVisible itself
  // is back to the default 0 (only "fully offscreen" stops it) for its other consumers (the
  // <video> below, the achievement canvases), which don't need scroll-gesture precision.
  const isScrolling = useIsScrolling();
  const { config: islandPosition } = useIslandPosition();
  // Text/layout renders immediately; WebGL shader canvases mount a beat
  // later so they never delay first paint.
  const canvasesReady = useDeferredMount();

  const webmSrc = `${import.meta.env.BASE_URL}loopB.webm`;
  const mp4Src = `${import.meta.env.BASE_URL}loop1.mp4`;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.warn('Video autoplay prevented:', err);
      });
    }
  }, []);

  // Pause/resume decorative playback once Hero scrolls out of/into view —
  // the WebGL canvases below skip their own draw calls via isVisible, but
  // <video> decode/composite cost has to be stopped explicitly.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isVisible) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible]);

  // Laptop and up: three columns side by side. Tablet: name, then character beside ribbon and bio,
  // then the achievements, then Explore. Mobile: all of it in one column.
  const tier = useScreenTier();
  const sideBySide = tier === 'laptop' || tier === 'desktop';

  // Side by side only: the ribbon's top edge lines up with the first achievement card's bottom
  // edge in the right column. Null = stacked layouts, where the block stays centered.
  const ribbonSlotRef = useRef<HTMLDivElement>(null);
  const firstAchievementRef = useRef<HTMLDivElement>(null);
  const [ribbonOffset, setRibbonOffset] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (!sideBySide) {
      setRibbonOffset(null);
      return;
    }
    const slot = ribbonSlotRef.current!;
    const card = firstAchievementRef.current!;
    const measure = () => {
      setRibbonOffset(Math.max(0, card.getBoundingClientRect().bottom - slot.getBoundingClientRect().top));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(slot);
    observer.observe(card);
    return () => observer.disconnect();
  }, [sideBySide]);

  const islandTransform = `translate(${islandPosition.offsetX}px, ${islandPosition.offsetY}px) scale(${islandPosition.scale})`;

  const years = useMemo(() => {
    const start = new Date(2007, 0, 1);
    const now = new Date();
    let y = now.getFullYear() - start.getFullYear();
    if (now < new Date(now.getFullYear(), start.getMonth(), start.getDate())) y--;
    return String(y);
  }, []);

  const achievements: AchievementData[] = [
    { id: 'exp', shaderType: 'levelup', value: years, label: 'YEARS OF EXPERIENCE' },
    { id: 'games', shaderType: 'cartridge', value: '31', label: 'PRODUCED GAMES' },
    { id: 'levels', shaderType: 'factory', value: '+5000', label: 'SHIPPED LEVELS' },
    { id: 'teams', shaderType: 'teamslead', value: '9', label: 'TEAMS LEAD' },
  ];

  return (
    <div ref={heroRef} className="relative w-full flex-1 flex items-center justify-center py-3 sm:py-4 md:py-6 overflow-hidden select-none">
      {/* ── Layer 0: Base Background ── */}
      {canvasesReady && (
        <Suspense fallback={null}>
          <ThreeNatureFieldBackground isVisible={isVisible && !isScrolling} />
        </Suspense>
      )}

      {/* ── Layer 1: Floating Island Pedestal Backdrop. Side by side it sits at root level, anchored to
          the bottom of the character column; in the stacked layouts it moves into the character's own
          cell so it stays under the character's feet. ── */}
      {sideBySide && (
        <div
          className="absolute z-[2] pointer-events-none left-[calc(2rem-6%)] w-[42%] bottom-[8%] h-[62%]"
          style={{ transform: islandTransform }}
        >
          <FloatingIslandBackdrop className="w-full h-full" />
        </div>
      )}

      {/* ── Layer 3: Foreground UI Content ── */}
      <div className="relative z-10 w-full grid grid-cols-1 gap-y-5 px-[var(--tier-gutter)] [grid-template-areas:'name'_'char'_'ribbon'_'ach'_'explore']
        tablet:h-full tablet:max-h-[820px] tablet:gap-y-4 tablet:grid-cols-[38%_1fr] tablet:grid-rows-[auto_minmax(0,1fr)_auto_auto] tablet:[grid-template-areas:'name_name'_'char_ribbon'_'ach_ach'_'explore_explore']
        laptop:flex laptop:flex-row laptop:justify-between laptop:items-stretch laptop:px-0">

        {/* ── LEFT COLUMN (30% width, Center Anchored): Character Video ── */}
        <div className="[grid-area:char] [container-type:size] laptop:[container-type:normal] w-full laptop:w-[30%] flex-shrink-0 flex flex-col items-center justify-center p-1 sm:p-2 text-center h-[320px] tablet:h-full tablet:min-h-0 relative overflow-visible group">
          {/* Stacked layouts: a square box the size of the (square) video, with the island placed in
              it at the same proportions the side-by-side layout ends up with at 1920 × 1080, so the
              character stands on it at any size. The island editor's px offsets stay desktop-only. */}
          <div className="relative w-[min(100cqw,100cqh)] h-[min(100cqw,100cqh)] laptop:contents">
          {!sideBySide && (
            <div className="absolute z-0 pointer-events-none -left-[26.7%] w-[158.7%] top-[41.9%] h-[124%]">
              <FloatingIslandBackdrop className="w-full h-full" />
            </div>
          )}
          {/* Character Selection Video overlaid on top of the island pedestal */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="relative z-10 w-full h-full laptop:h-auto laptop:max-w-[600px] laptop:max-h-[750px] object-contain drop-shadow-2xl mx-auto pointer-events-none"
          >
            <source src={webmSrc} type="video/webm" />
            <source src={mp4Src} type="video/mp4" />
          </video>
          </div>
        </div>

        {/* ── MIDDLE COLUMN (40% width, Center Anchored): Name, Title, Bio & EXPLORE ── */}
        {/* Below laptop both wrappers are display:contents, so the name, the ribbon slot and Explore
            become cells of the grid above. */}
        <div className="contents laptop:flex laptop:w-[40%] flex-shrink-0 flex-col items-center justify-between text-center laptop:px-6">
          <div className="contents laptop:relative laptop:flex flex-1 py-1 px-4 flex-col justify-between items-center text-center w-full">

            {/* Upper Content: Name & Title */}
            <div className="[grid-area:name] flex flex-col items-center text-center gap-2 sm:gap-3 w-full pt-1 sm:pt-2">
              <div className="w-full text-center flex flex-col items-center">
                <h1 className="font-jersey font-bold text-[length:var(--tier-hero-name-size)] [--pixel-outline-unit:calc(var(--tier-hero-name-size)/96)] uppercase tracking-wider leading-none text-center pixel-text-outline flex flex-wrap justify-center items-center select-none py-1">
                  {Array.from("VLAD PETRE").map((char, index) => (
                    <motion.span
                      key={index}
                      className="inline-block"
                      animate={{
                        y: [0, -1.5, -3, -1.5, 0, 1.5, 3, 1.5, 0],
                      }}
                      transition={{
                        duration: 3.0 + ((index * 3) % 7) * 0.12,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.16,
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </h1>
              </div>
            </div>

            {/* Role Ribbon + Bio Note, fused into one object: top-aligned to the first achievement card on desktop, centered when stacked */}
            <div
              ref={ribbonSlotRef}
              className={`[grid-area:ribbon] min-h-0 flex-1 flex justify-center w-full ${ribbonOffset === null ? 'items-center' : 'items-start'}`}
              style={ribbonOffset === null ? undefined : { paddingTop: ribbonOffset }}
            >
              {/* The paper leaves room for the ribbon's tails beside it; on mobile the tails reach to 6px from the screen edge. */}
              <div className="relative w-[calc(100%-108px)] tablet:w-[calc(100%-130px)] laptop:w-full max-w-[540px] mx-auto">
                {/* 60px = the ribbon's 8-pixel tail run + 2 pixels: the body overhangs the paper by 12px and the tails end at its edge. */}
                <PixelRibbonBanner className="-mb-[34px] w-[calc(100%+120px)] -mx-[60px]">
                  <h2>GAME PRODUCER</h2>
                </PixelRibbonBanner>
                <div className="relative z-10 w-full">
                  <TornPaperPanel
                    className="w-full"
                    paperColor="#FFFDF7"
                    strokeColor="#1C1610"
                    strokeWidth={3}
                    shadowOffset={4}
                    shadowColor="#1C1610"
                    toothWidth={36}
                    toothHeight={13}
                    cornerRadius={8}
                    showPunchHoles={false}
                    paddingTop={56}
                    paddingBottom={56}
                    ruleInsetX={16}
                    showRuledLines={true}
                    lineSpacing={28}
                    lineColor="rgba(203, 213, 225, 0.65)"
                    rotateDeg={0}
                  >
                    <p
                      style={{ lineHeight: '28px' }}
                      className="font-mono text-xs sm:text-sm lg:text-base text-[#1C1610] text-center font-medium select-text px-1 m-0"
                    >
                      Game Producer & Senior Designer with 19+ years creating engaging games, leading cross-functional teams, and crafting memorable player experiences across mobile and casual platforms.
                    </p>
                  </TornPaperPanel>
                </div>
              </div>
            </div>

            {/* Bottom Content: EXPLORE Button */}
            <div className="[grid-area:explore] flex justify-center items-center w-full pb-2 sm:pb-4 laptop:pt-4">
              <Button
                onClick={() => scrollPast(heroRef.current!)}
                color={BUTTON_COLORS.periwinkle}
                shape="pill"
                size="lg"
                className="text-[#1C1610] font-arcade text-base sm:text-lg laptop:text-xl font-bold uppercase tracking-widest flex items-center justify-center"
              >
                {/* Centers the word on its ink: tracking-widest also spaces after the last letter (negative margin
                    cancels it), and the arcade font's glyphs sit ~0.11em low in their line box (measured). */}
                <span className="-mr-[0.1em] -translate-y-[0.11em]">EXPLORE</span>
              </Button>
            </div>

          </div>
        </div>

        {/* ── RIGHT COLUMN (30% width, Center Anchored): 4 Aggregated Achievement Rows ── */}
        {/* Mobile: a 2 × 2 grid of tiles. Tablet: shader + number cards, four across sideways, 2 × 2 upright. */}
        <div className="[grid-area:ach] w-full grid grid-cols-2 gap-3 tablet:gap-x-6 tablet:gap-y-4 tablet:landscape:grid-cols-4
          laptop:[container-type:size] laptop:w-[30%] flex-shrink-0 laptop:flex laptop:flex-col laptop:items-center laptop:justify-between laptop:gap-4 laptop:px-8">
          {achievements.map((item, index) => (
            <div
              key={item.id}
              ref={index === 0 ? firstAchievementRef : undefined}
              className="w-full laptop:w-[min(100%,calc(69cqh-33px))] flex flex-col tablet:flex-row items-stretch tablet:items-center justify-center tablet:gap-3 hover:translate-y-[-2px] transition-transform"
            >
              {/* Left Box: Shader Animation Card — 16 parts of the row's width, height auto-derives via aspect-video. Border/shadow live on a non-clipped overlay sibling so they carry zero box-model weight on the sizing box itself — the 16:9 split must stay exact. */}
              {/* Mobile joins the two cards into one tile: the shader card's bottom corners square off and the number card's top border tucks under it. */}
              <div className="w-full tablet:w-auto tablet:flex-[16] min-w-0 aspect-video relative">
                <div className="absolute inset-0 rounded-2xl mobile:rounded-b-none bg-[#0d0d14] overflow-hidden">
                  {canvasesReady && <AchievementShaderCanvas type={item.shaderType} isVisible={isVisible} />}
                </div>
                <div className="absolute inset-0 rounded-2xl mobile:rounded-b-none border-3 border-[#1C1610] tablet:shadow-[0_4px_0_0_#1C1610] pointer-events-none" />
              </div>

              {/* Right Box: White Text Card — 9 parts of the row's width, height auto-derives via aspect-square. Same overlay split as the shader card, so 16:9 (== the shader card's own ratio) lands on an exact height match, not an approximation. */}
              <div className="@container w-full h-[76px] -mt-[3px] tablet:mt-0 tablet:h-auto tablet:w-auto tablet:flex-[9] min-w-0 tablet:aspect-square relative">
                <div className="absolute inset-0 rounded-2xl mobile:rounded-t-none bg-[#FFFDF7] overflow-hidden">
                  <div className="absolute inset-0 p-1.5 sm:p-2 flex flex-col justify-center items-center text-center">
                    <div className="font-display font-black text-[clamp(1.1rem,26cqw,3.5rem)] mobile:text-[28px] text-[#1C1610] leading-none tracking-tight text-center w-full">
                      {item.value}
                    </div>
                    <div className="font-arcade text-[clamp(0.4375rem,10cqw,1.2rem)] mobile:text-[11px] tablet:text-[8cqw] laptop:text-[clamp(0.4375rem,10cqw,1.2rem)] font-bold text-[#1C1610] uppercase tracking-wide leading-[1.15] mt-1 break-words w-full text-center">
                      {item.label}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl mobile:rounded-t-none border-3 border-[#1C1610] shadow-[0_4px_0_0_#1C1610] pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
