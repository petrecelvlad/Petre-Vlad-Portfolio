<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <!-- Master Color & Texture Gradients -->
    <linearGradient id="bgDesk" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1F120B"/>
      <stop offset="50%" stop-color="#150B06"/>
      <stop offset="100%" stop-color="#0B0503"/>
    </linearGradient>

    <linearGradient id="woodFrame" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#6A4023"/>
      <stop offset="10%" stop-color="#543118"/>
      <stop offset="90%" stop-color="#3D210E"/>
      <stop offset="100%" stop-color="#2A1406"/>
    </linearGradient>

    <linearGradient id="woodInner" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#311D11"/>
      <stop offset="100%" stop-color="#1D0F08"/>
    </linearGradient>

    <linearGradient id="parchment" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF8E7"/>
      <stop offset="70%" stop-color="#F5E7C8"/>
      <stop offset="100%" stop-color="#E8D3A7"/>
    </linearGradient>

    <linearGradient id="parchmentHeader" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#EDE0C4"/>
      <stop offset="100%" stop-color="#DFCBA5"/>
    </linearGradient>

    <!-- Metal / Gold Gradients -->
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE875"/>
      <stop offset="40%" stop-color="#F7B131"/>
      <stop offset="80%" stop-color="#C87B08"/>
      <stop offset="100%" stop-color="#8A4B00"/>
    </linearGradient>

    <linearGradient id="brassCap" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E6C280"/>
      <stop offset="50%" stop-color="#A67C3B"/>
      <stop offset="100%" stop-color="#593E19"/>
    </linearGradient>

    <!-- Category Gradients -->
    <linearGradient id="designGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF5964"/>
      <stop offset="100%" stop-color="#D62828"/>
    </linearGradient>

    <linearGradient id="visionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFD166"/>
      <stop offset="100%" stop-color="#F77F00"/>
    </linearGradient>

    <linearGradient id="prodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2A9D8F"/>
      <stop offset="100%" stop-color="#15616D"/>
    </linearGradient>

    <linearGradient id="leadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#A2D2FF"/>
      <stop offset="100%" stop-color="#4361EE"/>
    </linearGradient>

    <linearGradient id="lockedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#5C524A"/>
      <stop offset="100%" stop-color="#332C27"/>
    </linearGradient>

    <!-- Glows & Shadows -->
    <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="2" dy="5" stdDeviation="4" flood-color="#000000" flood-opacity="0.6"/>
    </filter>

    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="5" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>

    <filter id="nodeActiveGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feComponentTransfer in="blur" result="glow">
        <feFuncA type="linear" slope="0.8"/>
      </feComponentTransfer>
      <feMerge>
        <feMergeNode in="glow"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- Scotch Tape Pattern -->
    <linearGradient id="tape" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.1"/>
      <stop offset="20%" stop-color="#FFFBD9" stop-opacity="0.5"/>
      <stop offset="80%" stop-color="#FFF7C2" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.1"/>
    </linearGradient>
  </defs>

  <!-- ================= BACKGROUND WORKBENCH ================= -->
  <rect width="800" height="600" fill="url(#bgDesk)"/>
  
  <!-- Desk Wood Grain Lines (Decorative Overlay) -->
  <path d="M 0,100 L 800,120 M 0,280 L 800,260 M 0,450 L 800,470" stroke="#120904" stroke-width="2" opacity="0.4"/>

  <!-- ================= LEFT: SKILL TREE BOARD ================= -->
  <!-- Outer Wooden Board Frame -->
  <g filter="url(#shadow)">
    <rect x="20" y="20" width="470" height="560" rx="16" fill="url(#woodFrame)" stroke="#1C1610" stroke-width="4"/>
    <!-- Inset Felt/Cork Canvas -->
    <rect x="34" y="34" width="442" height="532" rx="10" fill="url(#woodInner)" stroke="#120A05" stroke-width="3"/>
    <!-- Corner Brass Brackets -->
    <!-- Top-Left -->
    <path d="M 20,45 L 45,20 L 65,20 L 20,65 Z" fill="url(#brassCap)" stroke="#1C1610" stroke-width="2"/>
    <circle cx="35" cy="35" r="3" fill="#1C1610"/>
    <circle cx="34" cy="33" r="1" fill="#FFE875"/>
    <!-- Top-Right -->
    <path d="M 490,45 L 465,20 L 445,20 L 490,65 Z" fill="url(#brassCap)" stroke="#1C1610" stroke-width="2"/>
    <circle cx="475" cy="35" r="3" fill="#1C1610"/>
    <circle cx="474" cy="33" r="1" fill="#FFE875"/>
    <!-- Bottom-Left -->
    <path d="M 20,555 L 45,580 L 65,580 L 20,535 Z" fill="url(#brassCap)" stroke="#1C1610" stroke-width="2"/>
    <circle cx="35" cy="565" r="3" fill="#1C1610"/>
    <!-- Bottom-Right -->
    <path d="M 490,555 L 465,580 L 445,580 L 490,535 Z" fill="url(#brassCap)" stroke="#1C1610" stroke-width="2"/>
    <circle cx="475" cy="565" r="3" fill="#1C1610"/>
  </g>

  <!-- Board Header Banner -->
  <g filter="url(#shadow)">
    <path d="M 120,12 L 370,12 L 360,48 L 130,48 Z" fill="#8A1C1C" stroke="#1C1610" stroke-width="3"/>
    <path d="M 110,20 L 380,20 L 370,42 L 120,42 Z" fill="#C12727" stroke="#1C1610" stroke-width="2"/>
    <text x="245" y="35" text-anchor="middle" font-family="'Impact', 'Arial Black', sans-serif" font-size="16" fill="#FFEBAD" letter-spacing="2">GUILD SKILL TREE</text>
  </g>

  <!-- Category Filter Buttons / Tabs -->
  <g transform="translate(48, 62)">
    <!-- Vision Tab -->
    <g transform="translate(0,0)">
      <rect x="0" y="0" width="85" height="24" rx="12" fill="url(#visionGrad)" stroke="#1C1610" stroke-width="2"/>
      <circle cx="12" cy="12" r="5" fill="#FFF"/>
      <text x="48" y="16" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="10" fill="#1C1610">VISION</text>
    </g>
    <!-- Design Tab -->
    <g transform="translate(95,0)">
      <rect x="0" y="0" width="85" height="24" rx="12" fill="url(#designGrad)" stroke="#1C1610" stroke-width="2"/>
      <circle cx="12" cy="12" r="5" fill="#FFF"/>
      <text x="48" y="16" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="10" fill="#FFF">DESIGN</text>
    </g>
    <!-- Production Tab -->
    <g transform="translate(190,0)">
      <rect x="0" y="0" width="95" height="24" rx="12" fill="url(#prodGrad)" stroke="#1C1610" stroke-width="2"/>
      <circle cx="12" cy="12" r="5" fill="#FFF"/>
      <text x="53" y="16" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="10" fill="#FFF">PRODUCTION</text>
    </g>
    <!-- Leadership Tab -->
    <g transform="translate(295,0)">
      <rect x="0" y="0" width="95" height="24" rx="12" fill="url(#leadGrad)" stroke="#1C1610" stroke-width="2"/>
      <circle cx="12" cy="12" r="5" fill="#FFF"/>
      <text x="53" y="16" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="10" fill="#FFF">LEADERSHIP</text>
    </g>
  </g>

  <!-- Skill Tree Graph Background Grid Constellations (Subtle) -->
  <g opacity="0.15" stroke="#FFF" stroke-width="1" stroke-dasharray="4,4">
    <circle cx="255" cy="320" r="180" fill="none"/>
    <line x1="75" y1="100" x2="435" y2="520"/>
    <line x1="435" y1="100" x2="75" y2="520"/>
  </g>

  <!-- ================= BRANCH CONNECTIONS (PIPES/VINES) ================= -->
  <g stroke-linecap="round" stroke-linejoin="round">
    <!-- Inactive / Locked Connections -->
    <path d="M 120,440 L 120,290" stroke="#120A05" stroke-width="10"/>
    <path d="M 120,440 L 120,290" stroke="#3A2E2B" stroke-width="4"/>

    <path d="M 120,290 L 120,160" stroke="#120A05" stroke-width="10"/>
    <path d="M 120,290 L 120,160" stroke="#3A2E2B" stroke-width="4" stroke-dasharray="6,6"/>

    <path d="M 265,220 L 390,150" stroke="#120A05" stroke-width="10"/>
    <path d="M 265,220 L 390,150" stroke="#3A2E2B" stroke-width="4" stroke-dasharray="6,6"/>

    <path d="M 265,440 L 400,480" stroke="#120A05" stroke-width="10"/>
    <path d="M 265,440 L 400,480" stroke="#3A2E2B" stroke-width="4" stroke-dasharray="6,6"/>

    <!-- Active Unlocked Connections (Glowing Gold/Orange) -->
    <!-- Core -> World Craft -->
    <path d="M 120,440 L 120,290" stroke="#1C1610" stroke-width="10"/>
    <path d="M 120,440 L 120,290" stroke="#F7B131" stroke-width="5"/>
    <path d="M 120,440 L 120,290" stroke="#FFF" stroke-width="1.5" opacity="0.8"/>

    <!-- World Craft -> UX Alchemy (SELECTED BRANCH) -->
    <path d="M 120,290 L 265,220" stroke="#1C1610" stroke-width="12"/>
    <path d="M 120,290 L 265,220" stroke="#FF5964" stroke-width="6" filter="url(#softGlow)"/>
    <path d="M 120,290 L 265,220" stroke="#FFF8E7" stroke-width="2"/>

    <!-- UX Alchemy -> System Engine -->
    <path d="M 265,220 L 390,310" stroke="#1C1610" stroke-width="10"/>
    <path d="M 265,220 L 390,310" stroke="#2A9D8F" stroke-width="5"/>

    <!-- Core -> Guild Lead -->
    <path d="M 120,440 L 265,440" stroke="#1C1610" stroke-width="10"/>
    <path d="M 120,440 L 265,440" stroke="#4361EE" stroke-width="5"/>
  </g>

  <!-- ================= SKILL NODES ================= -->

  <!-- NODE 1: CORE VISION (Root - Unlocked) -->
  <g transform="translate(120, 440)" filter="url(#shadow)">
    <circle cx="0" cy="0" r="28" fill="#1C1610"/>
    <circle cx="0" cy="0" r="24" fill="url(#visionGrad)" stroke="#FFF" stroke-width="2"/>
    <!-- Icon: Crown -->
    <path d="M -10,6 L -12,-6 L -4,-1 L 0,-10 L 4,-1 L 12,-6 L 10,6 Z" fill="#1C1610"/>
    <text x="0" y="40" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="11" fill="#FFD166" stroke="#1C1610" stroke-width="0.5">Game Vision</text>
  </g>

  <!-- NODE 2: WORLD CRAFT (Unlocked) -->
  <g transform="translate(120, 290)" filter="url(#shadow)">
    <circle cx="0" cy="0" r="26" fill="#1C1610"/>
    <circle cx="0" cy="0" r="22" fill="url(#visionGrad)" stroke="#FFF" stroke-width="2"/>
    <!-- Icon: Globe/Map -->
    <circle cx="0" cy="0" r="10" fill="none" stroke="#1C1610" stroke-width="2.5"/>
    <path d="M -10,0 L 10,0 M 0,-10 L 0,10" stroke="#1C1610" stroke-width="2"/>
    <text x="0" y="38" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="11" fill="#FFD166" stroke="#1C1610" stroke-width="0.5">World Building</text>
  </g>

  <!-- NODE 3: UX ALCHEMY (ACTIVE / SELECTED NODE!) -->
  <g transform="translate(265, 220)">
    <!-- Selection Target Reticle & Glow -->
    <circle cx="0" cy="0" r="42" fill="none" stroke="#FF5964" stroke-width="2" stroke-dasharray="8,4" opacity="0.8" filter="url(#nodeActiveGlow)"/>
    <circle cx="0" cy="0" r="35" fill="#FFE875" opacity="0.3" filter="url(#softGlow)"/>
    
    <!-- Outer Diamond Frame -->
    <rect x="-28" y="-28" width="56" height="56" rx="10" transform="rotate(45)" fill="#1C1610" filter="url(#shadow)"/>
    <rect x="-24" y="-24" width="48" height="48" rx="8" transform="rotate(45)" fill="url(#designGrad)" stroke="#FFF" stroke-width="2.5"/>
    
    <!-- Icon: Flask/Beaker -->
    <path d="M -6,-10 L 6,-10 M -3,-10 L -3,-4 L -10,7 C -11,9 -9,12 -6,12 L 6,12 C 9,12 11,9 10,7 L 3,-4 L 3,-10" fill="none" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M -6,6 L 6,6 L 4,10 L -4,10 Z" fill="#FFE875"/>

    <!-- Selection Pointer Badge -->
    <path d="M 0,-36 L 8,-48 L -8,-48 Z" fill="#FF5964" stroke="#1C1610" stroke-width="2"/>
    
    <!-- Label -->
    <rect x="-45" y="34" width="90" height="18" rx="9" fill="#1C1610"/>
    <text x="0" y="47" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="11" fill="#FFF">UX ALCHEMY</text>
    
    <!-- Sparkles -->
    <path d="M -32,-20 L -28,-20 L -28,-24 L -28,-20 Z" stroke="#FFD166" stroke-width="2"/>
    <path d="M 30,15 L 35,15 M 32.5,12.5 L 32.5,17.5" stroke="#FFD166" stroke-width="2"/>
  </g>

  <!-- NODE 4: SYSTEM ENGINE (Unlocked) -->
  <g transform="translate(390, 310)" filter="url(#shadow)">
    <circle cx="0" cy="0" r="26" fill="#1C1610"/>
    <circle cx="0" cy="0" r="22" fill="url(#prodGrad)" stroke="#FFF" stroke-width="2"/>
    <!-- Icon: Gear -->
    <path d="M -8,-3 L -8,3 L -5,5 L -3,8 L 3,8 L 5,5 L 8,3 L 8,-3 L 5,-5 L 3,-8 L -3,-8 L -5,-5 Z" fill="none" stroke="#FFF" stroke-width="2.5"/>
    <circle cx="0" cy="0" r="3" fill="#FFF"/>
    <text x="0" y="38" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="11" fill="#2A9D8F" stroke="#1C1610" stroke-width="0.5">System Engine</text>
  </g>

  <!-- NODE 5: GUILD LEAD (Unlocked) -->
  <g transform="translate(265, 440)" filter="url(#shadow)">
    <circle cx="0" cy="0" r="26" fill="#1C1610"/>
    <circle cx="0" cy="0" r="22" fill="url(#leadGrad)" stroke="#FFF" stroke-width="2"/>
    <!-- Icon: Shield -->
    <path d="M -8,-9 L 8,-9 L 8,1 C 8,7 0,11 0,11 C 0,11 -8,7 -8,1 Z" fill="none" stroke="#FFF" stroke-width="2.5"/>
    <text x="0" y="38" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="11" fill="#A2D2FF" stroke="#1C1610" stroke-width="0.5">Guild Lead</text>
  </g>

  <!-- NODE 6: LEVEL CRAFT (Locked) -->
  <g transform="translate(120, 160)" opacity="0.85">
    <circle cx="0" cy="0" r="22" fill="#1C1610"/>
    <circle cx="0" cy="0" r="18" fill="url(#lockedGrad)" stroke="#665A52" stroke-width="2"/>
    <!-- Icon: Lock -->
    <rect x="-6" y="-1" width="12" height="9" rx="2" fill="#A89F91"/>
    <path d="M -4,-1 L -4,-4 C -4,-6 4,-6 4,-4 L 4,-1" fill="none" stroke="#A89F91" stroke-width="2"/>
    <text x="0" y="34" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="10" fill="#8C7F73">Level Craft</text>
  </g>

  <!-- NODE 7: TACTILE SHADERS (Locked) -->
  <g transform="translate(390, 150)" opacity="0.85">
    <circle cx="0" cy="0" r="22" fill="#1C1610"/>
    <circle cx="0" cy="0" r="18" fill="url(#lockedGrad)" stroke="#665A52" stroke-width="2"/>
    <!-- Icon: Lock -->
    <rect x="-6" y="-1" width="12" height="9" rx="2" fill="#A89F91"/>
    <path d="M -4,-1 L -4,-4 C -4,-6 4,-6 4,-4 L 4,-1" fill="none" stroke="#A89F91" stroke-width="2"/>
    <text x="0" y="34" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="10" fill="#8C7F73">Juice &amp; FX</text>
  </g>

  <!-- NODE 8: QUEST ARCHITECTURE (Locked) -->
  <g transform="translate(400, 480)" opacity="0.85">
    <circle cx="0" cy="0" r="22" fill="#1C1610"/>
    <circle cx="0" cy="0" r="18" fill="url(#lockedGrad)" stroke="#665A52" stroke-width="2"/>
    <!-- Icon: Lock -->
    <rect x="-6" y="-1" width="12" height="9" rx="2" fill="#A89F91"/>
    <path d="M -4,-1 L -4,-4 C -4,-6 4,-6 4,-4 L 4,-1" fill="none" stroke="#A89F91" stroke-width="2"/>
    <text x="0" y="34" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="10" fill="#8C7F73">Quest Logic</text>
  </g>


  <!-- ================= RIGHT: PARCHMENT INSPECTOR PANEL ================= -->
  <g transform="translate(508, 20)" filter="url(#shadow)">
    <!-- Top Wooden Hanging Peg Board -->
    <rect x="10" y="0" width="250" height="20" rx="4" fill="url(#woodFrame)" stroke="#1C1610" stroke-width="2"/>
    <circle cx="35" cy="10" r="4" fill="#1C1610"/>
    <circle cx="235" cy="10" r="4" fill="#1C1610"/>

    <!-- Hanging Straps -->
    <rect x="30" y="14" width="10" height="20" fill="#8A1C1C" stroke="#1C1610" stroke-width="1.5"/>
    <rect x="230" y="14" width="10" height="20" fill="#8A1C1C" stroke="#1C1610" stroke-width="1.5"/>

    <!-- Main Parchment Scroll Board -->
    <rect x="5" y="28" width="260" height="532" rx="12" fill="url(#parchment)" stroke="#1C1610" stroke-width="3"/>
    
    <!-- Parchment Inner Border Line -->
    <rect x="13" y="36" width="244" height="516" rx="8" fill="none" stroke="#C5B18B" stroke-width="1.5" stroke-dasharray="6,3"/>

    <!-- Banner Ribbon Top Header -->
    <path d="M 20,40 L 250,40 L 250,75 L 235,68 L 20,75 Z" fill="url(#parchmentHeader)"/>
    <line x1="20" y1="75" x2="250" y2="75" stroke="#D0BC96" stroke-width="2"/>

    <!-- Wax Seal Accent -->
    <g transform="translate(225, 60)" filter="url(#shadow)">
      <circle cx="0" cy="0" r="18" fill="#9E2A2B" stroke="#5E0B0C" stroke-width="2"/>
      <circle cx="0" cy="0" r="14" fill="#C1121F"/>
      <!-- Stamped Emblem (Star/Cross) -->
      <path d="M -5,-5 L 5,5 M -5,5 L 5,-5 M 0,-7 L 0,7 M -7,0 L 7,0" stroke="#780000" stroke-width="2"/>
      <!-- Ribbon Tails -->
      <path d="M -6,14 L -12,30 L -2,26 L 4,32 L 2,15 Z" fill="#9E2A2B" stroke="#5E0B0C" stroke-width="1"/>
    </g>

    <!-- Header Text -->
    <text x="25" y="58" font-family="'Georgia', serif" font-weight="bold" font-size="11" fill="#8A4B00" letter-spacing="1">SKILL INSPECTOR</text>
    <text x="25" y="98" font-family="'Impact', 'Arial Black', sans-serif" font-size="22" fill="#1C1610" letter-spacing="0.5">UX ALCHEMY</text>
    
    <!-- Category Badge -->
    <rect x="25" y="106" width="95" height="18" rx="4" fill="#FF5964" stroke="#1C1610" stroke-width="1.5"/>
    <text x="72" y="119" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="9" fill="#FFF">DESIGN BRANCH</text>

    <!-- Mastery Stars -->
    <g transform="translate(130, 107)">
      <path d="M 0,0 L 3,6 L 9,7 L 4.5,11 L 6,17 L 0,13 L -6,17 L -4.5,11 L -9,7 L -3,6 Z" fill="url(#goldGrad)" stroke="#1C1610" stroke-width="1"/>
      <path d="M 15,0 L 18,6 L 24,7 L 19.5,11 L 21,17 L 15,13 L 9,17 L 10.5,11 L 6,7 L 12,6 Z" fill="url(#goldGrad)" stroke="#1C1610" stroke-width="1"/>
      <path d="M 30,0 L 33,6 L 39,7 L 34.5,11 L 36,17 L 30,13 L 24,17 L 25.5,11 L 21,7 L 27,6 Z" fill="url(#goldGrad)" stroke="#1C1610" stroke-width="1"/>
      <path d="M 45,0 L 48,6 L 54,7 L 49.5,11 L 51,17 L 45,13 L 39,17 L 40.5,11 L 36,7 L 42,6 Z" fill="url(#goldGrad)" stroke="#1C1610" stroke-width="1"/>
      <path d="M 60,0 L 63,6 L 69,7 L 64.5,11 L 66,17 L 60,13 L 54,17 L 55.5,11 L 51,7 L 57,6 Z" fill="url(#goldGrad)" stroke="#1C1610" stroke-width="1"/>
    </g>

    <!-- Skill Description Box -->
    <g transform="translate(23, 136)">
      <rect x="0" y="0" width="224" height="75" rx="6" fill="#F0E0C0" stroke="#D8C29D" stroke-width="1"/>
      <text x="10" y="18" font-family="'Georgia', serif" font-size="11" fill="#3D210E" font-style="italic">
        <tspan x="10" dy="0">"Transmutes static interfaces into</tspan>
        <tspan x="10" dy="14">juicy, tactile game experiences with</tspan>
        <tspan x="10" dy="14">springy physics, rich audio-visual</tspan>
        <tspan x="10" dy="14">feedback, and magical delight."</tspan>
      </text>
    </g>

    <!-- Proficiency / Stats Bars -->
    <g transform="translate(25, 224)">
      <!-- Stat 1 -->
      <text x="0" y="10" font-family="sans-serif" font-weight="700" font-size="10" fill="#1C1610">TACTILE FEEDBACK</text>
      <text x="220" y="10" text-anchor="end" font-family="sans-serif" font-weight="800" font-size="10" fill="#D62828">98%</text>
      <rect x="0" y="15" width="220" height="10" rx="5" fill="#D8C29D" stroke="#1C1610" stroke-width="1.5"/>
      <rect x="2" y="17" width="210" height="6" rx="3" fill="url(#designGrad)"/>

      <!-- Stat 2 -->
      <text x="0" y="38" font-family="sans-serif" font-weight="700" font-size="10" fill="#1C1610">JUICE &amp; ANIMATION</text>
      <text x="220" y="38" text-anchor="end" font-family="sans-serif" font-weight="800" font-size="10" fill="#F77F00">92%</text>
      <rect x="0" y="43" width="220" height="10" rx="5" fill="#D8C29D" stroke="#1C1610" stroke-width="1.5"/>
      <rect x="2" y="45" width="195" height="6" rx="3" fill="url(#visionGrad)"/>

      <!-- Stat 3 -->
      <text x="0" y="66" font-family="sans-serif" font-weight="700" font-size="10" fill="#1C1610">INTERFACE CLARITY</text>
      <text x="220" y="66" text-anchor="end" font-family="sans-serif" font-weight="800" font-size="10" fill="#2A9D8F">88%</text>
      <rect x="0" y="71" width="220" height="10" rx="5" fill="#D8C29D" stroke="#1C1610" stroke-width="1.5"/>
      <rect x="2" y="73" width="180" height="6" rx="3" fill="url(#prodGrad)"/>
    </g>

    <!-- Divider Line -->
    <path d="M 20,322 L 250,322" stroke="#C5B18B" stroke-width="2" stroke-linecap="round" stroke-dasharray="4,4"/>

    <!-- ================= FEATURED PROJECT SNAPSHOTS ================= -->
    <text x="25" y="340" font-family="'Georgia', serif" font-weight="bold" font-size="11" fill="#8A4B00" letter-spacing="1">FIELD APPLICATION PROOFS</text>

    <!-- Snapshot 1: Cozy Haven RPG (Rotated Left) -->
    <g transform="translate(20, 352) rotate(-4)" filter="url(#shadow)">
      <!-- Polaroid Card Frame -->
      <rect x="0" y="0" width="105" height="110" rx="4" fill="#FFF" stroke="#1C1610" stroke-width="2"/>
      <!-- Photo Viewport -->
      <rect x="6" y="6" width="93" height="72" fill="#2A9D8F"/>
      <!-- Mini Vector Scene (Cozy Island) -->
      <path d="M 6,55 Q 50,35 99,55 L 99,78 L 6,78 Z" fill="#E9C46A"/>
      <circle cx="75" cy="28" r="10" fill="#F4A261"/>
      <polygon points="30,42 20,62 40,62" fill="#264653"/>
      <polygon points="50,38 38,62 62,62" fill="#2A9D8F"/>
      <!-- UI Heart Overlay -->
      <path d="M 14,14 C 14,10 20,10 20,14 C 20,10 26,10 26,14 C 26,18 20,22 20,22 C 20,22 14,18 14,14 Z" fill="#E63946"/>
      <!-- Polaroid Label -->
      <text x="52" y="94" text-anchor="middle" font-family="'Courier New', monospace" font-weight="bold" font-size="9" fill="#1C1610">Cozy Haven UI</text>
      <!-- Scotch Tape Top-Left Corner -->
      <rect x="-8" y="2" width="32" height="12" transform="rotate(-20)" fill="url(#tape)" stroke="#E8E2B5" stroke-width="0.5"/>
    </g>

    <!-- Snapshot 2: Spellbook HUD (Rotated Right) -->
    <g transform="translate(138, 358) rotate(5)" filter="url(#shadow)">
      <!-- Polaroid Card Frame -->
      <rect x="0" y="0" width="105" height="110" rx="4" fill="#FFF" stroke="#1C1610" stroke-width="2"/>
      <!-- Photo Viewport -->
      <rect x="6" y="6" width="93" height="72" fill="#3D0C5A"/>
      <!-- Mini Vector Scene (Magic Spell UI) -->
      <circle cx="52" cy="40" r="22" fill="none" stroke="#A2D2FF" stroke-width="1.5" stroke-dasharray="4,2"/>
      <polygon points="52,22 58,35 72,35 60,44 65,58 52,48 39,58 44,44 32,35 46,35" fill="#FFD166"/>
      <!-- Polaroid Label -->
      <text x="52" y="94" text-anchor="middle" font-family="'Courier New', monospace" font-weight="bold" font-size="9" fill="#1C1610">Spellbook HUD</text>
      <!-- Scotch Tape Top-Right Corner -->
      <rect x="75" y="-6" width="32" height="12" transform="rotate(25)" fill="url(#tape)" stroke="#E8E2B5" stroke-width="0.5"/>
    </g>

    <!-- Snapshot 3: Inventory Engine (Center Bottom Overlap) -->
    <g transform="translate(70, 445) rotate(-1)" filter="url(#shadow)">
      <!-- Card Frame -->
      <rect x="0" y="0" width="125" height="80" rx="4" fill="#FFF" stroke="#1C1610" stroke-width="2"/>
      <!-- Photo Viewport -->
      <rect x="5" y="5" width="115" height="52" fill="#1D1612"/>
      <!-- Grid Items Visual -->
      <rect x="12" y="10" width="18" height="18" rx="2" fill="#3A281C" stroke="#F7B131" stroke-width="1"/>
      <circle cx="21" cy="19" r="5" fill="#E63946"/>
      
      <rect x="36" y="10" width="18" height="18" rx="2" fill="#3A281C" stroke="#5C4A3E" stroke-width="1"/>
      <path d="M 42,22 L 48,14 L 51,17 Z" fill="#FFD166"/>

      <rect x="60" y="10" width="18" height="18" rx="2" fill="#3A281C" stroke="#5C4A3E" stroke-width="1"/>
      <rect x="84" y="10" width="18" height="18" rx="2" fill="#3A281C" stroke="#2A9D8F" stroke-width="1"/>
      
      <rect x="12" y="32" width="90" height="18" rx="2" fill="#281A10"/>
      <rect x="15" y="36" width="50" height="10" rx="2" fill="#4361EE"/>

      <!-- Label -->
      <text x="62" y="70" text-anchor="middle" font-family="'Courier New', monospace" font-weight="bold" font-size="9" fill="#1C1610">Tactile Inventory v2</text>
      <!-- Push Pin -->
      <circle cx="62" cy="3" r="4" fill="#D62828" stroke="#1C1610" stroke-width="1"/>
      <circle cx="60" cy="2" r="1.5" fill="#FFF"/>
    </g>

  </g>

  <!-- ================= VINTAGE DESK ACCENTS & DECORATIONS ================= -->
  <!-- Brass Compass on Workbench (Bottom Left) -->
  <g transform="translate(60, 520)" filter="url(#shadow)">
    <circle cx="0" cy="0" r="26" fill="url(#brassCap)" stroke="#1C1610" stroke-width="2"/>
    <circle cx="0" cy="0" r="21" fill="#FFF8E7" stroke="#593E19" stroke-width="1.5"/>
    <!-- Compass Markings -->
    <text x="0" y="-12" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="7" fill="#8A4B00">N</text>
    <text x="0" y="17" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="7" fill="#1C1610">S</text>
    <text x="14" y="2" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="7" fill="#1C1610">E</text>
    <text x="-14" y="2" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="7" fill="#1C1610">W</text>
    <!-- Compass Needle -->
    <polygon points="0,0 -4,-3 0,-17 4,-3" fill="#D62828"/>
    <polygon points="0,0 -4,3 0,17 4,3" fill="#1C1610"/>
    <circle cx="0" cy="0" r="2" fill="#FFD166"/>
  </g>

  <!-- Interactive Action Prompt Ribbon (Bottom Center) -->
  <g transform="translate(250, 550)" filter="url(#shadow)">
    <rect x="0" y="0" width="230" height="28" rx="14" fill="#1C1610" stroke="#FFE875" stroke-width="1.5"/>
    <text x="115" y="18" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="11" fill="#FFF8E7" letter-spacing="0.5">
      SELECT NODE TO INSPECT SPELL
    </text>
  </g>

</svg>