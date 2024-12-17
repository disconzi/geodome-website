import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ARView() {
  const { id } = useParams();
  const [anchorData, setAnchorData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAnchorData = async () => {
      try {
        const response = await fetch(`/api/ar-anchor/${id}`);
        if (!response.ok) {
          throw new Error('Failed to load AR anchor data');
        }
        const data = await response.json();
        setAnchorData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnchorData();
  }, [id]);

  useEffect(() => {
    if (anchorData && 'geolocation' in navigator) {
      // Watch user's position
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const distance = calculateDistance(
            position.coords.latitude,
            position.coords.longitude,
            anchorData.lat,
            anchorData.lng
          );

          // If user is within 5 meters of the anchor
          if (distance < 5) {
            // Request device orientation permission if needed
            if (typeof DeviceOrientationEvent.requestPermission === 'function') {
              DeviceOrientationEvent.requestPermission();
            }

            // Start AR experience
            initializeAR(anchorData);
          }
        },
        null,
        { enableHighAccuracy: true }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [anchorData]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
  };

  const initializeAR = (anchorData) => {
    // Initialize AR session with the saved orientation
    const arElement = document.createElement('a-entity');
    arElement.setAttribute('gltf-model', anchorData.modelUrl);
    arElement.setAttribute('position', '0 0 0');
    arElement.setAttribute('rotation', `${anchorData.deviceOrientation.beta} ${anchorData.deviceOrientation.alpha} ${anchorData.deviceOrientation.gamma}`);
    
    document.querySelector('a-scene').appendChild(arElement);
  };

  if (isLoading) {
    return <div className="text-center p-4">Carregando experiência AR...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-600">Erro: {error}</div>;
  }

  return (
    <div>
      <a-scene
        vr-mode-ui="enabled: false"
        arjs="sourceType: webcam; debugUIEnabled: false;"
      >
        <a-camera gps-camera rotation-reader></a-camera>
      </a-scene>
      
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
        Procurando localização salva...
      </div>
    </div>
  );
}

export default ARView;
