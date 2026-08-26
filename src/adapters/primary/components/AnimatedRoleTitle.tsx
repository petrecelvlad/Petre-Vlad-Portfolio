import React from 'react';
import { GamePlaque } from '@/src/components/atoms/GamePlaque';

export const AnimatedRoleTitle: React.FC = () => {
  return (
    <div className="mt-4 sm:mt-5 mb-2 flex justify-center items-center">
      <GamePlaque label="ROLE">
        <h2 className="font-arcade font-bold text-lg sm:text-xl lg:text-2xl text-[#FFFDF7] uppercase tracking-wider leading-none flex justify-center items-center drop-shadow-[0_2px_0_rgba(0,0,0,0.6)]">
          <span className="inline-flex items-center text-left select-none justify-start">
            <span className="whitespace-pre">GAME </span>
            <span className="text-white">PRODUCER</span>
          </span>
        </h2>
      </GamePlaque>
    </div>
  );
};

export default AnimatedRoleTitle;
