"use client";

import React, { useState } from "react";
import { TestimonialItem } from "@/lib/types";
import TestimonialDrawer from "./TestimonialDrawer";
import Image from "next/image";
import { ChevronDown, Loader2 } from "lucide-react";

import { TestimonialFormType } from "@/lib/validations/testimonials";

import toast from "react-hot-toast";
import {
  addTestimonial,
  deleteTestimonialDB,
  updateTestimonial
} from "./action";

export type TestimonialDrawerResponse = {
  data: TestimonialFormType;
  imageFile: File | null;
  removeImage: boolean;
  _id?: string;
};

type ManageTestimonialsProps = {
  initialTestimonials: TestimonialItem[];
};

const ManageTestimonials = ({
  initialTestimonials,
}: ManageTestimonialsProps) => {
  const [testimonials, setTestimonials] =
    useState<TestimonialItem[]>(initialTestimonials);
  const [selected, setSelected] = useState<TestimonialItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const openCreate = () => {
    setSelected(null);
    setIsCreating(true);
  };

  const openEdit = (t: TestimonialItem) => {
    setSelected(t);
    setIsCreating(false);
  };

  const closeDrawer = () => {
    setSelected(null);
    setIsCreating(false);
  };

  // SAVE
  // ----------------------------
  const saveTestimonial = async (payload: TestimonialDrawerResponse) => {
    try {
      if (isCreating) {
        const res = await addTestimonial({
          restData: payload.data,
          imageFile: payload.imageFile,
        });

        if (!res.success) throw new Error(res.message);

        setTestimonials((prev) => [res.newTestimonial, ...prev]);

        toast.success("Testimonial added successfully");
      } else {
        if (!payload._id) {
          toast.error("No testimonial selected");
          return;
        }

        const res = await updateTestimonial({
          id: payload._id,
          restData: payload.data,
          imageFile: payload.imageFile,
          removeImage: payload.removeImage,
        });

        if (!res.success) throw new Error(res.message);

        setTestimonials((prev) =>
          prev.map((t) => (t._id === payload._id ? res.updated : t)),
        );

        toast.success("Testimonial updated successfully");
      }

      closeDrawer();
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  // ----------------------------
  // DELETE
  // ----------------------------
  const deleteTestimonial = async (id: string) => {
    if (loadingId) return;

    try {
      setLoadingId(id);

      const res = await deleteTestimonialDB(id);

      if (!res.success) throw new Error(res.message);

      setTestimonials((prev) => prev.filter((t) => t._id !== id));

      toast.success("Testimonial deleted");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error deleting");
    } finally {
      setLoadingId(null);
    }
  };


  return (
    <>
      {/* Header */}
      <div className="flex flex-wrap items-center  gap-4 mb-8">
        <div>
          <h2 className="text-2xl  sm:text-3xl font-bold text-primary-dark">
            Testimonials
          </h2>
          <p className="text-gray-500 text-sm">
            Manage client feedback and reviews
          </p>
        </div>

        <button
          onClick={openCreate}
          className="px-4 ml-auto py-2 bg-primary text-white rounded-md"
        >
          + Add Testimonial
        </button>
      </div>

      {/* Grid */}
      <div className="space-y-3">
        {testimonials && testimonials.length > 0 ? (
          testimonials.map((t) => {
            const isDeleting = loadingId === t._id;

            return (
              <details
                key={t._id}
                className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                {/* SUMMARY */}
                <summary className="flex flex-wrap gap-3 px-4 sm:px-6 py-4 cursor-pointer">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 relative rounded-full overflow-hidden border">
                      <Image
                        src={t.image?.url || "/avatar-placeholder.png"}
                        alt={t.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div>
                      <h3 className="font-semibold text-sm">{t.name}</h3>

                      <p className="text-xs text-gray-400">
                        {t.role}
                        {t.company && (
                          <>
                            <span className="mx-1">•</span>
                            {t.company}
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center ml-auto gap-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        openEdit(t);
                      }}
                      className="px-3 py-1 text-xs border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        deleteTestimonial(t._id);
                      }}
                      disabled={isDeleting}
                      className="px-3 py-1 text-xs border border-red-300 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition disabled:opacity-50 flex items-center justify-center min-w-[80px]"
                    >
                      {isDeleting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Delete"
                      )}
                    </button>

                    <ChevronDown className="transition-transform duration-200 group-open:rotate-180" />
                  </div>
                </summary>

                {/* EXPANDED MESSAGE */}
                <div className="px-5 pb-5 border-t">
                  <div className="mt-4 relative">
                    {/* Quote Icon (subtle) */}
                    <span className="absolute -top-2 -left-2 text-4xl text-gray-200 select-none">
                      “
                    </span>

                    <p className="text-sm text-gray-600 leading-relaxed pl-4">
                      {t.message}
                    </p>
                  </div>
                </div>
              </details>
            );
          })
        ) : (
          <div className="text-center text-gray-500 py-10">
            No testimonial found
          </div>
        )}
      </div>

      {/* Drawer */}
      {(selected || isCreating) && (
        <TestimonialDrawer
          testimonial={selected}
          onClose={closeDrawer}
          onSave={saveTestimonial}
        />
      )}
    </>
  );
};

export default ManageTestimonials;
