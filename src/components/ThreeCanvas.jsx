'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Grid } from '@react-three/drei';
import * as THREE from 'three';
import DesktopSetup from './DesktopSetup';

// Scene controller that handles:
// 1. Scroll-bound 360-degree Y rotation
// 2. Responsive X offset (shifted left on desktop next to text cards, centered on mobile)
// 3. Scroll-bound dynamic spotlight HSL color shifts
function InteractiveScene({ children }) {
  const groupRef = useRef();
  const spot1Ref = useRef();
  const spot2Ref = useRef();
  const spot3Ref = useRef();
  const { viewport } = useThree();

  useFrame((state) => {
    if (!groupRef.current) return;

    // Calculate current scroll progress (0 to 1)
    const scrollHeight = typeof window !== 'undefined' ? document.documentElement.scrollHeight - window.innerHeight : 0;
    const scrollPercent = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;

    // 1. Rotation Y mapping to scroll progress (0 to 360 degrees)
    const targetRotation = scrollPercent * Math.PI * 2;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation,
      0.08 // smoothing
    );

    // 2. Center position (keeps 3D model centered while cards alternate on sides)
    const targetX = 0;
    const t = state.clock.getElapsedTime();

    // Lerp to position while adding a subtle cosine floating wobble
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetX + Math.cos(t * 0.8) * 0.015,
      0.08
    );

    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      Math.sin(t * 1.2) * 0.03,
      0.08
    );

    // 3. Dynamic color shifting on scroll (HSL Hue shifting)
    const hue = (scrollPercent * 0.75 + 0.55) % 1.0;
    const color = new THREE.Color().setHSL(hue, 0.85, 0.5);
    const color2 = new THREE.Color().setHSL((hue + 0.25) % 1.0, 0.85, 0.5);
    const color3 = new THREE.Color().setHSL((hue + 0.55) % 1.0, 0.85, 0.5);

    if (spot1Ref.current) spot1Ref.current.color.copy(color);
    if (spot2Ref.current) spot2Ref.current.color.copy(color2);
    if (spot3Ref.current) spot3Ref.current.color.copy(color3);
  });

  return (
    <group>
      {/* 3 Dynamic neon spotlights casting colored cones */}
      <spotLight 
        ref={spot1Ref}
        position={[0, 4, 2]} 
        angle={0.6} 
        penumbra={0.8} 
        intensity={2.0} 
        color="#8b5cf6" 
      />
      <spotLight 
        ref={spot2Ref}
        position={[-3, 3, -1]} 
        angle={0.8} 
        penumbra={1} 
        intensity={1.2} 
        color="#06b6d4" 
      />
      <spotLight 
        ref={spot3Ref}
        position={[3, 3, -1]} 
        angle={0.8} 
        penumbra={1} 
        intensity={1.2} 
        color="#ec4899" 
      />

      {/* Rotating desktop setup group */}
      <group ref={groupRef}>
        {children}
      </group>
    </group>
  );
}

// Particle system to create a premium floating ambient atmosphere
function AmbientParticles() {
  const pointsRef = useRef();
  const particleCount = 150;

  // Generate random coords and speeds
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const spd = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;     // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5; // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6; // Z
      spd[i] = 0.1 + Math.random() * 0.2;         // float speed
    }
    return [pos, spd];
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const positionsArray = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < particleCount; i++) {
      positionsArray[i * 3 + 1] += speeds[i] * delta * 0.5;

      if (positionsArray[i * 3 + 1] > 2.5) {
        positionsArray[i * 3 + 1] = -2.5;
        positionsArray[i * 3] = (Math.random() - 0.5) * 8;
        positionsArray[i * 3 + 2] = (Math.random() - 0.5) * 6;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#a78bfa"
        size={0.018}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Premium dark grid floor representing the reflective floor
function ReflectiveFloor() {
  return (
    <group position={[0, -0.65, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial 
          color="#060608" 
          roughness={0.2} 
          metalness={0.9} 
        />
      </mesh>
      
      <Grid
        position={[0, 0.005, 0]}
        args={[10.5, 10.5]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#1a1a24"
        sectionSize={2.5}
        sectionThickness={1}
        sectionColor="#2d2d3d"
        fadeDistance={10}
        infiniteGrid
      />
    </group>
  );
}

export default function ThreeCanvas() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[#0a0a0a]">
      <Canvas
        camera={{ position: [0, 0.4, 2.3], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color('#0a0a0a'));
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.0;
        }}
      >
        {/* Soft atmospheric lighting */}
        <ambientLight intensity={0.1} />

        {/* Ambient environment purple/blue light gradient fill */}
        <hemisphereLight skyColor="#1e1b4b" groundColor="#03001e" intensity={0.4} />

        {/* Key directional light to highlight metal surfaces */}
        <directionalLight 
          position={[5, 8, 5]} 
          intensity={0.8} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />

        {/* Interactive Scene wrapper that rotates, offsets and shifts colors */}
        <InteractiveScene>
          <DesktopSetup />
        </InteractiveScene>

        {/* Ambient floating elements */}
        <AmbientParticles />

        {/* Reflective floor with Grid */}
        <ReflectiveFloor />
      </Canvas>
      
      {/* Premium ambient gradient overlay + dark blur filter to ensure high text legibility */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] pointer-events-none" />
    </div>
  );
}
