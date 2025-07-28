import React, { useState } from 'react';
import type { ProcessedImage } from '../../types';
import Button from '../Button';

interface ImageCardProps {
  image: ProcessedImage;
  onRename: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
  onDownload: (id: string) => void;
  onEdit: (id: string) => void;
  onCrop: (id: string) => void;
  isProcessing: boolean;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onRename, onDelete, onDownload, onEdit, onCrop, isProcessing }) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [name, setName] = useState(image.name);

  const handleRename = () => {
    // Prevent renaming to an empty string
    if (name.trim()) {
      onRename(image.id, name);
    } else {
      setName(image.name); // Reset to original name if input is empty
    }
    setIsRenaming(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      setName(image.name);
      setIsRenaming(false);
    }
  };

  return (
    <div className="bg-white border-2 border-black shadow-[4px_4px_0_#0b0b0b] flex flex-col">
      <div className="aspect-w-1 aspect-h-1 w-full bg-gray-200">
         <img src={image.previewUrl} alt={image.name} className="w-full h-48 object-cover" />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        {isRenaming ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleRename}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-full p-2 border-2 border-black bg-white font-bold mb-1"
          />
        ) : (
          <div 
            className="font-bold truncate cursor-pointer flex items-center gap-2 mb-1" 
            title={image.name}
            onClick={() => setIsRenaming(true)}
          >
            <span className="truncate">{image.name}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
          </div>
        )}
        <p className="text-sm text-gray-600">{image.width} x {image.height}</p>
        <div className="mt-auto pt-4 flex gap-2">
           <Button onClick={() => onDownload(image.id)} className="w-1/2 !px-2 !py-1" disabled={isProcessing}>Download</Button>
           <Button onClick={() => onEdit(image.id)} className="w-1/4 !px-2 !py-1" variant="secondary" disabled={isProcessing}>Edit</Button>
           <Button onClick={() => onCrop(image.id)} className="w-1/4 !px-2 !py-1" variant="secondary" disabled={isProcessing}>Crop</Button>
           <button onClick={() => onDelete(image.id)} className="p-2 border-2 border-black hover:bg-red-400 aspect-square" aria-label="Delete">🗑️</button>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;