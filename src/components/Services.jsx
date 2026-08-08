import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import iconMap, { FaCode } from "../utils/iconMapper";
import Navbar from "./Navbar";
import seoImage from "../assets/service-images/search-engine-optimization.jpg";
import ecommerceImage from "../assets/service-images/e-commerce-website-development.jpg";
import maintenanceImage from "../assets/service-images/website-maintenance-technical-support.jpg";
import aiImage from "../assets/service-images/ai-machine-learning.jpg";
import mobileImage from "../assets/service-images/mobile-app-development.jpg";
import webDevelopmentImage from "../assets/service-images/website-design-development.jpg";
import hostingImage from "../assets/service-images/domain-hosting-business-email.jpg";
import socialMediaImage from "../assets/service-images/social-media-management-marketing.jpg";
import paidAdsImage from "../assets/service-images/google-meta-ads.jpg";
import localBusinessImage from "../assets/service-images/google-business-profile.jpg";
import { getCachedJson } from "../utils/publicApi";
import useSiteSettings from "../utils/useSiteSettings";


const serviceImageFallbacks = [
  { keywords: ["seo", "search engine"], image: seoImage },
  { keywords: ["e-commerce", "ecommerce", "shopping"], image: ecommerceImage },
  { keywords: ["maintenance", "technical support"], image: maintenanceImage },
  { keywords: ["ai", "machine learning", "artificial intelligence"], image: aiImage },
  { keywords: ["mobile", "app development"], image: mobileImage },
  { keywords: ["website", "web development", "web design"], image: webDevelopmentImage },
  { keywords: ["domain", "hosting", "server", "business email"], image: hostingImage },
  { keywords: ["social media"], image: socialMediaImage },
  { keywords: ["google ads", "meta", "advertising", "marketing"], image: paidAdsImage },
  { keywords: ["google business", "local business", "maps"], image: localBusinessImage },
];

const defaultServiceImage = webDevelopmentImage;

const getServiceCardImage = (service) => {
  const searchableText = `${service.title || ""} ${service.category || ""}`.toLowerCase();
  return (
    service.image || serviceImageFallbacks.find(({ keywords }) =>
      keywords.some((keyword) => searchableText.includes(keyword))
    )?.image || service.image || defaultServiceImage
  );
};

export default function Services({ showNavbar = true }) {
  const { contentSettings } = useSiteSettings();
  const copy = contentSettings.servicesSection;
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const fetchServices = async () => {
      try {
        // Always request the latest public catalogue after an admin change.
        const data = await getCachedJson("/api/services", { force: true, maxAge: 0 });
        // console.log(data);

        if (active) { setServices(data); setError(""); }
      } catch (requestError) {
        if (active) setError("We could not load our services. Please refresh and try again.");
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchServices();
    const interval = window.setInterval(fetchServices, 10000);
    window.addEventListener("focus", fetchServices);
    return () => { active = false; window.clearInterval(interval); window.removeEventListener("focus", fetchServices); };
  }, []);

  return (
    <>
      {showNavbar && <Navbar />}
      <section id="services" className="relative overflow-hidden bg-[#050b14] py-28">
        <div className="absolute left-1/2 top-0 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[180px]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-20 text-center">
            <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2 text-sm uppercase tracking-[3px] text-cyan-400">{copy.eyebrow}</span>
            <h2 className="mt-6 text-5xl font-black text-white md:text-6xl">{copy.heading} <span className="text-cyan-400">{copy.accentHeading}</span></h2>
            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400">{copy.description}</p>
          </motion.div>

          {loading && <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="h-[390px] animate-pulse rounded-3xl border border-white/10 bg-white/[0.03]" />)}</div>}
          {error && <div className="mx-auto max-w-xl rounded-3xl border border-red-400/20 bg-red-500/10 p-7 text-center text-gray-300">{error}</div>}

          {!loading && !error && <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || FaCode;
              const summary = service.shortDescription || service.description;
              const serviceCardImage = getServiceCardImage(service);
              return <motion.div key={service._id || service.slug} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.08 }} whileHover={{ y: -12 }} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/50 hover:shadow-[0_20px_60px_rgba(34,211,238,.18)]">
                <div className="absolute -top-24 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-cyan-400/10 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />
                <div className="relative h-48 overflow-hidden bg-[#0b1625]">
                  <img
                    src={serviceCardImage}
                    alt={`${service.title} service`}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = defaultServiceImage;
                    }}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07111d] via-transparent to-cyan-500/10" />
                </div>
                <div className="relative p-8">
                  {/* Status is derived from MongoDB; public API filtering means only Active appears here. */}
                  <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300"><span>🟢</span> {copy.activeLabel}</span>
                  <motion.div whileHover={{ rotate: 8, scale: 1.08 }} className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border" style={{ borderColor: service.iconColor || "#06b6d4" }}><Icon className="text-3xl" style={{ color: service.iconColor || "#06b6d4" }} /></motion.div>
                  <h3 className="mb-4 text-2xl font-bold text-white transition group-hover:text-cyan-400">{service.title}</h3>
                  <p className="mb-7 leading-8 text-gray-400 line-clamp-3 ">{summary.slice(0,120)}</p>
                  <Link to={`/services/${service.slug}`} className="flex items-center gap-3 font-semibold text-cyan-400"><span>{copy.learnMoreLabel}</span><FaArrowRight className="transition-transform group-hover:translate-x-1" /></Link>
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
