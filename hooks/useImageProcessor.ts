import { useState, useCallback } from 'react';
import type { ProcessedImage, GlobalSettings, ImageAdjustments, CroppedAreaPixels, SizeType } from '../types';

export const defaultAdjustments: ImageAdjustments = {
  exposure: 0,
  contrast: 0,
  saturation: 0,
  temperature: 0,
  tint: 0,
  highlights: 0,
  shadows: 0,
};

/**
 * Applies all image adjustments to a canvas context by manipulating pixel data directly.
 * @param ctx The 2D context of the canvas to adjust.
 * @param adjustments The adjustment values to apply.
 */
export const applyCanvasAdjustments = (ctx: CanvasRenderingContext2D, adjustments: ImageAdjustments) => {
  if (!adjustments) return;

  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const data = imageData.data;
  const { exposure, contrast, saturation, temperature, tint, highlights, shadows } = adjustments;

  // Pre-calculate factors
  const exposureFactor = 1 + exposure / 100;
  const contrastFactor = 1 + contrast / 100;
  const saturationFactor = 1 + saturation / 100;
  const tempValue = temperature; // Direct value shift
  const tintValue = tint;     // Direct value shift
  const highlightsFactor = highlights / 100;
  const shadowsFactor = shadows / 100;

  for (let i = 0; i < data.length; i += 4) {
    let r = data[i];
    let g = data[i+1];
    let b = data[i+2];

    // 1. Exposure
    r *= exposureFactor;
    g *= exposureFactor;
    b *= exposureFactor;
    
    // 2. Contrast
    r = ((r / 255 - 0.5) * contrastFactor + 0.5) * 255;
    g = ((g / 255 - 0.5) * contrastFactor + 0.5) * 255;
    b = ((b / 255 - 0.5) * contrastFactor + 0.5) * 255;

    // 3. Temperature & Tint
    r += tempValue;
    b -= tempValue; // Warm: +R, -B; Cool: -R, +B
    g += tintValue; // Green: +G; Magenta: -G (by proxy)

    // 4. Saturation
    const luma = r * 0.299 + g * 0.587 + b * 0.114;
    r = luma + (r - luma) * saturationFactor;
    g = luma + (g - luma) * saturationFactor;
    b = luma + (b - luma) * saturationFactor;
    
    // 5. Highlights & Shadows (tonal adjustments)
    // A simple approach: scale adjustments by pixel luminance
    const luminance = (data[i] * 0.299 + data[i+1] * 0.587 + data[i+2] * 0.114) / 255; // Use original pixel luminance
    
    if (highlightsFactor > 0) { // Increase highlights
        r += highlightsFactor * (255 - r) * luminance;
        g += highlightsFactor * (255 - g) * luminance;
        b += highlightsFactor * (255 - b) * luminance;
    } else { // Decrease highlights
        r += highlightsFactor * r * luminance;
        g += highlightsFactor * g * luminance;
        b += highlightsFactor * b * luminance;
    }

    if (shadowsFactor > 0) { // Lighten shadows
        r += shadowsFactor * (255 - r) * (1 - luminance);
        g += shadowsFactor * (255 - g) * (1 - luminance);
        b += shadowsFactor * (255 - b) * (1 - luminance);
    } else { // Darken shadows
        r += shadowsFactor * r * (1 - luminance);
        g += shadowsFactor * g * (1 - luminance);
        b += shadowsFactor * b * (1 - luminance);
    }
    
    // Clamp values to 0-255 range
    data[i] = Math.max(0, Math.min(255, r));
    data[i+1] = Math.max(0, Math.min(255, g));
    data[i+2] = Math.max(0, Math.min(255, b));
  }

  ctx.putImageData(imageData, 0, 0);
};


// Helper to process a single image
const processImage = async (imageToProcess: ProcessedImage, settings: GlobalSettings): Promise<{ name: string; blob: Blob } | null> => {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = imageToProcess.previewUrl;
  await new Promise((resolve, reject) => { 
    img.onload = resolve;
    img.onerror = reject;
  });

  const crop = imageToProcess.croppedAreaPixels || { x: 0, y: 0, width: img.width, height: img.height };
  
  let outputWidth = crop.width;
  let outputHeight = crop.height;

  // Handle resizing based on the new 'size' setting
  if (settings.size.type !== 'original') {
    const targetSize = settings.size.value;
    const aspectRatio = crop.width / crop.height;
    
    if (crop.width >= crop.height) {
        outputWidth = targetSize;
        outputHeight = targetSize / aspectRatio;
    } else {
        outputHeight = targetSize;
        outputWidth = targetSize * aspectRatio;
    }
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  canvas.width = outputWidth;
  canvas.height = outputHeight;
  
  // Draw the cropped image to the canvas
  ctx.drawImage(img, crop.x, crop.y, crop.width, crop.height, 0, 0, outputWidth, outputHeight);

  // Apply adjustments using pixel manipulation
  if (imageToProcess.adjustments) {
    applyCanvasAdjustments(ctx, imageToProcess.adjustments);
  }

  const mimeType = `image/${settings.format}`;
  const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, mimeType, settings.quality));

  if (blob) {
    const currentName = imageToProcess.name;
    const lastDotIndex = currentName.lastIndexOf('.');
    // If there's no dot, or it's the first character (e.g., '.env'), treat the whole string as the base name.
    const baseName = (lastDotIndex < 1) ? currentName : currentName.substring(0, lastDotIndex);
    const newName = `${baseName}.${settings.format}`;
    return { name: newName, blob };
  }
  return null;
};


export const useImageProcessor = () => {
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [globalSettings, setGlobalSettings] = useState<GlobalSettings>({
    format: 'jpeg',
    quality: 0.9,
    size: { type: 'original', value: 0 },
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);

  const addImages = useCallback((files: FileList) => {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const newImage: ProcessedImage = {
              id: `${file.name}-${Date.now()}`,
              file,
              name: file.name,
              previewUrl: URL.createObjectURL(file),
              width: img.width,
              height: img.height,
              adjustments: { ...defaultAdjustments },
              croppedAreaPixels: undefined,
            };
            setImages(prev => [...prev, newImage]);
          };
          img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      }
    });
  }, []);

  const removeImage = useCallback((id: string) => {
    setImages(prev => {
      const imageToRemove = prev.find(img => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.previewUrl);
        if (imageToRemove.processedUrl) {
          URL.revokeObjectURL(imageToRemove.processedUrl);
        }
      }
      return prev.filter(img => img.id !== id);
    });
  }, []);

  const renameImage = useCallback((id: string, newName: string) => {
    setImages(prev => prev.map(img => img.id === id ? { ...img, name: newName } : img));
  }, []);
  
  const updateImageAdjustments = useCallback((id: string, newAdjustments: ImageAdjustments) => {
    setImages(prev => prev.map(img => img.id === id ? { ...img, adjustments: newAdjustments } : img));
  }, []);
  
  const updateImageCrop = useCallback((id: string, croppedAreaPixels: CroppedAreaPixels) => {
    setImages(prev => prev.map(img => img.id === id ? { ...img, croppedAreaPixels } : img));
  }, []);

  const processAndDownloadImage = useCallback(async (id: string, settings: GlobalSettings) => {
    const imageToProcess = images.find(img => img.id === id);
    if (!imageToProcess) return;

    setIsProcessing(true);
    setProcessingProgress(50);

    const result = await processImage(imageToProcess, settings);

    if (result) {
      const url = URL.createObjectURL(result.blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = result.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
    
    setProcessingProgress(100);
    setIsProcessing(false);
    setTimeout(() => setProcessingProgress(0), 500);
  }, [images]);

  const downloadAllAsZip = useCallback(async (settings: GlobalSettings) => {
    // @ts-ignore
    if (typeof JSZip === 'undefined' || images.length === 0) {
      console.error('JSZip not loaded or no images to process.');
      alert('Could not download all images. The JSZip library may not be available.');
      return;
    }

    setIsProcessing(true);
    setProcessingProgress(0);

    // @ts-ignore
    const zip = new JSZip();
    const totalImages = images.length;
    let processedCount = 0;

    for (const image of images) {
      try {
        const result = await processImage(image, settings);
        if (result) {
          zip.file(result.name, result.blob);
        }
      } catch (error) {
        console.error(`Failed to process ${image.name}:`, error);
      }
      processedCount++;
      setProcessingProgress(Math.round((processedCount / totalImages) * 100));
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'LayTools_Images.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setIsProcessing(false);
    setTimeout(() => setProcessingProgress(0), 500);
  }, [images]);

  return {
    images,
    setImages,
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
  };
};