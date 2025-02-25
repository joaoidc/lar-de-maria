import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { HeroBanner } from "../components/hero-banner";

export function ContatoPage() {
  return (
    <>
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

            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {/* Formulário de Contato */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-xl p-6 lg:p-8 relative overflow-hidden h-full"
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310a3b4' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
                  </div>

                  <div className="relative flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-xl bg-[#10a3b4] flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-playfair text-[#10a3b4]">
                        Envie sua Mensagem
                      </h3>
                    </div>

                    <form className="space-y-6 flex-grow">
                      <div className="group">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-[#10a3b4] transition-colors"
                        >
                          Nome Completo
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#10a3b4] focus:border-transparent transition-all duration-300 outline-none"
                          placeholder="Digite seu nome"
                        />
                      </div>
                      <div className="group">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-[#10a3b4] transition-colors"
                        >
                          E-mail
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#10a3b4] focus:border-transparent transition-all duration-300 outline-none"
                          placeholder="Digite seu e-mail"
                        />
                      </div>
                      <div className="group">
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-[#10a3b4] transition-colors"
                        >
                          Assunto
                        </label>
                        <input
                          type="text"
                          id="subject"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#10a3b4] focus:border-transparent transition-all duration-300 outline-none"
                          placeholder="Digite o assunto"
                        />
                      </div>
                      <div className="group flex-grow">
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-[#10a3b4] transition-colors"
                        >
                          Mensagem
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#10a3b4] focus:border-transparent transition-all duration-300 outline-none resize-none"
                          placeholder="Digite sua mensagem"
                        ></textarea>
                      </div>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-[#10a3b4] text-white py-4 px-6 rounded-xl hover:bg-[#0d8997] transition-all duration-300 font-medium shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                      >
                        <span>Enviar Mensagem</span>
                        <svg
                          className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </motion.button>
                    </form>
                  </div>
                </motion.div>

                {/* Informações de Contato */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8 flex flex-col"
                >
                  {/* Card de Informações */}
                  <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden flex-grow border border-gray-100">
                    <div className="relative space-y-8">
                      <div className="flex items-center gap-3 mb-8">
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
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-playfair text-gray-800">
                          Informações de Contato
                        </h3>
                      </div>

                      <div className="space-y-8">
                        <motion.div
                          className="flex items-start gap-4 hover:translate-x-2 transition-transform cursor-pointer group"
                          whileHover={{ scale: 1.02 }}
                        >
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
                            <h4 className="text-lg font-semibold mb-1 text-gray-800">
                              Endereço
                            </h4>
                            <p className="text-gray-600">
                              Av. Alm. Barroso, 33 - São Brás
                            </p>
                            <p className="text-gray-600">
                              Belém, PA - CEP: 66093-020
                            </p>
                          </div>
                        </motion.div>

                        <motion.div
                          className="flex items-start gap-4 hover:translate-x-2 transition-transform cursor-pointer group"
                          whileHover={{ scale: 1.02 }}
                        >
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
                            <h4 className="text-lg font-semibold mb-1 text-gray-800">
                              Telefone
                            </h4>
                            <p className="text-gray-600">(91) 3229-1259</p>
                          </div>
                        </motion.div>

                        <motion.div
                          className="flex items-start gap-4 hover:translate-x-2 transition-transform cursor-pointer group"
                          whileHover={{ scale: 1.02 }}
                        >
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
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold mb-1 text-gray-800">
                              E-mail
                            </h4>
                            <p className="text-gray-600">
                              contato@lardemaria.org.br
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Card de Redes Sociais */}
                  <div className="bg-white rounded-xl shadow-xl p-6 lg:p-8 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310a3b4' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
                    </div>

                    <div className="relative">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-[#10a3b4] flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-playfair text-[#10a3b4]">
                          Redes Sociais
                        </h3>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <motion.a
                          href="https://www.instagram.com/lardemariapara/"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transition-all duration-300"
                        >
                          <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                          </div>
                          <span className="font-medium">Instagram</span>
                        </motion.a>

                        <motion.a
                          href="https://www.facebook.com/lardemariapara/?locale=pt_BR"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-3 p-4 rounded-xl bg-[#1877f2] text-white hover:shadow-lg transition-all duration-300"
                        >
                          <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                          </div>
                          <span className="font-medium">Facebook</span>
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção do Mapa */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="w-full h-[300px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.5651717809513!2d-48.47724542412454!3d-1.4523899987073074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92a48e8ef1b35c3b%3A0x4c8c0ff5ea420d85!2sAv.%20Alm.%20Barroso%2C%2033%20-%20S%C3%A3o%20Br%C3%A1s%2C%20Bel%C3%A9m%20-%20PA%2C%2066093-020!5e0!3m2!1spt-BR!2sbr!4v1709351547372!5m2!1spt-BR!2sbr"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Seção Final com CTA */}
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
                Sua mensagem é muito importante para nós. Estamos ansiosos para
                ouvir você!
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
                  href="/quem-somos"
                  className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors duration-300 text-center"
                >
                  Conheça Nossa História
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default ContatoPage;
