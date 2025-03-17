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
      let image_url = null;

      if (imageFile) {
        try {
          const fileExt = imageFile.name.split(".").pop();
          const fileName = `${Date.now()}.${fileExt}`;
          const filePath = `news/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from("news")
            .upload(filePath, imageFile);

          if (uploadError) {
            console.error("Error uploading image:", uploadError);
            throw uploadError;
          }

          const {
            data: { publicUrl },
          } = supabase.storage.from("news").getPublicUrl(filePath);

          image_url = publicUrl;
        } catch (uploadError) {
          console.error("Error handling image upload:", uploadError);
          toast.error(
            "Erro ao fazer upload da imagem. Por favor, tente novamente."
          );
          setError(
            "Erro ao fazer upload da imagem. Por favor, tente novamente."
          );
          setLoading(false);
          return;
        }
      }

      const newsData = {
        title: formData.title,
        content: formData.content,
        image_url: image_url || formData.image_url,
        external_link: formData.external_link || null,
      };

      let error;

      if (isEditing) {
        ({ error } = await supabase.from("news").update(newsData).eq("id", id));
      } else {
        ({ error } = await supabase.from("news").insert([newsData]));
      }

      if (error) throw error;

      toast.success(
        isEditing
          ? "Notícia atualizada com sucesso!"
          : "Notícia criada com sucesso!"
      );
      navigate("/dashboard/noticias");
    } catch (error: any) {
      console.error("Error saving news:", error);

      if (error.message?.includes("column of 'news'")) {
        setError(
          "Erro na estrutura da tabela. Por favor, execute o script de migração."
        );
        toast.error("Erro na estrutura da tabela");
      } else {
        setError("Erro ao salvar a notícia. Por favor, tente novamente.");
        toast.error("Erro ao salvar a notícia");
      }
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
      <main className="flex-1 overflow-auto ml-64">
        <div className="container mx-auto px-8 py-8 max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">
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

            <div className="p-6 space-y-6">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className={`p-8 bg-gray-50 rounded-lg border-2 border-dashed transition-colors cursor-pointer ${
                    isDragging
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-blue-300 hover:bg-gray-100"
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
                        <div className="mx-auto h-24 w-24 mb-4 rounded-full bg-blue-50 p-4 flex items-center justify-center">
                          <svg
                            className="h-12 w-12 text-blue-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="space-y-2">
                          <div className="text-lg font-medium text-gray-700">
                            Adicione uma imagem à sua notícia
                          </div>
                          <div className="flex items-center justify-center text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500"
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
                            <p className="pl-1">ou arraste e solte aqui</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            Formatos aceitos: PNG, JPG ou GIF (máximo 2MB)
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

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate("/dashboard/noticias")}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading && (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                {loading ? "Salvando..." : isEditing ? "Atualizar" : "Criar"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
