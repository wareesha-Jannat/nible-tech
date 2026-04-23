"use client";

import React from "react";

const SkeletonBox = ({ className = "" }: { className?: string }) => (
  <div className={`bg-gray-200/40 animate-pulse rounded-md ${className}`} />
);

const QueriesListSkeleton = () => {
  return (
    <div className="p-0 overflow-hidden">
      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-gray-200"
        >
          {/* Left */}
          <div className="flex items-center gap-3">
            <SkeletonBox className="w-5 h-4" /> {/* index */}
            <SkeletonBox className="w-24 sm:w-28 h-4" /> {/* name */}
          </div>

          {/* Right */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 sm:ml-auto">
            {/* Status */}
            <SkeletonBox className="w-14 sm:w-16 h-5 sm:h-6 rounded-full" />

            {/* Edit */}
            <SkeletonBox className="w-8 h-8 sm:w-12 sm:h-7 rounded-md" />

            {/* Delete */}
            <SkeletonBox className="w-8 h-8 sm:w-12 sm:h-7 rounded-md" />

            {/* Chevron */}
            <SkeletonBox className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default QueriesListSkeleton;