export type Document = {
  id: number;
  title: string;
  description?: string;
  file_url: string;
  file_type: string;
  category: string;
  created_at: string;
  updated_at: string;
};

export type DocumentCategory = {
  id: number;
  name: string;
  description?: string;
};
