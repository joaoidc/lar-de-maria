import { NavBar } from "@/components/nav-bar";
import { Banner } from "@/components/banner";
import { StatsSection } from "@/components/stats-section";

export default function Home() {
  return (
    <main className="pt-20">
      <NavBar />
      <Banner />
      <StatsSection />
    </main>
  );
}
