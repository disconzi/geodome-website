import express from 'express';
import { startCaptureSession, processCaptureData } from './objectCapture';

const router = express.Router();

router.post('/start-capture', startCaptureSession);
router.post('/process-capture', processCaptureData);

export default router;
