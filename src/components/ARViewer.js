import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

export default function ARViewer() {
  const { modelId } = useParams();
  const [searchParams] = useSearchParams();
  const modelUrl = searchParams.get('model');

  useEffect(() => {
    if (!modelUrl) {
      console.error('No model URL provided');
      return;
    }

    console.log('AR Viewer - Model URL:', modelUrl);

    // For iOS, use USDZ file directly
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      const usdzUrl = modelUrl.replace(/\.glb$/, '.usdz');
      console.log('iOS - Redirecting to:', usdzUrl);
      window.location.href = usdzUrl;
      return;
    }
    
    // For other devices, use the AR handler with GLB
    const handlerUrl = `${window.location.origin}/ar-handler.html?model=${encodeURIComponent(modelUrl)}`;
    console.log('Non-iOS - Redirecting to:', handlerUrl);
    window.location.href = handlerUrl;
  }, [modelUrl]);

  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Preparando visualizador AR...</p>
        <p className="text-sm text-gray-500 mt-2">Aguarde enquanto carregamos o modelo 3D...</p>
      </div>
    </div>
  );
}