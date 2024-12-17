const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// In-memory storage (replace with a database in production)
const arAnchors = new Map();

// Calculate distance between two points in meters
function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
}

// Save AR anchor
router.post('/save-ar-anchor', (req, res) => {
    const anchorId = uuidv4();
    const anchorData = {
        id: anchorId,
        ...req.body,
        timestamp: Date.now()
    };
    
    arAnchors.set(anchorId, anchorData);
    res.json({ id: anchorId });
});

// Get AR anchor by ID
router.get('/ar-anchor/:id', (req, res) => {
    const anchorData = arAnchors.get(req.params.id);
    if (!anchorData) {
        res.status(404).json({ error: 'Anchor not found' });
        return;
    }
    res.json(anchorData);
});

// Get nearby anchors
router.get('/nearby-anchors', (req, res) => {
    const { latitude, longitude, radius = 100 } = req.query;
    
    if (!latitude || !longitude) {
        res.status(400).json({ error: 'Latitude and longitude are required' });
        return;
    }

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    const maxDistance = parseFloat(radius);

    // Find all anchors within the specified radius
    const nearbyAnchors = Array.from(arAnchors.values())
        .filter(anchor => {
            if (!anchor.geolocation) return false;
            
            const distance = getDistanceFromLatLonInMeters(
                lat,
                lon,
                anchor.geolocation.latitude,
                anchor.geolocation.longitude
            );
            
            return distance <= maxDistance;
        })
        .map(anchor => ({
            ...anchor,
            distance: getDistanceFromLatLonInMeters(
                lat,
                lon,
                anchor.geolocation.latitude,
                anchor.geolocation.longitude
            )
        }))
        .sort((a, b) => a.distance - b.distance);

    res.json(nearbyAnchors);
});

module.exports = router;
