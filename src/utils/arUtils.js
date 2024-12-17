export const getARUrl = async (modelUrl) => {
  try {
    // First check if USDZ file already exists
    const usdzUrl = modelUrl.replace('.glb', '.usdz');
    const response = await fetch(usdzUrl, { method: 'HEAD' });
    
    if (response.ok) {
      return usdzUrl;
    }

    // If USDZ file doesn't exist, convert it
    const convertResponse = await fetch('/api/convert-to-reality', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ glbPath: modelUrl }),
    });

    if (!convertResponse.ok) {
      throw new Error('Failed to convert file');
    }

    const { usdzPath } = await convertResponse.json();
    return usdzPath;
  } catch (error) {
    console.error('Error getting AR URL:', error);
    throw error;
  }
};
