import React, { useEffect, useRef } from 'react';

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
// Palette definitions (16-color dark fantasy retro vibe)
#define COLOR_BG      vec3(0.05, 0.05, 0.08)
#define COLOR_WALL1   vec3(0.12, 0.16, 0.23) // #1E293B mossy slate
#define COLOR_WALL2   vec3(0.30, 0.08, 0.08) // brick red tint
#define COLOR_MORTAR  vec3(0.03, 0.04, 0.06)
#define COLOR_TORCH   vec3(0.98, 0.45, 0.09) // #F97316 torch orange
#define COLOR_IRON    vec3(0.20, 0.22, 0.25)
#define COLOR_FLOOR   vec3(0.08, 0.08, 0.10)
#define COLOR_CEIL    vec3(0.02, 0.02, 0.03)

// Simple pseudo-random hash
float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 34.45);
    return fract(p.x * p.y);
}

// Brick texture generator
vec3 getBrickColor(vec2 uv, out float isMortar) {
    vec2 p = uv * 4.0;
    // Stagger bricks every other row
    if (mod(floor(p.y), 2.0) == 1.0) {
        p.x += 0.5;
    }
    
    vec2 f = fract(p);
    vec2 b = abs(f - 0.5);
    
    // Mortar lines
    float mortar = max(b.x, b.y);
    isMortar = step(0.42, mortar);
    
    float n = hash(floor(p));
    vec3 col = mix(COLOR_WALL1, COLOR_WALL2, n * 0.5);
    col *= 0.8 + 0.4 * n;
    
    return mix(col, COLOR_MORTAR, isMortar);
}

void main() {
    // 1. Pixelation / Retro resolution scaling
    vec2 pixelGrid = vec2(280.0, 210.0);
    vec2 st = floor((gl_FragCoord.xy / u_resolution.xy) * pixelGrid) / pixelGrid;
    vec2 fragCoord = st * u_resolution.xy;
    
    // Normalized UVs centered at (0,0)
    vec2 uv = (fragCoord - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    
    // 2. FPS Camera Motion & Head Bobbing
    float bob = sin(u_time * 5.0) * 0.04;
    float sway = cos(u_time * 2.5) * 0.03;
    
    vec3 ro = vec3(sway, bob, u_time * 1.8);
    
    // Fixed default perspective facing straight down the corridor
    float yaw = 0.0;
    float pitch = bob;
    
    // Ray direction with wide retro FOV so side walls, torches & doors are clearly visible
    vec3 rd = normalize(vec3(uv * 1.6, 0.85));
    
    // Apply pitch rotation
    float cp = cos(pitch), sp = sin(pitch);
    rd.yz = mat2(cp, -sp, sp, cp) * rd.yz;
    
    // Apply yaw rotation
    float cy = cos(yaw), sy = sin(yaw);
    rd.xz = mat2(cy, -sy, sy, cy) * rd.xz;
    
    // 3. Raymarching Corridor
    float dist = 0.0;
    vec3 p = ro;
    int hitType = 0; // 0: floor/ceil, 1: left/right wall
    vec2 wallUV = vec2(0.0);
    
    for (int i = 0; i < 44; i++) {
        p = ro + rd * dist;
        
        // Infinite corridor bounds (width: 2.0, height: 1.5)
        vec2 q = abs(p.xy);
        
        if (q.x > 1.0) {
            hitType = 1;
            wallUV = vec2(p.z, p.y);
            break;
        } else if (q.y > 1.0) {
            hitType = 2;
            wallUV = vec2(p.x, p.z);
            break;
        }
        
        dist += 0.12;
        if (dist > 16.0) {
            dist = 16.0;
            break;
        }
    }
    
    // 4. Shading and Texturing
    vec3 col = COLOR_BG;
    float fog = exp(-dist * 0.12);
    
    if (dist < 15.0) {
        float isMortar = 0.0;
        vec3 baseCol = vec3(0.0);
        
        if (hitType == 1 || hitType == 2) {
            // Walls
            baseCol = getBrickColor(wallUV, isMortar);
            
            // Add Iron Doors / Pillars periodically down the hall
            float hallSection = mod(p.z, 6.0);
            if (hallSection > 5.0 && abs(p.y) < 0.8) {
                // Door frame / Iron door
                float doorFrame = max(abs(fract(p.z) - 0.5), abs(p.y) - 0.7);
                if (doorFrame < 0.4) {
                    baseCol = mix(COLOR_IRON, COLOR_MORTAR, step(0.35, doorFrame));
                }
            }
        } else {
            // Floor and Ceiling
            if (p.y < 0.0) {
                float fMortar;
                baseCol = getBrickColor(p.xz * 0.5, fMortar) * COLOR_FLOOR * 3.0;
            } else {
                baseCol = COLOR_CEIL;
            }
        }
        
        // 5. Lighting: Torch flicker and distance falloff
        float torchInterval = 6.0;
        float nearestTorchZ = floor(p.z / torchInterval) * torchInterval + 3.0;
        float torchDist = abs(p.z - nearestTorchZ);
        
        // Flicker calculation
        float flicker = 0.8 + 0.2 * sin(u_time * 15.0 + nearestTorchZ) * cos(u_time * 25.0);
        
        // Point light from torches on the walls
        vec3 torchPos = vec3(sign(p.x) * 0.9, 0.0, nearestTorchZ);
        float lightDist = length(p - torchPos);
        float attenuation = 1.0 / (1.0 + 0.8 * lightDist + 0.5 * lightDist * lightDist);
        attenuation *= flicker;
        
        vec3 lightColor = COLOR_TORCH * attenuation * 3.0;
        
        // Ambient light
        vec3 ambient = vec3(0.05, 0.07, 0.1);
        
        col = baseCol * (ambient + lightColor);
    }
    
    // Apply distance fog to dark background
    col = mix(COLOR_BG, col, fog);
    
    // 6. Vignette & Retro CRT look
    vec2 vigUV = gl_FragCoord.xy / u_resolution.xy;
    float vignette = vigUV.x * vigUV.y * (1.0 - vigUV.x) * (1.0 - vigUV.y);
    vignette = clamp(pow(16.0 * vignette, 0.25), 0.0, 1.0);
    col *= vignette;
    
    // Scanline effect
    float scanline = sin(gl_FragCoord.y * 2.0) * 0.04;
    col -= scanline;

    gl_FragColor = vec4(col, 1.0);
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

export function CorridorShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
    if (!gl) return;

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

    let animationFrameId: number;
    const startTime = performance.now();

    const render = () => {
      if (!canvas || !gl) return;

      const displayWidth = canvas.clientWidth || 800;
      const displayHeight = canvas.clientHeight || 600;

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
      }

      gl.useProgram(program);

      if (uResolutionLoc) gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      if (uTimeLoc) gl.uniform1f(uTimeLoc, (performance.now() - startTime) * 0.001);

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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none block"
      style={{ background: '#0d0d14' }}
      aria-hidden
    />
  );
}
