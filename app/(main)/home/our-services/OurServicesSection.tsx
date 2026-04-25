import React, { Suspense } from "react";
import ServicesCardSkeleton from "./ServicesCardSkeleton";
import OurServiceSectionWrapper from "./OurServiceSectionWrapper";

const OurServicesSection = () => {
  return (
    <section className="relative w-full border-l border-r border-gray-200 py-16  md:py-24 text-foreground overflow-hidden">
      {/* 
        Background: Elegant One-sided Gradient (Top-Left to Bottom-Right)
      */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-white to-white -z-20 border-t border-gray-200" />

      {/* Brighter Ambient Glows for 'lighting it up' */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -z-10 animate-fluid-blob" />
      <div className="absolute bottom-[0%] right-[-10%] w-[600px] h-[600px] bg-purple-300/40 rounded-full blur-[100px] -z-10 animate-fluid-blob animation-delay-4000" />

      <div className="w-full px-8 md:px-16 lg:px-24 flex flex-col ">
        {/* Section Header */}
        <div className="mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
            Our Services
          </h2>
          {/* A small cool gradient divider line under the heading */}
          <div className="w-24 h-1 bg-gradient-to-r from-primary-light to-transparent rounded-full" />
        </div>
      </div>
      <Suspense fallback={<ServicesCardSkeleton />}>
        <OurServiceSectionWrapper />
      </Suspense>
    </section>
  );
};

export default OurServicesSection;
