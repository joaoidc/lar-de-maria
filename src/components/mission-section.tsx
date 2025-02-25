import { motion } from "framer-motion";

const cards = [
  {
    title: "Nossa Missão",
    description:
      "Promover assistência social e educacional para crianças e idosos em situação de vulnerabilidade, baseando-se nos princípios de amor e caridade da doutrina espírita.",
  },
  {
    title: "Nossa Visão",
    description:
      "Ser referência em assistência e acolhimento, expandindo projetos que transformem vidas e fortaleçam valores éticos e morais, contribuindo para uma sociedade mais justa e solidária.",
  },
  {
    title: "Nossos Valores",
    description:
      "Compromisso com a caridade, solidariedade, ética, respeito ao próximo e dedicação ao bem-estar social, guiados pelos ensinamentos do espiritismo.",
  },
];

export function MissionSection() {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://res.cloudinary.com/dggewyuon/image/upload/v1740509133/2_pardxp.png"
          alt=""
          className="w-full h-full object-cover opacity-80"
        />
        {/* Overlay mais suave */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dggewyuon/image/upload/v1739215911/pattern_xtukqf.png')] bg-repeat opacity-10"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                },
              }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative cursor-pointer"
            >
              {/* Borda laranja */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#FF9F1C]" />

              <div className="p-6 pl-8">
                <motion.div
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.2 }}
                >
                  <h3 className="text-2xl font-playfair text-[#10a3b4] mb-4">
                    {card.title}
                  </h3>
                </motion.div>
                <p className="text-gray-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
