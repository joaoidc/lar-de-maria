import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Heart, Handshake, Users, DollarSign, Gift, Clock } from "lucide-react";
import DoarButton from "../components/DoarButton";

export function DoacoesPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#e6f7f9] font-sans">
      <Helmet>
        <title>Doações | Lar de Maria</title>
        <meta
          name="description"
          content="Ajude o Lar de Maria através de doações e voluntariado. Sua contribuição transforma vidas."
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              className="inline-block p-3 bg-[#e6f7f9] rounded-full mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Heart className="w-10 h-10 text-[#10a3b4]" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-[#10a3b4] font-bold mb-6 leading-tight">
              Faça a Diferença com Sua Doação
            </h1>
            <p className="text-gray-800 text-lg md:text-xl mb-10 leading-relaxed">
              Sua contribuição é fundamental para continuarmos nosso trabalho de
              transformação social. Cada gesto de generosidade nos ajuda a
              construir um futuro melhor.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#10a3b4] hover:bg-[#0a7a86] text-white font-medium py-3 px-8 rounded-full text-lg transition-all shadow-lg"
              onClick={() => {
                window.location.href = "/doaragora";
              }}
            >
              Doe Agora
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Donation Options */}
      <section className="py-16 lg:py-24 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-card p-8 text-center hover:shadow-lg transition-all border-t-4 border-[#10a3b4]"
            >
              <div className="bg-[#e6f7f9] p-4 rounded-full inline-flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-[#10a3b4]" />
              </div>
              <h3 className="text-2xl font-bold text-[#10a3b4] mb-4">
                Seja Sócio
              </h3>
              <p className="text-gray-800 mb-6">
                Torne-se um sócio do Lar de Maria com contribuições mensais e
                ajude a manter nossos projetos em andamento.
              </p>
              <button className="border-2 border-[#10a3b4] text-[#10a3b4] hover:bg-[#10a3b4] hover:text-white font-medium py-2 px-6 rounded-full transition-all">
                Saiba Mais
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-card p-8 text-center hover:shadow-lg transition-all border-t-4 border-[#10a3b4]"
            >
              <div className="bg-[#e6f7f9] p-4 rounded-full inline-flex items-center justify-center mb-6">
                <DollarSign className="w-8 h-8 text-[#10a3b4]" />
              </div>
              <h3 className="text-2xl font-bold text-[#10a3b4] mb-4">
                Faça uma Doação
              </h3>
              <p className="text-gray-800 mb-6">
                Aceitamos doações em dinheiro, alimentos e outros recursos. Sua
                ajuda é muito bem-vinda!
              </p>
              <DoarButton />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-card p-8 text-center hover:shadow-lg transition-all border-t-4 border-[#10a3b4]"
            >
              <div className="bg-[#e6f7f9] p-4 rounded-full inline-flex items-center justify-center mb-6">
                <Handshake className="w-8 h-8 text-[#10a3b4]" />
              </div>
              <h3 className="text-2xl font-bold text-[#10a3b4] mb-4">
                Seja Voluntário
              </h3>
              <p className="text-gray-800 mb-6">
                Junte-se a nós como voluntário e faça parte da nossa missão de
                transformação social.
              </p>
              <button className="border-2 border-[#10a3b4] text-[#10a3b4] hover:bg-[#10a3b4] hover:text-white font-medium py-2 px-6 rounded-full transition-all">
                Inscreva-se
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 lg:py-24 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-[#10a3b4] mb-6">
              O Impacto de Sua Doação
            </h2>
            <p className="text-gray-800 text-lg">
              Com sua ajuda, conseguimos realizar projetos que transformam vidas
              e comunidades inteiras.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl p-6 text-center shadow-soft border-l-4 border-[#10a3b4]"
            >
              <div className="inline-block mb-4">
                <div className="w-20 h-20 rounded-full bg-[#e6f7f9] flex items-center justify-center mx-auto">
                  <Gift className="w-10 h-10 text-[#10a3b4]" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#10a3b4] mb-2">129</h3>
              <p className="text-gray-800">
                Crianças atendidas em situação de vulnerabilidade
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl p-6 text-center shadow-soft border-l-4 border-[#10a3b4]"
            >
              <div className="inline-block mb-4">
                <div className="w-20 h-20 rounded-full bg-[#e6f7f9] flex items-center justify-center mx-auto">
                  <Users className="w-10 h-10 text-[#10a3b4]" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#10a3b4] mb-2">35</h3>
              <p className="text-gray-800">
                Adolescentes em oficinas de capacitação profissional
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl p-6 text-center shadow-soft border-l-4 border-[#10a3b4]"
            >
              <div className="inline-block mb-4">
                <div className="w-20 h-20 rounded-full bg-[#e6f7f9] flex items-center justify-center mx-auto">
                  <Clock className="w-10 h-10 text-[#10a3b4]" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#10a3b4] mb-2">60</h3>
              <p className="text-gray-800">
                Idosos participando de atividades de saúde e bem-estar
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-[#10a3b4] mb-6">
              Testemunhos
            </h2>
            <p className="text-gray-800 text-lg">
              Veja como suas doações fazem a diferença na vida das pessoas:
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl p-8 shadow-soft relative"
            >
              <div className="absolute top-0 right-0 w-12 h-12 bg-[#e6f7f9] flex items-center justify-center rounded-bl-xl">
                <Heart className="w-6 h-6 text-[#10a3b4]" />
              </div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#e6f7f9] flex items-center justify-center mr-4">
                  <span className="text-[#10a3b4] font-bold">M</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Maria Silva</h4>
                  <p className="text-gray-600 text-sm">Beneficiária</p>
                </div>
              </div>
              <p className="text-gray-800 italic">
                "Graças ao Lar de Maria, minha vida mudou para melhor! As
                oficinas de capacitação me deram uma nova perspectiva e hoje
                tenho um emprego digno."
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl p-8 shadow-soft relative"
            >
              <div className="absolute top-0 right-0 w-12 h-12 bg-[#e6f7f9] flex items-center justify-center rounded-bl-xl">
                <Heart className="w-6 h-6 text-[#10a3b4]" />
              </div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#e6f7f9] flex items-center justify-center mr-4">
                  <span className="text-[#10a3b4] font-bold">J</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">João Pereira</h4>
                  <p className="text-gray-600 text-sm">Doador mensal</p>
                </div>
              </div>
              <p className="text-gray-800 italic">
                "Contribuir mensalmente com o Lar de Maria me dá a certeza de
                que estou ajudando a construir um futuro melhor para nossa
                comunidade. Ver os resultados é gratificante!"
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl p-8 shadow-soft relative"
            >
              <div className="absolute top-0 right-0 w-12 h-12 bg-[#e6f7f9] flex items-center justify-center rounded-bl-xl">
                <Heart className="w-6 h-6 text-[#10a3b4]" />
              </div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#e6f7f9] flex items-center justify-center mr-4">
                  <span className="text-[#10a3b4] font-bold">A</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Ana Oliveira</h4>
                  <p className="text-gray-600 text-sm">Voluntária</p>
                </div>
              </div>
              <p className="text-gray-800 italic">
                "Ser voluntária no Lar de Maria é uma experiência
                transformadora. Cada sorriso das crianças que ajudamos é uma
                recompensa inestimável."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-[#10a3b4] text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6">
              Junte-se a Nós Nessa Missão
            </h2>
            <p className="text-white/80 text-lg mb-10">
              Sua doação, por menor que seja, faz uma grande diferença na vida
              de quem mais precisa. Juntos, podemos construir um futuro melhor
              para todos.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#10a3b4] hover:bg-[#e6f7f9] font-medium py-3 px-8 rounded-full text-lg transition-all shadow-lg"
            >
              Faça Sua Doação
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default DoacoesPage;
