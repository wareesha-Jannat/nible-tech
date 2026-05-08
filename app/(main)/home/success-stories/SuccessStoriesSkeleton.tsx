import React from "react";



const SuccessStoriesSkeleton = () => {
  return (
    <section className="space-y-10 animate-pulse">
      {/* Projects Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-xl overflow-hidden"
          >
            {/* Image */}
            <div className="w-full aspect-[16/10] bg-gray-200" />

            {/* Content */}
            <div className="p-5 space-y-4">
              {/* Title */}
              <div className="h-5 w-3/4 bg-gray-200 rounded" />

              {/* Description */}
              <div className="space-y-2">
                <div className="h-3 w-full bg-gray-200 rounded" />
                <div className="h-3 w-5/6 bg-gray-200 rounded" />
              </div>

              {/* Features */}
              <div className="space-y-2 mt-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-gray-300 rounded-full" />
                    <div className="h-3 w-4/5 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>

              {/* Tech tags */}
              <div className="flex gap-2 mt-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-6 w-16 bg-gray-200 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA skeleton */}
      <div className="flex justify-center">
        <div className="h-10 w-40 bg-gray-200 rounded-lg" />
      </div>

      {/* Testimonials skeleton */}
      <div className="mt-10 text-center space-y-10">
        {/* Heading */}
        <div className="space-y-2">
          <div className="h-6 w-64 bg-gray-200 mx-auto rounded" />
          <div className="h-4 w-96 bg-gray-200 mx-auto rounded" />
        </div>

        {/* Carousel skeleton */}
        <div className="flex items-center justify-center gap-6">
          {/* left card */}
          <div className="hidden md:block w-[33%] h-[280px] bg-gray-200 rounded-xl" />

          {/* center card */}
          <div className="w-[90%] md:w-[33%] h-[300px] bg-gray-300 rounded-xl" />

          {/* right card */}
          <div className="hidden md:block w-[33%] h-[280px] bg-gray-200 rounded-xl" />
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSkeleton;
