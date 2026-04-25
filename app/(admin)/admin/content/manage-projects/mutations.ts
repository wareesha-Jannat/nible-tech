"use client";

import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addProject, updateProject, deleteProjectDB, updateProjectPriority } from "./action";

import { ProjectItem, ProjectsPage } from "@/lib/types";
import { ProjectDrawerResponse } from "./ManageProjects";

/* ---------------------------------- ADD ---------------------------------- */

export function useAddProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ProjectDrawerResponse) => {
      const res = await addProject({
        restData: payload.data,
        imageFile: payload.imageFile,
      });

      if (!res.success) {
        throw new Error(res.message);
      }

      return res.newProject;
    },

    onSuccess: async (newItem: ProjectItem) => {
      toast.success("Project added successfully");

      await queryClient.cancelQueries({ queryKey: ["projects"] });

      queryClient.setQueriesData(
        { queryKey: ["projects"] },
        (oldData: InfiniteData<ProjectsPage> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page, index) =>
              index === 0
                ? {
                    ...page,
                    projects: [newItem, ...page.projects],
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

export function useUpdateProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ProjectDrawerResponse) => {
      const res = await updateProject({
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

    onSuccess: async (updated: ProjectItem) => {
      toast.success("Project updated successfully");

      await queryClient.cancelQueries({ queryKey: ["projects"] });

      queryClient.setQueriesData(
        { queryKey: ["projects"] },
        (oldData: InfiniteData<ProjectsPage> | undefined) => {
          if (!oldData) return oldData;

          let featureDelta = 0;

          const pages = oldData.pages.map((page) => ({
            ...page,
            projects: page.projects.map((p) => {
              if (p._id !== updated._id) return p;

              // 🔥 detect feature change
              if (!p.featured && updated.featured) featureDelta = 1;
              if (p.featured && !updated.featured) featureDelta = -1;

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

export function useDeleteProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteProjectDB(id);

      if (!res.success) {
        throw new Error(res.message);
      }

      return res.deletedId;
    },

    onSuccess: async (deletedId: string) => {
      toast.success("Project deleted successfully");

      await queryClient.cancelQueries({ queryKey: ["projects"] });

      queryClient.setQueriesData(
        { queryKey: ["projects"] },
        (oldData: InfiniteData<ProjectsPage> | undefined) => {
          if (!oldData) return oldData;

          // find deleted item
          const deleted = oldData.pages
            .flatMap((p) => p.projects)
            .find((p) => p._id === deletedId);

          const removedFeatured = !!deleted?.featured;

          const pages = oldData.pages.map((page) => ({
            ...page,
            projects: page.projects.filter((p) => p._id !== deletedId),
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

export function useUpdateProjectPriorityMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, priority }: { id: string; priority: number }) => {
      const res = await updateProjectPriority(id, priority);

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
        (oldData: InfiniteData<ProjectsPage> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page: ProjectsPage) => ({
              ...page,
              projects: page.projects.map((s: ProjectItem) =>
                s._id === updated._id ? updated : s,
              ),
            })),
          };
        },
      );
    },
  });
}