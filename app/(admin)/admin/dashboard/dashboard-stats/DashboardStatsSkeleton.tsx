import React from "react";
import GlassCard from "@/app/components/GlassCard";

const SkeletonBox = ({ className = "" }: { className?: string }) => (
  <div className={`bg-gray-200/40 animate-pulse rounded-md ${className}`} />
);

const DashboardStatsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-[1200px]">
      {[1, 2, 3, 4].map((item) => (
        <GlassCard
          key={item}
          className="relative p-6 flex flex-col justify-between min-h-[140px]"
        >
          {/* Icon placeholder */}
          <SkeletonBox className="absolute top-4 right-4 w-12 h-12 rounded-full" />

          <div className="space-y-4">
            {/* Label */}
            <SkeletonBox className="w-24 h-3" />

            {/* Number */}
            <SkeletonBox className="w-20 h-10" />
          </div>
        </GlassCard>
      ))}
    </div>
  );
};

export default DashboardStatsSkeleton;
