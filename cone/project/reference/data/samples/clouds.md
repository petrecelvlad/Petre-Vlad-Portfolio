<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%" shape-rendering="crispEdges">
  <defs>
    <!-- Pixel Cloud Templates -->
    <!-- Small Cloud 1 (48x24) -->
    <g id="cs1">
      <rect x="12" y="0" width="24" height="6" />
      <rect x="6" y="6" width="36" height="6" />
      <rect x="0" y="12" width="48" height="12" />
    </g>

    <!-- Small Cloud 2 (56x24) -->
    <g id="cs2">
      <rect x="12" y="0" width="20" height="6" />
      <rect x="6" y="6" width="42" height="6" />
      <rect x="0" y="12" width="56" height="12" />
    </g>

    <!-- Small Cloud 3 (32x16) -->
    <g id="cs3">
      <rect x="8" y="0" width="16" height="4" />
      <rect x="4" y="4" width="24" height="4" />
      <rect x="0" y="8" width="32" height="8" />
    </g>

    <!-- Medium Cloud 1 (110x40) -->
    <g id="cm1">
      <rect x="20" y="0" width="30" height="10" />
      <rect x="10" y="10" width="80" height="10" />
      <rect x="0" y="20" width="110" height="20" />
    </g>

    <!-- Medium Cloud 2 (130x45) -->
    <g id="cm2">
      <rect x="20" y="0" width="30" height="10" />
      <rect x="70" y="0" width="30" height="10" />
      <rect x="10" y="10" width="105" height="12" />
      <rect x="0" y="22" width="130" height="23" />
    </g>

    <!-- Large Cloud 1 (192x64) -->
    <g id="cl1">
      <rect x="48" y="0" width="64" height="16" />
      <rect x="24" y="16" width="136" height="16" />
      <rect x="0" y="32" width="192" height="32" />
    </g>

    <!-- Large Cloud 2 (240x80) -->
    <g id="cl2">
      <rect x="48" y="0" width="64" height="16" />
      <rect x="144" y="16" width="48" height="16" />
      <rect x="32" y="16" width="96" height="16" />
      <rect x="16" y="32" width="208" height="16" />
      <rect x="0" y="48" width="240" height="32" />
    </g>

    <!-- Pixel Star Sparkle -->
    <g id="star">
      <rect x="3" y="0" width="3" height="9" />
      <rect x="0" y="3" width="9" height="3" />
    </g>

    <!-- Layer Group Patterns (600px tall repeating units) -->
    <g id="far-clouds">
      <use href="#cs1" x="40" y="50" />
      <use href="#cs2" x="270" y="110" />
      <use href="#cs3" x="530" y="40" />
      <use href="#cs1" x="710" y="150" />
      <use href="#cs2" x="130" y="260" />
      <use href="#cs3" x="390" y="320" />
      <use href="#cs1" x="610" y="280" />
      <use href="#cs2" x="70" y="440" />
      <use href="#cs3" x="490" y="480" />
      <use href="#cs1" x="730" y="520" />
      <use href="#cs2" x="310" y="570" />
    </g>

    <g id="mid-clouds">
      <use href="#cm1" x="170" y="30" />
      <use href="#cm2" x="530" y="90" />
      <use href="#cm1" x="30" y="210" />
      <use href="#cm2" x="410" y="270" />
      <use href="#cm1" x="650" y="390" />
      <use href="#cm2" x="110" y="470" />
      <use href="#cm1" x="480" y="530" />
    </g>

    <g id="near-clouds">
      <use href="#cl1" x="310" y="30" />
      <use href="#cl2" x="30" y="180" />
      <use href="#cl1" x="490" y="330" />
      <use href="#cl2" x="210" y="480" />
    </g>
  </defs>

  <style>
    .bg {
      fill: #3ca0ee;
    }

    /* Vertical continuous scrolling loop */
    @keyframes scrollUp {
      0% {
        transform: translateY(0px);
      }
      100% {
        transform: translateY(-600px);
      }
    }

    /* Gentle pulsing for pixel sparkles */
    @keyframes pulse {
      0% { opacity: 0.15; }
      100% { opacity: 0.55; }
    }

    .layer-far {
      animation: scrollUp 38s linear infinite;
      fill: #ffffff;
      opacity: 0.11;
    }

    .layer-mid {
      animation: scrollUp 23s linear infinite;
      fill: #ffffff;
      opacity: 0.21;
    }

    .layer-near {
      animation: scrollUp 14s linear infinite;
      fill: #ffffff;
      opacity: 0.33;
    }

    .sparkle {
      fill: #ffffff;
    }

    .sp-1 { animation: pulse 3s ease-in-out infinite alternate; }
    .sp-2 { animation: pulse 4s ease-in-out infinite alternate 1.5s; }
    .sp-3 { animation: pulse 2.5s ease-in-out infinite alternate 0.8s; }
  </style>

  <!-- Sky Blue Canvas -->
  <rect class="bg" width="800" height="600" />

  <!-- Background Pixel Sparkles -->
  <g class="sparkle">
    <use href="#star" x="100" y="80" class="sp-1" />
    <use href="#star" x="680" y="120" class="sp-2" />
    <use href="#star" x="250" y="240" class="sp-3" />
    <use href="#star" x="550" y="350" class="sp-1" />
    <use href="#star" x="180" y="480" class="sp-2" />
    <use href="#star" x="720" y="520" class="sp-3" />
  </g>

  <!-- FAR LAYER (Slowest, Smallest, Lowest Opacity) -->
  <g class="layer-far">
    <use href="#far-clouds" x="0" y="0" />
    <use href="#far-clouds" x="0" y="600" />
  </g>

  <!-- MID LAYER (Medium speed & size) -->
  <g class="layer-mid">
    <use href="#mid-clouds" x="0" y="0" />
    <use href="#mid-clouds" x="0" y="600" />
  </g>

  <!-- NEAR LAYER (Fastest, Largest, Highest Opacity) -->
  <g class="layer-near">
    <use href="#near-clouds" x="0" y="0" />
    <use href="#near-clouds" x="0" y="600" />
  </g>
</svg>