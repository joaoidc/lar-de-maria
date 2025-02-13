import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { MaintenancePage } from "./components/maintenance-page";
import { HomePage } from "./pages/Home";
import { ThemeProvider } from "./components/theme-provider";
import { HelmetProvider } from "react-helmet-async";
import { Footer } from "./components/footer";
import GaleriaPage from "./pages/galeria";

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="light">
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/quem-somos" element={<MaintenancePage />} />
                <Route path="/projetos-sociais" element={<MaintenancePage />} />
                <Route
                  path="/atividades-doutrianarias"
                  element={<MaintenancePage />}
                />
                <Route path="/contato" element={<MaintenancePage />} />
                <Route path="/doacoes" element={<MaintenancePage />} />
                <Route path="/galeria" element={<GaleriaPage />} />
                <Route path="*" element={<MaintenancePage />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}
