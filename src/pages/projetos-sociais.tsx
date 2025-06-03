import { motion } from "framer-motion";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { HeroBanner } from "../components/hero-banner";
import CTASection from "../components/CTASection";
import { PublicLayout } from "../components/PublicLayout";
import "../styles/ProjetosSociais.css";

const projetosData = [
  {
    id: "educacao-vida",
    title: "Educação para a Vida",
    icon: "📚",
    publicoAlvo: "Crianças de 6 a 11 anos",
    apresentacao: "O projeto Educação para a Vida, tem como objetivo atender crianças em situação de vulnerabilidade social, promovendo a inclusão social por meio de atividades socioeducativas. A iniciativa busca contribuir para a formação integral das participantes, fortalecendo os vínculos familiares e comunitários, garantindo o acesso aos direitos sociais e oferecendo acompanhamento pedagógico contínuo.",
    atividades: [
      "Oficinas sociopedagógicas",
      "Acompanhamento psicossocial e pedagógico",
      "Formação continuada para Educadores Sociais",
      "Oficina de Informática, música, dança, atividades manuais e esportivas",
      "Atividades de leitura e mediação de histórias",
      "Temáticas trabalhadas ao longo das atividades: autoconhecimento, comunicação compassiva, educação socioambiental, campanhas de mobilização social",
    ],
  },
  {
    id: "despertar-cidadania",
    title: "Despertar p/ a Cidadania",
    icon: "🌟",
    publicoAlvo: "Crianças a partir de 10 anos e Adolescentes até 17 anos",
    apresentacao: "O projeto Despertar para a Cidadania, tem como objetivo ampliar o universo informacional, artístico e cultural dos adolescentes, estimulando a interação social. A iniciativa busca desenvolver competências que favoreçam a construção da identidade e da cidadania, preparar para a vida adulta e para o convívio social mais amplo.",
    atividades: [
      "Oficina de Informática",
      "Atividades Esportivas (Futebol)",
      "Atividades artística e cultural (Capoeira, Dança)",
      "Estudo do Ser Integral: reflexões sobre valores, emoções e perspectivas de vida",
      "Matemática",
      "Redação"
    ],
  },
  {
    id: "novo-amanha",
    title: "Novo Amanhã",
    icon: "🌅",
    publicoAlvo: "Pessoas idosas a partir de 60 anos",
    apresentacao: "O projeto Novo Amanhã tem como objetivo atender pessoas idosas no período da manhã, por meio de atividades educativo-reflexivas, recreativas e oficinas de trabalhos manuais. A iniciativa busca promover um envelhecimento ativo e saudável, contribuindo para a prevenção do isolamento social e de doenças a ele associadas.",
    atividades: [
      "Encontros de reflexão (palestras sobre saúde, direitos da pessoa idosa, meio ambiente)",
      "Oficinas de trabalhos manuais (artesanato, pintura em tecido, produção de objetos com materiais recicláveis)",
      "Aulas de dança (clássica e regional)",
      "Atividades intergeracionais com crianças",
      "Acompanhamento socioassistencial"
    ],
  },
  {
    id: "familia-cidada",
    title: "Família Cidadã",
    icon: "👨‍👩‍👧‍👦",
    publicoAlvo: "Famílias das crianças e adolescentes, adultos, pessoas idosas atendidos pelo Lar de Maria",
    apresentacao: "Executa o acompanhamento sociopedagógico das famílias vinculadas às ações e projetos do Lar de Maria.",
    atividades: [
      "Entrevistas individuais e coleta de dados cadastrais",
      "Articulação com a rede de serviços (CRAS, CREAS, CAPS, Conselho Tutelar)",
      "Encontros de grupos de convivência familiar",
      "Campanhas educativas (Dia mundial da conscientização do Autismo, Dia Nacional do combate ao Bullying e violência nas Escolas, Maio Laranja, Diga não ao Trabalho Infantil, Combate à violência contra a Mulher, Setembro Amarelo, Dia Nacional da Pessoa Idosa, Dia da consciência Negra)",
      "Visitas institucionais"
    ],
  },
  {
    id: "alegria-sorrir",
    title: "Alegria de Sorrir",
    icon: "😊",
    publicoAlvo: "Crianças, Adolescentes e pessoas idosas atendidas pelos projetos",
    apresentacao: "O Projeto Alegria de Sorrir é uma iniciativa da Associação Lar de Maria em parceria com um grupo de odontólogos voluntários. A ação tem como objetivo oferecer atendimentos odontológicos educativos, preventivos, curativos e reabilitadores a crianças, Adolescentes e idosos atendidos pelos projetos sociais desenvolvidos pela instituição.",
    atividades: [
      "Atendimento odontológico educativo, preventivo e curativo",
      "Orientações sobre saúde bucal para responsáveis",
      "Consultas três vezes por semana (prioridade para crianças)"
    ],
  },
  {
    id: "sons-cidadania",
    title: "Sons da Cidadania",
    icon: "🎵",
    publicoAlvo: "Crianças, adolescentes e comunidade local",
    atividades: [
      "Oficinas de música (flauta doce, violão, canto coral)",
      "Iniciação musical e leitura de partituras",
      "Apresentações em eventos internos",
      "Formação de grupos instrumentais",
    ],
  },
  {
    id: "trabalho-renda",
    title: "Trabalho e Renda no Lar",
    icon: "🧵",
    publicoAlvo: "Jovens, mulheres, adultos e pessoas idosas",
    apresentacao: "Promover iniciativas de geração de trabalho e renda, com foco na inclusão produtiva de jovens, mulheres, adultos e pessoas idosas, contribuindo para a autonomia e o fortalecimento de vínculos sociais.",
    atividades: [
      "Implementar ações de desenvolvimento de capacitação para o trabalho",
      "Promover atividades de geração de renda ao público atendido",
      "Esclarecer e orientar o público atendido sobre mercado de trabalho"
    ],
  },
];

export function ProjetosSociaisPage() {
  const [projetoAtivo, setProjetoAtivo] = useState(projetosData[0].id);
  const projetoSelecionado = projetosData.find((p) => p.id === projetoAtivo);

  return (
    <PublicLayout>
      <Helmet>
        <title>Projetos Sociais | Lar de Maria</title>
        <meta
          name="description"
          content="Conheça nossos projetos sociais que transformam vidas e fortalecem nossa comunidade."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white to-[#e6f7f9]">
        <HeroBanner
          logoUrl="https://res.cloudinary.com/dggewyuon/image/upload/v1740514162/5434w_wbwx8a.png"
          logoHeight={200}
          showHearts={true}
        />

        {/* Projetos com Layout Moderno */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-5xl font-playfair text-[#10a3b4] mb-6">
                Nossos Projetos Sociais
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Conheça nossas iniciativas que transformam vidas e fortalecem
                nossa comunidade
              </p>
            </motion.div>

            {/* Container com scroll horizontal suave */}
            <div className="relative">
              {/* Mensagem de swipe para mobile */}
              <div className="md:hidden text-center mb-4">
                <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                  Arraste para o lado para ver mais opções
                  <svg
                    className="w-5 h-5 animate-[swipe_1.5s_ease-in-out_infinite]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </p>
              </div>

              <style>{`
                @keyframes swipe {
                  0% { transform: translateX(0); }
                  50% { transform: translateX(10px); }
                  100% { transform: translateX(0); }
                }
              `}</style>

              <div className="overflow-x-auto pb-4 hide-scrollbar">
                <div className="flex gap-3 md:flex-wrap md:justify-center min-w-min px-4">
                  {projetosData.map((projeto, index) => (
                    <motion.button
                      key={projeto.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setProjetoAtivo(projeto.id)}
                      className={`
                        flex-none
                        min-w-[160px] sm:min-w-[180px] md:min-w-[140px]
                        p-4 md:p-3
                        rounded-xl
                        text-sm font-medium
                        transition-all duration-300
                        flex flex-col items-center gap-2
                        ${
                          projetoAtivo === projeto.id
                            ? "bg-[#10a3b4] text-white shadow-lg scale-[1.02] border border-[#10a3b4]"
                            : "bg-white text-gray-600 hover:bg-[#10a3b4]/5 border border-gray-100 hover:border-[#10a3b4]/30"
                        }
                      `}
                    >
                      <div
                        className={`
                        w-12 h-12 md:w-10 md:h-10 rounded-lg flex items-center justify-center text-2xl md:text-xl
                        ${
                          projetoAtivo === projeto.id
                            ? "bg-white/20"
                            : "bg-[#10a3b4]/5"
                        }
                      `}
                      >
                        {projeto.icon}
                      </div>
                      <span className="text-center font-medium text-sm leading-tight">
                        {projeto.title}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Indicador de scroll com animação */}
              <div className="mt-6 flex justify-center gap-3 md:hidden">
                <motion.div
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="w-12 h-1.5 rounded-full bg-[#10a3b4]"
                />
                <motion.div
                  animate={{
                    opacity: [1, 0.3, 1],
                    scale: [1, 0.9, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="w-12 h-1.5 rounded-full bg-[#10a3b4]/30"
                />
              </div>
            </div>

            <style>{`
              .hide-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {/* Conteúdo detalhado do projeto */}
            <motion.div
              key={projetoAtivo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 mt-12"
            >
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className={`
                        w-16 h-16 rounded-xl flex items-center justify-center text-4xl
                        bg-[#10a3b4]/5 text-[#10a3b4]
                      `}
                      >
                        {projetoSelecionado?.icon}
                      </div>
                      <h3 className="text-3xl font-playfair text-[#10a3b4]">
                        {projetoSelecionado?.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-lg mb-4">
                      <strong className="text-[#10a3b4]">Público-Alvo:</strong>{" "}
                      {projetoSelecionado?.publicoAlvo}
                    </p>
                    {projetoSelecionado?.apresentacao && (
                      <div className="bg-[#10a3b4]/5 p-6 rounded-xl mb-8">
                        <h4 className="text-[#10a3b4] font-medium mb-3">Apresentação</h4>
                        <p className="text-gray-600 leading-relaxed">
                          {projetoSelecionado.apresentacao}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  {projetoSelecionado?.atividades.map((atividade, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 bg-gray-50/80 p-5 rounded-xl hover:bg-gray-50 transition-colors duration-300 border border-gray-100"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#10a3b4] mt-2.5 flex-shrink-0" />
                      <p className="text-gray-600 leading-relaxed">
                        {atividade}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Seção Final com CTA */}
        <CTASection />
      </div>
    </PublicLayout>
  );
}

export default ProjetosSociaisPage;
