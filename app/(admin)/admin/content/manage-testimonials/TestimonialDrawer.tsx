"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  testimonialSchema,
  TestimonialFormType,
} from "@/lib/validations/testimonials";
import { TestimonialItem } from "@/lib/types";
import { Loader2, X } from "lucide-react";
import ImageInput from "@/app/components/ImageInput";
import { TestimonialDrawerResponse } from "./ManageTestimonials";

type Props = {
  testimonial: TestimonialItem | null;
  onClose: () => void;
  onSave: (data: TestimonialDrawerResponse) => void;
  featuredCount: number;
};

const TestimonialDrawer = ({
  testimonial,
  onClose,
  onSave,
  featuredCount,
}: Props) => {
  const [croppedImage, setCroppedImage] = useState<File | null>(null);
  const [removeImage, setRemoveImage] = useState(false);

  const MAX_FEATURED = 6;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TestimonialFormType>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: testimonial || {
      name: "",
      role: "",
      message: "",
      featured: false,
    },
  });

  // 🔥 Disable body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // 🔥 Enter → next field (same logic as QueryForm)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;

    const target = e.target as HTMLElement;

    if (target.tagName === "TEXTAREA") return;

    e.preventDefault();

    const form = target.closest("form");
    if (!form) return;

    const focusable = Array.from(
      form.querySelectorAll<HTMLElement>("input, textarea, button"),
    ).filter((el) => !el.hasAttribute("disabled"));

    const index = focusable.indexOf(target);
    const next = focusable[index + 1];

    if (next) next.focus();
  };

  const imagePreview = React.useMemo(() => {
    if (removeImage) return "/avatar-placeholder.png";

    if (croppedImage) return URL.createObjectURL(croppedImage);

    return testimonial?.image?.url || "/avatar-placeholder.png";
  }, [croppedImage, removeImage, testimonial?.image?.url]);

  const hasImage = !!testimonial?.image?.url && !removeImage;

  const handleDeleteImage = async () => {
    setCroppedImage(null);
    setRemoveImage(true);
  };

  const onSubmit = async (data: TestimonialFormType) => {
    await onSave({
      data,
      imageFile: croppedImage,
      removeImage,
      ...(testimonial?._id && { _id: testimonial._id }),
    });
  };

  const wasOriginallyFeatured = testimonial?.featured ?? false;

  const isFeaturedDisabled =
    featuredCount >= MAX_FEATURED && !wasOriginallyFeatured;

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40" />

      {/* Drawer */}
      <div className="fixed right-0 top-0 p-6 h-full w-full md:w-[420px] bg-white z-50 shadow-xl flex flex-col">
        <div className="border border-primary-dark flex flex-col rounded-sm h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b">
            <h2 className="text-lg font-semibold">
              {testimonial ? "Edit Testimonial" : "Add Testimonial"}
            </h2>

            <button onClick={onClose}>
              <X />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col overflow-y-auto"
          >
            {/* Scrollable Body */}
            <div className="flex-1 p-4 space-y-5">
              {/* Image */}
              {/* Image */}
              <div className="flex flex-col items-center gap-2">
                <ImageInput
                  src={imagePreview}
                  shape="circle"
                  previewSize={100}
                  onImageCropped={(file) => {
                    setCroppedImage(file);
                    setRemoveImage(false); // 🔥 important: cancel delete if new image selected
                  }}
                />

                <button
                  type="button"
                  onClick={handleDeleteImage}
                  disabled={!hasImage}
                  className="px-6 py-2 bg-red-600 active:bg-red-700 transition-colors duration-200 text-white rounded-md disabled:opacity-30"
                >
                  Remove Image
                </button>
              </div>

              {/* Name */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Full Name *
                </label>
                <input
                  {...register("name")}
                  onKeyDown={handleKeyDown}
                  className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg outline-none"
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Role */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Role / Company *
                </label>
                <input
                  {...register("role")}
                  onKeyDown={handleKeyDown}
                  className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg outline-none"
                  placeholder="CEO at Company"
                />
                {errors.role && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.role.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Message *
                </label>
                <textarea
                  {...register("message")}
                  rows={4}
                  onKeyDown={handleKeyDown}
                  className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg outline-none resize-none"
                  placeholder="Write testimonial..."
                />
                {errors.message && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Featured */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-600">
                  Featured
                </label>

                <input
                  type="checkbox"
                  {...register("featured")}
                  disabled={isFeaturedDisabled}
                />
              </div>
              {isFeaturedDisabled && (
                <p className="text-xs text-red-500">
                  Maximum {MAX_FEATURED} featured testimonials allowed
                </p>
              )}
            </div>
            {/* Footer */}
            <div className="shrink-0  p-5 flex justify-end gap-3 bg-white">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-white px-4 py-2 rounded min-w-[110px] flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TestimonialDrawer;
