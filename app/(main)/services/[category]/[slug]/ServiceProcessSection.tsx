import React from "react";
import type { Category } from "@/lib/serviceDesignConfig";
import { categoryProcess } from "@/lib/serviceCategoryProcess";

type ServiceProcessSectionProps = {
  category: Category;
  serviceTitle: string;
};

export default function ServiceProcessSection({
  category,
  serviceTitle,
}: ServiceProcessSectionProps) {
  const steps = categoryProcess[category] || [];

  return (
    <section className="relative py-28 px-6 sm:px-8 overflow-hidden border-l border-r border-b border-border">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50/30 to-white -z-10" />

      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-16">Our Process</h2>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <div key={`${step.title}-${index}`} className="relative group">
              {/* Connector line (desktop only) */}
              {index !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 right-[-20px] w-10 h-[2px] bg-gradient-to-r from-primary/40 to-transparent" />
              )}

              <div
                className="relative p-7 rounded-2xl border border-gray-200 bg-white shadow-sm
                transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Step Circle (UPGRADED) */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center font-bold shadow-lg ring-4 ring-white">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Content */}
                <div className="mt-10">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition">
                    {step.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* subtle bottom hint */}
        <p className="text-xs text-muted-foreground mt-10">
          Every step is tailored for {serviceTitle}
        </p>
      </div>
    </section>
  );
}
