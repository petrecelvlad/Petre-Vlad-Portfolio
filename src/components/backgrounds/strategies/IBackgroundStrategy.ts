import React from 'react';
import { SkinId, BackgroundId } from '@/src/context/SkinContext';

export interface BackgroundStrategyProps {
  skin: SkinId;
  background: BackgroundId;
  isVisible?: boolean;
}

export interface IBackgroundStrategy {
  id: string;
  supports(skin: SkinId, background: BackgroundId): boolean;
  render(props: BackgroundStrategyProps): React.ReactNode;
}
