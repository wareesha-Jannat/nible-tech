"use client";

import { useQuery } from "@tanstack/react-query";

export type ServiceOption = {
  _id: string;
  title: string;
};

export function useFeaturedServices() {
  return useQuery<ServiceOption[]>({
    queryKey: ["featured-services"],

    queryFn: async () => {
      const res = await fetch("/api/services/featured");

      if (!res.ok) {
        throw new Error("Failed to fetch featured services");
      }

      return res.json();
    },

    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
}
