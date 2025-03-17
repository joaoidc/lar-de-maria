import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { PublicLayout } from "../components/PublicLayout";

const IMAGES_PER_PAGE = 15; // Mostra 15 imagens por vez para evitar travamentos
const TOTAL_IMAGES = 51; // Quantidade total de imagens

// Criando lista de imagens com os novos nomes
const images = Array.from({ length: TOTAL_IMAGES }, (_, i) => ({
  url: `/images/img-${i + 1}.JPG`, // Caminho atualizado
  fallbackUrl: `/images/img-${i + 1}.jpg`, // Fallback para minúsculas
  description: "Momentos especiais de nossas ações sociais",
}));

export function GaleriaPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);

  const currentImages = images.slice(
    (currentPage - 1) * IMAGES_PER_PAGE,
    currentPage * IMAGES_PER_PAGE
  );

  // Função para navegar entre as imagens no modal
  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImageIndex === null) return;

    const newIndex =
      direction === "next"
        ? (selectedImageIndex + 1) % images.length
        : (selectedImageIndex - 1 + images.length) % images.length;

    setSelectedImageIndex(newIndex);
  };

  // Adiciona suporte para teclas de seta
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;

      if (e.key === "ArrowRight") {
        navigateImage("next");
      } else if (e.key === "ArrowLeft") {
        navigateImage("prev");
      } else if (e.key === "Escape") {
        setSelectedImageIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex]);

  // Efeito para simular carregamento suave ao mudar de página
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600); // Reduzi o tempo para 600ms para transição mais rápida
    return () => clearTimeout(timer);
  }, [currentPage]);

  return (
    <PublicLayout>
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
              Momentos especiais que marcam nossa história de amor e
              solidariedade
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
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#10a3b4]"></div>
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
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative aspect-square rounded-xl overflow-hidden shadow-lg cursor-pointer"
                    onClick={() => {
                      const globalIndex =
                        (currentPage - 1) * IMAGES_PER_PAGE + index;
                      setSelectedImageIndex(globalIndex);
                    }}
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
                      alt="Momento especial de nossas ações sociais"
                      className="w-full h-full object-cover transition-opacity duration-500 opacity-0"
                      onLoad={(e) =>
                        e.currentTarget.classList.add("opacity-100")
                      }
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white hidden">
                        <p className="text-sm opacity-90">
                          {image.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modal para imagem em tamanho original */}
          <AnimatePresence>
            {selectedImageIndex !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImageIndex(null)}
                className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ type: "spring", damping: 20 }}
                  className="relative max-w-[90vw] max-h-[90vh]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={images[selectedImageIndex].url}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (
                        target.src !== images[selectedImageIndex].fallbackUrl
                      ) {
                        target.src = images[selectedImageIndex].fallbackUrl;
                      }
                    }}
                    alt="Visualização ampliada"
                    className="max-w-full max-h-[90vh] object-contain"
                  />

                  {/* Botões de navegação */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImage("prev");
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                    aria-label="Imagem anterior"
                  >
                    <svg
                      className="w-6 h-6 text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImage("next");
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                    aria-label="Próxima imagem"
                  >
                    <svg
                      className="w-6 h-6 text-gray-800"
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
                  </button>

                  {/* Botão de fechar */}
                  <button
                    onClick={() => setSelectedImageIndex(null)}
                    className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  {/* Contador de imagens */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                    {selectedImageIndex + 1} / {images.length}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Paginação */}
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || isLoading}
              className="px-4 py-2 rounded-lg bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
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
              className="px-4 py-2 rounded-lg bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Próxima
            </button>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

export default GaleriaPage;
