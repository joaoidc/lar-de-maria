import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { DashboardSidebar } from "../components/DashboardSidebar";

export function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />

      {/* Main Content */}
      <div className="md:ml-64 p-8 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Bem-vindo ao Painel Administrativo
            </h1>
            <p className="text-gray-600">
              Aqui você pode gerenciar o conteúdo do site Lar de Maria. Use o
              menu lateral para navegar entre as diferentes seções.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
