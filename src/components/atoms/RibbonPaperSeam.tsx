import React from 'react';
import { darken } from '@/src/components/bento/shared/palette';

export interface RibbonPaperSeamProps {
  className?: string;
  paperColor?: string;
  outlineColor?: string;
}

/**
 * RibbonPaperSeam: a small joinery shape for the transition between `PixelRibbonBanner` and
 * `TornPaperPanel` — one shallow-sagging band in a darkened shade of the paper's own color, one
 * thin transitional stroke, one flat offset shadow. Modeled on `BentoResponsibilities.tsx`'s
 * `BinderClip` (one small shape + one shadow straddling a seam between two different objects),
 * not on `GamePlaque`'s one-continuous-outline technique — ribbon and paper are genuinely two
 * different objects here, not one molded piece, so this bridges the seam rather than merging it.
 */
export const RibbonPaperSeam: React.FC<RibbonPaperSeamProps> = ({
  className = '',
  paperColor = '#FFFDF7',
  outlineColor = '#1C1610',
}) => {
  const bandColor = darken(paperColor, 18);
  const path = 'M 0 4 Q 50 14 100 4 L 100 16 L 0 16 Z';

  return (
    <div className={`pointer-events-none ${className}`} style={{ filter: `drop-shadow(0 2px 0 ${outlineColor})` }}>
      {/* Purely decorative — hiding TornPaperPanel's punch-hole row is `PixelRibbonBanner`'s own
          negative-margin overlap's job (proven to work on its own), not this element's. This is
          positioned absolutely over the paper's top edge in Hero.tsx, so it never participates in
          block-flow margin math between the ribbon and the paper. */}
      <svg viewBox="0 0 100 16" preserveAspectRatio="none" className="block w-full h-5" xmlns="http://www.w3.org/2000/svg">
        <path d={path} fill={bandColor} stroke={outlineColor} strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
};

export default RibbonPaperSeam;
