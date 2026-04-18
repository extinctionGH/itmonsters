'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import EyeModel from './EyeModel';

export default function Hero3D() {
  return (
    <div className="absolute inset-0 w-full h-screen z-0 bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#f0f0f0_100%)]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} color="#C93E67" />
        <Environment preset="studio" />
        <EyeModel />
        <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2} far={4} color="#C93E67" />
      </Canvas>
    </div>
  );
}