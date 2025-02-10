import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const news = [
  {
    image:
      "https://res.cloudinary.com/dggewyuon/image/upload/v1739214479/Mask_Group_dnn4g0.png",
    title: "Lar de Maria reforça Evangelização em ações integradas",
    description:
      "Jesus ensinava por meio das palavras e das ações, ou seja, dava ele próprio o exemplo da prática do bem. E essa prática serve de norte para as ações dos trabalhadores do Lar de Maria, instituição que acaba de completar...",
    link: "/noticias/evangelizacao-acoes-integradas",
  },
  {
    image:
      "https://res.cloudinary.com/dggewyuon/image/upload/v1739214479/Mask_Group1_szuwni.png",
    title:
      "Lar de Maria comemora 75 anos de ações com programação para a família",
    description:
      "Para marcar o transcurso de 75 anos de funcionamento a ocorrer no próximo dia 15 de agosto de 2022, o Lar de Maria desenvolverá ampla programação com foco na formação moral das famílias, em especial, na dos adolescentes e jovens...",
    link: "/noticias/75-anos-programacao-familia",
  },
  {
    image:
      "https://res.cloudinary.com/dggewyuon/image/upload/v1739214479/40-2_1_fhwoao.png",
    title:
      'Evangelização: Miriam Dusi compartilha "A Grande Viagem" com evangelizadores do Pará',
    description:
      "O que uma pessoa pode tomar para ser feliz no Planeta Terra, um Mundo de Provas e Expiações? Ela precisa tomar atitudes. Essa foi uma das muitas mensagens transmitidas aos trabalhadores da Evangelização Infantojuvenil do Lar de Maria por Miriam...",
    link: "/noticias/evangelizacao-miriam-dusi",
  },
];

export function NewsSection() {
  return (
    <section className="py-12 lg:py-24 bg-gray-50 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 lg:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-playfair text-[#10a3b4] mb-2 sm:mb-4">
            Últimas notícias
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Fique por dentro das últimas notícias
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {news.map((item, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{
                scale: [null, 1.03],
                y: [null, -5],
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer touch-manipulation mx-0"
            >
              <Link to={item.link} className="block">
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.3 },
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-black/20"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <motion.div
                  className="p-3 sm:p-4 lg:p-6"
                  whileHover={{ backgroundColor: "#f8f9fa" }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-3">
                    {item.description}
                  </p>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="inline-flex items-center text-[#10B5B5] hover:text-[#0D9999] transition-colors group text-sm sm:text-base"
                  >
                    <span>Conheça mais</span>
                    <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                  </motion.div>
                </motion.div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-10 lg:mt-12 text-center"
        >
          <Link
            to="/noticias"
            className="inline-block bg-[#10B5B5] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-[#0D9999] transition-colors text-sm sm:text-base"
          >
            Mais notícias
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
