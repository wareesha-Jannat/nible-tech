

import React from "react";
import Link from "next/link";

type ServiceHeroSectionProps = {
  title: string;
  category: string;
  shortDescription: string;
  pattern: string;
};

export default function ServiceHeroSection({
  title,
  category,
  shortDescription,
  pattern,
}: ServiceHeroSectionProps) {
  return (
    <section className="relative border-l border-r border-b border-border overflow-hidden py-24 px-6 sm:px-8 text-center">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${pattern})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Content */}
      <div className="relative max-w-4xl mx-auto">
        <p className="text-sm uppercase tracking-wider text-primary font-semibold mb-3">
          {category.toUpperCase()} SERVICE
        </p>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          {title}
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          {shortDescription}
        </p>

        <Link
          href="/contact"
          className="inline-block bg-primary text-white px-7 py-3 rounded-lg font-semibold hover:scale-105 active:scale-95 transition"
        >
          Get Free Consultation
        </Link>
      </div>
    </section>
  );
}
