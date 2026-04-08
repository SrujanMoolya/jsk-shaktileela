import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function StarField() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(3000);
    for (let i = 0; i < 3000; i++) {
      pos[i] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
      ref.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#d4a853" size={0.02} sizeAttenuation depthWrite={false} opacity={0.8} />
    </Points>
  );
}

function GlowOrb({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const speed = useMemo(() => 0.5 + Math.random() * 0.5, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
    }
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  );
}

export default function CosmicScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.2} />
        <StarField />
        <GlowOrb position={[-3, 1, -2]} color="#d4a853" scale={1.5} />
        <GlowOrb position={[3, -1, -3]} color="#8b5cf6" scale={1} />
        <GlowOrb position={[0, 2, -4]} color="#d4a853" scale={0.8} />
        <GlowOrb position={[-2, -2, -2]} color="#6366f1" scale={1.2} />
      </Canvas>
    </div>
  );
}
