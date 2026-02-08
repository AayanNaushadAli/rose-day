
import React from 'react';
import { PerspectiveCamera, Sparkles, Stars } from '@react-three/drei';

export const RoseScene: React.FC = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ffdddd" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff0055" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={100} scale={10} size={2} speed={0.5} color="#ff77aa" />

      {/* The floating rose model has been removed as requested, leaving the atmospheric background */}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.5, 0]}>
        <circleGeometry args={[10, 64]} />
        <meshStandardMaterial 
            color="#000000" 
            transparent 
            opacity={0.3} 
            roughness={1}
        />
      </mesh>
    </>
  );
};
