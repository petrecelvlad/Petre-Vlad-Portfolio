import React from 'react';
import { IBackgroundStrategy, BackgroundStrategyProps } from './IBackgroundStrategy';
import { SkinId, BackgroundId } from '@/src/context/SkinContext';
import { Segmented3ShaderBackground } from '@/src/components/backgrounds/Segmented3ShaderBackground';

export class Segmented3BackgroundStrategy implements IBackgroundStrategy {
  id = 'segmented3';

  supports(_skin: SkinId, background: BackgroundId): boolean {
    return background === 'segmented3';
  }

  render(props: BackgroundStrategyProps): React.ReactNode {
    return <Segmented3ShaderBackground isVisible={props.isVisible} />;
  }
}
