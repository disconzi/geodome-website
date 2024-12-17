import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF, Plane } from '@react-three/drei';
import * as THREE from 'three';
import QRCode from 'qrcode.react';

function DetailedGround() {
  return (
    <group>
      {/* Main grass lawn - matching the image's well-maintained look */}
      <Plane
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.1, 0]}
        args={[100, 100]}
      >
        <meshStandardMaterial
          color="#4CAF50"  // Brighter, more maintained lawn color
          roughness={0.8}
          metalness={0.1}
        />
      </Plane>

      {/* Subtle grass detail patches */}
      {[...Array(50)].map((_, i) => {
        const x = Math.random() * 30 - 15;
        const z = Math.random() * 30 - 15;
        const scale = 0.3 + Math.random() * 0.3;
        return (
          <mesh
            key={i}
            position={[x, -0.05, z]}
            rotation={[0, Math.random() * Math.PI, 0]}
            scale={[scale, scale, scale]}
          >
            <planeGeometry args={[0.3, 0.5]} />
            <meshStandardMaterial 
              color="#388E3C"
              side={THREE.DoubleSide}
              transparent
              opacity={0.7}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function BackgroundTrees() {
  return (
    <group>
      {/* Scattered background trees, similar to the image */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 25 + Math.random() * 5;
        return (
          <group key={i} position={[
            Math.cos(angle) * radius,
            0,
            Math.sin(angle) * radius
          ]}>
            {/* Tree trunk */}
            <mesh castShadow>
              <cylinderGeometry args={[0.3, 0.4, 5, 8]} />
              <meshStandardMaterial color="#5D4037" roughness={0.9} />
            </mesh>
            {/* Tree foliage */}
            <mesh position={[0, 4, 0]} castShadow>
              <sphereGeometry args={[2, 16, 16]} />
              <meshStandardMaterial color="#2E7D32" roughness={0.8} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

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

const ModelViewer = () => {
  const [showQR, setShowQR] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [customModel, setCustomModel] = useState(null);
  
  // Generate a unique session ID for this scan
  const startScanning = () => {
    const sessionId = Math.random().toString(36).substring(7);
    setShowQR(true);
    setScanning(true);
    
    // Start polling for the model
    pollForModel(sessionId);
  };
  
  const pollForModel = async (sessionId) => {
    try {
      const response = await fetch(`https://rosas-do-deserto.vercel.app/api/check-model/${sessionId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.modelUrl) {
          setCustomModel(data.modelUrl);
          setShowQR(false);
          setScanning(false);
        } else {
          // Keep polling if no model yet
          setTimeout(() => pollForModel(sessionId), 5000);
        }
      }
    } catch (error) {
      console.error('Error checking for model:', error);
      setShowQR(false);
      setScanning(false);
      alert('Error checking for scanned model. Please try again.');
    }
  };

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

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#87CEEB', position: 'relative' }}>
      <Canvas 
        camera={{ position: [15, 8, 15], fov: 45 }}
        shadows
        gl={{ antialias: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#B3E5FC']} />
        <fog attach="fog" args={['#B3E5FC', 40, 100]} />
        
        <ambientLight intensity={1.2} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />

        <Suspense fallback={null}>
          {customModel ? (
            <CustomModel url={customModel} />
          ) : (
            <Model />
          )}
          <DetailedGround />
          <BackgroundTrees />
          <Environment preset="sunset" background={false} />
        </Suspense>

        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={30}
          maxPolarAngle={Math.PI / 2.1}
          target={[0, 2, 0]}
        />
      </Canvas>

      {showQR && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3>Scan to Start 3D Capture</h3>
          <QRCode value={`https://rosas-do-deserto.vercel.app/scan/${startScanning.sessionId}`} size={256} level="H" />
          <p style={{ marginTop: '15px', color: '#666' }}>
            Open your iOS device's camera to scan
          </p>
        </div>
      )}

      <button
        onClick={startScanning}
        disabled={scanning}
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          padding: '12px 24px',
          backgroundColor: scanning ? '#ccc' : '#007AFF',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: scanning ? 'default' : 'pointer',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        {scanning ? (
          <>
            <span className="spinner"></span>
            Scan QR Code
          </>
        ) : (
          <>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M3 9h4M21 9h-4M3 15h4M21 15h-4"/>
            </svg>
            Scan 3D Object
          </>
        )}
      </button>

      <style>
        {`
          .spinner {
            width: 20px;
            height: 20px;
            border: 2px solid #ffffff;
            border-top: 2px solid transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default ModelViewer;
