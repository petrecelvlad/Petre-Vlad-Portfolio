import { IBackgroundStrategy } from './IBackgroundStrategy';
import { Segmented3BackgroundStrategy } from './Segmented3BackgroundStrategy';
import { Segmented3LiteBackgroundStrategy } from './Segmented3LiteBackgroundStrategy';
import { Segmented3LoopBackgroundStrategy } from './Segmented3LoopBackgroundStrategy';
import { CorridorBackgroundStrategy } from './CorridorBackgroundStrategy';
import { GameBoyBackgroundStrategy } from './GameBoyBackgroundStrategy';
import { WoodBackgroundStrategy } from './WoodBackgroundStrategy';
import { SkinId, BackgroundId } from '@/src/context/SkinContext';

export class BackgroundStrategyRegistry {
  private static strategies: IBackgroundStrategy[] = [
    new Segmented3BackgroundStrategy(),
    new Segmented3LiteBackgroundStrategy(),
    new Segmented3LoopBackgroundStrategy(),
    new GameBoyBackgroundStrategy(),
    new CorridorBackgroundStrategy(),
    new WoodBackgroundStrategy(),
  ];

  public static getStrategy(skin: SkinId, background: BackgroundId): IBackgroundStrategy | undefined {
    return this.strategies.find((strategy) => strategy.supports(skin, background));
  }

  public static registerStrategy(strategy: IBackgroundStrategy): void {
    this.strategies.unshift(strategy);
  }
}
