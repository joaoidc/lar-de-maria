import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const IMAGES_PER_PAGE = 15; // Mostra 15 imagens por vez (3 linhas de 5)
const images = Array.from({ length: 51 }, (_, i) => ({
  url: `/images/imageslider (${i + 1}).JPG`,
  fallbackUrl: `/images/imageslider (${i + 1}).jpg`,
  title: `Titulo ${i + 1}`,
  description: "Momentos especiais de nossas ações sociais",
}));

export function GaleriaPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);

  const currentImages = images.slice(
    (currentPage - 1) * IMAGES_PER_PAGE,
    currentPage * IMAGES_PER_PAGE
  );

  // Simula carregamento ao mudar de página
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#e6f7f9] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-playfair text-[#10a3b4] mb-4">
            Galeria de Fotos
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Momentos especiais que marcam nossa história de amor e solidariedade
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center min-h-[400px]"
            >
              <div className="relative w-20 h-20">
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="w-20 h-20 border-8 border-[#10a3b4]/20 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-20 h-20 border-8 border-[#10a3b4] border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg
                    className="w-8 h-8 text-[#10a3b4] animate-pulse"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            >
              {currentImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative aspect-square rounded-xl overflow-hidden shadow-lg"
                >
                  <img
                    loading="lazy"
                    src={image.url}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== image.fallbackUrl) {
                        target.src = image.fallbackUrl;
                      }
                    }}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-lg font-semibold truncate">
                        {image.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Paginação */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || isLoading}
            className="px-4 py-2 bg-[#10a3b4] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#0d8997] transition-colors"
          >
            Anterior
          </button>

          <span className="text-gray-600">
            Página {currentPage} de {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages || isLoading}
            className="px-4 py-2 bg-[#10a3b4] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#0d8997] transition-colors"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}

export default GaleriaPage;
