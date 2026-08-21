import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * @propolis
 * {
 *   "role": "COMPONENT",
 *   "constraints": [
 *     "Full-bleed Three.js scene, hero-only. Ported from cone/project/reference/anims/threejs/bg.md",
 *     "(a standalone CDN-import demo) into a real npm 'three' dependency + React lifecycle.",
 *     "Sized to the container element via ResizeObserver, not window — the source used",
 *     "window.innerWidth/innerHeight, which is wrong for a component embedded inside Hero rather",
 *     "than owning the whole viewport. OrbitControls (user drag-to-orbit) was dropped: this is a",
 *     "decorative pointer-events-none background, not an interactive viewer — only its autoRotate",
 *     "behavior is kept, reimplemented as a manual camera orbit. A separate cursor-driven gaze was",
 *     "added on top: the lookAt target eases up/down with the cursor's vertical position only —",
 *     "horizontal cursor movement is ignored so it never fights the orbit's own horizontal sweep.",
 *     "camera.position always stays on the orbit track and never reacts to the cursor."
 *   ],
 *   "agent_instructions": "isVisible is a prop, not an internal IntersectionObserver like the source used — Hero threads a real isVisible down from its own visibility hook."
 * }
 */

interface ThreeNatureFieldBackgroundProps {
  className?: string;
  isVisible?: boolean;
}

const GRASS_COUNT = 12000;
const TREE_COUNT = 12;
const CAMERA_TARGET = new THREE.Vector3(0, 2.5, 0);
const CAMERA_RADIUS = Math.hypot(0, 12); // initial (0, 2.5, 12) offset from target in the XZ plane — pulled back from the original (0, 2.0, 10) for a wider view
const CAMERA_HEIGHT = 2.5;
const CAMERA_ORBIT_SPEED = -0.0131; // rad/s — quarter of the original 0.0524, reversed direction (OrbitControls autoRotateSpeed=0.5 at 60fps)
const WORLD_UP = new THREE.Vector3(0, 1, 0);
const CAMERA_LOOK_OFFSET = 0.6; // world units the look target shifts vertically at max cursor deflection (~2.9° at CAMERA_RADIUS) — position never moves, only gaze
const CAMERA_LOOK_SMOOTHING = 1.6; // lower = slower, gentler catch-up to the cursor (avoids a snappy/jagged feel)
const SUN_BACK_DISTANCE = 45; // world units behind the camera, along its view direction
const SUN_HEIGHT_OFFSET = 35; // world units above the camera
const SUN_SIDE_OFFSET = 15; // lateral offset for a three-quarter lighting angle rather than a flat backlight

export function ThreeNatureFieldBackground({ className = '', isVisible = true }: ThreeNatureFieldBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(isVisible);
  isVisibleRef.current = isVisible;
  const [webglUnavailable, setWebglUnavailable] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 1000);
    camera.position.set(0, CAMERA_HEIGHT, CAMERA_RADIUS);
    camera.lookAt(CAMERA_TARGET);

    // THREE.WebGLRenderer's constructor throws (not returns null) when it can't acquire a
    // WebGL context — happens on old/blocklisted GPU drivers, common on older laptops. Left
    // uncaught, this crashed the entire page (no Error Boundary caught it, so React unmounted
    // the whole tree). Fall back to a plain gradient instead.
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true });
    } catch (err) {
      console.warn('ThreeNatureFieldBackground: WebGL unavailable, falling back to a static background.', err);
      setWebglUnavailable(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap; // cheaper than PCFSoftShadowMap's multi-tap filtering
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x2ecc71, 0.65);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xfff5cc, 1.8);
    sunLight.position.set(40, 60, 40);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 200;
    const d = 60;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);
    // Added to the scene (not left as the light's implicit default target) so its
    // matrixWorld actually updates when we reposition it every frame to follow the camera.
    scene.add(sunLight.target);

    // --- Sky Dome with Gradient ---
    const skyGeo = new THREE.SphereGeometry(500, 32, 15);
    const skyMat = new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: new THREE.Color(0x0288d1) },
        bottomColor: { value: new THREE.Color(0xb3e5fc) },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition).y;
          gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), 0.6), 0.0)), 1.0);
        }
      `,
      side: THREE.BackSide,
    });
    const sky = new THREE.Mesh(skyGeo, skyMat);
    scene.add(sky);

    // --- Ground Terrain ---
    const groundGeo = new THREE.CylinderGeometry(120, 120, 2, 64);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x1e8449,
      roughness: 0.8,
      metalness: 0.1,
      flatShading: true,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -1;
    ground.receiveShadow = true;
    scene.add(ground);

    // --- Instanced Grass with Wind Shader ---
    const grassGeoBase = new THREE.ConeGeometry(0.25, 0.85, 3, 1);
    grassGeoBase.translate(0, 0.85 / 2, 0); // pivot at base

    const grassMat = new THREE.MeshStandardMaterial({
      color: 0x2ecc71,
      roughness: 0.4,
      metalness: 0.1,
      flatShading: true,
    });

    let grassShader: THREE.WebGLProgramParametersWithUniforms | null = null;
    grassMat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 };
      grassShader = shader;

      shader.vertexShader =
        `
        uniform float uTime;
        attribute vec3 aOffset;
        attribute float aScale;
        attribute float aRotation;
      ` + shader.vertexShader;

      shader.vertexShader = shader.vertexShader.replace(
        `#include <begin_vertex>`,
        `
        #include <begin_vertex>

        transformed *= aScale;

        float heightFactor = position.y / 0.85;
        float bendAmount = heightFactor * heightFactor * 0.35;

        float windWave = sin(uTime * 2.5 + aOffset.x * 0.5 + aOffset.z * 0.5);
        transformed.x += windWave * bendAmount;
        transformed.z += cos(uTime * 2.0 + aOffset.x * 0.3) * bendAmount * 0.5;

        float s = sin(aRotation);
        float c = cos(aRotation);
        mat3 rotY = mat3(
             c, 0.0,  s,
           0.0, 1.0, 0.0,
            -s, 0.0,  c
        );
        transformed = rotY * transformed;

        transformed += aOffset;
        `
      );
    };

    const grassInstancedMesh = new THREE.InstancedMesh(grassGeoBase, grassMat, GRASS_COUNT);
    // Casting shadows from 12k individual blades is the single biggest cost in this scene
    // for a shadow contribution that's barely visible on thin cone geometry anyway.
    grassInstancedMesh.castShadow = false;
    grassInstancedMesh.receiveShadow = true;

    const offsets: number[] = [];
    const scales: number[] = [];
    const rotations: number[] = [];

    // Position/scale/rotation for every blade are driven entirely by the aOffset/aScale/
    // aRotation attributes read in the custom vertex shader above (onBeforeCompile). The
    // InstancedMesh's own per-instance matrix must therefore stay identity — Three.js applies
    // instanceMatrix on top of that already-transformed result (in the standard project_vertex
    // chunk, after this shader's begin_vertex override runs), so baking the same offset/scale/
    // rotation into `dummy` here would apply it a second time. That's what was pushing the
    // outer blades (radius up to 83) out past the ground disc's 120-unit edge — a doubled
    // offset landed them beyond where any ground geometry exists, reading as "levitating" at
    // the horizon while blades near the center (small radius, doubling barely noticeable)
    // looked fine.
    const dummy = new THREE.Object3D();
    dummy.updateMatrix();
    for (let i = 0; i < GRASS_COUNT; i++) {
      const radius = Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      offsets.push(x, 0, z);
      const scale = 0.6 + Math.random() * 0.8;
      scales.push(scale);
      rotations.push(Math.random() * Math.PI * 2);

      grassInstancedMesh.setMatrixAt(i, dummy.matrix);
    }

    grassGeoBase.setAttribute('aOffset', new THREE.InstancedBufferAttribute(new Float32Array(offsets), 3));
    grassGeoBase.setAttribute('aScale', new THREE.InstancedBufferAttribute(new Float32Array(scales), 1));
    grassGeoBase.setAttribute('aRotation', new THREE.InstancedBufferAttribute(new Float32Array(rotations), 1));

    scene.add(grassInstancedMesh);

    // --- Stylized Cartoon Trees ---
    // Evenly spaced around the full circle (small jitter so it doesn't read as a perfect
    // ring) so trees stay visible all the way around as the camera orbits, instead of the
    // previous 8 hand-placed spots that left large gaps.
    const treePositions = Array.from({ length: TREE_COUNT }, (_, i) => {
      const angle = (i / TREE_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.15;
      const radius = 18 + Math.random() * 20;
      return { x: Math.cos(angle) * radius, z: Math.sin(angle) * radius, angle, radius };
    });

    const treeGeometries: THREE.BufferGeometry[] = [];
    const treeMaterials: THREE.Material[] = [];

    const trunkGeo = new THREE.CylinderGeometry(0.6, 0.9, 5, 6);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x795548, roughness: 0.9, flatShading: true });
    const canopyMat = new THREE.MeshStandardMaterial({ color: 0x27ae60, roughness: 0.5, flatShading: true });
    const canopyGeo1 = new THREE.ConeGeometry(4, 5, 5);
    const canopyGeo2 = new THREE.ConeGeometry(3, 4, 5);
    const canopyGeo3 = new THREE.ConeGeometry(1.8, 3, 5);
    treeGeometries.push(trunkGeo, canopyGeo1, canopyGeo2, canopyGeo3);
    treeMaterials.push(trunkMat, canopyMat);

    treePositions.forEach((pos) => {
      const treeGroup = new THREE.Group();

      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 2.5;
      trunk.castShadow = true;
      trunk.receiveShadow = true;
      treeGroup.add(trunk);

      const canopy1 = new THREE.Mesh(canopyGeo1, canopyMat);
      canopy1.position.y = 5.0;
      canopy1.castShadow = true;
      treeGroup.add(canopy1);

      const canopy2 = new THREE.Mesh(canopyGeo2, canopyMat);
      canopy2.position.y = 7.5;
      canopy2.castShadow = true;
      treeGroup.add(canopy2);

      const canopy3 = new THREE.Mesh(canopyGeo3, canopyMat);
      canopy3.position.y = 9.5;
      canopy3.castShadow = true;
      treeGroup.add(canopy3);

      treeGroup.position.set(pos.x, 0, pos.z);
      scene.add(treeGroup);
    });

    // --- Mario Pipe Props (ground-level, flat-shaded to match the rest of the scene) ---
    const pipeBodyMat = new THREE.MeshStandardMaterial({ color: 0x1a9c4b, roughness: 0.5, flatShading: true });
    const pipeRimMat = new THREE.MeshStandardMaterial({ color: 0x14803c, roughness: 0.5, flatShading: true });
    const pipeBodyGeo = new THREE.CylinderGeometry(1.3, 1.3, 4, 12);
    const pipeRimGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.6, 12);

    // Assuming trees are point-sized and evenly spaced every (360/12)=30° isn't enough to find
    // a real gap: each tree's *radius* is randomized too (18-38), and the camera orbits at
    // radius 10 — a tree that happens to land near the inner edge (18) comes within ~8 units of
    // the camera at closest approach, wide enough (atan(canopyRadius / 8) ~= 27° half-width) to
    // swallow a hand-picked 15° gap entirely on its own. So: compute each tree's actual
    // worst-case angular half-width from its real randomized radius, then find the real clear
    // gaps between the actual (sorted, jittered) tree angles, rather than guessing fixed angles
    // against an idealized evenly-spaced ring.
    const TREE_CANOPY_MAX_RADIUS = 4; // canopyGeo1's base radius — the widest tier, so the one that actually sets a tree's angular footprint
    const PIPE_RADIUS = 52; // outside the tree ring (radius 18-38), so pipes read as further out
    const PIPE_GAP_MARGIN = 0.09; // ~5° of extra clearance past each tree's computed exclusion edge
    const TWO_PI = Math.PI * 2;
    const normalizeAngle = (a: number) => ((a % TWO_PI) + TWO_PI) % TWO_PI;

    const treeHalfWidths = treePositions.map((t) => {
      const camDist = Math.max(1, Math.abs(t.radius - CAMERA_RADIUS)); // closest approach during orbit
      return Math.atan2(TREE_CANOPY_MAX_RADIUS, camDist);
    });
    const sortedTreeIdx = treePositions
      .map((_, i) => i)
      .sort((a, b) => treePositions[a].angle - treePositions[b].angle);

    interface TreeGap { mid: number; clearWidth: number; }
    const gaps: TreeGap[] = sortedTreeIdx.map((idx, i) => {
      const nextIdx = sortedTreeIdx[(i + 1) % sortedTreeIdx.length];
      const a = treePositions[idx].angle;
      let b = treePositions[nextIdx].angle;
      if (b <= a) b += TWO_PI; // wrap the last gap back around to the first tree
      const gapStart = a + treeHalfWidths[idx] + PIPE_GAP_MARGIN;
      const gapEnd = b - treeHalfWidths[nextIdx] - PIPE_GAP_MARGIN;
      return { mid: normalizeAngle((gapStart + gapEnd) / 2), clearWidth: gapEnd - gapStart };
    });

    // Pick the single widest-clearance gap within each 120°-wide third of the circle, so the
    // 3 pipes stay spread out around the scene instead of clustering into whichever gaps
    // happen to be largest overall.
    const pipePositions = [0, 1, 2].map((sector) => {
      const sectorStart = sector * (TWO_PI / 3);
      const sectorEnd = sectorStart + TWO_PI / 3;
      const candidates = gaps.filter((g) => g.mid >= sectorStart && g.mid < sectorEnd);
      const best = candidates.reduce(
        (max, g) => (g.clearWidth > max.clearWidth ? g : max),
        { mid: sectorStart + TWO_PI / 6, clearWidth: -Infinity }
      );
      return { x: Math.cos(best.mid) * PIPE_RADIUS, z: Math.sin(best.mid) * PIPE_RADIUS };
    });
    pipePositions.forEach((pos) => {
      const pipeGroup = new THREE.Group();

      const body = new THREE.Mesh(pipeBodyGeo, pipeBodyMat);
      body.position.y = 2;
      body.castShadow = true;
      body.receiveShadow = true;
      pipeGroup.add(body);

      const rim = new THREE.Mesh(pipeRimGeo, pipeRimMat);
      rim.position.y = 4.3;
      rim.castShadow = true;
      pipeGroup.add(rim);

      pipeGroup.position.set(pos.x, 0, pos.z);
      scene.add(pipeGroup);
    });

    // --- Marshmallow Clouds ---
    interface CloudUserData {
      speed: number;
      angle: number;
      dist: number;
    }
    const cloudGroup = new THREE.Group();
    const cloudMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1.0, flatShading: true });
    const cloudGeometries: THREE.BufferGeometry[] = [];

    // Breathing displacement, same onBeforeCompile technique as the grass wind shader below:
    // a GPU-side sin() offset per vertex costs nothing extra (it rides the same per-vertex
    // transform the GPU already does every frame) versus mutating BufferGeometry position
    // arrays on the CPU and re-uploading ~66 small buffers every frame. Phase is derived from
    // each vertex's own local position (decorrelates neighboring vertices on one blob, so the
    // blob swells organically rather than uniformly) plus each mesh's world position via
    // modelMatrix (decorrelates different blobs/clouds from each other) — no extra per-vertex
    // attribute buffers needed, unlike grass's aOffset (clouds are plain Meshes, not instanced).
    // Displacing along each vertex's own normal keeps the silhouette swelling/shrinking instead
    // of shearing, which is what reads as "breathing" rather than "wobbling."
    let cloudShader: THREE.WebGLProgramParametersWithUniforms | null = null;
    cloudMat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 };
      cloudShader = shader;

      shader.vertexShader =
        `
        uniform float uTime;
      ` + shader.vertexShader;

      shader.vertexShader = shader.vertexShader.replace(
        `#include <begin_vertex>`,
        `
        #include <begin_vertex>

        float cloudPhase = position.x * 0.9 + position.y * 1.3 + position.z * 0.7
          + modelMatrix[3].x * 0.15 + modelMatrix[3].y * 0.11 + modelMatrix[3].z * 0.09;
        float breathe = sin(uTime * 0.15 + cloudPhase) * 0.25;
        transformed += normalize(normal) * breathe;
        `
      );
    };

    for (let i = 0; i < 12; i++) {
      const singleCloud = new THREE.Group();
      const blobCount = 4 + Math.floor(Math.random() * 4);
      for (let b = 0; b < blobCount; b++) {
        const sphereGeo = new THREE.SphereGeometry(3 + Math.random() * 2, 7, 7);
        cloudGeometries.push(sphereGeo);
        const mesh = new THREE.Mesh(sphereGeo, cloudMat);
        mesh.position.set((b - blobCount / 2) * 2.5, (Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 2.0);
        singleCloud.add(mesh);
      }
      // Angle starts evenly spaced by index; dist/height/speed variance is kept small so
      // that even spacing holds up visually over time instead of drifting into clumps as
      // faster clouds lap slower ones.
      const angle = (i / 12) * Math.PI * 2;
      const dist = 68 + Math.random() * 16;
      singleCloud.position.set(Math.cos(angle) * dist, 40 + Math.random() * 8, Math.sin(angle) * dist);
      singleCloud.userData = { speed: 0.065 + Math.random() * 0.015, angle, dist } satisfies CloudUserData;
      cloudGroup.add(singleCloud);
    }
    scene.add(cloudGroup);

    // --- Flock of Low-Poly Birds ---
    interface BirdUserData {
      leftPivot: THREE.Group;
      rightPivot: THREE.Group;
      offsetAngle: number;
      radius: number;
      height: number;
      speed: number;
    }
    const birds: THREE.Group[] = [];
    const birdGroup = new THREE.Group();
    const birdMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.8, flatShading: true });

    const bodyGeo = new THREE.ConeGeometry(0.2, 0.8, 3);
    bodyGeo.rotateX(Math.PI / 2);
    const wingGeo = new THREE.BoxGeometry(1.2, 0.05, 0.3);

    for (let i = 0; i < 6; i++) {
      const bContainer = new THREE.Group();

      const body = new THREE.Mesh(bodyGeo, birdMat);
      bContainer.add(body);

      const leftWing = new THREE.Mesh(wingGeo, birdMat);
      leftWing.position.set(-0.6, 0, 0);
      const leftPivot = new THREE.Group();
      leftPivot.add(leftWing);
      bContainer.add(leftPivot);

      const rightWing = new THREE.Mesh(wingGeo, birdMat);
      rightWing.position.set(0.6, 0, 0);
      const rightPivot = new THREE.Group();
      rightPivot.add(rightWing);
      bContainer.add(rightPivot);

      bContainer.userData = {
        leftPivot,
        rightPivot,
        offsetAngle: (i / 6) * Math.PI * 2,
        radius: 25 + Math.random() * 15,
        height: 13 + Math.random() * 7,
        speed: 0.4 + Math.random() * 0.2,
      } satisfies BirdUserData;

      birdGroup.add(bContainer);
      birds.push(bContainer);
    }
    scene.add(birdGroup);

    // --- Sizing (container, not window) ---
    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width <= 0 || height <= 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    // --- Cursor-driven gaze (tripod pan/tilt — position never moves, only the look target) ---
    // Vertical only: horizontal cursor movement is ignored so it never fights the auto-orbit's
    // own horizontal sweep — the environment spins on its own like a globe, cursor only tilts it.
    let mouseTargetY = 0;
    let mouseSmoothY = 0;
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseTargetY = THREE.MathUtils.clamp(ny, -1, 1);
    };
    window.addEventListener('pointermove', handlePointerMove);

    // --- Animation Loop ---
    const clock = new THREE.Clock();
    let animationFrameId: number;
    let cameraAngle = 0;
    const forwardVec = new THREE.Vector3();
    const rightVec = new THREE.Vector3();
    const upVec = new THREE.Vector3();
    const lookTargetVec = new THREE.Vector3();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisibleRef.current) return;

      // clock.getElapsedTime() calls getDelta() internally — calling getDelta() again
      // right after measures only the gap between these two synchronous calls (~0), not
      // the real per-frame time. Call getDelta() once and read the accumulated total off
      // the instance instead (root cause of T-025: this starved every delta-driven effect —
      // camera auto-orbit and the cursor-gaze smoothing — while time-driven effects like the
      // wind shader and bird motion, which only ever called getElapsedTime(), stayed correct).
      const delta = clock.getDelta();
      const time = clock.elapsedTime;

      if (grassShader) {
        grassShader.uniforms.uTime.value = time;
      }

      if (cloudShader) {
        cloudShader.uniforms.uTime.value = time;
      }

      cloudGroup.children.forEach((cloud) => {
        const data = cloud.userData as CloudUserData;
        data.angle += data.speed * 0.01;
        cloud.position.x = Math.cos(data.angle) * data.dist;
        cloud.position.z = Math.sin(data.angle) * data.dist;
      });

      birds.forEach((bird) => {
        const data = bird.userData as BirdUserData;
        const angle = data.offsetAngle + time * data.speed * 0.3;

        const x = Math.cos(angle) * data.radius;
        const z = Math.sin(angle) * data.radius;
        const y = data.height + Math.sin(time + data.offsetAngle) * 3;

        bird.position.set(x, y, z);

        const nextAngle = angle + 0.01;
        const nx = Math.cos(nextAngle) * data.radius;
        const nz = Math.sin(nextAngle) * data.radius;
        bird.lookAt(nx, y, nz);

        const flap = Math.sin(time * 12.0 + data.offsetAngle) * 0.45;
        data.leftPivot.rotation.z = flap;
        data.rightPivot.rotation.z = -flap;
      });

      // Manual camera auto-orbit — replaces OrbitControls.autoRotate. Position only;
      // it never reacts to the cursor, matching a tripod's fixed point.
      cameraAngle += CAMERA_ORBIT_SPEED * delta;
      camera.position.set(
        CAMERA_TARGET.x + Math.sin(cameraAngle) * CAMERA_RADIUS,
        CAMERA_HEIGHT,
        CAMERA_TARGET.z + Math.cos(cameraAngle) * CAMERA_RADIUS
      );

      // Cursor-driven gaze — tripod pan/tilt, vertical only. Only the look target shifts (a
      // small world-space offset along the camera's local "up"), never camera.position, so
      // this reads as "looking up/down from a fixed point," not "moving the camera." Horizontal
      // cursor movement is intentionally not read here — the orbit already owns horizontal
      // motion, and blending cursor-driven horizontal into it would fight the globe-like spin.
      // Clamp delta for this calc only — a stalled/dropped frame would otherwise produce
      // a large one-off jump toward the cursor instead of a gradual ease, reading as a
      // jagged snap rather than a smooth pan.
      const smoothing = 1 - Math.exp(-CAMERA_LOOK_SMOOTHING * Math.min(delta, 0.1));
      mouseSmoothY += (mouseTargetY - mouseSmoothY) * smoothing;

      forwardVec.subVectors(CAMERA_TARGET, camera.position).normalize();
      rightVec.crossVectors(forwardVec, WORLD_UP).normalize();
      upVec.crossVectors(rightVec, forwardVec).normalize();

      // Sun follows the camera (behind + above + slightly to the side) instead of staying
      // fixed in world space. A world-fixed light eventually backlights the grass/trees as
      // the orbit turns past it; locking the light to the camera's own frame keeps the same
      // relative lighting angle at every orbit position.
      sunLight.position
        .copy(camera.position)
        .addScaledVector(forwardVec, -SUN_BACK_DISTANCE)
        .addScaledVector(rightVec, SUN_SIDE_OFFSET)
        .addScaledVector(WORLD_UP, SUN_HEIGHT_OFFSET);
      sunLight.target.position.copy(camera.position);

      lookTargetVec
        .copy(CAMERA_TARGET)
        .addScaledVector(upVec, mouseSmoothY * CAMERA_LOOK_OFFSET);

      camera.lookAt(lookTargetVec);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.InstancedMesh) {
          obj.geometry.dispose();
        }
      });
      [
        skyMat, groundMat, grassMat, trunkMat, canopyMat, cloudMat, birdMat,
        pipeBodyMat, pipeRimMat,
      ].forEach((m) => m.dispose());
      [...treeGeometries, ...cloudGeometries, bodyGeo, wingGeo, skyGeo, groundGeo].forEach((g) => g.dispose());

      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 ${className}`}
    >
      {webglUnavailable && (
        // Same sky-dome colors the WebGL scene uses (topColor/bottomColor above), so the
        // fallback reads as "the same background, just static" rather than a visibly broken page.
        <div className="absolute inset-0 bg-gradient-to-b from-[#0288d1] to-[#b3e5fc]" />
      )}
    </div>
  );
}
