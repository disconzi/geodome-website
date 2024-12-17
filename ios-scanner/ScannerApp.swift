import SwiftUI
import RealityKit
import PhotogrammetrySession

@main
struct ScannerApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}

struct ContentView: View {
    @StateObject private var scannerModel = ScannerModel()
    
    var body: some View {
        VStack {
            if scannerModel.isScanning {
                CameraPreview(session: scannerModel.session)
                    .overlay(
                        VStack {
                            Text("Move around the object slowly")
                                .foregroundColor(.white)
                                .padding()
                                .background(Color.black.opacity(0.7))
                                .cornerRadius(10)
                            
                            Spacer()
                            
                            Button("Finish Scan") {
                                scannerModel.finishScan()
                            }
                            .padding()
                            .background(Color.blue)
                            .foregroundColor(.white)
                            .cornerRadius(10)
                            .padding(.bottom)
                        }
                    )
            } else {
                Button("Start Scan") {
                    scannerModel.startScan()
                }
                .padding()
                .background(Color.blue)
                .foregroundColor(.white)
                .cornerRadius(10)
            }
        }
    }
}

class ScannerModel: ObservableObject {
    @Published var isScanning = false
    var session: PhotogrammetrySession?
    
    func startScan() {
        guard let session = try? PhotogrammetrySession() else {
            print("Failed to create photogrammetry session")
            return
        }
        
        self.session = session
        isScanning = true
        
        // Configure session
        session.configuration = PhotogrammetrySession.Configuration(
            featureQuality: .high,
            sampleOrdering: .sequential
        )
    }
    
    func finishScan() {
        guard let session = session else { return }
        
        // Process the captured data
        let outputURL = FileManager.default.temporaryDirectory.appendingPathComponent("scan.usdz")
        
        try? session.process(requests: [
            .modelFile(url: outputURL, detail: .high)
        ])
        
        // Upload to web server
        uploadModel(at: outputURL)
        
        isScanning = false
        self.session = nil
    }
    
    private func uploadModel(at url: URL) {
        guard let modelData = try? Data(contentsOf: url) else { return }
        
        // Create upload request
        var request = URLRequest(url: URL(string: "https://your-website.com/api/upload-model")!)
        request.httpMethod = "POST"
        request.setValue("application/octet-stream", forHTTPHeaderField: "Content-Type")
        request.httpBody = modelData
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                print("Upload error: \(error)")
                return
            }
            
            // Handle successful upload
            if let response = response as? HTTPURLResponse, response.statusCode == 200 {
                print("Model uploaded successfully")
            }
        }.resume()
    }
}

struct CameraPreview: UIViewRepresentable {
    let session: PhotogrammetrySession
    
    func makeUIView(context: Context) -> UIView {
        let view = session.previewView
        view.backgroundColor = .black
        return view
    }
    
    func updateUIView(_ uiView: UIView, context: Context) {}
}
