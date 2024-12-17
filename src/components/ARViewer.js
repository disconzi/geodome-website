import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  useGLTF, 
  Environment, 
  Html,
  useProgress,
  TransformControls
} from '@react-three/drei';

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(0)} % carregado</Html>;
}

function Model({ modelPath, scale = 1, position, isLocked, onPositionChange }) {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef();
  const { camera } = useThree();
  
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <>
      {!isLocked ? (
        <TransformControls
          object={modelRef}
          mode="translate"
          onObjectChange={() => {
            if (modelRef.current) {
              onPositionChange(modelRef.current.position);
            }
          }}
        >
          <primitive 
            ref={modelRef}
            object={scene} 
            scale={[scale, scale, scale]}
            position={position}
            rotation={[0, Math.PI / 4, 0]}
          />
        </TransformControls>
      ) : (
        <primitive 
          ref={modelRef}
          object={scene} 
          scale={[scale, scale, scale]}
          position={position}
          rotation={[0, Math.PI / 4, 0]}
        />
      )}
    </>
  );
}

const models = [
  {
    name: "Zomedome",
    path: "/models/zomedome.glb",
    scale: 1.0,
    description: "Geodome Moderno"
  }
];

function ARViewer() {
  const [currentModel, setCurrentModel] = useState(0);
  const [isAR, setIsAR] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [modelPosition, setModelPosition] = useState([0, -2, 0]);
  const [currentScale, setCurrentScale] = useState(models[0].scale);

  const checkARSupport = () => {
    return 'xr' in navigator;
  };

  useEffect(() => {
    setIsAR(checkARSupport());
    setCurrentScale(models[currentModel].scale);
  }, [currentModel]);

  const handleReset = () => {
    setModelPosition([0, -2, 0]);
    setCurrentScale(models[currentModel].scale);
    setIsLocked(false);
  };

  const handleScaleChange = (direction) => {
    if (!isLocked) {
      setCurrentScale(prev => direction === 'up' ? prev * 1.2 : prev * 0.8);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 py-20" id="ar-experience">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Visualize seu Geodome
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Explore nossos modelos em 3D e visualize em Realidade Aumentada
          </p>
          
          <div className="flex justify-center gap-4 mb-6">
            {models.map((model, index) => (
              <button
                key={model.name}
                onClick={() => setCurrentModel(index)}
                className={`px-4 py-2 rounded-lg ${
                  currentModel === index
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200'
                }`}
              >
                {model.name}
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => handleScaleChange('down')}
              disabled={isLocked}
              className={`px-4 py-2 rounded-lg ${
                isLocked ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Reduzir Tamanho
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700"
            >
              Resetar Posição
            </button>
            <button
              onClick={() => handleScaleChange('up')}
              disabled={isLocked}
              className={`px-4 py-2 rounded-lg ${
                isLocked ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Aumentar Tamanho
            </button>
            <button
              onClick={() => setIsLocked(!isLocked)}
              className={`px-4 py-2 rounded-lg ${
                isLocked ? 'bg-green-600' : 'bg-yellow-600'
              } text-white hover:opacity-90`}
            >
              {isLocked ? 'Desbloquear Modelo' : 'Fixar Modelo'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="h-[600px] relative">
            <Canvas
              camera={{ 
                position: [4, 2, 4],
                fov: 50,
                near: 0.1,
                far: 1000
              }}
              shadows
            >
              <Suspense fallback={<Loader />}>
                <ambientLight intensity={0.5} />
                <spotLight 
                  position={[10, 10, 10]} 
                  angle={0.15} 
                  penumbra={1} 
                  intensity={1} 
                  castShadow 
                />
                <Model 
                  modelPath={models[currentModel].path} 
                  scale={currentScale}
                  position={modelPosition}
                  isLocked={isLocked}
                  onPositionChange={setModelPosition}
                />
                <OrbitControls 
                  enablePan={true}
                  enableZoom={true}
                  minPolarAngle={0}
                  maxPolarAngle={Math.PI / 2}
                  minDistance={2}
                  maxDistance={20}
                  target={modelPosition}
                />
                <Environment preset="sunset" />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ARViewer;
