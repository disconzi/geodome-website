import { v4 as uuidv4 } from 'uuid';

// In-memory storage for demo purposes
// In production, use a proper database
const arAnchors = new Map();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const anchorData = req.body;
      const id = uuidv4();
      
      // Save anchor data with generated ID
      arAnchors.set(id, {
        ...anchorData,
        id,
        createdAt: new Date().toISOString()
      });

      // Return the ID to the client
      res.status(200).json({ id });
    } catch (error) {
      console.error('Error saving AR anchor:', error);
      res.status(500).json({ error: 'Failed to save AR anchor' });
    }
  } else if (req.method === 'GET') {
    try {
      const { id } = req.query;
      
      if (!id) {
        return res.status(400).json({ error: 'Anchor ID is required' });
      }

      const anchorData = arAnchors.get(id);
      
      if (!anchorData) {
        return res.status(404).json({ error: 'Anchor not found' });
      }

      // Return the anchor data
      res.status(200).json(anchorData);
    } catch (error) {
      console.error('Error retrieving AR anchor:', error);
      res.status(500).json({ error: 'Failed to retrieve AR anchor' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
