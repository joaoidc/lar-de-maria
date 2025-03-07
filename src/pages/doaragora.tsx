import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Copy,
  QrCode,
  CreditCard,
  Gift,
  Heart,
  Phone,
  Building,
} from "lucide-react";
import { useState } from "react";

export function DoarAgora() {
  const [copied, setCopied] = useState(false);

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText("000000");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#e6f7f9] font-sans">
      <Helmet>
        <title>Doar Agora | Lar de Maria</title>
        <meta
          name="description"
          content="Faça sua doação ao Lar de Maria através de PIX, transferência bancária ou outras formas de contribuição."
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>
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
              Faça Sua Doação Agora
            </h1>
            <p className="text-gray-800 text-lg md:text-xl mb-10 leading-relaxed">
              Sua doação é um ato de amor que nos ajuda a manter nossas
              atividades e levar conforto a quem mais precisa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Donation Methods */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-[#10a3b4] mb-6">
              Formas de Doação
            </h2>
            <p className="text-gray-800 text-lg">
              Escolha a forma mais conveniente para você contribuir com nossa
              causa.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {/* PIX Method */}
            <motion.div
              variants={fadeIn}
              className="bg-white rounded-2xl shadow-card p-8 text-center hover:shadow-lg transition-all border-t-4 border-[#10a3b4]"
            >
              <div className="bg-[#e6f7f9] p-4 rounded-full inline-flex items-center justify-center mb-6">
                <QrCode className="w-8 h-8 text-[#10a3b4]" />
              </div>
              <h3 className="text-2xl font-bold text-[#10a3b4] mb-4">
                Escaneie o QR Code
              </h3>
              <div className="flex justify-center mb-6">
                <img
                  src="https://res.cloudinary.com/dggewyuon/image/upload/v1740514162/qr-code-example.png"
                  alt="QR Code"
                  className="w-48 h-48 border-4 border-[#e6f7f9] rounded-lg shadow-md"
                />
              </div>
              <p className="text-gray-800 mb-4">
                Abra o aplicativo do seu banco, escaneie o QR Code e confirme a
                doação.
              </p>
              <div className="flex flex-col items-center mt-4">
                <p className="text-gray-700 mb-2">
                  ou fale diretamente conosco
                </p>
                <a
                  href="https://wa.me/5599999999999" // Substitua pelo número de telefone real
                  className="bg-[#25D366] text-white font-medium py-3 px-8 rounded-full text-lg transition-all shadow-lg"
                >
                  Fale Conosco no WhatsApp
                </a>
              </div>
            </motion.div>

            {/* PIX Key Method */}
            <motion.div
              variants={fadeIn}
              className="bg-white rounded-2xl shadow-card p-8 text-center hover:shadow-lg transition-all border-t-4 border-[#10a3b4]"
            >
              <div className="bg-[#e6f7f9] p-4 rounded-full inline-flex items-center justify-center mb-6">
                <CreditCard className="w-8 h-8 text-[#10a3b4]" />
              </div>
              <h3 className="text-2xl font-bold text-[#10a3b4] mb-4">
                Copie a Chave PIX
              </h3>
              <div className="bg-[#f8fcfd] p-6 rounded-xl mb-6 shadow-inner">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 p-3">
                    <span className="font-medium text-gray-800">00000000</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={copyToClipboard}
                      className={`${
                        copied ? "bg-green-500" : "bg-[#10a3b4]"
                      } text-white rounded-lg px-4 py-2 flex items-center transition-all duration-300`}
                    >
                      {copied ? "Copiado!" : "Copiar"}{" "}
                      <Copy className="w-4 h-4 ml-2" />
                    </motion.button>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4 text-left">
                <h4 className="text-lg font-semibold text-[#10a3b4] mb-3 border-b border-gray-100 pb-2">
                  Informações do Beneficiário
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Heart className="w-5 h-5 text-[#10a3b4] mr-2" />
                    <p>
                      <strong>Nome:</strong> Lar de Maria Financeiro
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-[#10a3b4] mr-2" />
                    <p>
                      <strong>Tipo de chave:</strong> Telefone
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Building className="w-5 h-5 text-[#10a3b4] mr-2" />
                    <p>
                      <strong>Banco:</strong> Nome do Banco
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Donation Items */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-[#10a3b4] mb-6">
              Como Você Pode Nos Ajudar
            </h2>
            <p className="text-gray-800 text-lg">
              Além de doações financeiras, você também pode contribuir com itens
              que fazem a diferença no dia a dia.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto"
          >
            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl p-6 text-center shadow-soft hover:shadow-md transition-all"
            >
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Doando Brinquedos"
                  className="w-full h-40 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-0 right-0 bg-[#10a3b4] text-white p-2 rounded-bl-lg">
                  <Gift className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#10a3b4] mb-2">
                Brinquedos
              </h3>
              <p className="text-gray-700">
                Brinquedos novos ou em bom estado para nossas crianças
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl p-6 text-center shadow-soft hover:shadow-md transition-all"
            >
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1506617564039-2f3b650b7010?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Doando Alimentos Não Perecíveis"
                  className="w-full h-40 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-0 right-0 bg-[#10a3b4] text-white p-2 rounded-bl-lg">
                  <Gift className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#10a3b4] mb-2">
                Alimentos
              </h3>
              <p className="text-gray-700">
                Alimentos não perecíveis para nossas refeições
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl p-6 text-center shadow-soft hover:shadow-md transition-all"
            >
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Doando Roupas"
                  className="w-full h-40 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-0 right-0 bg-[#10a3b4] text-white p-2 rounded-bl-lg">
                  <Gift className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#10a3b4] mb-2">Roupas</h3>
              <p className="text-gray-700">
                Roupas em bom estado para todas as idades
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl p-6 text-center shadow-soft hover:shadow-md transition-all"
            >
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1524578271613-d550eacf6090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Doando Livros"
                  className="w-full h-40 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-0 right-0 bg-[#10a3b4] text-white p-2 rounded-bl-lg">
                  <Gift className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#10a3b4] mb-2">Livros</h3>
              <p className="text-gray-700">
                Livros para nossa biblioteca comunitária
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
              Cada Contribuição Faz a Diferença
            </h2>
            <p className="text-white/80 text-lg mb-10">
              Sua doação, por menor que seja, tem um impacto significativo na
              vida de quem mais precisa. Agradecemos de coração por sua
              generosidade. Qualquer duvida ou sugestão, estamos a disposição.
            </p>
            <motion.a
              href="https://wa.me/5599999999999"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#10a3b4] hover:bg-[#e6f7f9] font-medium py-3 px-8 rounded-full text-lg transition-all shadow-lg inline-flex items-center"
            >
              <Heart className="w-5 h-5 mr-2" /> Fale Conosco no WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default DoarAgora;
