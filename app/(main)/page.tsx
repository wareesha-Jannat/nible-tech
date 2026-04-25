import CtaSection from "./home/CtaSection";
import HeroSection from "./home/HeroSection";
import OurServicesSection from "./home/our-services/OurServicesSection";
import StatsSection from "./home/stats/StatsSection";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <OurServicesSection />
        <StatsSection />
        <CtaSection />
      </main>
    </>
  );
}
