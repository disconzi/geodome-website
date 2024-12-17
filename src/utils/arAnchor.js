export async function getArAnchor(id) {
  try {
    const response = await fetch(`/api/save-ar-anchor?id=${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch AR anchor');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching AR anchor:', error);
    return null;
  }
}

export async function saveArAnchor(anchorData) {
  try {
    const response = await fetch('/api/save-ar-anchor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(anchorData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save AR anchor');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error saving AR anchor:', error);
    return null;
  }
}
