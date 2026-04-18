import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function EyeModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Triangle */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[2, 3, 16, 100]} />
        <meshStandardMaterial color="#C93E67" wireframe />
      </mesh>
      {/* Inner Eye */}
      <mesh position={[0, -0.2, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#FFC300" />
      </mesh>
    </group>
  );
}