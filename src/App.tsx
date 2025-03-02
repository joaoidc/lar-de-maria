import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { MaintenancePage } from "./components/maintenance-page";
import { HomePage } from "./pages/Home";
import { ThemeProvider } from "./components/theme-provider";
import { HelmetProvider } from "react-helmet-async";
import { Footer } from "./components/footer";
import GaleriaPage from "./pages/galeria";
import { QuemSomosPage } from "./pages/quem-somos";
import { ProjetosSociaisPage } from "./pages/projetos-sociais";
import { AtividadesDoutrinariasPage } from "./pages/atividades-doutrinarias";
import { ContatoPage } from "./pages/contato";
import { ScrollToTop } from "./components/scroll-to-top";
import LoadingSpinner from "./components/LoadingSpinner";
import DoacoesPage from "./pages/DoacoesPage";
import DoarAgora from "./pages/doaragora";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Iniciando o carregamento...");
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="light">
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/quem-somos" element={<QuemSomosPage />} />
                <Route
                  path="/projetos-sociais"
                  element={<ProjetosSociaisPage />}
                />
                <Route
                  path="/atividades-doutrinarias"
                  element={<AtividadesDoutrinariasPage />}
                />
                <Route path="/contato" element={<ContatoPage />} />
                <Route path="/doacoes" element={<DoacoesPage />} />
                <Route path="/galeria" element={<GaleriaPage />} />
                <Route path="/doaragora" element={<DoarAgora />} />
                <Route path="*" element={<MaintenancePage />} />
              </Routes>
            </div>
            <Footer />
            <ScrollToTop />
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}
