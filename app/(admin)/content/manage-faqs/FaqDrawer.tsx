"use client";
import { FaqItem } from "@/lib/types";
import { faqSchema, FAQFormType } from "@/lib/validations/faq";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

type FaqDrawerProps = {
  faq: FaqItem | null;
  onClose: () => void;
  onSave: (data: FaqItem) => void;
  featuredCount: number;
};

const MAX_FEATURED = 6;
const FaqDrawer = ({ faq, onClose, onSave, featuredCount }: FaqDrawerProps) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FAQFormType>({
    resolver: zodResolver(faqSchema),
    defaultValues: faq || {
      question: "",
      answer: "",
      featured: false,
    },
  });

  const featured = watch("featured");

  const wasOriginallyFeatured = faq?.featured ?? false;

  // 🔥 live calculated count (no stale props)
  const isFeaturedDisabled =
    !featured && featuredCount >= MAX_FEATURED && !wasOriginallyFeatured;

  // ESC disable scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const onSubmit = async (data: FAQFormType) => {
    const finalData: FaqItem = {
      ...faq,
      ...data,
      _id: faq?._id || "",
    };

    await onSave(finalData);
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
              {faq ? "Edit FAQ" : "Add FAQ"}
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
                  Question *
                </label>
                <input
                  {...register("question")}
                  className="w-full mt-2 px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                  placeholder="Enter FAQ question"
                />
                {errors.question && (
                  <p className="text-xs text-red-500">
                    {errors.question.message}
                  </p>
                )}
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="text-sm text-muted font-medium">Answer</label>
                <textarea
                  {...register("answer")}
                  rows={4}
                  className="w-full mt-2 px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                  placeholder="Enter FAQ answer"
                />
              </div>

              {/* FEATURED */}
              <div className="flex items-center justify-between">
                <label className="text-sm text-muted font-medium">
                  Featured Service
                </label>

                <input
                  type="checkbox"
                  checked={featured}
                  disabled={isFeaturedDisabled}
                  onChange={(e) => setValue("featured", e.target.checked)}
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

export default FaqDrawer;
