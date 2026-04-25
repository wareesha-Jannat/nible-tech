import AboutCtaSection from "./components/AboutCtaSection";
import Hero from "./components/Hero";
import HowWeWork from "./components/HowWeWork";
import OurApproach from "./components/OurApproach";
import WhoWeAre from "./components/WhoWeAre";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Nible Tech, a modern IT company based in Lahore, Pakistan specializing in web development, digital solutions, and AI-powered applications.",
};

export default function About() {
  return (
    <>
      <main>
        <Hero />
        <WhoWeAre />
        <OurApproach />
        <HowWeWork />
        <AboutCtaSection />
      </main>
    </>
  );
}
