import { useMemo, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useSkin } from '@/src/context/SkinContext';
import { GlobalBackground } from '@/src/components/backgrounds/GlobalBackground';
import { SegmentedGalaxianBackground } from '@/src/components/backgrounds/SegmentedGalaxianBackground';
import { AchievementShaderCanvas, ShaderType } from '@/src/components/backgrounds/AchievementShaderCanvas';
import { FloatingIslandBackdrop } from '@/src/components/backgrounds/FloatingIslandBackdrop';
import { GalaxianBackground } from '@/src/components/backgrounds/GalaxianBackground';
import { AnimatedRoleTitle } from './AnimatedRoleTitle';
import { TornPaperPanel } from '@/src/components/atoms/TornPaperPanel';
import { useIsVisible } from '@/src/hooks/useIsVisible';
import { useDeferredMount } from '@/src/hooks/useDeferredMount';
import { useIslandPosition } from '@/src/context/IslandPositionContext';

function scrollNextSection() {
  const main = document.querySelector('main') as HTMLElement | null;
  if (!main) return;
  const sectionHeight = main.clientHeight;
  main.scrollTo({ top: sectionHeight, behavior: 'smooth' });
}

interface AchievementData {
  id: string;
  shaderType: ShaderType;
  value: string;
  label: string;
}

export function Hero() {
  const { skin, background } = useSkin();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: heroRef, isVisible } = useIsVisible<HTMLDivElement>();
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
    { id: 'levels', shaderType: 'factory', value: '+5000', label: 'CRAFTED LEVELS' },
    { id: 'teams', shaderType: 'teamslead', value: '9', label: 'TEAMS LEAD' },
  ];

  return (
    <div ref={heroRef} className="relative w-full h-full flex items-center justify-center p-3 sm:p-4 md:p-6 lg:px-8 lg:py-6 overflow-hidden select-none">
      {/* ── Layer -1: Galaxian variant fill — sits BEHIND both shader passes. The shader itself (VARIANT 4) makes column 3's fill transparent along the exact same jagged edge2 line the divider stroke uses, so this just needs to fully cover that area; a straight edge here is safe because the opaque shader content in front hides it everywhere except the transparent hole ── */}
      {canvasesReady && background === 'segmented3' && (
        <div className="absolute z-[-1] left-[64%] right-0 top-0 bottom-0 pointer-events-none">
          <GalaxianBackground className="w-full h-full" />
        </div>
      )}

      {/* ── Layer 0: Base Background ── */}
      {canvasesReady && <GlobalBackground section="hero" isVisible={isVisible} />}

      {/* ── Layer 1: Floating Island Pedestal Backdrop (Root level z-[2], anchored to the bottom of the character video so it tracks the video's feet rather than stretching the full column height) ── */}
      <div
        className="absolute z-[2] pointer-events-none
          -left-3 -right-3 bottom-3 h-[55%]
          sm:-left-4 sm:-right-4 sm:bottom-4 sm:h-[58%]
          md:-left-6 md:-right-6 md:bottom-6 md:h-[60%]
          lg:left-[calc(2rem-6%)] lg:w-[42%] lg:right-auto lg:bottom-[8%] lg:h-[62%]"
        style={{
          transform: `translate(${islandPosition.offsetX}px, ${islandPosition.offsetY}px) scale(${islandPosition.scale})`,
        }}
      >
        <FloatingIslandBackdrop className="w-full h-full" />
      </div>

      {/* ── Layer 2: Overlay Pass for 3-Segmented Stage (Column 2 & 3 + Black Dividers, z-[5]) ── */}
      {canvasesReady && background === 'segmented3' && (
        <SegmentedGalaxianBackground pass="overlay" className="z-[5]" isVisible={isVisible} />
      )}

      {/* ── Layer 3: Foreground UI Content ── */}
      <div className="relative z-10 w-full h-full max-h-[820px] flex flex-col lg:flex-row justify-between items-stretch">

        {/* ── LEFT COLUMN (30% width, Center Anchored): Character Video ── */}
        <div className="w-full lg:w-[30%] flex-shrink-0 flex flex-col items-center justify-center p-1 sm:p-2 text-center h-[350px] sm:h-[450px] lg:h-full relative overflow-visible group">
          {/* Character Selection Video overlaid on top of the island pedestal */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="relative z-10 w-full max-w-[400px] lg:max-w-[500px] xl:max-w-[600px] max-h-[750px] h-auto object-contain drop-shadow-2xl mx-auto pointer-events-none"
          >
            <source src={webmSrc} type="video/webm" />
            <source src={mp4Src} type="video/mp4" />
          </video>
        </div>

        {/* ── MIDDLE COLUMN (40% width, Center Anchored): Name, Title, Bio & EXPLORE ── */}
        <div className="w-full lg:w-[40%] flex-shrink-0 flex flex-col items-center justify-between text-center px-2 lg:px-6">
          <div className="relative flex-1 py-1 px-2 sm:px-4 flex flex-col justify-between items-center text-center w-full">

            {/* Upper Content: Name, Title & Bio */}
            <div className="flex flex-col items-center text-center gap-2 sm:gap-3 w-full pt-1 sm:pt-2">
              <div className="w-full text-center flex flex-col items-center">
                <h1 className="font-jersey font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl uppercase tracking-wider leading-none text-center pixel-text-outline flex flex-wrap justify-center items-center select-none py-1">
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

                <AnimatedRoleTitle />
              </div>

              <TornPaperPanel
                className="w-full max-w-[540px] mx-auto mt-2 sm:mt-3 mb-1"
                paperColor="#FFFDF7"
                strokeColor="#1C1610"
                strokeWidth={3}
                shadowOffset={4}
                shadowColor="#1C1610"
                toothWidth={36}
                toothHeight={13}
                cornerRadius={8}
                punchHoleY={16}
                paddingTop={56}
                paddingBottom={56}
                ruleInsetX={16}
                showRuledLines={true}
                lineSpacing={28}
                lineColor="rgba(203, 213, 225, 0.65)"
                rotateDeg={-0.6}
              >
                <p
                  style={{ lineHeight: '28px' }}
                  className="font-mono text-xs sm:text-sm lg:text-base text-[#1C1610] text-center font-medium select-text px-1 m-0"
                >
                  Game Producer & Senior Designer with 19+ years creating engaging games, leading cross-functional teams, and crafting memorable player experiences across mobile and casual platforms.
                </p>
              </TornPaperPanel>
            </div>

            {/* Bottom Content: EXPLORE Button */}
            <div className="flex justify-center items-center w-full pb-2 sm:pb-4 pt-4">
              <button
                onClick={scrollNextSection}
                className="bg-[#4ADE80] hover:bg-[#22C55E] text-[#1C1610] font-arcade text-base sm:text-lg lg:text-xl font-bold uppercase tracking-widest px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl border-3 border-[#1C1610] shadow-[0_5px_0_0_#1C1610] active:translate-y-1 active:shadow-none transition-all cursor-pointer flex items-center gap-3 group"
              >
                <span>EXPLORE</span>
                <span className="group-hover:translate-y-1 transition-transform">▼</span>
              </button>
            </div>

          </div>
        </div>

        {/* ── RIGHT COLUMN (30% width, Right Anchored): 4 Aggregated Achievement Rows ── */}
        <div className="w-full lg:w-[30%] flex-shrink-0 flex flex-col items-end justify-between gap-2.5 sm:gap-3 lg:gap-4 pl-2 lg:pl-4">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="w-full max-w-[380px] sm:max-w-[410px] lg:max-w-[430px] xl:max-w-[450px] flex-1 min-h-[75px] sm:min-h-[85px] lg:min-h-[95px] flex items-stretch justify-end gap-2 sm:gap-3 hover:translate-y-[-2px] transition-transform"
            >
              {/* Left Box: Shader Animation Card */}
              <div className="flex-1 min-w-0 rounded-2xl border-3 border-[#1C1610] shadow-[0_4px_0_0_#1C1610] bg-[#0d0d14] overflow-hidden relative">
                {canvasesReady && <AchievementShaderCanvas type={item.shaderType} isVisible={isVisible} />}
              </div>

              {/* Right Box: White Text Card (Centered text restored) */}
              <div className="w-[110px] sm:w-[125px] lg:w-[145px] xl:w-[165px] flex-shrink-0 bg-[#FFFDF7] rounded-2xl border-3 border-[#1C1610] shadow-[0_4px_0_0_#1C1610] p-2 sm:p-3 flex flex-col justify-center items-center text-center overflow-hidden">
                <div className="font-display font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[#1C1610] leading-none tracking-tight text-center w-full">
                  {item.value}
                </div>
                <div className="font-arcade text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] font-bold text-[#1C1610] uppercase tracking-wide leading-tight mt-1 break-words w-full text-center">
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
