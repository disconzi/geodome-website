import React from 'react';
import { useGLTF } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/models/zomepod.glb');
  
  return (
    <primitive 
      object={scene} 
      scale={1} 
      position={[0, 0, 0]}
      castShadow
      receiveShadow
    />
  );
}

export default Model;
