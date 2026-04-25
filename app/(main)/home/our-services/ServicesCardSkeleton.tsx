"use client";

import React from "react";
import GlassCard from "@/app/components/GlassCard";

const SkeletonBox = ({ className = "" }: { className?: string }) => (
  <div className={`bg-gray-200/50 animate-pulse rounded-md ${className}`} />
);

const ServicesCardSkeleton = () => {
  return (
    <>
      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 px-8 gap-8 mb-16">
        {[1, 2, 3].map((item) => (
          <GlassCard key={item} className="border-gray-100 p-6">
            {/* Icon + Title */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5">
              {/* Icon */}
              <SkeletonBox className="w-14 h-14 rounded-xl" />

              {/* Title */}
              <SkeletonBox className="h-5 w-40" />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <SkeletonBox className="h-4 w-full" />
              <SkeletonBox className="h-4 w-5/6" />
              <SkeletonBox className="h-4 w-4/6" />
            </div>
          </GlassCard>
        ))}
      </div>

      {/* CTA Button */}
      <div className="flex justify-center mt-4">
        <SkeletonBox className="h-12 w-56 rounded-lg" />
      </div>
    </>
  );
};

export default ServicesCardSkeleton;
