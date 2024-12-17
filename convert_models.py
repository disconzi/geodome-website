import bpy
import os
import sys

def clean_scene():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()

def convert_skp_to_glb(input_file, output_file):
    # Clean the scene
    clean_scene()
    
    # Import SketchUp file
    bpy.ops.import_scene.skp(filepath=input_file)
    
    # Select all objects
    bpy.ops.object.select_all(action='SELECT')
    
    # Export as GLB
    bpy.ops.export_scene.gltf(
        filepath=output_file,
        export_format='GLB',
        use_selection=True,
        export_draco_mesh_compression_enable=True
    )

def main():
    # Source directory with .skp files
    skp_dir = "/Users/leandrodisconzi/Desktop/Stock Aware 2025/Zome/3d"
    # Target directory for .glb files
    glb_dir = "/Users/leandrodisconzi/CascadeProjects/geodome-website/public/models"
    
    # Create output directory if it doesn't exist
    os.makedirs(glb_dir, exist_ok=True)
    
    # Convert each .skp file
    for filename in os.listdir(skp_dir):
        if filename.endswith(".skp"):
            input_path = os.path.join(skp_dir, filename)
            output_path = os.path.join(glb_dir, filename.replace('.skp', '.glb'))
            
            print(f"Converting {filename}...")
            try:
                convert_skp_to_glb(input_path, output_path)
                print(f"Successfully converted {filename} to GLB")
            except Exception as e:
                print(f"Error converting {filename}: {str(e)}")

if __name__ == "__main__":
    main()
