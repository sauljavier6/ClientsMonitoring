import { useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';

interface Props {
  onScan: (codigo: string) => void;
}

export default function BarcodeScanner({ onScan }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let isMounted = true;
    const codeReader = new BrowserMultiFormatReader();

    if (!videoRef.current) return;

    codeReader
      .decodeFromVideoDevice('', videoRef.current, (result, error, controls) => {
        if (!isMounted) return;

        if (result) {
          const code = result.getText();
          console.log("✅ Código detectado:", code);
          onScan(code);
          controls.stop(); // ✅ Detener bien el stream
        }

        if (error && error.name !== 'NotFoundException') {
          console.warn("⚠️ Error de escaneo:", error);
        }
      })
      .catch((err) => {
        console.error("🚫 Error al iniciar cámara:", err);
      });

    return () => {
      isMounted = false;

      const video = document.getElementById('video') as HTMLVideoElement;
      if (video?.srcObject) {
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop()); // Detiene la cámara
        video.srcObject = null;
      }

      // Si deseas eliminar referencias o limpiar codeReader
      (codeReader as any).reset?.(); // Por si existe en tiempo de ejecución
    };

  }, [onScan]);


  return (
    <div>
      <video
        ref={videoRef}
        style={{
          width: '100%',
          maxWidth: '500px',
          aspectRatio: '16/9',
          border: '1px solid #ccc'
        }}
      />
    </div>
  );
}
