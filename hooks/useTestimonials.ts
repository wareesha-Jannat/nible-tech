import { useInfiniteQuery } from "@tanstack/react-query";
import { TestimonialsPage } from "@/lib/types";

type UseTestimonialsProps = {
  initialData?: TestimonialsPage;
  search?: string;
  featuredOnly?: boolean;
};

export function useTestimonials({
  initialData,
  search = "",
  featuredOnly,
}: UseTestimonialsProps) {
  return useInfiniteQuery({
    queryKey: ["testimonials", search, featuredOnly],

    queryFn: async ({ pageParam }): Promise<TestimonialsPage> => {
      const res = await fetch(
        `/api/testimonials?cursor=${pageParam ?? ""}&limit=5&search=${search ?? ""}&featured=${featuredOnly ?? false}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch testimonials");
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
