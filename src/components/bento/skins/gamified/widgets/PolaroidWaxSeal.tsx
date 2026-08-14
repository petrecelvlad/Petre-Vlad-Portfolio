import React from 'react';
import { GamifiedSharedDefs } from './GamifiedSharedDefs';

interface PolaroidWaxSealProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

export function PolaroidWaxSeal({
  label = "Sample_v04.png",
  onClick,
  className = ""
}: PolaroidWaxSealProps) {
  return (
    <svg
      viewBox="-12 -20 245 175"
      className={`w-full h-auto cursor-pointer select-none transition-transform duration-150 active:scale-98 ${className}`}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
    >
      <GamifiedSharedDefs idPrefix="pws" />
      <g filter="url(#pws-shadow-heavy)">
        {/* Tilted Polaroid Container (+3 deg) */}
        <g transform="rotate(3, 110, 65)">
          {/* Polaroid Photo Card */}
          <rect x="0" y="0" width="160" height="130" rx="4" fill="#FAFAFA" stroke="#E2E8F0" strokeWidth="2" />
          {/* Photo Inner Window */}
          <rect x="12" y="12" width="136" height="85" fill="#0F172A" />
          {/* Photo Mini Vector Art (Mountain & Sun) */}
          <path d="M 12 75 L 50 40 L 80 65 L 110 30 L 148 75 Z" fill="#334155" />
          <path d="M 12 85 L 60 50 L 95 85 Z" fill="#475569" />
          <circle cx="120" cy="32" r="12" fill="#F59E0B" />
          {/* Photo Label Handwritten */}
          <text x="80" y="115" fontFamily="serif" fontStyle="italic" fontWeight="bold" fontSize="12" fill="#334155" textAnchor="middle">
            {label}
          </text>

          {/* Masking Tape Strip on Top Edge */}
          <polygon points="50,-10 100,-14 102,4 52,8" fill="#FEF08A" opacity="0.7" stroke="#CA8A04" strokeWidth="1" />

          {/* Metal Paperclip on Top Right */}
          <g transform="translate(130, -8)" filter="url(#pws-shadow-soft)">
            <path
              d="M 0 10 L 0 30 A 6 6 0 0 0 12 30 L 12 5 A 4 4 0 0 0 4 5 L 4 25"
              fill="none"
              stroke="#94A3B8"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        </g>

        {/* Crimson 3D Wax Seal (Overlapping Bottom Right) */}
        <g transform="translate(150, 70)" filter="url(#pws-shadow-heavy)">
          {/* Ribbon Ends */}
          <path d="M 10 20 L -10 60 L 10 55 L 20 65 Z" fill="#991B1B" stroke="#450A0A" strokeWidth="1.5" />
          <path d="M 25 20 L 35 65 L 45 55 L 60 60 Z" fill="#7F1D1D" stroke="#450A0A" strokeWidth="1.5" />

          {/* Melted Wax Outer Blob */}
          <path
            d="M 25 -5 C 40 -8 55 2 58 18 C 62 32 50 48 35 50 C 20 52 2 45 -3 30 C -8 15 8 -2 25 -5 Z"
            fill="#991B1B"
            stroke="#450A0A"
            strokeWidth="2"
          />
          <path
            d="M 25 -1 C 37 -4 48 5 51 18 C 54 30 44 42 32 44 C 18 46 4 39 0 27 C -4 15 10 2 25 -1 Z"
            fill="#B91C1C"
          />

          {/* Stamped Inner Emblem */}
          <circle cx="26" cy="22" r="18" fill="#7F1D1D" stroke="#450A0A" strokeWidth="2" />
          <circle cx="26" cy="22" r="16" fill="#991B1B" />
          {/* Embossed Crest Design (Crown / Fleur-de-lis) */}
          <path
            d="M 26 12 L 30 18 L 36 15 L 32 24 L 38 28 L 26 27 L 14 28 L 20 24 L 16 15 L 22 18 Z"
            fill="#FECACA"
            stroke="#7F1D1D"
            strokeWidth="1"
          />
        </g>
      </g>
    </svg>
  );
}
