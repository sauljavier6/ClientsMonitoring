// src/components/BarcodeScanner.tsx
import { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, type IScannerControls } from '@zxing/browser';

interface Props {
  onDetected: (code: string) => void;
}

export default function TicketScanner({ onDetected }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [controls, setControls] = useState<IScannerControls | null>(null);

  navigator.mediaDevices.enumerateDevices()
  .then(devices => {
    const videoDevices = devices.filter(device => device.kind === 'videoinput');
    console.log('Cámaras detectadas:', videoDevices);
  })
  .catch(error => {
    console.error('Error al enumerar dispositivos:', error);
  });


  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    codeReader
      .decodeFromVideoDevice(undefined, videoRef.current!, (result, err, _controls) => {
        if (err) {
          console.warn("Error de escaneo:", err);
        }
        if (result) {
          onDetected(result.getText());
          _controls?.stop();
        }
        if (_controls && !controls) {
          setControls(_controls);
        }
      })
      .catch((error) => {
        console.error("Error al iniciar el lector:", error);
        alert("No se pudo acceder a la cámara. Verifica permisos o conexión.");
      });

    return () => {
      controls?.stop();
    };
  }, [onDetected]);

  return (
    <div>
      <video ref={videoRef} className="w-full max-h-64 border" />
    </div>
  );
};
