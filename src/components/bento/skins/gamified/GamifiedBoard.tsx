import type { ReactNode } from 'react';
import { RibbonBanner } from '@/src/components/atoms/RibbonBanner';
import { GamifiedCornerCaps } from './GamifiedCornerCaps';

interface GamifiedBoardProps {
  children: ReactNode;
  bannerTitle: string;
  className?: string;
  contentClassName?: string;
  fillHeight?: boolean;
}

const CONTOUR = '#1C1610';
const WOOD = '#673E19';
const WOOD_LIGHT = '#8C5828';
const WOOD_DEEP = '#4A2A0C';
const FRAME_SHADOW = `inset 0 var(--bevel-width) 0 0 ${WOOD_LIGHT}, inset 0 calc(var(--bevel-width) * -1) 0 0 ${WOOD_DEEP}, 0 var(--ui-depth-lg) 0 0 ${CONTOUR}`;

export function GamifiedBoard({
  children,
  bannerTitle,
  className = '',
  contentClassName = '',
  fillHeight = false,
}: GamifiedBoardProps) {
  return (
    <div className={`relative ${fillHeight ? 'flex flex-col' : ''} ${className}`}>
      <div className="absolute -top-[34px] left-1/2 -translate-x-1/2 z-30 w-[min(460px,70%)] pointer-events-none">
        <RibbonBanner className="w-full" bevelWidth={3}>
          <span className="font-arcade font-black text-2xl text-white uppercase tracking-wider leading-none drop-shadow-[0_2px_0_rgba(0,0,0,0.6)]">
            {bannerTitle}
          </span>
        </RibbonBanner>
      </div>

      <GamifiedCornerCaps />

      <div
        className={`relative flex-1 rounded-[var(--radius-lg)] border-[4px] p-3 md:p-4 overflow-hidden ${fillHeight ? 'flex flex-col' : ''}`}
        style={{ borderColor: CONTOUR, backgroundColor: WOOD, boxShadow: FRAME_SHADOW }}
      >
        {/* Inset cork tray — recessed, so it keeps the site's --shadow-sunken. */}
        <div className={`relative flex-1 rounded-xl border-[3px] border-[#1C1610] bg-[#C48F52] shadow-[var(--shadow-sunken)] ${fillHeight ? 'flex flex-col min-h-0' : ''}`}>
          <div className="absolute inset-0 pointer-events-none opacity-35 bg-[radial-gradient(#8C5828_1.5px,transparent_1.5px)] [background-size:20px_20px]" />

          <div className={`relative z-10 ${fillHeight ? 'flex-1 min-h-0 flex flex-col justify-center items-center' : ''} ${contentClassName}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
