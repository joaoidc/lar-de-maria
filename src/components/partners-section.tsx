import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const partners = [
  {
    name: "Ipsun Engenharia",
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQF9r1YeGdu3cw/company-logo_200_200/company-logo_200_200/0/1647431883422/ipsun___manuteno_e_instalaes_industriais_ltda___me_logo?e=2147483647&v=beta&t=TKGhsrNI9Gv4stB2M4qWt-KTlK2LYSDfbOumFRkrN4M",
    url: "#",
  },
  {
    name: "TechSolutions Brasil",
    logo: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/lorem-ipsum-logo-design-template-198b7fdb1d0a1b972f8232b1a2319123_screen.jpg?ts=1679372636",
    url: "#",
  },
  {
    name: "Construtora Horizonte",
    logo: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/lorem-ipsum-logo-design-template-41292e364405af5884fab0899b980d3a_screen.jpg?ts=1680759649",
    url: "#",
  },
  {
    name: "Grupo Industrial Norte",
    logo: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/lorem-ipsum-logo-design-template-41292e364405af5884fab0899b980d3a_screen.jpg?ts=1680759649",
    url: "#",
  },
  {
    name: "Logística Express",
    logo: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/lorem-ipsum-logo-design-template-b994e42356986768a8b93d375cda1898_screen.jpg?ts=1687689411",
    url: "#",
  },
  {
    name: "Energia Sustentável S.A.",
    logo: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/lorem-ipsum-logo-design-template-41292e364405af5884fab0899b980d3a_screen.jpg?ts=1680759649",
    url: "#",
  },
  {
    name: "Metalúrgica Progresso",
    logo: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/lorem-ipsum-design-template-0b095ba6374ee9f151002dae7e277db0_screen.jpg?ts=1684370083",
    url: "#",
  },
  {
    name: "Consultoria Integrada",
    logo: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/lorem-ipsum-logo-design-template-41292e364405af5884fab0899b980d3a_screen.jpg?ts=1680759649",
    url: "#",
  },
];

export function PartnersSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-playfair text-[#10a3b4] mb-4">
            Nossos Parceiros
          </h2>
          <p className="text-gray-600">
            O Lar de Maria tem parceria com os órgãos mencionados abaixo e
            recebe prestadores de serviços
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative group"
        >
          <div className="partners-slider-container">
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={20}
              slidesPerView={2}
              loop={true}
              navigation={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 40,
                },
              }}
              className="py-8 px-8 sm:px-16"
            >
              {partners.map((partner, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    className="flex items-center justify-center p-4 sm:p-6"
                  >
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                      title={`Visitar ${partner.name}`}
                    >
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="h-24 sm:h-28 md:h-32 w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </a>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <style>{`
            .partners-slider-container .swiper-button-next,
            .partners-slider-container .swiper-button-prev {
              width: 40px;
              height: 40px;
              background-color: white;
              border-radius: 50%;
              box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
              opacity: 0;
              transition: all 0.3s ease;
            }

            @media (min-width: 640px) {
              .partners-slider-container .swiper-button-next,
              .partners-slider-container .swiper-button-prev {
                width: 48px;
                height: 48px;
              }
            }

            .partners-slider-container:hover .swiper-button-next,
            .partners-slider-container:hover .swiper-button-prev {
              opacity: 1;
            }

            .partners-slider-container .swiper-button-next:hover,
            .partners-slider-container .swiper-button-prev:hover {
              background-color: #f9fafb;
            }

            .partners-slider-container .swiper-button-next::after,
            .partners-slider-container .swiper-button-prev::after {
              font-size: 16px;
              color: #10a3b4;
            }

            @media (min-width: 640px) {
              .partners-slider-container .swiper-button-next::after,
              .partners-slider-container .swiper-button-prev::after {
                font-size: 20px;
              }
            }

            .partners-slider-container .swiper-button-prev {
              left: 0;
            }

            .partners-slider-container .swiper-button-next {
              right: 0;
            }
          `}</style>
        </motion.div>
      </div>
    </section>
  );
}
