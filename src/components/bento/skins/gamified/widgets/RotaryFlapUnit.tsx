import React, { useState } from 'react';
import { GamifiedSharedDefs } from './GamifiedSharedDefs';

interface RotaryFlapUnitProps {
  initialValue?: number;
  onChange?: (val: number) => void;
  className?: string;
}

export function RotaryFlapUnit({
  initialValue = 8,
  onChange,
  className = ""
}: RotaryFlapUnitProps) {
  const [val, setVal] = useState(initialValue);

  const handleClick = () => {
    const nextVal = (val + 1) % 100;
    setVal(nextVal);
    if (onChange) onChange(nextVal);
  };

  const tens = Math.floor(val / 10);
  const ones = val % 10;
  const rotationAngle = (val * 36) % 360; // 10 ticks per revolution or calculated angle

  return (
    <svg
      viewBox="-12 -12 245 165"
      className={`w-full h-auto cursor-pointer select-none ${className}`}
      onClick={handleClick}
      xmlns="http://www.w3.org/2000/svg"
    >
      <GamifiedSharedDefs idPrefix="rf" />
      <g filter="url(#rf-shadow-heavy)">
        {/* Base Plate 3D Base */}
        <rect x="0" y="12" width="220" height="120" rx="10" fill="#180E04" stroke="#0F0803" strokeWidth="3" />
        <rect x="0" y="0" width="220" height="120" rx="10" fill="#291A10" stroke="#0F0803" strokeWidth="3" />

        {/* Left: Heavy Rotary Bakelite Knob */}
        <g transform="translate(60, 60)">
          {/* Drop Shadow */}
          <circle cx="3" cy="5" r="42" fill="#000000" opacity="0.6" />
          {/* Outer Notched Ring (Bakelite Grips) */}
          <circle cx="0" cy="0" r="42" fill="#1C1917" stroke="#09090B" strokeWidth="2" />
          {/* Ridges / Teeth */}
          <path d="M 0 -42 L 0 42 M -42 0 L 42 0 M -30 -30 L 30 30 M -30 30 L 30 -30" stroke="#27272A" strokeWidth="5" />
          {/* Inner Metal Bezel */}
          <circle cx="0" cy="0" r="34" fill="#D97706" stroke="#78350F" strokeWidth="2" />
          {/* Dial Face */}
          <circle cx="0" cy="0" r="30" fill="#18181B" />
          {/* Tick Marks */}
          <path
            d="M 0 -28 L 0 -22 M 20 -20 L 15 -15 M 28 0 L 22 0 M 20 20 L 15 15 M 0 28 L 0 22 M -20 20 L -15 15 M -28 0 L -22 0 M -20 -20 L -15 -15"
            stroke="#A1A1AA"
            strokeWidth="2"
          />
          {/* Raised Center Cap */}
          <circle cx="0" cy="0" r="18" fill="#27272A" stroke="#09090B" strokeWidth="2" />

          {/* Indicator Pointer Line rotated dynamically */}
          <g transform={`rotate(${rotationAngle})`} className="transition-transform duration-200">
            <line x1="0" y1="0" x2="0" y2="-26" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="0" cy="0" r="4" fill="#DC2626" />
          </g>
        </g>

        {/* Right: 3D Split-Flap Counter Unit */}
        <g transform="translate(130, 30)" filter="url(#rf-shadow-soft)">
          <rect x="0" y="0" width="75" height="60" rx="6" fill="#09090B" stroke="#27272A" strokeWidth="2" />
          {/* Flap Card 1 (Tens) */}
          <g transform="translate(8, 8)">
            <rect x="0" y="0" width="26" height="44" rx="3" fill="#18181B" stroke="#3F3F46" strokeWidth="1" />
            <line x1="0" y1="22" x2="26" y2="22" stroke="#09090B" strokeWidth="2" />
            <text x="5" y="31" fontFamily="monospace" fontWeight="900" fontSize="24" fill="#FFFFFF">
              {tens}
            </text>
          </g>
          {/* Flap Card 2 (Ones) */}
          <g transform="translate(40, 8)">
            <rect x="0" y="0" width="26" height="44" rx="3" fill="#18181B" stroke="#3F3F46" strokeWidth="1" />
            <line x1="0" y1="22" x2="26" y2="22" stroke="#09090B" strokeWidth="2" />
            <text x="5" y="31" fontFamily="monospace" fontWeight="900" fontSize="24" fill="#EAB308">
              {ones}
            </text>
          </g>
          {/* Middle Hinge Clip */}
          <rect x="4" y="27" width="67" height="4" fill="#000000" opacity="0.8" />
        </g>
      </g>
    </svg>
  );
}
