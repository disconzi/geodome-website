import { ObjectCaptureSession, ObjectCaptureView } from '@apple/reality-kit';

export async function startCaptureSession(req, res) {
  try {
    // Initialize RealityKit Object Capture session
    const session = new ObjectCaptureSession({
      outputDirectory: '/tmp/object-capture',
      smoothing: 'medium',
      detail: 'full',
    });

    // Configure capture settings
    await session.configure({
      sphericalHarmonicsLevel: 3,
      textureSize: 2048,
      sampleOrdering: 'sequential',
      featureScaling: 1.0,
    });

    // Generate a unique session ID
    const sessionId = Date.now().toString();

    // Store session for later use
    global.captureSessions = global.captureSessions || {};
    global.captureSessions[sessionId] = session;

    // Return session ID to client
    res.status(200).json({ sessionId });

  } catch (error) {
    console.error('Error starting capture session:', error);
    res.status(500).json({ error: 'Failed to start capture session' });
  }
}

export async function processCaptureData(req, res) {
  try {
    const { sessionId, captureData } = req.body;
    const session = global.captureSessions[sessionId];

    if (!session) {
      throw new Error('Session not found');
    }

    // Process the captured data
    const view = new ObjectCaptureView(captureData);
    await session.addView(view);

    // Check if we have enough data to generate the 3D model
    if (session.canGenerateModel) {
      // Generate the 3D model
      const model = await session.generateModel();

      // Convert to USDZ format
      const usdzData = await model.export('usdz');

      // Clean up
      delete global.captureSessions[sessionId];

      // Return the USDZ data
      res.status(200).json({
        modelData: usdzData.toString('base64'),
        format: 'usdz'
      });
    } else {
      // Need more captures
      res.status(202).json({
        message: 'Need more captures',
        requiredViews: session.requiredViews,
        capturedViews: session.capturedViews
      });
    }

  } catch (error) {
    console.error('Error processing capture data:', error);
    res.status(500).json({ error: 'Failed to process capture data' });
  }
}
