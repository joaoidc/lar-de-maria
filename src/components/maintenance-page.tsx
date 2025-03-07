import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e6f7f9] to-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <motion.div
              className="w-24 h-24 mx-auto text-[#10a3b4]"
              animate={{
                rotate: [0, -10, 10, -10, 0],
                scale: [1, 1.1, 1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-full h-full"
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
                />
              </svg>
            </motion.div>
          </div>

          <h1 className="text-4xl font-playfair text-[#10a3b4] mb-4">
            Página em Construção
          </h1>

          <p className="text-gray-600 mb-8 text-lg">
            Estamos trabalhando com muito carinho para trazer mais conteúdo
            sobre nossa missão de ajudar e transformar vidas. Em breve, teremos
            novidades por aqui! 💙
          </p>

          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block bg-[#10a3b4] text-white px-6 py-3 rounded-full font-medium hover:bg-[#0d8997] transition-colors"
            >
              <Link to="/">Voltar para a Página Inicial</Link>
            </motion.div>

            <div className="flex justify-center space-x-4 mt-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-500"
              >
                <p>Precisa de ajuda?</p>
                <p className="text-[#10a3b4]">
                  Entre em contato: (91) 3226-2953
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <div className="flex justify-center space-x-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#10a3b4]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg
                  className="w-8 h-8 text-[#10a3b4]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-600">Amor</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#10a3b4]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg
                  className="w-8 h-8 text-[#10a3b4]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-600">Cuidado</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#10a3b4]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg
                  className="w-8 h-8 text-[#10a3b4]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-600">Esperança</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
