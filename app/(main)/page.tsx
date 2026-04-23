import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import CtaSection from "../components/CtaSection";
import OurServicesSection from "../components/our-services/OurServicesSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <OurServicesSection />
      <StatsSection />
      <CtaSection />
    </>
  );
}
