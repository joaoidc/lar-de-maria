import { motion } from "framer-motion";

const stats = [
  {
    number: "1948",
    label: "DESDE",
  },
  {
    number: "+100",
    label: "ATENDIDOS",
  },
  {
    number: "+60",
    label: "CRIANÇAS",
  },
  {
    number: "+40",
    label: "ADULTOS",
  },
  {
    number: "+20",
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
                className="w-24 h-24 rounded-full border-2 border-[#10B5B5] flex items-center justify-center mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="text-2xl font-bold text-[#10B5B5]">
                  {stat.number}
                </span>
              </motion.div>
              <span className="text-sm font-medium text-gray-600">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
