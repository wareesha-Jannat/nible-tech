import { useInfiniteQuery } from "@tanstack/react-query";
import { FaqItem, FaqsPage } from "@/lib/types";

type UseFaqsProps = {
  initialData?: FaqsPage;
  search?: string;
  featuredOnly?: boolean;
};

export function useFaqs({
  initialData,
  search = "",
  featuredOnly,
}: UseFaqsProps) {
  return useInfiniteQuery({
    queryKey: ["faqs", search, featuredOnly],

    queryFn: async ({ pageParam }): Promise<FaqsPage> => {
      const res = await fetch(
        `/api/faqs?cursor=${pageParam ?? ""}&limit=10&search=${search ?? ""}&featured=${featuredOnly ?? false}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch faqs");
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
