import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

interface ImageConfigModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imagePreview: string | null;
  currentImageFit: "cover" | "contain";
  onConfirm: (imageFit: "cover" | "contain") => void;
  onCancel: () => void;
}

export function ImageConfigModal({
  open,
  onOpenChange,
  imagePreview,
  currentImageFit,
  onConfirm,
  onCancel,
}: ImageConfigModalProps) {
  const [tempImageFit, setTempImageFit] = useState<"cover" | "contain">(currentImageFit);

  const handleConfirm = () => {
    onConfirm(tempImageFit);
  };

  const handleCancel = () => {
    setTempImageFit(currentImageFit);
    onCancel();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>Configurar Exibição da Imagem</DialogTitle>
          <DialogDescription>
            Escolha como a imagem será exibida na página individual da notícia
          </DialogDescription>
        </DialogHeader>

        {imagePreview && (
          <div className="space-y-6 py-4">
            {/* Pré-visualização da página */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-[#10a3b4]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                Pré-visualização na página da notícia
              </h3>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tempImageFit}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`w-full h-64 ${
                      tempImageFit === "contain"
                        ? "bg-gray-50 flex items-center justify-center"
                        : "bg-gray-100"
                    }`}
                  >
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className={`w-full h-full ${
                        tempImageFit === "contain"
                          ? "object-contain"
                          : "object-cover"
                      }`}
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>

            {/* Opções de exibição */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Opção Cover */}
              <motion.button
                type="button"
                onClick={() => setTempImageFit("cover")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative group rounded-lg border-2 transition-all duration-200 overflow-hidden",
                  tempImageFit === "cover"
                    ? "border-[#10a3b4] shadow-lg ring-2 ring-[#10a3b4] ring-opacity-50"
                    : "border-gray-300 hover:border-[#10a3b4] hover:shadow-md"
                )}
              >
                <div className="bg-white p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                          tempImageFit === "cover"
                            ? "border-[#10a3b4] bg-[#10a3b4]"
                            : "border-gray-400"
                        )}
                      >
                        {tempImageFit === "cover" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span
                        className={cn(
                          "text-sm font-semibold",
                          tempImageFit === "cover"
                            ? "text-[#10a3b4]"
                            : "text-gray-700"
                        )}
                      >
                        Cortar imagem
                      </span>
                    </div>
                    {tempImageFit === "cover" && (
                      <svg
                        className="w-5 h-5 text-[#10a3b4]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="relative w-full h-40 bg-gray-100 rounded overflow-hidden border border-gray-200">
                    <img
                      src={imagePreview}
                      alt="Preview cover"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-3 text-left">
                    A imagem preenche todo o espaço, podendo cortar partes
                  </p>
                </div>
              </motion.button>

              {/* Opção Contain */}
              <motion.button
                type="button"
                onClick={() => setTempImageFit("contain")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative group rounded-lg border-2 transition-all duration-200 overflow-hidden",
                  tempImageFit === "contain"
                    ? "border-[#10a3b4] shadow-lg ring-2 ring-[#10a3b4] ring-opacity-50"
                    : "border-gray-300 hover:border-[#10a3b4] hover:shadow-md"
                )}
              >
                <div className="bg-white p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                          tempImageFit === "contain"
                            ? "border-[#10a3b4] bg-[#10a3b4]"
                            : "border-gray-400"
                        )}
                      >
                        {tempImageFit === "contain" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span
                        className={cn(
                          "text-sm font-semibold",
                          tempImageFit === "contain"
                            ? "text-[#10a3b4]"
                            : "text-gray-700"
                        )}
                      >
                        Mostrar imagem inteira
                      </span>
                    </div>
                    {tempImageFit === "contain" && (
                      <svg
                        className="w-5 h-5 text-[#10a3b4]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="relative w-full h-40 bg-gray-50 rounded overflow-hidden border border-gray-200 flex items-center justify-center">
                    <img
                      src={imagePreview}
                      alt="Preview contain"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-3 text-left">
                    A imagem completa é exibida sem cortes
                  </p>
                </div>
              </motion.button>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            className="bg-[#10a3b4] hover:bg-[#0d8997]"
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
