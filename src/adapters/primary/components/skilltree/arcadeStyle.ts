import type { CSSProperties } from 'react';
import type { CategoryConfig } from '@/src/core/domain/skillTreeTypes';
import type { ButtonColor } from '@/src/components/atoms/Button';

export type PillState = 'default' | 'onPath' | 'active';

// Skill pills and category badges are standard raised Buttons (components/atoms/Button.tsx) in their
// category's colors; only the selection state is skill-tree-specific. The selected one is pressed
// (aria-pressed, see .raised-button in index.css) and turns white; pills on the selected path get the
// category's lighter tint as an outline.
export function getArcadeButtonColor(cat: CategoryConfig, state: PillState): ButtonColor {
  return { fill: state === 'active' ? 'var(--color-button-white)' : cat.bgBase, deep: cat.bgBottom };
}

export function getArcadeHighlight(state: PillState): number {
  return state === 'active' ? 0.7 : state === 'onPath' ? 0.6 : 0.5;
}

export function getArcadeOutlineStyle(cat: CategoryConfig, state: PillState): CSSProperties {
  return {
    outline: state === 'onPath' ? `2px solid ${cat.bgTop}` : 'none',
    outlineOffset: '0px',
  };
}
