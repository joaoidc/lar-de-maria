import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { QrCode, CreditCard, MapPin, Heart, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Donations = () => {
  const [copied, setCopied] = useState(false);
  const bankInfo = {
    bank: "Banco do Brasil",
    agency: "1234-5",
    account: "12345-6",
    holder: "Lar de Maria",
    cnpj: "12.345.678/0001-90",
    pix: "12345678000190",
  };

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(bankInfo.pix);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <>
      <Helmet>
        <title>Doações - Lar de Maria</title>
        <meta
          name="description"
          content="Descubra como você pode ajudar o Lar de Maria a manter os trabalhos sociais."
        />
      </Helmet>

      {/* Hero Section com animação */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[600px] overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://static.vecteezy.com/ti/vetor-gratis/p1/1311572-banner-moderno-claro-azul-poligono-gratis-vetor.jpg"
            alt="Banner de doações"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <Heart className="h-16 w-16 text-white mx-auto" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-8 text-4xl md:text-5xl lg:text-6xl font-playfair text-white text-center max-w-4xl mx-auto leading-tight"
          >
            Transforme Vidas Através da Sua Doação
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 max-w-2xl mx-auto text-center"
          >
            <p className="text-xl md:text-2xl text-white/90 font-light">
              Sua contribuição é o alicerce que sustenta nossa missão.
            </p>
            <p className="mt-4 text-lg md:text-xl text-white/80">
              Juntos, podemos continuar transformando a vida de crianças, jovens
              e famílias.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Opções de Doação com animações */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Doação Online */}
            <motion.div
              variants={fadeIn}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-lg p-8 shadow-sm"
            >
              <h2 className="text-2xl font-playfair text-[#10a3b4] mb-6">
                Doação Online
              </h2>

              {/* PIX */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <QrCode className="h-6 w-6 text-[#10B5B5]" />
                  <h3 className="ml-2 text-xl font-semibold text-gray-900">
                    PIX
                  </h3>
                </div>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-full">
                    <p className="text-gray-600 mb-4">
                      Faça sua doação instantaneamente via PIX usando nossa
                      chave CNPJ:
                    </p>
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200 flex items-center justify-between">
                      <p className="font-mono text-gray-900">{bankInfo.pix}</p>
                      <button
                        onClick={handleCopyPix}
                        className="ml-4 p-2 text-gray-600 hover:text-[#10B5B5] focus:outline-none transition-colors"
                        title="Copiar chave PIX"
                      >
                        {copied ? (
                          <Check className="h-5 w-5 text-green-600" />
                        ) : (
                          <Copy className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {copied && (
                      <p className="text-sm text-green-600 mt-2">
                        Chave PIX copiada com sucesso!
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <img
                      src="https://media.istockphoto.com/id/1095468748/pt/vetorial/qr-code-abstract-vector-modern-bar-code-sample-for-smartphone-scanning-isolated-on-white.jpg?s=612x612&w=0&k=20&c=Sr77lnSxfnkUBiPUpk44mHmCdGueNSG0vrvCGcRCol8="
                      alt="QR Code PIX"
                      className="w-32 h-32 object-cover rounded-lg shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Transferência Bancária */}
              <div>
                <div className="flex items-center mb-4">
                  <CreditCard className="h-6 w-6 text-[#10B5B5]" />
                  <h3 className="ml-2 text-xl font-semibold text-gray-900">
                    Transferência Bancária
                  </h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <strong>Banco:</strong> {bankInfo.bank}
                  </p>
                  <p>
                    <strong>Agência:</strong> {bankInfo.agency}
                  </p>
                  <p>
                    <strong>Conta:</strong> {bankInfo.account}
                  </p>
                  <p>
                    <strong>Titular:</strong> {bankInfo.holder}
                  </p>
                  <p>
                    <strong>CNPJ:</strong> {bankInfo.cnpj}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Doações Físicas */}
            <motion.div
              variants={fadeIn}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-lg p-8 shadow-sm"
            >
              <div className="flex items-center mb-6">
                <MapPin className="h-6 w-6 text-[#10B5B5]" />
                <h2 className="ml-2 text-2xl font-playfair text-[#10a3b4]">
                  Doações Físicas
                </h2>
              </div>

              <p className="text-gray-600 mb-6">Aceitamos doações de:</p>

              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-8">
                <li>Alimentos não perecíveis</li>
                <li>Roupas em bom estado</li>
                <li>Material de higiene pessoal</li>
                <li>Material escolar</li>
                <li>Cobertores e agasalhos</li>
              </ul>

              <div className="bg-gray-50 p-6 rounded-md border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Local de Entrega
                </h3>
                <p className="text-gray-600 mb-2">
                  Rua Example, 123 - São Paulo/SP
                </p>
                <p className="text-gray-600 mb-4">CEP: 01234-567</p>

                <h4 className="font-medium text-gray-900 mb-2">
                  Horário para doações:
                </h4>
                <ul className="text-gray-600">
                  <li>Segunda a Sexta: 9h às 18h</li>
                  <li>Sábado: 9h às 12h</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Impacto das Doações com animações */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={fadeIn}
            className="text-3xl font-playfair text-[#10a3b4] text-center mb-12"
          >
            O Impacto de Sua Doação
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Assistência Social",
                description:
                  "Suas doações ajudam a manter nossos programas de assistência a famílias em situação de vulnerabilidade.",
              },
              {
                title: "Manutenção da Casa",
                description:
                  "Contribui para a manutenção do espaço físico e das atividades doutrinárias da casa.",
              },
              {
                title: "Projetos Sociais",
                description:
                  "Permite a realização de projetos sociais e educacionais junto à comunidade.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gray-50 p-6 rounded-lg shadow-sm"
              >
                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="text-xl font-semibold text-[#10a3b4] mb-4"
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.1 }}
                  className="text-gray-600"
                >
                  {item.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Donations;
