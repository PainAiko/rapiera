import { PropsWithChildren } from "react";
import { Image
 } from "./Modal";

type Props = PropsWithChildren<{
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void
  images: Image[]
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemove: (id: string) => void
}>

const ImageUploader = ({handleDrop, images, handleFileInputChange, handleRemove}: Props) => {
  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById('fileInput')?.click()}
        className="border-2 border-dashed border-gray-400 rounded p-4 text-center cursor-pointer"
      >
        Glissez les images ici
      </div>
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        multiple
        onChange={handleFileInputChange}
        className="hidden"
      />
      <div className="mt-4">
        {images.map((image) => (
          <div key={image.id} className="inline-block m-2 relative">
            <img
              src={image.src}
              alt="Uploaded"
              className="w-32 h-32 object-cover"
            />
            <button
              onClick={() => handleRemove(image.id)}
              className="absolute top-0 right-0 text-red-500"
            >
              &#10006;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
