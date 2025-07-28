import React, { useState, useEffect } from 'react';
import type { GlobalSettings, ImageFormat, SizeType } from '../../types';
import Button from '../Button';

interface GlobalControlsProps {
  settings: GlobalSettings;
  onSettingsChange: React.Dispatch<React.SetStateAction<GlobalSettings>>;
  onDownloadAll: () => void;
  isProcessing: boolean;
  processingProgress: number;
}

const GlobalControls: React.FC<GlobalControlsProps> = ({ settings, onSettingsChange, onDownloadAll, isProcessing, processingProgress }) => {
  const [customSize, setCustomSize] = useState(1920);

  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSettingsChange(s => ({ ...s, format: e.target.value as ImageFormat }));
  };
  
  const handleQualityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange(s => ({ ...s, quality: parseFloat(e.target.value) }));
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'custom') {
        onSettingsChange(s => ({ ...s, size: { type: 'custom', value: customSize }}));
    } else if (value === 'original') {
        onSettingsChange(s => ({...s, size: { type: 'original', value: 0 }}));
    } else {
        onSettingsChange(s => ({ ...s, size: { type: 'preset', value: parseInt(value, 10) }}));
    }
  };

  const handleCustomSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value, 10) || 1;
    setCustomSize(newSize);
    onSettingsChange(s => ({ ...s, size: { type: 'custom', value: newSize }}));
  }

  const getSizeSelectValue = () => {
    if (settings.size.type === 'custom') return 'custom';
    if (settings.size.type === 'original') return 'original';
    return settings.size.value.toString();
  }

  return (
    <div className="bg-white p-6 border-4 border-black mb-8 shadow-[8px_8px_0_#0b0b0b]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
        <div>
          <label htmlFor="format" className="block text-lg font-bold mb-2">Format</label>
          <select id="format" value={settings.format} onChange={handleFormatChange} className="w-full p-3 border-2 border-black font-bold bg-white focus:outline-none focus:ring-2 focus:ring-[#551EFD]">
            <option value="jpeg">JPEG</option>
            <option value="png">PNG</option>
            <option value="webp">WEBP</option>
            <option value="avif">AVIF</option>
          </select>
        </div>
        <div>
          <label htmlFor="size" className="block text-lg font-bold mb-2">Size (Longest Side)</label>
          <select id="size" value={getSizeSelectValue()} onChange={handleSizeChange} className="w-full p-3 border-2 border-black font-bold bg-white focus:outline-none focus:ring-2 focus:ring-[#551EFD]">
            <option value="original">Original</option>
            <option value="250">250px</option>
            <option value="500">500px</option>
            <option value="800">800px</option>
            <option value="1080">1080px</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        {settings.size.type === 'custom' && (
          <div>
            <label htmlFor="custom-size" className="block text-lg font-bold mb-2">Custom Size (px)</label>
            <input id="custom-size" type="number" value={customSize} onChange={handleCustomSizeChange} className="w-full p-3 border-2 border-black font-bold bg-white focus:outline-none focus:ring-2 focus:ring-[#551EFD]" />
          </div>
        )}
        <div className={settings.size.type === 'custom' ? '' : 'lg:col-start-4'}>
          <label htmlFor="quality" className="block text-lg font-bold mb-2">Quality ({settings.format === 'png' ? 'N/A' : Math.round(settings.quality * 100)}%)</label>
          <input id="quality" type="range" min="0.1" max="1" step="0.05" value={settings.quality} onChange={handleQualityChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#551EFD]" disabled={settings.format === 'png'}/>
        </div>
        <div className="flex justify-end">
          <Button onClick={onDownloadAll} disabled={isProcessing} variant="primary">
            {isProcessing ? `Processing... ${processingProgress}%` : 'Download All as ZIP'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GlobalControls;