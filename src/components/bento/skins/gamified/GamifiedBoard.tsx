import type { ReactNode } from 'react';
import { GamifiedBannerPlaque } from './GamifiedBannerPlaque';
import { SteelCornerBrackets } from './GamifiedSVGAssets';

interface GamifiedBoardProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  fillHeight?: boolean;
  bannerTitle?: string;
}

export function GamifiedBoard({
  children,
  className = '',
  contentClassName = '',
  fillHeight = false,
  bannerTitle = "HERO SKILL TREE",
}: GamifiedBoardProps) {
  return (
    <div className={`relative ${fillHeight ? 'flex flex-col' : ''} ${className}`}>
      <GamifiedBannerPlaque title={bannerTitle} />

      {/* Main Wooden Frame Container — same raised treatment as
          GamifiedParchmentPanel's hanging bar (--shadow-raised: top highlight,
          bottom shade, soft ambient shadow), so the two boards read as the same
          material instead of one being flat brown next to a raised one. */}
      {/* p-3 md:p-4 here is load-bearing: GamifiedSVGAssets.tsx's FRAME_PADDING
          must match this md value exactly, or the corner-bracket rivets (and
          on a big enough gap, the bracket itself) drift off the wood band. */}
      <div className={`relative flex-1 rounded-[var(--radius-lg)] border-[4px] border-[#1C1610] shadow-[var(--shadow-raised)] bg-[#673E19] p-3 md:p-4 overflow-hidden ${fillHeight ? 'flex flex-col' : ''}`}>
        <SteelCornerBrackets />

        {/* Inset Cork Interior Canvas — a recessed tray, so it reuses the site's own
            --shadow-sunken token (same construction as BentoAchievement.tsx's
            --shadow-raised) instead of a bespoke gradient + inset shadow. */}
        <div className={`relative flex-1 rounded-xl border-[3px] border-[#1C1610] bg-[#C48F52] shadow-[var(--shadow-sunken)] ${fillHeight ? 'flex flex-col min-h-0' : ''}`}>
          {/* Grid dot overlay pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-35 bg-[radial-gradient(#8C5828_1.5px,transparent_1.5px)] [background-size:20px_20px]" />

          {/* Children Content Layer */}
          <div className={`relative z-10 ${fillHeight ? 'flex-1 min-h-0 flex flex-col justify-center items-center' : ''} ${contentClassName}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
