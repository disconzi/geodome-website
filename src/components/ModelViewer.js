import React, { useEffect } from 'react';
import '@google/model-viewer';

function ModelViewer({ modelUrl, iosUrl }) {
  return (
    <div className="w-full h-[400px] relative">
      <model-viewer
        src={modelUrl}
        ios-src={iosUrl}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        auto-rotate
        ar-scale="fixed"
        exposure="0.5"
        shadow-intensity="1"
        environment-image="neutral"
        style={{ width: '100%', height: '100%', backgroundColor: '#f3f4f6' }}
      >
        <button
          slot="ar-button"
          className="absolute bottom-4 right-4 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-emerald-700 transition-colors flex items-center"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Ver em AR
        </button>
      </model-viewer>
    </div>
  );
}

export default ModelViewer;
