import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import digitalPintuLogo from "../assets/digital-pintu-logo-new.png";
import useSiteSettings from "../utils/useSiteSettings";

import {
  FiArrowUp,
  FiArrowDown,
  FiSend,
  FiPhone,
  FiMail,
  FiMapPin,
  FiArrowRight,
} from "react-icons/fi";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";

const services = [
  "Website Development",
  "App Development",
  "UI / UX Design",
  "SEO Optimization",
  "Digital Marketing",
  "Graphic Design",
];

const WEBSITE_PAGES_API = `${import.meta.env.VITE_API_URL || "https://digital-pintu-backend.onrender.com"}/api/website-pages`;

const getPagePath = (page) => {
  const knownPaths = {
    home: "/#home",
    services: "/services",
    process: "/#process",
    blogs: "/blogs",
    reviews: "/#reviews",
    contact: "/#contact",
    about: "/about",
    careers: "/careers",
  };
  return knownPaths[page.key] || `/pages/${page.slug}`;
};

const socials = [
  {
    icon: <FaFacebookF />,
    color: "hover:bg-blue-600",
    field: "facebookUrl",
    label: "Facebook",
  },
  {
    icon: <FaInstagram />,
    color: "hover:bg-pink-600",
    field: "instagramUrl",
    label: "Instagram",
  },
  {
    icon: <FaTwitter />,
    color: "hover:bg-sky-500",
    field: "twitterUrl",
    label: "X / Twitter",
  },
  {
    icon: <FaLinkedinIn />,
    color: "hover:bg-blue-700",
    field: "linkedinUrl",
    label: "LinkedIn",
  },
  {
    icon: <FaGithub />,
    color: "hover:bg-gray-700",
    field: "githubUrl",
    label: "GitHub",
  },
];

export default function Footer() {
  const [atTop, setAtTop] = useState(true);
  const [quickLinks, setQuickLinks] = useState([]);
  const settings = useSiteSettings();

  useEffect(() => {
    const updatePosition = () => setAtTop(window.scrollY < 50);
    updatePosition();
    window.addEventListener("scroll", updatePosition, { passive: true });
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  useEffect(() => {
    let active = true;

    axios.get(WEBSITE_PAGES_API)
      .then(({ data }) => {
        if (!active || !Array.isArray(data)) return;
        setQuickLinks(
          data
            .filter((page) => page.showInNavbar)
            .map((page) => ({
              title: page.navLabel || page.title,
              path: getPagePath(page),
            }))
        );
      })
      .catch((error) => {
        console.error("Unable to fetch footer navigation:", error);
      });

    return () => { active = false; };
  }, []);

  const handlePageScroll = () => window.scrollTo({
    top: atTop ? document.documentElement.scrollHeight : 0,
    behavior: "smooth",
  });

  return (
    <footer className="relative overflow-hidden bg-[#030712]">

      {/* Background Glow */}

      <div className="absolute inset-0 overflow-hidden">

        <motion.div
          animate={{
            x: [-150, 150, -150],
            y: [-100, 120, -100],
          }}
          transition={{
            repeat: Infinity,
            duration: 18,
            ease: "linear",
          }}
          className="absolute w-[450px] h-[450px] bg-cyan-500/10 blur-[140px] rounded-full"
        />

        <motion.div
          animate={{
            x: [180, -180, 180],
            y: [80, -120, 80],
          }}
          transition={{
            repeat: Infinity,
            duration: 22,
            ease: "linear",
          }}
          className="absolute right-0 bottom-0 w-[420px] h-[420px] bg-blue-600/10 blur-[150px] rounded-full"
        />

      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24">

        {/* Newsletter */}

        {/* <motion.div
          initial={{
            opacity: 0,
            y: 70,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: .8,
          }}
          className="mb-20 rounded-[35px] border border-cyan-500/20 bg-white/5 backdrop-blur-xl p-10 lg:p-14"
        >

          <div className="grid lg:grid-cols-2 gap-10 items-center">

            <div>

              <motion.h2
                initial={{
                  opacity: 0,
                  x: -40,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: .2,
                }}
                className="text-4xl font-black text-white leading-tight"
              >
                Stay Updated
                <br />

                <span className="text-cyan-400">
                  with Digital Pintu
                </span>

              </motion.h2>

              <p className="mt-5 text-gray-400 leading-8">
                Subscribe to our newsletter and receive latest
                updates about websites, marketing, SEO,
                technology and exclusive offers.
              </p>

            </div>

            <motion.div
              initial={{
                opacity: 0,
                x: 40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: .3,
              }}
            >

              <div className="flex flex-col sm:flex-row gap-4">

                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="flex-1 rounded-full bg-[#08131f] border border-white/10 px-6 py-4 text-white outline-none focus:border-cyan-400 transition"
                />

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow:
                      "0 0 30px rgba(6,182,212,.4)",
                  }}
                  whileTap={{
                    scale: .95,
                  }}
                  className="rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 px-8 py-4 text-white font-semibold flex items-center justify-center gap-3"
                >
                  Subscribe

                  <FiSend />
                </motion.button>

              </div>

            </motion.div>

          </div>

        </motion.div> */}

        {/* Footer Grid */}

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-14">

          {/* Company */}

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: .7,
            }}
          >

            <div className="flex items-center gap-4">

              <motion.div
                whileHover={{
                  rotate: 360,
                }}
                transition={{
                  duration: 1,
                }}
                
                // className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center text-2xl font-black text-black"
              >
                <img src={settings.logoData || digitalPintuLogo} width="150" alt="Digital Pintu Solutions logo" />
                {/* DP */}
              </motion.div>

              <div>

                {/* <h3 className="text-2xl font-bold text-white">
                  Digital
                  <span className="text-cyan-400">
                    {" "}Pintu
                  </span>
                </h3> */}

                <p className="text-xs tracking-[5px] text-gray-500 uppercase">
                  Digital Pintu Solutions
                </p>

              </div>

            </div>

            <p className="mt-8 text-gray-400 leading-8">
             Transform your business with expert website development, mobile app development, UI/UX design, SEO, branding, and digital marketing services. We build fast, responsive, and scalable digital solutions that boost your online presence and drive business growth.
            </p>

                        {/* Social Icons */}

            <div className="flex items-center gap-4 mt-8">
              {socials.filter((item) => settings[item.field]).map((item) => (
                <motion.a
                  key={item.field}
                  href={settings[item.field]}
                  aria-label={item.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    y: -6,
                    scale: 1.1,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className={`w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-300 transition-all duration-300 ${item.color}`}
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              Quick Links
            </h3>

            <div className="space-y-5">
              {quickLinks.map((item) => (
                <motion.div
                  key={item.title}
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.25 }}
                >
                  <Link
                    to={item.path}
                    className="group flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition"
                  >
                    <FiArrowRight className="group-hover:translate-x-1 transition" />
                    {item.title}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Services */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              Our Services
            </h3>

            <div className="space-y-5">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 8 }}
                >
                  <Link
                    to="/services"
                    className="group flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition"
                  >
                    <FiArrowRight className="group-hover:translate-x-1 transition" />
                    {service}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              Contact Us
            </h3>

            <div className="space-y-7">

              <motion.div
                whileHover={{ x: 6 }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <FiPhone size={20} />
                </div>

                <div>
                  <p className="text-white font-semibold">
                    Phone
                  </p>

                  <p className="text-gray-400">
                    {settings.phoneNumber}
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 6 }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <FiMail size={20} />
                </div>

                <div>
                  <p className="text-white font-semibold">
                    Email
                  </p>

                  <p className="text-gray-400 break-all">
                    {settings.contactEmail}
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 6 }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <FiMapPin size={20} />
                </div>

                <div>
                  <p className="text-white font-semibold">
                    Address
                  </p>

                  <p className="text-gray-400">
                   {settings.address}
                  </p>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>

                {/* Divider */}

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="origin-left h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-20"
        />

        {/* Bottom */}

        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-5">

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-500 text-center md:text-left"
          >
            © {new Date().getFullYear()} Digital Pintu.
            All Rights Reserved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 text-sm"
          >
            <Link
              to="/privacy-policy"
              className="text-gray-500 hover:text-cyan-400 transition"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-gray-500 hover:text-cyan-400 transition"
            >
              Terms & Conditions
            </Link>
          </motion.div>

        </div>

      </div>

      {/* Scroll To Top */}

      <motion.button
        whileHover={{
          scale: 1.12,
          rotate: 360,
        }}
        whileTap={{
          scale: 0.95,
        }}
        onClick={handlePageScroll}
        aria-label={atTop ? "Scroll to bottom" : "Scroll to top"}
        className="fixed bottom-24 right-5 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 shadow-[0_0_35px_rgba(6,182,212,.45)] flex items-center justify-center text-white"
      >
        {atTop ? <FiArrowDown size={24} /> : <FiArrowUp size={24} />}
      </motion.button>

    </footer>
  );
}
