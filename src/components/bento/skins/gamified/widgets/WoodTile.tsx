import React from 'react';
import { GamifiedSharedDefs } from './GamifiedSharedDefs';

interface WoodTileProps {
  label?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export function WoodTile({
  label = "OAK_BLOCK_01",
  onClick,
  className = "",
  children
}: WoodTileProps) {
  return (
    <svg
      viewBox="-12 -12 245 160"
      className={`w-full h-auto cursor-pointer transition-transform duration-150 active:scale-98 ${className}`}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
    >
      <GamifiedSharedDefs idPrefix="wt" />
      <g filter="url(#wt-shadow-heavy)">
        {/* 3D Extruded Base */}
        <rect x="0" y="12" width="210" height="110" rx="10" fill="#3A1E05" stroke="#1C0D02" strokeWidth="3" />
        {/* Tile Front Face */}
        <rect x="0" y="0" width="210" height="110" rx="10" fill="#854D0E" stroke="#1C0D02" strokeWidth="3" />
        {/* Top Bevel Highlight */}
        <path d="M 8 3 L 202 3" stroke="#A16207" strokeWidth="2" strokeLinecap="round" />
        {/* Inner Inset Tray */}
        <rect x="12" y="12" width="186" height="86" rx="6" fill="#713F12" stroke="#3B1F04" strokeWidth="2" />
        
        {/* Content area: default brass gear emblem */}
        {children ? (
          <foreignObject x="15" y="15" width="180" height="60">
            <div className="w-full h-full flex items-center justify-center text-amber-100 font-bold">
              {children}
            </div>
          </foreignObject>
        ) : (
          <>
            {/* Stamped Brass Emblem */}
            <circle cx="105" cy="55" r="28" fill="#D97706" stroke="#451A03" strokeWidth="3" />
            <circle cx="105" cy="55" r="24" fill="#B45309" />
            {/* Gear Icon */}
            <path
              d="M 105 37 L 109 37 L 111 42 L 115 43 L 119 40 L 122 43 L 119 47 L 121 51 L 126 53 L 126 57 L 121 59 L 119 63 L 122 67 L 119 70 L 111 68 L 109 73 L 105 73 L 101 73 L 99 68 L 95 67 L 91 70 L 88 67 L 91 63 L 89 59 L 84 57 L 84 53 L 89 51 L 91 47 L 88 43 L 91 40 L 95 43 L 99 42 L 101 37 Z"
              fill="#FEF3C7"
              stroke="#78350F"
              strokeWidth="1.5"
            />
            <circle cx="105" cy="55" r="8" fill="#78350F" />
          </>
        )}

        {/* Dymo Tag Stamped Below */}
        <rect x="45" y="82" width="120" height="20" rx="2" fill="#09090B" stroke="#000" strokeWidth="1" />
        <text
          x="105"
          y="96"
          textAnchor="middle"
          fontFamily="monospace"
          fontSize="11"
          fontWeight="bold"
          fill="#FFF"
        >
          {label}
        </text>
      </g>
    </svg>
  );
}
