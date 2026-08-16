import React from 'react';
import { IBackgroundStrategy, BackgroundStrategyProps } from './IBackgroundStrategy';
import { SkinId, BackgroundId } from '@/src/context/SkinContext';
import { WoodBackground } from '@/src/components/bento/skins/heritage/WoodBackground';

export class WoodBackgroundStrategy implements IBackgroundStrategy {
  id = 'wood';

  supports(skin: SkinId, background: BackgroundId): boolean {
    return background === 'wood';
  }

  render(_props: BackgroundStrategyProps): React.ReactNode {
    return (
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <WoodBackground />
      </div>
    );
  }
}
