"use client";

import React, { useEffect, useState } from "react";
import ImageInput from "@/app/components/ImageInput";
import { UserItem } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";
import { updatePersonalInfo } from "./actions";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

type PersonalInfoProps = {
  user: UserItem;
};

const PersonalInfo = ({ user }: PersonalInfoProps) => {
  const [name, setName] = useState(user.name);
  const [removeImage, setRemoveImage] = useState(false);
  const [croppedImage, setCroppedImage] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const imagePreview = React.useMemo(() => {
    if (removeImage) return "/avatar-placeholder.png";

    if (croppedImage) return URL.createObjectURL(croppedImage);

    return user.image?.url || "/avatar-placeholder.png";
  }, [croppedImage, removeImage, user.image]);

  useEffect(() => {
    return () => {
      if (croppedImage) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [croppedImage, imagePreview]);

  // check if anything changed
  const isChanged =
    name !== user.name || croppedImage !== null || removeImage === true;
  const hasImage = !!user.image?.url && !removeImage;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      let imagePayload = null;

      // 1️⃣ New image uploaded
      if (croppedImage) {
        imagePayload = croppedImage;
      }

      // 2️⃣ Deleted image
      const isDeleted = removeImage && !croppedImage;

      const data = await updatePersonalInfo({
        name,
        image: imagePayload,
        deleteImage: isDeleted,
        existingPublicId: user.image?.public_id,
      });

      setIsSaving(false);
      if (data.success) {
        toast.success("Profile updated successfully");
        console.log("Profile updated successfully");
        setCroppedImage(null);
        setRemoveImage(false);
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const handleDeleteImage = async () => {
    setCroppedImage(null);
    setRemoveImage(true);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-sm rounded-2xl p-6 transition hover:shadow-md">
      <div className="flex flex-col items-center gap-8">
        {/* Profile Image */}
        <ImageInput
          src={imagePreview}
          shape="circle"
          previewSize={120}
          onImageCropped={(file) => setCroppedImage(file)}
        />

        {/* User Meta Info */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          {/* Role */}
          <div className="flex flex-col items-center bg-gray-50 rounded-xl py-4">
            <span className="text-xs text-primary-light">Role</span>
            <span className="font-semibold text-primary-dark mt-1">
              {user.role || "Admin"}
            </span>
          </div>

          {/* Joined */}
          <div className="flex flex-col items-center bg-gray-50 rounded-xl py-4">
            <span className="text-xs text-primary-light">Joined</span>
            <span className="font-semibold text-primary-dark mt-1">
              {user.createdAt
                ? formatDateTime(new Date(user.createdAt).toISOString())
                : "—"}
            </span>
          </div>

          {/* Updated */}
          <div className="flex flex-col items-center bg-gray-50 rounded-xl py-4">
            <span className="text-xs text-primary-light">Last Updated</span>
            <span className="font-semibold text-primary-dark mt-1">
              {user.updatedAt
                ? formatDateTime(new Date(user.updatedAt).toISOString())
                : "—"}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-gray-200" />

        {/* Form Fields */}
        <div className="w-full space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-muted">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary-light"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              value={user.email}
              readOnly
              className="w-full mt-2 px-4 py-3 border border-gray-200 bg-gray-100 rounded-lg text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="w-full flex flex-col min-[470px]:flex-row items-center justify-center gap-2">
          <button
            type="button"
            onClick={handleDeleteImage}
            disabled={!hasImage}
            className="w-full px-6 py-2 bg-red-600 active:bg-red-700 transition-colors duration-200 text-white rounded-md disabled:opacity-30"
          >
            Remove Image
          </button>

          <button
            onClick={handleSave}
            disabled={!isChanged || isSaving}
            className="w-full px-6 py-2 bg-primary-dark active:bg-primary-dark transition-colors duration-200 text-white rounded-md disabled:opacity-30 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <span>Save</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
