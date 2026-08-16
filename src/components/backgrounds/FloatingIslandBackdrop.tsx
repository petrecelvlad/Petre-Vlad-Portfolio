interface FloatingIslandBackdropProps {
  className?: string;
}

/**
 * Flat 2D replacement for the old three.js voxel island — pure SVG + CSS
 * keyframe animation (compositor-only, no RAF/WebGL) so it costs nothing
 * to keep mounted permanently in the background.
 */
export function FloatingIslandBackdrop({ className = '' }: FloatingIslandBackdropProps) {
  return (
    <div className={`w-full h-full relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet" className="w-full h-full" aria-hidden="true">
        <defs>
          <style>{`
            @keyframes islandFloat {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-14px) rotate(0.5deg); }
            }
            @keyframes turnIllusion {
              0%, 100% { transform: scaleX(1) translateX(0px); }
              25% { transform: scaleX(0.97) translateX(-6px); }
              75% { transform: scaleX(0.97) translateX(6px); }
            }
            @keyframes waterfallFlow {
              0% { stroke-dashoffset: 0; }
              100% { stroke-dashoffset: -40; }
            }
            @keyframes moteDrift1 {
              0% { transform: translateY(0) scale(0.8); opacity: 0; }
              20% { opacity: 0.9; }
              80% { opacity: 0.8; }
              100% { transform: translateY(-70px) scale(1.2); opacity: 0; }
            }
            @keyframes moteDrift2 {
              0% { transform: translateY(0) scale(1); opacity: 0; }
              30% { opacity: 1; }
              70% { opacity: 0.6; }
              100% { transform: translateY(-90px) scale(0.6); opacity: 0; }
            }
            @keyframes runeGlow {
              0%, 100% { opacity: 0.4; filter: drop-shadow(0 0 2px #A7F3D0); }
              50% { opacity: 1; filter: drop-shadow(0 0 8px #34D399); }
            }
            @keyframes rootSway {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(3deg); }
            }
            @keyframes rootSwayReverse {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(-4deg); }
            }
            @keyframes shadowPulse {
              0%, 100% { transform: translate(12px, 16px) scale(1); opacity: 0.95; }
              50% { transform: translate(12px, 13px) scale(0.97); opacity: 0.85; }
            }
            @keyframes grassSway {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(5deg); }
            }

            .ink-edge {
              stroke: #1C1610;
              stroke-width: 4px;
              stroke-linecap: round;
              stroke-linejoin: round;
            }
            .ink-edge-thin {
              stroke: #1C1610;
              stroke-width: 2.5px;
              stroke-linecap: round;
              stroke-linejoin: round;
            }
            .floating-group {
              animation: islandFloat 6s ease-in-out infinite;
              transform-origin: 400px 330px;
            }
            .turn-group {
              animation: turnIllusion 12s ease-in-out infinite;
              transform-origin: 400px 330px;
            }
            .water-stream {
              stroke-dasharray: 12 8;
              animation: waterfallFlow 1.2s linear infinite;
            }
            .water-stream-fast {
              stroke-dasharray: 16 6;
              animation: waterfallFlow 0.8s linear infinite;
            }
            .mote-1 { animation: moteDrift1 4s ease-out infinite; }
            .mote-2 { animation: moteDrift2 5.5s ease-out infinite 1.5s; }
            .mote-3 { animation: moteDrift1 4.8s ease-out infinite 0.7s; }
            .mote-4 { animation: moteDrift2 6s ease-out infinite 2.3s; }
            .rune-pulse { animation: runeGlow 3s ease-in-out infinite; }
            .sway-1 { animation: rootSway 5s ease-in-out infinite; transform-origin: 320px 410px; }
            .sway-2 { animation: rootSwayReverse 6.5s ease-in-out infinite; transform-origin: 450px 430px; }
            .hard-shadow { animation: shadowPulse 6s ease-in-out infinite; }
            .grass-tuft { animation: grassSway 3.2s ease-in-out infinite; transform-origin: 0px 4px; }
          `}</style>
        </defs>

        {/* MAIN FLOATING pedestal ASSEMBLY */}
        <g className="floating-group">

          {/* HARD OFFSET DROP SHADOW (Comic/Arcade Sticker Base) */}
          <g className="hard-shadow">
            <path d="M 180,220
                     C 220,200 580,200 620,220
                     C 650,235 660,260 630,285
                     L 570,360 L 520,440 L 460,490 L 410,530 L 380,530 L 320,470 L 230,410 L 170,320
                     Z" fill="#1C1610" />
          </g>

          <g className="turn-group">

            {/* SATELLITE DEBRIS (FLOATING ROCKS) */}
            <g>
              <polygon points="125,257 150,247 160,272 135,287" fill="#1C1610" opacity="0.95" />
              <polygon points="120,250 145,240 155,265 130,280" fill="#334155" className="ink-edge" />
              <polygon points="120,250 135,265 130,280" fill="#1E293B" />
              <path d="M 125,242 L 140,250 L 150,260" fill="none" stroke="#4ADE80" strokeWidth="3" strokeLinecap="round" />
            </g>
            <g>
              <polygon points="655,377 680,367 690,392 665,402" fill="#1C1610" opacity="0.95" />
              <polygon points="650,370 675,360 685,385 660,395" fill="#475569" className="ink-edge" />
              <polygon points="650,370 665,385 660,395" fill="#1E293B" />
              <path d="M 655,363 L 670,368" fill="none" stroke="#4ADE80" strokeWidth="3" strokeLinecap="round" />
            </g>

            {/* DANGLING ROOTS (BEHIND ROCK BASE) */}
            <g className="sway-1">
              <path d="M 310,410 Q 290,460 320,510 T 305,550" fill="none" stroke="#1C1610" strokeWidth="7" strokeLinecap="round" />
              <path d="M 310,410 Q 290,460 320,510 T 305,550" fill="none" stroke="#451A03" strokeWidth="3" strokeLinecap="round" />
            </g>
            <g className="sway-2">
              <path d="M 460,420 Q 490,470 460,520 T 480,565" fill="none" stroke="#1C1610" strokeWidth="8" strokeLinecap="round" />
              <path d="M 460,420 Q 490,470 460,520 T 480,565" fill="none" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 475,480 Q 500,500 495,530" fill="none" stroke="#1C1610" strokeWidth="4" strokeLinecap="round" />
              <path d="M 475,480 Q 500,500 495,530" fill="none" stroke="#451A03" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* JAGGED ROCK BASE / UNDERSIDE (DARK SLATE) */}
            <path d="M 220,320 L 320,460 L 400,520 L 480,450 L 580,340 L 520,300 L 260,300 Z" fill="#0F172A" className="ink-edge" />

            <path d="M 180,260 L 250,370 L 330,460 L 310,360 L 220,290 Z" fill="#1E293B" className="ink-edge" />
            <path d="M 330,460 L 390,525 L 430,460 L 380,380 L 310,360 Z" fill="#334155" className="ink-edge" />
            <path d="M 430,460 L 510,430 L 590,320 L 510,330 L 380,380 Z" fill="#1E293B" className="ink-edge" />
            <path d="M 220,290 L 310,360 L 380,380 L 390,300 L 270,270 Z" fill="#475569" className="ink-edge" />
            <path d="M 380,380 L 430,460 L 510,330 L 530,280 L 390,300 Z" fill="#334155" className="ink-edge" />
            <path d="M 310,360 L 380,380 L 390,300 Z" fill="#64748B" className="ink-edge" />

            <path d="M 280,320 L 260,350 L 290,380" fill="none" className="ink-edge-thin" />
            <path d="M 450,350 L 480,380 L 460,420" fill="none" className="ink-edge-thin" />
            <path d="M 370,410 L 390,470" fill="none" className="ink-edge-thin" />

            {/* WATERFALL 1 (LEFT BACK STEP) */}
            <g>
              <path d="M 280,255 L 300,285 L 320,280 L 300,250 Z" fill="#0F172A" />
              <path d="M 295,265 L 290,410 L 298,410 L 305,265 Z" fill="#6EE7B7" className="ink-edge-thin" />
              <path d="M 293,270 L 293,400" stroke="#ECFDF5" strokeWidth="4" className="water-stream-fast" strokeLinecap="round" />
              <circle cx="288" cy="420" r="3" fill="#ECFDF5" />
              <circle cx="296" cy="428" r="2" fill="#A7F3D0" />
              <circle cx="302" cy="415" r="2.5" fill="#ECFDF5" />
            </g>

            {/* WATERFALL 2 (FRONT RIGHT LEDGE) */}
            <g>
              <path d="M 475,260 C 460,270 490,278 505,268 Z" fill="#15803D" />
              <path d="M 480,268 L 485,440 L 493,440 L 495,268 Z" fill="#34D399" className="ink-edge-thin" />
              <path d="M 488,268 L 488,430" stroke="#ECFDF5" strokeWidth="5" className="water-stream" strokeLinecap="round" />
              <circle cx="482" cy="450" r="3.5" fill="#ECFDF5" />
              <circle cx="490" cy="458" r="2" fill="#A7F3D0" />
              <circle cx="497" cy="446" r="2.5" fill="#ECFDF5" />
            </g>

            {/* OVERHANGING MOSSY CROWN / TURF */}
            <path d="M 160,230
                     C 150,260 190,285 220,270
                     C 240,290 280,295 310,280
                     C 340,300 390,305 420,280
                     C 450,300 500,295 530,280
                     C 560,295 610,285 630,250
                     C 650,230 630,200 590,190
                     C 530,170 270,170 200,190
                     C 170,200 160,215 160,230 Z"
                  fill="#15803D" className="ink-edge" />

            <path d="M 165,225
                     C 155,250 190,275 220,258
                     C 240,278 280,280 310,268
                     C 340,288 390,290 420,268
                     C 450,288 500,280 528,268
                     C 558,285 605,270 625,240
                     C 640,220 620,195 585,185
                     C 525,168 275,168 205,185
                     C 175,195 165,210 165,225 Z"
                  fill="#22C55E" className="ink-edge" />

            <ellipse cx="400" cy="220" rx="200" ry="45" fill="#4ADE80" className="ink-edge" />

            <ellipse cx="395" cy="214" rx="175" ry="36" fill="#86EFAC" />
            <ellipse cx="395" cy="214" rx="150" ry="30" fill="#4ADE80" className="ink-edge-thin" />

            <path d="M 180,235 C 170,260 200,270 210,245 Z" fill="#4ADE80" className="ink-edge-thin" />
            <path d="M 260,245 C 250,275 285,280 295,250 Z" fill="#86EFAC" className="ink-edge-thin" />
            <path d="M 350,250 C 340,285 380,285 390,255 Z" fill="#4ADE80" className="ink-edge-thin" />
            <path d="M 430,245 C 420,280 460,280 470,250 Z" fill="#86EFAC" className="ink-edge-thin" />
            <path d="M 540,240 C 530,270 570,270 575,235 Z" fill="#86EFAC" className="ink-edge-thin" />

            <ellipse cx="320" cy="210" rx="18" ry="6" fill="#334155" className="ink-edge-thin" />
            <ellipse cx="470" cy="225" rx="25" ry="8" fill="#334155" className="ink-edge-thin" />
            <ellipse cx="472" cy="223" rx="18" ry="5" fill="#475569" />

            {/* GRASS TUFTS */}
            <g transform="translate(210, 222)">
              <g className="grass-tuft" style={{ animationDelay: '0s' }}>
                <path d="M -6,4 Q -8,-2 -3,-6 Q 0,-9 3,-6 Q 8,-2 6,4 Q 0,7 -6,4 Z" fill="#15803D" className="ink-edge-thin" />
              </g>
            </g>
            <g transform="translate(255, 213) scale(0.8)">
              <g className="grass-tuft" style={{ animationDelay: '0.5s' }}>
                <path d="M -6,4 Q -8,-2 -3,-6 Q 0,-9 3,-6 Q 8,-2 6,4 Q 0,7 -6,4 Z" fill="#4ADE80" className="ink-edge-thin" />
              </g>
            </g>
            <g transform="translate(300, 224) scale(1.05)">
              <g className="grass-tuft" style={{ animationDelay: '1.1s' }}>
                <path d="M -6,4 Q -8,-2 -3,-6 Q 0,-9 3,-6 Q 8,-2 6,4 Q 0,7 -6,4 Z" fill="#15803D" className="ink-edge-thin" />
              </g>
            </g>
            <g transform="translate(400, 206) scale(0.85)">
              <g className="grass-tuft" style={{ animationDelay: '1.6s' }}>
                <path d="M -6,4 Q -8,-2 -3,-6 Q 0,-9 3,-6 Q 8,-2 6,4 Q 0,7 -6,4 Z" fill="#4ADE80" className="ink-edge-thin" />
              </g>
            </g>
            <g transform="translate(455, 218)">
              <g className="grass-tuft" style={{ animationDelay: '0.3s' }}>
                <path d="M -6,4 Q -8,-2 -3,-6 Q 0,-9 3,-6 Q 8,-2 6,4 Q 0,7 -6,4 Z" fill="#15803D" className="ink-edge-thin" />
              </g>
            </g>
            <g transform="translate(500, 210) scale(1.1)">
              <g className="grass-tuft" style={{ animationDelay: '0.9s' }}>
                <path d="M -6,4 Q -8,-2 -3,-6 Q 0,-9 3,-6 Q 8,-2 6,4 Q 0,7 -6,4 Z" fill="#4ADE80" className="ink-edge-thin" />
              </g>
            </g>
            <g transform="translate(560, 220) scale(0.85)">
              <g className="grass-tuft" style={{ animationDelay: '1.4s' }}>
                <path d="M -6,4 Q -8,-2 -3,-6 Q 0,-9 3,-6 Q 8,-2 6,4 Q 0,7 -6,4 Z" fill="#15803D" className="ink-edge-thin" />
              </g>
            </g>

            {/* ANCIENT GLOWING RUNES */}
            <g>
              <path className="rune-pulse" style={{ animationDelay: '0s' }} d="M 210,250 L 220,260 M 215,252 L 222,254" stroke="#A7F3D0" strokeWidth="3" strokeLinecap="round" />
              <path className="rune-pulse" style={{ animationDelay: '0.7s' }} d="M 315,265 L 320,275 M 312,270 L 322,268" stroke="#A7F3D0" strokeWidth="3" strokeLinecap="round" />
              <path className="rune-pulse" style={{ animationDelay: '1.4s' }} d="M 405,270 L 405,282 M 400,275 L 410,275" stroke="#A7F3D0" strokeWidth="3" strokeLinecap="round" />
              <path className="rune-pulse" style={{ animationDelay: '2.1s' }} d="M 515,260 L 522,270 M 512,265 L 525,262" stroke="#A7F3D0" strokeWidth="3" strokeLinecap="round" />
            </g>

          </g>

          {/* FLOATING MAGIC MOTES / RUNIC PARTICLES */}
          <g>
            <g transform="translate(200, 260)" className="mote-1">
              <polygon points="0,-6 5,0 0,6 -5,0" fill="#A7F3D0" />
            </g>
            <g transform="translate(270, 280)" className="mote-2">
              <circle cx="0" cy="0" r="3.5" fill="#6EE7B7" />
            </g>
            <g transform="translate(350, 290)" className="mote-3">
              <polygon points="0,-5 4,0 0,5 -4,0" fill="#ECFDF5" />
            </g>
            <g transform="translate(440, 295)" className="mote-1">
              <circle cx="0" cy="0" r="4" fill="#A7F3D0" />
            </g>
            <g transform="translate(520, 280)" className="mote-4">
              <polygon points="0,-7 6,0 0,7 -6,0" fill="#34D399" />
            </g>
            <g transform="translate(600, 250)" className="mote-2">
              <circle cx="0" cy="0" r="3" fill="#ECFDF5" />
            </g>
            <g transform="translate(160, 220)" className="mote-3">
              <circle cx="0" cy="0" r="2" fill="#A7F3D0" />
            </g>
            <g transform="translate(490, 230)" className="mote-4">
              <polygon points="0,-4 3,0 0,4 -3,0" fill="#ECFDF5" />
            </g>
          </g>

        </g>
      </svg>
    </div>
  );
}
