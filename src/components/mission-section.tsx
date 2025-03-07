import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Card {
  title: string;
  description: string | string[];
  isList: boolean;
  subtitle?: string;
}

const institutionalCards: Card[] = [
  {
    title: "Valores",
    description: [
      "Fidelidade",
      "Solidariedade",
      "Gestão",
      "Responsabilidade Social"
    ],
    isList: true
  },
  {
    title: "Negócio",
    description:
      "Promoção do homem integral.",
    isList: false
  },
  {
    title: "Missão",
    description: "Realizar ações de promoção humana, em seus múltiplos aspectos, balizadas nos princípios espíritas, contribuindo para a formação de redes de inclusão social.",
    isList: false
  },
  {
    title: "Visão",
    description: "Lar de Maria, integrado em suas atividades, ser reconhecido como referência no Movimento Espírita e na Rede Social, por meio do trabalho com crianças e adolescentes, extensivo as suas famílias até 1012.",
    isList: false
  }
];

const departmentCards: Card[] = [
  {
    title: "Valores",
    subtitle: "DEORD",
    description: [
      "Ser espírita",
      "Compromisso",
      "Afetividade",
      "Fraternidade",
      "Caridade",
      "Aprendizado Constante"
    ],
    isList: true
  },
  {
    title: "Negócio",
    subtitle: "DEORD",
    description: "Estudo, Difusão e Vivência da Doutrina Espírita",
    isList: false
  },
  {
    title: "Missão",
    subtitle: "DEORD",
    description: "Realizar ações de estudo, divulgação e vivência da Doutrina Espírita, contribuindo para a formação do homem de bem.",
    isList: false
  },
  {
    title: "Visão",
    subtitle: "DEORD",
    description: "União interna, excelência na área de estudos, conjugadas à ações práticas de caridade e ao movimento de unificação",
    isList: false
  },
  {
    title: "Valores",
    subtitle: "DEAPS",
    description: [
      "Inclusão Social",
      "Solidariedade",
      "Afetividade",
      "Responsabilidade Social",
      "Respeito à Diversidade",
      "Educação Integral"
    ],
    isList: true
  },
  {
    title: "Negócio",
    subtitle: "DEAPS",
    description: "Promoção Sócio-educacional do ser humano",
    isList: false
  },
  {
    title: "Missão",
    subtitle: "DEAPS",
    description: "Desenvolver programas, projetos sócio-educacionais voltados a crianças, adolescentes e idosos em situação de vulnerabilidade social, extensivos às suas famílias fundamentados na Metodologia do Ser Integral, ompondo a rede de inclusão social",
    isList: false
  },
  {
    title: "Visão",
    subtitle: "DEAPS",
    description: "Ser referência em atendimento sócio-educacional na Amazônia, até 2015",
    isList: false
  }
];

export function MissionSection() {
  const [showDepartments, setShowDepartments] = useState(false);

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dggewyuon/image/upload/v1740509133/2_pardxp.png')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          willChange: 'transform'
        }}
        animate={{
          height: showDepartments ? '150%' : '100%'
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        {/* Overlay mais suave */}
        <div className="absolute inset-0 bg-black/10"></div>
      </motion.div>

      {/* Background Pattern */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          height: showDepartments ? '150%' : '100%'
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        <div 
          className="absolute inset-0 bg-repeat opacity-10"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dggewyuon/image/upload/v1739215911/pattern_xtukqf.png')`,
            backgroundAttachment: 'fixed'
          }}
        ></div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título Institucional */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-playfair text-white text-center mb-12"
        >
          Institucional
        </motion.h2>

        {/* Cards Institucionais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {institutionalCards.map((card, index) => (
            <CardComponent key={card.title} card={card} index={index} />
          ))}
        </div>

        {/* Toggle Button para Departamentos */}
        <motion.button
          onClick={() => setShowDepartments(!showDepartments)}
          className="mx-auto flex items-center gap-2 bg-white/90 hover:bg-white text-[#10a3b4] px-6 py-3 rounded-full shadow-lg transition-all duration-300 mb-8"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showDepartments ? (
            <>
              Ocultar Departamentos <ChevronUp className="w-5 h-5" />
            </>
          ) : (
            <>
              Ver Departamentos <ChevronDown className="w-5 h-5" />
            </>
          )}
        </motion.button>

        {/* Departamentos com AnimatePresence */}
        <AnimatePresence>
          {showDepartments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                {/* DEORD */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-xl font-playfair text-white text-center mb-4 bg-[#10a3b4]/20 py-2 rounded-lg">
                    Departamento de Orientação Doutrinária
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-fr">
                    {departmentCards.slice(0, 4).map((card, index) => (
                      <CardComponent key={card.title + card.subtitle} card={card} index={index} isCompact={true} />
                    ))}
                  </div>
                </motion.div>

                {/* DEAPS */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-xl font-playfair text-white text-center mb-4 bg-[#10a3b4]/20 py-2 rounded-lg">
                    Departamento de Assistência e Promoção Social
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-fr">
                    {departmentCards.slice(4).map((card, index) => (
                      <CardComponent key={card.title + card.subtitle} card={card} index={index} isCompact={true} />
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// Componente de Card extraído para reutilização
function CardComponent({ card, index, isCompact = false }: { card: Card; index: number; isCompact?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{
        scale: 1.02,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
        },
      }}
      className={`group bg-white/95 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative h-full flex flex-col ${isCompact ? 'text-sm' : ''}`}
    >
      {/* Gradiente decorativo no topo */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#10a3b4] to-[#FF9F1C]" />
      
      <div className={`${isCompact ? 'p-4' : 'p-8'} flex flex-col flex-grow`}>
        <motion.div
          initial={{ scale: 0.5 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.2 }}
          className={`${isCompact ? 'mb-3' : 'mb-6'}`}
        >
          {/* Ícones para cada tipo de card */}
          <div className={`${isCompact ? 'mb-2' : 'mb-4'}`}>
            {card.title === "Valores" && (
              <div className={`${isCompact ? 'w-8 h-8' : 'w-12 h-12'} rounded-lg bg-[#10a3b4]/10 flex items-center justify-center mb-2`}>
                <svg className={`${isCompact ? 'w-4 h-4' : 'w-6 h-6'} text-[#10a3b4]`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            )}
            {card.title === "Negócio" && (
              <div className={`${isCompact ? 'w-8 h-8' : 'w-12 h-12'} rounded-lg bg-[#10a3b4]/10 flex items-center justify-center mb-2`}>
                <svg className={`${isCompact ? 'w-4 h-4' : 'w-6 h-6'} text-[#10a3b4]`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            {card.title === "Missão" && (
              <div className={`${isCompact ? 'w-8 h-8' : 'w-12 h-12'} rounded-lg bg-[#10a3b4]/10 flex items-center justify-center mb-2`}>
                <svg className={`${isCompact ? 'w-4 h-4' : 'w-6 h-6'} text-[#10a3b4]`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            )}
            {card.title === "Visão" && (
              <div className={`${isCompact ? 'w-8 h-8' : 'w-12 h-12'} rounded-lg bg-[#10a3b4]/10 flex items-center justify-center mb-2`}>
                <svg className={`${isCompact ? 'w-4 h-4' : 'w-6 h-6'} text-[#10a3b4]`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <h3 className={`${isCompact ? 'text-lg' : 'text-2xl'} font-playfair text-gray-800 group-hover:text-[#10a3b4] transition-colors`}>
              {card.title}
            </h3>
            {card.subtitle && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#10a3b4]/10 text-[#10a3b4]">
                {card.subtitle}
              </span>
            )}
          </div>
        </motion.div>

        {card.isList && Array.isArray(card.description) ? (
          <ul className="text-gray-600 leading-relaxed space-y-2 flex-grow">
            {card.description.map((item: string, i: number) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="flex items-center group"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF9F1C] mr-2 group-hover:scale-125 transition-transform"></div>
                <span className="group-hover:text-gray-800 transition-colors">{item}</span>
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className={`text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors flex-grow ${isCompact ? 'text-sm' : ''}`}>
            {card.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
