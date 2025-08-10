import React from 'react';
import { extractTextFromImage } from '../api/extract-text';

interface OCRProcessorProps {
  file: File;
  onTextExtracted: (text: string) => void;
  onError: (error: string) => void;
  onProcessingChange: (isProcessing: boolean) => void;
}

export const OCRProcessor: React.FC<OCRProcessorProps> = ({
  file,
  onTextExtracted,
  onError,
  onProcessingChange
}) => {
  const processImage = async () => {
    onProcessingChange(true);
    onError('');

    try {
      // Convert file to base64
      const base64Image = await fileToBase64(file);
      
      // Extract text using OpenAI API
      const extractedText = await extractTextFromImage(base64Image, file.type);
      
      onTextExtracted(extractedText);
    } catch (error) {
      console.error('OCR Processing Error:', error);
      onError(error instanceof Error ? error.message : 'Failed to process image');
    } finally {
      onProcessingChange(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  };

  React.useEffect(() => {
    if (file) {
      processImage();
    }
  }, [file]);

  return null; // This component doesn't render anything
};