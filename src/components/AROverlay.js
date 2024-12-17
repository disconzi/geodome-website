import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';

const AROverlay = () => {
  const [showQRCode, setShowQRCode] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if we're on iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isIOS) {
      setIsVisible(true);
    }
  }, []);

  const handleSaveLocation = async () => {
    if ('geolocation' in navigator) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          });
        });

        const orientation = await new Promise((resolve) => {
          if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
              .then(permissionState => {
                if (permissionState === 'granted') {
                  window.addEventListener('deviceorientation', function handleOrientation(event) {
                    window.removeEventListener('deviceorientation', handleOrientation);
                    resolve({
                      alpha: event.alpha,
                      beta: event.beta,
                      gamma: event.gamma
                    });
                  });
                } else {
                  resolve(null);
                }
              })
              .catch(() => resolve(null));
          } else {
            resolve(null);
          }
        });

        const modelUrl = new URL(window.location.href).searchParams.get('url');
        const anchorData = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          modelUrl: modelUrl,
          deviceOrientation: orientation,
          timestamp: new Date().toISOString()
        };

        // Create shareable URL with location data
        const shareUrl = `${window.location.origin}/ar-view?data=${encodeURIComponent(JSON.stringify(anchorData))}`;
        setShareUrl(shareUrl);
        setShowQRCode(true);
      } catch (error) {
        console.error('Error saving location:', error);
        alert('Erro ao salvar localização. Por favor, permita acesso à localização.');
      }
    } else {
      alert('Seu dispositivo não suporta geolocalização.');
    }
  };

  if (!isVisible) return null;

  return (
    <div id="ar-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      pointerEvents: 'none'
    }}>
      {!showQRCode && (
        <button
          onClick={handleSaveLocation}
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#10b981',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '16px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            pointerEvents: 'auto',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 10000
          }}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Salvar Localização
        </button>
      )}

      {showQRCode && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'white',
          padding: '16px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          pointerEvents: 'auto',
          zIndex: 10000
        }}>
          <QRCode value={shareUrl} size={200} />
          <p style={{
            marginTop: '12px',
            textAlign: 'center',
            color: '#374151',
            fontSize: '14px'
          }}>
            Escaneie para ver neste local
          </p>
          <button
            onClick={() => setShowQRCode(false)}
            style={{
              marginTop: '12px',
              width: '100%',
              padding: '8px',
              backgroundColor: '#f3f4f6',
              color: '#374151',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          >
            Fechar
          </button>
        </div>
      )}
    </div>
  );
};

export default AROverlay;
