import { motion } from "framer-motion";

const techs = [
  "Torch",
  "PostgreSQL",
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "Go",
  "Kubernetes",
  "AWS",
  "GCP",
  "Terraform",
  "PyTorch",
];

export default function TechMarquee() {

  // Infinite scrolling ke liye duplicate array
  
  const marqueeItems = [...techs, ...techs];

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#0B1020] py-5">
      {/* Left Gradient */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-40 bg-gradient-to-r from-[#0B1020] via-[#0B1020]/80 to-transparent" />

      {/* Right Gradient */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-40 bg-gradient-to-l from-[#0B1020] via-[#0B1020]/80 to-transparent" />

      <motion.div
        className="flex w-max"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          ease: "linear",
          duration: 30,
          repeat: Infinity,
        }}
      >
        {marqueeItems.map((item, index) => (
          <div
            key={index}
            className="mx-10 flex items-center justify-center whitespace-nowrap"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.28em] text-gray-500 transition-all duration-300 text-[#6B7280] hover:text-[#00E5FF] md:text-base">
              {item}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}