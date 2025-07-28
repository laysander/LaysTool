import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { ProcessedImage, ImageAdjustments } from '../../types';
import { defaultAdjustments, applyCanvasAdjustments } from '../../hooks/useImageProcessor';
import Button from '../Button';

interface EditModalProps {
  image: ProcessedImage;
  onClose: () => void;
  onSave: (id: string, adjustments: ImageAdjustments) => void;
}

interface AdjustmentSliderProps {
    label: string;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
}

const AdjustmentSlider: React.FC<AdjustmentSliderProps> = ({ label, value, onChange, min = -100, max = 100, step = 1, disabled = false }) => (
    <div>
        <label className="block text-sm font-bold mb-1 flex justify-between">
            <span>{label}</span>
            <span className="font-mono">{disabled ? 'N/A' : value}</span>
        </label>
        <input 
            type="range" 
            min={min} 
            max={max} 
            step={step} 
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#551EFD] disabled:accent-gray-400 disabled:cursor-not-allowed"
        />
    </div>
);


const EditModal: React.FC<EditModalProps> = ({ image, onClose, onSave }) => {
  const [tempAdjustments, setTempAdjustments] = useState<ImageAdjustments>(image.adjustments);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Reset temporary adjustments when a new image is passed in
    setTempAdjustments(image.adjustments);
  }, [image]);

  // Effect to draw and update canvas preview
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
        const container = canvas.parentElement;
        if (!container) return;
        
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const imgAspectRatio = img.width / img.height;

        let canvasWidth = containerWidth;
        let canvasHeight = canvasWidth / imgAspectRatio;

        if (canvasHeight > containerHeight) {
            canvasHeight = containerHeight;
            canvasWidth = canvasHeight * imgAspectRatio;
        }

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        applyCanvasAdjustments(ctx, tempAdjustments);
    };
    img.src = image.previewUrl;
  }, [image.previewUrl, tempAdjustments]);

  const handleAdjustmentChange = (key: keyof ImageAdjustments) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempAdjustments(prev => ({ ...prev, [key]: Number(e.target.value) }));
  };
  
  const handleSave = () => {
    onSave(image.id, tempAdjustments);
  };
  
  const handleReset = () => {
    setTempAdjustments(defaultAdjustments);
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
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="bg-white w-full max-w-4xl h-full max-h-[80vh] border-4 border-black shadow-[8px_8px_0_#551EFD] flex flex-col md:flex-row overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-full md:w-2/3 bg-gray-200 flex items-center justify-center p-4 overflow-hidden">
           <canvas
            ref={canvasRef}
            className="max-w-full max-h-full object-contain"
           />
        </div>
        <div className="w-full md:w-1/3 bg-white p-6 flex flex-col space-y-4 overflow-y-auto">
          <h3 className="text-2xl font-black">Adjustments</h3>
          
          <AdjustmentSlider label="Exposure" value={tempAdjustments.exposure} onChange={handleAdjustmentChange('exposure')} />
          <AdjustmentSlider label="Contrast" value={tempAdjustments.contrast} onChange={handleAdjustmentChange('contrast')} />
          <AdjustmentSlider label="Saturation" value={tempAdjustments.saturation} onChange={handleAdjustmentChange('saturation')} />
          <AdjustmentSlider label="Temperature" value={tempAdjustments.temperature} onChange={handleAdjustmentChange('temperature')} />
          <AdjustmentSlider label="Tint" value={tempAdjustments.tint} onChange={handleAdjustmentChange('tint')} />
          <AdjustmentSlider label="Highlights" value={tempAdjustments.highlights} onChange={handleAdjustmentChange('highlights')} />
          <AdjustmentSlider label="Shadows" value={tempAdjustments.shadows} onChange={handleAdjustmentChange('shadows')} />
          
          <div className="flex-grow"></div>
          <div className="space-y-2 pt-4 border-t-2 border-black">
            <Button onClick={handleReset} variant="secondary" className="w-full">Reset Adjustments</Button>
            <Button onClick={handleSave} variant="primary" className="w-full">Save Changes</Button>
            <Button onClick={onClose} className="w-full bg-gray-200 text-black shadow-[4px_4px_0_#0b0b0b] hover:shadow-[2px_2px_0_#0b0b0b]">Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;