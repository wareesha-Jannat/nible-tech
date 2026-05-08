import React from "react";
import { getCtaContent } from "@/lib/serviceCategoryCta";
import Link from "next/link";

type ServiceCTASectionProps = {
  category: string;
  title: string;
  backgroundImage?: string;
};

export default function ServiceCTASection({
  category,
  backgroundImage = "/patterns/cta-bg.svg",
}: ServiceCTASectionProps) {
  // 🔥 fetch inside component
  const cta = getCtaContent(category);

  if (!cta) return null;

  return (
    <section className="relative py-28 px-6 sm:px-8 text-center overflow-hidden border-l border-r border-b border-border">
      {/* Background SVG */}
      <div
        className="absolute inset-0 opacity-40 bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Content */}
      <div className="relative max-w-3xl mx-auto">
        {/* Kicker */}
        <p className="text-sm uppercase tracking-widest text-white/80 mb-4">
          {cta.kicker}
        </p>

        {/* Headline */}
        <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6 text-white">
          {cta.headline}
        </h2>

        {/* Description */}
        <p className="text-white/80 text-base md:text-lg mb-10 leading-relaxed">
          {cta.description}
        </p>

        {/* Button */}
       <Link
  href="/contact"
  className="inline-flex bg-white text-primary px-8 py-3 rounded-xl font-semibold hover:scale-105 active:scale-95 transition shadow-lg"
>
  {cta.button}
</Link>
      </div>
    </section>
  );
}
