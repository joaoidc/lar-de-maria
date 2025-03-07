import { Helmet } from "react-helmet-async";
import { Banner } from "../components/banner";
import { StatsSection } from "../components/stats-section";
import { AboutSection } from "../components/about-section";
import { MissionSection } from "../components/mission-section";
import { PromotionalBanner } from "../components/promotional-banner";
import { PartnersSection } from "../components/partners-section";
import { GallerySection } from "../components/gallery-section";

export default function HomePage() {
  return (
    <main>
      <Helmet>
        <title>Lar de Maria - Centro Espírita</title>
        <meta
          name="description"
          content="Centro Espírita Lar de Maria - Caridade e amor ao próximo"
        />
      </Helmet>
      <Banner />
      <GallerySection />
      <StatsSection />
      <AboutSection />
      <MissionSection />
      <PromotionalBanner />
      <PartnersSection />
      {/* Outros componentes da home */}
    </main>
  );
}
