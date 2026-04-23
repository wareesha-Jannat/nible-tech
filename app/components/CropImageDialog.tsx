"use client";

import React, { useRef } from "react";
import { Cropper } from "react-cropper";
import type { ReactCropperElement } from "react-cropper";

type CropImageDialogProps = {
  src: string;
  cropAspectRatio?: number;
  onCropped: (file: File) => void; // 🔥 we standardize to File
  onClose: () => void;
};

const CropImageDialog: React.FC<CropImageDialogProps> = ({
  src,
  cropAspectRatio = 1,
  onCropped,
  onClose,
}) => {
  const cropperRef = useRef<ReactCropperElement | null>(null);

  const crop = () => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;

    cropper.getCroppedCanvas().toBlob(
      (blob) => {
        if (!blob) return;

        // 🔥 Convert Blob → File (IMPORTANT)
        const file = new File([blob], "cropped.webp", {
          type: "image/webp",
        });

        onCropped(file);
        onClose();
      },
      "image/webp",
      1,
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-2xl p-4">
        <h2 className="text-lg font-semibold mb-4">Crop Image</h2>

        <div className="max-h-[70vh] overflow-hidden">
          <Cropper
            src={src}
            aspectRatio={cropAspectRatio}
            guides
            zoomable
            scalable
            movable
            dragMode="move"
            viewMode={1}
            ref={cropperRef}
            className="mx-auto max-h-[60vh] w-full"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={crop}
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
          >
            Crop
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropImageDialog;
