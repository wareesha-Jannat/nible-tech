import React from "react";
import GlassCard from "@/app/components/GlassCard";
import { getFeatureIcon } from "@/lib/utils"; // adjust path if needed
import type { Category } from "@/lib/serviceDesignConfig";

// -----------------------------
// Types
// -----------------------------
type Feature = {
  title: string;
  description: string;
};

type ServiceFeaturesSectionProps = {
  features: Feature[];
  category: Category;
  image: string;
  title?: string;
};

// -----------------------------
// Component
// -----------------------------
export default function ServiceFeaturesSection({
  features,
  category,
  image,
  title = "Core Benefits",
}: ServiceFeaturesSectionProps) {
  return (
    <section className="relative py-24 px-6 sm:px-8 sm:px-10 border-l border-b border-r border-border overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
          {title}
        </h2>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = getFeatureIcon(feature.title, category);

            return (
              <GlassCard key={`${feature.title}-${index}`} hasHoverGlow>
                {/* Icon */}
                <div className="mb-5 flex justify-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold mb-2 text-center">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground text-center leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
