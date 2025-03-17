import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Helmet } from "react-helmet-async";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Helmet>
        <title>Dashboard - Lar de Maria</title>
      </Helmet>

      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-800">
                Painel Administrativo
              </h1>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 mr-4">{user?.email}</span>
              <button
                onClick={handleSignOut}
                className="bg-[#10a3b4] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#0d8997]"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
            <h2 className="text-2xl font-bold mb-4">Bem-vindo ao Dashboard</h2>
            <p className="text-gray-600">
              Aqui você poderá gerenciar as notícias e conteúdo do site.
            </p>
            {/* Adicionar mais funcionalidades aqui posteriormente */}
          </div>
        </div>
      </main>
    </div>
  );
}
