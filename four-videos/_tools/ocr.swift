import Foundation
import Vision
import AppKit

let args = CommandLine.arguments.dropFirst()
for path in args {
    guard let img = NSImage(contentsOfFile: path), let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else { print("\(path)\tERROR"); continue }
    let req = VNRecognizeTextRequest()
    req.recognitionLevel = .accurate
    req.usesLanguageCorrection = false
    req.recognitionLanguages = ["en-US", "ar-SA"]
    let h = VNImageRequestHandler(cgImage: cg, options: [:])
    try? h.perform([req])
    let lines = (req.results ?? []).compactMap { $0.topCandidates(1).first?.string }
    print("\(path)\t" + lines.joined(separator: " | "))
}
