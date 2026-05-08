import React from "react";

// -----------------------------
// Types
// -----------------------------
type ServiceTechnologiesSectionProps = {
  technologies: string[];
  title?: string;
  description?: string;
};

// -----------------------------
// Component
// -----------------------------
export default function ServiceTechnologiesSection({
  technologies,
  title = "Tools & Technologies",
  description = "We use industry-leading tools and modern technologies to deliver reliable, data-driven, and high-performance results for your business.",
}: ServiceTechnologiesSectionProps) {
  return (
    <section className="relative py-24 px-6 sm:px-8 border-l border-r border-b border-border overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5 -z-10" />

      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>

        {/* Description */}
        <p className="text-muted-foreground max-w-2xl mx-auto mb-14">
          {description}
        </p>

        {/* Technologies Grid */}
        <div className="flex flex-wrap justify-center gap-4">
          {technologies.map((tech) => (
            <div
              key={tech}
              className="
                relative px-5 py-3 rounded-full
                bg-white/80 backdrop-blur-md
                border border-gray-200
                shadow-sm
                hover:shadow-md hover:-translate-y-1
                transition-all duration-300
                group
              "
            >
              {/* subtle glow on hover */}
              <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition" />

              <span className="relative text-sm font-medium text-gray-700 group-hover:text-primary transition">
                {tech}
              </span>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-xs text-muted-foreground mt-10">
          Constantly updated with the latest tools & best practices
        </p>
      </div>
    </section>
  );
}
