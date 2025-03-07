import { motion } from "framer-motion";

const CTASection = () => {
  return (
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
            Junte-se a nós nesta jornada de amor, solidariedade e transformação
            social
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
  );
};

export default CTASection;
