import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const partners = [
  {
    name: "Associação Criança Feliz",
    logo: "https://www.acriancafeliz.org.br/assets/site/images/logo_criancaFeliz.png",
    url: "https://www.acriancafeliz.org.br/doar?utm_source=google&utm_medium=cpc&utm_campaign=doacao&utm_term=doacao&utm_content=ad-grants&gad_source=1",
  },
  {
    name: "União Espirita Paraense",
    logo: "https://uep.net.br/wp-content/uploads/2021/08/cropped-cropped-perfil-1536x922.png",
    url: "https://uep.net.br/",
  },
  {
    name: "Faculdade Cosmopolita",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0eLQsadqXRyOQPFMWgMWMU1GuPFm06VQx4w&s",
    url: "https://faculdadecosmopolita.edu.br/",
  },
  {
    name: "Fundação Carlos Gomes",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuerB7twy9ba1DT9OzlcVA95xW986xQcjBmA&s",
    url: "https://www.fcg.pa.gov.br/",
  },
  {
    name: "Banco da Amazônia",
    logo: "https://bancariosro.com.br/wp-content/uploads/2021/07/logo-Banco-da-Amazo%CC%82nia.jpg",
    url: "https://www.bancoamazonia.com.br/",
  },
  {
    name: "INTECELERI",
    logo: "https://media.licdn.com/dms/image/v2/C4E0BAQGO-YH9uGy9Lw/company-logo_200_200/company-logo_200_200/0/1630641938887/inteceleri_logo?e=2147483647&v=beta&t=Am1E91v4V-gM-IgHRS4qUezGElss6Meay7SGHiqLD9c",
    url: "https://www.inteceleri.com.br/",
  },
  {
    name: "MPT",
    logo: "https://mpt.mp.br/++theme++mpt/images/logo_padrao.png",
    url: "https://mpt.mp.br/",
  },
  {
    name: "AA",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRzD_Kv6eGUDyV-hJzD1nVQDK1lW8xkj9AfA&s",
    url: "https://www.aa.org.br/",
    imageClassName:
      "h-16 sm:h-20 md:h-24 w-[100px] object-contain grayscale hover:grayscale-0 transition-all duration-300",
  },
  {
    name: "Amor Exigente",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfJk1UcZkNt60NSdx3Cx3rkTMoVPFscNWHaA&s",
    url: "https://amorexigente.org/",
  },
  {
    name: "UFPA",
    logo: "https://ufpa.br/wp-content/uploads/2023/12/Brasao-UFPA-com-descritivo-colorido.png",
    url: "https://ufpa.br/",
  },
  {
    name: "Renascer PA",
    logo: "https://res.cloudinary.com/dggewyuon/image/upload/v1739452635/grupr018203_z96fyl.png",
    url: "https://www.instagram.com/renascer_pa/?hl=pt",
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
                      className="block w-[200px] h-[120px] sm:h-[140px] md:h-[160px] flex items-center justify-center"
                      title={`Visitar ${partner.name}`}
                    >
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className={
                          partner.imageClassName ||
                          "h-24 sm:h-28 md:h-32 w-[200px] object-contain grayscale hover:grayscale-0 transition-all duration-300"
                        }
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
