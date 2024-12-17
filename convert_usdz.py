import os
from pxr import Usd, UsdGeom

def convert_usdz_to_gltf():
    input_path = os.path.expanduser("~/Library/Mobile Documents/com~apple~CloudDocs/ZomePod.usdz")
    output_path = "./public/models/ZomePod.gltf"
    
    # Ensure output directory exists
    os.makedirs("./public/models", exist_ok=True)
    
    # Open the USD stage
    stage = Usd.Stage.Open(input_path)
    
    # Export to GLTF
    UsdGeom.SetStageUpAxis(stage, UsdGeom.Tokens.y)
    stage.Export(output_path)

if __name__ == "__main__":
    convert_usdz_to_gltf()
