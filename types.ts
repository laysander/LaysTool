export type ImageFormat = 'jpeg' | 'png' | 'webp' | 'avif';

export interface ImageAdjustments {
  exposure: number; // -100 to 100
  contrast: number; // -100 to 100
  saturation: number; // -100 to 100
  temperature: number; // -100 to 100
  tint: number; // -100 to 100
  highlights: number; // -100 to 100
  shadows: number; // -100 to 100
}

export interface CroppedAreaPixels {
    width: number;
    height: number;
    x: number;
    y: number;
}

export interface ProcessedImage {
  id: string;
  file: File;
  name: string;
  previewUrl: string;
  processedUrl?: string;
  width: number;
  height: number;
  adjustments: ImageAdjustments;
  croppedAreaPixels?: CroppedAreaPixels;
}

export type SizeType = 'original' | 'preset' | 'custom';

export interface GlobalSettings {
  format: ImageFormat;
  quality: number; // 0-1 for jpeg/webp
  size: {
    type: SizeType;
    value: number; // pixel value for preset/custom
  };
}