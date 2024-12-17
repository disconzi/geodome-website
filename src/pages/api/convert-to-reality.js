const { convertToUSDZ } = require('../../utils/convertToReality');
const path = require('path');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { glbPath } = req.body;

    if (!glbPath) {
      return res.status(400).json({ error: 'GLB path is required' });
    }

    // Convert relative path to absolute path
    const absolutePath = path.resolve(process.cwd(), glbPath);

    // Convert the file
    const usdzPath = await convertToUSDZ(absolutePath);

    // Return the path to the converted file
    res.status(200).json({ usdzPath });
  } catch (error) {
    console.error('Error in convert-to-usdz:', error);
    res.status(500).json({ error: error.message });
  }
}
