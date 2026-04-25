
import React from "react";


const SkeletonBox = ({ className = "" }: { className?: string }) => (
  <div className={`bg-gray-200/50 animate-pulse rounded-md ${className}`} />
);

const StatsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 px-8 w-full max-w-[1000px] mb-24">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-center p-6 border rounded-xl"
        >
          {/* Number */}
          <SkeletonBox className="h-12 md:h-16 w-24 md:w-32 mb-3" />

          {/* Label */}
          <SkeletonBox className="h-3 md:h-4 w-32" />
        </div>
      ))}
    </div>
  );
};

export default StatsSkeleton;
