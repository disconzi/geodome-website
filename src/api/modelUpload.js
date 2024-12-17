import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Store active scanning sessions
const sessions = new Map();

// Start a new scanning session
router.post('/start-session', (req, res) => {
    const sessionId = Math.random().toString(36).substring(7);
    sessions.set(sessionId, { status: 'waiting' });
    res.json({ sessionId });
});

// Upload scanned model
router.post('/upload-model/:sessionId', upload.single('model'), (req, res) => {
    const { sessionId } = req.params;
    const session = sessions.get(sessionId);

    if (!session) {
        return res.status(404).json({ error: 'Session not found' });
    }

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Update session with model information
    sessions.set(sessionId, {
        status: 'complete',
        modelUrl: `/uploads/${req.file.filename}`
    });

    res.json({ success: true });
});

// Check model status
router.get('/check-model/:sessionId', (req, res) => {
    const { sessionId } = req.params;
    const session = sessions.get(sessionId);

    if (!session) {
        return res.status(404).json({ error: 'Session not found' });
    }

    res.json({
        status: session.status,
        modelUrl: session.modelUrl
    });
});

export default router;
