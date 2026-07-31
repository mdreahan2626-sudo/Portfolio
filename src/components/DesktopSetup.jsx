import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function DesktopSetup() {
  const groupRef = useRef();
  const steamRef = useRef();
  const screenMaterialRef = useRef();
  const backLightRef1 = useRef();
  const backLightRef2 = useRef();

  // Gentle floating animation and scroll-color shifting in useFrame
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.04;
    }

    // Scroll progress color mapping
    const scrollHeight = typeof window !== 'undefined' ? document.documentElement.scrollHeight - window.innerHeight : 0;
    const scrollPercent = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;

    // Shift colors smoothly based on scroll hue shifting (from 0 to 1)
    const hue = (scrollPercent * 0.75 + 0.55) % 1.0;
    const color = new THREE.Color().setHSL(hue, 0.85, 0.5);
    const color2 = new THREE.Color().setHSL((hue + 0.25) % 1.0, 0.85, 0.5);

    if (screenMaterialRef.current) {
      screenMaterialRef.current.emissive.copy(color);
    }
    if (backLightRef1.current) backLightRef1.current.color.copy(color);
    if (backLightRef2.current) backLightRef2.current.color.copy(color2);

    // Animate steam particles rising
    if (steamRef.current) {
      steamRef.current.children.forEach((particle) => {
        particle.position.y += 0.005;
        if (particle.position.y > 0.3) {
          particle.position.y = 0.05;
          particle.position.x = (Math.random() - 0.5) * 0.03;
          particle.position.z = (Math.random() - 0.5) * 0.03;
        }
        particle.scale.setScalar(Math.max(0, 1 - (particle.position.y * 3)));
      });
    }
  });

  // Render individual keycaps for mechanical keyboard
  const keys = [];
  const keyRows = [
    { cols: 15, color: '#2a2a2a' }, // Function row
    { cols: 15, color: '#e5e5e5' }, // Number row (light keys)
    { cols: 14, color: '#e5e5e5', offset: 0.02 },
    { cols: 13, color: '#e5e5e5', offset: 0.04 },
    { cols: 11, color: '#2a2a2a', offset: 0.06 } // Spacebar row
  ];

  let keyId = 0;
  keyRows.forEach((row, rowIndex) => {
    const zPos = -0.06 + rowIndex * 0.028;
    const offset = row.offset || 0;
    for (let c = 0; c < row.cols; c++) {
      let xPos = -0.2 + c * 0.028 + offset;
      let keyColor = row.color;

      // Add accent keycaps (orange escape, enter, space, etc.)
      if (rowIndex === 0 && c === 0) keyColor = '#ff5722'; // Escape key
      if (rowIndex === 4 && c === 4) { // Spacebar (wider)
        keys.push(
          <mesh key={`key-${keyId++}`} position={[xPos + 0.02, 0.015, zPos]}>
            <boxGeometry args={[0.08, 0.01, 0.02]} />
            <meshStandardMaterial color="#d4d4d8" roughness={0.6} />
          </mesh>
        );
        c += 2; // skip columns for wide spacebar
        continue;
      }
      if (rowIndex === 2 && c === row.cols - 1) keyColor = '#ff5722'; // Enter key

      keys.push(
        <mesh key={`key-${keyId++}`} position={[xPos, 0.015, zPos]}>
          <boxGeometry args={[0.02, 0.01, 0.02]} />
          <meshStandardMaterial color={keyColor} roughness={0.6} />
        </mesh>
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. DESK SURFACE (Dark premium wood/metal) */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[6, 0.1, 3]} />
        <meshStandardMaterial color="#0f0f11" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* 2. DESK MAT (Soft dark grey texture) */}
      <mesh position={[0, -0.54, 0]}>
        <boxGeometry args={[2.2, 0.01, 1.0]} />
        <meshStandardMaterial color="#1a1a1e" roughness={0.9} />
      </mesh>

      {/* 3. ULTRA-WIDE MONITOR */}
      {/* Stand Base */}
      <mesh position={[0, -0.53, -0.3]}>
        <boxGeometry args={[0.4, 0.01, 0.25]} />
        <meshStandardMaterial color="#2d2d30" roughness={0.3} metalness={0.9} />
      </mesh>
      {/* Stand Vertical Stem */}
      <mesh position={[0, -0.23, -0.33]} rotation={[0.1, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.03, 0.6]} />
        <meshStandardMaterial color="#2d2d30" roughness={0.3} metalness={0.9} />
      </mesh>
      {/* Stand Mounting Bracket */}
      <mesh position={[0, 0.05, -0.31]}>
        <boxGeometry args={[0.1, 0.1, 0.05]} />
        <meshStandardMaterial color="#1f1f21" roughness={0.5} />
      </mesh>
      {/* Monitor Display Screen Case (Curved Ultra-Wide) */}
      <group position={[0, 0.1, -0.25]}>
        {/* Main curved bezel back */}
        <mesh>
          <boxGeometry args={[2.0, 0.6, 0.05]} />
          <meshStandardMaterial color="#121214" roughness={0.5} metalness={0.7} />
        </mesh>
        {/* Screen bezel borders */}
        <mesh position={[0, 0, 0.026]}>
          <boxGeometry args={[2.02, 0.62, 0.01]} />
          <meshStandardMaterial color="#0a0a0b" roughness={0.8} />
        </mesh>
        {/* Actual Display Face with Coding/Neon gradient representation */}
        <mesh position={[0, 0, 0.028]}>
          <boxGeometry args={[1.98, 0.58, 0.005]} />
          {/* Displaying an active glowing UI/terminal effect */}
          <meshStandardMaterial 
            ref={screenMaterialRef}
            color="#080710" 
            emissive="#1d1245"
            emissiveIntensity={1.2}
            roughness={0.1} 
            metalness={0.1}
          />
        </mesh>

        {/* Ambient Back Glow (RGB behind the monitor) */}
        <pointLight ref={backLightRef1} position={[0, 0, -0.2]} distance={2.5} intensity={4} color="#8a2be2" />
        <pointLight ref={backLightRef2} position={[0.5, -0.2, -0.1]} distance={2.0} intensity={2} color="#00ffff" />
      </group>

      {/* 4. MECHANICAL KEYBOARD */}
      <group position={[0, -0.53, 0.15]}>
        {/* Keyboard Chassis */}
        <mesh position={[0, 0.008, 0]}>
          <boxGeometry args={[0.9, 0.016, 0.32]} />
          <meshStandardMaterial color="#16161a" roughness={0.5} metalness={0.7} />
        </mesh>
        {/* Metal Plate Accent */}
        <mesh position={[0, 0.016, 0]}>
          <boxGeometry args={[0.88, 0.002, 0.3]} />
          <meshStandardMaterial color="#ff5722" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Keys container */}
        <group position={[0.01, 0.008, 0]}>
          {keys}
        </group>
      </group>

      {/* 5. SLICK ERGONOMIC MOUSE */}
      <group position={[0.6, -0.53, 0.18]} rotation={[0, -0.1, 0]}>
        {/* Mouse Base */}
        <mesh position={[0, 0.01, 0]}>
          <boxGeometry args={[0.07, 0.02, 0.12]} />
          <meshStandardMaterial color="#1a1a1f" roughness={0.4} />
        </mesh>
        {/* Mouse Shell (Ergonomic curve) */}
        <mesh position={[0, 0.022, 0.01]} rotation={[-0.15, 0, 0]}>
          <sphereGeometry args={[0.032, 16, 16]} />
          <meshStandardMaterial color="#0f0f12" roughness={0.2} metalness={0.5} />
        </mesh>
        {/* Scroll wheel */}
        <mesh position={[0, 0.026, -0.02]}>
          <boxGeometry args={[0.006, 0.01, 0.018]} />
          <meshStandardMaterial color="#ff5722" roughness={0.1} emissive="#ff5722" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* 6. MINIMALIST STUDIO MONITORS (Speakers) */}
      {/* Left Speaker */}
      <group position={[-1.2, -0.3, -0.1]} rotation={[0, 0.25, 0]}>
        {/* Cabinet */}
        <mesh>
          <boxGeometry args={[0.22, 0.45, 0.25]} />
          <meshStandardMaterial color="#131316" roughness={0.6} />
        </mesh>
        {/* Woofer (Main Cone) */}
        <mesh position={[0, -0.08, 0.126]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.005]} />
          <meshStandardMaterial color="#ff5722" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Tweeter (Small Cone) */}
        <mesh position={[0, 0.1, 0.126]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.005]} />
          <meshStandardMaterial color="#2d2d30" roughness={0.1} />
        </mesh>
      </group>
      {/* Right Speaker */}
      <group position={[1.2, -0.3, -0.1]} rotation={[0, -0.25, 0]}>
        {/* Cabinet */}
        <mesh>
          <boxGeometry args={[0.22, 0.45, 0.25]} />
          <meshStandardMaterial color="#131316" roughness={0.6} />
        </mesh>
        {/* Woofer (Main Cone) */}
        <mesh position={[0, -0.08, 0.126]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.005]} />
          <meshStandardMaterial color="#ff5722" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Tweeter (Small Cone) */}
        <mesh position={[0, 0.1, 0.126]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.005]} />
          <meshStandardMaterial color="#2d2d30" roughness={0.1} />
        </mesh>
      </group>

      {/* 7. DESKTOP PLANT (Minimal Ceramic Pot + Succulent) */}
      <group position={[-0.7, -0.45, -0.15]}>
        {/* Ceramic Pot */}
        <mesh>
          <cylinderGeometry args={[0.09, 0.07, 0.16]} />
          <meshStandardMaterial color="#f0efe9" roughness={0.4} />
        </mesh>
        {/* Soil */}
        <mesh position={[0, 0.075, 0]}>
          <cylinderGeometry args={[0.082, 0.082, 0.01]} />
          <meshStandardMaterial color="#302015" roughness={0.9} />
        </mesh>
        {/* Succulent Leaves */}
        <mesh position={[0, 0.12, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#4f7942" roughness={0.6} />
        </mesh>
        <mesh position={[0.04, 0.13, 0.02]} rotation={[0.2, 0, 0.4]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#5f8c51" roughness={0.6} />
        </mesh>
        <mesh position={[-0.04, 0.13, -0.02]} rotation={[-0.2, 0, -0.4]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#5f8c51" roughness={0.6} />
        </mesh>
        <mesh position={[0.02, 0.11, -0.04]} rotation={[-0.4, 0.4, 0.1]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#5b824d" roughness={0.6} />
        </mesh>
        <mesh position={[-0.02, 0.11, 0.04]} rotation={[0.4, -0.4, -0.1]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#5b824d" roughness={0.6} />
        </mesh>
      </group>

      {/* 8. COFFEE MUG (Ceramic Mug + Torus Handle + Rising Steam Particles) */}
      <group position={[0.65, -0.45, -0.05]} rotation={[0, 0.8, 0]}>
        {/* Mug Body */}
        <mesh>
          <cylinderGeometry args={[0.06, 0.06, 0.14]} />
          <meshStandardMaterial color="#1c1a27" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Mug Handle */}
        <mesh position={[0.06, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.035, 0.01, 8, 24, Math.PI]} />
          <meshStandardMaterial color="#1c1a27" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Coffee Liquid inside */}
        <mesh position={[0, 0.062, 0]}>
          <cylinderGeometry args={[0.054, 0.054, 0.005]} />
          <meshStandardMaterial color="#3b2219" roughness={0.1} />
        </mesh>
        {/* Steam Particle System */}
        <group ref={steamRef} position={[0, 0.07, 0]}>
          {Array.from({ length: 4 }).map((_, i) => (
            <mesh 
              key={`steam-${i}`} 
              position={[
                (Math.random() - 0.5) * 0.03, 
                Math.random() * 0.15, 
                (Math.random() - 0.5) * 0.03
              ]}
            >
              <sphereGeometry args={[0.008 + Math.random() * 0.006, 6, 6]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}
