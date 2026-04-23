// mutations.ts
"use client";

import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteQuery, updateQuery, updateQueryStatus } from "./action";
import { QueriesPage, QueryItem } from "@/lib/types";
import { ContactFormType } from "@/lib/validations/contact";

type UpdateQueryStatusVars = {
  id: string;
  status: "new" | "in-progress" | "completed";
};

type UpdateQueryVars = {
  id: string;
  data: ContactFormType;
};

export function useUpdateQueryStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: UpdateQueryStatusVars) => {
      const res = await updateQueryStatus({ id, status });

      if (!res.success) throw new Error(res.message);

      return res.updated;
    },

    onSuccess: async (updated) => {
      toast.success("Status updated");

      await queryClient.cancelQueries({ queryKey: ["queries"] });

      queryClient.setQueriesData(
        { queryKey: ["queries"] },
        (old: InfiniteData<QueriesPage> | undefined) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page: QueriesPage) => ({
              ...page,
              queries: page.queries.map((q: QueryItem) =>
                q._id === updated._id
                  ? {
                      ...q,
                      status: updated.status,
                      updatedAt: updated.updatedAt,
                    }
                  : q,
              ),
            })),
          };
        },
      );
    },
  });
}

export function useUpdateQueryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: UpdateQueryVars) => {
      const res = await updateQuery({ id, data });

      if (!res.success) {
        throw new Error(res.message);
      }

      return res.updatedQuery;
    },

    onSuccess: async (updated: QueryItem) => {
      await queryClient.cancelQueries({ queryKey: ["queries"] });

      queryClient.setQueriesData(
        { queryKey: ["queries"] },
        (old: InfiniteData<QueriesPage> | undefined) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              queries: page.queries.map((q) =>
                q._id === updated._id ? updated : q,
              ),
            })),
          };
        },
      );
    },
  });
}

export function useDeleteQueryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteQuery(id);

      if (!res.success) {
        throw new Error(res.message);
      }

      return res.deletedId as string;
    },

    onSuccess: async (deletedId) => {
      toast.success("Query deleted");

      await queryClient.cancelQueries({ queryKey: ["queries"] });

      queryClient.setQueriesData(
        { queryKey: ["queries"] },
        (old: InfiniteData<QueriesPage> | undefined) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              queries: page.queries.filter((q) => q._id !== deletedId),
            })),
          };
        },
      );
    },
  });
}
