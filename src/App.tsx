import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import { Navbar } from "./components/Navbar";
import { ThemeProvider } from "./components/theme-provider";
import { HelmetProvider } from "react-helmet-async";
import { Footer } from "./components/footer";
import { ScrollToTop } from "./components/scroll-to-top";
import LoadingSpinner from "./components/LoadingSpinner";
import DoacoesPage from "./pages/DoacoesPage";
import DoarAgora from "./pages/doaragora";
import { AuthProvider } from "./contexts/AuthContext";
import HomePage from "./pages/Home";
import { LoginPage } from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import { PrivateRoute } from "./components/PrivateRoute";
import { PublicLayout } from "./components/PublicLayout";

// Lazy load components
const QuemSomosPage = lazy(() => import("./pages/quem-somos"));
const ProjetosSociaisPage = lazy(() => import("./pages/projetos-sociais"));
const AtividadesDoutrinariasPage = lazy(
  () => import("./pages/atividades-doutrinarias")
);
const ContatoPage = lazy(() => import("./pages/contato"));
const GaleriaPage = lazy(() => import("./pages/galeria"));
const MaintenancePage = lazy(() => import("./components/maintenance-page"));

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

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
      <AuthProvider>
        <ThemeProvider defaultTheme="light">
          <Router>
            <Routes>
              {/* Rotas públicas sem navbar */}
              <Route
                path="/login"
                element={
                  <PublicLayout>
                    <LoginPage />
                  </PublicLayout>
                }
              />
              <Route
                path="/reset-password"
                element={
                  <PublicLayout>
                    <ResetPassword />
                  </PublicLayout>
                }
              />

              {/* Rotas com navbar */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
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
              </Route>
            </Routes>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}
