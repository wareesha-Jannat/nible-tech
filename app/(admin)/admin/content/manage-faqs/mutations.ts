"use client";

import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addFaq, updateFaq, deleteFaqDB, updateFaqPriority } from "./action";

import { FaqItem, FaqsPage } from "@/lib/types";
import { FAQFormType } from "@/lib/validations/faq";

/* ---------------------------------- ADD ---------------------------------- */

export function useAddFaqMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<FaqItem, "_id">) => {
      const res = await addFaq(data);

      if (!res.success) {
        throw new Error(res.message);
      }

      return res.newFaq;
    },

    onSuccess: async (newFaq: FaqItem) => {
      toast.success("FAQ added successfully");

      await queryClient.cancelQueries({ queryKey: ["faqs"] });

      queryClient.setQueriesData(
        { queryKey: ["faqs"] },
        (oldData: InfiniteData<FaqsPage> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page, index) =>
              index === 0
                ? {
                    ...page,
                    faqs: [newFaq, ...page.faqs],
                    featureCount: newFaq.featured
                      ? page.featureCount + 1
                      : page.featureCount,
                  }
                : page,
            ),
          };
        },
      );
    },
  });
}

/* -------------------------------- UPDATE -------------------------------- */

export function useUpdateFaqMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ _id, data }: { _id: string; data: FAQFormType }) => {
      const res = await updateFaq(_id, data);

      if (!res.success) {
        throw new Error(res.message);
      }

      return res.updated;
    },

    onSuccess: async (updated: FaqItem) => {
      toast.success("FAQ updated successfully");

      await queryClient.cancelQueries({ queryKey: ["faqs"] });

      queryClient.setQueriesData(
        { queryKey: ["faqs"] },
        (oldData: InfiniteData<FaqsPage> | undefined) => {
          if (!oldData) return oldData;

          let featureChange = 0;

          const pages = oldData.pages.map((page) => ({
            ...page,
            faqs: page.faqs.map((f) => {
              if (f._id !== updated._id) return f;

              if (!f.featured && updated.featured) featureChange = 1;
              if (f.featured && !updated.featured) featureChange = -1;

              return updated;
            }),
          }));

          return {
            ...oldData,
            pages: pages.map((page, index) =>
              index === 0
                ? {
                    ...page,
                    featureCount: page.featureCount + featureChange,
                  }
                : page,
            ),
          };
        },
      );
    },
  });
}

/* -------------------------------- DELETE -------------------------------- */

export function useDeleteFaqMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteFaqDB(id);

      if (!res.success) {
        throw new Error(res.message);
      }

      return res.deletedId;
    },

    onSuccess: async (deletedId: string) => {
      toast.success("FAQ deleted successfully");

      await queryClient.cancelQueries({ queryKey: ["faqs"] });

      queryClient.setQueriesData(
        { queryKey: ["faqs"] },
        (oldData: InfiniteData<FaqsPage> | undefined) => {
          if (!oldData) return oldData;

          const deletedFaq = oldData.pages
            .flatMap((p) => p.faqs)
            .find((f) => f._id === deletedId);

          const removedFeatured = !!deletedFaq?.featured;

          const pages = oldData.pages.map((page) => ({
            ...page,
            faqs: page.faqs.filter((f) => f._id !== deletedId),
          }));

          return {
            ...oldData,
            pages: pages.map((page, index) =>
              index === 0
                ? {
                    ...page,
                    featureCount: removedFeatured
                      ? page.featureCount - 1
                      : page.featureCount,
                  }
                : page,
            ),
          };
        },
      );
    },
  });
}

export function useUpdateFaqPriorityMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, priority }: { id: string; priority: number }) => {
      const res = await updateFaqPriority(id, priority);

      if (!res.success) {
        throw new Error(res.message || "Failed to update priority");
      }

      return res.updated;
    },
    onSuccess: async (updated) => {
      toast.success("Priority updated");

      await queryClient.cancelQueries({ queryKey: ["projects"] });

      queryClient.setQueriesData(
        { queryKey: ["projects"] },
        (oldData: InfiniteData<FaqsPage> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page: FaqsPage) => ({
              ...page,
              faqs: page.faqs.map((s: FaqItem) =>
                s._id === updated._id ? updated : s,
              ),
            })),
          };
        },
      );
    },
  });
}
