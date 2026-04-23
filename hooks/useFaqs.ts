import { useInfiniteQuery } from "@tanstack/react-query";
import { FaqItem, FaqsPage } from "@/lib/types";

type UseFaqsProps = {
  initialData?: {
    faqs: FaqItem[];
    nextCursor: string | null;
    featureCount: number;
  };
  search?: string;
};

export function useFaqs({ initialData, search = "" }: UseFaqsProps) {
  return useInfiniteQuery({
    queryKey: ["faqs", search],

    queryFn: async ({ pageParam }): Promise<FaqsPage> => {
      const res = await fetch(
        `/api/faqs?cursor=${pageParam ?? ""}&limit=10&search=${search ?? ""}`,
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
