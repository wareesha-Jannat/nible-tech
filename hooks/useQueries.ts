import { QueriesPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";

type UseQueriesProps = {
  status?: string;
  search?: string;

};

export function useQueries({ status = "all", search = "" }: UseQueriesProps) {
  return useInfiniteQuery({
    queryKey: ["queries", status, search],

    queryFn: async ({ pageParam }) => {
      const res = await fetch(
        `/api/query?cursor=${pageParam ?? ""}&limit=5&status=${status}&search=${search}`,
      );

      if (!res.ok) throw new Error("Failed to fetch queries");

      return res.json();
    },

    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}
