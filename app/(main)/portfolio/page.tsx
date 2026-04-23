import React from "react";
import PortfolioHero from "./components/PortfolioHero";
import OurWork from "./components/OurWork";
import Testimonials from "./components/Testimonials";
import ServicesCtaSection from "./components/PortfolioCtaSection"

export default function Portfolio() {
  return (
    <>
      <PortfolioHero />
      <OurWork />
      <Testimonials />
      <ServicesCtaSection />
    </>
  );
}
