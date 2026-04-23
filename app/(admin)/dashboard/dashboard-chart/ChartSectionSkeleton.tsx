import React from "react";
import GlassCard from "@/app/components/GlassCard";

const SkeletonBox = ({ className = "" }: { className?: string }) => (
  <div className={`bg-gray-200/40 animate-pulse rounded-md ${className}`} />
);

const ChartSectionSkeleton = () => {
  return (
    <div className="mt-18 px-6">
      <GlassCard className="p-6">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div className="space-y-3">
            <SkeletonBox className="w-40 h-5" />
            <SkeletonBox className="w-28 h-4" />
          </div>

          {/* Filter buttons skeleton */}
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <SkeletonBox key={i} className="w-16 h-8 rounded-md" />
            ))}
          </div>
        </div>

        {/* Chart Skeleton */}
        <div className="w-full h-[300px] flex items-end gap-2 px-2">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="flex-1 flex flex-col justify-end gap-2">
              <SkeletonBox
                className="w-full rounded-md"
               
              />
              <SkeletonBox className="w-full h-3" />
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default ChartSectionSkeleton;
