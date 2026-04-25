

import React from "react";

const SkeletonBox = ({ className = "" }: { className?: string }) => (
  <div className={`bg-gray-200/50 animate-pulse rounded-md ${className}`} />
);

const WhatWeOfferSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-row items-start space-x-6 p-6 border rounded-xl"
        >
          {/* Icon skeleton */}
          <SkeletonBox className="w-16 h-16 rounded-xl shrink-0" />

          {/* Content */}
          <div className="flex-1 space-y-3">
            {/* Title */}
            <SkeletonBox className="w-3/4 h-5" />

            {/* Description */}
            <div className="space-y-2">
              <SkeletonBox className="w-full h-3" />
              <SkeletonBox className="w-5/6 h-3" />
            </div>

            {/* Features list */}
            <div className="space-y-2 mt-3">
              <SkeletonBox className="w-2/3 h-3" />
              <SkeletonBox className="w-1/2 h-3" />
              <SkeletonBox className="w-3/4 h-3" />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              <SkeletonBox className="w-14 h-5 rounded-full" />
              <SkeletonBox className="w-16 h-5 rounded-full" />
              <SkeletonBox className="w-12 h-5 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WhatWeOfferSkeleton;