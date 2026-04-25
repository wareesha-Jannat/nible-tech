"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";

import { useDebounce } from "@/hooks/useDebounce";
import { useFaqs } from "@/hooks/useFaqs";

import {
  useAddFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
  useUpdateFaqPriorityMutation,
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
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
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
    initialData: isSearching || showFeaturedOnly ? undefined : initialData,
    search: debouncedSearch,
    featuredOnly: showFeaturedOnly,
  });

  const faqs = data?.pages.flatMap((p) => p.faqs) ?? [];
  const featuredCount = data?.pages[0]?.featureCount ?? 0;

  // -----------------------------
  // Mutations
  // -----------------------------
  const addMutation = useAddFaqMutation();
  const updateMutation = useUpdateFaqMutation();
  const deleteMutation = useDeleteFaqMutation();
  const priorityMutation = useUpdateFaqPriorityMutation();
  // -----------------------------
  // Load more
  // -----------------------------
  const loadMore = () => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  };
  const closeDrawer = () => {
    setSelectedFaq(null);
    setIsCreating(false);
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

  const changePriority = (id: string, value: number) => {
    if (value < 0) return;

    priorityMutation.mutate({
      id,
      priority: value,
    });
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
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search services..."
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <button
          onClick={() => setShowFeaturedOnly((prev) => !prev)}
          className={`px-4 py-2 rounded-md text-sm font-medium border transition ${
            showFeaturedOnly
              ? "bg-primary text-white border-primary"
              : "bg-white text-gray-600 border-gray-300"
          }`}
        >
          {showFeaturedOnly ? "All Faqs" : "Featured"}
        </button>
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
                {faq.featured && (
                  <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-md">
                    {/* Priority Display */}
                    <div className="text-sm">
                      <span className="text-gray-500 mr-2">Priority:</span>
                      <span className="font-semibold">{faq.priority ?? 0}</span>
                    </div>

                    {/* Controls */}
                    <input
                      type="number"
                      defaultValue={faq.priority ?? 0}
                      min={0}
                      onBlur={(e) =>
                        changePriority(faq._id, Number(e.target.value))
                      }
                      className="w-20 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                )}
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
