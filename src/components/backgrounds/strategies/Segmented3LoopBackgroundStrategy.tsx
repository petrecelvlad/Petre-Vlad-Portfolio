import React from 'react';
import { IBackgroundStrategy, BackgroundStrategyProps } from './IBackgroundStrategy';
import { SkinId, BackgroundId } from '@/src/context/SkinContext';
import { SegmentedGalaxianBackgroundLooped } from '@/src/components/backgrounds/SegmentedGalaxianBackgroundLooped';

export class Segmented3LoopBackgroundStrategy implements IBackgroundStrategy {
  id = 'segmented3-loop';

  supports(_skin: SkinId, background: BackgroundId): boolean {
    return background === 'segmented3-loop';
  }

  render(props: BackgroundStrategyProps): React.ReactNode {
    return <SegmentedGalaxianBackgroundLooped pass="full" isVisible={props.isVisible} />;
  }
}
