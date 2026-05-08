import CtaSection from "./home/CtaSection";
import HeroSection from "./home/HeroSection";
import OurServicesSection from "./home/our-services/OurServicesSection";
import StatsSection from "./home/stats/StatsSection";
import SuccessStoriesSection from "./home/success-stories/SuccessStoriesSection";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <OurServicesSection />
        <StatsSection />
        <SuccessStoriesSection />
        <CtaSection />
      </main>
    </>
  );
}
