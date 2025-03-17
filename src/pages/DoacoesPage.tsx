import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Heart, Handshake, Users, Gift } from "lucide-react";
import DoarButton from "../components/DoarButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { PublicLayout } from "../components/PublicLayout";

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
    <PublicLayout>
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
          <div className="absolute inset-0 bg-[url('public/images/img-27.JPG')] bg-cover bg-center opacity-30" />
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
                Sua contribuição é fundamental para continuarmos nosso trabalho
                de transformação social. Cada gesto de generosidade nos ajuda a
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
                  <Gift className="w-8 h-8 text-[#10a3b4]" />
                </div>
                <h3 className="text-2xl font-bold text-[#10a3b4] mb-4">
                  Faça uma Doação
                </h3>
                <p className="text-gray-800 mb-6">
                  Toda forma de apoio é valiosa! Doações de alimentos e outros
                  recursos ajudam a fortalecer nossa missão.
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
                <button
                  className="border-2 border-[#10a3b4] text-[#10a3b4] hover:bg-[#10a3b4] hover:text-white font-medium py-2 px-6 rounded-full transition-all"
                  onClick={() => {
                    window.location.href =
                      "https://wa.me/5591985464442?text=Gostaria%20de%20saber%20mais%20sobre%20como%20posso%20me%20voluntariar%20no%20Lar%20de%20Maria";
                  }}
                >
                  Me voluntariar
                </button>
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

        {/* Empresas que Contribuíram */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center max-w-3xl mx-auto mb-8"
            >
              <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-[#10a3b4] mb-14">
                Nossos maiores Patrocinadores
              </h2>
              <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={2}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                breakpoints={{
                  640: { slidesPerView: 3 },
                  768: { slidesPerView: 4 },
                  1024: { slidesPerView: 5 },
                }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-800 text-lg"
              >
                <SwiperSlide className="flex flex-col items-center">
                  <img
                    src="https://www.acriancafeliz.org.br/assets/site/images/logo_criancaFeliz.png"
                    alt="Associação Criança Feliz"
                    className="h-16"
                  />
                  <span>Associação Criança Feliz</span>
                </SwiperSlide>
                <SwiperSlide className="flex flex-col items-center">
                  <img
                    src="https://uep.net.br/wp-content/uploads/2021/08/cropped-cropped-perfil-1536x922.png"
                    alt="União Espirita Paraense"
                    className="h-16"
                  />
                  <span>União Espirita Paraense</span>
                </SwiperSlide>
                <SwiperSlide className="flex flex-col items-center">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0eLQsadqXRyOQPFMWgMWMU1GuPFm06VQx4w&s"
                    alt="Faculdade Cosmopolita"
                    className="h-16"
                  />
                  <span>Faculdade Cosmopolita</span>
                </SwiperSlide>
                <SwiperSlide className="flex flex-col items-center">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuerB7twy9ba1DT9OzlcVA95xW986xQcjBmA&s"
                    alt="Fundação Carlos Gomes"
                    className="h-16"
                  />
                  <span>Fundação Carlos Gomes</span>
                </SwiperSlide>
                <SwiperSlide className="flex flex-col items-center">
                  <img
                    src="https://bancariosro.com.br/wp-content/uploads/2021/07/logo-Banco-da-Amazo%CC%82nia.jpg"
                    alt="Banco da Amazônia"
                    className="h-16"
                  />
                  <span>Banco da Amazônia</span>
                </SwiperSlide>
                <SwiperSlide className="flex flex-col items-center">
                  <img
                    src="https://media.licdn.com/dms/image/v2/C4E0BAQGO-YH9uGy9Lw/company-logo_200_200/company-logo_200_200/0/1630641938887/inteceleri_logo?e=2147483647&v=beta&t=Am1E91v4V-gM-IgHRS4qUezGElss6Meay7SGHiqLD9c"
                    alt="INTECELERI"
                    className="h-16"
                  />
                  <span>INTECELERI</span>
                </SwiperSlide>
                <SwiperSlide className="flex flex-col items-center">
                  <img
                    src="https://mpt.mp.br/++theme++mpt/images/logo_padrao.png"
                    alt="MPT"
                    className="h-16"
                  />
                  <span>MPT</span>
                </SwiperSlide>
                <SwiperSlide className="flex flex-col items-center">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRzD_Kv6eGUDyV-hJzD1nVQDK1lW8xkj9AfA&s"
                    alt="AA"
                    className="h-16"
                  />
                  <span>AA</span>
                </SwiperSlide>
                <SwiperSlide className="flex flex-col items-center">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfJk1UcZkNt60NSdx3Cx3rkTMoVPFscNWHaA&s"
                    alt="Amor Exigente"
                    className="h-16"
                  />
                  <span>Amor Exigente</span>
                </SwiperSlide>
                <SwiperSlide className="flex flex-col items-center">
                  <img
                    src="https://ufpa.br/wp-content/uploads/2023/12/Brasao-UFPA-com-descritivo-colorido.png"
                    alt="UFPA"
                    className="h-16"
                  />
                  <span>UFPA</span>
                </SwiperSlide>
                <SwiperSlide className="flex flex-col items-center">
                  <img
                    src="https://res.cloudinary.com/dggewyuon/image/upload/v1739452635/grupr018203_z96fyl.png"
                    alt="Renascer PA"
                    className="h-16"
                  />
                  <span>Renascer PA</span>
                </SwiperSlide>
              </Swiper>
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
                onClick={() => {
                  window.location.href = "/doaragora";
                }}
              >
                Como posso ajudar?
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}

export default DoacoesPage;
