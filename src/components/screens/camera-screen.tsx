"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, FlipHorizontal, Loader2, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

interface CameraScreenProps {
  onCapture: (imageData: string) => void;
  onBack: () => void;
}

export function CameraScreen({ onCapture, onBack }: CameraScreenProps) {
  const webcamRef = useRef<Webcam>(null);

  const [isCapturing, setIsCapturing] = useState(false);
  const [cameraError, setCameraError] = useState<string>("");
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");

  const handleUserMedia = useCallback(() => {
    console.log("✅ Camera ready");
  }, []);

  const handleUserMediaError = useCallback((error: string | DOMException) => {
    console.error("❌ Camera error:", error);
    const errorMessage = typeof error === "string" ? error : error.message;
    if (errorMessage.includes("Permission denied") || errorMessage.includes("NotAllowedError")) {
      setCameraError("Camera permission denied. Please allow camera access.");
    } else if (errorMessage.includes("NotFoundError")) {
      setCameraError("No camera found. Please connect a camera.");
    } else {
      setCameraError("Unable to access camera. Please check permissions.");
    }
  }, []);

  const handleCapture = useCallback(() => {
    if (!webcamRef.current) return;

    setIsCapturing(true);

    // Capture screenshot from webcam
    const imageSrc = webcamRef.current.getScreenshot();

    if (imageSrc) {
      console.log("📸 Image captured");
      // Pass image data to parent
      setTimeout(() => {
        onCapture(imageSrc);
        setIsCapturing(false);
      }, 500);
    } else {
      console.error("Failed to capture image");
      setIsCapturing(false);
    }
  }, [onCapture]);

  const handleFlipCamera = useCallback(() => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  }, []);

  const videoConstraints = {
    width: 1920,
    height: 1080,
    facingMode: facingMode,
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 bg-linear-to-b from-black/60 to-transparent">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <X className="w-6 h-6" />
          </Button>
          <h2 className="text-white font-semibold">Scan Ingredients</h2>
          <div className="w-10" />
        </div>
      </div>

      {/* Camera Viewfinder */}
      <div className="absolute inset-0">
        {cameraError ? (
          // Error State
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4 px-6">
              <AlertCircle className="w-16 h-16 mx-auto text-red-500" />
              <p className="text-white text-lg font-medium">Camera Access Required</p>
              <p className="text-white/70 text-sm max-w-md">{cameraError}</p>
              <Button variant="secondary" onClick={onBack} className="mt-4">
                Go Back
              </Button>
            </div>
          </div>
        ) : (
          // Camera View
          <>
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              onUserMedia={handleUserMedia}
              onUserMediaError={handleUserMediaError}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              className="absolute inset-0"
            />

            {/* Camera Frame Guide Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10">
              <div className="absolute top-20 left-8 right-8 bottom-48 border-2 border-dashed border-white/40 rounded-2xl" />

              {/* Corner Guides */}
              <div className="absolute top-20 left-8 w-8 h-8 border-l-4 border-t-4 border-primary rounded-tl-lg" />
              <div className="absolute top-20 right-8 w-8 h-8 border-r-4 border-t-4 border-primary rounded-tr-lg" />
              <div className="absolute bottom-48 left-8 w-8 h-8 border-l-4 border-b-4 border-primary rounded-bl-lg" />
              <div className="absolute bottom-48 right-8 w-8 h-8 border-r-4 border-b-4 border-primary rounded-br-lg" />

              {/* Instruction Text */}
              {!isCapturing && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-3 space-y-1">
                    <p className="text-white font-medium">Position ingredients in frame</p>
                    <p className="text-white/70 text-sm">Make sure items are clearly visible</p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Bottom Controls */}
      {!cameraError && (
        <div className="absolute bottom-0 left-0 right-0 z-20 p-8 bg-linear-to-t from-black/80 to-transparent">
          <div className="flex items-center justify-center gap-8">
            {/* Flip Camera Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFlipCamera}
              disabled={isCapturing}
              className="text-white hover:bg-white/20 disabled:opacity-50"
            >
              <FlipHorizontal className="w-6 h-6" />
            </Button>

            {/* Capture Button */}
            <Button
              size="icon"
              onClick={handleCapture}
              disabled={isCapturing}
              className="w-20 h-20 rounded-full bg-white hover:bg-white/90 disabled:opacity-50"
            >
              {isCapturing ? (
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              ) : (
                <div className="w-16 h-16 rounded-full border-4 border-primary" />
              )}
            </Button>

            {/* Spacer for symmetry */}
            <div className="w-10 h-10" />
          </div>

          {/* Instruction */}
          <p className="text-center text-white/70 text-sm mt-4">Tap the button to capture</p>
        </div>
      )}
    </div>
  );
}
