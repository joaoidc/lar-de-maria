import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { DashboardSidebar } from "../components/DashboardSidebar";
import { supabase } from "../lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  Search,
  Filter,
  ArrowUpDown,
  Calendar,
  LayoutGrid,
  List,
  Pencil,
  Trash2,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-hot-toast";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
  status: "published" | "draft";
}

interface FilterOptions {
  search: string;
  orderBy: string;
  orderDirection: "asc" | "desc";
  status: "all" | "published" | "draft";
  dateRange: "all" | "today" | "week" | "month";
}

export function News() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [publishLoading, setPublishLoading] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    orderBy: "created_at",
    orderDirection: "desc",
    status: "all",
    dateRange: "all",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    show: boolean;
    newsId: string | null;
  }>({
    show: false,
    newsId: null,
  });
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchNews();
  }, [user, navigate, filters]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      let query = supabase.from("news").select("*");

      // Aplicar filtro de pesquisa
      if (filters.search) {
        query = query.or(
          `title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`
        );
      }

      // Aplicar filtro de status
      if (filters.status !== "all") {
        query = query.eq("status", filters.status);
      }

      // Aplicar filtro de data
      if (filters.dateRange !== "all") {
        const now = new Date();
        let startDate = new Date();

        switch (filters.dateRange) {
          case "today":
            startDate.setHours(0, 0, 0, 0);
            break;
          case "week":
            startDate.setDate(now.getDate() - 7);
            break;
          case "month":
            startDate.setMonth(now.getMonth() - 1);
            break;
        }

        query = query.gte("created_at", startDate.toISOString());
      }

      // Aplicar ordenação
      query = query.order(filters.orderBy, {
        ascending: filters.orderDirection === "asc",
      });

      const { data, error } = await query;

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error("Erro ao buscar notícias:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (newsId: string) => {
    try {
      setPublishLoading(newsId);
      const { error } = await supabase
        .from("news")
        .update({ status: "published", updated_at: new Date().toISOString() })
        .eq("id", newsId);

      if (error) throw error;

      // Atualiza a lista localmente
      setNews((prevNews) =>
        prevNews.map((item) =>
          item.id === newsId ? { ...item, status: "published" } : item
        )
      );

      toast.success("Notícia publicada com sucesso!");
    } catch (error) {
      console.error("Erro ao publicar notícia:", error);
      toast.error("Erro ao publicar notícia");
    } finally {
      setPublishLoading(null);
    }
  };

  async function handleDelete(id: string) {
    try {
      // Primeiro, vamos buscar a notícia para ver se tem imagem
      const { data: newsItem } = await supabase
        .from("news")
        .select("image_url")
        .eq("id", id)
        .single();

      // Se tiver imagem, vamos excluir do storage
      if (newsItem?.image_url) {
        const imagePath = newsItem.image_url.split("/").pop();
        if (imagePath) {
          const { error: storageError } = await supabase.storage
            .from("news")
            .remove([`news/${imagePath}`]);

          if (storageError) {
            console.error("Error deleting image:", storageError);
          }
        }
      }

      // Agora vamos excluir a notícia
      const { error } = await supabase.from("news").delete().eq("id", id);

      if (error) throw error;

      toast.success("Notícia excluída com sucesso!");
      fetchNews(); // Atualiza a lista
    } catch (error) {
      console.error("Error deleting news:", error);
      toast.error("Erro ao excluir a notícia");
    } finally {
      setDeleteModal({ show: false, newsId: null });
    }
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Helmet>
        <title>Gerenciar Notícias | Lar de Maria</title>
      </Helmet>

      <DashboardSidebar />

      <main className="md:ml-64 min-h-screen pb-28">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6">
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
                Gerenciar Notícias
              </h1>
              <button
                onClick={() => navigate("/dashboard/noticias/nova")}
                className="w-full sm:w-auto bg-[#10a3b4] text-white px-4 py-3 sm:py-2 rounded-lg hover:bg-[#0d8997] transition-colors flex items-center justify-center gap-2"
              >
                <span className="text-lg">+</span> Nova Notícia
              </button>
            </div>

            {/* Barra de Pesquisa e Filtros */}
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-4 sm:mb-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                {/* Barra de Pesquisa */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Pesquisar notícias..."
                    value={filters.search}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        search: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-4 py-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10a3b4] focus:border-transparent text-base"
                  />
                </div>

                {/* Botões de Visualização e Filtros */}
                <div className="flex gap-2 justify-between sm:justify-start">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-3 sm:p-2 border rounded-lg transition-colors ${
                        viewMode === "list"
                          ? "bg-[#10a3b4] text-white border-[#10a3b4]"
                          : "border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                      title="Visualização em lista"
                    >
                      <List className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-3 sm:p-2 border rounded-lg transition-colors ${
                        viewMode === "grid"
                          ? "bg-[#10a3b4] text-white border-[#10a3b4]"
                          : "border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                      title="Visualização em grade"
                    >
                      <LayoutGrid className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Botão de Filtros */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-[100px]"
                  >
                    <Filter className="h-5 w-5 text-gray-500" />
                    <span>Filtros</span>
                  </button>
                </div>
              </div>

              {/* Painel de Filtros Expandido */}
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 pt-4 border-t border-gray-200"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Ordenar por */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ordenar por
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={filters.orderBy}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              orderBy: e.target.value as "created_at" | "title",
                            }))
                          }
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#10a3b4] focus:border-transparent"
                        >
                          <option value="created_at">Data</option>
                          <option value="title">Título</option>
                        </select>
                        <button
                          onClick={() =>
                            setFilters((prev) => ({
                              ...prev,
                              orderDirection:
                                prev.orderDirection === "asc" ? "desc" : "asc",
                            }))
                          }
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          <ArrowUpDown className="h-5 w-5 text-gray-500" />
                        </button>
                      </div>
                    </div>

                    {/* Status */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        value={filters.status}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            status: e.target.value as
                              | "all"
                              | "published"
                              | "draft",
                          }))
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#10a3b4] focus:border-transparent"
                      >
                        <option value="all">Todos</option>
                        <option value="published">Publicadas</option>
                        <option value="draft">Rascunhos</option>
                      </select>
                    </div>

                    {/* Período */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Período
                      </label>
                      <select
                        value={filters.dateRange}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            dateRange: e.target.value as
                              | "all"
                              | "today"
                              | "week"
                              | "month",
                          }))
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#10a3b4] focus:border-transparent"
                      >
                        <option value="all">Todo período</option>
                        <option value="today">Hoje</option>
                        <option value="week">Última semana</option>
                        <option value="month">Último mês</option>
                      </select>
                    </div>

                    {/* Limpar Filtros */}
                    <div className="flex items-end">
                      <button
                        onClick={() =>
                          setFilters({
                            search: "",
                            orderBy: "created_at",
                            orderDirection: "desc",
                            status: "all",
                            dateRange: "all",
                          })
                        }
                        className="w-full px-4 py-2 text-[#10a3b4] border border-[#10a3b4] rounded-lg hover:bg-[#10a3b4] hover:text-white transition-colors"
                      >
                        Limpar Filtros
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Lista de Notícias */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-[#10a3b4]" />
              </div>
            ) : news.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500 text-lg">
                  Nenhuma notícia encontrada
                </p>
              </div>
            ) : viewMode === "list" ? (
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {news.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-lg shadow-sm p-3 sm:p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt=""
                          className="h-20 w-20 sm:h-16 sm:w-16 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="h-20 w-20 sm:h-16 sm:w-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Calendar className="h-8 w-8 sm:h-6 sm:w-6 text-gray-400" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-500">
                            {new Date(item.created_at).toLocaleDateString(
                              "pt-BR"
                            )}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.status === "published"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {item.status === "published"
                              ? "Publicada"
                              : "Rascunho"}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-4 sm:gap-2">
                        <button
                          onClick={() =>
                            navigate(`/dashboard/noticias/${item.id}`)
                          }
                          className="p-2 text-[#10a3b4] hover:text-[#0d8997] transition-colors"
                          aria-label="Editar"
                        >
                          <Pencil className="h-5 w-5 sm:h-4 sm:w-4" />
                        </button>
                        {item.status === "draft" && (
                          <button
                            onClick={() => handlePublish(item.id)}
                            disabled={publishLoading === item.id}
                            className="group relative inline-flex items-center gap-1 px-3 py-1.5 text-sm text-white bg-[#10a3b4] hover:bg-[#0d8997] rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {publishLoading === item.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={2}
                                  stroke="currentColor"
                                  className="h-4 w-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                <span className="hidden sm:inline">Publicar</span>
                              </>
                            )}
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              Publicar notícia
                            </span>
                          </button>
                        )}
                        <button
                          onClick={() =>
                            setDeleteModal({ show: true, newsId: item.id })
                          }
                          className="p-2 text-red-500 hover:text-red-600 transition-colors"
                          aria-label="Excluir"
                        >
                          <Trash2 className="h-5 w-5 sm:h-4 sm:w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {news.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                  >
                    {item.image_url ? (
                      <div className="h-48 w-full">
                        <img
                          src={item.image_url}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-48 w-full bg-gray-100 flex items-center justify-center">
                        <Calendar className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    <div className="p-3 sm:p-4 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-gray-500">
                          {new Date(item.created_at).toLocaleDateString(
                            "pt-BR"
                          )}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === "published"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {item.status === "published"
                            ? "Publicada"
                            : "Rascunho"}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <div className="mt-auto pt-3 sm:pt-4 border-t border-gray-100 flex items-center gap-2">
                        <button
                          onClick={() =>
                            navigate(`/dashboard/noticias/${item.id}`)
                          }
                          className="flex-1 text-[#10a3b4] hover:text-[#0d8997] transition-colors inline-flex items-center justify-center gap-1 py-2"
                        >
                          <Pencil className="h-5 w-5 sm:h-4 sm:w-4" />
                          <span className="hidden sm:inline">Editar</span>
                        </button>
                        {item.status === "draft" && (
                          <button
                            onClick={() => handlePublish(item.id)}
                            disabled={publishLoading === item.id}
                            className="group relative flex-1 text-white bg-[#10a3b4] hover:bg-[#0d8997] transition-colors inline-flex items-center justify-center gap-1 py-2 px-3 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {publishLoading === item.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={2}
                                  stroke="currentColor"
                                  className="w-4 h-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                <span>Publicar</span>
                              </>
                            )}
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              Publicar notícia
                            </span>
                          </button>
                        )}
                        <div className="w-px h-6 bg-gray-200" />
                        <button
                          onClick={() =>
                            setDeleteModal({ show: true, newsId: item.id })
                          }
                          className="flex-1 text-red-500 hover:text-red-600 transition-colors inline-flex items-center justify-center gap-1 py-2"
                        >
                          <Trash2 className="h-5 w-5 sm:h-4 sm:w-4" />
                          <span className="hidden sm:inline">Excluir</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal de Confirmação de Exclusão */}
      <AnimatePresence>
        {deleteModal.show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full mx-auto shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
                  <svg
                    className="h-8 w-8 text-red-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Confirmar Exclusão
                </h3>
                <p className="text-gray-500 mb-8">
                  Tem certeza que deseja excluir esta notícia? Esta ação não
                  pode ser desfeita.
                </p>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteModal({ show: false, newsId: null })}
                  className="px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() =>
                    deleteModal.newsId && handleDelete(deleteModal.newsId)
                  }
                  className="px-4 py-2.5 text-white bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                  Excluir
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
