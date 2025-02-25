import { motion } from "framer-motion";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { HeroBanner } from "../components/hero-banner";

// Dados dos projetos
const projetosData = [
  {
    id: "educacao-vida",
    title: "Educação para a Vida",
    icon: "📚",
    publicoAlvo: "Crianças de 6 a 11 anos",
    atividades: [
      "Oficinas sociopedagógicas",
      "Acompanhamento psicossocial e pedagógico",
      "Formações continuadas para educadores",
      "Oficinas de informática, música, dança, artes manuais e esportes",
      "Atividades de leitura e mediação de histórias",
      "Temas: autoconhecimento, comunicação compassiva, educação socioambiental",
    ],
  },
  {
    id: "despertar-cidadania",
    title: "Despertar p/ a Cidadania",
    icon: "🌟",
    publicoAlvo: "Adolescentes de 12 a 17 anos",
    atividades: [
      "Oficinas de informática (pacote Office, segurança online)",
      "Atividades esportivas (futebol, vôlei, queimada)",
      "Papo Cabeça: reflexões sobre valores, emoções e perspectivas de vida",
      "Oficinas socioambientais (jardinagem, escultura com areia)",
      "Orientação vocacional e empreendedorismo",
      "Acompanhamento pedagógico e familiar",
      "Atividades artísticas e culturais (dança, violão, flauta doce)",
    ],
  },
  {
    id: "novo-amanha",
    title: "Novo Amanhã",
    icon: "🌅",
    publicoAlvo: "Idosos de 60 a 90 anos",
    atividades: [
      "Encontros de reflexão (palestras sobre saúde, direitos do idoso, meio ambiente)",
      "Oficinas de trabalhos manuais (panos de prato, toalhas)",
      "Aulas de dança (clássica e regional)",
      "Atividades intergeracionais com crianças",
      "Acompanhamento socioassistencial (atendimentos individuais e recadastramento)",
    ],
  },
  {
    id: "familia-cidada",
    title: "Família Cidadã",
    icon: "👨‍👩‍👧‍👦",
    publicoAlvo: "Famílias das crianças e adolescentes atendidos",
    atividades: [
      "Entrevistas individuais e coleta de dados cadastrais",
      "Articulação com a rede de serviços (CRAS, CREAS, CAPS, Conselho Tutelar)",
      "Encontros de grupos de convivência familiar",
      "Campanhas educativas (Maio Laranja, Agosto Lilás, Setembro Amarelo)",
      "Visitas domiciliares e institucionais",
    ],
  },
  {
    id: "alegria-sorrir",
    title: "Alegria de Sorrir",
    icon: "😊",
    publicoAlvo: "Crianças, adolescentes e idosos",
    atividades: [
      "Atendimento odontológico educativo, preventivo e curativo",
      "Orientações sobre saúde bucal para responsáveis",
      "Consultas três vezes por semana (prioridade para crianças)",
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
    publicoAlvo: "Mães de família, jovens e idosos",
    atividades: [
      "Curso de Costura Prática e Produção Artesanal",
      "Técnicas de desenho, corte, costura manual e em máquina",
      "Reformas e customização de peças",
      "Certificação ao final do curso",
    ],
  },
];

export function ProjetosSociaisPage() {
  const [projetoAtivo, setProjetoAtivo] = useState(projetosData[0].id);
  const projetoSelecionado = projetosData.find((p) => p.id === projetoAtivo);

  return (
    <>
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
                    <p className="text-gray-600 text-lg">
                      <strong className="text-[#10a3b4]">Público-Alvo:</strong>{" "}
                      {projetoSelecionado?.publicoAlvo}
                    </p>
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
        <section className="py-16 bg-[#10a3b4] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
          </div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center text-white">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl lg:text-4xl font-playfair mb-6"
              >
                Faça Parte Desta História
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg mb-8"
              >
                Junte-se a nós nesta jornada de amor, solidariedade e
                transformação social
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <a
                  href="/doacoes"
                  className="bg-white text-[#10a3b4] px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300"
                >
                  Quero Ajudar
                </a>
                <a
                  href="/contato"
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors duration-300"
                >
                  Entre em Contato
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default ProjetosSociaisPage;
