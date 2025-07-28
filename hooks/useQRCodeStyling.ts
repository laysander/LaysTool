import React, { useEffect, useRef, useCallback } from 'react';
import QRCodeStyling from 'qr-code-styling';
import type { Options as QRCodeStylingOptions } from 'qr-code-styling';

export const useQRCodeStyling = (options: QRCodeStylingOptions) => {
  const qrCodeRef = useRef<QRCodeStyling | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Combined effect for initialization and updates
  useEffect(() => {
    if (!ref.current) return;

    // Initialize the QR code instance only once
    if (!qrCodeRef.current) {
      qrCodeRef.current = new QRCodeStyling(options);
      qrCodeRef.current.append(ref.current);
    } else {
      // On subsequent renders, just update the existing instance
      qrCodeRef.current.update(options);
    }
  }, [options]);

  const handleDownload = useCallback(async (extension: 'png' | 'svg') => {
    if (!qrCodeRef.current) return;
    try {
        await qrCodeRef.current.download({ name: 'qrcode', extension });
    } catch(error) {
        console.error("Download failed", error);
        alert("Could not download QR Code.");
    }
  }, []);

  return { ref, handleDownload };
};