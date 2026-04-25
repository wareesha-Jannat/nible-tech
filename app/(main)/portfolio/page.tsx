import React from "react";
import PortfolioHero from "./components/PortfolioHero";
import ServicesCtaSection from "./components/PortfolioCtaSection";
import OurWorkSection from "./our-work/OurWorkSection";
import TestimonialsSection from "./testimonials/TestimonialsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore Nible Tech portfolio showcasing modern web development projects, UI/UX designs, and custom software solutions delivered for clients in Pakistan.",
};

export default function Portfolio() {
  return (
    <>
      <PortfolioHero />
      <OurWorkSection />
      <TestimonialsSection />
      <ServicesCtaSection />
    </>
  );
}
