import React from "react";
import { getCategoryHighlights } from "@/lib/serviceCategoryHighlights";

type ServiceOverviewSectionProps = {
  title: string;
  category: string;
  overview: string;
};

export default function ServiceOverviewSection({
  category,
  overview,
}: ServiceOverviewSectionProps) {
  const highlights = getCategoryHighlights(category);

  return (
    <section className="relative w-full border-l border-r border-b border-border py-24 px-6 sm:px-8 overflow-hidden ">
      {/* Soft glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-10">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
            Overview
          </span>
        </h2>

        {/* Main Card */}
        <div className="w-full border border-gray-200 rounded-2xl px-8 py-10 bg-white/60 backdrop-blur-md shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-500">
          {/* Overview */}
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-light max-w-3xl mx-auto">
            {overview}
          </p>

          {/* Divider */}
          <div className="w-24 h-[2px] bg-gradient-to-r from-primary to-primary-dark rounded-full mt-8 mx-auto" />

          {/* Dynamic Highlights */}
          <div className="mt-10 grid md:grid-cols-3 gap-6 text-sm text-gray-600">
            {highlights.map((item) => (
              <div key={item.title}>
                <p className="font-semibold text-primary mb-1">{item.title}</p>
                <p className="leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
