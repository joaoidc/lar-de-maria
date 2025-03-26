import { useState } from "react";
import { cn } from "@/lib/utils";

type Document = {
  id: string;
  title: string;
  category: string;
  date: string;
  url: string;
  fileType: "pdf";
};

// Dados de exemplo - depois você pode substituir por dados reais do backend
const documents: Document[] = [
  {
    id: "1",
    title: "Relatório Financeiro 2023",
    category: "Financeiro",
    date: "2023-12",
    url: "/docs/relatorio-2023.pdf",
    fileType: "pdf",
  },
  {
    id: "2",
    title: "Prestação de Contas - 1º Semestre 2023",
    category: "Prestação de Contas",
    date: "2023-06",
    url: "/docs/prestacao-1sem-2023.pdf",
    fileType: "pdf",
  },
];

const categories = [
  "Todos",
  "Financeiro",
  "Prestação de Contas",
  "Relatórios",
  "Documentos Institucionais",
];

export default function Transparencia() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDocuments = documents.filter((doc) => {
    const matchesCategory =
      selectedCategory === "Todos" || doc.category === selectedCategory;
    const matchesSearch = doc.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Portal da Transparência
        </h1>

        {/* Texto introdutório */}
        <p className="text-gray-600 mb-8 max-w-3xl">
          Bem-vindo ao Portal da Transparência do Lar de Maria. Aqui você
          encontra todos os documentos relacionados à nossa gestão financeira e
          administrativa, demonstrando nosso compromisso com a transparência e
          responsabilidade social.
        </p>

        {/* Filtros e Busca */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar documentos..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#10a3b4] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors duration-200",
                  selectedCategory === category
                    ? "bg-[#10a3b4] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Documentos */}
        <div className="grid gap-4">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">
                  {doc.title}
                </h3>
                <div className="flex gap-2 mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {doc.category}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {new Date(doc.date).toLocaleDateString("pt-BR", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#10a3b4]"
                >
                  Visualizar
                </a>
                <a
                  href={doc.url}
                  download
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-[#10a3b4] hover:bg-[#10a3b4]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#10a3b4]"
                >
                  Download
                </a>
              </div>
            </div>
          ))}

          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Nenhum documento encontrado para os filtros selecionados.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
