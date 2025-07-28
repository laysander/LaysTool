import React, { useEffect, useState, useRef } from 'react';
import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode';
import Button from '../Button';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (decodedText: string) => void;
}

const scannerContainerId = "qr-reader";

const QRScannerModal: React.FC<QRScannerModalProps> = ({ isOpen, onClose, onScanSuccess }) => {
  // Use a ref to hold the single instance of the scanner library
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    // Initialize the scanner instance only if it doesn't exist.
    if (!html5QrCodeRef.current) {
        // We target the div by its ID, so it must exist in the DOM when this runs.
        html5QrCodeRef.current = new Html5Qrcode(scannerContainerId, { verbose: false });
    }
    const scanner = html5QrCodeRef.current;
    setScanError(null);

    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    // Start scanning
    scanner.start(
      { facingMode: "environment" },
      config,
      (decodedText, decodedResult) => {
        // Stop the scanner and call the success callback
        if (scanner.getState() === Html5QrcodeScannerState.SCANNING) {
            scanner.stop();
        }
        onScanSuccess(decodedText);
      },
      (errorMessage) => {
        // This callback is called frequently on non-scans, so we ignore it.
        // Critical errors are caught by the .catch() below.
      }
    ).catch((err) => {
      setScanError(`Camera Error: ${err.message}. Ensure you have granted permissions and have a working camera.`);
    });

    // The cleanup function for this effect will be called when `isOpen` becomes false.
    return () => {
      if (scanner?.getState() === Html5QrcodeScannerState.SCANNING) {
        scanner.stop().catch(err => {
          console.error("Failed to stop scanner on cleanup:", err);
        });
      }
    };
  }, [isOpen, onScanSuccess]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white w-full max-w-md border-4 border-black shadow-[8px_8px_0_#551EFD] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b-2 border-black flex justify-between items-center">
            <h2 className="text-2xl font-black">Scan QR Code</h2>
            <button onClick={onClose} className="text-3xl font-bold leading-none" aria-label="Close scanner">&times;</button>
        </div>
        <div className="p-4 bg-gray-100">
            {/* This div must always be in the DOM when the modal is open for the scanner to attach */}
            <div id={scannerContainerId} className="w-full rounded-lg overflow-hidden border-2 border-black"></div>
            {scanError && <p className="mt-4 p-3 bg-red-100 border-2 border-red-500 text-red-700 font-bold text-center">{scanError}</p>}
        </div>
        <div className="p-4 border-t-2 border-black">
            <Button onClick={onClose} variant="secondary" className="w-full">Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default QRScannerModal;