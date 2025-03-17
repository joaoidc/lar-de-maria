import { createClient } from "@supabase/supabase-js";

let supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Garantir que a URL começa com https://
if (supabaseUrl && !supabaseUrl.startsWith("https://")) {
  supabaseUrl = `https://${supabaseUrl}`;
}

// Verificar se as variáveis de ambiente estão definidas
if (!supabaseUrl) {
  console.error("VITE_SUPABASE_URL não está definida");
  throw new Error("VITE_SUPABASE_URL não está definida");
}

if (!supabaseAnonKey) {
  console.error("VITE_SUPABASE_ANON_KEY não está definida");
  throw new Error("VITE_SUPABASE_ANON_KEY não está definida");
}

console.log("Inicializando cliente Supabase com:", {
  url: supabaseUrl,
  hasKey: !!supabaseAnonKey,
});

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
