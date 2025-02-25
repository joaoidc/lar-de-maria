import { motion } from "framer-motion";

const stats = [
  {
    number: "1947",
    label: "DESDE",
  },
  {
    number: "45.000+",
    label: "ATENDIDOS",
  },
  {
    number: "8.500+",
    label: "CRIANÇAS",
  },
  {
    number: "6.000+",
    label: "ADULTOS",
  },
  {
    number: "4.800+",
    label: "FAMÍLIAS",
  },
  {
    number: "1.200+",
    label: "VOLUNTÁRIOS",
  },
];

export function StatsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-12 md:gap-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <motion.div
                className="w-28 h-28 rounded-full border-2 border-[#10B5B5] flex items-center justify-center mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="text-2xl font-bold text-gray-900">
                  {stat.number}
                </span>
              </motion.div>
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
