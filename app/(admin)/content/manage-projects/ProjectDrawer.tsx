"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  projectFormSchema,
  ProjectFormType,
  ProjectBackendType,
} from "@/lib/validations/project";
import { ProjectItem } from "@/lib/types";
import { Loader2, X } from "lucide-react";
import ImageInput from "@/app/components/ImageInput";

export type ProjectDrawerResponse = {
  data: ProjectBackendType;
  imageFile: File | null;
  removeImage: boolean;
  _id?: string;
};

type Props = {
  project: ProjectItem | null;
  onClose: () => void;
  onSave: (data: ProjectDrawerResponse) => Promise<void>;
  featuredCount: number;
};

const MAX_FEATURED = 6;
const MAX_TECH = 6;
const MAX_FEATURES = 4;

const ProjectDrawer = ({ project, onClose, onSave, featuredCount }: Props) => {
  const [croppedImage, setCroppedImage] = useState<File | null>(null);
  const [removeImage, setRemoveImage] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormType>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: project
      ? {
          ...project,
          technologies: project.technologies.map((t) => ({ value: t })),
          features: project.features.map((f) => ({ value: f })) || [],
        }
      : {
          title: "",
          description: "",
          technologies: [],
          features: [],
          featured: false,
        },
  });

  // disable scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // ----------------------------
  // IMAGE
  // ----------------------------
  const imagePreview = useMemo(() => {
    if (removeImage) return "/default-cover.jpg";
    if (croppedImage) return URL.createObjectURL(croppedImage);
    return project?.image?.url || "/default-cover.jpg";
  }, [croppedImage, removeImage, project?.image?.url]);

  const hasImage = !!project?.image?.url && !removeImage;

  const handleDeleteImage = () => {
    setCroppedImage(null);
    setRemoveImage(true);
  };

  // ----------------------------
  // FIELD ARRAYS
  // ----------------------------
  const {
    fields: techFields,
    append: addTech,
    remove: removeTech,
  } = useFieldArray({
    control,
    name: "technologies",
  });

  const {
    fields: featureFields,
    append: addFeature,
    remove: removeFeature,
  } = useFieldArray({
    control,
    name: "features",
  });

  // ----------------------------
  // KEY HANDLERS
  // ----------------------------
  const handleTechKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = (e.target as HTMLInputElement).value.trim();
      if (!value || techFields.length >= MAX_TECH) return;

      addTech({ value: "" });
    }
  };

  const handleFeatureKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = (e.target as HTMLInputElement).value.trim();
      if (!value || featureFields.length >= MAX_FEATURES) return;

      addFeature({ value: "" });
    }
  };

  // ----------------------------
  // FEATURED LOGIC
  // ----------------------------
  const featured = watch("featured");
  const wasOriginallyFeatured = project?.featured ?? false;

  const isFeaturedDisabled =
    !featured && featuredCount >= MAX_FEATURED && !wasOriginallyFeatured;

  // ----------------------------
  // SUBMIT
  // ----------------------------
  const onSubmit = async (data: ProjectFormType) => {
    const cleanedTech = data.technologies
      .map((t) => t.value.trim())
      .filter(Boolean);

    const cleanedFeatures = data.features
      .map((f) => f.value.trim())
      .filter(Boolean);

    const backendData: ProjectBackendType = {
      title: data.title,
      description: data.description,
      featured: data.featured,
      technologies: cleanedTech,
      features: cleanedFeatures,
    };

    await onSave({
      data: backendData,
      imageFile: croppedImage,
      removeImage,
      ...(project?._id && { _id: project._id }),
    });
  };

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
              {project ? "Edit Project" : "Add Project"}
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
            <div className="flex-1 p-4 space-y-5">
              {/* IMAGE */}
              <div className="flex flex-col items-center gap-2">
                <ImageInput
                  src={imagePreview}
                  shape="rect"
                  aspectRatio={16 / 9} // ✅ THIS is the fix
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
                  className="w-full mt-2 px-4 py-3 border rounded-lg"
                />
                {errors.title && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  rows={4}
                  className="w-full mt-2 px-4 py-3 border rounded-lg"
                />
              </div>

              {/* FEATURES */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Features (max {MAX_FEATURES})
                </label>

                <div className="flex flex-wrap gap-2 mt-2">
                  {featureFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex items-center bg-gray-100 px-3 py-1 rounded-full"
                    >
                      <input
                        {...register(`features.${index}.value` as const)}
                        onKeyDown={handleFeatureKeyDown}
                        className="bg-transparent outline-none text-sm w-[100px]"
                      />

                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="ml-2 text-red-500"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    disabled={featureFields.length >= MAX_FEATURES}
                    onClick={() => addFeature({ value: "" })}
                    className="text-sm text-primary"
                  >
                    + Add
                  </button>
                </div>
              </div>

              {/* TECHNOLOGIES */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Technologies (max {MAX_TECH})
                </label>

                <div className="flex flex-wrap gap-2 mt-2">
                  {techFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex items-center bg-gray-100 px-3 py-1 rounded-full"
                    >
                      <input
                        {...register(`technologies.${index}.value` as const)}
                        onKeyDown={handleTechKeyDown}
                        className="bg-transparent outline-none text-sm w-[100px]"
                      />

                      <button
                        type="button"
                        onClick={() => removeTech(index)}
                        className="ml-2 text-red-500"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    disabled={techFields.length >= MAX_TECH}
                    onClick={() => addTech({ value: "" })}
                    className="text-sm text-primary"
                  >
                    + Add
                  </button>
                </div>
              </div>

              {/* FEATURED */}
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
                  Maximum {MAX_FEATURED} featured projects allowed
                </p>
              )}
            </div>

            {/* FOOTER */}
            <div className="p-5 flex justify-end gap-3">
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

export default ProjectDrawer;
