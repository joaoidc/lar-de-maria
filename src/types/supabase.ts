export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      news: {
        Row: {
          id: string;
          title: string;
          content: string;
          image_url: string | null;
          external_link: string | null;
          image_fit: "cover" | "contain" | null;
          status: "published" | "draft";
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          image_url?: string | null;
          external_link?: string | null;
          image_fit?: "cover" | "contain" | null;
          status?: "published" | "draft";
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          image_url?: string | null;
          external_link?: string | null;
          image_fit?: "cover" | "contain" | null;
          status?: "published" | "draft";
          created_at?: string;
          updated_at?: string | null;
        };
      };
      relatorios_sociais: {
        Row: {
          id: string;
          title: string;
          date: string;
          file_url: string;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          date: string;
          file_url: string;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          date?: string;
          file_url?: string;
          created_at?: string;
          updated_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
