import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { HeroBanner } from "../components/hero-banner";
import { PublicLayout } from "../components/PublicLayout";

export function ContatoPage() {
  return (
    <PublicLayout>
      <Helmet>
        <title>Contato | Lar de Maria</title>
        <meta
          name="description"
          content="Entre em contato com o Lar de Maria. Estamos aqui para ajudar e responder suas dúvidas."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white to-[#e6f7f9]">
        <HeroBanner
          logoUrl="https://res.cloudinary.com/dggewyuon/image/upload/v1740514162/5434w_wbwx8a.png"
          logoHeight={200}
          showHearts={true}
        />

        {/* Seção Principal de Contato */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 bg-[#10a3b4]/10 text-[#10a3b4] rounded-full text-sm font-medium mb-4">
                Fale Conosco
              </span>
              <h2 className="text-3xl lg:text-5xl font-playfair text-[#10a3b4] mb-6">
                Entre em Contato
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Estamos aqui para ouvir você. Entre em contato conosco e faça
                parte desta história de amor e solidariedade.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {/* Cards de Informações de Contato */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Card de Localização */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-[#10a3b4]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#10a3b4]/20 transition-colors">
                      <svg
                        className="w-6 h-6 text-[#10a3b4]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2 text-gray-800">
                        Nosso Endereço
                      </h4>
                      <p className="text-gray-600 mb-1">
                        Av. Alm. Barroso, 33 - São Brás
                      </p>
                      <p className="text-gray-600 mb-4">
                        Belém, PA - CEP: 66093-020
                      </p>
                      <a
                        href="https://maps.google.com/?q=Av. Alm. Barroso, 33 - São Brás, Belém, PA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-[#10a3b4] hover:text-[#0d8997] transition-colors"
                      >
                        <span>Ver no Google Maps</span>
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Card de Telefone e Email */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-[#10a3b4]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#10a3b4]/20 transition-colors">
                      <svg
                        className="w-6 h-6 text-[#10a3b4]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2 text-gray-800">
                        Fale Conosco
                      </h4>
                      <div className="space-y-3">
                        <a
                          href="tel:+559132230032"
                          className="flex items-center text-gray-600 hover:text-[#10a3b4] transition-colors"
                        >
                          <span className="mr-2">Telefone:</span>
                          <span>(91) 3223-0032</span>
                        </a>
                        <a
                          href="https://wa.me/5591985464442"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-600 hover:text-[#10a3b4] transition-colors"
                        >
                          <span className="mr-2">WhatsApp:</span>
                          <span>(91) 98546-4442</span>
                        </a>
                        <a
                          href="mailto:contato@lardemaria.org.br"
                          className="flex items-center text-gray-600 hover:text-[#10a3b4] transition-colors"
                        >
                          <span className="mr-2">E-mail:</span>
                          <span>contato@lardemaria.org.br</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Mapa */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow duration-300"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.626387537698!2d-48.47742542412454!3d-1.4483899987073074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92a48e8ef1ce5f3d%3A0x3f9c1cbe827d8af!2sAv.%20Alm.%20Barroso%2C%2033%20-%20S%C3%A3o%20Br%C3%A1s%2C%20Bel%C3%A9m%20-%20PA%2C%2066093-020!5e0!3m2!1spt-BR!2sbr!4v1709925163070!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </motion.div>

              {/* Horário de Funcionamento */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-[#10a3b4]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#10a3b4]/20 transition-colors">
                    <svg
                      className="w-6 h-6 text-[#10a3b4]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-gray-800">
                      Horário de Funcionamento
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-1">
                          Segunda a Sexta
                        </h5>
                        <p className="text-gray-600">08:00 às 18:00</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 mb-1">
                          Sábados
                        </h5>
                        <p className="text-gray-600">08:00 às 12:00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Redes Sociais */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12"
              >
                <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#10a3b4]/10 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-[#10a3b4]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                        />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800">
                      Redes Sociais
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.a
                      href="https://www.instagram.com/lardemariapara/"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#10a3b4]/20 bg-white text-gray-600 hover:text-[#10a3b4] hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#10a3b4]/10 flex items-center justify-center group-hover:bg-[#10a3b4]/20 transition-colors">
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </div>
                      <span className="font-medium text-lg">Instagram</span>
                    </motion.a>

                    <motion.a
                      href="https://www.facebook.com/lardemariapara/"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#10a3b4]/20 bg-white text-gray-600 hover:text-[#10a3b4] hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#10a3b4]/10 flex items-center justify-center group-hover:bg-[#10a3b4]/20 transition-colors">
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </div>
                      <span className="font-medium text-lg">Facebook</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}

export default ContatoPage;
