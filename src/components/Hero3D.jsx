import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function AnimatedCodeSphere({ mouse }) {
  const sphereRef = useRef();
  const particlesRef = useRef();

  useFrame((state) => {
    if (sphereRef.current) {
      // Follow mouse with smooth interpolation
      sphereRef.current.rotation.y += 0.003 + mouse.current.x * 0.01;
      sphereRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1 + mouse.current.y * 0.3;
      
      // Scale slightly based on mouse distance from center
      const mouseDistance = Math.sqrt(mouse.current.x ** 2 + mouse.current.y ** 2);
      const targetScale = 1 + mouseDistance * 0.1;
      sphereRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
    
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + i) * 0.002;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      
      // Rotate particles opposite to mouse for parallax effect
      particlesRef.current.rotation.y = -mouse.current.x * 0.2;
      particlesRef.current.rotation.x = -mouse.current.y * 0.2;
    }
  });

  // Create particles around sphere
  const particleCount = 1000;
  const particles = React.useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 3 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  return (
    <group>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial color="#ffffff" wireframe />
      </mesh>
      
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.6} />
      </points>
    </group>
  );
}

// Camera controller for parallax effect
function CameraRig({ mouse }) {
  const { camera } = useThree();
  
  useFrame(() => {
    camera.position.x += (mouse.current.x * 1.5 - camera.position.x) * 0.05;
    camera.position.y += (-mouse.current.y * 1.5 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

export default function Hero3D() {
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  };

  return (
    <div className="hero-canvas" onMouseMove={handleMouseMove}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <CameraRig mouse={mouse} />
        <AnimatedCodeSphere mouse={mouse} />
      </Canvas>
    </div>
  );
}