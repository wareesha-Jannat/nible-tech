import { ServicesPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";

type UseServicesProps = {
  initialData?: ServicesPage;
  search?: string;
    featuredOnly? :boolean;
};

export function useServices({ initialData, search = "", featuredOnly }: UseServicesProps) {
  return useInfiniteQuery({
    queryKey: ["services", search, featuredOnly],

    queryFn: async ({ pageParam }): Promise<ServicesPage> => {
      const res = await fetch(
        `/api/services?cursor=${pageParam ?? ""}&limit=5&search=${search ?? ""}&featured=${featuredOnly ?? false}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch services");
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
