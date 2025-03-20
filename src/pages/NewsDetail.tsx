import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { PublicLayout } from "../components/PublicLayout";
import { Helmet } from "react-helmet-async";

interface News {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_url?: string;
  external_link?: string;
  status: "published" | "draft";
}

export function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, [id]);

  async function fetchNews() {
    if (!id) return;

    try {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("id", id)
        .eq("status", "published")
        .single();

      if (error) throw error;
      setNews(data);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <PublicLayout>
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#10a3b4]"></div>
        </div>
      </PublicLayout>
    );
  }

  if (!news) {
    return (
      <PublicLayout>
        <div className="min-h-screen bg-gradient-to-b from-white to-[#e6f7f9]">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-2xl text-gray-800">Notícia não encontrada</h1>
            </div>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <Helmet>
        <title>{news.title} | Lar de Maria</title>
        <meta name="description" content={news.content.substring(0, 160)} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white to-[#e6f7f9]">
        <div className="container mx-auto px-4 py-16">
          <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            {news.image_url && (
              <img
                src={news.image_url}
                alt={news.title}
                className="w-full h-[400px] object-cover"
              />
            )}
            <div className="p-8">
              <h1 className="text-3xl lg:text-4xl font-playfair text-gray-800 mb-6">
                {news.title}
              </h1>
              <div className="mb-8">
                <span className="text-gray-500">
                  {new Date(news.created_at).toLocaleDateString("pt-BR")}
                </span>
              </div>
              <div className="prose prose-lg max-w-none">
                {news.content.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}

                {news.external_link && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <a
                      href={news.external_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[#10a3b4] hover:text-[#0d8997] group"
                    >
                      <span className="mr-2">Acesse mais em:</span>
                      <span className="underline">{news.external_link}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </article>
        </div>
      </div>
    </PublicLayout>
  );
}
