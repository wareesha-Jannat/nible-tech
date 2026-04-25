"use client";

import React from "react";
import GlassCard from "@/app/components/GlassCard";

const SkeletonBox = ({ className = "" }: { className?: string }) => (
  <div className={`bg-gray-200/40 animate-pulse rounded-md ${className}`} />
);

const RecentQueriesSkeleton = () => {
  return (
    <GlassCard className="p-0 overflow-hidden">
      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          className="flex items-center justify-between px-6 py-4 border-b border-gray-200"
        >
          {/* Left side */}
          <div className="space-y-2">
            <SkeletonBox className="w-28 h-4" />
            <SkeletonBox className="w-40 h-3" />
          </div>

          {/* Status pill */}
          <SkeletonBox className="w-20 h-6 rounded-full" />
        </div>
      ))}
    </GlassCard>
  );
};

export default RecentQueriesSkeleton;
