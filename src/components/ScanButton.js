import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const ScanButton = ({ onModelUploaded }) => {
  const [showQR, setShowQR] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [scanning, setScanning] = useState(false);

  const startScanning = () => {
    const newSessionId = Math.random().toString(36).substring(7);
    setSessionId(newSessionId);
    setShowQR(true);
    setScanning(true);
    pollForModel(newSessionId);
  };

  const pollForModel = async (sid) => {
    if (!scanning) return;

    try {
      const response = await fetch(`/api/scan-status/${sid}`);
      const data = await response.json();

      if (data.status === 'complete' && data.modelUrl) {
        setShowQR(false);
        setScanning(false);
        onModelUploaded(data.modelUrl);
      } else if (data.status === 'processing') {
        // Poll again in 3 seconds
        setTimeout(() => pollForModel(sid), 3000);
      }
    } catch (error) {
      console.error('Error checking scan status:', error);
      setShowQR(false);
      setScanning(false);
    }
  };

  const getQRContent = () => {
    // This URL should point to your iOS app's custom URL scheme
    return `rosasdodeserto://scan/${sessionId}`;
  };

  return (
    <div className="scan-button-container">
      <button
        onClick={startScanning}
        className="scan-button"
        disabled={scanning}
      >
        {scanning ? 'Scanning in progress...' : 'Scan New Object'}
      </button>

      {showQR && (
        <div className="qr-modal">
          <div className="qr-content">
            <h3>Scan QR Code</h3>
            <p>Open the Rosas do Deserto app to scan your object</p>
            <QRCode value={getQRContent()} size={256} />
            <button onClick={() => setShowQR(false)}>Close</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .scan-button-container {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 1000;
        }

        .scan-button {
          background: #2196F3;
          color: white;
          padding: 1rem 2rem;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .scan-button:hover {
          background: #1976D2;
        }

        .scan-button:disabled {
          background: #90CAF9;
          cursor: not-allowed;
        }

        .qr-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .qr-content {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          text-align: center;
        }

        .qr-content h3 {
          margin-top: 0;
        }

        .qr-content button {
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          background: #f44336;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default ScanButton;
