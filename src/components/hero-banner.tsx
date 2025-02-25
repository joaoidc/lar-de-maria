import { motion } from "framer-motion";

interface HeroBannerProps {
  logoUrl: string;
  logoHeight?: number;
  showHearts?: boolean;
}

export function HeroBanner({
  logoUrl,
  logoHeight = 200,
  showHearts = true,
}: HeroBannerProps) {
  return (
    <section className="relative h-[40vh] overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#e6f7f9] to-white">
      {/* Background Circles Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[300px] h-[300px] rounded-full bg-[#10a3b4]/5"
            initial={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              scale: 0,
            }}
            animate={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 2,
            }}
            style={{
              left: `${i * 30}%`,
              top: `${Math.random() * 70}%`,
            }}
          />
        ))}
      </div>

      {/* Main Logo Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center"
        whileHover={{ scale: 1.02 }}
      >
        {/* Logo Image with Glow Effect */}
        <div className="relative">
          <motion.div
            className="absolute inset-0 bg-[#10a3b4]/20 filter blur-xl rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <img
            src={logoUrl}
            alt="Logo"
            className="relative z-10"
            style={{ height: `${logoHeight}px`, width: "auto" }}
          />
        </div>

        {/* Floating Hearts */}
        {showHearts &&
          [...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-[#10a3b4]"
              initial={{
                scale: 0,
                x: 0,
                y: 0,
                opacity: 0,
              }}
              animate={{
                scale: [1, 1.2, 1],
                x: Math.random() * 200 - 100,
                y: -100 - i * 20,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.8,
              }}
              style={{
                fontSize: `${Math.random() * 10 + 20}px`,
              }}
            >
              ❤️
            </motion.div>
          ))}
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#10a3b4]/20 to-transparent" />
    </section>
  );
}
