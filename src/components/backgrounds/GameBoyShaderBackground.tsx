import React, { useEffect, useRef } from 'react';
import { createProgram } from './webgl';

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

// Game Boy Palette (Darkest to Lightest)
#define COLOR_0 vec3(0.0588, 0.2196, 0.0588) // #0F380F
#define COLOR_1 vec3(0.1882, 0.3843, 0.1882) // #306230
#define COLOR_2 vec3(0.5451, 0.6745, 0.0588) // #8BAC0F
#define COLOR_3 vec3(0.6078, 0.7373, 0.0588) // #9BBC0F

// Quantize to 4 shades
vec3 getGBColor(float v) {
    if (v < 0.25) return COLOR_0;
    if (v < 0.50) return COLOR_1;
    if (v < 0.75) return COLOR_2;
    return COLOR_3;
}

// Simple hash for pseudo-random noise/textures
float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

// Procedural brick/stone texture for walls
float wallTexture(vec2 p) {
    vec2 ip = floor(p);
    vec2 fp = fract(p);
    
    // Brick pattern offset
    if (mod(ip.y, 2.0) == 0.0) {
        ip.x += 0.5;
    }
    
    float n = hash(ip);
    
    // Mortar lines
    float mortar = smoothstep(0.0, 0.08, fp.x) * smoothstep(1.0, 0.92, fp.x) *
                   smoothstep(0.0, 0.08, fp.y) * smoothstep(1.0, 0.92, fp.y);
                   
    return mix(0.2, 0.7 + 0.3 * n, mortar);
}

// Raymarching map for the dungeon corridor
float map(vec3 p) {
    // Repetitive hallway structure
    vec2 rp = p.xy;
    
    // Corridor bounds: walls at |x| = 2.0, ceiling/floor at |y| = 1.5
    float wallDist = 2.0 - abs(rp.x);
    float ceilFloorDist = 1.5 - abs(rp.y);
    
    // Distance to nearest wall/floor/ceiling
    float d = min(wallDist, ceilFloorDist);
    
    // Add pillars along the corridor
    float zRepeat = mod(p.z + 1.0, 4.0) - 2.0;
    float pillar = length(vec2(abs(rp.x) - 1.8, zRepeat)) - 0.3;
    d = min(d, pillar);
    
    return d;
}

void main() {
    // Low-res pixel grid simulation (160x144 aspect ratio feel scaled)
    vec2 fragCoord = gl_FragCoord.xy;
    vec2 resolution = u_resolution;
    
    // Pixelation grid resolution
    float pixelSize = 4.0;
    vec2 st = floor(fragCoord / pixelSize) * pixelSize / resolution.xy;
    
    // Aspect ratio correction
    vec2 uv = (fragCoord - 0.5 * resolution.xy) / min(resolution.x, resolution.y);
    vec2 lowResUv = (floor(fragCoord / pixelSize) * pixelSize - 0.5 * resolution.xy) / min(resolution.x, resolution.y);

    // Camera setup: Forward walk along Z
    float t = u_time * 1.5;
    
    // Add slight head bob
    float bob = sin(t * 3.0) * 0.05;
    vec3 ro = vec3(sin(t * 0.5) * 0.3, bob, t);
    
    // Ray direction
    vec3 rd = normalize(vec3(lowResUv, 1.0 - length(lowResUv) * 0.2));
    
    // Rotate view slightly in a hypnotic corridor sweep
    float yaw = sin(t * 0.25) * 0.2;
    float co = cos(yaw), si = sin(yaw);
    rd.xz *= mat2(co, -si, si, co);

    // Raymarching loop
    float depth = 0.0;
    float minDist = 1e5;
    int steps = 0;
    
    for (int i = 0; i < 32; i++) {
        vec3 p = ro + rd * depth;
        float d = map(p);
        minDist = min(minDist, d);
        if (d < 0.01 || depth > 20.0) break;
        depth += d;
        steps = i;
    }

    // Shading calculation
    float shade = 0.0;
    
    if (depth < 20.0) {
        vec3 p = ro + rd * depth;
        
        // Determine surface type and texture
        if (abs(abs(p.x) - 2.0) < 0.1) {
            // Side walls
            shade = wallTexture(vec2(p.z * 1.5, p.y * 1.5));
        } else if (abs(abs(p.y) - 1.5) < 0.1) {
            // Floor / Ceiling
            shade = wallTexture(vec2(p.x * 1.5, p.z * 1.5));
        } else {
            // Pillars / Details
            shade = 0.4;
        }
        
        // Distance fog for retro depth cueing
        float fog = clamp(1.0 - (depth / 16.0), 0.0, 1.0);
        shade = mix(0.0, shade, fog);
        
        // Add subtle ambient occlusion based on steps
        float ao = clamp(float(steps) / 32.0, 0.2, 1.0);
        shade *= ao;
        
    } else {
        // Void / Far distance
        shade = 0.0;
    }

    // Quantize to 4 Game Boy shades
    vec3 col = getGBColor(shade);

    // Dot-matrix LCD grid overlay (screen door effect)
    vec2 gridCoord = mod(fragCoord, pixelSize);
    float dotMatrix = 1.0;
    if (gridCoord.x < 1.0 || gridCoord.y < 1.0) {
        dotMatrix = 0.85;
    }
    col *= dotMatrix;

    // Vignette
    vec2 uvVignette = fragCoord / resolution.xy;
    float vignette = uvVignette.x * uvVignette.y * (1.0 - uvVignette.x) * (1.0 - uvVignette.y);
    vignette = clamp(pow(16.0 * vignette, 0.25), 0.0, 1.0);
    col *= mix(0.85, 1.0, vignette);

    gl_FragColor = vec4(col, 1.0);
}
`;

export function GameBoyShaderBackground() {
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
      style={{ background: '#0f380f' }}
      aria-hidden
    />
  );
}
