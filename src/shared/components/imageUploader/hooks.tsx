import { useState, DragEvent, ChangeEvent } from 'react';
import {Image} from "./Modal"
import { compressFile } from '@shared/utils/compressFile';

export const useImagehandler = () => {
    const [images, setImages] = useState<Image[]>([]);
  
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      handleImageSelection(e.dataTransfer.files);
    };
  
    const handleImageSelection = async (files: FileList | null) => {
      if (!files) return;
  
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();

        const fileCompresse = await compressFile(files[i])
  
        reader.onload = (event) => {
          setImages((currentImages) => [
            ...currentImages,
            {
              id: `${Date.now()}-${Math.random()}`,
              src: event.target?.result as string,
              blob: fileCompresse as File,
            },
          ]);
        };
  
        reader.readAsDataURL(fileCompresse as File);
      }
      
    };
  
    const handleRemove = (id: string) => {
      const updatedImages = images.filter((image) => image.id !== id);
      setImages(updatedImages);
    };
  
    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      handleImageSelection(e.target.files);
    };

    const reset = () => {
      setImages([])
    }
  
    return {
      images,
      handleDrop,
      handleRemove,
      handleFileInputChange,
      reset
    }
  }