"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";

import ImageInput from "@/app/components/ImageInput";

import {
  blogSchema,
  BlogFormType,
} from "@/lib/validations/blog";

import { BlogItem } from "@/lib/types";
import { BlogDrawerResponse } from "./ManageBlogs";

type Props = {
  blog: BlogItem | null;
  onClose: () => void;
  onSave: (data: BlogDrawerResponse) => void;
};

const BlogDrawer = ({ blog, onClose, onSave }: Props) => {
  const [croppedImage, setCroppedImage] = useState<File | null>(null);
  const [removeImage, setRemoveImage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BlogFormType>({
    resolver: zodResolver(blogSchema),
    defaultValues: blog || {
      title: "",
      excerpt: "",
      content: "",
    },
  });

  // Disable body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Enter navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;

    const target = e.target as HTMLElement;

    if (target.tagName === "TEXTAREA") return;

    e.preventDefault();

    const form = target.closest("form");
    if (!form) return;

    const focusable = Array.from(
      form.querySelectorAll<HTMLElement>("input, textarea, button")
    ).filter((el) => !el.hasAttribute("disabled"));

    const index = focusable.indexOf(target);
    const next = focusable[index + 1];

    if (next) next.focus();
  };

  // image preview
  const imagePreview = useMemo(() => {
    if (removeImage) return "/default-cover.jpg";

    if (croppedImage) return URL.createObjectURL(croppedImage);

    return blog?.coverImage?.url || "/default-cover.jpg";
  }, [croppedImage, removeImage, blog?.coverImage?.url]);

  const hasImage = !!blog?.coverImage?.url && !removeImage;

  const handleDeleteImage = () => {
    setCroppedImage(null);
    setRemoveImage(true);
  };

  const onSubmit = async (data: BlogFormType) => {
    await onSave({
      data,
      imageFile: croppedImage,
      removeImage,
      ...(blog?._id && { _id: blog._id }),
    });
  };

 return (
  <>
    {/* Overlay */}
    <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40" />

    {/* Drawer */}
    <div className="fixed right-0 top-0 p-6 h-full w-full md:w-[520px] bg-white z-50 shadow-xl flex flex-col">

      {/* INNER WRAPPER (like ProjectDrawer) */}
      <div className="border border-primary-dark flex flex-col rounded-sm h-full">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-lg font-semibold">
            {blog ? "Edit Blog" : "Add Blog"}
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col flex-1 overflow-hidden"
        >

          {/* BODY */}
          <div className="flex-1 p-4 space-y-6 overflow-y-auto">

            {/* IMAGE */}
            <div className="flex flex-col items-center gap-3">
              <ImageInput
                src={imagePreview}
                shape="rect"
                aspectRatio={16 / 9}
                previewSize={140}
                onImageCropped={(file) => {
                  setCroppedImage(file);
                  setRemoveImage(false);
                }}
              />

              <button
                type="button"
                onClick={handleDeleteImage}
                disabled={!hasImage}
                className="px-4 py-2 bg-red-600 text-white rounded-md disabled:opacity-30"
              >
                Remove Image
              </button>
            </div>

            {/* TITLE */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Title *
              </label>

              <input
                {...register("title")}
                onKeyDown={handleKeyDown}
                className="w-full mt-2 px-4 py-3 border rounded-lg"
                placeholder="Blog title..."
              />

              {errors.title && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* EXCERPT */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Excerpt *
              </label>

              <textarea
                {...register("excerpt")}
                rows={3}
                onKeyDown={handleKeyDown}
                className="w-full mt-2 px-4 py-3 border rounded-lg resize-none"
                placeholder="Short description..."
              />

              {errors.excerpt && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.excerpt.message}
                </p>
              )}
            </div>

            {/* CONTENT */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Content *
              </label>

              <textarea
                {...register("content")}
                rows={8}
                className="w-full mt-2 px-4 py-3 border rounded-lg resize-none"
                placeholder="Write full blog content..."
              />

              {errors.content && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.content.message}
                </p>
              )}
            </div>

          </div>

          {/* FOOTER */}
          <div className="p-5 flex justify-end gap-3 border-t bg-white">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md"
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
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </button>

          </div>
        </form>

      </div>
    </div>
  </>
);
};

export default BlogDrawer;