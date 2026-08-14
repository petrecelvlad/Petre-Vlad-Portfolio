import React from 'react';
import { GamifiedSharedDefs } from './GamifiedSharedDefs';

interface WorkbenchHeaderProps {
  title?: string;
  subtitle?: string;
  statusText?: string;
  statusActive?: boolean;
  className?: string;
}

export function WorkbenchHeader({
  title = "TACTILE LAB :: SPRITE 3D",
  subtitle = "CATALOG v2.5",
  statusText = "SYS_OK",
  statusActive = true,
  className = ""
}: WorkbenchHeaderProps) {
  return (
    <svg
      viewBox="0 0 740 50"
      className={`w-full h-auto max-w-full select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <GamifiedSharedDefs idPrefix="wh" />
      <g filter="url(#wh-shadow-medium)">
        {/* Base Plate Extrusion */}
        <path d="M 0 42 L 740 42 L 740 48 L 0 48 Z" fill="#111827" />
        {/* Front Plate */}
        <rect x="0" y="0" width="740" height="44" rx="6" fill="#374151" stroke="#111827" strokeWidth="2" />
        {/* Bevel Light */}
        <line x1="2" y1="2" x2="738" y2="2" stroke="#6B7280" strokeWidth="2" />

        {/* Dymo Tape Stamped Header Label */}
        <g transform="translate(15, 7)">
          <rect x="0" y="0" width="270" height="30" rx="3" fill="#18181B" stroke="#000000" strokeWidth="2" />
          <text
            x="12"
            y="21"
            fontFamily="monospace"
            fontWeight="900"
            fontSize="14"
            fill="#FFFFFF"
            letterSpacing="2"
            style={{ filter: 'drop-shadow(0px -1px 0px #000)' }}
          >
            {title}
          </text>
        </g>

        {/* Status LEDs */}
        <g transform="translate(300, 12)">
          <circle cx="12" cy="10" r="7" fill={statusActive ? "#15803D" : "#7F1D1D"} stroke="#052E16" strokeWidth="2" />
          <circle cx="12" cy="10" r="5" fill={statusActive ? "#22C55E" : "#DC2626"} />
          <circle cx="10" cy="8" r="2" fill="#DCFCE7" opacity="0.8" />
          <text x="25" y="14" fontFamily="sans-serif" fontWeight="bold" fontSize="10" fill="#D1D5DB">
            {statusText}
          </text>
        </g>

        {/* Dymo Tape Sub-Label */}
        <g transform="translate(535, 7)">
          <rect x="0" y="0" width="190" height="30" rx="3" fill="#854D0E" stroke="#451A03" strokeWidth="2" />
          <text
            x="12"
            y="20"
            fontFamily="monospace"
            fontWeight="900"
            fontSize="13"
            fill="#FEF08A"
            letterSpacing="1.5"
          >
            {subtitle}
          </text>
        </g>

        {/* Screws on Header */}
        <circle cx="8" cy="22" r="3" fill="#9CA3AF" stroke="#1F2937" />
        <line x1="6" y1="22" x2="10" y2="22" stroke="#374151" strokeWidth="1.5" />
        <circle cx="732" cy="22" r="3" fill="#9CA3AF" stroke="#1F2937" />
        <line x1="730" y1="22" x2="734" y2="22" stroke="#374151" strokeWidth="1.5" />
      </g>
    </svg>
  );
}
