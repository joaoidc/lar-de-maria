import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { DashboardSidebar } from "../components/DashboardSidebar";
import { supabase } from "../lib/supabase";

interface News {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_url?: string;
}

export function News() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    try {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error("Error fetching news:", error);
      setError("Erro ao carregar as notícias. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />

      {/* Main Content */}
      <div className="md:ml-64 p-8 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              Gerenciar Notícias
            </h1>
            <button
              onClick={() => navigate("/dashboard/noticias/nova")}
              className="bg-[#10a3b4] text-white px-4 py-2 rounded-lg hover:bg-[#0d8997] transition-colors"
            >
              Nova Notícia
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#10a3b4]"></div>
            </div>
          ) : news.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-600">Nenhuma notícia encontrada.</p>
              <button
                onClick={() => navigate("/dashboard/noticias/nova")}
                className="mt-4 text-[#10a3b4] hover:text-[#0d8997]"
              >
                Criar primeira notícia
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow"
                >
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {item.content}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {new Date(item.created_at).toLocaleDateString("pt-BR")}
                      </span>
                      <button
                        onClick={() =>
                          navigate(`/dashboard/noticias/${item.id}`)
                        }
                        className="text-[#10a3b4] hover:text-[#0d8997] text-sm font-medium"
                      >
                        Editar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
