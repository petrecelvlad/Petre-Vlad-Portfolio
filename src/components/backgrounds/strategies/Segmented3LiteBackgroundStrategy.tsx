import React from 'react';
import { IBackgroundStrategy, BackgroundStrategyProps } from './IBackgroundStrategy';
import { SkinId, BackgroundId } from '@/src/context/SkinContext';
import { SegmentedGalaxianBackgroundLite } from '@/src/components/backgrounds/SegmentedGalaxianBackgroundLite';

export class Segmented3LiteBackgroundStrategy implements IBackgroundStrategy {
  id = 'segmented3-lite';

  supports(_skin: SkinId, background: BackgroundId): boolean {
    return background === 'segmented3-lite';
  }

  render(props: BackgroundStrategyProps): React.ReactNode {
    return <SegmentedGalaxianBackgroundLite pass="full" isVisible={props.isVisible} />;
  }
}
