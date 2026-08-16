import React from 'react';
import { GamifiedSharedDefs } from './GamifiedSharedDefs';

interface WorkbenchCanvasProps {
  children?: React.ReactNode;
  title?: string;
  className?: string;
}

export function WorkbenchCanvas({
  children,
  className = ""
}: WorkbenchCanvasProps) {
  return (
    <div className={`relative w-full overflow-hidden rounded-2xl shadow-2xl ${className}`}>
      <svg
        viewBox="0 0 800 600"
        className="w-full h-auto block select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <GamifiedSharedDefs idPrefix="wc" />

        {/* Outer Frame / Desk Body */}
        <rect width="800" height="600" fill="#24160E" />
        {/* Bevel Edges of Desk Frame */}
        <path d="M 0 0 L 800 0 L 785 15 L 15 15 Z" fill="#3D271D" />
        <path d="M 800 0 L 800 600 L 785 585 L 785 15 Z" fill="#170E08" />
        <path d="M 0 600 L 800 600 L 785 585 L 15 585 Z" fill="#0D0704" />
        <path d="M 0 0 L 0 600 L 15 585 L 15 15 Z" fill="#2E1C14" />

        {/* Main Workshop Cutting Mat (Inset Canvas) */}
        <rect x="15" y="15" width="770" height="570" rx="10" fill="#C9B596" stroke="#1A0F0A" strokeWidth="4" />
        <rect x="23" y="23" width="754" height="554" rx="6" fill="url(#wc-workbench-grid)" stroke="#A39073" strokeWidth="1.5" />

        {/* Brass Corner Reinforcements on Workshop Mat */}
        {/* Top-Left Corner */}
        <path d="M 15 15 L 55 15 L 55 27 L 27 27 L 27 55 L 15 55 Z" fill="#D97706" stroke="#451A03" strokeWidth="2" />
        <circle cx="38" cy="21" r="2.5" fill="#78350F" /> <circle cx="21" cy="38" r="2.5" fill="#78350F" />
        {/* Top-Right Corner */}
        <path d="M 785 15 L 745 15 L 745 27 L 773 27 L 773 55 L 785 55 Z" fill="#D97706" stroke="#451A03" strokeWidth="2" />
        <circle cx="762" cy="21" r="2.5" fill="#78350F" /> <circle cx="779" cy="38" r="2.5" fill="#78350F" />
        {/* Bottom-Left Corner */}
        <path d="M 15 585 L 55 585 L 55 573 L 27 573 L 27 545 L 15 545 Z" fill="#D97706" stroke="#451A03" strokeWidth="2" />
        <circle cx="38" cy="579" r="2.5" fill="#78350F" /> <circle cx="21" cy="562" r="2.5" fill="#78350F" />
        {/* Bottom-Right Corner */}
        <path d="M 785 585 L 745 585 L 745 573 L 773 573 L 773 545 L 785 545 Z" fill="#D97706" stroke="#451A03" strokeWidth="2" />
        <circle cx="762" cy="579" r="2.5" fill="#78350F" /> <circle cx="779" cy="562" r="2.5" fill="#78350F" />

        {/* Decorative Connecting Wires */}
        <g id="connecting-wires">
          {/* Wire Shadow */}
          <path d="M 505 315 C 520 315 520 300 535 300" fill="none" stroke="#0A0503" strokeWidth="6" opacity="0.5" />
          {/* Wire Body */}
          <path d="M 505 315 C 520 315 520 300 535 300" fill="none" stroke="#B45309" strokeWidth="4" />
          <path d="M 505 315 C 520 315 520 300 535 300" fill="none" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="6,4" />

          {/* Wire from Toggle Switch down to Rotary Dial */}
          <path d="M 320 375 C 270 380 270 450 290 465" fill="none" stroke="#0A0503" strokeWidth="5" opacity="0.5" />
          <path d="M 320 375 C 270 380 270 450 290 465" fill="none" stroke="#0284C7" strokeWidth="3.5" />
          <path d="M 320 375 C 270 380 270 450 290 465" fill="none" stroke="#38BDF8" strokeWidth="1" />
        </g>

        {/* Loose Workshop Hardware Scatter */}
        {/* Screw */}
        <g transform="translate(272, 235)" filter="url(#wc-shadow-soft)">
          <circle cx="0" cy="0" r="5" fill="#D97706" stroke="#451A03" strokeWidth="1" />
          <line x1="-3" y1="-2" x2="3" y2="2" stroke="#451A03" strokeWidth="1.5" />
        </g>

        {/* Washer */}
        <g transform="translate(520, 400)" filter="url(#wc-shadow-soft)">
          <circle cx="0" cy="0" r="6" fill="#94A3B8" stroke="#334155" strokeWidth="1" />
          <circle cx="0" cy="0" r="2.5" fill="#C9B596" />
        </g>

        {/* Pushpin */}
        <g transform="translate(270, 400) rotate(45)" filter="url(#wc-shadow-pin)">
          <path d="M 0 0 L 0 -12 L -3 -15 L 3 -15 L 0 -12 Z" fill="#94A3B8" />
          <circle cx="0" cy="2" r="5" fill="#2563EB" stroke="#1E3A8A" strokeWidth="1" />
          <circle cx="-1" cy="0" r="2" fill="#60A5FA" />
        </g>
      </svg>

      {/* Embedded HTML Overlay Layer */}
      {children && (
        <div className="absolute inset-0 p-6 md:p-10 pointer-events-auto flex flex-col justify-between">
          {children}
        </div>
      )}
    </div>
  );
}
