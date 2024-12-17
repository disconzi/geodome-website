import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { USDZExporter } from 'three/examples/jsm/exporters/USDZExporter';

export async function convertToUSDZ(glbUrl) {
  try {
    // Load the GLB file
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(glbUrl);
    
    // Export to USDZ
    const exporter = new USDZExporter();
    const usdzArrayBuffer = await exporter.parse(gltf.scene);
    
    // Create Blob and URL
    const blob = new Blob([usdzArrayBuffer], { type: 'model/vnd.usdz+zip' });
    const usdzUrl = URL.createObjectURL(blob);
    
    return usdzUrl;
  } catch (error) {
    console.error('Error converting to USDZ:', error);
    return null;
  }
}
