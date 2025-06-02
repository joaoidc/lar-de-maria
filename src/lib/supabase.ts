import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/supabase";

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
export const supabase = createClient<Database>(finalUrl, supabaseAnonKey);
console.log("✅ Cliente Supabase inicializado com sucesso!");

// Tipos para as tabelas
export type News = Database["public"]["Tables"]["news"]["Row"];
export type NewsInput = Database["public"]["Tables"]["news"]["Insert"];

export type RelatorioSocial =
  Database["public"]["Tables"]["relatorios_sociais"]["Row"];
export type RelatorioSocialInput =
  Database["public"]["Tables"]["relatorios_sociais"]["Insert"];
