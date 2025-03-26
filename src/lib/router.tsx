import { createBrowserRouter } from "react-router-dom";
import type { ExtendedFutureConfig } from "../types/router";
import HomePage from "../pages/Home";
import { LoginPage } from "../pages/Login";
import ResetPassword from "../pages/ResetPassword";
import { Dashboard } from "../pages/Dashboard";
import { News } from "../pages/News";
import { NewsForm } from "../pages/NewsForm";
import { Settings } from "../pages/Settings";
import { PrivateRoute } from "../components/PrivateRoute";
import { QuemSomosPage } from "../pages/quem-somos";
import ProjetosSociais from "../pages/projetos-sociais";
import AtividadesDoutrinarias from "../pages/atividades-doutrinarias";
import Galeria from "../pages/galeria";
import Contato from "../pages/contato";
import Doacoes from "../pages/doacoes";
import { DoarAgora } from "../pages/doaragora";
import { AllNews } from "../pages/AllNews";
import { NewsDetail } from "../pages/NewsDetail";
import Transparencia from "../pages/Transparencia";
import DocumentsAdmin from "../pages/DocumentsAdmin";
import RelatoriosSociais from "@/pages/dashboard/RelatoriosSociais";

// Configuração que funciona tanto na v6 quanto na v7
const routerConfig = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  } as ExtendedFutureConfig,
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/transparencia",
      element: <Transparencia />,
    },
    {
      path: "/quem-somos",
      element: <QuemSomosPage />,
    },
    {
      path: "/projetos-sociais",
      element: <ProjetosSociais />,
    },
    {
      path: "/atividades-doutrinarias",
      element: <AtividadesDoutrinarias />,
    },
    {
      path: "/galeria",
      element: <Galeria />,
    },
    {
      path: "/contato",
      element: <Contato />,
    },
    {
      path: "/doacoes",
      element: <Doacoes />,
    },
    {
      path: "/doaragora",
      element: <DoarAgora />,
    },
    {
      path: "/noticias",
      element: <AllNews />,
    },
    {
      path: "/noticias/:id",
      element: <NewsDetail />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
    {
      path: "/dashboard",
      element: (
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      ),
    },
    {
      path: "/dashboard/noticias",
      element: (
        <PrivateRoute>
          <News />
        </PrivateRoute>
      ),
    },
    {
      path: "/dashboard/noticias/nova",
      element: (
        <PrivateRoute>
          <NewsForm />
        </PrivateRoute>
      ),
    },
    {
      path: "/dashboard/noticias/:id",
      element: (
        <PrivateRoute>
          <NewsForm />
        </PrivateRoute>
      ),
    },
    {
      path: "/dashboard/configuracoes",
      element: (
        <PrivateRoute>
          <Settings />
        </PrivateRoute>
      ),
    },
    {
      path: "/dashboard/documentos",
      element: (
        <PrivateRoute>
          <DocumentsAdmin />
        </PrivateRoute>
      ),
    },
    {
      path: "/dashboard/relatorios-sociais",
      element: (
        <PrivateRoute>
          <RelatoriosSociais />
        </PrivateRoute>
      ),
    },
  ],
  routerConfig
);

export default router;
