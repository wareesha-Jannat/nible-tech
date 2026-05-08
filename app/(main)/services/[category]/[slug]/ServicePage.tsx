"use client";

import React from "react";
import { getPattern, getImage } from "@/lib/serviceDesignHelper";
import ServiceHeroSection from "./ServiceHeroSection";
import ServiceOverviewSection from "./ServiceOverviewSection";
import ServiceFeaturesSection from "./ServiceFeaturesSection";
import ServiceProcessSection from "./ServiceProcessSection";
import ServiceTechnologiesSection from "./ServiceTechnologiesSection";
import ServiceResultsSection from "./ServiceResultSection";

import ServiceCTASection from "./ServiceCTASection";
import { ServiceItem } from "@/lib/types";

type Props = {
  service: ServiceItem;
};

// -----------------------------
// Component
// -----------------------------
const ServicePage = ({ service }: Props) => {
  const pattern = getPattern(service.category, service.slug!);
  const image = getImage(service.category, service.slug!);

  return (
    <div className="w-full">
      {/* ---------------- HERO ---------------- */}
      <ServiceHeroSection
        title={service.title}
        category={service.category}
        shortDescription={service.shortDescription}
        pattern={pattern}
      />

      {/* ---------------- OVERVIEW ---------------- */}
      <ServiceOverviewSection
        title={service.title}
        category={service.category}
        overview={service.overview}
      />

      {/* ---------------- FEATURES ---------------- */}
      <ServiceFeaturesSection
        features={service.features}
        category={service.category}
        image={image}
      />

      {/* ---------------- PROCESS ---------------- */}
      <ServiceProcessSection
        category={service.category}
        serviceTitle={service.title}
      />

      {/* ---------------- TECHNOLOGIES ---------------- */}
      <ServiceTechnologiesSection technologies={service.technologies} />

      {/* ---------------- RESULTS ---------------- */}
      <ServiceResultsSection category={service.category} />

      {/* ---------------- CTA ---------------- */}
      <ServiceCTASection
        category={service.category}
        title={service.title}
      />
    </div>
  );
};

export default ServicePage;