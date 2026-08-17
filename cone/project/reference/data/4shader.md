precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;

// SDF for rounded box with outline
float sdRoundedBox(vec2 p, vec2 b, vec4 r) {
    r.xy = (p.x > 0.0) ? r.xy : r.zw;
    r.x  = (p.y > 0.0) ? r.x  : r.y;
    vec2 q = abs(p) - b + r.x;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r.x;
}

// Circle SDF
float sdCircle(vec2 p, float r) {
    return length(p) - r;
}

// Segment SDF for lines
float sdSegment(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h);
}

// 2D Rotation matrix
mat2 rotate2d(float angle) {
    float s = sin(angle), c = cos(angle);
    return mat2(c, -s, s, c);
}

void main() {
    // Normalized pixel coordinates (from -1 to 1, aspect corrected)
    vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    
    // Background color (Kenney style dark slate)
    vec3 col = vec3(0.09, 0.12, 0.18);
    
    // Subtle grid/scanlines background
    float grid = sin(st.x * 40.0) * sin(st.y * 40.0);
    col += vec3(grid * 0.02);

    // --- Time scaling ---
    float t = u_time * 2.0;

    // --- STAGE 1: Hopper & Dispenser (Left) ---
    vec2 hopperPos = st - vec2(-0.6, 0.2);
    // Funnel shape using trapezoid approximation
    float hopperD = sdRoundedBox(hopperPos + vec2(0.0, -0.1), vec2(0.2, 0.15), vec4(0.02, 0.02, 0.1, 0.1));
    // Hopper outline & fill
    if (hopperD < 0.0) {
        col = mix(vec3(0.98, 0.8, 0.08), vec3(0.79, 0.54, 0.02), hopperPos.y);
    }
    // Hopper outline stroke
    if (abs(hopperD) < 0.015) {
        col = vec3(0.12, 0.16, 0.23);
    }

    // --- STAGE 2: Conveyor Belt & Moving Blocks ---
    vec2 beltPos = st - vec2(0.0, -0.2);
    float beltD = sdRoundedBox(beltPos, vec2(0.8, 0.06), vec4(0.03));
    if (beltD < 0.0) {
        // Belt metal texture lines scrolling
        float pattern = fract(beltPos.x * 10.0 - t * 1.5);
        vec3 beltColor = (pattern < 0.2) ? vec3(0.25, 0.3, 0.4) : vec3(0.18, 0.22, 0.3);
        col = beltColor;
    }
    if (abs(beltD) < 0.015) {
        col = vec3(0.12, 0.16, 0.23);
    }

    // Conveyor Gears/Pulleys
    vec2 gear1Pos = st - vec2(-0.75, -0.25);
    vec2 gear2Pos = st - vec2(0.75, -0.25);
    float g1 = sdCircle(gear1Pos, 0.09);
    float g2 = sdCircle(gear2Pos, 0.09);
    if (g1 < 0.0 || g2 < 0.0) {
        col = vec3(0.39, 0.45, 0.55);
        // Spoke cutouts
        vec2 gp = g1 < 0.0 ? gear1Pos : gear2Pos;
        gp *= rotate2d(t * 3.0);
        if (abs(mod(atan(gp.y, gp.x), 1.57) - 0.78) < 0.3 && length(gp) < 0.07) {
            col = vec3(0.18, 0.22, 0.3);
        }
    }
    if (abs(g1) < 0.01 || abs(g2) < 0.01) {
        col = vec3(0.12, 0.16, 0.23);
    }

    // --- MOVING GAME BLOCKS (Perpetual Assembly) ---
    // Loop blocks along the conveyor
    for(int i = 0; i < 4; i++) {
        float offset = float(i) * 0.45;
        float bx = mod(t * 0.4 + offset, 1.8) - 0.9;
        
        // Squish and jump physics near stamp (x = 0.0)
        float by = -0.12;
        float squishX = 1.0;
        float squishY = 1.0;
        
        if (bx > -0.2 && bx < 0.2) {
            float stampPhase = sin((bx + 0.2) / 0.4 * 3.1415);
            by += stampPhase * 0.05; // pushed down slightly or squished
            squishX = 1.0 + stampPhase * 0.2;
            squishY = 1.0 - stampPhase * 0.2;
        }

        vec2 blockPos = (st - vec2(bx, by)) * vec2(1.0 / squishX, 1.0 / squishY);
        float blockD = sdRoundedBox(blockPos, vec2(0.09), vec4(0.02));

        if (blockD < 0.0) {
            // Alternate colors per block index
            vec3 bCol = vec3(0.29, 0.87, 0.5); // Green base
            if (i == 1) bCol = vec3(0.98, 0.8, 0.08); // Yellow
            if (i == 2) bCol = vec3(0.22, 0.74, 0.97); // Blue
            if (i == 3) bCol = vec3(0.75, 0.52, 0.99); // Purple
            
            // 3D bottom lip shading
            if (blockPos.y < -0.05) {
                bCol *= 0.6;
            }
            col = bCol;
        }
        if (abs(blockD) < 0.012) {
            col = vec3(0.12, 0.16, 0.23); // Dark outline
        }
    }

    // --- STAGE 3: The Heavy Arcade Stamping Press (Center) ---
    float stampY = 0.15 + sin(t * 3.1415 * 2.0) * 0.08;
    vec2 stampPos = st - vec2(0.0, stampY);
    float stampD = sdRoundedBox(stampPos, vec2(0.12, 0.08), vec4(0.03));
    
    if (stampD < 0.0) {
        col = vec3(0.9, 0.2, 0.3); // Red mechanical press
    }
    if (abs(stampD) < 0.015) {
        col = vec3(0.12, 0.16, 0.23);
    }
    // Piston rod
    vec2 rodPos = st - vec2(0.0, stampY + 0.15);
    float rodD = sdRoundedBox(rodPos, vec2(0.03, 0.1), vec4(0.01));
    if (rodD < 0.0) col = vec3(0.6, 0.65, 0.7);
    if (abs(rodD) < 0.01) col = vec3(0.12, 0.16, 0.23);


    // --- STAGE 4 & 5: Scoreboard Banner (Top) ---
    vec2 boardPos = st - vec2(0.0, 0.7);
    float boardD = sdRoundedBox(boardPos, vec2(0.45, 0.08), vec4(0.04));
    if (boardD < 0.0) {
        col = vec3(0.15, 0.2, 0.3);
    }
    if (abs(boardD) < 0.015) {
        col = vec3(0.98, 0.8, 0.08); // Golden border
    }

    // Simple pseudo-text glowing lines in scoreboard
    vec2 textPos = boardPos + vec2(0.0, 0.0);
    float textBar1 = sdRoundedBox(textPos + vec2(-0.15, 0.0), vec2(0.12, 0.02), vec4(0.01));
    float textBar2 = sdRoundedBox(textPos + vec2(0.18, 0.0), vec2(0.08, 0.02), vec4(0.01));
    if (textBar1 < 0.0 || textBar2 < 0.0) {
        col = vec3(0.95, 0.95, 1.0);
    }

    // Output final color
    gl_FragColor = vec4(col, 1.0);
}