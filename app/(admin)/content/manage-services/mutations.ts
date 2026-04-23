"use client";

import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  addService,
  updateService,
  deleteServiceDB,
  updateServicePriority,
} from "./action";

import { ServiceItem, ServicesPage } from "@/lib/types";
import { ServiceBackendType } from "@/lib/validations/service";

/* ---------------------------------- ADD ---------------------------------- */

export function useAddServiceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ServiceBackendType) => {
      const res = await addService(data);

      if (!res.success) {
        throw new Error(res.message);
      }

      return res.newService;
    },

    onSuccess: async (newService: ServiceItem) => {
      toast.success("Service added successfully");

      await queryClient.cancelQueries({ queryKey: ["services"] });

      queryClient.setQueriesData(
        { queryKey: ["services"] },
        (oldData: InfiniteData<ServicesPage> | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page: ServicesPage, index: number) =>
              index === 0
                ? {
                    ...page,
                    services: [newService, ...page.services],
                    featureCount: newService.featured
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

export function useUpdateServiceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: ServiceBackendType;
    }) => {
      const res = await updateService(id, data);

      if (!res.success) {
        throw new Error(res.message);
      }

      return res.updated;
    },

    onSuccess: async (updated: ServiceItem) => {
      toast.success("Service updated successfully");

      await queryClient.cancelQueries({ queryKey: ["services"] });

      queryClient.setQueriesData(
        { queryKey: ["services"] },
        (oldData: InfiniteData<ServicesPage> | undefined) => {
          if (!oldData) return oldData;

          let featureChanged = 0;

          const pages = oldData.pages.map((page) => ({
            ...page,
            services: page.services.map((s) => {
              if (s._id !== updated._id) return s;

              // detect feature change
              if (!s.featured && updated.featured) featureChanged = 1;
              if (s.featured && !updated.featured) featureChanged = -1;

              return updated;
            }),
          }));

          return {
            ...oldData,
            pages: pages.map((page, index) =>
              index === 0
                ? {
                    ...page,
                    featureCount: page.featureCount + featureChanged,
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

export function useDeleteServiceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteServiceDB(id);

      if (!res.success) {
        throw new Error(res.message);
      }

      return res.deletedId;
    },

    onSuccess: async (deletedId: string) => {
      toast.success("Service deleted successfully");

      await queryClient.cancelQueries({ queryKey: ["services"] });

      queryClient.setQueriesData(
        { queryKey: ["services"] },
        (oldData: InfiniteData<ServicesPage> | undefined) => {
          if (!oldData) return oldData;

          // 1. find deleted service safely
          const deletedService = oldData.pages
            .flatMap((p) => p.services)
            .find((s) => s._id === deletedId);

          const removedFeatured = !!deletedService?.featured;

          // 2. remove service from all pages
          const pages = oldData.pages.map((page) => ({
            ...page,
            services: page.services.filter((s) => s._id !== deletedId),
          }));

          // 3. update featureCount safely
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

export function useUpdateServicePriorityMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, priority }: { id: string; priority: number }) => {
      const res = await updateServicePriority(id, priority);

      if (!res.success) {
        throw new Error(res.message || "Failed to update priority");
      }

      return res.updated;
    },
    onSuccess: async (updated) => {
      toast.success("Priority updated");

      await queryClient.cancelQueries({ queryKey: ["services"] });

      queryClient.setQueriesData(
        { queryKey: ["services"] },
        (oldData: InfiniteData<ServicesPage> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page: any) => ({
              ...page,
              services: page.services.map((s: any) =>
                s._id === updated._id ? updated : s,
              ),
            })),
          };
        },
      );
    },
  });
}
