"use client";

import React from "react";

const SkeletonBox = ({ className = "" }: { className?: string }) => (
  <div className={`bg-gray-200/40 animate-pulse rounded-md ${className}`} />
);

const BlogsSkeleton = () => {
  return (
    <div className="space-y-10">
      {[1, 2, 3].map((item, index) => {
        const isReverse = index % 2 !== 0;

        return (
          <div
            key={item}
            className={`flex flex-col md:flex-row items-center gap-10 border border-gray-200 p-6 rounded-xl ${
              isReverse ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image Skeleton */}
            <div className="w-full md:w-1/2">
              <SkeletonBox className="w-full h-[220px] sm:h-[260px] md:h-[350px] rounded-xl" />
            </div>

            {/* Content Skeleton */}
            <div className="w-full md:w-1/2 space-y-4">
              {/* Title */}
              <SkeletonBox className="h-6 w-3/4" />

              {/* Description lines */}
              <SkeletonBox className="h-4 w-full" />
              <SkeletonBox className="h-4 w-[90%]" />
              <SkeletonBox className="h-4 w-[80%]" />

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 pt-2">
                {[1, 2, 3, 4].map((tech) => (
                  <SkeletonBox
                    key={tech}
                    className="h-6 w-16 rounded-full"
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BlogsSkeleton;