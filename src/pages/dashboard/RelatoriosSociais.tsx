import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  FileText,
  Upload,
  Trash2,
  Eye,
  Download,
  Plus,
  Pencil,
  AlertCircle,
  Home,
  Newspaper,
  Settings,
  Calendar,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { useSidebarContext } from "../../contexts/SidebarContext";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type RelatorioSocial = {
  id: string;
  title: string;
  date: string;
  file_url: string;
  created_at: string;
};

export default function RelatoriosSociais() {
  const [relatorios, setRelatorios] = useState<RelatorioSocial[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deletingRelatorio, setDeletingRelatorio] =
    useState<RelatorioSocial | null>(null);
  const [editingRelatorio, setEditingRelatorio] =
    useState<RelatorioSocial | null>(null);
  const [removeCurrentFile, setRemoveCurrentFile] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    file: null as File | null,
  });
  const { isCollapsed } = useSidebarContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "title" | "created_at">(
    "created_at"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    fetchRelatorios();
  }, [sortBy, sortOrder]);

  async function fetchRelatorios() {
    try {
      const { data, error } = await supabase
        .from("relatorios_sociais")
        .select("*")
        .order(sortBy, { ascending: sortOrder === "asc" });

      if (error) throw error;
      setRelatorios(data || []);
    } catch (error) {
      console.error("Erro ao buscar relatórios:", error);
      toast.error("Erro ao carregar relatórios");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.file && !editingRelatorio) {
      toast.error("Por favor, selecione um arquivo PDF");
      return;
    }

    if (editingRelatorio && removeCurrentFile && !formData.file) {
      toast.error(
        "Por favor, selecione um novo arquivo PDF ou mantenha o atual"
      );
      return;
    }

    setUploading(true);

    try {
      let publicUrl = editingRelatorio?.file_url;

      if (removeCurrentFile || formData.file) {
        if (editingRelatorio) {
          const oldFilePath = editingRelatorio.file_url.split("/").pop();
          if (oldFilePath) {
            await supabase.storage
              .from("documents")
              .remove([`relatorios/${oldFilePath}`]);
          }
        }

        if (formData.file) {
          const fileExt = formData.file.name.split(".").pop();
          const fileName = `${Date.now()}-${Math.random()
            .toString(36)
            .substring(7)}.${fileExt}`;
          const filePath = `relatorios/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from("documents")
            .upload(filePath, formData.file);

          if (uploadError) throw uploadError;

          const {
            data: { publicUrl: newUrl },
          } = supabase.storage.from("documents").getPublicUrl(filePath);

          publicUrl = newUrl;
        }
      }

      const [year, month] = formData.date.split("-");
      const lastDay = new Date(parseInt(year), parseInt(month), 0).getDate();
      const fullDate = `${year}-${month}-${lastDay}`;

      if (editingRelatorio) {
        const { error } = await supabase
          .from("relatorios_sociais")
          .update({
            title: formData.title,
            date: fullDate,
            ...(publicUrl && { file_url: publicUrl }),
          })
          .eq("id", editingRelatorio.id);

        if (error) throw error;
        toast.success("Relatório atualizado com sucesso!");
      } else {
        const { error } = await supabase.from("relatorios_sociais").insert([
          {
            title: formData.title,
            date: fullDate,
            file_url: publicUrl!,
          },
        ]);

        if (error) throw error;
        toast.success("Relatório adicionado com sucesso!");
      }

      setIsDialogOpen(false);
      setFormData({ title: "", date: "", file: null });
      setEditingRelatorio(null);
      setRemoveCurrentFile(false);
      fetchRelatorios();
    } catch (error) {
      console.error("Erro ao salvar relatório:", error);
      toast.error("Erro ao salvar relatório");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string, fileUrl: string) {
    try {
      const filePath = fileUrl.split("/").pop();
      if (filePath) {
        await supabase.storage
          .from("documents")
          .remove([`relatorios/${filePath}`]);
      }

      const { error } = await supabase
        .from("relatorios_sociais")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Relatório excluído com sucesso!");
      setDeletingRelatorio(null);
      fetchRelatorios();
    } catch (error) {
      console.error("Erro ao excluir relatório:", error);
      toast.error("Erro ao excluir relatório");
    }
  }

  function handleEdit(relatorio: RelatorioSocial) {
    setEditingRelatorio(relatorio);
    setRemoveCurrentFile(false);
    const [year, month] = relatorio.date.split("-");
    setFormData({
      title: relatorio.title,
      date: `${year}-${month}`,
      file: null,
    });
    setIsDialogOpen(true);
  }

  // Função para filtrar relatórios
  const filteredRelatorios = relatorios.filter((relatorio) => {
    const searchLower = searchTerm.toLowerCase();
    const titleMatch = relatorio.title.toLowerCase().includes(searchLower);
    const dateMatch = new Date(relatorio.date)
      .toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric",
      })
      .toLowerCase()
      .includes(searchLower);
    return titleMatch || dateMatch;
  });

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:flex">
        <DashboardSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div
          className={`p-4 lg:p-8 max-w-7xl mx-auto transition-all duration-300 pb-20 lg:pb-8 ${
            isCollapsed ? "lg:ml-20" : "lg:ml-64"
          }`}
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-[#10a3b4] to-[#10a3b4]/80 rounded-2xl p-6 mb-8 text-white shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-3">
                  <FileText className="w-8 h-8" />
                  Relatórios Sociais
                </h1>
                <p className="mt-2 text-white/80">
                  Gerencie os relatórios que aparecerão no Portal da
                  Transparência
                </p>
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-white text-[#10a3b4] hover:bg-white/90 w-full sm:w-auto font-medium shadow-md">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Relatório
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white">
                  <DialogHeader>
                    <DialogTitle className="text-center flex items-center justify-center gap-2">
                      <FileText className="w-5 h-5 text-[#10a3b4]" />
                      {editingRelatorio
                        ? "Editar Relatório"
                        : "Adicionar Novo Relatório"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-sm font-medium">
                        Título do Relatório
                      </Label>
                      <Input
                        id="title"
                        placeholder="Ex: Relatório Social - 2º Semestre 2023"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        className="border-gray-200 focus:border-[#10a3b4] focus:ring-[#10a3b4]"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-sm font-medium">
                        Período do Relatório
                      </Label>
                      <div className="grid grid-cols-2 gap-4">
                        <select
                          className="flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[#10a3b4] disabled:cursor-not-allowed disabled:opacity-50"
                          value={formData.date.split("-")[1] || ""}
                          onChange={(e) => {
                            const year =
                              formData.date.split("-")[0] ||
                              new Date().getFullYear().toString();
                            setFormData({
                              ...formData,
                              date: `${year}-${e.target.value.padStart(
                                2,
                                "0"
                              )}`,
                            });
                          }}
                          required
                        >
                          <option value="">Mês</option>
                          <option value="01">Janeiro</option>
                          <option value="02">Fevereiro</option>
                          <option value="03">Março</option>
                          <option value="04">Abril</option>
                          <option value="05">Maio</option>
                          <option value="06">Junho</option>
                          <option value="07">Julho</option>
                          <option value="08">Agosto</option>
                          <option value="09">Setembro</option>
                          <option value="10">Outubro</option>
                          <option value="11">Novembro</option>
                          <option value="12">Dezembro</option>
                        </select>
                        <select
                          className="flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[#10a3b4] disabled:cursor-not-allowed disabled:opacity-50"
                          value={formData.date.split("-")[0] || ""}
                          onChange={(e) => {
                            const month = formData.date.split("-")[1] || "01";
                            setFormData({
                              ...formData,
                              date: `${e.target.value}-${month}`,
                            });
                          }}
                          required
                        >
                          <option value="">Ano</option>
                          {Array.from({ length: 10 }, (_, i) => {
                            const year = new Date().getFullYear() - i;
                            return (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="file"
                        className="text-sm font-medium flex items-center justify-between"
                      >
                        <span>Arquivo PDF</span>
                      </Label>

                      {editingRelatorio &&
                        !removeCurrentFile &&
                        !formData.file && (
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-[#10a3b4]" />
                                <span className="text-sm text-gray-600">
                                  {editingRelatorio.title}.pdf
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    window.open(
                                      editingRelatorio.file_url,
                                      "_blank"
                                    );
                                  }}
                                  className="text-gray-600 hover:text-gray-900"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          setFormData({
                                            ...formData,
                                            file: null,
                                          });
                                          setRemoveCurrentFile(true);
                                        }}
                                        className="text-blue-600 hover:text-blue-700"
                                      >
                                        <Upload className="w-4 h-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Substituir arquivo</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                          setRemoveCurrentFile(true)
                                        }
                                        className="text-red-600 hover:text-red-700"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Remover arquivo</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                          </div>
                        )}

                      {(!editingRelatorio ||
                        removeCurrentFile ||
                        formData.file) && (
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="file"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer bg-gray-50/50 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-3 text-[#10a3b4]" />
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-medium text-[#10a3b4]">
                                  {removeCurrentFile
                                    ? "Selecione o novo arquivo"
                                    : "Clique para upload"}
                                </span>{" "}
                                ou arraste e solte
                              </p>
                              <p className="text-xs text-gray-400">
                                PDF (MAX. 10MB)
                              </p>
                            </div>
                            <input
                              id="file"
                              type="file"
                              accept=".pdf"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                setFormData({ ...formData, file });
                              }}
                              required={!editingRelatorio || removeCurrentFile}
                            />
                          </label>
                        </div>
                      )}

                      {formData.file && (
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-[#10a3b4]" />
                              <span className="text-sm text-gray-600">
                                {formData.file.name}
                              </span>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setFormData({ ...formData, file: null });
                                if (editingRelatorio)
                                  setRemoveCurrentFile(false);
                              }}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-[#10a3b4] hover:bg-[#10a3b4]/90 text-white font-medium"
                      disabled={uploading}
                    >
                      {uploading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          Enviando...
                        </div>
                      ) : editingRelatorio ? (
                        "Salvar Alterações"
                      ) : (
                        "Adicionar Relatório"
                      )}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#10a3b4]" />
                  <h2 className="font-semibold text-gray-800 text-lg">
                    Relatórios Publicados
                  </h2>
                </div>

                {/* Search Input */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Pesquisar por título ou período..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#10a3b4]/20 focus:border-[#10a3b4]"
                    />
                  </div>

                  {/* Sort Controls */}
                  <div className="flex gap-2">
                    <Select
                      value={sortBy}
                      onValueChange={(value: "date" | "title" | "created_at") =>
                        setSortBy(value)
                      }
                    >
                      <SelectTrigger className="w-[180px] border-gray-200 text-sm focus:ring-2 focus:ring-[#10a3b4]/20 focus:border-[#10a3b4] bg-white">
                        <SelectValue placeholder="Ordenar por" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200">
                        <SelectItem
                          value="created_at"
                          className="hover:bg-gray-50"
                        >
                          Data de publicação
                        </SelectItem>
                        <SelectItem value="date" className="hover:bg-gray-50">
                          Período do relatório
                        </SelectItem>
                        <SelectItem value="title" className="hover:bg-gray-50">
                          Título
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                      }
                      className="border-gray-200 hover:bg-gray-100"
                    >
                      {sortOrder === "asc" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m3 8 4-4 4 4" />
                          <path d="M7 4v16" />
                          <path d="M11 12h10" />
                          <path d="M11 16h7" />
                          <path d="M11 20h4" />
                          <path d="M11 8h13" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 16l4 4 4-4" />
                          <path d="M7 20V4" />
                          <path d="M11 12h10" />
                          <path d="M11 16h7" />
                          <path d="M11 20h4" />
                          <path d="M11 8h13" />
                        </svg>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              <AnimatePresence>
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-3 border-[#10a3b4] border-t-transparent"></div>
                  </div>
                ) : filteredRelatorios.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-16 px-4"
                  >
                    <div className="bg-[#10a3b4]/10 p-4 rounded-full mb-4">
                      <FileText className="w-12 h-12 text-[#10a3b4]" />
                    </div>
                    <p className="text-gray-600 text-lg font-medium mb-2">
                      {searchTerm
                        ? "Nenhum relatório encontrado"
                        : "Nenhum relatório publicado"}
                    </p>
                    <p className="text-gray-400 text-sm text-center">
                      {searchTerm
                        ? "Tente pesquisar com outros termos"
                        : "Clique no botão acima para adicionar um relatório"}
                    </p>
                  </motion.div>
                ) : (
                  filteredRelatorios.map((relatorio) => (
                    <motion.div
                      key={relatorio.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="p-2 bg-[#10a3b4]/10 rounded-lg">
                            <FileText className="w-6 h-6 text-[#10a3b4]" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">
                              {relatorio.title}
                            </h3>
                            <div className="flex flex-col gap-1 mt-1">
                              <p className="text-sm text-gray-500">
                                <span className="font-medium">Período:</span>{" "}
                                {new Date(relatorio.date).toLocaleDateString(
                                  "pt-BR",
                                  {
                                    month: "long",
                                    year: "numeric",
                                  }
                                )}
                              </p>
                              <p className="text-xs text-gray-400">
                                <span className="font-medium">
                                  Publicado em:
                                </span>{" "}
                                {new Date(
                                  relatorio.created_at
                                ).toLocaleDateString("pt-BR", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                })}{" "}
                                às{" "}
                                {new Date(
                                  relatorio.created_at
                                ).toLocaleTimeString("pt-BR", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEdit(relatorio)}
                                  className="text-gray-600 hover:text-gray-900"
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Editar relatório</p>
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  asChild
                                  className="text-gray-600 hover:text-gray-900"
                                >
                                  <a
                                    href={relatorio.file_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </a>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Visualizar PDF</p>
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={async () => {
                                    try {
                                      const filePath = relatorio.file_url
                                        .split("/")
                                        .pop();
                                      if (!filePath) return;

                                      const { data, error } =
                                        await supabase.storage
                                          .from("documents")
                                          .download(`relatorios/${filePath}`);

                                      if (error) throw error;

                                      const blob = new Blob([data], {
                                        type: "application/pdf",
                                      });
                                      const url =
                                        window.URL.createObjectURL(blob);
                                      const link = document.createElement("a");
                                      link.href = url;
                                      link.download = `${relatorio.title}.pdf`;
                                      document.body.appendChild(link);
                                      link.click();
                                      window.URL.revokeObjectURL(url);
                                      document.body.removeChild(link);
                                    } catch (error) {
                                      console.error(
                                        "Erro ao baixar arquivo:",
                                        error
                                      );
                                      toast.error("Erro ao baixar arquivo");
                                    }
                                  }}
                                  className="text-gray-600 hover:text-gray-900"
                                >
                                  <Download className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Baixar PDF</p>
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    setDeletingRelatorio(relatorio)
                                  }
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Excluir relatório</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 border-t bg-white">
        <div className="flex justify-around items-center h-16">
          <Link
            to="/dashboard"
            className="flex flex-col items-center justify-center text-gray-500 hover:text-[#10a3b4] w-[25%] relative pt-[2px]"
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] mt-1">Dashboard</span>
          </Link>
          <Link
            to="/dashboard/noticias"
            className="flex flex-col items-center justify-center text-gray-500 hover:text-[#10a3b4] w-[25%] relative pt-[2px]"
          >
            <Newspaper className="w-5 h-5" />
            <span className="text-[10px] mt-1">Notícias</span>
          </Link>
          <Link
            to="/dashboard/relatorios-sociais"
            className="flex flex-col items-center justify-center text-[#10a3b4] w-[25%] relative"
          >
            <div className="absolute -top-[11px] left-0 right-0 h-[2px] bg-[#10a3b4]" />
            <FileText className="w-5 h-5 mt-[2px]" />
            <span className="text-[10px] mt-1">Relatórios</span>
          </Link>
          <Link
            to="/dashboard/configuracoes"
            className="flex flex-col items-center justify-center text-gray-500 hover:text-[#10a3b4] w-[25%] relative pt-[2px]"
          >
            <Settings className="w-5 h-5" />
            <span className="text-[10px] mt-1">Configurações</span>
          </Link>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deletingRelatorio}
        onOpenChange={() => setDeletingRelatorio(null)}
      >
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-center flex items-center justify-center gap-2 text-red-600">
              <AlertCircle className="w-5 h-5" />
              Confirmar Exclusão
            </DialogTitle>
          </DialogHeader>
          <div className="py-6">
            <p className="text-center text-gray-600">
              Tem certeza que deseja excluir o relatório{" "}
              <span className="font-medium text-gray-900">
                {deletingRelatorio?.title}
              </span>
              ?
            </p>
            <p className="text-center text-sm text-gray-500 mt-2">
              Esta ação não poderá ser desfeita.
            </p>
          </div>
          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeletingRelatorio(null)}
              className="flex-1 sm:flex-none"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={() => {
                if (deletingRelatorio) {
                  handleDelete(
                    deletingRelatorio.id,
                    deletingRelatorio.file_url
                  );
                }
              }}
              className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white"
            >
              Sim, excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
