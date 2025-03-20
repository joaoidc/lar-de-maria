import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { DashboardSidebar } from "../components/DashboardSidebar";
import { supabase } from "../lib/supabase";
import { toast } from "react-hot-toast";
import type { News } from "../lib/supabase";

interface NewsFormData extends Omit<News, "id" | "created_at" | "updated_at"> {
  title: string;
  content: string;
  image_url?: string;
  external_link?: string;
  status: "published" | "draft";
}

export function NewsForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<NewsFormData>({
    title: "",
    content: "",
    image_url: "",
    external_link: "",
    status: "draft",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const isEditing = !!id;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isEditing) {
      fetchNews();
    }
  }, [id]);

  async function fetchNews() {
    try {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      if (data) {
        setFormData({
          title: data.title,
          content: data.content,
          image_url: data.image_url || "",
          external_link: data.external_link || "",
          status: data.status || "published",
        });
        if (data.image_url) {
          setImagePreview(data.image_url);
        }
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      toast.error("Erro ao carregar a notícia");
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleImageFile(file);
    } else {
      toast.error("Por favor, envie apenas arquivos de imagem");
    }
  }

  function handleImageFile(file: File) {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setFormData({ ...formData, image_url: "" });
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      handleImageFile(file);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let image_url = formData.image_url;

      if (imageFile) {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("images")
          .upload(`${Date.now()}-${imageFile.name}`, imageFile);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("images").getPublicUrl(uploadData.path);

        image_url = publicUrl;
      }

      const newsData = {
        title: formData.title,
        content: formData.content,
        image_url: image_url || null,
        external_link: formData.external_link || null,
        status: formData.status,
      };

      console.log("Saving news with data:", newsData);

      const { data, error } = isEditing
        ? await supabase.from("news").update(newsData).eq("id", id)
        : await supabase.from("news").insert([newsData]).select();

      if (error) {
        console.error("Database error:", error);
        throw error;
      }

      console.log("Saved news:", data);

      toast.success(
        isEditing
          ? "Notícia atualizada com sucesso!"
          : "Notícia criada com sucesso!"
      );
      navigate("/dashboard/noticias");
    } catch (error: any) {
      console.error("Error saving news:", error);
      setError("Erro ao salvar a notícia. Por favor, tente novamente.");
      toast.error("Erro ao salvar a notícia");
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashboardSidebar />
      <main className="flex-1 p-4 md:p-8 w-full md:ml-64">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              {isEditing ? "Editar Notícia" : "Nova Notícia"}
            </h1>
            <button
              type="button"
              onClick={() => navigate("/dashboard/noticias")}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              Voltar
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-md"
          >
            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                {error}
              </div>
            )}

            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Título
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10a3b4] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Conteúdo
                </label>
                <textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10a3b4] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="external_link"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Link Externo{" "}
                  <span className="text-gray-500 text-xs">(opcional)</span>
                </label>
                <div className="relative">
                  <input
                    type="url"
                    id="external_link"
                    value={formData.external_link}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        external_link: e.target.value,
                      })
                    }
                    placeholder="https://exemplo.com/materia-completa"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10a3b4] focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                      />
                    </svg>
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Adicione um link para a fonte original ou matéria completa, se
                  houver
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Imagem da Notícia
                </label>
                <div
                  className={`p-4 md:p-8 bg-gray-50 rounded-lg border-2 border-dashed transition-colors cursor-pointer ${
                    isDragging
                      ? "border-[#10a3b4] bg-blue-50"
                      : "border-gray-300 hover:border-[#10a3b4] hover:bg-gray-100"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                >
                  <div className="text-center">
                    {!imagePreview ? (
                      <>
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#e6f7f9] mb-4">
                          <svg
                            className="h-8 w-8 text-[#10a3b4]"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                          </svg>
                        </div>
                        <div className="space-y-2">
                          <div className="text-lg font-medium text-gray-700">
                            Adicione uma imagem à sua notícia
                          </div>
                          <div className="flex flex-col md:flex-row items-center justify-center gap-1 text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md font-medium text-[#10a3b4] hover:text-[#0d8997]"
                            >
                              <span>Clique para selecionar</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={handleImageChange}
                              />
                            </label>
                            <p className="text-center md:text-left">
                              ou arraste e solte aqui
                            </p>
                          </div>
                          <p className="text-xs text-gray-500">
                            Formatos aceitos: PNG ou JPG (máximo 2MB)
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="relative group">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="rounded-lg shadow-md w-full max-h-[300px] object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setImagePreview(null);
                              setImageFile(null);
                              setFormData({ ...formData, image_url: "" });
                            }}
                            className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transform hover:scale-110 transition-transform"
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
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          Clique na imagem para alterar ou no X para remover
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 md:px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg flex flex-col-reverse md:flex-row justify-between gap-3">
              <div className="flex flex-col md:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/noticias")}
                  className="w-full md:w-auto px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setFormData((prev) => ({ ...prev, status: "draft" }));
                    handleSubmit(e);
                  }}
                  disabled={loading}
                  className="w-full md:w-auto px-4 py-2 text-[#10a3b4] bg-white border border-[#10a3b4] rounded-md hover:bg-[#e6f7f9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#10a3b4] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && (
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                  {loading ? "Salvando..." : "Salvar como Rascunho"}
                </button>
              </div>
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  setFormData((prev) => ({ ...prev, status: "published" }));
                  handleSubmit(e);
                }}
                disabled={loading}
                className="w-full md:w-auto px-4 py-2 text-white bg-[#10a3b4] rounded-md hover:bg-[#0d8997] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#10a3b4] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && (
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                {loading
                  ? "Salvando..."
                  : isEditing
                  ? "Publicar Alterações"
                  : "Publicar Notícia"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
