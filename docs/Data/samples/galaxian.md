<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <!-- Sharp pixel rendering for all pixel art -->
    <style>
      .pixelated {
        image-rendering: optimizeSpeed;
        image-rendering: -moz-crisp-edges;
        image-rendering: -o-crisp-edges;
        image-rendering: -webkit-optimize-contrast;
        image-rendering: pixelated;
        -ms-interpolation-mode: nearest-neighbor;
      }

      /* Background gradient colors */
      .bg-stop-1 { stop-color: #d8b4fe; }
      .bg-stop-2 { stop-color: #2e1065; }

      /* Sprite Colors (Dimmer, near-white / bright lilac highlights against background) */
      .alien-main { fill: #f3e8ff; fill-opacity: 0.35; }
      .alien-sub  { fill: #d8b4fe; fill-opacity: 0.20; }
      .alien-dark { fill: #7e22ce; fill-opacity: 0.15; }

      /* Star colors */
      .star-dim   { fill: #f3e8ff; fill-opacity: 0.15; }
      .star-bright{ fill: #ffffff; fill-opacity: 0.35; }

      /* Animations */
      @keyframes sway-slow {
        0%   { transform: translate(0px, 0px); }
        25%  { transform: translate(12px, 3px); }
        50%  { transform: translate(0px, 6px); }
        75%  { transform: translate(-12px, 3px); }
        100% { transform: translate(0px, 0px); }
      }

      @keyframes sway-fast {
        0%   { transform: translate(0px, 0px); }
        25%  { transform: translate(18px, 5px); }
        50%  { transform: translate(0px, 10px); }
        75%  { transform: translate(-18px, 5px); }
        100% { transform: translate(0px, 0px); }
      }

      @keyframes flap-1 {
        0%, 48%   { opacity: 1; }
        50%, 98%  { opacity: 0; }
        100%      { opacity: 1; }
      }

      @keyframes flap-2 {
        0%, 48%   { opacity: 0; }
        50%, 98%  { opacity: 1; }
        100%      { opacity: 0; }
      }

      @keyframes twinkle {
        0%, 100% { opacity: 0.2; }
        50%      { opacity: 0.7; }
      }

      .layer-back {
        animation: sway-slow 7s ease-in-out infinite;
      }

      .layer-front {
        animation: sway-fast 4.5s ease-in-out infinite;
      }

      .anim-frame-1 {
        animation: flap-1 1.2s steps(1) infinite;
      }

      .anim-frame-2 {
        animation: flap-2 1.2s steps(1) infinite;
      }

      .twinkle-star {
        animation: twinkle 3s ease-in-out infinite;
      }
    </style>

    <!-- Background Gradient -->
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" class="bg-stop-1" />
      <stop offset="100%" class="bg-stop-2" />
    </linearGradient>

    <!-- ALIEN TYPE 1: Crab/Squid (Small, 8x6 pixels @ 4px/px = 32x24) -->
    <!-- Frame 1 -->
    <g id="alien-type1-f1" class="pixelated">
      <rect x="12" y="0" width="8" height="4" class="alien-main"/>
      <rect x="4" y="4" width="24" height="4" class="alien-main"/>
      <rect x="0" y="8" width="32" height="4" class="alien-main"/>
      <rect x="0" y="12" width="12" height="4" class="alien-main"/>
      <rect x="20" y="12" width="12" height="4" class="alien-main"/>
      <!-- Eyes & Details -->
      <rect x="8" y="8" width="4" height="4" class="alien-dark"/>
      <rect x="20" y="8" width="4" height="4" class="alien-dark"/>
      <!-- Legs Frame 1 -->
      <rect x="4" y="16" width="4" height="8" class="alien-sub"/>
      <rect x="24" y="16" width="4" height="8" class="alien-sub"/>
    </g>

    <!-- Frame 2 -->
    <g id="alien-type1-f2" class="pixelated">
      <rect x="12" y="0" width="8" height="4" class="alien-main"/>
      <rect x="4" y="4" width="24" height="4" class="alien-main"/>
      <rect x="0" y="8" width="32" height="4" class="alien-main"/>
      <rect x="0" y="12" width="12" height="4" class="alien-main"/>
      <rect x="20" y="12" width="12" height="4" class="alien-main"/>
      <rect x="8" y="8" width="4" height="4" class="alien-dark"/>
      <rect x="20" y="8" width="4" height="4" class="alien-dark"/>
      <!-- Legs Frame 2 (Inward) -->
      <rect x="12" y="16" width="4" height="4" class="alien-sub"/>
      <rect x="16" y="16" width="4" height="4" class="alien-sub"/>
    </g>


    <!-- ALIEN TYPE 2: UFO/Moth (10x5 pixels @ 4px/px = 40x20) -->
    <!-- Frame 1 -->
    <g id="alien-type2-f1" class="pixelated">
      <rect x="16" y="0" width="8" height="4" class="alien-main"/>
      <rect x="8" y="4" width="24" height="4" class="alien-main"/>
      <rect x="0" y="8" width="40" height="4" class="alien-main"/>
      <rect x="4" y="12" width="32" height="4" class="alien-sub"/>
      <!-- Wings Up -->
      <rect x="0" y="4" width="4" height="4" class="alien-sub"/>
      <rect x="36" y="4" width="4" height="4" class="alien-sub"/>
      <rect x="16" y="8" width="8" height="4" class="alien-dark"/>
    </g>

    <!-- Frame 2 -->
    <g id="alien-type2-f2" class="pixelated">
      <rect x="16" y="0" width="8" height="4" class="alien-main"/>
      <rect x="8" y="4" width="24" height="4" class="alien-main"/>
      <rect x="0" y="8" width="40" height="4" class="alien-main"/>
      <rect x="4" y="12" width="32" height="4" class="alien-sub"/>
      <!-- Wings Down -->
      <rect x="0" y="12" width="4" height="4" class="alien-sub"/>
      <rect x="36" y="12" width="4" height="4" class="alien-sub"/>
      <rect x="16" y="8" width="8" height="4" class="alien-dark"/>
    </g>


    <!-- ALIEN TYPE 3: Boss/Bug (9x6 pixels @ 4px/px = 36x24) -->
    <!-- Frame 1 -->
    <g id="alien-type3-f1" class="pixelated">
      <rect x="12" y="0" width="12" height="4" class="alien-main"/>
      <rect x="8" y="4" width="20" height="4" class="alien-main"/>
      <rect x="4" y="8" width="28" height="4" class="alien-main"/>
      <rect x="0" y="12" width="36" height="4" class="alien-main"/>
      <rect x="8" y="8" width="4" height="4" class="alien-dark"/>
      <rect x="24" y="8" width="4" height="4" class="alien-dark"/>
      <!-- Antennas Out -->
      <rect x="4" y="16" width="4" height="8" class="alien-sub"/>
      <rect x="28" y="16" width="4" height="8" class="alien-sub"/>
      <rect x="0" y="16" width="4" height="4" class="alien-sub"/>
      <rect x="32" y="16" width="4" height="4" class="alien-sub"/>
    </g>

    <!-- Frame 2 -->
    <g id="alien-type3-f2" class="pixelated">
      <rect x="12" y="0" width="12" height="4" class="alien-main"/>
      <rect x="8" y="4" width="20" height="4" class="alien-main"/>
      <rect x="4" y="8" width="28" height="4" class="alien-main"/>
      <rect x="0" y="12" width="36" height="4" class="alien-main"/>
      <rect x="8" y="8" width="4" height="4" class="alien-dark"/>
      <rect x="24" y="8" width="4" height="4" class="alien-dark"/>
      <!-- Antennas In -->
      <rect x="8" y="16" width="4" height="8" class="alien-sub"/>
      <rect x="24" y="16" width="4" height="8" class="alien-sub"/>
      <rect x="4" y="20" width="4" height="4" class="alien-sub"/>
      <rect x="28" y="20" width="4" height="4" class="alien-sub"/>
    </g>

  </defs>

  <!-- Full-bleed background gradient -->
  <rect width="800" height="600" fill="url(#bg-grad)" />

  <!-- Retro Pixel Stars / Space Dust Layer (Static background texture) -->
  <g class="pixelated">
    <!-- Tiny 4x4 and 2x2 star pixels -->
    <rect x="70" y="80" width="4" height="4" class="star-bright" />
    <rect x="230" y="40" width="2" height="2" class="star-dim" />
    <rect x="450" y="90" width="4" height="4" class="star-dim" />
    <rect x="620" y="50" width="2" height="2" class="star-bright" />
    <rect x="750" y="120" width="4" height="4" class="star-bright" />
    <rect x="150" y="180" width="2" height="2" class="star-dim" />
    <rect x="380" y="150" width="4" height="4" class="star-dim" />
    <rect x="540" y="190" width="2" height="2" class="star-bright" />
    <rect x="20" y="280" width="4" height="4" class="star-dim" />
    <rect x="290" y="250" width="2" height="2" class="star-bright" />
    <rect x="710" y="270" width="4" height="4" class="star-dim" />
    <rect x="100" y="380" width="2" height="2" class="star-bright" />
    <rect x="420" y="350" width="4" height="4" class="star-dim" />
    <rect x="600" y="400" width="2" height="2" class="star-dim" />
    <rect x="780" y="450" width="4" height="4" class="star-bright" />
    <rect x="180" y="480" width="2" height="2" class="star-bright" />
    <rect x="340" y="520" width="4" height="4" class="star-dim" />
    <rect x="500" y="500" width="2" height="2" class="star-dim" />
    <rect x="680" y="550" width="4" height="4" class="star-bright" />

    <!-- Twinkling accent stars -->
    <g class="twinkle-star">
      <rect x="140" y="90" width="4" height="4" fill="#ffffff" />
      <rect x="500" y="70" width="4" height="4" fill="#ffffff" />
      <rect x="270" y="320" width="4" height="4" fill="#ffffff" />
      <rect x="650" y="200" width="4" height="4" fill="#ffffff" />
      <rect x="350" y="430" width="4" height="4" fill="#ffffff" />
    </g>
  </g>

  <!-- ========================================== -->
  <!-- DEPTH LAYER 1: BACK (Slow sway, smaller/dimmer) -->
  <!-- ========================================== -->
  <g class="layer-back" opacity="0.65">
    <!-- Row 1: Type 1 (Y: 90) -->
    <g transform="translate(140, 90)">
      <g class="anim-frame-1"><use href="#alien-alien-type1-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type1-f2" /></g>
    </g>
    <g transform="translate(240, 90)">
      <g class="anim-frame-1"><use href="#alien-type1-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type1-f2" /></g>
    </g>
    <g transform="translate(340, 90)">
      <g class="anim-frame-1"><use href="#alien-type1-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type1-f2" /></g>
    </g>
    <g transform="translate(440, 90)">
      <g class="anim-frame-1"><use href="#alien-type1-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type1-f2" /></g>
    </g>
    <g transform="translate(540, 90)">
      <g class="anim-frame-1"><use href="#alien-type1-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type1-f2" /></g>
    </g>

    <!-- Row 2: Type 2 (Y: 150) -->
    <g transform="translate(130, 150)">
      <g class="anim-frame-1"><use href="#alien-type2-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type2-f2" /></g>
    </g>
    <g transform="translate(230, 150)">
      <g class="anim-frame-1"><use href="#alien-type2-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type2-f2" /></g>
    </g>
    <g transform="translate(330, 150)">
      <g class="anim-frame-1"><use href="#alien-type2-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type2-f2" /></g>
    </g>
    <g transform="translate(430, 150)">
      <g class="anim-frame-1"><use href="#alien-type2-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type2-f2" /></g>
    </g>
    <g transform="translate(530, 150)">
      <g class="anim-frame-1"><use href="#alien-type2-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type2-f2" /></g>
    </g>
  </g>


  <!-- ========================================== -->
  <!-- DEPTH LAYER 2: MID (Standard sway, medium density) -->
  <!-- ========================================== -->
  <g class="layer-back" opacity="0.85" style="animation-delay: -2s;">
    <!-- Row 3: Type 2 (Y: 220) -->
    <g transform="translate(100, 220)">
      <g class="anim-frame-1"><use href="#alien-type2-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type2-f2" /></g>
    </g>
    <g transform="translate(200, 220)">
      <g class="anim-frame-1"><use href="#alien-type2-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type2-f2" /></g>
    </g>
    <g transform="translate(300, 220)">
      <g class="anim-frame-1"><use href="#alien-type2-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type2-f2" /></g>
    </g>
    <g transform="translate(400, 220)">
      <g class="anim-frame-1"><use href="#alien-type2-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type2-f2" /></g>
    </g>
    <g transform="translate(500, 220)">
      <g class="anim-frame-1"><use href="#alien-type2-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type2-f2" /></g>
    </g>
    <g transform="translate(600, 220)">
      <g class="anim-frame-1"><use href="#alien-type2-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type2-f2" /></g>
    </g>

    <!-- Row 4: Type 3 (Y: 290) -->
    <g transform="translate(100, 290)">
      <g class="anim-frame-1"><use href="#alien-type3-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type3-f2" /></g>
    </g>
    <g transform="translate(200, 290)">
      <g class="anim-frame-1"><use href="#alien-type3-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type3-f2" /></g>
    </g>
    <g transform="translate(300, 290)">
      <g class="anim-frame-1"><use href="#alien-type3-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type3-f2" /></g>
    </g>
    <g transform="translate(400, 290)">
      <g class="anim-frame-1"><use href="#alien-type3-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type3-f2" /></g>
    </g>
    <g transform="translate(500, 290)">
      <g class="anim-frame-1"><use href="#alien-type3-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type3-f2" /></g>
    </g>
    <g transform="translate(600, 290)">
      <g class="anim-frame-1"><use href="#alien-type3-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type3-f2" /></g>
    </g>
  </g>


  <!-- ========================================== -->
  <!-- DEPTH LAYER 3: FRONT (Faster sway, prominent) -->
  <!-- ========================================== -->
  <g class="layer-front" opacity="1.0">
    <!-- Row 5: Type 3 (Y: 370) -->
    <g transform="translate(80, 370)">
      <g class="anim-frame-1"><use href="#alien-type3-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type3-f2" /></g>
    </g>
    <g transform="translate(180, 370)">
      <g class="anim-frame-1"><use href="#alien-type3-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type3-f2" /></g>
    </g>
    <g transform="translate(280, 370)">
      <g class="anim-frame-1"><use href="#alien-type3-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type3-f2" /></g>
    </g>
    <g transform="translate(380, 370)">
      <g class="anim-frame-1"><use href="#alien-type3-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type3-f2" /></g>
    </g>
    <g transform="translate(480, 370)">
      <g class="anim-frame-1"><use href="#alien-type3-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type3-f2" /></g>
    </g>
    <g transform="translate(580, 370)">
      <g class="anim-frame-1"><use href="#alien-type3-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type3-f2" /></g>
    </g>
    <g transform="translate(680, 370)">
      <g class="anim-frame-1"><use href="#alien-type3-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type3-f2" /></g>
    </g>

    <!-- Row 6: Type 1 (Y: 450) -->
    <g transform="translate(80, 450)">
      <g class="anim-frame-1"><use href="#alien-type1-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type1-f2" /></g>
    </g>
    <g transform="translate(180, 450)">
      <g class="anim-frame-1"><use href="#alien-type1-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type1-f2" /></g>
    </g>
    <g transform="translate(280, 450)">
      <g class="anim-frame-1"><use href="#alien-type1-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type1-f2" /></g>
    </g>
    <g transform="translate(380, 450)">
      <g class="anim-frame-1"><use href="#alien-type1-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type1-f2" /></g>
    </g>
    <g transform="translate(480, 450)">
      <g class="anim-frame-1"><use href="#alien-type1-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type1-f2" /></g>
    </g>
    <g transform="translate(580, 450)">
      <g class="anim-frame-1"><use href="#alien-type1-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type1-f2" /></g>
    </g>
    <g transform="translate(680, 450)">
      <g class="anim-frame-1"><use href="#alien-type1-f1" /></g>
      <g class="anim-frame-2"><use href="#alien-type1-f2" /></g>
    </g>
  </g>

  <!-- Retro Scanline / CRT Texture Overlay (Subtle) -->
  <g class="pixelated" opacity="0.15">
    <rect x="0" y="0" width="800" height="600" fill="url(#scanlines)" />
  </g>
  <defs>
    <pattern id="scanlines" width="800" height="4" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="800" y2="0" stroke="#000000" stroke-width="2" />
    </pattern>
  </defs>

</svg>