import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaArrowRight, FaCheck, FaCode, FaReact, FaNodeJs, FaPython, FaSwift, FaMobileAlt } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiFlutter, SiKotlin, SiFirebase } from "react-icons/si";
import { DiMongodb } from "react-icons/di";
import iconMap from "../utils/iconMapper";

const API_URL = "https://digital-pintu-backend.onrender.com/api/services";

// Helper map to dynamically load specific icons for technologies
const techIconMap = {
  FaReact: <FaReact className="text-4xl text-cyan-400" />,
  SiNextdotjs: <SiNextdotjs className="text-4xl text-white" />,
  FaNodeJs: <FaNodeJs className="text-4xl text-green-500" />,
  DiMongodb: <DiMongodb className="text-4xl text-green-400" />,
  SiTailwindcss: <SiTailwindcss className="text-4xl text-teal-400" />,
  FaPython: <FaPython className="text-4xl text-yellow-500" />,
  SiFlutter: <SiFlutter className="text-4xl text-blue-400" />,
  FaSwift: <FaSwift className="text-4xl text-orange-500" />,
  SiKotlin: <SiKotlin className="text-4xl text-purple-400" />,
  SiFirebase: <SiFirebase className="text-4xl text-yellow-400" />
};

const technologyNameMatchers = [
  { names: ["react"], icon: <FaReact className="text-4xl text-cyan-400" /> },
  { names: ["next"], icon: <SiNextdotjs className="text-4xl text-white" /> },
  { names: ["node"], icon: <FaNodeJs className="text-4xl text-green-500" /> },
  { names: ["mongo"], icon: <DiMongodb className="text-4xl text-green-400" /> },
  { names: ["tailwind"], icon: <SiTailwindcss className="text-4xl text-teal-400" /> },
  { names: ["python"], icon: <FaPython className="text-4xl text-yellow-500" /> },
  { names: ["flutter"], icon: <SiFlutter className="text-4xl text-blue-400" /> },
  { names: ["swift"], icon: <FaSwift className="text-4xl text-orange-500" /> },
  { names: ["kotlin"], icon: <SiKotlin className="text-4xl text-purple-400" /> },
  { names: ["firebase"], icon: <SiFirebase className="text-4xl text-yellow-400" /> },
];

const getTechnologyIcon = (technology) => {
  const name = technology.name?.toLowerCase() || "";
  const matchedTechnology = technologyNameMatchers.find(({ names }) => names.some((value) => name.includes(value)));
  return matchedTechnology?.icon || techIconMap[technology.icon] || <FaCode className="text-4xl text-cyan-400" />;
};

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

export default function ServiceDetails() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await axios.get(`${API_URL}/${encodeURIComponent(slug)}`);
        setService(data);
      } catch (requestError) {
        setError(
          requestError.response?.status === 404
            ? "This service could not be found."
            : "We could not load this service. Please try again shortly."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050b14] px-6 pb-24 pt-36">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-8 w-40 rounded-full bg-cyan-500/15" />
          <div className="mt-8 h-16 max-w-3xl rounded-2xl bg-white/10" />
          <div className="mt-6 h-32 max-w-2xl rounded-2xl bg-white/5" />
          <div className="mt-12 h-80 rounded-3xl bg-white/5" />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050b14] px-6 pt-20 text-center">
        <div className="max-w-md rounded-3xl border border-red-400/20 bg-white/[0.03] p-10 backdrop-blur-md">
          <p className="text-lg text-gray-300">{error}</p>
          <Link to="/services" className="mt-6 inline-flex rounded-full border border-cyan-400 px-5 py-3 text-cyan-400 transition hover:bg-cyan-500 hover:text-white">
            Back to services
          </Link>
        </div>
      </main>
    );
  }

  const Icon = iconMap[service.icon] || FaCode;
  const highlights = service.highlights || [];
  const technologies = service.technologies || [];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050b14] pb-24 pt-36 text-white">
      {/* Dynamic Background Glows */}
      <div className="absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[180px] pointer-events-none" />
      <div className="absolute right-0 bottom-1/4 h-[600px] w-[600px] rounded-full bg-blue-600/5 blur-[160px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Banner Area */}
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.div variants={fadeInUp}>
            <Link to="/services" className="text-sm font-semibold text-cyan-400 transition hover:text-cyan-200">
              ← All services
            </Link>
          </motion.div>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-2">
            <motion.div variants={fadeInUp}>
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-400">
                <Icon className="text-3xl" />
              </div>
              {service.category && (
                <span className="text-xs font-bold uppercase tracking-[3px] text-cyan-400">{service.category}</span>
              )}
              <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {service.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-gray-400">
                {service.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#contact" className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-4 font-semibold text-white transition hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]">
                  Share Your Requirements <FaArrowRight />
                </a>
              </div>
            </motion.div>

            {/* Visual Screen Mockup Cards */}
            <motion.div variants={fadeInUp} className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] shadow-2xl">
              {service.image ? (
                <img src={service.image} alt={service.title} className="h-full max-h-[420px] w-full object-cover transition-transform duration-700 hover:scale-105" />
              ) : (
                <div className="flex h-96 items-center justify-center bg-gradient-to-br from-cyan-500/20 to-indigo-500/20">
                  <Icon className="text-8xl text-cyan-400/50" />
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* SECTION 1: "Other Services Details" (Image 1 Style Grid Content) */}
        {highlights.length > 0 && (
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mt-28 border-t border-white/5 pt-20"
          >
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold md:text-4xl">Our Service Features & Process</h2>
              <p className="mt-4 text-gray-400">We drive dynamic software operations using an engineered structure from conceptual designs to complete code architecture.</p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5, borderColor: "rgba(34,211,238,0.2)" }}
                  className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 transition-colors backdrop-blur-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 mb-5">
                    <FaCheck className="text-sm" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* SECTION 2: "Our Technology Stack" (Image 2 Style Center Layout) */}
        {technologies.length > 0 && (
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mt-28 border-t border-white/5 pt-20"
          >
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold md:text-4xl">Our Technologies</h2>
              <p className="mt-4 text-gray-400">We utilize a range of industry-leading cloud and engineering technologies tailored to deliver outstanding apps.</p>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 justify-center">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/[0.01] p-6 hover:bg-white/[0.03] transition-all"
                >
                  <div className="mb-4">
                    {getTechnologyIcon(tech)}
                  </div>
                  <span className="text-sm font-semibold text-gray-300">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </main>
  );
}
