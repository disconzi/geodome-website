import React from 'react';

function ModelViewer({ modelUrl }) {
  return (
    <div className="w-full h-[400px] relative">
      <model-viewer
        src={modelUrl}
        ios-src={modelUrl.replace(/\.glb$/, '.usdz')}
        camera-controls
        auto-rotate
        style={{ width: '100%', height: '100%', backgroundColor: '#f3f4f6' }}
      />
    </div>
  );
}

export default ModelViewer;
