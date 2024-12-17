// API endpoints for handling 3D scanning
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

export const checkScanStatus = async (sessionId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/scan-status/${sessionId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error checking scan status:', error);
    throw error;
  }
};

export const uploadScanResult = async (sessionId, modelData) => {
  try {
    const formData = new FormData();
    formData.append('model', modelData);
    formData.append('sessionId', sessionId);

    const response = await fetch(`${API_BASE_URL}/api/upload-scan`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error uploading scan result:', error);
    throw error;
  }
};
