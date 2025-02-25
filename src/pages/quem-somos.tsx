import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { HeroBanner } from "../components/hero-banner";

export function QuemSomosPage() {
  return (
    <>
      <Helmet>
        <title>Quem Somos | Lar de Maria</title>
        <meta
          name="description"
          content="Conheça nossa história de 77 anos de trabalho pela promoção humana de crianças, jovens, idosos e suas famílias."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white to-[#e6f7f9]">
        <HeroBanner
          logoUrl="https://res.cloudinary.com/dggewyuon/image/upload/v1740514162/5434w_wbwx8a.png"
          logoHeight={200}
          showHearts={true}
        />

        {/* Texto Histórico em Duas Colunas */}
        <section className="py-16 lg:py-24 bg-[#fcf9f2]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-5xl font-playfair text-[#10a3b4] mb-6">
                Quem Somos & Nossa História
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Há 77 anos transformando vidas através do amor e da dedicação
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-6xl mx-auto"
            >
              <div className="relative">
                {/* Decoração de página antiga */}
                <div className="absolute inset-0 bg-[#fcf9f2] opacity-50"></div>
                <div className="relative bg-[#fcf9f2] p-8 lg:p-12 rounded-lg shadow-xl">
                  {/* Decoração de cantos */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#10a3b4]/30"></div>
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#10a3b4]/30"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#10a3b4]/30"></div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#10a3b4]/30"></div>

                  {/* Texto em duas colunas */}
                  <div className="columns-1 md:columns-2 gap-8 text-justify leading-relaxed text-gray-700 [&>p]:mb-4 first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-[#10a3b4]">
                    <p>
                      O ano de 1906 é marcado pela unificação dos grupos e
                      instituições de estudo e prática do espiritismo no estado
                      do Pará, com o nascimento da União Espírita Paraense
                      (UEP), que vem para organizar, orientar e sistematizar a
                      vivência dos estudos da doutrina espírita e promover a
                      prática das bases éticas e morais com aqueles que
                      compartilham do mesmo sentimento por meio de projetos,
                      eventos, reuniões e atividades de cunha religioso e
                      social. Em 1945, Oliveiros de Assunção Castro (Oli de
                      Castro), chega na capital paraense e inicia suas
                      atividades de unificação e divulgação do espiritismo
                      juntamente com outros trabalhadores como Léon Denis na
                      "UEP"; Francisco de Assis na "Confederação Espírita
                      Caminheiros do Bem"; e João Evangelista no "Centro
                      Espírita Francisco de Assis", e constroem o Movimento de
                      Juventude da União Espírita Paraense.
                    </p>

                    <p>
                      Esse processo de unificação juntamente com o empenho dos
                      seguidores dessa doutrina, que movidos pelas bases de amor
                      e caridade que tanto estudam, fortalecem a criação de
                      projetos e instituições voltadas para o atendimento
                      assistencial com a comunidade local, algo que sempre foi o
                      foco dos trabalhos de Oli de Castro, que até então já
                      havia construído a "Casa de Paulo de Tarso" em sua cidade
                      natal, Pinheiros no Maranhão, entre outras instituições em
                      diversas partes do Brasil. Em 1947 Oliveiros de Assunção
                      Castro cria a Associação Assistencial Espírita Lar de
                      Maria na capital paraense, voltada para abrigar crianças e
                      idosos.
                    </p>

                    <p>
                      Entretanto, muitos foram os movimentos e processos que
                      tornaram possível a construção de uma instituição dessa
                      proporção, a começar pela doação feita pelo até então
                      prefeito Estórgio Meira de Lima, no governo de Luiz Geolás
                      de Moura Carvalho, de um terreno que servia como depósito
                      de lixo e que media 100 m de frente e 88,50 m de fundos,
                      localizado na Avenida São Jerônimo (atual endereço da
                      praça Floriano Peixoto, no bairro de São Brás, n. 33). A
                      doação foi feita para o grupo fundado e liderado por Oli
                      de Castro, a "Confraternização Espírita Paraense", e foi
                      de aproximadamente 300 mil cruzeiros em terreno, iniciando
                      uma preparação para algo que seria muito maior do que os
                      próprios idealizadores poderiam imaginar.
                    </p>

                    <p>
                      O nome Lar de Maria surge em homenagem à figura materna do
                      cristianismo, e sua estrutura confiada ao engenheiro e
                      arquiteto Dr. Judah Levi, que era muito conhecido pela
                      elaboração de edifícios de mais de dez pavimentos que
                      refletiam a modernidade da capital paraense. Levi resolve
                      homenagear Oli de Castro, antigo suboficial da
                      aeronáutica, e planeja a estrutura da instituição em
                      formato de avião, juntamente com a isenção total de
                      remuneração pelos seus serviços.
                    </p>

                    <p>
                      Muito já se tinha organizado para o nascimento da
                      instituição, porém, por se tratar de uma organização não
                      governamental, fez-se necessário a idealização de muitos
                      projetos e ações que viessem a contribuir com os custos de
                      uma construção desse porte. O Movimento Espírita Paraense
                      toma a iniciativa de tornar tudo isso realidade,
                      juntamente com o apoio jornalístico da Folha Norte e
                      demais apoiadores da causa, muitos deles pessoas físicas,
                      que imbuídas pelo sentimento de caridade aos mais
                      necessitados, por exemplo, realizavam em suas residências
                      cursos e oficinas de trabalhos manuais para angariar
                      fundos para a instituição, tal como ações motivadores para
                      que as pessoas se tornassem sócios contribuintes,
                      realizando um pagamento mensal para a edificação do
                      prédio, entre outras iniciativas.
                    </p>

                    <p>
                      É inaugurada no dia 24 de fevereiro de 1957, quase dez
                      anos após a criação oficial das atividades da instituição,
                      a Associação Assistencial Espírita Lar de Maria, sendo
                      intensamente divulgada pelas mídias jornalísticas, e
                      contou com uma belíssima programação para toda a
                      sociedade, com o simbólico corte da fita pelo delegado da
                      primeira região federal da criança, Salomão Levy. Estavam
                      presentes também o até então presidente da instituição o
                      senhor Oswaldo Pacheco Dillon, e o fundador Oliveiros de
                      Assunção Castro. Nesse contexto, a instituição já estava
                      sob a gestão de sua terceira presidência. Oliveiros de
                      Castro, juntamente com Délio Cabral Marques, administraram
                      a instituição de 1947 até meados de 1949.
                    </p>

                    <p>
                      A instituição inaugura buscando receber 150 crianças
                      internadas, usando como critério para admissão pessoas em
                      situação de vulnerabilidade social que morassem nos
                      bairros mais carentes da cidade de Belém, tendo também
                      crianças já cadastradas e contempladas pelas atividades
                      sociais antes mesmo da inauguração do prédio. Desde então,
                      as atividades sociais e de cunha doutrinário espírita
                      permanecem e se fortalecem no passar dos anos, passando
                      por algumas mudanças físicas e administrativas, como as
                      divisões de parte da estrutura para a captação e recursos
                      por meio de aluguéis, e a mudança da prática de internato
                      para creche, e em 2008 para projeto assistencial no contra
                      turno escolar, modelo esse que permanece na instituição
                      até o dia da elaboração deste documento.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Seção de Mídia e Reconhecimento */}
        <section className="py-16 lg:py-24 bg-white relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-playfair text-[#10a3b4] mb-6">
                Lar de Maria na Mídia
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Nossa história de transformação social reconhecida pela imprensa
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-xl overflow-hidden"
              >
                {/* Cabeçalho do Card */}
                <div className="bg-gradient-to-r from-[#115EAC] to-[#00A3E0] p-6 flex items-center gap-4">
                  <img
                    src="https://res.cloudinary.com/dggewyuon/image/upload/v1740514162/5434w_wbwx8a.png"
                    alt="Logo Lar de Maria"
                    className="w-16 h-16 object-contain"
                  />
                  <div className="text-white">
                    <h3 className="text-xl font-bold">Lar de Maria</h3>
                    <p className="text-sm opacity-90">
                      Transformando vidas há mais de 77 anos
                    </p>
                  </div>
                </div>

                {/* Conteúdo do Vídeo */}
                <div className="p-6">
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 mb-6">
                    <iframe
                      src="https://www.youtube.com/embed/dglxv5k3jSs"
                      title="Lar de Maria - Parte II"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full pointer-events-auto"
                      style={{
                        minHeight: "315px",
                        zIndex: 10,
                        position: "relative",
                      }}
                    ></iframe>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-gray-800">
                      Conheça o Lar de Maria
                    </h4>
                    <p className="text-gray-600">
                      Assista ao nosso vídeo institucional e conheça mais sobre
                      nossa história, nossos projetos e o impacto que causamos
                      na vida de centenas de pessoas em Belém.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <svg
                        className="w-5 h-5"
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
                      <span>Vídeo Institucional</span>
                    </div>
                  </div>
                </div>

                {/* Rodapé do Card */}
                <div className="bg-gray-50 p-6 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://res.cloudinary.com/dggewyuon/image/upload/v1740514162/5434w_wbwx8a.png"
                      alt="Logo Lar de Maria"
                      className="h-8"
                    />
                    <span className="text-sm text-gray-600">
                      Transformando vidas há mais de 77 anos
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* História Section */}
        <section className="py-12 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-playfair text-[#10a3b4] mb-4 sm:mb-6">
                Linha do Tempo
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg px-4">
                Desde 1947, o Lar de Maria tem sido um farol de esperança e
                transformação em Belém do Pará
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <div className="relative">
                {/* Linha central */}
                <div className="hidden sm:block absolute left-1/2 transform -translate-x-[1px] h-full w-[2px] bg-[#10a3b4]" />

                {/* Timeline Items */}
                <div className="relative space-y-12 sm:space-y-24">
                  {[
                    {
                      year: "1906",
                      title: "União Espírita Paraense",
                      description:
                        "Unificação dos grupos espíritas no Pará com a criação da União Espírita Paraense (UEP).",
                      icon: "🏛️",
                    },
                    {
                      year: "1945",
                      title: "Chegada de Oliveiros Castro",
                      description:
                        "Chegada de Oliveiros de Assunção Castro em Belém, iniciando o movimento de unificação espírita.",
                      icon: "👥",
                    },
                    {
                      year: "1947",
                      title: "Fundação do Lar de Maria",
                      description:
                        "Fundação da Associação Assistencial Espírita Lar de Maria por Oliveiros de Castro.",
                      icon: "🏠",
                    },
                    {
                      year: "1957",
                      title: "Inauguração do Prédio",
                      description:
                        "Inauguração oficial do prédio, com capacidade para atender 150 crianças.",
                      icon: "🎗️",
                    },
                    {
                      year: "2008",
                      title: "Nova Fase",
                      description:
                        "Transformação em projeto assistencial no contraturno escolar, modelo que permanece até hoje.",
                      icon: "✨",
                    },
                  ].map((item, index) => (
                    <div
                      key={item.year}
                      className={`flex flex-col sm:flex-row items-center justify-center ${
                        index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                      }`}
                    >
                      {/* Conteúdo */}
                      <motion.div
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className={`w-full sm:w-[calc(50%-20px)] ${
                          index % 2 === 0
                            ? "sm:text-right sm:pr-8"
                            : "sm:text-left sm:pl-8"
                        }`}
                      >
                        <div
                          className={`inline-block bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full sm:w-auto ${
                            index % 2 === 0 ? "sm:mr-4" : "sm:ml-4"
                          }`}
                        >
                          <div
                            className={`flex items-center gap-2 sm:gap-4 mb-2 sm:mb-3 ${
                              index % 2 === 0 ? "flex-row" : "flex-row"
                            }`}
                          >
                            <h3 className="text-xl sm:text-2xl font-bold text-[#10a3b4]">
                              {item.year}
                            </h3>
                            <h4 className="text-lg sm:text-xl font-semibold text-gray-800">
                              {item.title}
                            </h4>
                          </div>
                          <p className="text-gray-600 text-sm sm:text-base">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>

                      {/* Círculo central com ícone */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                        }}
                        className="relative z-10 my-4 sm:my-0"
                      >
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border-4 border-[#10a3b4] flex items-center justify-center">
                          <span className="text-base sm:text-lg">
                            {item.icon}
                          </span>
                        </div>
                      </motion.div>

                      {/* Espaço do outro lado */}
                      <div className="hidden sm:block sm:w-[calc(50%-20px)]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Final com CTA */}
        <section className="py-12 sm:py-16 bg-[#10a3b4] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 relative">
            <div className="max-w-4xl mx-auto text-center text-white">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl lg:text-4xl font-playfair mb-4 sm:mb-6"
              >
                Faça Parte Desta História
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg mb-6 sm:mb-8 px-4"
              >
                Junte-se a nós nesta jornada de amor, solidariedade e
                transformação social
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row justify-center gap-4 px-4"
              >
                <a
                  href="/doacoes"
                  className="bg-white text-[#10a3b4] px-6 sm:px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300 text-center"
                >
                  Quero Ajudar
                </a>
                <a
                  href="/contato"
                  className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors duration-300 text-center"
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

export default QuemSomosPage;
