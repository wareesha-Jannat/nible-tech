"use client";

import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  serviceFormSchema,
  ServiceFormType,
} from "@/lib/validations/service";
import { ServiceItem } from "@/lib/types";
import { Loader2, X } from "lucide-react";

type Props = {
  service: ServiceItem | null;
  onClose: () => void;
  onSave: (data: ServiceItem) => void;
  featuredCount: number;
};

const MAX_FEATURED = 6;
const MAX_FEATURES = 4;
const MAX_TECH = 6;

const ServiceDrawer = ({ service, onClose, onSave, featuredCount }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ServiceFormType>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: service
      ? {
          ...service,
          features: service.features.map((f) =>
            typeof f === "string" ? { value: f } : f,
          ),
          technologies: service.technologies.map((t) =>
            typeof t === "string" ? { value: t } : t,
          ),
        }
      : {
          title: "",
          description: "",
          category: "development",
          features: [],
          technologies: [],
          featured: false,
        },
  });

  // 🔥 live calculated count (no stale props)

  const wasOriginallyFeatured = service?.featured ?? false;

  const isFeaturedDisabled =
    featuredCount >= MAX_FEATURED && !wasOriginallyFeatured;

  // FEATURES FIELD ARRAY
  const {
    fields: featureFields,
    append: addFeature,
    remove: removeFeature,
  } = useFieldArray({
    control,
    name: "features",
  });

  // TECHNOLOGIES FIELD ARRAY
  const {
    fields: techFields,
    append: addTech,
    remove: removeTech,
  } = useFieldArray({
    control,
    name: "technologies",
  });

  // ESC disable scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const onSubmit = async (data: ServiceFormType) => {
   
    const cleanedFeatures = data.features
      .map((f) => f.value.trim())
      .filter(Boolean);

    const cleanedTech = data.technologies
      .map((t) => t.value.trim())
      .filter(Boolean);

    const finalData: ServiceItem = {
      ...service,
      ...data,
      _id: service?._id || "",
      features: cleanedFeatures,
      technologies: cleanedTech,
      featured: data.featured,
    };
    
    await onSave(finalData);
  };

  // ENTER KEY HANDLER (features)
  const handleFeatureKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = (e.target as HTMLInputElement).value.trim();
      if (!value || featureFields.length >= MAX_FEATURES) return;

      addFeature({ value: "" });
    }
  };

  const handleTechKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = (e.target as HTMLInputElement).value.trim();
      if (!value || techFields.length >= MAX_TECH) return;

      addTech({ value: "" });
    }
  };

  return (
    <>
      {/* overlay */}
      <div onClick={onClose} className="fixed inset-0  bg-black/40 z-40" />

      {/* drawer */}
      <div className="fixed right-0 top-0 p-6  h-full w-full md:w-[450px] bg-white z-50 shadow-xl">
        <div className=" border border-primary-dark flex flex-col rounded-sm h-full">
          {/* HEADER */}
          <div className="flex justify-between items-center p-5 border-b">
            <h2 className="text-lg font-semibold">
              {service ? "Edit Service" : "Add Service"}
            </h2>

            <button onClick={onClose}>
              <X />
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col overflow-y-auto"
          >
            {/* BODY */}
            <div className="flex-1 p-5 space-y-6 ">
              {/* TITLE */}
              <div>
                <label className="text-sm font-medium text-muted">
                  Title *
                </label>
                <input
                  {...register("title")}
                  className="w-full mt-2 px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                  placeholder="Enter service title"
                />
                {errors.title && (
                  <p className="text-xs text-red-500">{errors.title.message}</p>
                )}
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="text-sm text-muted font-medium">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  rows={4}
                  className="w-full mt-2 px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                  placeholder="Enter service description"
                />
              </div>

              {/* FEATURES */}
              <div>
                <label className="text-sm text-muted font-medium">
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
                        className="bg-transparent outline-none text-sm min-w-[120px]"
                        placeholder="Feature"
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
                <label className="text-sm text-muted font-medium">
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
                        className="bg-transparent outline-none text-sm w-[120px]"
                        placeholder="Tech"
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
                <label className="text-sm text-muted font-medium">
                  Featured Service
                </label>

                <input
                  type="checkbox"
                  {...register("featured")}
                  disabled={isFeaturedDisabled}
                />
              </div>

              {isFeaturedDisabled && (
                <p className="text-xs text-red-500">
                  Maximum {MAX_FEATURED} featured services allowed
                </p>
              )}
            </div>

            {/* FOOTER */}
            <div className="p-5 flex justify-end gap-3 ">
              <button
                type="button"
                className="px-3 py-1 text-sm border border-primary text-primary rounded hover:bg-primary hover:text-white"
                onClick={onClose}
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

export default ServiceDrawer;
