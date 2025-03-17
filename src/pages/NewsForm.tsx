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
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isExternalUrl, setIsExternalUrl] = useState(true);

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
        });
        if (data.image_url) {
          setImagePreview(data.image_url);
          setIsExternalUrl(true);
        }
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      toast.error("Erro ao carregar a notícia");
    }
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setIsExternalUrl(false);
      setFormData({ ...formData, image_url: "" });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // If using external URL, use it directly
      let image_url = isExternalUrl ? formData.image_url : null;

      // Only try to upload if we have a file and are not using external URL
      if (imageFile && !isExternalUrl) {
        try {
          const fileExt = imageFile.name.split(".").pop();
          const fileName = `${Date.now()}.${fileExt}`;
          const filePath = `news/${fileName}`;

          // First, check if the bucket exists
          const { data: buckets } = await supabase.storage.listBuckets();
          const newsBucket = buckets?.find((b) => b.name === "news");

          // If bucket doesn't exist, create it
          if (!newsBucket) {
            const { error: createBucketError } =
              await supabase.storage.createBucket("news", {
                public: true,
                fileSizeLimit: 1024 * 1024 * 2, // 2MB limit
              });

            if (createBucketError) {
              console.error("Error creating bucket:", createBucketError);
              throw createBucketError;
            }
          }

          // Now try to upload the file
          const { error: uploadError } = await supabase.storage
            .from("news")
            .upload(filePath, imageFile);

          if (uploadError) {
            console.error("Error uploading image:", uploadError);
            throw uploadError;
          }

          // Get the public URL
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
        image_url,
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

      // Handle specific error cases
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
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Imagem
                </label>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <label className="inline-flex items-center mb-3">
                      <input
                        type="radio"
                        className="form-radio text-blue-500"
                        checked={isExternalUrl}
                        onChange={() => setIsExternalUrl(true)}
                      />
                      <span className="ml-2 text-gray-700">URL externa</span>
                    </label>
                    {isExternalUrl && (
                      <input
                        type="text"
                        value={formData.image_url || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            image_url: e.target.value,
                          })
                        }
                        placeholder="https://exemplo.com/imagem.jpg"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    )}
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <label className="inline-flex items-center mb-3">
                      <input
                        type="radio"
                        className="form-radio text-blue-500"
                        checked={!isExternalUrl}
                        onChange={() => setIsExternalUrl(false)}
                      />
                      <span className="ml-2 text-gray-700">
                        Upload de arquivo
                      </span>
                    </label>
                    {!isExternalUrl && (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-medium
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100"
                      />
                    )}
                  </div>

                  {imagePreview && (
                    <div className="mt-4">
                      <div className="relative w-full max-w-sm mx-auto">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="rounded-lg shadow-md w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            setImageFile(null);
                            setFormData({ ...formData, image_url: "" });
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
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
