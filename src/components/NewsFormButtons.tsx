import React from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface NewsFormData {
  title: string;
  content: string;
  image_url?: string;
  external_link?: string;
  status: "published" | "draft";
}

interface NewsFormButtonsProps {
  loading: boolean;
  setFormData: React.Dispatch<React.SetStateAction<NewsFormData>>;
  formData: NewsFormData;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

export function NewsFormButtons({
  loading,
  setFormData,
  formData,
  onSubmit,
}: NewsFormButtonsProps) {
  const navigate = useNavigate();

  return (
    <div className="px-4 md:px-6 py-4 bg-gray-50 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => navigate("/dashboard/noticias")}
          className="w-full sm:w-auto px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Cancelar
        </button>

        <button
          type="button"
          onClick={async (e) => {
            e.preventDefault();
            await setFormData((prev) => ({ ...prev, status: "draft" }));
            await new Promise(resolve => setTimeout(resolve, 0));
            onSubmit(e);
          }}
          disabled={loading}
          className="w-full sm:w-auto px-4 py-2 text-[#10a3b4] bg-white border border-[#10a3b4] rounded-md hover:bg-[#e6f7f9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#10a3b4] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              Salvar como Rascunho
            </>
          )}
        </button>

        <button
          type="button"
          onClick={async (e) => {
            e.preventDefault();
            await setFormData((prev) => ({ ...prev, status: "published" }));
            await new Promise(resolve => setTimeout(resolve, 0));
            onSubmit(e);
          }}
          disabled={loading}
          className="w-full sm:w-auto px-4 py-2 bg-[#10a3b4] text-white rounded-md hover:bg-[#0d8997] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#10a3b4] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {formData.status === "draft" ? "Publicar" : "Salvar e Publicar"}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
