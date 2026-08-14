import React from 'react';
import { IBackgroundStrategy, BackgroundStrategyProps } from './IBackgroundStrategy';
import { SkinId, BackgroundId } from '@/src/context/SkinContext';
import { GameBoyShaderBackground } from '@/src/components/backgrounds/GameBoyShaderBackground';

export class GameBoyBackgroundStrategy implements IBackgroundStrategy {
  id = 'gameboy';

  supports(skin: SkinId, background: BackgroundId): boolean {
    return background === 'gameboy';
  }

  render(_props: BackgroundStrategyProps): React.ReactNode {
    return (
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <GameBoyShaderBackground />
      </div>
    );
  }
}
