import React from "react";
import PortfolioHero from "./components/PortfolioHero";
import PortfolioCtaSection from "./components/PortfolioCtaSection";
import OurWorkSection from "./our-work/OurWorkSection";
import type { Metadata } from "next";
import FAQSection from "./faqs/FAQSection";

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
      <FAQSection />
      <PortfolioCtaSection />
    </>
  );
}
