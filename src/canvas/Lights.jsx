import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Lights() {
  const pointLightRef = useRef();

  useFrame((state) => {
    if (pointLightRef.current) {
      pointLightRef.current.position.x = Math.sin(state.clock.elapsedTime) * 10;
      pointLightRef.current.position.z = Math.cos(state.clock.elapsedTime) * 10;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight ref={pointLightRef} position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#ffffff" />
      <hemisphereLight intensity={0.2} groundColor="#000000" color="#ffffff" />
    </>
  );
}