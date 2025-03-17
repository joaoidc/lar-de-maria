import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { DashboardSidebar } from "../../components/DashboardSidebar";
import { supabase } from "../../lib/supabase";
import { toast } from "react-hot-toast";

interface News {
  id: number;
  title: string;
  content: string;
  image_url?: string;
  created_at: string;
}

export function NewsManagement() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchNews();
  }, [user, navigate]);

  async function fetchNews() {
    try {
      const { data: newsData, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setNews(newsData || []);
    } catch (error) {
      console.error("Error fetching news:", error);
      toast.error("Erro ao carregar notícias");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Tem certeza que deseja excluir esta notícia?")) return;

    try {
      const { error } = await supabase.from("news").delete().eq("id", id);
      if (error) throw error;

      toast.success("Notícia excluída com sucesso!");
      fetchNews();
    } catch (error) {
      console.error("Error deleting news:", error);
      toast.error("Erro ao excluir notícia");
    }
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto ml-64">
        <div className="container mx-auto px-8 py-8 max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Gerenciar Notícias</h1>
            <button
              onClick={() => navigate("/dashboard/noticias/nova")}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Nova Notícia
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid gap-4 pb-8">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
                >
                  <div>
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <p className="text-gray-600 mt-1">
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        navigate(`/dashboard/noticias/${item.id}/editar`)
                      }
                      className="px-3 py-1 text-blue-500 hover:bg-blue-50 rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
