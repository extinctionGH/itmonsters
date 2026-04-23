import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function EyeModel({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/eye-model.glb');

  // Clone the scene and materials so we can mutate colors safely
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          // clone material so we don't affect cached original
          mesh.material = (mesh.material as THREE.Material).clone();
          if ('color' in mesh.material) {
            mesh.userData.originalColor = (mesh.material as THREE.MeshStandardMaterial).color.clone();
          }
        }
      }
    });
    return clone;
  }, [scene]);

  useFrame((state) => {
    if (groupRef.current) {
      const progress = scrollProgress.current;
      
      // Idle floating animation
      const idleY = Math.sin(state.clock.elapsedTime) * 0.2;
      const idleRotY = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

      let targetX = 0;
      let targetY = 0;
      let targetScale = 1;
      let scrollRotX = 0;
      let scrollRotY = 0;
      let mouseInfluence = 1;

      // Act 1: The Chaos (0 - 0.15)
      // Fast transition to ensure it is inverted before the pink grid slides up
      if (progress < 0.15) {
        const p = progress / 0.15; // Local progress 0 to 1
        targetX = 0;
        targetY = 0;
        targetScale = 1;
        scrollRotX = p * Math.PI; // Spins half way
        scrollRotY = 0;
        mouseInfluence = 1;
      } 
      // Act 2: The Structure Transition (0.15 - 0.40)
      else if (progress < 0.40) {
        const p = (progress - 0.15) / 0.25;
        targetX = THREE.MathUtils.lerp(0, 2.5, p); // Moves to the right
        targetY = 0;
        targetScale = THREE.MathUtils.lerp(1, 1.3, p); // Scales UP
        scrollRotX = THREE.MathUtils.lerp(Math.PI, 0, p); 
        scrollRotY = THREE.MathUtils.lerp(0, -Math.PI / 4, p); 
        mouseInfluence = THREE.MathUtils.lerp(1, 0.2, p); 
      } 
      // Act 2 Pause (0.40 - 0.60)
      else if (progress < 0.60) {
        targetX = 2.5;
        targetY = 0;
        targetScale = 1.3;
        scrollRotX = 0;
        scrollRotY = -Math.PI / 4;
        mouseInfluence = 0.2;
      }
      // Act 3: The Execution Zoom (0.60 - 1.0)
      else {
        const p = (progress - 0.60) / 0.40;
        
        // Sine easing curve for smoother tracking decay
        const sineEase = -(Math.cos(Math.PI * p) - 1) / 2;

        // Use linear 'p' to smoothly drift back to the exact center of the screen
        targetX = THREE.MathUtils.lerp(2.5, 0, p); 
        targetY = 0;
        
        // Geometric/exponential scaling provides a perceptually smooth zoom
        targetScale = 1.3 * Math.pow(60 / 1.3, p); 
        
        // Smoothly stop spinning and flatten out to face the camera
        scrollRotX = 0; 
        scrollRotY = THREE.MathUtils.lerp(-Math.PI / 4, 0, p);
        
        // Smoothly disable mouse tracking using the sine ease to prevent snapping
        mouseInfluence = THREE.MathUtils.lerp(0.2, 0, sineEase); 
      }

      // Cursor tracking
      const targetMouseRotX = -(state.pointer.y * Math.PI * 0.4) * mouseInfluence;
      const targetMouseRotY = (state.pointer.x * Math.PI * 0.4) * mouseInfluence;
      const targetMousePosX = (state.pointer.x * 0.3) * mouseInfluence;
      const targetMousePosY = (state.pointer.y * 0.3) * mouseInfluence;

      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX + targetMousePosX, 0.1);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, idleY + targetY + targetMousePosY, 0.1);
      groupRef.current.scale.setScalar(targetScale);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, scrollRotX + targetMouseRotX, 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, idleRotY + targetMouseRotY, 0.1);

      // Color transition logic
      // White Background (Act 1) -> Pink Background (Act 2+)
      // Pink Eye (Act 1) -> White Eye (Act 2+)
      // Black Pupil (Act 1) -> Pink Pupil (Act 2+) so it wipes into Pink background in Act 3
      const colorProgress = Math.max(0, Math.min(1, progress / 0.15));
      const targetWhite = new THREE.Color('#ffffff');
      const targetPink = new THREE.Color('#C03B62');

      clonedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.userData.originalColor && 'color' in mesh.material) {
            const mat = mesh.material as THREE.MeshStandardMaterial;
            
            const origHsl = { h: 0, s: 0, l: 0 };
            mesh.userData.originalColor.getHSL(origHsl);

            if (origHsl.l < 0.1) {
              // Pupil/Dark parts -> Lerp to Pink (to match target bg color)
              mat.color.copy(mesh.userData.originalColor).lerp(targetPink, colorProgress);
            } else {
              // Body/Pink parts -> Lerp to White (for inversion against pink bg)
              mat.color.copy(mesh.userData.originalColor).lerp(targetWhite, colorProgress);
              
              if (mat.emissive) {
                mat.emissive.copy(targetWhite);
                mat.emissiveIntensity = colorProgress * 0.5;
              }
            }
          }
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} scale={2.8} rotation={[0, Math.PI / 2, 0]} />
    </group>
  );
}

useGLTF.preload('/eye-model.glb');
