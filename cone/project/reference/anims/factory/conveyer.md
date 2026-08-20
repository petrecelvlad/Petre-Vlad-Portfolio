<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <!-- Background Scanlines Pattern -->
    <pattern id="scanlines" width="8" height="8" patternUnits="userSpaceOnUse">
      <line x1="0" y1="4" x2="8" y2="4" stroke="#000000" stroke-opacity="0.2" stroke-width="2"/>
      <line x1="4" y1="0" x2="4" y2="8" stroke="#ffffff" stroke-opacity="0.02" stroke-width="1"/>
    </pattern>

    <!-- Conveyor Belt Stripes Pattern -->
    <pattern id="belt-stripes" width="20" height="50" patternUnits="userSpaceOnUse">
      <path d="M-10,50 L10,0 M10,50 L30,0 M30,50 L50,0" stroke="#3B4A61" stroke-width="7" stroke-linecap="square"/>
    </pattern>

    <!-- Dispenser Metallic Gradient -->
    <linearGradient id="chrome-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E5E7EB"/>
      <stop offset="40%" stop-color="#9CA3AF"/>
      <stop offset="70%" stop-color="#6B7280"/>
      <stop offset="100%" stop-color="#374151"/>
    </linearGradient>

    <!-- Hazard Stripes Pattern -->
    <pattern id="hazard" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect x="0" y="0" width="8" height="16" fill="#FACC15"/>
      <rect x="8" y="0" width="8" height="16" fill="#1E212F"/>
    </pattern>
  </defs>

  <style>
    /* Continuous animations with exact 33 1/3 sec sub-harmonics */

    /* Gears rotate 9 times per 33.333s loop (3.7037037s per turn) */
    .spin-gear {
      animation: gear-rotate 3.7037037s linear infinite;
    }
    @keyframes gear-rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* Belt texture scrolls continuously */
    .scroll-belt {
      animation: belt-texture 0.8333333s linear infinite;
    }
    @keyframes belt-texture {
      0% { transform: translateX(0px); }
      100% { transform: translateX(20px); }
    }

    /* Dispenser Recoil synchronized with block spawn (1.6666667s cycle) */
    .recoil-hopper {
      animation: hopper-recoil 1.6666667s ease-in-out infinite;
      transform-origin: 90px 200px;
    }
    @keyframes hopper-recoil {
      0%, 100% { transform: rotate(-10deg) scale(1, 1); }
      4% { transform: rotate(-10deg) scale(1.08, 0.92) translateY(4px); }
      12% { transform: rotate(-10deg) scale(0.96, 1.04) translateY(-2px); }
      20% { transform: rotate(-10deg) scale(1, 1); }
    }

    /* Press cycle (1.6666667s period: ~40% up, ~8% slam, ~10% dwell, ~42% retreat) */
    .press-piston {
      animation: press-motion 1.6666667s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }
    @keyframes press-motion {
      0%, 40% { transform: translateY(0px); }
      48% { transform: translateY(72px); }
      58% { transform: translateY(72px); }
      92%, 100% { transform: translateY(0px); }
    }

    /* Blocks: 6.6666667s total travel cycle (4 * 1.6666667s) */
    .block-group {
      animation: block-journey 6.6666667s linear infinite;
    }
    .b-delay-1 { animation-delay: 0s; }
    .b-delay-2 { animation-delay: -5.0s; }
    .b-delay-3 { animation-delay: -3.3333333s; }
    .b-delay-4 { animation-delay: -1.6666667s; }

    @keyframes block-journey {
      0% { transform: translate(128px, 260px) scale(0.3, 0.7); opacity: 0; }
      2% { transform: translate(128px, 275px) scale(0.6, 1.3); opacity: 1; }
      5% { transform: translate(132px, 320px) scale(0.75, 1.35); opacity: 1; }
      8% { transform: translate(142px, 362px) scale(1.4, 0.6); opacity: 1; } /* Spawn squash */
      12% { transform: translate(158px, 350px) scale(0.88, 1.12); }
      16% { transform: translate(175px, 357px) scale(1, 1); }
      28% { transform: translate(250px, 357px) scale(1, 1); }
      38% { transform: translate(320px, 357px) scale(1, 1); }
      42% { transform: translate(348px, 357px) scale(0.97, 1.03); } /* Hesitates near press */
      46% { transform: translate(377px, 357px) scale(1, 1); }
      48% { transform: translate(377px, 370px) scale(1.45, 0.5); } /* STAMP SQUISH */
      56% { transform: translate(377px, 350px) scale(0.85, 1.15); } /* Rebound */
      60% { transform: translate(392px, 357px) scale(1, 1); }
      75% { transform: translate(500px, 357px) scale(1, 1); }
      88% { transform: translate(595px, 357px) scale(1, 1); }
      92% { transform: translate(625px, 348px) scale(1.25, 1.25); opacity: 1; } /* Collection */
      97%, 100% { transform: translate(640px, 320px) scale(0.2, 0.2); opacity: 0; }
    }

    /* Face appearance timing synchronized with stamp (at 48% of block journey) */
    .block-face {
      animation: face-reveal 6.6666667s linear infinite;
    }
    @keyframes face-reveal {
      0%, 47.9% { opacity: 0; }
      48%, 94% { opacity: 1; }
      96%, 100% { opacity: 0; }
    }

    /* Floating "+1" popup animation */
    .plus-one {
      animation: float-score 6.6666667s ease-out infinite;
    }
    @keyframes float-score {
      0%, 89.9% { opacity: 0; transform: translate(0, 0) scale(0.5); }
      91.5% { opacity: 1; transform: translate(0, -15px) scale(1.3); }
      96% { opacity: 1; transform: translate(0, -45px) scale(1); }
      98.5%, 100% { opacity: 0; transform: translate(0, -60px) scale(0.8); }
    }

    /* Scoreboard pulse effects */
    .glow-bar-1 { animation: pulse-cyan 3.3333333s ease-in-out infinite; }
    .glow-bar-2 { animation: pulse-gold 2.5s ease-in-out infinite; }
    @keyframes pulse-cyan {
      0%, 100% { opacity: 0.8; }
      50% { opacity: 1; filter: drop-shadow(0 0 4px #38BDF8); }
    }
    @keyframes pulse-gold {
      0%, 100% { opacity: 0.7; }
      50% { opacity: 1; filter: drop-shadow(0 0 4px #FACC15); }
    }
  </style>

  <!-- Deep Violet Canvas Background -->
  <rect width="800" height="600" fill="#1F1420"/>

  <!-- Pixel Grid & Scanline Overlay -->
  <rect width="800" height="600" fill="url(#scanlines)"/>

  <!-- Background Factory Walls & Pixel Details -->
  <g stroke="#1E212F" stroke-width="4">
    <!-- Darker backdrop structural panels -->
    <rect x="40" y="80" width="720" height="460" fill="#281A2A" rx="8"/>
    <path d="M 40,160 L 760,160 M 40,280 L 760,280 M 40,400 L 760,400" stroke="#211423" stroke-width="4"/>
    <path d="M 200,80 L 200,540 M 400,80 L 400,540 M 600,80 L 600,540" stroke="#211423" stroke-width="4"/>
    
    <!-- Background Industrial Pipes -->
    <path d="M 0,110 L 800,110" stroke="#36223A" stroke-width="16"/>
    <path d="M 0,110 L 800,110" stroke="#1E212F" stroke-width="16" stroke-dasharray="8 16"/>
    
    <!-- Decorative Wall Lights -->
    <circle cx="80" cy="120" r="6" fill="#EF4444"/>
    <circle cx="720" cy="120" r="6" fill="#22C55E"/>
  </g>

  <!-- TOP SCOREBOARD BANNER -->
  <g transform="translate(260, 20)">
    <!-- Heavy Outline Shadow -->
    <rect x="-4" y="-4" width="288" height="60" rx="12" fill="#1E212F"/>
    <!-- Gold Border Box -->
    <rect x="0" y="0" width="280" height="52" rx="10" fill="#0F172A" stroke="#FACC15" stroke-width="4"/>
    
    <!-- Banner Corner Bolts -->
    <circle cx="10" cy="10" r="2.5" fill="#FACC15"/>
    <circle cx="270" cy="10" r="2.5" fill="#FACC15"/>
    <circle cx="10" cy="42" r="2.5" fill="#FACC15"/>
    <circle cx="270" cy="42" r="2.5" fill="#FACC15"/>

    <!-- Score Status Label -->
    <rect x="24" y="14" width="48" height="24" rx="3" fill="#1E212F" stroke="#374151" stroke-width="2"/>
    <path d="M 32,21 L 40,21 M 32,26 L 44,26 M 32,31 L 38,31" stroke="#FACC15" stroke-width="3" stroke-linecap="square"/>

    <!-- Abstract Glowing Score Bars -->
    <rect class="glow-bar-1" x="86" y="16" width="120" height="8" rx="4" fill="#38BDF8"/>
    <rect class="glow-bar-2" x="86" y="28" width="85" height="8" rx="4" fill="#FACC15"/>

    <!-- Mini LED Indicators -->
    <rect x="220" y="16" width="36" height="20" rx="4" fill="#1E212F" stroke="#374151" stroke-width="2"/>
    <circle cx="229" cy="26" r="3" fill="#4ADE80"/>
    <circle cx="238" cy="26" r="3" fill="#38BDF8"/>
    <circle cx="247" cy="26" r="3" fill="#FACC15"/>
  </g>

  <!-- CONVEYOR BELT SUPPORT LEGS -->
  <g stroke="#1E212F" stroke-width="4" stroke-linejoin="miter">
    <!-- Legs -->
    <rect x="180" y="420" width="24" height="110" fill="#334155"/>
    <rect x="320" y="420" width="24" height="110" fill="#334155"/>
    <rect x="460" y="420" width="24" height="110" fill="#334155"/>
    <rect x="600" y="420" width="24" height="110" fill="#334155"/>
    <!-- Feet -->
    <rect x="168" y="520" width="48" height="12" fill="#1E293B"/>
    <rect x="308" y="520" width="48" height="12" fill="#1E293B"/>
    <rect x="448" y="520" width="48" height="12" fill="#1E293B"/>
    <rect x="588" y="520" width="48" height="12" fill="#1E293B"/>
    <!-- Cross Braces -->
    <path d="M 204,440 L 320,510 M 344,440 L 460,510 M 484,440 L 600,510" stroke="#1E212F" stroke-width="4"/>
  </g>

  <!-- MAIN CONVEYOR BELT STRUCTURE -->
  <g>
    <!-- Dark Outer Frame -->
    <rect x="130" y="375" width="540" height="54" rx="27" fill="#1E212F"/>
    <!-- Belt Surface Body -->
    <rect x="134" y="379" width="532" height="46" rx="23" fill="#2E3A4D" stroke="#1E212F" stroke-width="3"/>

    <!-- Belt Inner Texture Container (Clipped) -->
    <g clip-path="url(#belt-clip)">
      <clipPath id="belt-clip">
        <rect x="166" y="381" width="468" height="42" rx="6"/>
      </clipPath>
      <!-- Scrolling Diagonal Texture -->
      <g class="scroll-belt">
        <rect x="140" y="379" width="520" height="46" fill="url(#belt-stripes)"/>
      </g>
    </g>

    <!-- Belt Top & Bottom Guide Rails -->
    <path d="M 166,379 L 634,379 M 166,425 L 634,425" stroke="#1E212F" stroke-width="5" stroke-linecap="round"/>
    <path d="M 166,383 L 634,383" stroke="#475569" stroke-width="2"/>
  </g>

  <!-- LEFT & RIGHT GEARS / PULLEYS -->
  <!-- Left Gear -->
  <g transform="translate(170, 402)">
    <g class="spin-gear" transform-origin="0 0">
      <circle cx="0" cy="0" r="30" fill="#647388" stroke="#1E212F" stroke-width="4"/>
      <!-- Gear Teeth -->
      <path d="M -4,-34 L 4,-34 L 4,-26 L -4,-26 Z
               M -4,26 L 4,26 L 4,34 L -4,34 Z
               M -34,-4 L -34,4 L -26,4 L -26,-4 Z
               M 26,-4 L 26,4 L 34,4 L 34,-4 Z" fill="#647388" stroke="#1E212F" stroke-width="3"/>
      <!-- Spoke Cutouts -->
      <circle cx="-12" cy="-12" r="7" fill="#1E212F"/>
      <circle cx="12" cy="-12" r="7" fill="#1E212F"/>
      <circle cx="-12" cy="12" r="7" fill="#1E212F"/>
      <circle cx="12" cy="12" r="7" fill="#1E212F"/>
      <!-- Center Axle -->
      <circle cx="0" cy="0" r="8" fill="#94A3B8" stroke="#1E212F" stroke-width="3"/>
      <circle cx="0" cy="0" r="3" fill="#1E212F"/>
    </g>
  </g>

  <!-- Right Gear -->
  <g transform="translate(630, 402)">
    <g class="spin-gear" transform-origin="0 0">
      <circle cx="0" cy="0" r="30" fill="#647388" stroke="#1E212F" stroke-width="4"/>
      <!-- Gear Teeth -->
      <path d="M -4,-34 L 4,-34 L 4,-26 L -4,-26 Z
               M -4,26 L 4,26 L 4,34 L -4,34 Z
               M -34,-4 L -34,4 L -26,4 L -26,-4 Z
               M 26,-4 L 26,4 L 34,4 L 34,-4 Z" fill="#647388" stroke="#1E212F" stroke-width="3"/>
      <!-- Spoke Cutouts -->
      <circle cx="-12" cy="-12" r="7" fill="#1E212F"/>
      <circle cx="12" cy="-12" r="7" fill="#1E212F"/>
      <circle cx="-12" cy="12" r="7" fill="#1E212F"/>
      <circle cx="12" cy="12" r="7" fill="#1E212F"/>
      <!-- Center Axle -->
      <circle cx="0" cy="0" r="8" fill="#94A3B8" stroke="#1E212F" stroke-width="3"/>
      <circle cx="0" cy="0" r="3" fill="#1E212F"/>
    </g>
  </g>

  <!-- HOPPER / DISPENSER (LEFT SIDE) -->
  <g class="recoil-hopper" transform="translate(90, 200) rotate(-10)">
    <!-- Hopper Main Body Shadow -->
    <path d="M -40,-60 L 50,-60 L 25,60 L -15,60 Z" fill="#1E212F" transform="translate(0, 4)"/>
    <!-- Hopper Main Funnel Body -->
    <path d="M -40,-60 L 50,-60 L 25,60 L -15,60 Z" fill="url(#chrome-grad)" stroke="#1E212F" stroke-width="4" stroke-linejoin="round"/>
    
    <!-- Chrome Highlight Lines -->
    <path d="M -30,-52 L 38,-52 M -24,-40 L -2,-40 M -12,20 L 10,20" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
    
    <!-- Top Rim/Lip -->
    <rect x="-48" y="-70" width="106" height="14" rx="4" fill="#9CA3AF" stroke="#1E212F" stroke-width="4"/>
    
    <!-- Hazard Stripe Band near Base -->
    <g stroke="#1E212F" stroke-width="3">
      <rect x="-21" y="30" width="52" height="18" fill="url(#hazard)"/>
      <rect x="-21" y="30" width="52" height="18" fill="none" stroke="#1E212F" stroke-width="3"/>
    </g>

    <!-- Nozzle Base Extension -->
    <rect x="-12" y="60" width="34" height="24" rx="2" fill="#4B5563" stroke="#1E212F" stroke-width="4"/>
    <rect x="-6" y="84" width="22" height="8" rx="2" fill="#1E212F"/>

    <!-- Status Indicator Light on Hopper -->
    <circle cx="32" cy="-36" r="6" fill="#1E212F"/>
    <circle cx="32" cy="-36" r="3.5" fill="#4ADE80"/>
  </g>


  <!-- CONTINUOUS CYCLING BLOCKS (4 STAGGERED INSTANCES) -->

  <!-- BLOCK 1: GREEN (#4ADE80) - Dot Eyes Face -->
  <g class="block-group b-delay-1">
    <!-- Block Body -->
    <rect x="-23" y="-23" width="46" height="46" rx="7" fill="#4ADE80" stroke="#1E212F" stroke-width="4"/>
    <!-- Top/Left Bevel Highlight -->
    <path d="M -17,-17 L 17,-17 M -17,-17 L -17,17" stroke="#86EFAC" stroke-width="3" stroke-linecap="round"/>
    <!-- Bottom/Right Shadow Bevel -->
    <path d="M -17,17 L 17,17 M 17,-17 L 17,17" stroke="#16A34A" stroke-width="3" stroke-linecap="round"/>

    <!-- Stamped Smiley Face Style 1: Dot Eyes -->
    <g class="block-face">
      <circle cx="-8" cy="-4" r="3" fill="#1E212F"/>
      <circle cx="8" cy="-4" r="3" fill="#1E212F"/>
      <path d="M -10,5 Q 0,13 10,5" stroke="#1E212F" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    </g>

    <!-- Floating "+1" Score Text -->
    <g class="plus-one">
      <text x="0" y="-30" font-family="'Courier New', monospace, font-weight:900" font-size="22" font-weight="bold" fill="#FACC15" stroke="#1E212F" stroke-width="3" text-anchor="middle">+1</text>
    </g>
  </g>

  <!-- BLOCK 2: YELLOW (#FACC15) - Caret "^ ^" Eyes Face -->
  <g class="block-group b-delay-2">
    <!-- Block Body -->
    <rect x="-23" y="-23" width="46" height="46" rx="7" fill="#FACC15" stroke="#1E212F" stroke-width="4"/>
    <!-- Bevels -->
    <path d="M -17,-17 L 17,-17 M -17,-17 L -17,17" stroke="#FEF08A" stroke-width="3" stroke-linecap="round"/>
    <path d="M -17,17 L 17,17 M 17,-17 L 17,17" stroke="#CA8A04" stroke-width="3" stroke-linecap="round"/>

    <!-- Stamped Smiley Face Style 2: Caret Eyes -->
    <g class="block-face">
      <path d="M -12,-2 L -8,-7 L -4,-2" stroke="#1E212F" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M 4,-2 L 8,-7 L 12,-2" stroke="#1E212F" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M -9,5 Q 0,13 9,5" stroke="#1E212F" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    </g>

    <!-- Floating "+1" Score Text -->
    <g class="plus-one">
      <text x="0" y="-30" font-family="'Courier New', monospace, font-weight:900" font-size="22" font-weight="bold" fill="#FACC15" stroke="#1E212F" stroke-width="3" text-anchor="middle">+1</text>
    </g>
  </g>

  <!-- BLOCK 3: SKY BLUE (#38BDF8) - Arch "∩ ∩" Eyes Face -->
  <g class="block-group b-delay-3">
    <!-- Block Body -->
    <rect x="-23" y="-23" width="46" height="46" rx="7" fill="#38BDF8" stroke="#1E212F" stroke-width="4"/>
    <!-- Bevels -->
    <path d="M -17,-17 L 17,-17 M -17,-17 L -17,17" stroke="#7DD3FC" stroke-width="3" stroke-linecap="round"/>
    <path d="M -17,17 L 17,17 M 17,-17 L 17,17" stroke="#0284C7" stroke-width="3" stroke-linecap="round"/>

    <!-- Stamped Smiley Face Style 3: Arch Eyes & Open Smile -->
    <g class="block-face">
      <path d="M -12,-3 Q -8,-9 -4,-3" stroke="#1E212F" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M 4,-3 Q 8,-9 12,-3" stroke="#1E212F" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M -8,4 Q 0,13 8,4 Z" fill="#1E212F" stroke="#1E212F" stroke-width="1.5"/>
    </g>

    <!-- Floating "+1" Score Text -->
    <g class="plus-one">
      <text x="0" y="-30" font-family="'Courier New', monospace, font-weight:900" font-size="22" font-weight="bold" fill="#FACC15" stroke="#1E212F" stroke-width="3" text-anchor="middle">+1</text>
    </g>
  </g>

  <!-- BLOCK 4: PURPLE (#BF83FD) - Vertical Line "| |" Eyes Face -->
  <g class="block-group b-delay-4">
    <!-- Block Body -->
    <rect x="-23" y="-23" width="46" height="46" rx="7" fill="#BF83FD" stroke="#1E212F" stroke-width="4"/>
    <!-- Bevels -->
    <path d="M -17,-17 L 17,-17 M -17,-17 L -17,17" stroke="#E9D5FF" stroke-width="3" stroke-linecap="round"/>
    <path d="M -17,17 L 17,17 M 17,-17 L 17,17" stroke="#9333EA" stroke-width="3" stroke-linecap="round"/>

    <!-- Stamped Smiley Face Style 4: Line Eyes & Smirk -->
    <g class="block-face">
      <line x1="-8" y1="-8" x2="-8" y2="-2" stroke="#1E212F" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="8" y1="-8" x2="8" y2="-2" stroke="#1E212F" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M -8,5 Q 0,11 9,4" stroke="#1E212F" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    </g>

    <!-- Floating "+1" Score Text -->
    <g class="plus-one">
      <text x="0" y="-30" font-family="'Courier New', monospace, font-weight:900" font-size="22" font-weight="bold" fill="#FACC15" stroke="#1E212F" stroke-width="3" text-anchor="middle">+1</text>
    </g>
  </g>


  <!-- STAMPING PRESS ASSEMBLY (CENTER, ABOVE BELT MIDPOINT) -->
  <g transform="translate(377, 0)">
    <!-- Top Support Housing Structure (Fixed) -->
    <g stroke="#1E212F" stroke-width="4" stroke-linejoin="round">
      <rect x="-55" y="0" width="110" height="90" fill="#334155"/>
      <rect x="-45" y="70" width="90" height="30" fill="#475569"/>
      <!-- Structural Bolts & Details -->
      <circle cx="-35" cy="30" r="4" fill="#94A3B8"/>
      <circle cx="35" cy="30" r="4" fill="#94A3B8"/>
      <circle cx="-35" cy="85" r="3" fill="#94A3B8"/>
      <circle cx="35" cy="85" r="3" fill="#94A3B8"/>
      <!-- Center Shaft Collar -->
      <rect x="-22" y="90" width="44" height="20" fill="#1E293B"/>
    </g>

    <!-- Moving Piston & Press Head Assembly -->
    <g class="press-piston">
      <!-- Vertical Shaft Rod -->
      <rect x="-12" y="100" width="24" height="145" fill="#94A3B8" stroke="#1E212F" stroke-width="4"/>
      <rect x="-5" y="100" width="6" height="145" fill="#E2E8F0"/> <!-- Shaft Metallic Highlight -->

      <!-- Hydraulic Ring Details -->
      <rect x="-16" y="215" width="32" height="12" fill="#647388" stroke="#1E212F" stroke-width="3"/>

      <!-- Press Main Head Unit -->
      <g transform="translate(0, 230)">
        <!-- Heavy Head Outline / Backing -->
        <rect x="-50" y="0" width="100" height="54" rx="6" fill="#1E212F"/>
        <!-- Red Body (#E63350) -->
        <rect x="-46" y="4" width="92" height="42" rx="4" fill="#E63350" stroke="#1E212F" stroke-width="3"/>
        <!-- Dark Red Underside (#B91C1C) -->
        <rect x="-46" y="34" width="92" height="12" rx="2" fill="#B91C1C" stroke="#1E212F" stroke-width="2"/>
        
        <!-- Stamper Head Corner Plates -->
        <rect x="-42" y="8" width="8" height="8" fill="#F87171"/>
        <rect x="34" y="8" width="8" height="8" fill="#F87171"/>

        <!-- BOLD WHITE BLOCKY "FUN" TEXT (Pixel Font Path) -->
        <g fill="#FFFFFF" transform="translate(-25, 12)">
          <!-- Letter 'F' -->
          <path d="M 0,0 H 12 V 4 H 4 V 7 H 10 V 11 H 4 V 18 H 0 Z"/>
          <!-- Letter 'U' -->
          <path d="M 17,0 H 21 V 14 H 29 V 0 H 33 V 18 H 17 Z"/>
          <!-- Letter 'N' -->
          <path d="M 38,0 H 42 L 47,11 V 0 H 51 V 18 H 47 L 42,7 V 18 H 38 Z"/>
        </g>
      </g>
    </g>
  </g>

</svg>