import React, { useEffect, useRef } from 'react';
import { useSkin } from '@/src/context/SkinContext';

const VERTEX_SHADER_SOURCE = `
attribute vec2 position;
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SOURCE = `
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform int u_variant; // 0: arcade, 1: toyfactory, 2: lightning, 3: overworld
uniform int u_pass;    // 0: full pass, 2: overlay pass (col 2+3 & dividers)

// Pseudo-random hash
float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 34.45);
    return fract(p.x * p.y);
}

// 4-Point Star Function
float drawStar(vec2 uv, vec2 center, float size) {
    vec2 d = abs(uv - center);
    float star = max(d.x + d.y * 0.4, d.y + d.x * 0.4);
    return smoothstep(size, size * 0.2, star);
}

// -------------------------------------------------------------
// 3D TIERED CYLINDRICAL PEDESTAL FUNCTION
// Renders a pseudo-3D volumetric pedestal built from 3 stacked
// cylindrical tiers with side-wall shading, bevels, AO shadows,
// and a rotating clockwork gear top cap.
// -------------------------------------------------------------
vec4 draw3DPedestal(vec2 uv, vec2 center, vec3 baseCol, vec3 midCol, vec3 topCol) {
    // Center alignment & perspective compression ratio (Y compressed for 3D perspective)
    vec2 p = uv - center;
    float rx = 0.11; // Tier 1 (Base) half-width
    
    // Directional light vector for cylindrical normal shading
    vec3 lightDir = normalize(vec3(-0.5, 0.8, 0.6));
    
    vec3 resultCol = vec3(0.0);
    float alpha = 0.0;

    // ── TIER 1: BASE CYLINDER (yCap = 0.08, yBot = 0.03) ──
    float t1CapY = 0.08;
    float t1BotY = 0.03;
    float t1R = 0.11;
    
    // Tier 1 Top Cap Ellipse
    vec2 dCap1 = (uv - (center + vec2(0.0, t1CapY))) * vec2(1.0, 2.6);
    float rCap1 = length(dCap1);
    
    // Tier 1 Vertical Side Wall
    float inT1Wall = step(uv.y, center.y + t1CapY) * step(center.y + t1BotY, uv.y) * step(abs(p.x), t1R);
    if (inT1Wall > 0.5) {
        float nx = p.x / t1R;
        float nz = sqrt(max(0.0, 1.0 - nx * nx));
        vec3 N = normalize(vec3(nx, 0.2, nz));
        float diff = max(0.2, dot(N, lightDir));
        vec3 wallCol = baseCol * diff * 0.8;
        // Bottom bevel shadow
        wallCol *= smoothstep(center.y + t1BotY, center.y + t1BotY + 0.015, uv.y);
        resultCol = wallCol;
        alpha = 1.0;
    }
    
    // Render Tier 1 Top Cap
    if (rCap1 < t1R) {
        vec3 capCol = baseCol * 1.1;
        // Rim Bevel Highlight
        float rim = smoothstep(t1R, t1R - 0.008, rCap1) * smoothstep(t1R - 0.016, t1R - 0.008, rCap1);
        capCol += vec3(0.9, 0.8, 0.5) * rim * 0.8;
        resultCol = capCol;
        alpha = 1.0;
    }

    // ── TIER 2: MIDDLE CYLINDER (yCap = 0.13, yBot = 0.08) ──
    float t2CapY = 0.13;
    float t2BotY = 0.08;
    float t2R = 0.085;
    
    // Inter-Tier Ambient Occlusion Cast Shadow on Tier 1 Cap
    if (rCap1 < t1R) {
        float shadowDist = length((uv - (center + vec2(0.0, t1CapY))) * vec2(1.0, 2.6));
        float aoShadow = smoothstep(0.06, 0.09, shadowDist);
        resultCol *= mix(0.35, 1.0, aoShadow);
    }
    
    // Tier 2 Vertical Side Wall
    float inT2Wall = step(uv.y, center.y + t2CapY) * step(center.y + t2BotY, uv.y) * step(abs(p.x), t2R);
    if (inT2Wall > 0.5) {
        float nx = p.x / t2R;
        float nz = sqrt(max(0.0, 1.0 - nx * nx));
        vec3 N = normalize(vec3(nx, 0.2, nz));
        float diff = max(0.25, dot(N, lightDir));
        vec3 wallCol = midCol * diff;
        // Rim rivet details
        float rivets = step(0.6, sin(nx * 20.0)) * 0.15;
        wallCol += vec3(1.0, 0.9, 0.6) * rivets;
        resultCol = wallCol;
        alpha = 1.0;
    }

    // Render Tier 2 Top Cap
    vec2 dCap2 = (uv - (center + vec2(0.0, t2CapY))) * vec2(1.0, 2.6);
    float rCap2 = length(dCap2);
    if (rCap2 < t2R) {
        vec3 capCol = midCol * 1.15;
        float rim = smoothstep(t2R, t2R - 0.008, rCap2) * smoothstep(t2R - 0.016, t2R - 0.008, rCap2);
        capCol += vec3(1.0, 0.9, 0.6) * rim;
        resultCol = capCol;
        alpha = 1.0;
    }

    // ── TIER 3: TOP ROTATING TURNTABLE CAP (yCap = 0.17, yBot = 0.13) ──
    float t3CapY = 0.17;
    float t3BotY = 0.13;
    float t3R = 0.06;
    
    // AO Shadow beneath Tier 3 onto Tier 2 Cap
    if (rCap2 < t2R) {
        float shadowDist = length((uv - (center + vec2(0.0, t2CapY))) * vec2(1.0, 2.6));
        float aoShadow = smoothstep(0.04, 0.065, shadowDist);
        resultCol *= mix(0.4, 1.0, aoShadow);
    }
    
    // Tier 3 Vertical Side Wall
    float inT3Wall = step(uv.y, center.y + t3CapY) * step(center.y + t3BotY, uv.y) * step(abs(p.x), t3R);
    if (inT3Wall > 0.5) {
        float nx = p.x / t3R;
        float nz = sqrt(max(0.0, 1.0 - nx * nx));
        vec3 N = normalize(vec3(nx, 0.25, nz));
        float diff = max(0.3, dot(N, lightDir));
        resultCol = topCol * diff * 1.2;
        alpha = 1.0;
    }

    // Render Tier 3 Top Rotating Gear Cap
    vec2 dCap3 = (uv - (center + vec2(0.0, t3CapY))) * vec2(1.0, 2.6);
    float rCap3 = length(dCap3);
    if (rCap3 < t3R) {
        float angle3 = atan(dCap3.y, dCap3.x) + u_time * 1.8;
        float gearTeeth = step(0.5, sin(angle3 * 10.0)) * 0.008;
        
        vec3 capCol = topCol;
        if (rCap3 > t3R - 0.012 - gearTeeth) {
            capCol = vec3(1.0, 0.92, 0.5); // Golden brass teeth
        } else {
            // Concentric disc grooves
            float groove = sin(rCap3 * 300.0) * 0.1;
            capCol = topCol * (0.9 + groove);
        }
        
        // Emissive center core light
        float coreLight = smoothstep(0.02, 0.0, rCap3) * 0.5;
        capCol += vec3(1.0, 0.95, 0.7) * coreLight;
        
        resultCol = capCol;
        alpha = 1.0;
    }

    return vec4(resultCol, alpha);
}

// Pseudo-random hash for knot offsets and parameters
float hash11(float p) {
    p = fract(p * 0.1031);
    p *= p + 33.33;
    p *= p + p;
    return fract(p);
}

// Organic non-repeating horizontal motion per knot vertex
float cellDrift(float c, float seed) {
    float f1 = 0.35 + hash11(c * 3.13 + seed * 7.71) * 0.75;
    float p1 = hash11(c * 7.31 + seed * 13.91) * 6.28318;
    float f2 = 0.2 + hash11(c * 11.27 + seed * 5.13) * 1.1;
    float p2 = hash11(c * 19.43 + seed * 3.37) * 6.28318;
    return sin(u_time * f1 + p1) * 0.25 + cos(u_time * f2 + p2) * 0.18;
}

// Dynamic independent angle/tilt per individual line segment
float cellTilt(float c, float seed) {
    float f1 = 0.4 + hash11(c * 5.17 + seed * 3.31) * 0.8;
    float p1 = hash11(c * 13.11 + seed * 9.77) * 6.28318;
    float f2 = 0.25 + hash11(c * 8.91 + seed * 11.23) * 0.9;
    float p2 = hash11(c * 17.37 + seed * 2.19) * 6.28318;
    // Slant angle oscillates gently around 0.0 (vertical average)
    return sin(u_time * f1 + p1) * 0.8 + cos(u_time * f2 + p2) * 0.5;
}

// Jagged line where each individual line segment has its own distinct length, angle & position
float jaggedLine(float y, float seed) {
    // Non-uniform Y warping creates distinct, varying segment lengths (some long, some short, some medium)
    float warpedY = y * 3.2 
        + sin(y * 1.8 + seed * 3.1) * 0.95 
        + cos(y * 4.3 - seed * 2.7) * 0.45 
        + seed;
    float cell = floor(warpedY);
    float f = fract(warpedY);

    // Knot base positions on either side of the current segment
    float x0 = hash11(cell + seed * 17.1) - 0.5;
    float x1 = hash11(cell + 1.0 + seed * 17.1) - 0.5;

    // Non-repeating horizontal drift per segment
    float drift0 = cellDrift(cell, seed);
    float drift1 = cellDrift(cell + 1.0, seed);

    // Dynamic independent angle/tilt per segment
    float tilt0 = cellTilt(cell, seed);
    float tilt1 = cellTilt(cell + 1.0, seed);

    // Position of line segment 0 and line segment 1 at local height f with subtle tilt
    float seg0 = (x0 + drift0) * 0.0045 + (f - 0.5) * tilt0 * 0.0035;
    float seg1 = (x1 + drift1) * 0.0045 + ((f - 1.0) - 0.5) * tilt1 * 0.0035;

    // Vary where the sharp kink occurs inside each cell
    float kinkPoint = 0.65 + (hash11(cell * 5.3 + seed * 9.1) - 0.5) * 0.35;
    
    // Tight sharp transition window creates a short diagonal kink between slanted runs
    float kinkWidth = 0.025;
    float k = smoothstep(kinkPoint - kinkWidth, kinkPoint + kinkWidth, f);

    return mix(seg0, seg1, k);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec3 col = vec3(0.1);

    // Comic-book style panel dividers (each segment has its own dynamic animated angle & position)
    float edge1 = 0.30 + jaggedLine(uv.y, 0.0);
    float edge2 = 0.70 + jaggedLine(uv.y, 4.5);

    // -------------------------------------------------------------
    // VARIANT 0: JUICY ARCADE VERSUS (Purple / Amber / Cyan)
    // -------------------------------------------------------------
    if (u_variant == 0) {
        if (uv.x < edge1) {
            // LEFT COLUMN (30% - Character Bay & 3D Volumetric Pedestal)
            vec3 bgGrad = mix(vec3(0.75, 0.52, 0.98), vec3(0.57, 0.20, 0.92), uv.y);
            
            // Rising sparkles
            float sparkles = 0.0;
            for (int i = 0; i < 6; i++) {
                float fi = float(i);
                vec2 starPos = vec2(
                    0.05 + mod(fi * 0.05 + u_time * 0.02, 0.22),
                    fract(fi * 0.18 + u_time * 0.1)
                );
                sparkles += drawStar(uv, starPos, 0.015);
            }
            col = bgGrad + vec3(1.0, 0.9, 0.3) * (sparkles * 0.5);

            // 3D Voxel Floating Island Pedestal is rendered via Three.js in Hero.tsx
            // (Old GLSL cylinder cogs pedestal replaced)

        } else if (uv.x < edge2) {
            // MIDDLE COLUMN (40% - Bio & Title Stage)
            vec3 bgGrad = mix(vec3(0.96, 0.62, 0.04), vec3(0.85, 0.46, 0.02), uv.y);
            // Sunburst Rays
            vec2 center = vec2((edge1 + edge2) * 0.5, 0.5);
            vec2 dir = uv - center;
            float angle = atan(dir.y, dir.x);
            float rays = step(0.5, sin(angle * 12.0 + u_time * 0.8)) * 0.15;
            // Halftone comic dot overlay
            vec2 dotUv = fract(uv * 40.0) - 0.5;
            float dots = smoothstep(0.25, 0.20, length(dotUv)) * 0.08;
            
            col = bgGrad + vec3(1.0, 0.95, 0.7) * (rays + dots);

        } else {
            // RIGHT COLUMN (30% - Blue Speed Streaks & Diamond Sparkles)
            vec3 bgGrad = mix(vec3(0.22, 0.74, 0.97), vec3(0.01, 0.52, 0.78), uv.y);
            // Diagonal speed streak lines
            float streaks = step(0.88, sin((uv.x * 1.5 + uv.y * 1.2) * 50.0 + u_time * 3.0)) * 0.12;
            // Diamond sparkles
            float diamonds = 0.0;
            for (int i = 0; i < 5; i++) {
                float fi = float(i);
                vec2 diaPos = vec2(
                    0.72 + mod(fi * 0.06 + sin(u_time + fi), 0.22),
                    fract(fi * 0.22 + u_time * 0.12)
                );
                diamonds += drawStar(uv, diaPos, 0.012);
            }
            col = bgGrad + vec3(0.8, 1.0, 1.0) * (streaks + diamonds * 0.7);
        }
    }
    // -------------------------------------------------------------
    // VARIANT 1: CUTESY TOY FACTORY (Lavender / Butter / Mint)
    // -------------------------------------------------------------
    else if (u_variant == 1) {
        if (uv.x < edge1) {
            vec3 bgGrad = mix(vec3(0.91, 0.83, 1.0), vec3(0.86, 0.84, 0.99), uv.y);
            // Floating star motes
            float floatMotes = 0.0;
            for (int i = 0; i < 5; i++) {
                float fi = float(i);
                vec2 pos = vec2(0.05 + mod(fi * 0.05, 0.22), fract(fi * 0.2 + u_time * 0.08));
                floatMotes += smoothstep(0.02, 0.005, length(uv - pos)) * 0.15;
            }
            col = bgGrad + floatMotes;

        } else if (uv.x < edge2) {
            vec3 bgGrad = mix(vec3(0.99, 0.94, 0.54), vec3(0.99, 0.88, 0.28), uv.y);
            // Conveyor dash lines
            float dashes = step(0.7, sin(uv.y * 60.0 + u_time * 2.0)) * 0.08;
            col = bgGrad + vec3(1.0, 1.0, 0.8) * dashes;

        } else {
            vec3 bgGrad = mix(vec3(0.65, 0.95, 0.82), vec3(0.43, 0.90, 0.72), uv.y);
            // Floating toy cubes
            vec2 grid = fract(uv * vec2(15.0, 25.0) + vec2(0.0, u_time * 0.5));
            float cubes = smoothstep(0.3, 0.25, abs(grid.x - 0.5)) * smoothstep(0.3, 0.25, abs(grid.y - 0.5)) * 0.06;
            col = bgGrad + vec3(1.0) * cubes;
        }
    }
    // -------------------------------------------------------------
    // VARIANT 2: ELECTRIC LIGHTNING SPLIT (Magenta / Gold / Cyan)
    // -------------------------------------------------------------
    else if (u_variant == 2) {
        if (uv.x < edge1) {
            vec3 bgGrad = mix(vec3(0.86, 0.15, 0.47), vec3(0.74, 0.09, 0.36), uv.y);
            // Energy pulse rings
            vec2 center = vec2(0.15, 0.5);
            float ring = sin(length(uv - center) * 30.0 - u_time * 3.0) * 0.1;
            col = bgGrad + vec3(1.0, 0.6, 0.8) * ring;

        } else if (uv.x < edge2) {
            vec3 bgGrad = mix(vec3(0.96, 0.62, 0.04), vec3(0.70, 0.32, 0.03), uv.y);
            // Spotlight beam
            vec2 spotOrigin = vec2((edge1 + edge2) * 0.5, 1.0);
            float spot = smoothstep(0.4, 0.0, abs(uv.x - spotOrigin.x) / (1.1 - uv.y)) * 0.2;
            col = bgGrad + vec3(1.0, 0.9, 0.5) * spot;

        } else {
            vec3 bgGrad = mix(vec3(0.02, 0.71, 0.83), vec3(0.03, 0.57, 0.70), uv.y);
            // Fast horizontal speed lines
            float speedLines = step(0.85, sin(uv.y * 100.0 + u_time * 5.0)) * 0.12;
            col = bgGrad + vec3(0.7, 1.0, 1.0) * speedLines;
        }
    }
    // -------------------------------------------------------------
    // VARIANT 3: OVERWORLD STAGE SELECT (Island Green / Sand / Ocean)
    // -------------------------------------------------------------
    else if (u_variant == 3) {
        if (uv.x < edge1) {
            vec3 bgGrad = mix(vec3(0.29, 0.87, 0.50), vec3(0.09, 0.64, 0.29), uv.y);
            // Grass contour lines
            float contour = sin(uv.y * 30.0 + sin(uv.x * 20.0)) * 0.08;
            col = bgGrad + vec3(0.8, 1.0, 0.8) * contour;

        } else if (uv.x < edge2) {
            vec3 bgGrad = mix(vec3(0.99, 0.83, 0.30), vec3(0.96, 0.62, 0.04), uv.y);
            // Route path dashes
            float pathDashes = step(0.5, fract(uv.x * 30.0 - u_time * 0.4)) * 0.08;
            col = bgGrad + vec3(1.0, 1.0, 0.9) * pathDashes;

        } else {
            vec3 bgGrad = mix(vec3(0.22, 0.74, 0.97), vec3(0.01, 0.52, 0.78), uv.y);
            // Wave foam ripples
            float waves = sin(uv.y * 40.0 + uv.x * 20.0 + u_time * 1.5) * 0.09;
            col = bgGrad + vec3(0.8, 0.95, 1.0) * waves;
        }
    }
    // -------------------------------------------------------------
    // VARIANT 4: GALAXIAN VERSUS (Fork of Variant 0 — columns 1 & 2
    // identical to Juicy Arcade Versus; column 3 is left transparent so
    // the galaxian.md SVG shows through, using the exact same jagged
    // edge2 boundary as the divider stroke below instead of an
    // approximated straight DOM edge.)
    // -------------------------------------------------------------
    else {
        if (uv.x < edge1) {
            vec3 bgGrad = mix(vec3(0.75, 0.52, 0.98), vec3(0.57, 0.20, 0.92), uv.y);
            float sparkles = 0.0;
            for (int i = 0; i < 6; i++) {
                float fi = float(i);
                vec2 starPos = vec2(
                    0.05 + mod(fi * 0.05 + u_time * 0.02, 0.22),
                    fract(fi * 0.18 + u_time * 0.1)
                );
                sparkles += drawStar(uv, starPos, 0.015);
            }
            col = bgGrad + vec3(1.0, 0.9, 0.3) * (sparkles * 0.5);

        } else if (uv.x < edge2) {
            vec3 bgGrad = mix(vec3(0.96, 0.62, 0.04), vec3(0.85, 0.46, 0.02), uv.y);
            vec2 center = vec2((edge1 + edge2) * 0.5, 0.5);
            vec2 dir = uv - center;
            float angle = atan(dir.y, dir.x);
            float rays = step(0.5, sin(angle * 12.0 + u_time * 0.8)) * 0.15;
            vec2 dotUv = fract(uv * 40.0) - 0.5;
            float dots = smoothstep(0.25, 0.20, length(dotUv)) * 0.08;
            col = bgGrad + vec3(1.0, 0.95, 0.7) * (rays + dots);

        } else {
            // Column 3 fill is irrelevant — made fully transparent below.
            col = vec3(0.0);
        }
    }

    // Thick comic book black outline along the jagged panel boundaries
    float lineDist1 = abs(uv.x - edge1) * u_resolution.x;
    float lineDist2 = abs(uv.x - edge2) * u_resolution.x;
    float minLineDist = min(lineDist1, lineDist2);

    // Bold black comic stroke (~10px total width) with sharp antialiased edges
    float strokeHalfWidth = 4.0;
    float feather = 1.5;
    float outlineFactor = smoothstep(strokeHalfWidth, strokeHalfWidth + feather, minLineDist);

    // Mix color with solid black for a distinct comic book strip panel separation
    col = mix(vec3(0.0), col, outlineFactor);

    // Galaxian variant: keep the jagged divider stroke opaque, but let column 3's
    // fill go fully transparent so the SVG layered behind the canvas shows through
    // — this follows the exact same jagged edge2 line as the stroke itself.
    float galaxianAlpha = 1.0;
    if (u_variant == 4 && uv.x >= edge2) {
        galaxianAlpha = 1.0 - outlineFactor;
    }

    if (u_pass == 2) {
        // Overlay pass: Column 2 & Column 3 + Dividers
        float alpha = 1.0;
        if (uv.x < edge1) {
            alpha = 1.0 - smoothstep(strokeHalfWidth, strokeHalfWidth + feather, lineDist1);
        }
        gl_FragColor = vec4(col, alpha * galaxianAlpha);
    } else {
        gl_FragColor = vec4(col, galaxianAlpha);
    }
}
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string): WebGLProgram | null {
  const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

interface Segmented3ShaderBackgroundProps {
  pass?: 'full' | 'overlay';
  className?: string;
  isVisible?: boolean;
}

export function Segmented3ShaderBackground({ pass = 'full', className = '', isVisible = true }: Segmented3ShaderBackgroundProps) {
  const { segmentedVariant } = useSkin();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isVisibleRef = useRef(isVisible);
  isVisibleRef.current = isVisible;

  const variantMap: Record<string, number> = {
    arcade: 0,
    toyfactory: 1,
    lightning: 2,
    overworld: 3,
    // Fork of variant 0: identical columns 1/2, column 3 alpha'd out in-shader
    // (see VARIANT 4 in the fragment shader) so the galaxian.md SVG behind
    // the canvas shows through with the exact same jagged edge2 boundary.
    galaxian: 4,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false }) ||
      (canvas.getContext('experimental-webgl', { alpha: true, premultipliedAlpha: false }) as WebGLRenderingContext | null);
    if (!gl) return;

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const program = createProgram(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);
    if (!program) return;

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      gl.STATIC_DRAW
    );

    const positionLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const uResolutionLoc = gl.getUniformLocation(program, 'u_resolution');
    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uVariantLoc = gl.getUniformLocation(program, 'u_variant');
    const uPassLoc = gl.getUniformLocation(program, 'u_pass');

    let animationFrameId: number;
    const startTime = performance.now();

    const render = () => {
      if (!canvas || !gl) return;
      if (!isVisibleRef.current) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const displayWidth = canvas.clientWidth || 800;
      const displayHeight = canvas.clientHeight || 600;

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
      }

      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      if (uResolutionLoc) gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      if (uTimeLoc) gl.uniform1f(uTimeLoc, (performance.now() - startTime) * 0.001);
      if (uVariantLoc) gl.uniform1i(uVariantLoc, variantMap[segmentedVariant] ?? 0);
      if (uPassLoc) gl.uniform1i(uPassLoc, pass === 'overlay' ? 2 : 0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (gl && program) {
        gl.deleteProgram(program);
      }
    };
  }, [segmentedVariant, pass]);

  return (
    <div className={`absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 ${className}`}>
      {/* ── WebGL 3-Segmented Canvas Background ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none block"
        aria-hidden
      />
    </div>
  );
}
