import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  {
    url: "https://www.oliberal.com/image/contentid/policy:1.575325:1660619109/Lar-de-Maria-foto-Marcio-Nagano-13.jpg?f=2x1&$p$f=dc4309d&w=1500&$w=f075b93",
    alt: "Fachada do Lar de Maria",
  },
  {
    url: "https://res.cloudinary.com/dggewyuon/image/upload/v1739213745/Lar-de-Maria_1_nbehbv.png",
    alt: "Instalações do Lar de Maria",
  },
];

export function AboutSection() {
  return (
    <section className="bg-[#10B5B5] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-3xl lg:text-4xl font-playfair mb-6">
              Quem somos
            </h2>
            <p className="text-white/90 mb-6">
              "O Lar de Maria foi fundado em 15 de agosto de 1947, como uma casa
              de assistência social, cuja finalidade era atender crianças e
              idosos em situação de vulnerabilidade."
            </p>
            <p className="text-white/80 mb-8">
              Entre os idealizadores e articuladores de sua construção temos
              Oswaldo de Assunção Castro, Olga Castro, que muito embalam pelo
              seu sonho de filantropia, entre empreendedores. Mas também muitos
              outros nomes se tornaram a materialização desse ideal como Pacheco
              e esposa (a) Manoel, Ferreira, Ferro Pacheco, José Antunes,
              Godomar Antunes, Maria Antunes e Alberto Milhomens.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#10B5B5] px-6 py-2 rounded-full font-medium hover:bg-white/90 transition-colors"
            >
              Conheça mais
            </motion.button>
          </motion.div>

          {/* Carrossel de Imagens */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative rounded-lg overflow-hidden shadow-xl"
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              className="w-full rounded-lg"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="relative"
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-[400px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
