import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

interface News {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_url?: string;
  status: "published" | "draft";
}

export function LatestNews() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("🔄 LatestNews montado - iniciando fetch...");
    fetchLatestNews();
  }, []);

  async function fetchLatestNews() {
    try {
      console.log("📡 Iniciando busca de notícias...");
      console.log(
        "🌐 URL do Supabase:",
        import.meta.env.VITE_SUPABASE_URL?.substring(0, 20) + "..."
      );
      console.log(
        "🔑 Chave anônima presente:",
        !!import.meta.env.VITE_SUPABASE_ANON_KEY
      );

      console.log("🔍 Preparando query...");
      const query = supabase
        .from("news")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(3);

      console.log("📤 Enviando query para Supabase...");
      const { data, error, status, statusText } = await query;

      console.log("📥 Resposta do Supabase:", {
        status,
        statusText,
        hasData: !!data,
        dataLength: data?.length,
        firstItemTitle: data?.[0]?.title,
        error: error
          ? {
              message: error.message,
              code: error.code,
            }
          : null,
      });

      if (error) {
        console.error("❌ Erro detalhado:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        });
        setError(`Erro: ${error.message}`);
        return;
      }

      if (!data || data.length === 0) {
        console.log("ℹ️ Nenhuma notícia encontrada");
        setNews([]);
        return;
      }

      console.log("✅ Notícias recebidas:", data);
      setNews(data);
    } catch (error) {
      console.error("💥 Erro ao buscar últimas notícias:", error);
      setError(
        error instanceof Error ? error.message : "Erro ao carregar notícias"
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#10a3b4]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Erro ao carregar notícias: {error}</p>
        <button
          onClick={() => {
            setError(null);
            setLoading(true);
            fetchLatestNews();
          }}
          className="mt-4 px-4 py-2 bg-[#10a3b4] text-white rounded hover:bg-[#0d8997]"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhuma notícia disponível no momento.</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair text-[#10a3b4] mb-4">
            Últimas notícias
          </h2>
          <p className="text-gray-600">Fique por dentro das últimas notícias</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {news.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="font-semibold text-xl text-gray-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {item.content.length > 150
                    ? `${item.content.substring(0, 150)}...`
                    : item.content}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(item.created_at).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <Link
                    to={`/noticias/${item.id}`}
                    className="text-[#10a3b4] hover:text-[#0d8997] font-medium inline-flex items-center group"
                  >
                    Conheça mais
                    <svg
                      className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/noticias"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#10a3b4] hover:bg-[#0d8997] transition-colors"
          >
            Mais notícias
          </Link>
        </div>
      </div>
    </section>
  );
}
