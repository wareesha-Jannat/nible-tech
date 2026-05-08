"use client";

import { Category } from "@/lib/serviceDesignConfig";
import { useQuery } from "@tanstack/react-query";

export type ServiceNavItem = {
  _id: string;
  title: string;
  slug: string;
  category: Category;
  order: number;
};

export function useServices() {
  return useQuery<ServiceNavItem[]>({
    queryKey: ["services"],

    queryFn: async () => {
      const res = await fetch("/api/services");

      if (!res.ok) {
        throw new Error("Failed to fetch services");
      }

      return res.json();
    },

    staleTime: 1000 * 60 * 10, // 10 min cache
    refetchOnWindowFocus: false,
  });
}
