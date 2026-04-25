"use client";

import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  addTestimonial,
  updateTestimonial,
  deleteTestimonialDB,
  updateTestimonialPriority,
} from "./action";

import { TestimonialItem, TestimonialsPage } from "@/lib/types";
import { TestimonialDrawerResponse } from "./ManageTestimonials";

/* ---------------------------------- ADD ---------------------------------- */

export function useAddTestimonialMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: TestimonialDrawerResponse) => {
      const res = await addTestimonial({
        restData: payload.data,
        imageFile: payload.imageFile,
      });

      if (!res.success) {
        throw new Error(res.message);
      }

      return res.newTestimonial;
    },

    onSuccess: async (newItem: TestimonialItem) => {
      toast.success("Testimonial added successfully");

      await queryClient.cancelQueries({ queryKey: ["testimonials"] });

      queryClient.setQueriesData(
        { queryKey: ["testimonials"] },
        (oldData: InfiniteData<TestimonialsPage> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page, index) =>
              index === 0
                ? {
                    ...page,
                    testimonials: [newItem, ...page.testimonials],
                    featureCount: newItem.featured
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

/* --------------------------------- UPDATE -------------------------------- */

export function useUpdateTestimonialMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: TestimonialDrawerResponse) => {
      const res = await updateTestimonial({
        id: payload._id!,
        restData: payload.data,
        imageFile: payload.imageFile,
        removeImage: payload.removeImage,
      });

      if (!res.success) {
        throw new Error(res.message);
      }

      return res.updated;
    },

    onSuccess: async (updated: TestimonialItem) => {
      toast.success("Testimonial updated successfully");

      await queryClient.cancelQueries({ queryKey: ["testimonials"] });

      queryClient.setQueriesData(
        { queryKey: ["testimonials"] },
        (oldData: InfiniteData<TestimonialsPage> | undefined) => {
          if (!oldData) return oldData;

          let featureDelta = 0;

          const pages = oldData.pages.map((page) => ({
            ...page,
            testimonials: page.testimonials.map((t) => {
              if (t._id !== updated._id) return t;

              // 🔥 detect feature change
              if (!t.featured && updated.featured) featureDelta = 1;
              if (t.featured && !updated.featured) featureDelta = -1;

              return updated;
            }),
          }));

          return {
            ...oldData,
            pages: pages.map((page, index) =>
              index === 0
                ? {
                    ...page,
                    featureCount: page.featureCount + featureDelta,
                  }
                : page,
            ),
          };
        },
      );
    },
  });
}

/* --------------------------------- DELETE -------------------------------- */

export function useDeleteTestimonialMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteTestimonialDB(id);

      if (!res.success) {
        throw new Error(res.message);
      }

      return res.deletedId;
    },

    onSuccess: async (deletedId: string) => {
      toast.success("Testimonial deleted successfully");

      const queryKey = ["testimonials", ""];

      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData(
        queryKey,
        (oldData: InfiniteData<TestimonialsPage> | undefined) => {
          if (!oldData) return oldData;

          // find deleted item
          const deleted = oldData.pages
            .flatMap((p) => p.testimonials)
            .find((t) => t._id === deletedId);

          const removedFeatured = !!deleted?.featured;

          // remove from pages
          const pages = oldData.pages.map((page) => ({
            ...page,
            testimonials: page.testimonials.filter((t) => t._id !== deletedId),
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

export function useUpdateTestimonialPriorityMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, priority }: { id: string; priority: number }) => {
      const res = await updateTestimonialPriority(id, priority);

      if (!res.success) {
        throw new Error(res.message || "Failed to update priority");
      }

      return res.updated;
    },
    onSuccess: async (updated) => {
      toast.success("Priority updated");

      await queryClient.cancelQueries({ queryKey: ["testimonials"] });

      queryClient.setQueriesData(
        { queryKey: ["testimonials"] },
        (oldData: InfiniteData<TestimonialsPage> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page: TestimonialsPage) => ({
              ...page,
              testimonials: page.testimonials.map((s: TestimonialItem) =>
                s._id === updated._id ? updated : s,
              ),
            })),
          };
        },
      );
    },
  });
}
