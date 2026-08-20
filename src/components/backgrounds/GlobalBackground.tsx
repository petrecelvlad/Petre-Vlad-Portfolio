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
  // Skills and Projects sections display the static wood boards background when any segmented3
  // variant is selected (segmented3-lite/-loop are performance-test forks, same hero-only scoping).
  const isSegmentedVariant = background === 'segmented3' || background === 'segmented3-lite' || background === 'segmented3-loop';
  const effectiveBackground = (section !== 'hero' && isSegmentedVariant) ? 'wood' : background;

  const strategy = BackgroundStrategyRegistry.getStrategy(skin, effectiveBackground);

  if (!strategy) return null;

  return <>{strategy.render({ skin, background: effectiveBackground, isVisible })}</>;
}

