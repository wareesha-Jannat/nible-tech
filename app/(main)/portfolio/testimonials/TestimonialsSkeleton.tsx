

import React from "react";

const SkeletonBox = ({ className = "" }: { className?: string }) => (
  <div className={`bg-gray-200/40 animate-pulse rounded-md ${className}`} />
);

const TestimonialsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="p-6 rounded-xl border border-gray-200 flex flex-col gap-5"
        >
          {/* Top Row */}
          <div className="flex items-center gap-4 border-b border-gray-200 pb-4 mb-3">
            {/* Avatar */}
            <SkeletonBox className="w-14 h-14 rounded-full" />

            {/* Name + Role */}
            <div className="flex flex-col gap-2">
              <SkeletonBox className="h-4 w-28" />
              <SkeletonBox className="h-3 w-20" />
            </div>
          </div>

          {/* Quote Icon (fake block) */}
          <SkeletonBox className="h-5 w-5" />

          {/* Message */}
          <div className="space-y-2">
            <SkeletonBox className="h-4 w-full" />
            <SkeletonBox className="h-4 w-[90%]" />
            <SkeletonBox className="h-4 w-[80%]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestimonialsSkeleton;