import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import Donations from "./pages/Donations";
import { ThemeProvider } from "./components/theme-provider";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="light">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doacoes" element={<Donations />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
