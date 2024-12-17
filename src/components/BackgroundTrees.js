import React from 'react';
import * as THREE from 'three';

const BackgroundTrees = React.memo(function BackgroundTrees() {
  const trees = React.useMemo(() => 
    [...Array(12)].map((_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 25 + Math.random() * 5;
      return {
        position: [
          Math.cos(angle) * radius,
          0,
          Math.sin(angle) * radius
        ],
        key: i
      };
    }), []
  );

  return (
    <group>
      {trees.map(tree => (
        <group key={tree.key} position={tree.position}>
          <mesh castShadow>
            <cylinderGeometry args={[0.3, 0.4, 5, 8]} />
            <meshStandardMaterial color="#5D4037" roughness={0.9} />
          </mesh>
          <mesh position={[0, 4, 0]} castShadow>
            <sphereGeometry args={[2, 16, 16]} />
            <meshStandardMaterial color="#2E7D32" roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
});

export default BackgroundTrees;
