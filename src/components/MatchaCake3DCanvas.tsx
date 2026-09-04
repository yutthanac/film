"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  createCakeMaterials,
  buildCakePlate,
  buildBottomTier,
  buildTopTier,
  buildToppings,
  buildCandle,
  buildSmokeParticles,
  disposeScene,
} from "./MatchaCake3DModel";

interface MatchaCake3DCanvasProps {
  isLit: boolean;
  onCandleClick: () => void;
}

export default function MatchaCake3DCanvas({
  isLit,
  onCandleClick,
}: MatchaCake3DCanvasProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const flameMeshesRef = useRef<THREE.Mesh[]>([]);
  const flameLightRef = useRef<THREE.PointLight | null>(null);
  const smokeParticlesRef = useRef<THREE.Points | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  const [isRotating, setIsRotating] = useState(true);

  // Sync auto-rotation dynamically without recreating the whole Three.js scene
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isRotating;
    }
  }, [isRotating]);

  // Main Three.js Scene Setup
  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 380;
    const height = 400;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 4.0, 9.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    currentMount.appendChild(renderer.domElement);

    // 2. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = isRotating;
    controls.autoRotateSpeed = 1.2;
    controls.minDistance = 5.0;
    controls.maxDistance = 14;
    controls.maxPolarAngle = Math.PI / 2 + 0.05;
    controls.minPolarAngle = 0.2;
    controls.target.set(0, 1.1, 0);
    controlsRef.current = controls;

    // 3. Cake Group & Lighting
    const cakeGroup = new THREE.Group();
    scene.add(cakeGroup);

    const ambientLight = new THREE.AmbientLight(0xfff9f0, 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffbf0, 2.3);
    sunLight.position.set(6, 12, 8);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.set(1024, 1024);
    sunLight.shadow.bias = -0.001;
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0xa7f3d0, 1.0);
    rimLight.position.set(-6, 8, -6);
    scene.add(rimLight);

    // Ambient candle glow for number 22
    const flameLight = new THREE.PointLight(0xff9f1c, isLit ? 3.4 : 0, 6, 1.2);
    flameLight.position.set(0, 3.5, 0);
    flameLight.castShadow = true;
    flameLight.shadow.bias = -0.002;
    cakeGroup.add(flameLight);
    flameLightRef.current = flameLight;

    // 4. Build Modular Cake Components
    const materials = createCakeMaterials();
    buildCakePlate(cakeGroup, materials);
    buildBottomTier(cakeGroup, materials);
    buildTopTier(cakeGroup, materials);
    buildToppings(cakeGroup, materials);

    // Number 22 candle with dual flames
    const flames = buildCandle(cakeGroup, materials, isLit);
    flameMeshesRef.current = flames;

    const smoke = buildSmokeParticles(cakeGroup, isLit);
    smokeParticlesRef.current = smoke;

    // 5. Pointer Interaction (Distinguish click vs drag)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let pointerDownPos = { x: 0, y: 0 };

    const handlePointerDown = (event: PointerEvent) => {
      pointerDownPos = { x: event.clientX, y: event.clientY };
    };

    const handlePointerUp = (event: PointerEvent) => {
      const dist = Math.hypot(event.clientX - pointerDownPos.x, event.clientY - pointerDownPos.y);
      if (dist < 6) {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(cakeGroup.children, true);
        if (intersects.length > 0) {
          onCandleClick();
        }
      }
    };

    const domEl = renderer.domElement;
    domEl.addEventListener("pointerdown", handlePointerDown);
    domEl.addEventListener("pointerup", handlePointerUp);

    // 6. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      controls.update();

      // Flame flicker for both number 2 candles
      if (flameMeshesRef.current.length > 0 && isLit) {
        flameMeshesRef.current.forEach((flame, idx) => {
          const offset = idx * 2.5;
          const flicker = 1 + Math.sin(elapsedTime * 14 + offset) * 0.1 + Math.cos(elapsedTime * 24 + offset) * 0.06;
          flame.scale.set(flicker, flicker, flicker);
        });

        if (flameLightRef.current) {
          flameLightRef.current.intensity = 2.8 + Math.sin(elapsedTime * 18) * 0.6;
        }
      }

      // Smoke rise
      if (!isLit && smokeParticlesRef.current) {
        const positions = smokeParticlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] += 0.015;
          if (positions[i] > 5.0) {
            positions[i] = 3.4;
          }
        }
        smokeParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 7. Responsive Resize
    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth || 380;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    };

    window.addEventListener("resize", handleResize);

    // 8. Cleanup & Disposal
    return () => {
      cancelAnimationFrame(animationFrameId);
      domEl.removeEventListener("pointerdown", handlePointerDown);
      domEl.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      disposeScene(scene);
      renderer.dispose();
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, [onCandleClick]);

  // Handle candle flames toggle
  useEffect(() => {
    flameMeshesRef.current.forEach((flame) => {
      flame.visible = isLit;
    });

    if (flameLightRef.current) {
      flameLightRef.current.intensity = isLit ? 3.4 : 0;
    }

    if (smokeParticlesRef.current) {
      const mat = smokeParticlesRef.current.material as THREE.PointsMaterial;
      mat.opacity = isLit ? 0 : 0.45;
    }
  }, [isLit]);

  return (
    <div className="relative flex flex-col items-center select-none w-full max-w-[420px]">
      <div
        ref={mountRef}
        className="w-full h-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none transition-transform"
      />

      <div className="flex items-center gap-3 mt-1 mb-2">
        <button
          type="button"
          onClick={() => setIsRotating((prev) => !prev)}
          className="neu-pill px-3.5 py-1 text-xs text-emerald-800 flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
          title="เปิด/ปิดการหมุนอัตโนมัติ"
        >
          <span
            className={`inline-block w-2 h-2 rounded-full ${
              isRotating ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
            }`}
          />
          <span>{isRotating ? "หมุนช้าๆ" : "หยุดหมุน"}</span>
        </button>
      </div>
    </div>
  );
}
