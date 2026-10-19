import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ArchitecturalSpiralCanvasProps {
  scrollProgress: number; // 0 to 1
  onLoaded?: () => void;
}

export function ArchitecturalSpiralCanvas({
  scrollProgress,
  onLoaded,
}: ArchitecturalSpiralCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. Scene & Deep Midnight Navy Fog
    const scene = new THREE.Scene();
    const midnightNavy = new THREE.Color(0x030714);
    scene.background = midnightNavy;
    scene.fog = new THREE.FogExp2(0x030714, isMobile ? 0.028 : 0.02);

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      900,
    );
    camera.position.set(0, 48, 26);

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 3. Cinematic Midnight Navy & Chrome Lighting
    const ambientLight = new THREE.AmbientLight(0x0a1636, 1.8); // Deep Navy Ambient
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xf8fafc, 3.2); // Crisp Silver Key
    keyLight.position.set(35, 75, 45);
    scene.add(keyLight);

    const silverRimLight = new THREE.PointLight(0xe2e8f0, 4.0, 110); // Chrome Rim
    silverRimLight.position.set(0, 25, 0);
    scene.add(silverRimLight);

    const deepNavyFillLight = new THREE.PointLight(0x1e3a8a, 3.5, 120); // Deep Navy Counter Fill
    deepNavyFillLight.position.set(-25, -20, -15);
    scene.add(deepNavyFillLight);

    // 4. Monumental Architectural Spiral Structure (Metallic Silver & Chrome)
    class SpiralCurve extends THREE.Curve<THREE.Vector3> {
      turns: number;
      height: number;
      baseRadius: number;
      constructor(turns = 4.2, height = 150, baseRadius = 22) {
        super();
        this.turns = turns;
        this.height = height;
        this.baseRadius = baseRadius;
      }
      override getPoint(t: number, optionalTarget = new THREE.Vector3()) {
        const angle = t * Math.PI * 2 * this.turns;
        const radius = this.baseRadius + Math.sin(t * Math.PI) * 6 + (t - 0.5) * 5;
        const x = Math.cos(angle) * radius;
        const y = (0.5 - t) * this.height;
        const z = Math.sin(angle) * radius;
        return optionalTarget.set(x, y, z);
      }
    }

    const curve = new SpiralCurve(4.4, 160, 24);
    const tubeSegments = isMobile ? 160 : 360;
    const tubeRadius = isMobile ? 1.8 : 2.4;
    const radialSegments = isMobile ? 8 : 16;

    // Primary Monumental Metallic Silver Ribbon
    const ribbonGeo = new THREE.TubeGeometry(
      curve,
      tubeSegments,
      tubeRadius,
      radialSegments,
      false,
    );
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0xd8e0ea, // Polished Metallic Silver
      roughness: 0.18, // High Specular Reflection
      metalness: 0.95, // Pure Metallic Chrome
    });
    const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
    scene.add(ribbonMesh);

    // Inner Polished Chrome Rim Edge
    class InnerCurve extends THREE.Curve<THREE.Vector3> {
      constructor() {
        super();
      }
      override getPoint(t: number, optionalTarget = new THREE.Vector3()) {
        const p = curve.getPoint(t, optionalTarget);
        p.x *= 0.94;
        p.z *= 0.94;
        return p;
      }
    }
    const innerGeo = new THREE.TubeGeometry(new InnerCurve(), isMobile ? 120 : 260, 0.4, 6, false);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xffffff, // Pure Chrome Highlight
      roughness: 0.08,
      metalness: 0.98,
      emissive: 0x1a2647, // Subtle Navy Glow Underneath
      emissiveIntensity: 0.25,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // Architectural Concentric Silver Torus Frames
    const ringCount = isMobile ? 10 : 20;
    const ringsGroup = new THREE.Group();
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8, // Brushed Silver
      roughness: 0.25,
      metalness: 0.9,
    });

    for (let i = 0; i < ringCount; i++) {
      const t = i / ringCount;
      const pt = curve.getPoint(t);
      const ringRadius = 5.5 + (i % 3) * 2.5;
      const ringGeo = new THREE.TorusGeometry(ringRadius, 0.22, 6, isMobile ? 24 : 48);
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pt);
      ring.rotation.x = Math.PI / 2 + (i % 4) * 0.12;
      ring.rotation.y = t * Math.PI * 4;
      ringsGroup.add(ring);
    }
    scene.add(ringsGroup);

    // 5. Subtle Floating Silver Dust Particles
    const particleCount = isMobile ? 300 : 900;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 7 + Math.random() * 42;
      positions[i * 3] = Math.cos(angle) * dist;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 160;
      positions[i * 3 + 2] = Math.sin(angle) * dist;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xe2e8f0, // Silver Dust
      size: isMobile ? 0.22 : 0.32,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Smooth Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    const currentCamPos = camera.position.clone();
    const targetCamPos = new THREE.Vector3();
    const currentLookAt = new THREE.Vector3(0, 42, 0);
    const targetLookAt = new THREE.Vector3();

    if (onLoaded) {
      setTimeout(onLoaded, 300);
    }

    // 7. Slow, Elegant & Controlled Camera Motion Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      // Slow, subtle ambient drift (NOT spinning constantly)
      particles.rotation.y = elapsedTime * 0.012;
      ringsGroup.rotation.y = Math.sin(elapsedTime * 0.1) * 0.02;

      const p = prefersReducedMotion ? 0.1 : Math.max(0, Math.min(1, scrollRef.current));

      // As user approaches the end (p > 0.85): environment darkens into near-black midnight navy
      if (p > 0.82) {
        const fadeFactor = (p - 0.82) / 0.18;
        const targetColor = new THREE.Color(0x030714).lerp(new THREE.Color(0x010309), fadeFactor);
        scene.background = targetColor;
        if (scene.fog instanceof THREE.FogExp2) {
          scene.fog.color = targetColor;
        }
        ribbonMat.opacity = 1 - fadeFactor * 0.65;
        ribbonMat.transparent = true;
      } else {
        scene.background = midnightNavy;
        if (scene.fog instanceof THREE.FogExp2) {
          scene.fog.color = midnightNavy;
        }
        ribbonMat.opacity = 1;
        ribbonMat.transparent = false;
      }

      // Camera coordinates progressing smoothly through the architectural spiral
      const camAngle = p * Math.PI * 3.6 + 0.35;
      const camRadius = 18 - p * 5.5 + (isMobile ? 7 : 0);
      const camHeight = 48 - p * 120;

      targetCamPos.set(
        Math.cos(camAngle) * camRadius + mouseX * (isMobile ? 1 : 2.2),
        camHeight - mouseY * (isMobile ? 1 : 2.2),
        Math.sin(camAngle) * camRadius + (1 - p) * 10,
      );

      const lookAngle = (p + 0.08) * Math.PI * 3.6 + 0.35;
      const lookHeight = 40 - (p + 0.08) * 120;

      targetLookAt.set(Math.cos(lookAngle) * 5.5, lookHeight, Math.sin(lookAngle) * 5.5);

      currentCamPos.lerp(targetCamPos, 0.05);
      currentLookAt.lerp(targetLookAt, 0.05);

      camera.position.copy(currentCamPos);
      camera.lookAt(currentLookAt);

      silverRimLight.position.set(
        currentCamPos.x * 0.5,
        currentCamPos.y + 3,
        currentCamPos.z * 0.5,
      );

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      ribbonGeo.dispose();
      ribbonMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onLoaded]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none w-screen h-screen overflow-hidden"
      aria-hidden="true"
    />
  );
}
