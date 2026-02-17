import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { getParticleCount, isMobile, isTouchEnabled } from '../utils/responsive';

// Floating code particles with matrix effect
function CodeParticles({ mouse, isReduced }) {
  const ref = useRef();
  // Dynamically determine particle count based on device
  const count = getParticleCount();

  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = -Math.random() * 0.05 - 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    
    return [positions, velocities];
  }, [count]);

  useFrame((state) => {
    if (!ref.current?.geometry.attributes.position) return;
    
    const positions = ref.current.geometry.attributes.position.array;
    
    // Skip updates on every frame for mobile to improve performance
    if (isReduced && state.clock.elapsedTime % 2 > 0.016) return;
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];
      
      // Reset particles that fall too low
      if (positions[i * 3 + 1] < -20) {
        positions[i * 3 + 1] = 20;
        positions[i * 3] = (Math.random() - 0.5) * 40;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      }
      
      // Wrap around edges
      if (Math.abs(positions[i * 3]) > 20) positions[i * 3] *= -0.95;
      if (Math.abs(positions[i * 3 + 2]) > 20) positions[i * 3 + 2] *= -0.95;
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true;
    
    // Rotate based on mouse position
    ref.current.rotation.y += 0.0005 + mouse.current.x * 0.0002;
    ref.current.rotation.x = mouse.current.y * 0.1;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

// Rotating wireframe cubes (simplified for mobile)
function WireframeCubes({ mouse, isReduced }) {
  const group = useRef();
  
  // Reduce cube count on mobile
  const cubeCount = isReduced ? 3 : 5;
  
  const cubes = useMemo(() => {
    return Array.from({ length: cubeCount }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: Math.random() * 2 + 1,
      speed: (Math.random() - 0.5) * 0.02
    }));
  }, [cubeCount]);

  useFrame(() => {
    if (!group.current) return;
    
    group.current.children.forEach((cube, i) => {
      if (!cube) return;
      cube.rotation.x += cubes[i].speed + mouse.current.y * 0.01;
      cube.rotation.y += cubes[i].speed * 0.7 + mouse.current.x * 0.01;
    });
    
    // Group follows mouse with parallax
    group.current.rotation.y = mouse.current.x * 0.3;
    group.current.rotation.x = mouse.current.y * 0.3;
  });

  return (
    <group ref={group}>
      {cubes.map((cube, i) => (
        <mesh key={i} position={cube.position} rotation={cube.rotation} scale={cube.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="#ffffff" wireframe />
        </mesh>
      ))}
    </group>
  );
}

// Binary code rings
function BinaryRings({ mouse }) {
  const group = useRef();
  
  useFrame((state) => {
    if (!group.current) return;
    
    group.current.rotation.y += 0.001 + mouse.current.x * 0.002;
    group.current.rotation.x = mouse.current.y * 0.5;
    
    group.current.children.forEach((ring, i) => {
      if (!ring) return;
      ring.rotation.x += 0.002 * (i % 2 ? 1 : -1);
      ring.rotation.z = mouse.current.x * 0.2;
    });
  });

  return (
    <group ref={group}>
      {[8, 12, 16].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.1, 16, 100]} />
          <meshBasicMaterial color="#ffffff" wireframe />
        </mesh>
      ))}
    </group>
  );
}

// Camera controller to follow mouse
function CameraController({ mouse, isReduced }) {
  const { camera } = useThree();
  
  useFrame(() => {
    const targetX = mouse.current.x * 2;
    const targetY = mouse.current.y * 2;
    
    // Slower mouse follow on reduced performance devices
    const smoothness = isReduced ? 0.03 : 0.05;
    camera.position.x += (targetX - camera.position.x) * smoothness;
    camera.position.y += (targetY - camera.position.y) * smoothness;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

export default function Scene() {
  const mouse = useRef({ x: 0, y: 0 });
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    // Determine if we should reduce animations based on device
    const shouldReduce = isMobile() || isTouchEnabled();
    setIsReduced(shouldReduce);
  }, []);

  const handleMouseMove = (e) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Determine device capabilities
  const deviceIsMobile = isMobile();
  const dpr = deviceIsMobile ? 1 : Math.min(2, window.devicePixelRatio);

  return (
    <div className="canvas-container">
      <Canvas 
        camera={{ position: [0, 0, 20], fov: 75 }}
        gl={{ 
          antialias: !deviceIsMobile,
          powerPreference: deviceIsMobile ? "low-power" : "high-performance",
          logarithmicDepthBuffer: false // Improves performance on mobile
        }}
        dpr={dpr}
        performance={{ min: 0.5, max: 1 }} // Adaptive performance
      >
        <ambientLight intensity={0.5} />
        <CameraController mouse={mouse} isReduced={isReduced} />
        <CodeParticles mouse={mouse} isReduced={isReduced} />
        <WireframeCubes mouse={mouse} isReduced={isReduced} />
        <BinaryRings mouse={mouse} />
      </Canvas>
    </div>
  );
}