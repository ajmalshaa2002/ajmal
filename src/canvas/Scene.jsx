import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Floating code particles with matrix effect
function CodeParticles({ mouse }) {
  const ref = useRef();
  // Reduce particles on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const count = isMobile ? 1500 : 3000;

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
    const positions = ref.current.geometry.attributes.position.array;
    
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

// Rotating wireframe cubes
function WireframeCubes({ mouse }) {
  const group = useRef();
  
  const cubes = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: Math.random() * 2 + 1,
      speed: (Math.random() - 0.5) * 0.02
    }));
  }, []);

  useFrame(() => {
    group.current.children.forEach((cube, i) => {
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
    group.current.rotation.y += 0.001 + mouse.current.x * 0.002;
    group.current.rotation.x = mouse.current.y * 0.5;
    
    group.current.children.forEach((ring, i) => {
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
function CameraController({ mouse }) {
  const { camera } = useThree();
  
  useFrame(() => {
    camera.position.x += (mouse.current.x * 2 - camera.position.x) * 0.05;
    camera.position.y += (mouse.current.y * 2 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

export default function Scene() {
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Reduce quality on mobile for better performance
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="canvas-container">
      <Canvas 
        camera={{ position: [0, 0, 20], fov: 75 }}
        gl={{ 
          antialias: !isMobile,
          powerPreference: isMobile ? "low-power" : "high-performance"
        }}
        dpr={isMobile ? 1 : window.devicePixelRatio}
      >
        <ambientLight intensity={0.5} />
        <CameraController mouse={mouse} />
        <CodeParticles mouse={mouse} />
        <WireframeCubes mouse={mouse} />
        <BinaryRings mouse={mouse} />
      </Canvas>
    </div>
  );
}