<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <!-- Background Grid Pattern -->
    <pattern id="pixelGrid" width="16" height="16" patternUnits="userSpaceOnUse">
      <rect width="16" height="16" fill="#1F1420"/>
      <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#2B1A2E" stroke-width="1"/>
    </pattern>

    <!-- Scanline Overlay -->
    <pattern id="scanlines" width="800" height="4" patternUnits="userSpaceOnUse">
      <rect width="800" height="2" fill="#000000" fill-opacity="0.15"/>
    </pattern>

    <!-- Conveyor Belt Diagonal Stripes -->
    <pattern id="beltStripes" width="20" height="20" patternUnits="userSpaceOnUse">
      <rect width="20" height="20" fill="#2E3A4D"/>
      <path d="M -5 15 L 15 -5 M 5 25 L 25 5 M 0 20 L 20 0" stroke="#475569" stroke-width="5" stroke-linecap="square"/>
    </pattern>

    <!-- Hazard Stripes for Hopper Base -->
    <pattern id="hazardStripes" width="16" height="16" patternUnits="userSpaceOnUse">
      <rect width="16" height="16" fill="#FACC15"/>
      <path d="M -4 12 L 12 -4 M 4 20 L 20 4 M 0 16 L 16 0" stroke="#1E212F" stroke-width="4"/>
    </pattern>

    <!-- Metallic Gradient for Hopper -->
    <linearGradient id="chromeGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#647388"/>
      <stop offset="20%" stop-color="#94A3B8"/>
      <stop offset="45%" stop-color="#E2E8F0"/>
      <stop offset="70%" stop-color="#647388"/>
      <stop offset="100%" stop-color="#334155"/>
    </linearGradient>

    <!-- Metallic Gradient for Piston -->
    <linearGradient id="pistonGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#475569"/>
      <stop offset="30%" stop-color="#E2E8F0"/>
      <stop offset="70%" stop-color="#94A3B8"/>
      <stop offset="100%" stop-color="#334155"/>
    </linearGradient>

    <!-- Clip Path for Belt Surface -->
    <clipPath id="beltClip">
      <rect x="170" y="377" width="460" height="14" rx="2"/>
    </clipPath>
  </defs>

  <style>
    /* CSS Variables & Timing Calculations */
    /* Master Loop: 33.333333s (100/3s) */
    :root {
      --master-loop: 33.333333s;
      --block-dur: calc(100s / 15);  /* 6.666667s */
      --press-dur: calc(100s / 60);  /* 1.666667s */
      --gear-dur:  calc(100s / 27);  /* 3.703704s */
      --belt-dur:  calc(100s / 300); /* 0.333333s */
    }

    /* Gear Rotation */
    .rotate-gear {
      animation: rotateGear var(--gear-dur) linear infinite;
    }
    .gear-left { transform-origin: 170px 415px; }
    .gear-right { transform-origin: 630px 415px; }

    @keyframes rotateGear {
      0%   { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* Belt Stripe Scroll */
    .belt-scroll {
      animation: scrollBelt var(--belt-dur) linear infinite;
    }
    @keyframes scrollBelt {
      0%   { transform: translateX(0px); }
      100% { transform: translateX(20px); }
    }

    /* Press Mechanical Pump */
    .press-motion {
      animation: pressPump var(--press-dur) cubic-bezier(0.3, 0, 0.2, 1) infinite;
    }
    @keyframes pressPump {
      0%, 38%   { transform: translateY(0px); }
      48%       { transform: translateY(67px); }
      56%       { transform: translateY(67px); }
      90%, 100% { transform: translateY(0px); }
    }

    /* Hopper Recoil */
    .hopper-motion {
      animation: hopperRecoil var(--press-dur) ease-out infinite;
      transform-origin: 110px 240px;
    }
    @keyframes hopperRecoil {
      0%        { transform: rotate(0deg) translate(0px, 0px); }
      3%        { transform: rotate(-3deg) translate(-4px, 3px); }
      8%        { transform: rotate(1deg) translate(1px, -1px); }
      15%, 100% { transform: rotate(0deg) translate(0px, 0px); }
    }

    /* Impact Sparkles */
    .sparkle-motion {
      animation: sparklePop var(--press-dur) ease-out infinite;
    }
    @keyframes sparklePop {
      0%, 46%   { opacity: 0; transform: scale(0); }
      48%       { opacity: 1; transform: scale(1.2); }
      56%       { opacity: 0.8; transform: scale(1.6) translateY(-6px); }
      64%, 100% { opacity: 0; transform: scale(0); }
    }

    /* LED Pulse on Scoreboard */
    .led-pulse-1 { animation: pulseLed1 1.666667s ease-in-out infinite alternate; }
    .led-pulse-2 { animation: pulseLed2 2.222222s ease-in-out infinite alternate; }
    @keyframes pulseLed1 { 0% { opacity: 0.3; } 100% { opacity: 1; } }
    @keyframes pulseLed2 { 0% { opacity: 0.9; } 100% { opacity: 0.2; } }

    /* Block Journey Animation */
    .block-group {
      animation: blockJourney var(--block-dur) linear infinite;
    }
    .face-group {
      animation: faceShow var(--block-dur) linear infinite;
    }
    .plus1-group {
      animation: plusOneFloat var(--block-dur) linear infinite;
    }

    /* Staggered Delays for 4 Blocks (-1/4 of block-dur each) */
    .b-0, .b-0 .face-group, .b-0 .plus1-group { animation-delay: 0s; }
    .b-1, .b-1 .face-group, .b-1 .plus1-group { animation-delay: calc(-1 * var(--block-dur) / 4); }
    .b-2, .b-2 .face-group, .b-2 .plus1-group { animation-delay: calc(-2 * var(--block-dur) / 4); }
    .b-3, .b-3 .face-group, .b-3 .plus1-group { animation-delay: calc(-3 * var(--block-dur) / 4); }

    @keyframes blockJourney {
      0% {
        transform: translate(145px, 290px) scale(0.5, 1.3);
        opacity: 0;
      }
      1.5% {
        transform: translate(145px, 320px) scale(0.7, 1.2);
        opacity: 1;
      }
      3.5% {
        transform: translate(150px, 377px) scale(1.35, 0.65);
        opacity: 1;
      }
      6% {
        transform: translate(160px, 377px) scale(0.9, 1.1);
        opacity: 1;
      }
      8% {
        transform: translate(170px, 377px) scale(1, 1);
        opacity: 1;
      }
      31% {
        transform: translate(370px, 377px) scale(1, 1);
        opacity: 1;
      }
      34% {
        transform: translate(392px, 377px) scale(1, 1);
        opacity: 1;
      }
      37.5% {
        transform: translate(395px, 377px) scale(1.4, 0.5);
        opacity: 1;
      }
      41% {
        transform: translate(398px, 377px) scale(0.9, 1.1);
        opacity: 1;
      }
      43% {
        transform: translate(405px, 377px) scale(1, 1);
        opacity: 1;
      }
      68% {
        transform: translate(615px, 377px) scale(1, 1);
        opacity: 1;
      }
      72% {
        transform: translate(635px, 375px) scale(1.15, 1.15);
        opacity: 1;
      }
      75% {
        transform: translate(645px, 345px) scale(1.3, 1.3);
        opacity: 0;
      }
      75.01%, 100% {
        transform: translate(145px, 290px) scale(0.5, 1.3);
        opacity: 0;
      }
    }

    @keyframes faceShow {
      0%, 37%     { opacity: 0; }
      37.5%, 74.9% { opacity: 1; }
      75%, 100%   { opacity: 0; }
    }

    @keyframes plusOneFloat {
      0%, 70%   { opacity: 0; transform: translate(635px, 350px) scale(0.7); }
      72%       { opacity: 1; transform: translate(635px, 325px) scale(1.2); }
      74.9%     { opacity: 0; transform: translate(635px, 280px) scale(1); }
      75%, 100% { opacity: 0; transform: translate(635px, 350px) scale(0.7); }
    }
  </style>

  <!-- 1. BACKGROUND LAYER (16:9 Screen area inside 800x600 canvas) -->
  <rect width="800" height="600" fill="#111827"/> <!-- Outer Bezel -->
  <rect x="0" y="50" width="800" height="450" fill="url(#pixelGrid)"/> <!-- Widescreen Canvas -->

  <!-- Distant Background Factory Piping (Pixel Art) -->
  <g stroke="#1E212F" stroke-width="4" fill="none">
    <path d="M 0 130 L 260 130 L 260 220 L 320 220" stroke="#2D1A2E" stroke-width="12"/>
    <path d="M 480 220 L 540 220 L 540 110 L 800 110" stroke="#2D1A2E" stroke-width="12"/>
  </g>

  <!-- Scanlines Texture -->
  <rect x="0" y="50" width="800" height="450" fill="url(#scanlines)" pointer-events="none"/>

  <!-- 2. SCOREBOARD BANNER (Top Center) -->
  <g id="scoreboard">
    <!-- Banner Frame -->
    <rect x="260" y="65" width="280" height="46" rx="6" fill="#FACC15" stroke="#1E212F" stroke-width="4"/>
    <rect x="268" y="73" width="264" height="30" rx="3" fill="#0F172A" stroke="#1E212F" stroke-width="3"/>
    <!-- Abstract LED Meters -->
    <!-- Meter 1 (Cyan) -->
    <g fill="#38BDF8" class="led-pulse-1">
      <rect x="280" y="81" width="10" height="14" rx="1"/>
      <rect x="294" y="81" width="10" height="14" rx="1"/>
      <rect x="308" y="81" width="10" height="14" rx="1"/>
      <rect x="322" y="81" width="10" height="14" rx="1"/>
      <rect x="336" y="81" width="10" height="14" rx="1"/>
    </g>
    <!-- Meter 2 (Green) -->
    <g fill="#4ADE80" class="led-pulse-2">
      <rect x="360" y="81" width="8" height="14" rx="1"/>
      <rect x="372" y="81" width="8" height="14" rx="1"/>
      <rect x="384" y="81" width="8" height="14" rx="1"/>
    </g>
    <!-- Status Dot -->
    <circle cx="510" cy="88" r="5" fill="#4ADE80" stroke="#1E212F" stroke-width="2" class="led-pulse-1"/>
  </g>

  <!-- 3. CONVEYOR BELT STRUCTURE & LEGS -->
  <g id="conveyor-structure">
    <!-- Steel Support Legs -->
    <path d="M 160 415 L 160 520 M 180 415 L 180 520
             M 390 415 L 390 520 M 410 415 L 410 520
             M 620 415 L 620 520 M 640 415 L 640 520" stroke="#1E212F" stroke-width="12" stroke-linecap="square"/>
    <path d="M 160 415 L 160 520 M 180 415 L 180 520
             M 390 415 L 390 520 M 410 415 L 410 520
             M 620 415 L 620 520 M 640 415 L 640 520" stroke="#334155" stroke-width="6" stroke-linecap="square"/>
    <!-- Cross Bracing -->
    <path d="M 180 440 L 390 500 M 390 440 L 180 500
             M 410 440 L 620 500 M 620 440 L 410 500" stroke="#1E212F" stroke-width="4"/>

    <!-- Main Belt Frame Plate -->
    <rect x="130" y="375" width="540" height="80" rx="6" fill="#2E3A4D" stroke="#1E212F" stroke-width="4"/>
    <rect x="136" y="381" width="528" height="68" rx="3" fill="#1E293B"/>

    <!-- Belt Inner Recess -->
    <rect x="165" y="388" width="470" height="54" fill="#0F172A" stroke="#1E212F" stroke-width="3"/>
  </g>

  <!-- 4. GEARS / PULLEYS (Spinning Continuously) -->
  <!-- Left Gear -->
  <g class="rotate-gear gear-left" id="gear-left">
    <!-- Teeth -->
    <rect x="132" y="410" width="76" height="10" rx="2" fill="#647388" stroke="#1E212F" stroke-width="3"/>
    <rect x="165" y="377" width="10" height="76" rx="2" fill="#647388" stroke="#1E212F" stroke-width="3"/>
    <rect x="142" y="387" width="56" height="56" rx="2" fill="#647388" stroke="#1E212F" stroke-width="3" transform="rotate(45 170 415)"/>
    <!-- Main Wheel Disc -->
    <circle cx="170" cy="415" r="32" fill="#647388" stroke="#1E212F" stroke-width="4"/>
    <!-- Spoke Cutouts -->
    <circle cx="170" cy="415" r="22" fill="#1E212F"/>
    <path d="M 170 390 L 170 440 M 145 415 L 195 415" stroke="#647388" stroke-width="6"/>
    <!-- Axle Center -->
    <circle cx="170" cy="415" r="8" fill="#475569" stroke="#1E212F" stroke-width="3"/>
    <circle cx="170" cy="415" r="3" fill="#1E212F"/>
  </g>

  <!-- Right Gear -->
  <g class="rotate-gear gear-right" id="gear-right">
    <!-- Teeth -->
    <rect x="592" y="410" width="76" height="10" rx="2" fill="#647388" stroke="#1E212F" stroke-width="3"/>
    <rect x="625" y="377" width="10" height="76" rx="2" fill="#647388" stroke="#1E212F" stroke-width="3"/>
    <rect x="602" y="387" width="56" height="56" rx="2" fill="#647388" stroke="#1E212F" stroke-width="3" transform="rotate(45 630 415)"/>
    <!-- Main Wheel Disc -->
    <circle cx="630" cy="415" r="32" fill="#647388" stroke="#1E212F" stroke-width="4"/>
    <!-- Spoke Cutouts -->
    <circle cx="630" cy="415" r="22" fill="#1E212F"/>
    <path d="M 630 390 L 630 440 M 605 415 L 655 415" stroke="#647388" stroke-width="6"/>
    <!-- Axle Center -->
    <circle cx="630" cy="415" r="8" fill="#475569" stroke="#1E212F" stroke-width="3"/>
    <circle cx="630" cy="415" r="3" fill="#1E212F"/>
  </g>

  <!-- 5. SCROLLING BELT SURFACE (Top Run) -->
  <g id="conveyor-belt-surface">
    <!-- Top Track Shadow -->
    <rect x="130" y="373" width="540" height="12" rx="3" fill="#1E212F"/>
    <!-- Active Belt Track with Diagonal Pattern Clip -->
    <g clip-path="url(#beltClip)">
      <g class="belt-scroll">
        <rect x="150" y="377" width="500" height="14" fill="url(#beltStripes)"/>
      </g>
    </g>
    <!-- Belt Edges & Rails -->
    <path d="M 130 375 L 670 375 M 130 389 L 670 389" stroke="#1E212F" stroke-width="3"/>
  </g>

  <!-- 6. HOPPER / DISPENSER (Left Side) -->
  <g class="hopper-motion" id="hopper">
    <!-- Back Support Arm -->
    <rect x="20" y="180" width="80" height="20" fill="#334155" stroke="#1E212F" stroke-width="4"/>
    
    <!-- Main Hopper Funnel -->
    <polygon points="45,150 175,150 155,280 105,280" fill="url(#chromeGrad)" stroke="#1E212F" stroke-width="4"/>
    <polygon points="55,158 165,158 150,272 110,272" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.6"/>

    <!-- Top Rim -->
    <rect x="40" y="140" width="140" height="16" rx="3" fill="#94A3B8" stroke="#1E212F" stroke-width="4"/>

    <!-- Black & Yellow Hazard Band near Base -->
    <polygon points="107,250 153,250 148,280 105,280" fill="url(#hazardStripes)" stroke="#1E212F" stroke-width="3"/>

    <!-- Output Nozzle -->
    <rect x="108" y="280" width="44" height="25" fill="#475569" stroke="#1E212F" stroke-width="4"/>
    <rect x="114" y="300" width="32" height="10" fill="#1E293B" stroke="#1E212F" stroke-width="2"/>
    <!-- Nozzle Opening -->
    <ellipse cx="130" cy="310" rx="14" ry="4" fill="#0F172A"/>

    <!-- Rivets & Pixel Accents -->
    <circle cx="55" cy="148" r="2" fill="#1E212F"/>
    <circle cx="165" cy="148" r="2" fill="#1E212F"/>
    <!-- Blinking Indicator LED -->
    <circle cx="145" cy="170" r="5" fill="#4ADE80" stroke="#1E212F" stroke-width="2" class="led-pulse-1"/>
  </g>

  <!-- 7. STAMPING PRESS STRUCTURE & PISTON (Center) -->
  <g id="stamping-press-assembly">
    <!-- Top Support Gantry Frame -->
    <rect x="310" y="50" width="180" height="50" fill="#334155" stroke="#1E212F" stroke-width="4"/>
    <rect x="320" y="60" width="160" height="30" fill="#1E293B" stroke="#1E212F" stroke-width="3"/>
    <!-- Caution Pattern on Gantry Sides -->
    <rect x="310" y="50" width="20" height="50" fill="url(#hazardStripes)" stroke="#1E212F" stroke-width="3"/>
    <rect x="470" y="50" width="20" height="50" fill="url(#hazardStripes)" stroke="#1E212F" stroke-width="3"/>

    <!-- Hydraulic Shaft Guide Tube -->
    <rect x="375" y="100" width="50" height="70" fill="#647388" stroke="#1E212F" stroke-width="4"/>
    <rect x="385" y="100" width="30" height="70" fill="#475569"/>

    <!-- Piston Rod (Static Background Shaft) -->
    <rect x="388" y="150" width="24" height="90" fill="url(#pistonGrad)" stroke="#1E212F" stroke-width="3.5"/>

    <!-- MOVING PRESS HEAD GROUP -->
    <g class="press-motion" id="press-head">
      <!-- Piston Connection Collar -->
      <rect x="380" y="195" width="40" height="15" rx="2" fill="#475569" stroke="#1E212F" stroke-width="3"/>

      <!-- Main Red Press Body -->
      <rect x="335" y="210" width="130" height="50" rx="5" fill="#E63350" stroke="#1E212F" stroke-width="4"/>
      <!-- Top Highlight Line -->
      <path d="M 342 216 L 458 216" stroke="#FF6B81" stroke-width="3" stroke-linecap="round"/>

      <!-- Dark Red Underside Pad -->
      <rect x="342" y="260" width="116" height="12" fill="#A01B30" stroke="#1E212F" stroke-width="3"/>
      <!-- Metallic Die Base -->
      <rect x="355" y="272" width="90" height="6" fill="#94A3B8" stroke="#1E212F" stroke-width="2"/>

      <!-- Bold Pixel Text "FUN" -->
      <g fill="#FFFFFF" stroke="#1E212F" stroke-width="3" paint-order="stroke fill">
        <!-- Letter F -->
        <path d="M 362 225 H 378 V 232 H 370 V 237 H 376 V 243 H 370 V 252 H 362 Z"/>
        <!-- Letter U -->
        <path d="M 384 225 H 392 V 244 H 398 V 225 H 406 V 246 Q 406 252 398 252 H 392 Q 384 252 384 246 Z"/>
        <!-- Letter N -->
        <path d="M 412 225 H 420 L 428 242 V 225 H 436 V 252 H 428 L 420 235 V 252 H 412 Z"/>
      </g>

      <!-- Side Bolt Details -->
      <circle cx="346" cy="223" r="3" fill="#A01B30"/>
      <circle cx="454" cy="223" r="3" fill="#A01B30"/>
      <circle cx="346" cy="247" r="3" fill="#A01B30"/>
      <circle cx="454" cy="247" r="3" fill="#A01B30"/>
    </g>
  </g>

  <!-- 8. IMPACT SPARKLES (Stationary at Stamp Location) -->
  <g class="sparkle-motion" transform="translate(395, 365)">
    <!-- Left Sparkles -->
    <rect x="-55" y="-12" width="8" height="8" fill="#FACC15" stroke="#1E212F" stroke-width="2"/>
    <rect x="-70" y="2" width="6" height="6" fill="#FFFFFF"/>
    <!-- Right Sparkles -->
    <rect x="48" y="-12" width="8" height="8" fill="#FACC15" stroke="#1E212F" stroke-width="2"/>
    <rect x="62" y="2" width="6" height="6" fill="#FFFFFF"/>
  </g>

  <!-- 9. BLOCKS (4 Cycling Instances, Self-Contained Animations) -->

  <!-- BLOCK 0: GREEN (#4ADE80) -->
  <g class="block-group b-0">
    <!-- Block Body (Origin bottom-center) -->
    <rect x="-20" y="-40" width="40" height="40" rx="5" fill="#4ADE80" stroke="#1E212F" stroke-width="3.5"/>
    <!-- Highlights & Bevels -->
    <path d="M -15 -36 L 15 -36" stroke="#86EFAC" stroke-width="3" stroke-linecap="round"/>
    <path d="M -16 -35 L -16 -8" stroke="#86EFAC" stroke-width="3" stroke-linecap="round"/>
    <path d="M -15 -4 L 15 -4" stroke="#16A34A" stroke-width="3" stroke-linecap="round"/>
    <path d="M 16 -34 L 16 -5" stroke="#16A34A" stroke-width="3" stroke-linecap="round"/>
    <!-- Unstamped Target Mark -->
    <circle cx="0" cy="-20" r="3" fill="#16A34A" opacity="0.3"/>

    <!-- Face Style 0: Dot Eyes + Simple Curved Smile -->
    <g class="face-group">
      <!-- Dot Eyes -->
      <rect x="-10" y="-28" width="5" height="7" rx="2" fill="#1E212F"/>
      <rect x="5" y="-28" width="5" height="7" rx="2" fill="#1E212F"/>
      <!-- Smile -->
      <path d="M -9 -14 Q 0 -6 9 -14" fill="none" stroke="#1E212F" stroke-width="3.5" stroke-linecap="round"/>
    </g>

    <!-- Floating "+1" Popup -->
    <g class="plus1-group">
      <text x="0" y="-50" font-family="'Impact', 'Arial Black', sans-serif" font-weight="900" font-size="22" fill="#FACC15" stroke="#1E212F" stroke-width="3" paint-order="stroke fill" text-anchor="middle">+1</text>
    </g>
  </g>

  <!-- BLOCK 1: YELLOW (#FACC15) -->
  <g class="block-group b-1">
    <!-- Block Body -->
    <rect x="-20" y="-40" width="40" height="40" rx="5" fill="#FACC15" stroke="#1E212F" stroke-width="3.5"/>
    <!-- Highlights & Bevels -->
    <path d="M -15 -36 L 15 -36" stroke="#FEF08A" stroke-width="3" stroke-linecap="round"/>
    <path d="M -16 -35 L -16 -8" stroke="#FEF08A" stroke-width="3" stroke-linecap="round"/>
    <path d="M -15 -4 L 15 -4" stroke="#CA8A04" stroke-width="3" stroke-linecap="round"/>
    <path d="M 16 -34 L 16 -5" stroke="#CA8A04" stroke-width="3" stroke-linecap="round"/>
    <!-- Unstamped Target Mark -->
    <circle cx="0" cy="-20" r="3" fill="#CA8A04" opacity="0.3"/>

    <!-- Face Style 1: Caret "^ ^" Eyes + Wide Smile -->
    <g class="face-group">
      <!-- Caret Eyes -->
      <path d="M -12 -22 L -8 -28 L -4 -22" fill="none" stroke="#1E212F" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M 4 -22 L 8 -28 L 12 -22" fill="none" stroke="#1E212F" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Wide Smile -->
      <path d="M -10 -13 C -10 -5 10 -5 10 -13" fill="none" stroke="#1E212F" stroke-width="3.5" stroke-linecap="round"/>
    </g>

    <!-- Floating "+1" Popup -->
    <g class="plus1-group">
      <text x="0" y="-50" font-family="'Impact', 'Arial Black', sans-serif" font-weight="900" font-size="22" fill="#FACC15" stroke="#1E212F" stroke-width="3" paint-order="stroke fill" text-anchor="middle">+1</text>
    </g>
  </g>

  <!-- BLOCK 2: SKY BLUE (#38BDF8) -->
  <g class="block-group b-2">
    <!-- Block Body -->
    <rect x="-20" y="-40" width="40" height="40" rx="5" fill="#38BDF8" stroke="#1E212F" stroke-width="3.5"/>
    <!-- Highlights & Bevels -->
    <path d="M -15 -36 L 15 -36" stroke="#BAE6FD" stroke-width="3" stroke-linecap="round"/>
    <path d="M -16 -35 L -16 -8" stroke="#BAE6FD" stroke-width="3" stroke-linecap="round"/>
    <path d="M -15 -4 L 15 -4" stroke="#0284C7" stroke-width="3" stroke-linecap="round"/>
    <path d="M 16 -34 L 16 -5" stroke="#0284C7" stroke-width="3" stroke-linecap="round"/>
    <!-- Unstamped Target Mark -->
    <circle cx="0" cy="-20" r="3" fill="#0284C7" opacity="0.3"/>

    <!-- Face Style 2: Arch "∩ ∩" Eyes + Open Smile -->
    <g class="face-group">
      <!-- Arch Eyes -->
      <path d="M -12 -22 C -12 -29 -4 -29 -4 -22" fill="none" stroke="#1E212F" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M 4 -22 C 4 -29 12 -29 12 -22" fill="none" stroke="#1E212F" stroke-width="3.5" stroke-linecap="round"/>
      <!-- Open Smile -->
      <path d="M -8 -14 Q 0 -4 8 -14 Z" fill="#1E212F"/>
    </g>

    <!-- Floating "+1" Popup -->
    <g class="plus1-group">
      <text x="0" y="-50" font-family="'Impact', 'Arial Black', sans-serif" font-weight="900" font-size="22" fill="#FACC15" stroke="#1E212F" stroke-width="3" paint-order="stroke fill" text-anchor="middle">+1</text>
    </g>
  </g>

  <!-- BLOCK 3: PURPLE (#BF83FD) -->
  <g class="block-group b-3">
    <!-- Block Body -->
    <rect x="-20" y="-40" width="40" height="40" rx="5" fill="#BF83FD" stroke="#1E212F" stroke-width="3.5"/>
    <!-- Highlights & Bevels -->
    <path d="M -15 -36 L 15 -36" stroke="#E9D5FF" stroke-width="3" stroke-linecap="round"/>
    <path d="M -16 -35 L -16 -8" stroke="#E9D5FF" stroke-width="3" stroke-linecap="round"/>
    <path d="M -15 -4 L 15 -4" stroke="#9333EA" stroke-width="3" stroke-linecap="round"/>
    <path d="M 16 -34 L 16 -5" stroke="#9333EA" stroke-width="3" stroke-linecap="round"/>
    <!-- Unstamped Target Mark -->
    <circle cx="0" cy="-20" r="3" fill="#9333EA" opacity="0.3"/>

    <!-- Face Style 3: Line "- -" Eyes + Playful Smirk -->
    <g class="face-group">
      <!-- Line Eyes -->
      <line x1="-12" y1="-24" x2="-4" y2="-24" stroke="#1E212F" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="4" y1="-24" x2="12" y2="-24" stroke="#1E212F" stroke-width="3.5" stroke-linecap="round"/>
      <!-- Smirk -->
      <path d="M -8 -12 Q 0 -8 8 -15" fill="none" stroke="#1E212F" stroke-width="3.5" stroke-linecap="round"/>
    </g>

    <!-- Floating "+1" Popup -->
    <g class="plus1-group">
      <text x="0" y="-50" font-family="'Impact', 'Arial Black', sans-serif" font-weight="900" font-size="22" fill="#FACC15" stroke="#1E212F" stroke-width="3" paint-order="stroke fill" text-anchor="middle">+1</text>
    </g>
  </g>

  <!-- 10. FOREGROUND CABINET FRAME / VIGNETTE -->
  <!-- Top Bezel Overlay -->
  <rect x="0" y="0" width="800" height="50" fill="#111827"/>
  <line x1="0" y1="50" x2="800" y2="50" stroke="#1E212F" stroke-width="4"/>

  <!-- Bottom Bezel Overlay -->
  <rect x="0" y="500" width="800" height="100" fill="#111827"/>
  <line x1="0" y1="500" x2="800" y2="500" stroke="#1E212F" stroke-width="4"/>

  <!-- Bottom Vents / Speaker Grille Detail -->
  <g fill="#1E293B" stroke="#0F172A" stroke-width="2">
    <rect x="60" y="525" width="120" height="10" rx="3"/>
    <rect x="60" y="545" width="120" height="10" rx="3"/>
    <rect x="620" y="525" width="120" height="10" rx="3"/>
    <rect x="620" y="545" width="120" height="10" rx="3"/>
  </g>

  <!-- Coin / Status LED on Cabinet Frame -->
  <circle cx="400" cy="535" r="8" fill="#1E293B" stroke="#374151" stroke-width="3"/>
  <circle cx="400" cy="535" r="4" fill="#E63350" class="led-pulse-1"/>
</svg>