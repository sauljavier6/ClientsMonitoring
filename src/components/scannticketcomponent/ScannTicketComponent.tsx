import { useEffect, useRef } from 'react';
import { BrowserMultiFormatReader, type IScannerControls } from '@zxing/browser';

interface Props {
  onDetected: (code: string) => void;
}

export default function TicketScanner({ onDetected }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);
  const controlsRef = useRef<IScannerControls | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    if (!codeReaderRef.current) {
      codeReaderRef.current = new BrowserMultiFormatReader();
    }
    const codeReader = codeReaderRef.current;

    let isActive = true;

    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        if (!isActive) return;

        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        console.log('Cámaras detectadas:', videoDevices);
        if (videoDevices.length === 0) {
          alert('No se detectaron cámaras');
          return;
        }
        const firstDeviceId = videoDevices[0].deviceId;

        codeReader.decodeFromVideoDevice(firstDeviceId, videoRef.current!, (result, err, controls) => {
          if (err) {
            if (err.name !== 'NotFoundException') {
              console.warn('Error de escaneo:', err);
            }
            return;
          }
          if (result) {
            console.log('Código detectado:', result.getText());
            onDetected(result.getText());
            // No detengas el escaneo aquí para seguir detectando
          }
          if (controls && !controlsRef.current) {
            controlsRef.current = controls;
          }
        }).catch(err => {
          console.error('Error al iniciar la cámara:', err);
          alert('No se pudo acceder a la cámara. Verifica permisos o conexión.');
        });
      });

    return () => {
      isActive = false;
      controlsRef.current?.stop();
      controlsRef.current = null;
    };
  }, [onDetected]);

  return (
    <div>
      <video ref={videoRef} className="w-full max-h-64 border" />
    </div>
  );
}
