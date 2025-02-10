import { motion } from "framer-motion";

export function PromotionalBanner() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://res.cloudinary.com/dggewyuon/image/upload/v1739217036/Frame_2897_nvpqgg.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <motion.div
        className="relative h-[197px] max-w-[1366px] mx-auto flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl md:text-3xl lg:text-[32px] text-white font-playfair font-extrabold text-center leading-tight max-w-4xl">
          Há 76 anos trabalhando pela promoção humana de crianças, jovens,
          idosos e suas famílias.
        </h2>
      </motion.div>
    </section>
  );
}
