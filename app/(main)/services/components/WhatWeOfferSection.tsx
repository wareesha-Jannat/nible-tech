import React, { Suspense } from "react";
import WhatWeOfferSkeleton from "./WhatWeOfferSkeleton";
import WhatWeOfferWrapper from "./WhatWeOfferWrapper";

const WhatWeOfferSection = () => {
  return (
    <section
      id="services"
      className="relative w-full py-28 px-14 border border-border text-foreground overflow-hidden"
    >
      {/* Background animated blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-gradient-to-tr from-purple-400/20 via-pink-400/20 to-blue-400/20 rounded-full blur-[150px] animate-[blobMove1_15s_ease-in-out_infinite] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-gradient-to-tr from-indigo-500/20 via-pink-300/20 to-purple-400/20 rounded-full blur-[150px] animate-[blobMove2_20s_ease-in-out_infinite] -z-10" />

      {/* Container */}
      <div className="w-full max-w-7xl mx-auto flex flex-col items-start">
        {/* Title */}
        <div className="space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold">
            What We{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
              Offer
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
            We provide modern digital solutions designed to help your business
            grow, scale, and succeed.
          </p>
        </div>
        <Suspense fallback={<WhatWeOfferSkeleton />}>
          <WhatWeOfferWrapper />
        </Suspense>
      </div>
    </section>
  );
};

export default WhatWeOfferSection;
