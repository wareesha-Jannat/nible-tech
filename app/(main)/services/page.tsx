import React from "react";
import Hero from "./components/Hero";
import WhatWeOfferSection from "./what-we-offer/WhatWeOfferSection";
import FAQSection from "./faqs/FAQSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Nible Tech offers web development, digital marketing, WordPress development, AI chatbot integration, and custom IT solutions in Pakistan.",
};

export default function Services() {
  return (
    <>
      <main>
        <Hero />
        <WhatWeOfferSection />
        <FAQSection />
      </main>
    </>
  );
}
