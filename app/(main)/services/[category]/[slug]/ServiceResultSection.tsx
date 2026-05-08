import React from "react";
import { Category } from "@/lib/serviceDesignConfig";
import { categoryResults } from "@/lib/serviceCategoryResult";

type ServiceResultsSectionProps = {
  category: Category;
  title?: string;
  subtitle?: string;
};

export default function ServiceResultsSection({
  category,
  title = "The Impact You’ll Experience",
  subtitle = "We don’t just deliver improvements — we create meaningful business outcomes that drive growth.",
}: ServiceResultsSectionProps) {
  const results = categoryResults[category] || [];

  return (
    <section className="py-24 px-6 sm:px-8 border-l border-r border-b border-border">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>

        {/* Subheading */}
        <p className="text-muted-foreground max-w-2xl mx-auto mb-14">
          {subtitle}
        </p>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {results.map((item) => (
            <div
              key={item.title}
              className="group p-6 rounded-2xl bg-white border border-gray-200 
                         shadow-sm hover:shadow-lg transition-all duration-500 
                         hover:-translate-y-2 text-left"
            >
              {/* Accent line */}
              <div className="w-10 h-[3px] bg-gradient-to-r from-primary to-primary-dark mb-4 rounded-full" />

              {/* Title */}
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
