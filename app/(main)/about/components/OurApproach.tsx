import GlassCard from "@/app/components/GlassCard";
import React from "react";

const OurApproach = () => {
  return (
    <section className="relative w-full border-l border-r border-gray-200 py-24 px-8 text-foreground border-t bg-background overflow-hidden">
      {/* 
        Background ambient glow: 
        Made much brighter and expanded to two crossing orbs (Purple & Blue) for a premium highly-noticeable gradient
      */}
      <div className="absolute top-[60%] left-[30%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-[80%] right-[30%] translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -z-10" />

      {/* Container - matching width style of other sections */}
      <div className="w-full px-6 flex flex-col items-center">
        {/* Title */}
        <div className="space-y-4 mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-primary-dark">
            Our Approach
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl text-center  leading-relaxed">
            A simple, focused process to turn ideas into real, working products.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 w-full mb-16 ">
          {/* Stat 1 */}
          <GlassCard className="items-center justify-center">
            {/* Icon and Title Wrapper */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-5 z-10 border-b  border-primary/20 group-hover:border-primary/40  transition-colors duration-500 pb-3">
              {/* Icon Box */}
              <div className="w-14 h-14 rounded-xl bg-primary/5 font-extrabold text-2xl border border-primary/20 group-hover:border-primary/40 group-hover:bg-primary/10 flex items-center justify-center transition-colors duration-500 shrink-0">
                01
              </div>

              <h3 className="text-xl font-semibold text-primary-dark tracking-wide group-hover:text-primary transition-colors duration-300">
                Understand
              </h3>
            </div>

            {/* Quick description */}
            <p className="text-gray-600 leading-relaxed z-10 font-light text-[15px]">
              We start by understanding your idea, goals, and the problem you
              want to solve.
            </p>
          </GlassCard>
          <GlassCard className="items-center justify-center">
            {/* Icon and Title Wrapper */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-5 z-10 border-b  border-primary/20 group-hover:border-primary/40  transition-colors duration-500 pb-3 ">
              {/* Icon Box */}
              <div className="w-14 h-14 rounded-xl bg-primary/5 font-extrabold text-2xl border border-primary/20 group-hover:border-primary/40 group-hover:bg-primary/10 flex items-center justify-center transition-colors duration-500 shrink-0">
                02
              </div>

              <h3 className="text-xl font-semibold text-primary-dark tracking-wide group-hover:text-primary transition-colors duration-300">
                Plan
              </h3>
            </div>

            {/* Quick description */}
            <p className="text-gray-600 leading-relaxed z-10 font-light text-[15px]">
              We design a clear structure and choose the right technologies for
              scalability and performance.
            </p>
          </GlassCard>
          <GlassCard className="items-center justify-center">
            {/* Icon and Title Wrapper */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-5 z-10 border-b  border-primary/20 group-hover:border-primary/40  transition-colors duration-500 pb-3 ">
              {/* Icon Box */}
              <div className="w-14 h-14 rounded-xl bg-primary/5 font-extrabold text-2xl border border-primary/20 group-hover:border-primary/40 group-hover:bg-primary/10 flex items-center justify-center transition-colors duration-500 shrink-0">
                03
              </div>

              <h3 className="text-xl font-semibold text-primary-dark tracking-wide group-hover:text-primary transition-colors duration-300">
                Build
              </h3>
            </div>

            {/* Quick description */}
            <p className="text-gray-600 leading-relaxed z-10 font-light text-[15px]">
              We develop using modern tools and best practices, focusing on
              clean code and user experience.
            </p>
          </GlassCard>
          <GlassCard className="items-center justify-center">
            {/* Icon and Title Wrapper */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-5 z-10 border-b  border-primary/20 group-hover:border-primary/40  transition-colors duration-500 pb-3 ">
              {/* Icon Box */}
              <div className="w-14 h-14 rounded-xl bg-primary/5 font-extrabold text-2xl border border-primary/20 group-hover:border-primary/40 group-hover:bg-primary/10 flex items-center justify-center transition-colors duration-500 shrink-0">
                04
              </div>

              <h3 className="text-xl font-semibold text-primary-dark tracking-wide group-hover:text-primary transition-colors duration-300">
                Improve
              </h3>
            </div>

            {/* Quick description */}
            <p className="text-gray-600 leading-relaxed z-10 font-light text-[15px]">
              We test, refine, and optimize to make sure everything works
              smoothly in real-world use.
            </p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default OurApproach;
