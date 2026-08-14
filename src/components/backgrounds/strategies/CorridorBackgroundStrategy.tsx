import React from 'react';
import { IBackgroundStrategy, BackgroundStrategyProps } from './IBackgroundStrategy';
import { SkinId, BackgroundId } from '@/src/context/SkinContext';
import { CorridorShaderBackground } from '@/src/components/backgrounds/CorridorShaderBackground';

export class CorridorBackgroundStrategy implements IBackgroundStrategy {
  id = 'corridor';

  supports(skin: SkinId, background: BackgroundId): boolean {
    return background === 'corridor';
  }

  render(_props: BackgroundStrategyProps): React.ReactNode {
    return (
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <CorridorShaderBackground />
      </div>
    );
  }
}
