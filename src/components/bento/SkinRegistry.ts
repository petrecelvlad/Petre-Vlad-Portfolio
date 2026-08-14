import React, { ComponentType } from 'react';
import { SkinId } from '@/src/context/SkinContext';
import { ISkinStrategy, SlotRegistry, BoardContainerProps } from '@/src/core/domain/skinStrategy';
import { SlotName } from './ports';

import { BentoHeader as HeritageHeader } from './skins/heritage/BentoHeader';
import { BentoResponsibilities as HeritageResponsibilities } from './skins/heritage/BentoResponsibilities';
import { BentoSkills as HeritageSkills } from './skins/heritage/BentoSkills';
import { DeskBoard } from './skins/heritage/DeskBoard';

import { BentoAchievement as SharedAchievement } from './shared/BentoAchievement';

import { GamifiedBoard } from './skins/gamified/GamifiedBoard';

const HERITAGE_STRATEGY: ISkinStrategy = {
  id: 'heritage',
  name: 'Heritage',
  slots: {
    header: HeritageHeader,
    responsibilities: HeritageResponsibilities,
    skills: HeritageSkills,
    achievement: SharedAchievement,
  },
  BoardContainer: DeskBoard as ComponentType<BoardContainerProps>,
};

const GAMIFIED_STRATEGY: ISkinStrategy = {
  id: 'gamified',
  name: 'Gamified Tactile',
  slots: {
    header: HeritageHeader,
    responsibilities: HeritageResponsibilities,
    skills: HeritageSkills,
    achievement: SharedAchievement,
  },
  BoardContainer: GamifiedBoard,
};

export class SkinRegistry {
  private static strategies: Record<SkinId, ISkinStrategy> = {
    heritage: HERITAGE_STRATEGY,
    gamified: GAMIFIED_STRATEGY,
  };

  public static getStrategy(skinId: SkinId): ISkinStrategy {
    return this.strategies[skinId] ?? GAMIFIED_STRATEGY;
  }

  public static resolveSlot<S extends SlotName>(skinId: SkinId, slot: S): SlotRegistry[S] {
    const strategy = this.getStrategy(skinId);
    return strategy.slots[slot];
  }

  public static getBoardContainer(skinId: SkinId): ComponentType<BoardContainerProps> {
    return this.getStrategy(skinId).BoardContainer;
  }

  public static registerStrategy(strategy: ISkinStrategy): void {
    this.strategies[strategy.id] = strategy;
  }
}

