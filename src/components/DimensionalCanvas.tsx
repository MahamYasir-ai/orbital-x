import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface DimensionalCanvasProps {
  activeSection: string;
  scrollProgress: number; // 0 to 1
  isAnomalyActive: boolean;
}

export function DimensionalCanvas({
  activeSection,
  scrollProgress,
  isAnomalyActive,
}: DimensionalCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // References to dynamic objects
  const starsRef = useRef<THREE.Points | null>(null);
  const portalRingsRef = useRef<THREE.Group | null>(null);
  const spacecraftGroupRef = useRef<THREE.Group | null>(null);
  const planetMeshRef = useRef<THREE.Mesh | null>(null);
  const planetAtmosphereRef = useRef<THREE.Mesh | null>(null);
  const unknownStructureRef = useRef<THREE.Group | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check device capabilities
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 1200 : 3500;

    // SCENE & CAMERA
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020408, 0.015);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 20);
    cameraRef.current = camera;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 1. STAR & PARTICLE WARP FIELD
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(particleCount * 3);
    const starColors = new Float32Array(particleCount * 3);
    const starSpeeds = new Float32Array(particleCount);

    const color1 = new THREE.Color(0x00f0ff);
    const color2 = new THREE.Color(0xffffff);
    const color3 = new THREE.Color(0x8a2be2);

    for (let i = 0; i < particleCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 120;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 120;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 200;

      // Color distribution: mostly white/cyan with subtle violet
      const pick = Math.random();
      const c = pick < 0.6 ? color2 : pick < 0.85 ? color1 : color3;
      starColors[i * 3] = c.r;
      starColors[i * 3 + 1] = c.g;
      starColors[i * 3 + 2] = c.b;

      starSpeeds[i] = 0.5 + Math.random() * 1.5;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    // Particle texture generator via canvas
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.3, 'rgba(0,240,255,0.8)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTex = new THREE.CanvasTexture(canvas);

    const starMat = new THREE.PointsMaterial({
      size: isMobile ? 0.7 : 1.2,
      map: particleTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);
    starsRef.current = stars;

    // 2. DIMENSIONAL PORTAL (GEOMETRIC RINGS & HYPER-STRUCTURE)
    const portalGroup = new THREE.Group();
    portalGroup.position.set(0, 0, -25);

    // Three concentric geometric rings
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x7928ca,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });

    const torus1 = new THREE.Mesh(new THREE.TorusGeometry(8, 0.08, 16, 64), ringMat1);
    const torus2 = new THREE.Mesh(new THREE.TorusGeometry(12, 0.06, 16, 80), ringMat2);
    const torus3 = new THREE.Mesh(new THREE.TorusGeometry(16, 0.05, 16, 96), ringMat3);
    const coreIco = new THREE.Mesh(new THREE.IcosahedronGeometry(4, 1), ringMat1);

    portalGroup.add(torus1);
    portalGroup.add(torus2);
    portalGroup.add(torus3);
    portalGroup.add(coreIco);
    scene.add(portalGroup);
    portalRingsRef.current = portalGroup;

    // 3. 3D PROCEDURAL SPACECRAFT VESSEL X-01
    const craftGroup = new THREE.Group();
    craftGroup.position.set(0, -1, 0);

    // Fuselage (Sleek elongated diamond hull)
    const hullGeo = new THREE.ConeGeometry(1.6, 9, 6);
    hullGeo.rotateX(Math.PI / 2);
    const hullMat = new THREE.MeshStandardMaterial({
      color: 0x111622,
      metalness: 0.85,
      roughness: 0.25,
    });
    const hull = new THREE.Mesh(hullGeo, hullMat);

    // Cabin Visor / Cockpit
    const visorGeo = new THREE.SphereGeometry(0.7, 16, 16);
    visorGeo.scale(1, 0.5, 2.5);
    visorGeo.translate(0, 0.6, 1.2);
    const visorMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00a3cc,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.9,
    });
    const visor = new THREE.Mesh(visorGeo, visorMat);

    // Graphene Solar Wings / Radiator fins
    const wingGeo = new THREE.BoxGeometry(11, 0.05, 2.8);
    wingGeo.translate(0, 0, -1);
    const wingMat = new THREE.MeshStandardMaterial({
      color: 0x080c14,
      metalness: 0.9,
      roughness: 0.2,
    });
    const wings = new THREE.Mesh(wingGeo, wingMat);

    // Photovoltaic grid lines on wings (subtle cyan wireframe)
    const wingWireGeo = new THREE.WireframeGeometry(wingGeo);
    const wingWireMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.35,
    });
    const wingLines = new THREE.LineSegments(wingWireGeo, wingWireMat);
    wingLines.position.copy(wings.position);

    // Ion Propulsion Engine Thrusters (Rear)
    const engineGeo = new THREE.CylinderGeometry(0.5, 0.7, 1.5, 16);
    engineGeo.rotateX(Math.PI / 2);
    engineGeo.translate(0, 0, -4.5);
    const engineMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.9,
    });
    const engine = new THREE.Mesh(engineGeo, engineMat);

    // Ion Plume (glowing cylinder with cyan light)
    const plumeGeo = new THREE.ConeGeometry(0.6, 3, 16);
    plumeGeo.rotateX(-Math.PI / 2);
    plumeGeo.translate(0, 0, -6.2);
    const plumeMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.85,
    });
    const plume = new THREE.Mesh(plumeGeo, plumeMat);

    craftGroup.add(hull);
    craftGroup.add(visor);
    craftGroup.add(wings);
    craftGroup.add(wingLines);
    craftGroup.add(engine);
    craftGroup.add(plume);
    scene.add(craftGroup);
    spacecraftGroupRef.current = craftGroup;

    // 4. PLANETARY EXPLORATION SPHERE (Earth / World 04)
    const planetGeo = new THREE.SphereGeometry(6, 48, 48);
    // Procedural canvas texture for planet
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 512;
    pCanvas.height = 256;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      pCtx.fillStyle = '#0f172a';
      pCtx.fillRect(0, 0, 512, 256);
      // Fictional continents & craters
      pCtx.fillStyle = '#1e3a8a';
      for (let i = 0; i < 40; i++) {
        pCtx.beginPath();
        pCtx.arc(
          Math.random() * 512,
          Math.random() * 256,
          20 + Math.random() * 50,
          0,
          Math.PI * 2
        );
        pCtx.fill();
      }
      pCtx.fillStyle = '#38bdf8';
      for (let i = 0; i < 20; i++) {
        pCtx.beginPath();
        pCtx.arc(
          Math.random() * 512,
          Math.random() * 256,
          8 + Math.random() * 20,
          0,
          Math.PI * 2
        );
        pCtx.fill();
      }
    }
    const planetTex = new THREE.CanvasTexture(pCanvas);
    const planetMat = new THREE.MeshStandardMaterial({
      map: planetTex,
      roughness: 0.7,
      metalness: 0.2,
    });
    const planetMesh = new THREE.Mesh(planetGeo, planetMat);
    planetMesh.position.set(12, -4, -10);

    // Atmosphere glow rim
    const atmoGeo = new THREE.SphereGeometry(6.3, 32, 32);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(atmoGeo, atmoMat);
    planetMesh.add(atmosphere);

    scene.add(planetMesh);
    planetMeshRef.current = planetMesh;
    planetAtmosphereRef.current = atmosphere;

    // 5. UNKNOWN MEGASTRUCTURE (Dim 04 / The Unknown)
    const unknownGroup = new THREE.Group();
    unknownGroup.position.set(0, 0, -40);

    const octGeo = new THREE.OctahedronGeometry(14, 2);
    const octMat = new THREE.MeshBasicMaterial({
      color: 0x7928ca,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const oct = new THREE.Mesh(octGeo, octMat);

    const haloGeo = new THREE.TorusGeometry(18, 0.15, 16, 90);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.rotateX(Math.PI / 3);

    unknownGroup.add(oct);
    unknownGroup.add(halo);
    scene.add(unknownGroup);
    unknownStructureRef.current = unknownGroup;

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 1.8);
    dirLight1.position.set(15, 20, 15);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x7928ca, 1.2);
    dirLight2.position.set(-15, -10, -10);
    scene.add(dirLight2);

    // MOUSE LISTENER
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // RESIZE LISTENER
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // 1. Particle Warp Animation
      if (starsRef.current) {
        const positions = starsRef.current.geometry.attributes.position.array as Float32Array;
        // Warp velocity depends on anomaly, scroll progress, or section
        let warpSpeed = 0.6;
        if (isAnomalyActive) warpSpeed = 3.5;
        else if (activeSection === 'tunnel' || activeSection === 'final-dimension') warpSpeed = 2.2;
        else if (activeSection === 'hero') warpSpeed = 0.8;

        for (let i = 0; i < particleCount; i++) {
          positions[i * 3 + 2] += starSpeeds[i] * warpSpeed;

          // Recycle particle once past camera
          if (positions[i * 3 + 2] > 25) {
            positions[i * 3 + 2] = -160;
            positions[i * 3] = (Math.random() - 0.5) * 120;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
          }
        }
        starsRef.current.geometry.attributes.position.needsUpdate = true;
        starsRef.current.rotation.z = time * 0.02;
      }

      // 2. Portal animation
      if (portalRingsRef.current) {
        portalRingsRef.current.rotation.z = time * 0.15;
        portalRingsRef.current.rotation.x = Math.sin(time * 0.2) * 0.15;
        portalRingsRef.current.rotation.y = time * 0.1;
      }

      // 3. Spacecraft animation & mouse track
      if (spacecraftGroupRef.current) {
        const craft = spacecraftGroupRef.current;
        craft.rotation.y = Math.sin(time * 0.3) * 0.15 + mouseRef.current.x * 0.4;
        craft.rotation.x = Math.cos(time * 0.4) * 0.1 - mouseRef.current.y * 0.3;
        craft.rotation.z = -mouseRef.current.x * 0.2;
        craft.position.y = -1 + Math.sin(time * 0.8) * 0.3;

        // Animate thruster plume flicker
        if (plume) {
          const flicker = 0.85 + Math.sin(time * 25) * 0.15;
          plume.scale.set(flicker, flicker, flicker * (1 + Math.sin(time * 12) * 0.2));
        }
      }

      // 4. Planet rotation
      if (planetMeshRef.current) {
        planetMeshRef.current.rotation.y = time * 0.05;
        planetMeshRef.current.rotation.x = 0.2;
      }

      // 5. Unknown Megastructure slow rotation
      if (unknownStructureRef.current) {
        unknownStructureRef.current.rotation.y = time * 0.04;
        unknownStructureRef.current.rotation.x = time * 0.02;
      }

      // 6. Camera choreographing based on active section
      if (cameraRef.current) {
        let targetZ = 20;
        let targetX = mouseRef.current.x * 1.5;
        let targetY = mouseRef.current.y * 1.2;

        if (activeSection === 'hero') {
          targetZ = 22;
          if (spacecraftGroupRef.current) spacecraftGroupRef.current.position.set(0, -0.8, 6);
          if (portalRingsRef.current) portalRingsRef.current.position.set(0, 0, -18);
          if (planetMeshRef.current) planetMeshRef.current.position.set(16, -6, -25);
        } else if (activeSection === 'tunnel') {
          targetZ = 12;
          if (spacecraftGroupRef.current) spacecraftGroupRef.current.position.set(0, -15, -40);
        } else if (activeSection === 'spacecraft' || activeSection === 'vessel') {
          targetZ = 15;
          if (spacecraftGroupRef.current) {
            spacecraftGroupRef.current.position.set(2, 0, 3);
          }
          if (planetMeshRef.current) planetMeshRef.current.position.set(-20, -5, -30);
        } else if (activeSection === 'planet' || activeSection === 'world') {
          targetZ = 18;
          if (planetMeshRef.current) {
            planetMeshRef.current.position.set(0, 0, -2);
          }
          if (spacecraftGroupRef.current) spacecraftGroupRef.current.position.set(15, 8, -10);
        } else if (activeSection === 'mission-control') {
          targetZ = 24;
          if (planetMeshRef.current) planetMeshRef.current.position.set(8, -2, 2);
        } else if (activeSection === 'unknown') {
          targetZ = 16;
          if (unknownStructureRef.current) unknownStructureRef.current.position.set(0, 0, -5);
        } else {
          targetZ = 20;
        }

        cameraRef.current.position.x += (targetX - cameraRef.current.position.x) * 0.05;
        cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * 0.05;
        cameraRef.current.position.z += (targetZ - cameraRef.current.position.z) * 0.05;
        cameraRef.current.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      starGeo.dispose();
      starMat.dispose();
      particleTex.dispose();
    };
  }, [activeSection, isAnomalyActive]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.95 }}
      aria-hidden="true"
    />
  );
}
