"use client";

import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceFormSchema, ServiceFormType } from "@/lib/validations/service";
import { ServiceItem } from "@/lib/types";
import { Loader2, X } from "lucide-react";

type Props = {
  service: ServiceItem | null;
  onClose: () => void;

  // IMPORTANT: now accepts DB-ready ServiceItem
  onSave: (data: ServiceFormType) => void;
};

const MAX_FEATURES = 6;
const MAX_TECH = 10;

const ServiceDrawer = ({ service, onClose, onSave }: Props) => {
  // ----------------------------
  // FORM
  // ----------------------------
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
          features: service.features.map((f) => f),
          technologies: service.technologies.map((t) => ({ value: t })),
        }
      : {
          title: "",
          shortDescription: "",
          overview: "",
          category: "seo",
          order: 0,
          features: [],
          technologies: [],
        },
  });

  // ----------------------------
  // FEATURES FIELD ARRAY
  // ----------------------------
  const {
    fields: featureFields,
    append: addFeature,
    remove: removeFeature,
  } = useFieldArray({
    control,
    name: "features",
  });

  // ----------------------------
  // TECHNOLOGIES FIELD ARRAY
  // ----------------------------
  const {
    fields: techFields,
    append: addTech,
    remove: removeTech,
  } = useFieldArray({
    control,
    name: "technologies",
  });

  // ----------------------------
  // ESC LOCK
  // ----------------------------
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // ----------------------------
  // SUBMIT
  // ----------------------------
  const onSubmit = async (data: ServiceFormType) => {
    await onSave(data);
  };

  // ----------------------------
  // UI HANDLERS
  // ----------------------------
  const handleTechKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = (e.target as HTMLInputElement).value.trim();
      if (!value || techFields.length >= MAX_TECH) return;

      addTech({ value: "" });
    }
  };

  // ----------------------------
  // UI
  // ----------------------------
  return (
    <>
      {/* overlay */}
      <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40" />

      {/* drawer */}
      <div className="fixed right-0 top-0 p-6 h-full w-full md:w-[450px] bg-white z-50 shadow-xl">
        <div className="border border-primary-dark flex flex-col rounded-sm h-full">
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
            <div className="flex-1 p-5 space-y-6">
              {/* TITLE */}
              <div>
                <label className="text-sm font-medium text-muted">
                  Title *
                </label>

                <input
                  {...register("title")}
                  className="w-full mt-2 px-4 py-3 rounded-lg border"
                  placeholder="Enter service title"
                />
                {errors.title && (
                  <p className="text-xs text-red-500">{errors.title.message}</p>
                )}
              </div>

              {/* SHORT DESCRIPTION */}
              <div>
                <label className="text-sm font-medium text-muted">
                  Short Description
                </label>

                <textarea
                  {...register("shortDescription")}
                  rows={2}
                  className="w-full mt-2 px-4 py-3 rounded-lg border"
                />
              </div>

              {/* OVERVIEW */}
              <div>
                <label className="text-sm font-medium text-muted">
                  Overview
                </label>

                <textarea
                  {...register("overview")}
                  rows={4}
                  className="w-full mt-2 px-4 py-3 rounded-lg border"
                />
              </div>

              {/* CATEGORY */}
              <div>
                <label className="text-sm font-medium text-muted">
                  Category
                </label>

                <select
                  {...register("category")}
                  className="w-full mt-2 px-4 py-3 rounded-lg border"
                >
                  <option value="seo">SEO</option>
                  <option value="web">Web</option>
                  <option value="marketing">Marketing</option>
                </select>
              </div>

              {/* ORDER */}
              <div>
                <label className="text-sm font-medium text-muted">Order</label>

                <input
                  type="number"
                  {...register("order", { valueAsNumber: true })}
                  className="w-full mt-2 px-4 py-3 rounded-lg border"
                />
              </div>

              {/* FEATURES */}
              <div>
                <label className="text-sm font-medium text-muted">
                  Features
                </label>

                <div className="space-y-3 mt-2">
                  {featureFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="border rounded-lg p-3 space-y-2"
                    >
                      <input
                        {...register(`features.${index}.title`)}
                        placeholder="Feature title"
                        className="w-full px-3 py-2 border rounded"
                      />

                      <textarea
                        {...register(`features.${index}.description`)}
                        placeholder="Feature description"
                        className="w-full px-3 py-2 border rounded"
                      />

                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="text-red-500 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    disabled={featureFields.length >= MAX_FEATURES}
                    onClick={() => addFeature({ title: "", description: "" })}
                    className="text-primary text-sm"
                  >
                    + Add Feature
                  </button>
                </div>
              </div>

              {/* TECHNOLOGIES */}
              <div>
                <label className="text-sm font-medium text-muted">
                  Technologies
                </label>

                <div className="flex flex-wrap gap-2 mt-2">
                  {techFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex items-center bg-gray-100 px-3 py-1 rounded-full"
                    >
                      <input
                        {...register(`technologies.${index}.value`)}
                        onKeyDown={handleTechKeyDown}
                        className="bg-transparent outline-none text-sm w-[120px]"
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
                    onClick={() => addTech({ value: "" })}
                    className="text-sm text-primary"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="p-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-white px-4 py-2 rounded min-w-[110px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Save
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

export default ServiceDrawer;
