import { useEffect, useState } from "react";
import { supabase, checkSupabaseConnection } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

export type News = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  image_url?: string;
  external_link?: string;
};

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export function useNews() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  async function fetchNewsWithRetry(retryCount = 0): Promise<News[]> {
    try {
      // Check connection first
      const isConnected = await checkSupabaseConnection();
      if (!isConnected) {
        throw new Error("Could not connect to Supabase");
      }

      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error("Error fetching news:", error);

      if (retryCount < MAX_RETRIES) {
        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        return fetchNewsWithRetry(retryCount + 1);
      }

      throw error;
    }
  }

  useEffect(() => {
    async function loadNews() {
      try {
        setLoading(true);
        const data = await fetchNewsWithRetry();
        setNews(data);
        setError(null);
      } catch (error) {
        console.error("Error loading news:", error);
        setError(error as Error);
        toast({
          title: "Error",
          description: "Failed to load news. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, [toast]);

  return { news, loading, error, refetch: () => fetchNewsWithRetry() };
}
