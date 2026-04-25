import React, { Suspense } from "react";
import OurWorkSkeleton from "./OurWorkSkeleton";
import OurWorkWrapper from "./OurWorkWrapper";

const OurWorkSection = () => {
  return (
    <>
      <section className="w-full py-24 px-6 sm:px-12 border border-border">
        <div className="max-w-7xl mx-auto flex flex-col gap-14">
          {/* Heading */}
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
                Work
              </span>
            </h2>
            <p className="text-gray-600">
              A selection of projects that showcase how we turn ideas into real,
              scalable digital products.
            </p>
          </div>
          <Suspense fallback={<OurWorkSkeleton />}>
            <OurWorkWrapper />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default OurWorkSection;
