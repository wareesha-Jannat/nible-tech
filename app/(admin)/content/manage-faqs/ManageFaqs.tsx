"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";

import { useDebounce } from "@/hooks/useDebounce";
import { useFaqs } from "@/hooks/useFaqs";

import {
  useAddFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} from "./mutations";

import FaqDrawer from "./FaqDrawer";
import { FaqItem } from "@/lib/types";

type ManageFaqsProps = {
  initialFaqs: FaqItem[];
  cursor: string | null;
  featureCount: number;
};

const ManageFaqs = ({ initialFaqs, cursor, featureCount }: ManageFaqsProps) => {
  const [selectedFaq, setSelectedFaq] = useState<FaqItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  // -----------------------------
  // Query
  // -----------------------------
  const isSearching = debouncedSearch.length > 0;

  const initialData = {
    faqs: initialFaqs,
    nextCursor: cursor,
    featureCount,
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFaqs({
    initialData: isSearching ? undefined : initialData,
    search: debouncedSearch,
  });

  const faqs = data?.pages.flatMap((p) => p.faqs) ?? [];
  const featuredCount = data?.pages[0]?.featureCount ?? 0;

  // -----------------------------
  // Mutations
  // -----------------------------
  const addMutation = useAddFaqMutation();
  const updateMutation = useUpdateFaqMutation();
  const deleteMutation = useDeleteFaqMutation();

  // -----------------------------
  // Load more
  // -----------------------------
  const loadMore = () => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  };

  // -----------------------------
  // ESC + scroll lock
  // -----------------------------
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

  // -----------------------------
  // Drawer handlers
  // -----------------------------
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

  // -----------------------------
  // Save (Add / Update)
  // -----------------------------
  const saveFaq = async (data: FaqItem) => {
    const { _id, ...rest } = data;

    if (isCreating) {
      await addMutation.mutateAsync(rest, {
        onSuccess: closeDrawer,
      });
    } else {
      await updateMutation.mutateAsync(
        { _id, data: rest },
        { onSuccess: closeDrawer },
      );
    }
  };

  // -----------------------------
  // Delete
  // -----------------------------
  const deleteFaq = (id: string) => {
    deleteMutation.mutate(id);
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <>
      {/* Header */}
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

      {/* Search */}
      <div className="mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search FAQs..."
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl border border-border">
        {faqs.length > 0 ? (
          faqs.map((faq, index) => {
            const isDeleting =
              deleteMutation.isPending && deleteMutation.variables === faq._id;

            return (
              <details
                key={faq._id}
                className="group border-b border-border last:border-none"
              >
                <summary className="flex flex-wrap gap-3 px-4 sm:px-6 py-4 cursor-pointer list-none">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted font-medium">
                      {index + 1}.
                    </span>
                    <h3 className="font-semibold">{faq.question}</h3>
                  </div>

                  <div className="ml-auto flex items-center gap-2">
                    {faq.featured && (
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full">
                        Featured
                      </span>
                    )}

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openEdit(faq);
                      }}
                      className="px-3 py-1 text-xs border rounded-md"
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
                      className="px-3 py-1 text-xs border text-red-500 rounded-md"
                    >
                      {isDeleting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Delete"
                      )}
                    </button>

                    <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
                  </div>
                </summary>

                <div className="px-6 pb-4 pt-2 border-t bg-gray-50">
                  <p className="text-sm text-gray-600">{faq.answer}</p>
                </div>
              </details>
            );
          })
        ) : (
          <p className="text-center text-gray-500 py-10">No FAQs found</p>
        )}

        {/* Load More */}
        {hasNextPage && (
          <button
            onClick={loadMore}
            disabled={isFetchingNextPage}
            className="mt-6 px-4 py-2 border rounded-md flex items-center gap-2"
          >
            {isFetchingNextPage ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </button>
        )}
      </div>

      {/* Drawer */}
      {(selectedFaq || isCreating) && (
        <FaqDrawer
          faq={selectedFaq}
          onClose={closeDrawer}
          onSave={saveFaq}
          featuredCount={featuredCount}
        />
      )}
    </>
  );
};

export default ManageFaqs;
