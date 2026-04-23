'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import EyeModel from './EyeModel';

export default function Hero3D({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  return (
    <div className="absolute inset-0 w-full h-screen z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]} performance={{ min: 0.5 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} color="#C03B62" />
        <Environment preset="studio" />
        <EyeModel scrollProgress={scrollProgress} />
        <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} color="#C03B62" resolution={256} frames={1} />
      </Canvas>
    </div>
  );
}