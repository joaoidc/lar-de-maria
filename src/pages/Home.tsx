import { Helmet } from "react-helmet-async";
import { Banner } from "../components/banner";
import { StatsSection } from "../components/stats-section";
import { AboutSection } from "../components/about-section";
import { NewsSection } from "../components/news-section";

export function Home() {
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
      <StatsSection />
      <AboutSection />
      <NewsSection />
      {/* Outros componentes da home */}
    </main>
  );
}
