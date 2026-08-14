import React from 'react';
import { GamifiedSharedDefs } from './GamifiedSharedDefs';

interface LeatherStrapProps {
  label?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export function LeatherStrap({
  label = "LEATHER BELT",
  onClick,
  className = "",
  children
}: LeatherStrapProps) {
  return (
    <svg
      viewBox="-12 -12 245 165"
      className={`w-full h-auto cursor-pointer transition-transform duration-150 active:scale-98 ${className}`}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
    >
      <GamifiedSharedDefs idPrefix="ls" />
      <g filter="url(#ls-shadow-heavy)">
        {/* Extruded Bottom Shadow Base */}
        <rect x="0" y="12" width="220" height="120" rx="12" fill="#2A1207" stroke="#1C0A04" strokeWidth="3" />
        {/* Leather Main Body */}
        <rect x="0" y="0" width="220" height="120" rx="12" fill="#7C2D12" stroke="#1C0A04" strokeWidth="3" />
        {/* Yellow Stitching Border */}
        <rect x="7" y="7" width="206" height="106" rx="8" fill="none" stroke="#FEF08A" strokeWidth="2" strokeDasharray="6,4" />

        {/* Padded Inner Cushion Line */}
        <rect x="16" y="16" width="188" height="88" rx="5" fill="#9A3412" stroke="#431407" strokeWidth="2" />

        {children ? (
          <foreignObject x="50" y="20" width="80" height="80">
            <div className="w-full h-full flex items-center justify-center text-yellow-200 text-xs font-bold">
              {children}
            </div>
          </foreignObject>
        ) : (
          <text
            x="85"
            y="65"
            fontFamily="monospace"
            fontSize="12"
            fontWeight="bold"
            fill="#FEF08A"
            textAnchor="middle"
          >
            {label}
          </text>
        )}

        {/* Brass Belt Buckle Assembly */}
        <g transform="translate(130, 25)" filter="url(#ls-shadow-soft)">
          {/* Outer Buckle Frame */}
          <rect x="0" y="0" width="65" height="70" rx="8" fill="#F59E0B" stroke="#78350F" strokeWidth="3" />
          {/* Inner Cutout */}
          <rect x="12" y="12" width="41" height="46" rx="4" fill="#431407" stroke="#78350F" strokeWidth="2" />
          {/* Buckle Prong/Pin */}
          <path d="M 5 35 L 50 35" stroke="#D97706" strokeWidth="5" strokeLinecap="round" />
          <path d="M 5 35 L 50 35" stroke="#FEF3C7" strokeWidth="2" strokeLinecap="round" />
          {/* Metallic Highlights */}
          <path d="M 4 4 L 61 4" stroke="#FEF3C7" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Copper Fasteners / Rivets */}
        <circle cx="35" cy="40" r="7" fill="#B45309" stroke="#451A03" strokeWidth="2" />
        <circle cx="35" cy="40" r="5" fill="#D97706" />
        <line x1="31" y1="40" x2="39" y2="40" stroke="#451A03" strokeWidth="1.5" />

        <circle cx="35" cy="80" r="7" fill="#B45309" stroke="#451A03" strokeWidth="2" />
        <circle cx="35" cy="80" r="5" fill="#D97706" />
        <line x1="35" y1="76" x2="35" y2="84" stroke="#451A03" strokeWidth="1.5" />
      </g>
    </svg>
  );
}
