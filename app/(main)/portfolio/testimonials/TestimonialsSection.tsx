import React, { Suspense } from "react";
import TestimonialsWrapper from "./TestimonialsWrapper";
import TestimonialsSkeleton from "./TestimonialsSkeleton";

const TestimonialsSection = () => {
  return (
    <>
      <section className="w-full px-6 sm:px-12 py-18 md:py-24 border border-border bg-background flex flex-col">
        {/* Heading */}
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
              Clients Say
            </span>
          </h2>
          <p className="text-gray-600">
            Honest feedback from people we’ve worked with.
          </p>
        </div>
        <Suspense fallback={<TestimonialsSkeleton />}>
          <TestimonialsWrapper />
        </Suspense>
      </section>
    </>
  );
};

export default TestimonialsSection;
