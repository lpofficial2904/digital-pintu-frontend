import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import iconMap, { FaCode } from "../utils/iconMapper";
import Navbar from "./Navbar";

// const API_URL = "http://localhost:5000/api/services";
const API_URL = "https://digital-pintu-backend.onrender.com/api/services";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Always request the latest public catalogue after an admin change.
        const { data } = await axios.get(API_URL);
        // console.log(data);
        
        setServices(data);
      } catch (requestError) {
        setError("We could not load our services. Please refresh and try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <>
    <Navbar/>
    <section id="services" className="relative overflow-hidden bg-[#050b14] py-28">
      <div className="absolute left-1/2 top-0 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[180px]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-20 text-center">
          <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2 text-sm uppercase tracking-[3px] text-cyan-400">Our Services</span>
          <h2 className="mt-6 text-5xl font-black text-white md:text-6xl">We Build <span className="text-cyan-400">Digital Experiences</span></h2>
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400">From websites to mobile applications, branding, marketing and SEO — we create high-performance digital products that help businesses grow.</p>
        </motion.div>

        {loading && <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="h-[390px] animate-pulse rounded-3xl border border-white/10 bg-white/[0.03]" />)}</div>}
        {error && <div className="mx-auto max-w-xl rounded-3xl border border-red-400/20 bg-red-500/10 p-7 text-center text-gray-300">{error}</div>}

        {!loading && !error && <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || FaCode;
            const summary = service.shortDescription || service.description;
            return <motion.div key={service._id || service.slug} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.08 }} whileHover={{ y: -12 }} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/50 hover:shadow-[0_20px_60px_rgba(34,211,238,.18)]">
              <div className="absolute -top-24 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-cyan-400/10 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />
              {service.image && <img src={service.image} alt="" className="relative h-48 w-full object-cover" />}
              <div className="relative p-8">
                {/* Status is derived from MongoDB; public API filtering means only Active appears here. */}
                <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300"><span>🟢</span> Active</span>
                <motion.div whileHover={{ rotate: 8, scale: 1.08 }} className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border" style={{ borderColor: service.iconColor || "#06b6d4" }}><Icon className="text-3xl" style={{ color: service.iconColor || "#06b6d4" }} /></motion.div>
                <h3 className="mb-4 text-2xl font-bold text-white transition group-hover:text-cyan-400">{service.title}</h3>
                <p className="mb-7 leading-8 text-gray-400">{summary}</p>
                <Link to={`/services/${service.slug}`} className="flex items-center gap-3 font-semibold text-cyan-400"><span>Learn More</span><FaArrowRight className="transition-transform group-hover:translate-x-1" /></Link>
              </div>
              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 transition-all duration-400 group-hover:w-full" />
            </motion.div>;
          })}
        </div>}
      </div>
    </section>
    </>

  );
}
