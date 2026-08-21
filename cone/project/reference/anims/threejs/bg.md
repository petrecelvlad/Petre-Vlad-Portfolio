<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vibrant Casual Mobile Game - 3D Nature Field</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background-color: #000000;
        }
        canvas {
            display: block;
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body>
    <script type="importmap">
        {
            "imports": {
                "three": "https://esm.run/three",
                "three/addons/": "https://esm.run/three/examples/jsm/"
            }
        }
    </script>

    <script type="module">
        import * as THREE from 'three';
        import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

        // --- Scene, Camera, Renderer ---
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 2.0, 10);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild(renderer.domElement);

        // --- Orbit Controls ---
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.minPolarAngle = Math.PI / 3;
        controls.maxPolarAngle = Math.PI / 2 - 0.05;
        controls.minDistance = 2;
        controls.maxDistance = 25;
        controls.target.set(0, 2.5, 0);
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;

        // --- Lighting ---
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x2ECC71, 0.65);
        hemiLight.position.set(0, 50, 0);
        scene.add(hemiLight);

        const sunLight = new THREE.DirectionalLight(0xfff5cc, 1.8);
        sunLight.position.set(40, 60, 40);
        sunLight.castShadow = true;
        sunLight.shadow.mapSize.width = 2048;
        sunLight.shadow.mapSize.height = 2048;
        sunLight.shadow.camera.near = 0.5;
        sunLight.shadow.camera.far = 200;
        const d = 60;
        sunLight.shadow.camera.left = -d;
        sunLight.shadow.camera.right = d;
        sunLight.shadow.camera.top = d;
        sunLight.shadow.camera.bottom = -d;
        sunLight.shadow.bias = -0.0005;
        scene.add(sunLight);

        // --- Sky Dome with Gradient ---
        const skyGeo = new THREE.SphereGeometry(500, 32, 15);
        const skyMat = new THREE.ShaderMaterial({
            uniforms: {
                topColor: { value: new THREE.Color(0x0288D1) },
                bottomColor: { value: new THREE.Color(0xB3E5FC) }
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
            side: THREE.BackSide
        });
        const sky = new THREE.Mesh(skyGeo, skyMat);
        scene.add(sky);

        // --- Ground Terrain ---
        const groundGeo = new THREE.CylinderGeometry(120, 120, 2, 64);
        const groundMat = new THREE.MeshStandardMaterial({
            color: 0x1e8449,
            roughness: 0.8,
            metalness: 0.1,
            flatShading: true
        });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.position.y = -1;
        ground.receiveShadow = true;
        scene.add(ground);

        // --- Instanced Grass with Wind Shader ---
        const grassCount = 12000;
        const grassGeoBase = new THREE.ConeGeometry(0.25, 0.85, 3, 1);
        grassGeoBase.translate(0, 0.85 / 2, 0); // pivot at base

        const grassMat = new THREE.MeshStandardMaterial({
            color: 0x2ECC71,
            roughness: 0.4,
            metalness: 0.1,
            flatShading: true
        });

        // Inject wind animation via onBeforeCompile
        grassMat.onBeforeCompile = (shader) => {
            shader.uniforms.uTime = { value: 0 };
            grassMat.userData.shader = shader;
            
            shader.vertexShader = `
                uniform float uTime;
                attribute vec3 aOffset;
                attribute float aScale;
                attribute float aRotation;
            ` + shader.vertexShader;

            // Replace standard position transformation with instanced & wind-swayed transformation
            shader.vertexShader = shader.vertexShader.replace(
                `#include <begin_vertex>`,
                `
                #include <begin_vertex>
                
                // Scale & rotate base geometry
                transformed *= aScale;
                
                // Wind sway calculation (quadratic tip bending)
                float heightFactor = position.y / 0.85; 
                float bendAmount = heightFactor * heightFactor * 0.35;
                
                float windWave = sin(uTime * 2.5 + aOffset.x * 0.5 + aOffset.z * 0.5);
                transformed.x += windWave * bendAmount;
                transformed.z += cos(uTime * 2.0 + aOffset.x * 0.3) * bendAmount * 0.5;

                // Instance rotation around Y
                float s = sin(aRotation);
                float c = cos(aRotation);
                mat3 rotY = mat3(
                     c, 0.0,  s,
                   0.0, 1.0, 0.0,
                    -s, 0.0,  c
                );
                transformed = rotY * transformed;

                // Instance translation
                transformed += aOffset;
                `
            );
        };

        const grassInstancedMesh = new THREE.InstancedMesh(grassGeoBase, grassMat, grassCount);
        grassInstancedMesh.castShadow = true;
        grassInstancedMesh.receiveShadow = true;

        const offsets = [];
        const scales = [];
        const rotations = [];

        const dummy = new THREE.Object3D();
        for (let i = 0; i < grassCount; i++) {
            // Distribute densely around camera, clearing a small central path
            const radius = 3 + Math.random() * 80;
            const theta = Math.random() * Math.PI * 2;
            const x = Math.cos(theta) * radius;
            const z = Math.sin(theta) * radius;

            offsets.push(x, 0, z);
            const scale = 0.6 + Math.random() * 0.8;
            scales.push(scale);
            rotations.push(Math.random() * Math.PI * 2);

            dummy.position.set(x, 0, z);
            dummy.scale.setScalar(scale);
            dummy.rotation.y = rotations[i];
            dummy.updateMatrix();
            grassInstancedMesh.setMatrixAt(i, dummy.matrix);
        }

        grassGeoBase.setAttribute('aOffset', new THREE.InstancedBufferAttribute(new Float32Array(offsets), 3));
        grassGeoBase.setAttribute('aScale', new THREE.InstancedBufferAttribute(new Float32Array(scales), 1));
        grassGeoBase.setAttribute('aRotation', new THREE.InstancedBufferAttribute(new Float32Array(rotations), 1));

        scene.add(grassInstancedMesh);

        // --- Stylized Cartoon Trees ---
        const treePositions = [
            { x: -15, z: -15 },
            { x: 18, z: -20 },
            { x: -25, z: 10 },
            { x: 22, z: 15 },
            { x: -8, z: -35 },
            { x: 10, z: -30 },
            { x: 30, z: -5 },
            { x: -35, z: -10 }
        ];

        treePositions.forEach(pos => {
            const treeGroup = new THREE.Group();
            
            // Trunk
            const trunkGeo = new THREE.CylinderGeometry(0.6, 0.9, 5, 6);
            const trunkMat = new THREE.MeshStandardMaterial({ color: 0x795548, roughness: 0.9, flatShading: true });
            const trunk = new THREE.Mesh(trunkGeo, trunkMat);
            trunk.position.y = 2.5;
            trunk.castShadow = true;
            trunk.receiveShadow = true;
            treeGroup.add(trunk);

            // Canopies (stacked cones/icosahedrons)
            const canopyMat = new THREE.MeshStandardMaterial({ color: 0x27AE60, roughness: 0.5, flatShading: true });
            
            const canopy1 = new THREE.Mesh(new THREE.ConeGeometry(4, 5, 5), canopyMat);
            canopy1.position.y = 5.0;
            canopy1.castShadow = true;
            treeGroup.add(canopy1);

            const canopy2 = new THREE.Mesh(new THREE.ConeGeometry(3, 4, 5), canopyMat);
            canopy2.position.y = 7.5;
            canopy2.castShadow = true;
            treeGroup.add(canopy2);

            const canopy3 = new THREE.Mesh(new THREE.ConeGeometry(1.8, 3, 5), canopyMat);
            canopy3.position.y = 9.5;
            canopy3.castShadow = true;
            treeGroup.add(canopy3);

            treeGroup.position.set(pos.x, 0, pos.z);
            scene.add(treeGroup);
        });

        // --- Marshmallow Clouds ---
        const cloudGroup = new THREE.Group();
        const cloudMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1.0, flatShading: true });
        
        for (let i = 0; i < 12; i++) {
            const singleCloud = new THREE.Group();
            const blobCount = 4 + Math.floor(Math.random() * 4);
            for (let b = 0; b < blobCount; b++) {
                const sphereGeo = new THREE.SphereGeometry(3 + Math.random() * 2, 7, 7);
                const mesh = new THREE.Mesh(sphereGeo, cloudMat);
                mesh.position.set(
                    (b - blobCount / 2) * 2.5,
                    (Math.random() - 0.5) * 1.5,
                    (Math.random() - 0.5) * 2.0
                );
                singleCloud.add(mesh);
            }
            const angle = (i / 12) * Math.PI * 2;
            const dist = 60 + Math.random() * 40;
            singleCloud.position.set(
                Math.cos(angle) * dist,
                35 + Math.random() * 20,
                Math.sin(angle) * dist
            );
            singleCloud.userData = { speed: 0.05 + Math.random() * 0.05, angle: angle, dist: dist };
            cloudGroup.add(singleCloud);
        }
        scene.add(cloudGroup);

        // --- Flock of Low-Poly Birds ---
        const birds = [];
        const birdGroup = new THREE.Group();
        const birdMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.8, flatShading: true });

        for (let i = 0; i < 6; i++) {
            const bContainer = new THREE.Group();

            // Body
            const bodyGeo = new THREE.ConeGeometry(0.2, 0.8, 3);
            bodyGeo.rotateX(Math.PI / 2);
            const body = new THREE.Mesh(bodyGeo, birdMat);
            bContainer.add(body);

            // Wings
            const wingGeo = new THREE.BoxGeometry(1.2, 0.05, 0.3);
            
            const leftWing = new THREE.Mesh(wingGeo, birdMat);
            leftWing.position.set(-0.6, 0, 0);
            const leftPivot = new THREE.Group();
            leftPivot.position.set(0, 0, 0);
            leftPivot.add(leftWing);
            bContainer.add(leftPivot);

            const rightWing = new THREE.Mesh(wingGeo, birdMat);
            rightWing.position.set(0.6, 0, 0);
            const rightPivot = new THREE.Group();
            rightPivot.position.set(0, 0, 0);
            rightPivot.add(rightWing);
            bContainer.add(rightPivot);

            bContainer.userData = {
                leftPivot: leftPivot,
                rightPivot: rightPivot,
                offsetAngle: (i / 6) * Math.PI * 2,
                radius: 25 + Math.random() * 15,
                height: 20 + Math.random() * 10,
                speed: 0.4 + Math.random() * 0.2
            };

            birdGroup.add(bContainer);
            birds.push(bContainer);
        }
        scene.add(birdGroup);

        // --- Window Resize Handling ---
        window.addEventListener('resize', onWindowResize);
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        // --- Performance & Visibility Control ---
        let isVisible = true;
        const observer = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting;
        }, { threshold: 0.1 });
        observer.observe(renderer.domElement);

        document.addEventListener('visibilitychange', () => {
            isVisible = !document.hidden;
        });

        // --- Animation Loop ---
        const clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);

            if (!isVisible) return;

            const time = clock.getElapsedTime();

            // Update wind uniform in grass shader
            if (grassMat.userData.shader) {
                grassMat.userData.shader.uniforms.uTime.value = time;
            }

            // Animate clouds orbiting sky
            cloudGroup.children.forEach(cloud => {
                cloud.userData.angle += cloud.userData.speed * 0.01;
                cloud.position.x = Math.cos(cloud.userData.angle) * cloud.userData.dist;
                cloud.position.z = Math.sin(cloud.userData.angle) * cloud.userData.dist;
            });

            // Animate birds flying and flapping wings
            birds.forEach(bird => {
                const data = bird.userData;
                const angle = data.offsetAngle + time * data.speed * 0.3;
                
                const x = Math.cos(angle) * data.radius;
                const z = Math.sin(angle) * data.radius;
                const y = data.height + Math.sin(time + data.offsetAngle) * 3;

                bird.position.set(x, y, z);
                
                // Face direction of flight
                const nextAngle = angle + 0.01;
                const nx = Math.cos(nextAngle) * data.radius;
                const nz = Math.sin(nextAngle) * data.radius;
                bird.lookAt(nx, y, nz);

                // Flap wings
                const flap = Math.sin(time * 12.0 + data.offsetAngle) * 0.45;
                data.leftPivot.rotation.z = flap;
                data.rightPivot.rotation.z = -flap;
            });

            controls.update();
            renderer.render(scene, camera);
        }

        animate();
    </script>
</body>
</html>