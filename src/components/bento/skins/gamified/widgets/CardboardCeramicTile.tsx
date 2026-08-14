import React from 'react';
import { GamifiedSharedDefs } from './GamifiedSharedDefs';

interface CardboardCeramicTileProps {
  cardboardColor?: string;
  ceramicColor?: string;
  iconPath?: string;
  onClick?: () => void;
  className?: string;
}

export function CardboardCeramicTile({
  cardboardColor = "#D4A373",
  ceramicColor = "#F8FAFC",
  onClick,
  className = ""
}: CardboardCeramicTileProps) {
  return (
    <svg
      viewBox="-30 -12 260 160"
      className={`w-full h-auto cursor-pointer transition-transform duration-150 active:scale-98 ${className}`}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
    >
      <GamifiedSharedDefs idPrefix="cct" />
      <g filter="url(#cct-shadow-medium)">
        {/* Layer 1: Corrugated Cardboard Base */}
        <path
          d="M 10 0 L 210 0 A 8 8 0 0 1 218 8 L 218 122 A 8 8 0 0 1 210 130 L 10 130 A 8 8 0 0 1 2 122 L 2 8 A 8 8 0 0 1 10 0 Z"
          fill={cardboardColor}
          stroke="#523917"
          strokeWidth="2"
        />
        {/* Torn Left Edge showing Inner Fluting */}
        <path
          d="M 2 12 L -8 20 L 2 32 L -8 44 L 2 56 L -8 68 L 2 80 L -8 92 L 2 104 L -8 116 L 2 124 Z"
          fill="url(#cct-cardboard-flute)"
          stroke="#6E4D2B"
          strokeWidth="1.5"
        />

        {/* Brass Grommet & String */}
        <circle cx="20" cy="20" r="7" fill="#B45309" stroke="#451A03" strokeWidth="2" />
        <circle cx="20" cy="20" r="3.5" fill="#24160E" />
        {/* String looping out */}
        <path d="M 20 20 C 0 10 -15 30 -25 5" fill="none" stroke="#EAB308" strokeWidth="2.5" strokeDasharray="4,2" />

        {/* Layer 2: Raised Beveled Ceramic Tile attached on top */}
        <g transform="translate(65, 18)" filter="url(#cct-shadow-soft)">
          {/* Ceramic Extrusion Base */}
          <rect x="0" y="8" width="120" height="90" rx="8" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
          {/* Ceramic Face */}
          <rect x="0" y="0" width="120" height="90" rx="8" fill={ceramicColor} stroke="#475569" strokeWidth="2" />
          <line x1="4" y1="3" x2="116" y2="3" stroke="#FFFFFF" strokeWidth="2" />
          {/* Debossed Icon Artwork */}
          <rect x="15" y="12" width="90" height="66" rx="4" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
          {/* Debossed Glyph (Heart) */}
          <path d="M 60 60 L 40 40 A 12 12 0 0 1 60 25 A 12 12 0 0 1 80 40 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
          <path d="M 60 55 L 45 40 A 8 8 0 0 1 60 29 A 8 8 0 0 1 75 40 Z" fill="#EF4444" />
        </g>
      </g>
    </svg>
  );
}
