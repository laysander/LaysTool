import React, { useState, useCallback, Suspense } from 'react';
import { useImageProcessor } from '../hooks/useImageProcessor';
import type { ProcessedImage, ImageAdjustments, CroppedAreaPixels } from '../types';
import Dropzone from '../components/image-editor/Dropzone';
import GlobalControls from '../components/image-editor/GlobalControls';
import ImageCard from '../components/image-editor/ImageCard';
import AddMoreCard from '../components/image-editor/AddMoreCard';
import EditModal from '../components/image-editor/EditModal';
import CropModal from '../components/image-editor/CropModal';

const ImageEditorPage: React.FC = () => {
  const { 
    images, 
    addImages, 
    removeImage, 
    renameImage,
    updateImageAdjustments,
    updateImageCrop,
    globalSettings,
    setGlobalSettings,
    isProcessing,
    processingProgress,
    processAndDownloadImage,
    downloadAllAsZip,
  } = useImageProcessor();

  const [editingImage, setEditingImage] = useState<ProcessedImage | null>(null);
  const [croppingImage, setCroppingImage] = useState<ProcessedImage | null>(null);

  const handleDownloadAll = useCallback(() => {
    // @ts-ignore
    if (typeof JSZip === 'undefined') {
      alert('JSZip library not found. Bulk download is unavailable.');
      return;
    }
    if (images.length > 0) {
      downloadAllAsZip(globalSettings);
    }
  }, [images.length, globalSettings, downloadAllAsZip]);

  const handleEdit = useCallback((id: string) => {
    const imageToEdit = images.find(img => img.id === id) || null;
    setEditingImage(imageToEdit);
  }, [images]);
  
  const handleCrop = useCallback((id: string) => {
    const imageToCrop = images.find(img => img.id === id) || null;
    setCroppingImage(imageToCrop);
  }, [images]);
  
  const handleCloseModal = useCallback(() => {
    setEditingImage(null);
    setCroppingImage(null);
  }, []);

  const handleSaveAdjustments = useCallback((id: string, adjustments: ImageAdjustments) => {
    updateImageAdjustments(id, adjustments);
    setEditingImage(null);
  }, [updateImageAdjustments]);
  
  const handleSaveCrop = useCallback((id: string, croppedAreaPixels: CroppedAreaPixels) => {
    updateImageCrop(id, croppedAreaPixels);
    setCroppingImage(null);
  }, [updateImageCrop]);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-5xl font-black mb-2 mt-12">Simple Image Editor</h1>
        <p className="text-xl text-gray-600">Process images entirely on your device.</p>
      </header>
      
      {images.length > 0 && (
        <GlobalControls 
          settings={globalSettings} 
          onSettingsChange={setGlobalSettings}
          onDownloadAll={handleDownloadAll}
          isProcessing={isProcessing}
          processingProgress={processingProgress}
        />
      )}

      {images.length === 0 ? (
        <Dropzone onFilesAdded={addImages} />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map(image => (
              <ImageCard 
                key={image.id}
                image={image}
                onRename={renameImage}
                onDelete={removeImage}
                onDownload={() => processAndDownloadImage(image.id, globalSettings)}
                onEdit={handleEdit}
                onCrop={handleCrop}
                isProcessing={isProcessing}
              />
            ))}
             <AddMoreCard onFilesAdded={addImages} />
          </div>
        </>
      )}

      <Suspense fallback={
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <p className="text-white text-xl font-bold">Loading Editor...</p>
        </div>
      }>
        {editingImage && (
          <EditModal 
            image={editingImage}
            onClose={handleCloseModal}
            onSave={handleSaveAdjustments}
          />
        )}
        
        {croppingImage && (
          <CropModal
              image={croppingImage}
              onClose={handleCloseModal}
              onSave={handleSaveCrop}
          />
        )}
      </Suspense>
    </div>
  );
};

export default ImageEditorPage;