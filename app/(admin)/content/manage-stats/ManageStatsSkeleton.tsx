"use client";

import React from "react";
import GlassCard from "@/app/components/GlassCard";

const ManageStatsSkeleton = () => {
  return (
    <>
      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <GlassCard
            key={i}
            className="flex flex-col items-center justify-center text-center p-6"
          >
            {/* Value */}
            <div className="h-10 w-20 bg-gray-300 rounded mb-3"></div>

            {/* Label */}
            <div className="h-4 w-32 bg-gray-200 rounded mb-4"></div>

            {/* Button */}
            <div className="h-8 w-16 bg-gray-300 rounded"></div>
          </GlassCard>
        ))}
      </div>
    </>
  );
};

export default ManageStatsSkeleton;
