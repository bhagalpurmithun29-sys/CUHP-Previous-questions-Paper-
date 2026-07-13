import React, { useRef, useState, useEffect } from 'react';
import { useScanner } from '../hooks/useScanner';

export const CameraView: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState('');
  const { preprocessImage } = useScanner();

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      setError(err.message || 'Unable to access camera.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const capturePhoto = async () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(dataUrl);
        stopCamera();
        
        // Trigger preprocessing immediately
        preprocessImage.mutate({ fileData: dataUrl, options: { autoCrop: true } });
      }
    }
  };

  const retake = () => {
    setCapturedImage(null);
    startCamera();
  };

  if (error) {
    return <div className="p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>;
  }

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[3/4] bg-black rounded-2xl overflow-hidden flex flex-col shadow-2xl">
      {!capturedImage ? (
        <>
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-cover"
          />
          {/* Guide Overlay */}
          <div className="absolute inset-0 border-2 border-white/30 m-8 rounded-lg pointer-events-none flex items-center justify-center">
             <div className="w-16 h-16 border-t-2 border-l-2 border-indigo-500 absolute top-0 left-0" />
             <div className="w-16 h-16 border-t-2 border-r-2 border-indigo-500 absolute top-0 right-0" />
             <div className="w-16 h-16 border-b-2 border-l-2 border-indigo-500 absolute bottom-0 left-0" />
             <div className="w-16 h-16 border-b-2 border-r-2 border-indigo-500 absolute bottom-0 right-0" />
             <p className="text-white/50 text-sm font-semibold">Position document within frame</p>
          </div>
          
          <div className="absolute bottom-0 inset-x-0 p-6 flex justify-center pb-10 bg-gradient-to-t from-black/80 to-transparent">
            <button 
              onClick={capturePhoto}
              className="w-16 h-16 rounded-full bg-white border-4 border-gray-300 active:scale-95 transition-transform"
              aria-label="Take Photo"
            />
          </div>
        </>
      ) : (
        <div className="relative w-full h-full bg-gray-900 flex items-center justify-center">
          <img src={capturedImage} alt="Captured" className="w-full h-full object-contain" />
          
          {preprocessImage.isPending && (
             <div className="absolute inset-0 bg-black/60 flex items-center justify-center flex-col gap-4">
                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-white font-medium">Enhancing & OCR Validation...</p>
             </div>
          )}

          {!preprocessImage.isPending && (
            <div className="absolute bottom-0 inset-x-0 p-6 flex justify-between bg-gradient-to-t from-black/80 to-transparent">
              <button 
                onClick={retake}
                className="px-6 py-2 bg-gray-800 text-white rounded-full font-medium"
              >
                Retake
              </button>
              <button 
                className="px-6 py-2 bg-indigo-600 text-white rounded-full font-medium"
              >
                Keep Scan
              </button>
            </div>
          )}
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
