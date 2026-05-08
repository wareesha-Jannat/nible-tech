"use client";

import React, { useRef, useState, ChangeEvent } from "react";
import Resizer from "react-image-file-resizer";
import Image from "next/image";
import CropImageDialog from "./CropImageDialog";

type ImageInputProps = {
  src: string;
  aspectRatio?: number;
  shape?: "circle" | "rect";
  previewSize?: number;
  onImageCropped: (file: File) => void; // 🔥 fixed
};

const ImageInput: React.FC<ImageInputProps> = ({
  src,
  aspectRatio = 1,
  shape = "rect",
  previewSize = 150,
  onImageCropped,
}) => {
  const [imageToCrop, setImageToCrop] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 🔥 properly typed
  const onImageSelected = (file?: File) => {
    if (!file) return;

    Resizer.imageFileResizer(
      file,
      1024,
      1024,
      "WEBP",
      100,
      0,
      (uri) => {
        // 🔥 ensure correct type
        if (uri instanceof File) {
          setImageToCrop(uri);
        }
      },
      "file",
    );
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onImageSelected(e.target.files?.[0])
        }
      />

      {/* Preview Button */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="group relative block"
        style={
          shape === "circle" ? { width: previewSize, height: previewSize } : {}
        }
      >
        <Image
          src={src}
          alt="preview"
          width={previewSize}
          height={previewSize}
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`object-cover ${
            shape === "circle" ? "rounded-full" : "rounded-2xl w-full h-32"
          }`}
        />

        {/* Overlay */}
        <span
          className={`absolute inset-0 flex items-center justify-center  bg-black/20 group-hover:bg-black/30 transition  shape === ${shape === "circle" ? "rounded-full" : "rounded-2xl"}`}
        >
          <Image src="/camera.png" alt="camera icon" height={20} width={20} />
        </span>
      </button>

      {/* Crop Dialog */}
      {imageToCrop && (
        <CropImageDialog
          src={URL.createObjectURL(imageToCrop)}
          cropAspectRatio={aspectRatio}
          onCropped={(file: File) => {
            onImageCropped(file);
            setImageToCrop(null);
          }}
          onClose={() => {
            setImageToCrop(null);
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }}
        />
      )}
    </>
  );
};

export default ImageInput;
