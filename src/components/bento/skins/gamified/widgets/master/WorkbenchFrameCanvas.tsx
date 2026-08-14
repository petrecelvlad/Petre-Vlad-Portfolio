import React from 'react';

export function WorkbenchFrameCanvas() {
  return (
    <g id="workbench-frame-canvas">
      {/* Outer Frame / Desk Body */}
      <rect width="800" height="600" fill="#24160E" />
      {/* Bevel Edges of Desk Frame */}
      <path d="M 0 0 L 800 0 L 785 15 L 15 15 Z" fill="#3D271D" />
      <path d="M 800 0 L 800 600 L 785 585 L 785 15 Z" fill="#170E08" />
      <path d="M 0 600 L 800 600 L 785 585 L 15 585 Z" fill="#0D0704" />
      <path d="M 0 0 L 0 600 L 15 585 L 15 15 Z" fill="#2E1C14" />

      {/* Main Workshop Cutting Mat (Level 1 Inset Canvas) */}
      <rect x="15" y="15" width="770" height="570" rx="10" fill="#C9B596" stroke="#1A0F0A" strokeWidth="4" />
      <rect x="23" y="23" width="754" height="554" rx="6" fill="url(#wm-workbench-grid)" stroke="#A39073" strokeWidth="1.5" />

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
    </g>
  );
}
