import { motion } from "framer-motion";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { HeroBanner } from "../components/hero-banner";

type Atividade = {
  horario: string;
  atividade: string;
};

type AtividadesPorDia = {
  [key: string]: Atividade[];
};

const atividadesDoutrinariasPorDia: AtividadesPorDia = {
  "Segunda-feira": [
    { horario: "9h às 10h30", atividade: "Plantão do Passe" },
    { horario: "19h às 20h30", atividade: "Estudo do Espiritismo" },
  ],
  "Terça-feira": [
    { horario: "18h às 19h30", atividade: "Atendimento Espiritual (AE)" },
    { horario: "18h30 às 19h30", atividade: "Estudo do Espiritismo" },
    { horario: "19h30 às 20h30", atividade: "Seara da Mediunidade" },
  ],
  "Quarta-feira": [
    { horario: "9h às 10h30", atividade: "Plantão do Passe" },
    { horario: "19h às 20h30", atividade: "Estudo do Espiritismo" },
  ],
  "Quinta-feira": [
    { horario: "18h", atividade: "Alcoólicos Anônimos (AA)" },
    { horario: "19h às 20h", atividade: "Palestras Públicas" },
  ],
  "Sexta-feira": [
    { horario: "9h às 10h30", atividade: "Atendimento Espiritual (AE)" },
    { horario: "9h às 10h30", atividade: "Plantão do Passe" },
  ],
  Sábado: [
    { horario: "9h às 11h30", atividade: "Amor Exigente" },
    {
      horario: "16h30 às 17h45",
      atividade: "Evangelização Infantojuvenil e Grupo Família",
    },
    { horario: "19h30 às 20h30", atividade: "Estudo do Espiritismo (online)" },
  ],
};

export function AtividadesDoutrinariasPage() {
  const [diaAtivo, setDiaAtivo] = useState("Segunda-feira");

  return (
    <>
      <Helmet>
        <title>Atividades Doutrinárias | Lar de Maria</title>
        <meta
          name="description"
          content="Conheça nossas atividades doutrinárias e fortaleça sua espiritualidade no Lar de Maria."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white to-[#e6f7f9]">
        <HeroBanner
          logoUrl="https://res.cloudinary.com/dggewyuon/image/upload/v1740514162/5434w_wbwx8a.png"
          logoHeight={200}
          showHearts={true}
        />

        {/* Atividades Doutrinárias com Visual Moderno */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-5xl font-playfair text-[#10a3b4] mb-6">
                Atividades Doutrinárias
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Participe de nossas atividades e fortaleça sua espiritualidade
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {Object.keys(atividadesDoutrinariasPorDia).map((dia, index) => (
                <motion.button
                  key={dia}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setDiaAtivo(dia)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    diaAtivo === dia
                      ? "bg-[#10a3b4] text-white shadow-lg scale-105"
                      : "bg-white text-gray-600 hover:bg-[#10a3b4]/10 border border-gray-200"
                  }`}
                >
                  {dia}
                </motion.button>
              ))}
            </div>

            <motion.div
              key={diaAtivo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              {atividadesDoutrinariasPorDia[diaAtivo].map(
                (atividade, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#10a3b4]/10 flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-[#10a3b4]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <h4 className="text-lg font-medium text-[#10a3b4]">
                          {atividade.atividade}
                        </h4>
                      </div>
                      <span className="text-gray-600 bg-gray-100 px-4 py-2 rounded-full text-sm">
                        {atividade.horario}
                      </span>
                    </div>
                  </motion.div>
                )
              )}
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
                Venha Participar
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg mb-8"
              >
                Junte-se a nós em nossas atividades doutrinárias e fortaleça sua
                fé e conhecimento
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <a
                  href="/contato"
                  className="bg-white text-[#10a3b4] px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300"
                >
                  Entre em Contato
                </a>
                <a
                  href="/quem-somos"
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors duration-300"
                >
                  Conheça Nossa História
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default AtividadesDoutrinariasPage;
