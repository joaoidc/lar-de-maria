import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import type { Document } from "../types/documents";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";

export default function DocumentsAdmin() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchDocuments();
  }, []);

  async function fetchDocuments() {
    try {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) setDocuments(data);
    } catch (error) {
      console.error("Error fetching documents:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os documentos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !title || !category) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      // 1. Upload do arquivo para o storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `documents/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from("public")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Obter a URL pública do arquivo
      const {
        data: { publicUrl },
      } = supabase.storage.from("public").getPublicUrl(filePath);

      // 3. Salvar os metadados do documento no banco
      const { error: dbError } = await supabase.from("documents").insert([
        {
          title,
          description,
          category,
          file_url: publicUrl,
          file_type: fileExt,
        },
      ]);

      if (dbError) throw dbError;

      toast({
        title: "Sucesso",
        description: "Documento enviado com sucesso!",
      });

      // Limpar o formulário
      setTitle("");
      setDescription("");
      setCategory("");
      setFile(null);

      // Recarregar a lista
      fetchDocuments();
    } catch (error) {
      console.error("Error uploading document:", error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar o documento.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: number, fileUrl: string) {
    try {
      // 1. Deletar o arquivo do storage
      const filePath = fileUrl.split("/").pop();
      if (filePath) {
        await supabase.storage.from("public").remove([`documents/${filePath}`]);
      }

      // 2. Deletar o registro do banco
      const { error } = await supabase.from("documents").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Documento excluído com sucesso!",
      });

      // Atualizar a lista
      fetchDocuments();
    } catch (error) {
      console.error("Error deleting document:", error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o documento.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Gerenciar Documentos</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Adicionar Novo Documento</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="category">Categoria</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="financeiro">Financeiro</SelectItem>
                  <SelectItem value="relatorios">Relatórios</SelectItem>
                  <SelectItem value="documentos">
                    Documentos Institucionais
                  </SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="file">Arquivo (PDF)</Label>
              <Input
                id="file"
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                required
              />
            </div>

            <Button type="submit" disabled={uploading}>
              {uploading ? "Enviando..." : "Enviar Documento"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Documentos Existentes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p>Carregando documentos...</p>
        ) : (
          documents.map((doc) => (
            <Card key={doc.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>{doc.title}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(doc.id, doc.file_url)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-2">{doc.description}</p>
                <p className="text-sm font-medium">Categoria: {doc.category}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
