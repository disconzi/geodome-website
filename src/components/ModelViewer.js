import React, { Suspense, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import ScanButton from './ScanButton';

const DetailedGround = React.memo(function DetailedGround() {
  const grassPatches = useCallback(() => 
    [...Array(50)].map((_, i) => {
      const x = Math.random() * 30 - 15;
      const z = Math.random() * 30 - 15;
      const scale = 0.3 + Math.random() * 0.3;
      return { x, z, scale, rotation: Math.random() * Math.PI };
    }), []
  );

  return (
    <group>
      <Plane
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.1, 0]}
        args={[100, 100]}
      >
        <meshStandardMaterial
          color="#4CAF50"
          roughness={0.8}
          metalness={0.1}
        />
      </Plane>

      {grassPatches().map((patch, i) => (
        <mesh
          key={i}
          position={[patch.x, -0.05, patch.z]}
          rotation={[0, patch.rotation, 0]}
          scale={[patch.scale, patch.scale, patch.scale]}
        >
          <planeGeometry args={[0.3, 0.5]} />
          <meshStandardMaterial 
            color="#388E3C"
            side={THREE.DoubleSide}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
});

const Model = React.lazy(() => import('./Model'));
const BackgroundTrees = React.lazy(() => import('./BackgroundTrees'));
const CustomModel = React.lazy(() => import('./CustomModel'));

function ModelViewer() {
  const [isLoading, setIsLoading] = useState(true);
  const [scannedModelUrl, setScannedModelUrl] = useState(null);
  
  const canvasRef = useCallback(node => {
    if (node !== null) {
      setIsLoading(false);
    }
  }, []);

  const handleModelUploaded = (modelUrl) => {
    setScannedModelUrl(modelUrl);
  };

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Canvas
        ref={canvasRef}
        shadows
        camera={{ position: [0, 5, 15], fov: 50 }}
        performance={{ min: 0.5 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {scannedModelUrl ? (
            <CustomModel url={scannedModelUrl} />
          ) : (
            <Model />
          )}
          <DetailedGround />
          <BackgroundTrees />
          <Environment preset="sunset" />
          <OrbitControls 
            enableDamping={false} 
            maxPolarAngle={Math.PI / 2} 
          />
        </Suspense>
      </Canvas>

      <ScanButton onModelUploaded={handleModelUploaded} />

      {isLoading && (
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '8px'
        }}>
          Loading...
        </div>
      )}
    </div>
  );
}

export default ModelViewer;
