import React from 'react';
import { GamePlaque } from '@/src/components/atoms/GamePlaque';
import { GamePlaqueAltA } from '@/src/components/atoms/gameplaque-alts/GamePlaqueAltA';
import { GamePlaqueAltB } from '@/src/components/atoms/gameplaque-alts/GamePlaqueAltB';
import { GamePlaqueAltC } from '@/src/components/atoms/gameplaque-alts/GamePlaqueAltC';
import referenceImage from './reference-weekly-missions.png';

/**
 * @propolis
 * {
 *   "role": "COMPONENT",
 *   "constraints": ["Dev-only comparison harness — not imported by App.tsx, not part of the production bundle path"],
 *   "agent_instructions": "Screenshot rig for cone/project/specs/GAME_PLAQUE_SVG_BRIEF.md. Served via plaque-showcase.html (project root) so it never touches App.tsx/main.tsx. Renders the current GamePlaque plus the three Alt implementations, each wrapped around the same content AnimatedRoleTitle.tsx uses, so they're directly comparable at the same size/content. Keep in sync with that content if it changes; otherwise leave alone. reference-weekly-missions.png (this folder) is a local copy of the true reference, kept here because the original project-root image.png/image copy.png were both destroyed by an earlier version of this harness importing them directly and a screenshot script overwriting them — do not import from the project root here again, and do not delete this local copy."
 * }
 */

const RoleContent: React.FC = () => (
  <h2 className="font-arcade font-bold text-lg sm:text-xl lg:text-2xl text-[#FFFDF7] uppercase tracking-wider leading-none flex justify-center items-center drop-shadow-[0_2px_0_rgba(0,0,0,0.6)]">
    <span className="inline-flex items-center text-left select-none w-[15.5ch] justify-start">
      <span className="whitespace-pre">GAME </span>
      <span className="text-white">PRODUCER</span>
    </span>
  </h2>
);

const Cell: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="flex flex-col items-center gap-3 p-6 bg-[#0b1a24]" data-testid={`cell-${title}`}>
    <span className="font-mono text-xs text-white/70">{title}</span>
    <div className="flex items-center justify-center min-h-[110px]">{children}</div>
  </div>
);

export const GamePlaqueShowcase: React.FC = () => (
  <div className="min-h-screen bg-[#0b1a24] py-10">
    <div className="grid grid-cols-1 gap-6 max-w-[720px] mx-auto">
      <Cell title="reference-image.png">
        <img src={referenceImage} alt="reference" className="max-w-[400px]" />
      </Cell>
      <Cell title="current-GamePlaque">
        <GamePlaque label="ROLE">
          <RoleContent />
        </GamePlaque>
      </Cell>
      <Cell title="AltA-hand-bezier">
        <GamePlaqueAltA label="ROLE">
          <RoleContent />
        </GamePlaqueAltA>
      </Cell>
      <Cell title="AltB-primitive-merge">
        <GamePlaqueAltB label="ROLE">
          <RoleContent />
        </GamePlaqueAltB>
      </Cell>
      <Cell title="AltC-traced-contour">
        <GamePlaqueAltC label="ROLE">
          <RoleContent />
        </GamePlaqueAltC>
      </Cell>
    </div>
  </div>
);

export default GamePlaqueShowcase;
