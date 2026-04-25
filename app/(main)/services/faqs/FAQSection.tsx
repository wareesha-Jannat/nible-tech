import LoadingSkeleton from "@/app/(admin)/admin/content/components/LoadingSkeleton";
import React, { Suspense } from "react";
import FAQWrapper from "./FAQWrapper";

const FAQSection = () => {
  return (
    <>
      <section className="w-full py-18 py-24 px-6 sm:px-10  border-l border-r border-t border-gray-200 bg-background text-foreground">
        {/* Container */}
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Title */}
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold">
              Frequently Asked{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
                Questions
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
              Everything you need to know about our services and how we work.
            </p>
          </div>
          <Suspense fallback={<LoadingSkeleton />}>
            <FAQWrapper />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default FAQSection;
