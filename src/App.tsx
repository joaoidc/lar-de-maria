import { RouterProvider } from "react-router-dom";
import type { ExtendedFutureConfig } from "./types/router";
import { AuthProvider } from "./contexts/AuthContext";
import { HelmetProvider } from "react-helmet-async";
import router from "./lib/router";

// Configuração que funciona tanto na v6 quanto na v7
const routerConfig = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  } as ExtendedFutureConfig,
};

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router} {...routerConfig} />
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
