import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Determine the redirect URL based on the current environment
const getRedirectUrl = () => {
  const currentUrl = window.location.origin;
  if (currentUrl.includes("localhost")) {
    return "http://localhost:5173";
  } else if (currentUrl.includes("netlify")) {
    return "https://lardemariabelempa.netlify.app";
  }
  return "https://lardemariabelempa.vercel.app";
};

if (!supabaseUrl) {
  console.error("⚠️ Missing VITE_SUPABASE_URL environment variable");
}

if (!supabaseAnonKey) {
  console.error("⚠️ Missing VITE_SUPABASE_ANON_KEY environment variable");
}

console.log("🔌 Initializing Supabase client...");
console.log("URL:", supabaseUrl);
console.log("Has Key:", !!supabaseAnonKey);
console.log("Redirect URL:", getRedirectUrl());

export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "", {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: "pkce",
    redirectTo: `${getRedirectUrl()}/auth/callback`,
  },
  global: {
    headers: {
      "x-application-name": "lar-de-maria",
    },
  },
});

// Helper function to check if Supabase is accessible
export async function checkSupabaseConnection() {
  try {
    const { data, error } = await supabase.from("news").select("count");
    if (error) {
      console.error("Error connecting to Supabase:", error);
      return false;
    }
    console.log("✅ Successfully connected to Supabase");
    return true;
  } catch (error) {
    console.error("❌ Error checking Supabase connection:", error);
    return false;
  }
}

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
