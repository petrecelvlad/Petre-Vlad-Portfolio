import React, { useState } from 'react';
import { GamifiedSharedDefs } from './GamifiedSharedDefs';

interface SlideGaugeProps {
  initialValue?: number; // 0..100
  onChange?: (val: number) => void;
  label?: string;
  className?: string;
}

export function SlideGauge({
  initialValue = 65,
  onChange,
  label = "GAUGE_SLIDE",
  className = ""
}: SlideGaugeProps) {
  const [val, setVal] = useState(initialValue);

  const handleTrackClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    // Map click X within the track range (approx x=25 to 185 in 220 width)
    const normalizedX = (x / rect.width) * 220;
    const clampedX = Math.max(25, Math.min(185, normalizedX));
    const newPercent = Math.round(((clampedX - 25) / 160) * 100);
    setVal(newPercent);
    if (onChange) onChange(newPercent);
  };

  // Cursor X position calculation: 0% -> 25, 100% -> 185. Block offset width = 35, so left edge is cursorX - 17.5
  const cursorX = 25 + (val / 100) * 160;

  return (
    <svg
      viewBox="-12 -12 245 165"
      className={`w-full h-auto cursor-pointer select-none ${className}`}
      onClick={handleTrackClick}
      xmlns="http://www.w3.org/2000/svg"
    >
      <GamifiedSharedDefs idPrefix="sg" />
      <g filter="url(#sg-shadow-heavy)">
        {/* Base Mahogany Body 3D Base */}
        <rect x="0" y="12" width="220" height="120" rx="10" fill="#2A0800" stroke="#1C0700" strokeWidth="3" />
        <rect x="0" y="0" width="220" height="120" rx="10" fill="#451A03" stroke="#1C0700" strokeWidth="3" />

        {/* Inset Sunken Track Channel */}
        <rect x="15" y="35" width="190" height="50" rx="4" fill="#1C0A00" stroke="#2A0800" strokeWidth="2" />

        {/* Measurement Ticks (Laser Etched Cream) */}
        <path
          d="M 25 35 L 25 45 M 35 35 L 35 41 M 45 35 L 45 41 M 55 35 L 55 41 M 65 35 L 65 45 M 75 35 L 75 41 M 85 35 L 85 41 M 95 35 L 95 41 M 105 35 L 105 48 M 115 35 L 115 41 M 125 35 L 125 41 M 135 35 L 135 41 M 145 35 L 145 45 M 155 35 L 155 41 M 165 35 L 165 41 M 175 35 L 175 41 M 185 35 L 185 45"
          stroke="#FEF3C7"
          strokeWidth="1.5"
        />
        <path
          d="M 25 85 L 25 75 M 65 85 L 65 75 M 105 85 L 105 72 M 145 85 L 145 75 M 185 85 L 185 75"
          stroke="#FEF3C7"
          strokeWidth="1.5"
        />

        {/* Numeric Markings */}
        <text x="22" y="25" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="#FDE68A">0</text>
        <text x="60" y="25" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="#FDE68A">25</text>
        <text x="100" y="25" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="#FDE68A">50</text>
        <text x="140" y="25" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="#FDE68A">75</text>
        <text x="178" y="25" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="#FDE68A">100</text>

        {/* 3D Sliding Cursor Block (Transparent Amber Glass + Brass) */}
        <g transform={`translate(${cursorX - 17.5}, 25)`} filter="url(#sg-shadow-medium)" className="transition-transform duration-150">
          {/* Glass Frame */}
          <rect x="0" y="0" width="35" height="70" rx="4" fill="#F59E0B" fillOpacity="0.35" stroke="#D97706" strokeWidth="2" />
          {/* Glass Glare Lines */}
          <line x1="5" y1="5" x2="20" y2="65" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" />
          {/* Red Hairline Pointer */}
          <line x1="17.5" y1="0" x2="17.5" y2="70" stroke="#EF4444" strokeWidth="2" />
          {/* Brass Top/Bottom Knurled Screws */}
          <rect x="5" y="-5" width="25" height="7" rx="2" fill="#B45309" stroke="#451A03" strokeWidth="1" />
          <rect x="5" y="68" width="25" height="7" rx="2" fill="#B45309" stroke="#451A03" strokeWidth="1" />
        </g>

        {/* Dymo Tag Below Track */}
        <rect x="60" y="96" width="100" height="18" rx="2" fill="#18181B" stroke="#000" strokeWidth="1" />
        <text x="110" y="109" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="#FFF" textAnchor="middle">
          {label}: {val}%
        </text>
      </g>
    </svg>
  );
}
