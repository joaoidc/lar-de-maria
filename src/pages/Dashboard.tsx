import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { DashboardSidebar } from "../components/DashboardSidebar";
import { supabase } from "../lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { formatBytes } from "../utils/format-bytes";

interface DashboardMetrics {
  totalNews: number;
  recentNews: number;
  totalImages: number;
  storageUsed: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  initial: { opacity: 1 },
  animate: {
    opacity: 1,
  },
  hover: {
    scale: 1.01,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  tap: { scale: 0.99 },
};

const pulseAnimation = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export function Dashboard() {
  const navigate = useNavigate();
  const { user, supabase } = useAuth();
  const [userName, setUserName] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalNews: 0,
    recentNews: 0,
    totalImages: 0,
    storageUsed: "Calculando...",
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    async function loadUserProfile() {
      if (!user) return;

      if (user.user_metadata?.full_name) {
        setUserName(user.user_metadata.full_name);
      }
    }

    loadUserProfile();
  }, [user]);

  useEffect(() => {
    fetchMetrics();
    fetchRecentActivity();
  }, []);

  async function fetchMetrics() {
    try {
      setMetrics((prev) => ({
        ...prev,
        storageUsed: "Calculando...",
      }));

      const { count: totalNews } = await supabase
        .from("news")
        .select("*", { count: "exact" });

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const { count: recentNews } = await supabase
        .from("news")
        .select("*", { count: "exact" })
        .gte("created_at", sevenDaysAgo.toISOString());

      const { count: totalImages } = await supabase
        .from("news")
        .select("*", { count: "exact" })
        .not("image_url", "is", null);

      const { data: files, error: storageError } = await supabase.storage
        .from("news")
        .list("news");

      let totalSize = 0;

      if (storageError) {
        throw new Error("Erro ao calcular armazenamento");
      }

      if (files && files.length > 0) {
        for (const file of files) {
          if (file.metadata) {
            totalSize += file.metadata.size || 0;
          }
        }
      }

      const sizeMB = (totalSize / (1024 * 1024)).toFixed(2);

      setMetrics({
        totalNews: totalNews || 0,
        recentNews: recentNews || 0,
        totalImages: totalImages || 0,
        storageUsed: totalSize === 0 ? "0 MB" : `${sizeMB} MB`,
      });
    } catch (error) {
      console.error("Error fetching metrics:", error);
      setMetrics((prev) => ({
        ...prev,
        storageUsed: "Erro ao calcular",
      }));
    }
  }

  async function fetchRecentActivity() {
    try {
      const { data } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      setRecentActivity(data || []);
    } catch (error) {
      console.error("Error fetching recent activity:", error);
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return null;
  }

  const getProgressColor = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    if (percentage < 30) return "bg-green-500";
    if (percentage < 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  const MetricCard = ({ title, value, icon, color, type }: any) => (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 relative"
    >
      <div className="flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <div className={`${color} rounded-md p-2`}>
            <div className="w-4 h-4">{icon}</div>
          </div>
          <h2 className="text-sm font-medium text-gray-600">{title}</h2>
        </div>

        <div className="flex items-end justify-between">
          <p className="text-2xl font-semibold text-gray-900 tabular-nums tracking-tight">
            {value}
            {type === "storage" && (
              <span className="text-sm font-normal text-gray-500 ml-1">MB</span>
            )}
          </p>

          {type === "storage" && (
            <div className="flex flex-col items-end">
              <div className="w-24 bg-gray-100 rounded-full h-1.5 mb-1">
                <motion.div
                  className={`${getProgressColor(
                    parseInt(value),
                    100
                  )} h-1.5 rounded-full`}
                  initial={{ width: "0%" }}
                  animate={{
                    width: `${Math.min((parseInt(value) / 100) * 100, 100)}%`,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <span className="text-xs text-gray-400">Usado</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <DashboardSidebar />

      <motion.div
        className="md:ml-64 p-4 sm:p-6 lg:p-8 pb-24 md:pb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Painel de Controle
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              {userName ? `Olá, ${userName}. Seja bem vindo!` : "Carregando..."}
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <MetricCard
              title="Total de Notícias"
              value={metrics.totalNews}
              icon={
                <svg
                  className="w-full h-full text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                  />
                </svg>
              }
              color="bg-blue-50"
            />

            <MetricCard
              title="Notícias Recentes"
              value={metrics.recentNews}
              icon={
                <svg
                  className="w-full h-full text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              }
              color="bg-green-50"
            />

            <MetricCard
              title="Total de Imagens"
              value={metrics.totalImages}
              icon={
                <svg
                  className="w-full h-full text-purple-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              }
              color="bg-purple-50"
            />

            <MetricCard
              title="Armazenamento"
              value={metrics.storageUsed.split(" ")[0]}
              icon={
                <svg
                  className="w-full h-full text-yellow-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                  />
                </svg>
              }
              color="bg-yellow-50"
              type="storage"
            />
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-xl overflow-hidden mb-8 sm:mb-12"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 border-b border-gray-200 bg-gradient-to-r from-[#10a3b4] to-[#10B5B5]">
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                Atividade Recente
              </h2>
            </div>
            <AnimatePresence>
              <div className="divide-y divide-gray-200">
                {loading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8 sm:p-12 text-center"
                  >
                    <Loader2 className="h-8 w-8 sm:h-12 sm:w-12 animate-spin text-[#10a3b4] mx-auto" />
                  </motion.div>
                ) : recentActivity.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8 sm:p-12 text-center text-gray-500 text-base sm:text-lg"
                  >
                    Nenhuma atividade recente
                  </motion.div>
                ) : (
                  <div className="max-h-[400px] sm:max-h-[500px] overflow-y-auto">
                    {recentActivity.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0">
                            {activity.image_url ? (
                              <img
                                src={activity.image_url}
                                alt=""
                                className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg object-cover shadow-sm"
                              />
                            ) : (
                              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-sm">
                                <svg
                                  className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm sm:text-base font-medium text-gray-900 truncate">
                              {activity.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-500">
                              {new Date(activity.created_at).toLocaleDateString(
                                "pt-BR",
                                {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="ml-2 sm:ml-4 text-[#10a3b4] hover:text-[#10B5B5] transition-colors text-sm sm:text-base whitespace-nowrap"
                            onClick={() =>
                              navigate(`/dashboard/noticias/${activity.id}`)
                            }
                          >
                            Ver detalhes →
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.button
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => navigate("/dashboard/noticias/nova")}
              className="flex items-center justify-center p-4 sm:p-6 bg-gradient-to-r from-[#10a3b4] to-[#10B5B5] rounded-xl shadow-xl hover:shadow-2xl transition-all text-white group h-full"
            >
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6 mr-2 transform group-hover:rotate-12 transition-transform"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-medium text-sm sm:text-base">
                Nova Notícia
              </span>
            </motion.button>

            <motion.button
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => navigate("/dashboard/noticias")}
              className="flex items-center justify-center p-4 sm:p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all group h-full"
            >
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6 text-[#10a3b4] mr-2 transform group-hover:rotate-12 transition-transform"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <span className="text-gray-700 font-medium text-sm sm:text-base">
                Gerenciar Notícias
              </span>
            </motion.button>

            <motion.button
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => navigate("/dashboard/configuracoes")}
              className="flex items-center justify-center p-4 sm:p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all group h-full"
            >
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6 text-[#10a3b4] mr-2 transform group-hover:rotate-12 transition-transform"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-gray-700 font-medium text-sm sm:text-base">
                Configurações
              </span>
            </motion.button>
          </motion.div>

          {/* Botão de Logout Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-8"
          >
            <button
              onClick={() => supabase.auth.signOut()}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
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
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              Sair do Painel
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
