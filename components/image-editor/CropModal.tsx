import React, { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import type { Point, Area } from 'react-easy-crop';
import type { ProcessedImage, CroppedAreaPixels } from '../../types';
import Button from '../Button';

interface CropModalProps {
  image: ProcessedImage;
  onClose: () => void;
  onSave: (id: string, croppedAreaPixels: CroppedAreaPixels) => void;
}

const CropModal: React.FC<CropModalProps> = ({ image, onClose, onSave }) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const originalAspectRatio = image.width / image.height;
  const [aspect, setAspect] = useState<number>(originalAspectRatio);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null);

  const aspectRatios = [
    { valueStr: String(originalAspectRatio), text: 'Original' },
    { valueStr: String(1 / 1), text: '1:1' },
    { valueStr: String(4 / 3), text: '4:3' },
    { valueStr: String(3 / 4), text: '3:4' },
    { valueStr: String(4 / 5), text: '4:5' },
    { valueStr: String(5 / 4), text: '5:4' },
    { valueStr: String(16 / 9), text: '16:9' },
    { valueStr: String(9 / 16), text: '9:16' },
    { valueStr: String(21 / 9), text: '21:9' },
    { valueStr: String(9 / 21), text: '9:21' },
  ];

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: CroppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  
  const handleSave = () => {
    if(croppedAreaPixels) {
      onSave(image.id, croppedAreaPixels);
    }
  };
  
  const handleAspectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setAspect(Number(value));
  };
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);
  
  // Close modal on escape key press
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);


  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-70 z-50 flex flex-col items-center justify-center p-4"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="bg-white w-full max-w-4xl h-full max-h-[90vh] border-4 border-black shadow-[8px_8px_0_#551EFD] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative flex-grow bg-gray-900">
            <Cropper
                image={image.previewUrl}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
            />
        </div>
        <div className="bg-white p-4 border-t-4 border-black flex flex-col md:flex-row items-center gap-4 flex-wrap">
            <div className='flex items-center gap-2'>
                <label htmlFor="zoom" className="font-bold">Zoom</label>
                <input
                    id="zoom"
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="zoom-label"
                    className="w-32 accent-[#551EFD]"
                    onChange={(e) => setZoom(Number(e.target.value))}
                />
            </div>
            <div className="flex items-center gap-2">
                 <label htmlFor="aspect-ratio" className="font-bold">Aspect Ratio:</label>
                <select 
                    id="aspect-ratio"
                    className="p-2 border-2 border-black font-bold bg-white focus:outline-none focus:ring-2 focus:ring-[#551EFD]"
                    onChange={handleAspectChange}
                    value={String(aspect)}
                >
                    {aspectRatios.map(ratio => (
                        <option key={ratio.text} value={ratio.valueStr}>
                            {ratio.text}
                        </option>
                    ))}
                </select>
            </div>
            <div className="md:ml-auto flex gap-2">
                <Button onClick={onClose} className="bg-gray-200 text-black shadow-[4px_4px_0_#0b0b0b] hover:shadow-[2px_2px_0_#0b0b0b]">Cancel</Button>
                <Button onClick={handleSave} variant="primary">Save Crop</Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CropModal;