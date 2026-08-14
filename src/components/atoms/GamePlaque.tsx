import React from 'react';

interface GamePlaqueProps {
  children: React.ReactNode;
  label?: string;
  className?: string;
}

/**
 * GamePlaque: A stylized wooden/game plaque container inspired by classic platformer/RPG UI badges.
 * Features outer bevels, dark game outlines, subtle wood notches, an inner recessed dark slot,
 * and a top-centered wooden "ROLE" plank tag.
 */
export const GamePlaque: React.FC<GamePlaqueProps> = ({ children, label = 'ROLE', className = '' }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center p-2.5 sm:p-3 rounded-2xl bg-gradient-to-b from-[#EE9B79] via-[#E28C6A] to-[#D27250] border-3 border-[#1C1610] select-none ${className}`}
      style={{
        boxShadow: '0 4px 0 0 #1C1610, inset 0 2px 0 0 #FFC3A8, inset 0 -2px 0 0 #A24B30',
      }}
    >
      {/* Top Center Wooden Tag ("ROLE") */}
      {label && (
        <div
          className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1 rounded-md bg-gradient-to-b from-[#FFAA85] via-[#E28C6A] to-[#B85333] border-2 border-[#1C1610] flex items-center justify-center select-none"
          style={{
            boxShadow: '0 2px 0 0 #1C1610, inset 0 1px 0 0 #FFD4C2',
          }}
        >
          {/* Left rivet / nail */}
          <span className="w-1.5 h-1.5 rounded-full bg-[#1C1610] border border-[#FFD4C2]/30 inline-block mr-2 shadow-[inset_0_0.5px_0_rgba(255,255,255,0.4)]" />
          {/* Label text */}
          <span className="font-arcade font-extrabold text-[12px] sm:text-[13px] text-[#FFFDF7] tracking-widest drop-shadow-[0_1px_0_#1C1610] uppercase leading-none">
            {label}
          </span>
          {/* Right rivet / nail */}
          <span className="w-1.5 h-1.5 rounded-full bg-[#1C1610] border border-[#FFD4C2]/30 inline-block ml-2 shadow-[inset_0_0.5px_0_rgba(255,255,255,0.4)]" />
        </div>
      )}
      {/* Wood notch / chisel detail top & bottom */}
      <div className="absolute top-[2px] left-[30%] w-2 h-[2px] bg-[#A24B30] rounded-full opacity-70" />
      <div className="absolute top-[2px] right-[25%] w-3 h-[2px] bg-[#FFC3A8] rounded-full opacity-80" />
      <div className="absolute bottom-[2px] left-[40%] w-3 h-[2px] bg-[#A24B30] rounded-full opacity-80" />
      <div className="absolute bottom-[2px] right-[35%] w-2 h-[2px] bg-[#A24B30] rounded-full opacity-70" />

      {/* Subtle wood grain line overlays */}
      <div className="absolute inset-0 pointer-events-none opacity-15 overflow-hidden rounded-2xl">
        <div className="absolute top-1/4 left-2 right-4 h-[1px] bg-[#1C1610]" />
        <div className="absolute top-2/3 left-6 right-2 h-[1px] bg-[#1C1610]" />
      </div>

      {/* Inner Recessed Slot */}
      <div
        className="relative w-full h-full bg-[#752D26] rounded-xl px-4 py-1.5 sm:px-6 sm:py-2 flex items-center justify-center border border-[#521E19]"
        style={{
          boxShadow: 'inset 0 3px 6px rgba(0, 0, 0, 0.45), inset 0 -1px 1px rgba(255, 255, 255, 0.1)',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default GamePlaque;
