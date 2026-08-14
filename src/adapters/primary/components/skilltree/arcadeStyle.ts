import type { CSSProperties } from 'react';
import type { CategoryConfig } from '@/src/core/domain/skillTreeTypes';

export type PillState = 'default' | 'onPath' | 'active';

/**
 * Same construction logic as `bento/shared/BentoAchievement.tsx`'s `shadow-[var(--shadow-raised)]`
 * treatment (the project section's achievement bar) — a SINGLE element, a SINGLE border, and
 * an all-inset layered box-shadow (light line top, dark line bottom, soft ambient drop shadow)
 * to read as embossed/raised. No second DOM layer, no offset/translate shape, no glow — the
 * two earlier attempts here (a box-shadow "hanging" extrusion, then a two-bordered-layer stack)
 * both invented a different technique instead of reusing the one already established sitewide.
 * The only thing that varies per category is the bottom inset line's color (`bgBottom`,
 * standing in for `--shadow-raised`'s fixed dark tone) — the top highlight and ambient shadow
 * reuse the exact same warm cream / charcoal tones `--shadow-raised` itself uses in index.css,
 * so pills still read as the same material as the rest of the site, just recolored per category.
 */
export function getArcadeBevelStyle(cat: CategoryConfig, state: PillState): CSSProperties {
  const topHighlight = state === 'active' ? 0.7 : state === 'onPath' ? 0.6 : 0.5;
  return {
    backgroundColor: cat.bgBase,
    boxShadow: `inset 0 3px 0 0 rgba(255,246,219,${topHighlight}), inset 0 -3px 0 0 ${cat.bgBottom}, 0 var(--ui-depth) calc(var(--ui-depth) * 3) rgba(20,14,8,0.4)`,
    outline: state === 'active' ? '2px solid #FFFFFF' : state === 'onPath' ? `2px solid ${cat.bgTop}` : 'none',
    outlineOffset: '0px',
  };
}
