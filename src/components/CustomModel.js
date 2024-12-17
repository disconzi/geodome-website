import React from 'react';
import { useGLTF } from '@react-three/drei';

function CustomModel({ url }) {
  const { scene } = useGLTF(url);
  
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

export default CustomModel;
