import { motion } from "framer-motion";

const DoarButton = () => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-[#10a3b4] hover:bg-[#0a7a86] text-white font-medium py-3 px-8 rounded-full text-lg transition-all shadow-lg"
      onClick={() => {
        window.location.href = "/doaragora";
      }}
    >
      Doar Agora
    </motion.button>
  );
};

export default DoarButton;
