import React from 'react';
import { IBackgroundStrategy, BackgroundStrategyProps } from './IBackgroundStrategy';
import { SkinId, BackgroundId } from '@/src/context/SkinContext';
import { SegmentedGalaxianBackground } from '@/src/components/backgrounds/SegmentedGalaxianBackground';

export class Segmented3BackgroundStrategy implements IBackgroundStrategy {
  id = 'segmented3';

  supports(_skin: SkinId, background: BackgroundId): boolean {
    return background === 'segmented3';
  }

  render(props: BackgroundStrategyProps): React.ReactNode {
    return <SegmentedGalaxianBackground pass="full" isVisible={props.isVisible} />;
  }
}
