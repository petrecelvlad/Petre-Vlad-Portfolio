import React from 'react';

export interface WorkbenchHeaderControlBarProps {
  toggleState: boolean;
}

export function WorkbenchHeaderControlBar({ toggleState }: WorkbenchHeaderControlBarProps) {
  return (
    <g id="header-bar" filter="url(#wm-shadow-medium)">
      {/* Base Plate Extrusion */}
      <path d="M 35 70 L 765 70 L 765 76 L 35 76 Z" fill="#111827" />
      {/* Front Plate */}
      <rect x="35" y="28" width="730" height="44" rx="6" fill="#374151" stroke="#111827" strokeWidth="2" />
      {/* Bevel Light */}
      <line x1="37" y1="30" x2="763" y2="30" stroke="#6B7280" strokeWidth="2" />

      {/* Dymo Tape Stamped Header Label */}
      <g id="dymo-title">
        <rect x="50" y="35" width="260" height="30" rx="3" fill="#18181B" stroke="#000000" strokeWidth="2" />
        <text x="60" y="56" fontFamily="monospace" fontWeight="900" fontSize="15" fill="#FFFFFF" letterSpacing="2" filter="drop-shadow(0px -1px 0px #000)">
          TACTILE LAB :: SPRITE 3D
        </text>
      </g>

      {/* Status LEDs */}
      <g transform="translate(325, 40)">
        <circle cx="12" cy="10" r="7" fill={toggleState ? "#15803D" : "#450A0A"} stroke="#052E16" strokeWidth="2" />
        <circle cx="12" cy="10" r="5" fill={toggleState ? "#22C55E" : "#7F1D1D"} />
        <circle cx="10" cy="8" r="2" fill="#DCFCE7" opacity="0.8" />
        <text x="25" y="14" fontFamily="sans-serif" fontWeight="bold" fontSize="10" fill={toggleState ? "#22C55E" : "#94A3B8"}>
          {toggleState ? "SYS_OK" : "STANDBY"}
        </text>
      </g>

      {/* Dymo Tape Sub-Label */}
      <g id="dymo-sub" transform="translate(560, 35)">
        <rect x="0" y="0" width="190" height="30" rx="3" fill="#854D0E" stroke="#451A03" strokeWidth="2" />
        <text x="12" y="20" fontFamily="monospace" fontWeight="900" fontSize="14" fill="#FEF08A" letterSpacing="1.5">
          CATALOG v2.5
        </text>
      </g>

      {/* Screws on Header */}
      <circle cx="42" cy="50" r="3" fill="#9CA3AF" stroke="#1F2937" />
      <line x1="40" y1="50" x2="44" y2="50" stroke="#374151" strokeWidth="1.5" />
      <circle cx="758" cy="50" r="3" fill="#9CA3AF" stroke="#1F2937" />
      <line x1="756" y1="50" x2="760" y2="50" stroke="#374151" strokeWidth="1.5" />
    </g>
  );
}
