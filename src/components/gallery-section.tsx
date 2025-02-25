import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { Link } from "react-router-dom";

const images = Array.from({ length: 51 }, (_, i) => {
  const imageNumber = i + 1;
  return {
    url: `/images/img-${imageNumber}.JPG`, // Imagem principal
    fallbackUrl: `/images/img-${imageNumber}.jpg`, // Fallback para JPG minúsculo
    description: "Momentos especiais de nossas ações sociais",
  };
});

export function GallerySection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-[#e6f7f9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-playfair text-[#10a3b4] mb-4">
            Galeria de Imagens
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Confira alguns momentos especiais junto conosco
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Swiper
            modules={[Autoplay, Navigation, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
              },
              1024: {
                slidesPerView: 2.5,
              },
            }}
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 200,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              reverseDirection: false,
            }}
            speed={1000}
            navigation={true}
            className="w-full py-12 px-4"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-xl overflow-hidden shadow-2xl mx-4"
                >
                  <img
                    src={image.url}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== image.fallbackUrl) {
                        target.src = image.fallbackUrl;
                      }
                    }}
                    alt="Momento especial de nossas ações sociais"
                    className="w-full h-[400px] object-cover"
                    loading="lazy" // Lazy loading para melhor performance
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white hidden">
                      <p className="text-sm opacity-90">{image.description}</p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <div className="text-center mt-12">
          <Link
            to="/galeria"
            className="inline-flex items-center justify-center px-8 py-3 bg-[#10a3b4] text-white rounded-full font-medium hover:bg-[#0d8997] transition-all duration-300 transform hover:scale-105"
          >
            <span>Ver todas as fotos</span>
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
