import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function initializeDatabase() {
  try {
    // Create the news table if it doesn't exist
    const { error } = await supabase.rpc("create_news_table", {});

    if (error) {
      // If the RPC doesn't exist, we'll create it
      await supabase.rpc("create_rpc_create_news_table", {});

      // Try creating the table again
      const { error: retryError } = await supabase.rpc("create_news_table", {});
      if (retryError) {
        console.error("Error creating news table:", retryError);
      }
    }
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

// Call initialization when the app starts
initializeDatabase();

// Tipos para as tabelas
export type News = {
  id: number;
  title: string;
  content: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
};
