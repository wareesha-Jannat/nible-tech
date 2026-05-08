"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import FaqDrawer from "./FaqDrawer";
import { FaqItem } from "@/lib/types";

import { addFaq, updateFaq, deleteFaqDB, updateFaqPriority } from "./action";
import { FAQFormType } from "@/lib/validations/faq";

type ManageFaqsProps = {
  initialFaqs: FaqItem[];
};

const ManageFaqs = ({ initialFaqs }: ManageFaqsProps) => {
  // STATE

  const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqs);

  const [selectedFaq, setSelectedFaq] = useState<FaqItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [loadingId, setLoadingId] = useState<string | null>(null);

  // -------------------------
  // DRAWER
  // -------------------------
  const openEdit = (faq: FaqItem) => {
    setSelectedFaq(faq);
    setIsCreating(false);
  };

  const openCreate = () => {
    setSelectedFaq(null);
    setIsCreating(true);
  };

  const closeDrawer = () => {
    setSelectedFaq(null);
    setIsCreating(false);
  };

  // -------------------------
  // ESC + scroll lock
  // -------------------------
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };

    window.addEventListener("keydown", handleEsc);

    document.body.style.overflow = selectedFaq || isCreating ? "hidden" : "";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [selectedFaq, isCreating]);

  // -------------------------
  // SAVE (ADD / UPDATE)
  // -------------------------
  const saveFaq = async (data: FAQFormType) => {
  

    try {
      if (isCreating) {
        const res = await addFaq(data);

        if (!res.success) throw new Error(res.message);

        setFaqs((prev) => [res.newFaq, ...prev]);
        toast.success("FAQ added");
      } else {
        if (!selectedFaq) return;

        const res = await updateFaq(selectedFaq._id, data);

        if (!res.success) throw new Error(res.message);

        setFaqs((prev) =>
          prev.map((f) => (f._id === selectedFaq._id ? res.updated : f)),
        );

        toast.success("FAQ updated");
      }

      closeDrawer();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  // -------------------------
  // DELETE
  // -------------------------
  const deleteFaq = async (id: string) => {
    try {
      setLoadingId(id);

      const res = await deleteFaqDB(id);

      if (!res.success) throw new Error(res.message);

      setFaqs((prev) => prev.filter((f) => f._id !== id));

      toast.success("FAQ deleted");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  // -------------------------
  // PRIORITY
  // -------------------------
  const changePriority = async (id: string, value: number) => {
    try {
      if (value < 0) return;

      const res = await updateFaqPriority(id, value);

      if (!res.success) throw new Error(res.message);

      setFaqs((prev) => prev.map((f) => (f._id === id ? res.updated : f)));

      toast.success("Priority updated");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to update");
    }
  };

  // -------------------------
  // UI
  // -------------------------
  return (
    <>
      {/* HEADER */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-dark">
            FAQs
          </h2>
          <p className="text-sm text-gray-500">Manage your FAQs</p>
        </div>

        <button
          onClick={openCreate}
          className="ml-auto w-full sm:w-auto px-4 py-2 bg-primary text-white rounded-md"
        >
          + Add FAQ
        </button>
      </div>

      {/* LIST */}
      <div className="bg-white rounded-2xl border-border p-4 sm:p-6 ">
        {faqs.length > 0 ? (
          faqs.map((faq, index) => {
            const isDeleting = loadingId === faq._id;

            return (
              <details
                key={faq._id}
                className="border-b last:border-none group"
              >
                <summary className="flex flex-wrap gap-3 px-4 sm:px-6 py-4 cursor-pointer">
                  <div className="flex text-sm gap-3">
                    <span>{index + 1}.</span>
                    <h3 className="font-semibold">{faq.question}</h3>
                  </div>

                  <div className="flex items-center ml-auto gap-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openEdit(faq);
                      }}
                      className="px-3 py-1 text-sm border rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        deleteFaq(faq._id);
                      }}
                      disabled={isDeleting}
                      className="px-3 py-1 border text-sm text-red-500"
                    >
                      {isDeleting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Delete"
                      )}
                    </button>

                    <ChevronDown className="w-4 h-4 group-open:rotate-180 transition" />
                  </div>
                </summary>

                <div className="px-4 pb-4 text-sm text-gray-600">
                  {faq.answer}

                  <div className="mt-3 flex items-center gap-2">
                    <span>Priority:</span>
                    <input
                      type="number"
                      defaultValue={faq.priority ?? 0}
                      onBlur={(e) =>
                        changePriority(faq._id, Number(e.target.value))
                      }
                      className="border px-2 py-1 w-20"
                    />
                  </div>
                </div>
              </details>
            );
          })
        ) : (
          <p className="text-center py-10 text-gray-500">No FAQs found</p>
        )}
      </div>

      {/* DRAWER */}
      {(selectedFaq || isCreating) && (
        <FaqDrawer faq={selectedFaq} onClose={closeDrawer} onSave={saveFaq} />
      )}
    </>
  );
};

export default ManageFaqs;
