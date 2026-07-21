import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiServer,
  FiGlobe,
  FiCpu,
} from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const stats = [
  {
    icon: FiCheckCircle,
    end: 500,
    suffix: "+",
    title: "Projects Delivered",
  },
  {
    icon: FiServer,
    end: 99.9,
    decimals: 1,
    suffix: "%",
    title: "Uptime SLA",
  },
  {
    icon: FiGlobe,
    end: 150,
    suffix: "+",
    title: "Enterprise Clients",
  },
  {
    icon: FiCpu,
    end: 12,
    suffix: "yrs",
    title: "Industry Experience",
  },
];

/* ---------------- Counter ---------------- */

function AnimatedCounter({
  end,
  duration = 3000,
  decimals = 0,
  suffix = "",
  start,
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime = null;
    let animationFrame;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animate = (time) => {
      if (!startTime) startTime = time;

      const progress = Math.min((time - startTime) / duration, 1);

      const eased = easeOutCubic(progress);

      setCount(end * eased);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [start, end, duration]);

  return (
    <>
      {count.toFixed(decimals)}
      {suffix}
    </>
  );
}

/* ---------------- Component ---------------- */

export default function StatsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#07111d] py-24"
    >
      {/* Background Glow */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,255,255,.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,.08),transparent_35%)]"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-[#1e293b] bg-[#0b1220]"
        >
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: .6,
                  delay: index * .15,
                }}
                whileHover={{
                  y: -8,
                }}
                className={`group relative flex flex-col items-center justify-center py-16 px-8 text-center transition-all duration-500
                ${
                  index !== stats.length - 1
                    ? "border-b md:border-b lg:border-r border-[#1e293b]"
                    : ""
                }`}
              >
                {/* Hover Glow */}

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-cyan-400/5 transition duration-500"></div>

                {/* Icon */}

                <motion.div
                  whileHover={{
                    rotate: 360,
                    scale: 1.2,
                  }}
                  transition={{
                    duration: .8,
                  }}
                  className="relative text-gray-400 text-xl mb-8"
                >
                  <Icon />
                </motion.div>

                {/* Counter */}

                <h2 className="relative text-6xl font-extrabold leading-none bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 bg-clip-text text-transparent">

                  <AnimatedCounter
                    end={item.end}
                    duration={4500}
                    decimals={item.decimals || 0}
                    suffix={item.suffix}
                    start={inView}
                  />

                </h2>

                {/* Title */}

                <p className="relative mt-5 text-gray-400 font-medium tracking-wide">
                  {item.title}
                </p>

                {/* Bottom Hover Line */}

                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "70%" }}
                  transition={{ duration: .4 }}
                  className="absolute bottom-0 h-[2px] bg-gradient-to-r from-cyan-400 to-violet-500"
                />

              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}