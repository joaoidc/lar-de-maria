import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { DashboardSidebar } from "../components/DashboardSidebar";
import { supabase } from "../lib/supabase";

interface NewsFormData {
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
        setFormData(data);
        if (data.image_url) {
          setImagePreview(data.image_url);
        }
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setError("Erro ao carregar a notícia. Por favor, tente novamente.");
    }
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let image_url = formData.image_url;

      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `news/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("images")
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("images").getPublicUrl(filePath);

        image_url = publicUrl;
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

      navigate("/dashboard/noticias");
    } catch (error) {
      console.error("Error saving news:", error);
      setError("Erro ao salvar a notícia. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />

      {/* Main Content */}
      <div className="md:ml-64 p-8 pb-20 md:pb-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate("/dashboard/noticias")}
              className="mr-4 text-gray-600 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </button>
            <h1 className="text-2xl font-semibold text-gray-800">
              {isEditing ? "Editar Notícia" : "Nova Notícia"}
            </h1>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="space-y-6">
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
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10a3b4] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Imagem
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  {imagePreview && (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview(null);
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
                  )}
                  <label className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#10a3b4]">
                    <span className="text-sm font-medium text-gray-700">
                      {imagePreview ? "Trocar imagem" : "Selecionar imagem"}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#10a3b4] text-white px-6 py-2 rounded-lg hover:bg-[#0d8997] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Salvando...</span>
                    </div>
                  ) : (
                    "Salvar"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
