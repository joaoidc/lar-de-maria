import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/footer";
import { Search, FileText, Download, ExternalLink } from "lucide-react";
import { supabase, type RelatorioSocial } from "@/lib/supabase";

export default function Transparencia() {
  const [searchTerm, setSearchTerm] = useState("");
  const [relatorios, setRelatorios] = useState<RelatorioSocial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRelatorios();
  }, []);

  async function fetchRelatorios() {
    try {
      const { data, error } = await supabase
        .from("relatorios_sociais")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;
      setRelatorios(data || []);
    } catch (error) {
      console.error("Erro ao buscar relatórios:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredDocuments = relatorios.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <div className="relative bg-[#10a3b4] text-white py-16">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="relative mx-auto max-w-4xl px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Portal da Transparência
            </h1>
            <p className="text-lg md:text-xl text-white/90 mx-auto max-w-2xl">
              Bem-vindo ao Portal da Transparência do Lar de Maria. Aqui você
              encontra nossos relatórios sociais, demonstrando o impacto de
              nossas ações e nosso compromisso com a transparência.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-12">
          {/* Search Section */}
          <div className="mb-12">
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar relatórios..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#10a3b4] focus:border-transparent shadow-sm transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Documents List */}
          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#10a3b4] mx-auto"></div>
              </div>
            ) : (
              filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-lg bg-[#10a3b4]/10 text-[#10a3b4]">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {doc.title}
                        </h3>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#10a3b4]/10 text-[#10a3b4]">
                          {new Date(doc.date).toLocaleDateString("pt-BR", {
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={doc.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#10a3b4] transition-all duration-200 min-w-[120px]"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Visualizar
                      </a>
                      <a
                        href={doc.file_url}
                        download
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-[#10a3b4] hover:bg-[#10a3b4]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#10a3b4] transition-all duration-200 min-w-[120px] shadow-sm"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}

            {!loading && filteredDocuments.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 text-lg">
                  Nenhum relatório encontrado para a busca realizada.
                </p>
                <p className="text-gray-400 mt-2">
                  Tente usar termos diferentes na sua pesquisa.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
