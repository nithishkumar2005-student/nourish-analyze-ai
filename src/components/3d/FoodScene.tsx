import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Box } from "@react-three/drei";
import * as THREE from "three";

// Floating Apple Component
const Apple = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      {/* Apple body */}
      <sphereGeometry args={[0.8, 32, 16]} />
      <meshPhongMaterial color="#e74c3c" />
      
      {/* Apple stem */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.3]} />
        <meshPhongMaterial color="#8b4513" />
      </mesh>
      
      {/* Apple leaf */}
      <mesh position={[0.1, 0.9, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.3, 0.1, 0.05]} />
        <meshPhongMaterial color="#27ae60" />
      </mesh>
    </mesh>
  );
};

// Floating Grapes Component
const Grapes = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.008;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.7 + 2) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Create grape cluster */}
      {Array.from({ length: 12 }).map((_, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const x = (col - 1) * 0.25;
        const y = -row * 0.2;
        const z = Math.random() * 0.1 - 0.05;
        
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.12, 16, 12]} />
            <meshPhongMaterial color="#9b59b6" />
          </mesh>
        );
      })}
      
      {/* Grape stem */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.2]} />
        <meshPhongMaterial color="#8b4513" />
      </mesh>
    </group>
  );
};

// Floating Carrot Component
const Carrot = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.005;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6 + 4) * 0.18;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={position} rotation={[0, 0, Math.PI / 6]}>
        {/* Carrot body */}
        <coneGeometry args={[0.3, 1.2, 8]} />
        <meshPhongMaterial color="#e67e22" />
        
        {/* Carrot leaves */}
        <mesh position={[0, 0.6, 0]}>
          <coneGeometry args={[0.2, 0.4, 6]} />
          <meshPhongMaterial color="#27ae60" />
        </mesh>
      </mesh>
    </group>
  );
};

interface FoodSceneProps {
  className?: string;
}

export const FoodScene = ({ className }: FoodSceneProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={className} />; // Prevent SSR issues
  }

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.6} />
        <pointLight position={[-10, -10, -5]} intensity={0.3} />
        
        {/* 3D Food Models */}
        <Apple position={[-2, 0, 0]} />
        <Grapes position={[2, 1, -1]} />
        <Carrot position={[0, -1, 1]} />
        
        {/* Gentle auto-rotation */}
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
};