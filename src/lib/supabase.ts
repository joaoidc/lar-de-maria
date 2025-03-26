import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("Configuração Supabase:", {
  url: supabaseUrl,
  hasKey: !!supabaseAnonKey,
});

// Garantir que a URL começa com https://
let finalUrl = supabaseUrl;
if (finalUrl && !finalUrl.startsWith("https://")) {
  finalUrl = `https://${finalUrl}`;
}

if (!finalUrl) {
  console.error("⚠️ VITE_SUPABASE_URL não está definida");
  throw new Error("VITE_SUPABASE_URL não está definida");
}

if (!supabaseAnonKey) {
  console.error("⚠️ VITE_SUPABASE_ANON_KEY não está definida");
  throw new Error("VITE_SUPABASE_ANON_KEY não está definida");
}

console.log("🔌 Inicializando cliente Supabase...");
export const supabase = createClient(finalUrl, supabaseAnonKey);
console.log("✅ Cliente Supabase inicializado com sucesso!");

// Tipos para as tabelas
export type News = {
  id: number;
  title: string;
  content: string;
  image_url?: string;
  external_link?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
};

export type RelatorioSocial = {
  id: string;
  title: string;
  date: string;
  file_url: string;
  created_at: string;
  updated_at: string;
};

export type RelatorioSocialInput = Omit<
  RelatorioSocial,
  "id" | "created_at" | "updated_at"
>;
