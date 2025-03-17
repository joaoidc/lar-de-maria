import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yzulxwrfpnzgmrbqzvof.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6dWx4d3JmcG56Z21yYnF6dm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMjcwMDIsImV4cCI6MjA1NzgwMzAwMn0.BIdMCJpdjPu-GDgX_A0P6e3me546tFlPDO62z3SrxWY";

export const supabase = createClient(supabaseUrl, supabaseKey);

// Tipos para as tabelas
export type News = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  link: string;
  created_at: string;
};
