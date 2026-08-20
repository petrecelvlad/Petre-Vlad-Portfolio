/**
 * @propolis
 * {
 *   "role": "UTILITY",
 *   "constraints": ["Shared prop contract only — each Alt component's shape-construction logic is independent, by design (see GAME_PLAQUE_SVG_BRIEF.md)"],
 *   "agent_instructions": "Comparison scaffolding for the GamePlaque shape rebuild (cone/project/specs/GAME_PLAQUE_SVG_BRIEF.md). Mirrors GamePlaqueProps in ../GamePlaque.tsx so all three alternatives stay directly comparable/swappable in the showcase harness."
 * }
 */

import type React from 'react';

export interface GamePlaqueAltProps {
  children: React.ReactNode;
  label?: string;
  className?: string;
  topBandColor?: string;
  faceColor?: string;
  bottomBandColor?: string;
  indentColor?: string;
  strokeColor?: string;
  shadowColor?: string;
  labelTextColor?: string;
  strokeWidth?: number;
  shadowOffset?: number;
}

export const DEFAULT_ALT_PROPS = {
  topBandColor: '#FFE233',
  faceColor: '#FBBA0D',
  bottomBandColor: '#C99106',
  indentColor: '#D06B03',
  strokeColor: '#1C1610',
  shadowColor: '#1C1610',
  labelTextColor: '#FFFDF7',
  strokeWidth: 3,
  shadowOffset: 4,
} as const;
