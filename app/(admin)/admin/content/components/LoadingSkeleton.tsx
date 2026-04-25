"use client";

import React from "react";

const LoadingSkeleton = () => {
  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <div>
          <div className="h-7 w-40 bg-gray-300 rounded mb-2 animate-pulse"></div>
          <div className="h-4 w-52 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="h-10 w-full sm:w-32 bg-gray-300 rounded-md sm:ml-auto animate-pulse"></div>
      </div>

      {/* Cards Container */}
      <div className="p-3 sm:p-4 bg-white overflow-hidden rounded-2xl border border-border">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="border-b border-border px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-3"
          >
            {/* Left */}
            <div className="flex items-center gap-3">
              <div className="h-4 w-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-5 w-40 bg-gray-300 rounded animate-pulse"></div>
            </div>

            {/* Right */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 sm:ml-auto">
              <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-8 w-10 sm:w-14 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-8 w-10 sm:w-16 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-4 w-4 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LoadingSkeleton;