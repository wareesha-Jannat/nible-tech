import { useInfiniteQuery } from "@tanstack/react-query";
import { ProjectsPage } from "@/lib/types";

type UseProjectsProps = {
  initialData?: ProjectsPage;
  search?: string;
};

export function useProjects({ initialData, search = "" }: UseProjectsProps) {
  return useInfiniteQuery({
    queryKey: ["projects", search],

    queryFn: async ({ pageParam }): Promise<ProjectsPage> => {
      const res = await fetch(
        `/api/projects?cursor=${pageParam ?? ""}&limit=5&search=${search ?? ""}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch projects");
      }

      return res.json();
    },

    initialPageParam: null as string | null,

    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,

    initialData: initialData
      ? {
          pages: [initialData],
          pageParams: [null],
        }
      : undefined,
  });
}
