import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { PublicLayout } from "../components/PublicLayout";
import { Helmet } from "react-helmet-async";

interface News {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_url?: string;
  status: "published" | "draft";
}

const ITEMS_PER_PAGE = 9;

export function AllNews() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchNews();
  }, [currentPage]);

  async function fetchNews() {
    try {
      // Fetch total count
      const { count } = await supabase
        .from("news")
        .select("*", { count: "exact", head: true })
        .eq("status", "published");

      setTotalPages(Math.ceil((count || 0) / ITEMS_PER_PAGE));

      // Fetch paginated data
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .range(
          (currentPage - 1) * ITEMS_PER_PAGE,
          currentPage * ITEMS_PER_PAGE - 1
        );

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PublicLayout>
      <Helmet>
        <title>Notícias | Lar de Maria</title>
        <meta
          name="description"
          content="Fique por dentro das últimas notícias e acontecimentos do Lar de Maria."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white to-[#e6f7f9]">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-playfair text-[#10a3b4] mb-6">
              Notícias
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Acompanhe as últimas notícias, eventos e acontecimentos do Lar de
              Maria
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#10a3b4]"></div>
            </div>
          ) : (
            <>
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
                        {item.content}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {new Date(item.created_at).toLocaleDateString(
                            "pt-BR"
                          )}
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    Anterior
                  </button>
                  <span className="px-4 py-2 text-gray-600">
                    Página {currentPage} de {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    Próxima
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
