import React from 'react';
import { useSkin } from '@/src/context/SkinContext';
import { BackgroundStrategyRegistry } from '@/src/components/backgrounds/strategies/BackgroundStrategyRegistry';

interface GlobalBackgroundProps {
  section?: 'hero' | 'skills' | 'projects';
  isVisible?: boolean;
}

export function GlobalBackground({ section = 'hero', isVisible = true }: GlobalBackgroundProps) {
  const { skin, background } = useSkin();

  // The 3-segmented stage ("triple background") is strictly attached to the hero section.
  // Skills and Projects sections display the static wood boards background when segmented3 is selected.
  const effectiveBackground = (section !== 'hero' && background === 'segmented3')
    ? 'wood'
    : background;

  const strategy = BackgroundStrategyRegistry.getStrategy(skin, effectiveBackground);

  if (!strategy) return null;

  return <>{strategy.render({ skin, background: effectiveBackground, isVisible })}</>;
}

