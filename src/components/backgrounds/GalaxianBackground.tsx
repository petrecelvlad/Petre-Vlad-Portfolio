interface GalaxianBackgroundProps {
  className?: string;
}

// Body is drawn once and reused via <use>; the mouth is a separate
// overlay so it can crossfade independently of the (static) body.
// scale(0.35) brings the 110x80 source sprite down to ~38x28, matching
// the grid spacing used across the three depth layers below.
function renderInvader(key: string, x: number, y: number) {
  return (
    <g key={key} transform={`translate(${x}, ${y}) scale(0.35)`}>
      <use href="#galaxian-invader-body" />
      <g className="galaxian-mouth-flap">
        <use href="#galaxian-invader-mouth" />
      </g>
    </g>
  );
}

/**
 * NES/SNES-style pixel-art Galaxian squadron background, generated from
 * docs/Data/samples/galaxian.md. Pure SVG + CSS transform/opacity
 * keyframes (no display toggling, no SMIL motion paths, no RAF/WebGL).
 */
export function GalaxianBackground({ className = '' }: GalaxianBackgroundProps) {
  return (
    <div className={`w-full h-full relative ${className}`}>
      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <style>{`
            .pixelated {
              image-rendering: optimizeSpeed;
              image-rendering: -moz-crisp-edges;
              image-rendering: -o-crisp-edges;
              image-rendering: -webkit-optimize-contrast;
              image-rendering: pixelated;
              -ms-interpolation-mode: nearest-neighbor;
            }

            .galaxian-bg-stop-1 { stop-color: #d8b4fe; }
            .galaxian-bg-stop-2 { stop-color: #2e1065; }

            .galaxian-alien-main { fill: #f3e8ff; fill-opacity: 0.35; }
            .galaxian-alien-sub  { fill: #d8b4fe; fill-opacity: 0.20; }
            .galaxian-alien-dark { fill: #7e22ce; fill-opacity: 0.15; }

            .galaxian-star-dim   { fill: #f3e8ff; fill-opacity: 0.15; }
            .galaxian-star-bright{ fill: #ffffff; fill-opacity: 0.35; }

            @keyframes galaxianSwaySlow {
              0%   { transform: translate(0px, 0px); }
              25%  { transform: translate(12px, 3px); }
              50%  { transform: translate(0px, 6px); }
              75%  { transform: translate(-12px, 3px); }
              100% { transform: translate(0px, 0px); }
            }

            @keyframes galaxianSwayFast {
              0%   { transform: translate(0px, 0px); }
              25%  { transform: translate(18px, 5px); }
              50%  { transform: translate(0px, 10px); }
              75%  { transform: translate(-18px, 5px); }
              100% { transform: translate(0px, 0px); }
            }

            @keyframes galaxianMouthFlap {
              0%, 60%   { opacity: 1; }
              61%, 100% { opacity: 0; }
            }

            @keyframes galaxianTwinkle {
              0%, 100% { opacity: 0.2; }
              50%      { opacity: 0.7; }
            }

            .galaxian-layer-back {
              animation: galaxianSwaySlow 7s ease-in-out infinite;
            }

            .galaxian-layer-front {
              animation: galaxianSwayFast 4.5s ease-in-out infinite;
            }

            .galaxian-mouth-flap {
              animation: galaxianMouthFlap 0.9s steps(1) infinite;
            }

            .galaxian-twinkle-star {
              animation: galaxianTwinkle 3s ease-in-out infinite;
            }
          `}</style>

          <linearGradient id="galaxian-bg-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" className="galaxian-bg-stop-1" />
            <stop offset="100%" className="galaxian-bg-stop-2" />
          </linearGradient>

          <pattern id="galaxian-scanlines" width="800" height="4" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="800" y2="0" stroke="#000000" strokeWidth="2" />
          </pattern>

          {/* Classic detailed invader silhouette, ported from galaxian_enemy.md.
              Body leaves a 10x10 gap at (50,70) between the two leg blocks —
              the mouth overlay below fills exactly that gap so it can be
              toggled independently for the chomp animation. */}
          <g id="galaxian-invader-body" className="pixelated">
            <rect x="20" y="0" width="10" height="10" className="galaxian-alien-main" />
            <rect x="80" y="0" width="10" height="10" className="galaxian-alien-main" />
            <rect x="30" y="10" width="10" height="10" className="galaxian-alien-main" />
            <rect x="70" y="10" width="10" height="10" className="galaxian-alien-main" />
            <rect x="20" y="20" width="70" height="10" className="galaxian-alien-main" />
            <rect x="10" y="30" width="20" height="10" className="galaxian-alien-main" />
            <rect x="40" y="30" width="30" height="10" className="galaxian-alien-dark" />
            <rect x="80" y="30" width="20" height="10" className="galaxian-alien-main" />
            <rect x="0" y="40" width="110" height="10" className="galaxian-alien-main" />
            <rect x="0" y="50" width="10" height="10" className="galaxian-alien-sub" />
            <rect x="20" y="50" width="70" height="10" className="galaxian-alien-main" />
            <rect x="100" y="50" width="10" height="10" className="galaxian-alien-sub" />
            <rect x="0" y="60" width="10" height="10" className="galaxian-alien-sub" />
            <rect x="20" y="60" width="10" height="10" className="galaxian-alien-sub" />
            <rect x="80" y="60" width="10" height="10" className="galaxian-alien-sub" />
            <rect x="100" y="60" width="10" height="10" className="galaxian-alien-sub" />
            <rect x="30" y="70" width="20" height="10" className="galaxian-alien-main" />
            <rect x="60" y="70" width="20" height="10" className="galaxian-alien-main" />
          </g>

          {/* Mouth: fills the gap between the two leg blocks when "closed". */}
          <g id="galaxian-invader-mouth">
            <rect x="50" y="70" width="10" height="10" className="galaxian-alien-dark" />
          </g>
        </defs>

        <rect width="800" height="600" fill="url(#galaxian-bg-grad)" />

        {/* Retro Pixel Stars / Space Dust Layer */}
        <g className="pixelated">
          <rect x="70" y="80" width="4" height="4" className="galaxian-star-bright" />
          <rect x="230" y="40" width="2" height="2" className="galaxian-star-dim" />
          <rect x="450" y="90" width="4" height="4" className="galaxian-star-dim" />
          <rect x="620" y="50" width="2" height="2" className="galaxian-star-bright" />
          <rect x="750" y="120" width="4" height="4" className="galaxian-star-bright" />
          <rect x="150" y="180" width="2" height="2" className="galaxian-star-dim" />
          <rect x="380" y="150" width="4" height="4" className="galaxian-star-dim" />
          <rect x="540" y="190" width="2" height="2" className="galaxian-star-bright" />
          <rect x="20" y="280" width="4" height="4" className="galaxian-star-dim" />
          <rect x="290" y="250" width="2" height="2" className="galaxian-star-bright" />
          <rect x="710" y="270" width="4" height="4" className="galaxian-star-dim" />
          <rect x="100" y="380" width="2" height="2" className="galaxian-star-bright" />
          <rect x="420" y="350" width="4" height="4" className="galaxian-star-dim" />
          <rect x="600" y="400" width="2" height="2" className="galaxian-star-dim" />
          <rect x="780" y="450" width="4" height="4" className="galaxian-star-bright" />
          <rect x="180" y="480" width="2" height="2" className="galaxian-star-bright" />
          <rect x="340" y="520" width="4" height="4" className="galaxian-star-dim" />
          <rect x="500" y="500" width="2" height="2" className="galaxian-star-dim" />
          <rect x="680" y="550" width="4" height="4" className="galaxian-star-bright" />

          <g className="galaxian-twinkle-star">
            <rect x="140" y="90" width="4" height="4" fill="#ffffff" />
            <rect x="500" y="70" width="4" height="4" fill="#ffffff" />
            <rect x="270" y="320" width="4" height="4" fill="#ffffff" />
            <rect x="650" y="200" width="4" height="4" fill="#ffffff" />
            <rect x="350" y="430" width="4" height="4" fill="#ffffff" />
          </g>
        </g>

        {/* DEPTH LAYER 1: BACK */}
        <g className="galaxian-layer-back" opacity="0.65">
          {[140, 240, 340, 440, 540].map((x) => renderInvader(`back1-${x}`, x, 90))}
          {[130, 230, 330, 430, 530].map((x) => renderInvader(`back2-${x}`, x, 150))}
        </g>

        {/* DEPTH LAYER 2: MID */}
        <g className="galaxian-layer-back" opacity="0.85" style={{ animationDelay: '-2s' }}>
          {[100, 200, 300, 400, 500, 600].map((x) => renderInvader(`mid1-${x}`, x, 220))}
          {[100, 200, 300, 400, 500, 600].map((x) => renderInvader(`mid2-${x}`, x, 290))}
        </g>

        {/* DEPTH LAYER 3: FRONT */}
        <g className="galaxian-layer-front" opacity="1.0">
          {[80, 180, 280, 380, 480, 580, 680].map((x) => renderInvader(`front1-${x}`, x, 370))}
          {[80, 180, 280, 380, 480, 580, 680].map((x) => renderInvader(`front2-${x}`, x, 450))}
        </g>

        {/* Retro Scanline / CRT Texture Overlay */}
        <g className="pixelated" opacity="0.15">
          <rect x="0" y="0" width="800" height="600" fill="url(#galaxian-scanlines)" />
        </g>
      </svg>
    </div>
  );
}
