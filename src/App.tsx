import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import HomePage from "./pages/Home";
import { LoginPage } from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import { Dashboard } from "@/components/Dashboard";
import { News } from "./pages/News";
import { NewsForm } from "./pages/NewsForm";
import { Settings } from "./pages/Settings";
import { PrivateRoute } from "./components/PrivateRoute";
import { QuemSomosPage } from "./pages/quem-somos";
import ProjetosSociais from "./pages/projetos-sociais";
import AtividadesDoutrinarias from "./pages/atividades-doutrinarias";
import Galeria from "./pages/galeria";
import Contato from "./pages/contato";
import Doacoes from "./pages/doacoes";
import { DoarAgora } from "./pages/doaragora";
import { AllNews } from "./pages/AllNews";
import { NewsDetail } from "./pages/NewsDetail";
import { AuthCallback } from "@/routes/auth/callback";

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/quem-somos" element={<QuemSomosPage />} />
            <Route path="/projetos-sociais" element={<ProjetosSociais />} />
            <Route
              path="/atividades-doutrinarias"
              element={<AtividadesDoutrinarias />}
            />
            <Route path="/galeria" element={<Galeria />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/doacoes" element={<Doacoes />} />
            <Route path="/doaragora" element={<DoarAgora />} />
            <Route path="/noticias" element={<AllNews />} />
            <Route path="/noticias/:id" element={<NewsDetail />} />

            {/* Rotas de Autenticação */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/auth/callback" element={<AuthCallback />} />

            {/* Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/noticias"
              element={
                <PrivateRoute>
                  <News />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/noticias/nova"
              element={
                <PrivateRoute>
                  <NewsForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/noticias/:id"
              element={
                <PrivateRoute>
                  <NewsForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/configuracoes"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
