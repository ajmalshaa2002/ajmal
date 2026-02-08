import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function ProjectCard({ position, rotation, title, tech, index, onHover, mouse }) {
  const meshRef = useRef();
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Store base position to prevent drift
  const basePosition = useRef(position);

  useFrame((state) => {
    if (meshRef.current && groupRef.current) {
      // Smooth rotation with mouse influence
      meshRef.current.rotation.y += 0.002;
      
      // Only apply mouse rotation when there's significant movement
      const targetRotationX = mouse.current.y * 0.2;
      meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.05;
      
      // Hover animation
      if (hovered) {
        const floatY = Math.sin(state.clock.elapsedTime * 2) * 0.1;
        groupRef.current.position.y = basePosition.current[1] + floatY;
        
        // Smooth scale animation
        const targetScale = new THREE.Vector3(1.15, 1.15, 1.15);
        meshRef.current.scale.lerp(targetScale, 0.1);
      } else {
        // Return to base position smoothly
        groupRef.current.position.y += (basePosition.current[1] - groupRef.current.position.y) * 0.1;
        
        const targetScale = new THREE.Vector3(1, 1, 1);
        meshRef.current.scale.lerp(targetScale, 0.1);
      }
      
      // Subtle parallax - use groupRef to prevent position drift
      const targetX = basePosition.current[0] + mouse.current.x * 0.2;
      const targetZ = basePosition.current[2] + mouse.current.y * 0.2;
      
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
      groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.05;
    }
  });

  return (
    <group 
      ref={groupRef}
      position={position}
    >
      <RoundedBox
        ref={meshRef}
        args={[2, 2.5, 0.2]}
        radius={0.05}
        smoothness={4}
        rotation={rotation}
        onPointerOver={() => {
          setHovered(true);
          onHover(index);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
          document.body.style.cursor = 'none';
        }}
      >
        <meshBasicMaterial 
          color={hovered ? "#ffffff" : "#000000"} 
          wireframe={!hovered}
          transparent
          opacity={hovered ? 1 : 0.8}
        />
      </RoundedBox>
      
      {/* Grid lines */}
      <lineSegments position={[0, 0, 0.11]}>
        <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(2, 2.5, 0.2)]} />
        <lineBasicMaterial 
          attach="material" 
          color="#ffffff" 
          transparent
          opacity={hovered ? 1 : 0.6}
        />
      </lineSegments>
      
      {/* Corner accent dots when hovered */}
      {hovered && (
        <>
          <mesh position={[1, 1.25, 0.15]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[-1, 1.25, 0.15]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[1, -1.25, 0.15]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[-1, -1.25, 0.15]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </>
      )}
    </group>
  );
}

// Camera controller with smooth damping
function CameraController({ mouse }) {
  const { camera } = useThree();
  const targetPosition = useRef({ x: 0, y: 0 });
  
  useFrame(() => {
    // Smooth camera movement with damping
    targetPosition.current.x = mouse.current.x * 1.5;
    targetPosition.current.y = -mouse.current.y * 1.5;
    
    camera.position.x += (targetPosition.current.x - camera.position.x) * 0.02;
    camera.position.y += (targetPosition.current.y - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

export default function Projects3D() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const mouse = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    // Normalize mouse position to -1 to 1 range
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    
    // Smooth interpolation to prevent jitter
    mouse.current.x += (x - mouse.current.x) * 0.1;
    mouse.current.y += (y - mouse.current.y) * 0.1;
  };

  const handleMouseLeave = () => {
    // Smoothly return mouse position to center when leaving
    mouse.current.x += (0 - mouse.current.x) * 0.1;
    mouse.current.y += (0 - mouse.current.y) * 0.1;
  };

  const projects = [
    {
      title: "Immersive 3D Portfolio",
      tech: "React, Three.js, WebGL",
      description: "Interactive portfolio with particle systems and 3D animations"
    },
    {
      title: "Neural Network Visualizer",
      tech: "Three.js, TensorFlow.js",
      description: "Real-time visualization of neural network training"
    },
    {
      title: "Metaverse Experience",
      tech: "React, R3F, Blender",
      description: "Virtual world with multiplayer interactions"
    },
    {
      title: "Generative Art Engine",
      tech: "p5.js, WebGL, Shaders",
      description: "Algorithm-based art generation platform"
    }
  ];

  return (
    <div className="projects-3d">
      <div 
        ref={containerRef}
        className="projects-canvas" 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
          }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />
          
          <CameraController mouse={mouse} />
          
          {projects.map((project, i) => (
            <ProjectCard
              key={i}
              position={[
                (i % 2) * 3 - 1.5,
                Math.floor(i / 2) * -3,
                0
              ]}
              rotation={[0, 0, 0]}
              title={project.title}
              tech={project.tech}
              index={i}
              onHover={setHoveredProject}
              mouse={mouse}
            />
          ))}
        </Canvas>
      </div>

      <div className="projects-info">
        {projects.map((project, i) => (
          <div 
            key={i} 
            className={`project-card ${hoveredProject === i ? 'active' : ''}`}
            onMouseEnter={() => setHoveredProject(i)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <div className="project-number">0{i + 1}</div>
            <h3 className="project-title">{project.title}</h3>
            <div className="project-tech">
              <span className="bracket">{'['}</span>
              {project.tech}
              <span className="bracket">{']'}</span>
            </div>
            <p className="project-description">{project.description}</p>
            <button className="project-link interactive">
              View Project <span>→</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}