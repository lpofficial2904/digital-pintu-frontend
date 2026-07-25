import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios"; 
import { useAuth } from "../context/AuthContext";
import iconMap, { FaCode } from "../utils/iconMapper";
import { toast } from "sonner"; // 1. Imported Sonner
// import logo from "../assets/digital-pintu-logo.jpeg";
// import digitalPintuLogo from "../assets/digital-pintu-logo-orange-bgremove.png";
import digitalPintuLogo from "../assets/digital-pintu-logo-new.png";
import logo1 from "../assets/Untitled design.png";
import logo2 from "../assets/Untitled design (1).png";
import logo from "../assets/Untitled_design__1_-removebg-preview.png";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiArrowRight,
  FiLogOut,
} from "react-icons/fi";

// const navLinks = [
//   {
//     title: "Home",
//     path: "#home",
//   },
//   {
//     title: "Services",
//     mega: true,
//   },
//   {
//     title: "Reviews",
//     path: "#reviews",
//   },
//   {
//     title: "Contact",
//     path: "#contact",
//   },
// ];

const navLinks = [
  { title: "Home", path: "/#home" },
  { title: "Services", path: "/services", mega: true },
  { title: "Blogs", path: "/blogs" },
  { title: "Reviews", path: "/#reviews" },
  { title: "Contact", path: "/#contact" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Dynamic services state
  const [services, setServices] = useState([]); 
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  // Smooth scroll handler
  const scrollToSection = (id, title) => {
    setActive(title);
    setMobileOpen(false);
    navigate("/");

    window.setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 0);
  };

  const handleNavLinkClick = (e, item) => {
    if (item.path && item.path.includes("#")) {
      e.preventDefault();
      const elementId = item.path.split("#")[1];
      scrollToSection(elementId, item.title);
    } else {
      setActive(item.title);
      setMobileOpen(false);
    }
  };

  // 2. Combined Logout Handler with toast.promise
  const handleLogout = () => {
    setProfileOpen(false);
    setMobileOpen(false);

    const logoutAction = () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            logout();
            resolve();
          } catch (error) {
            reject();
          }
        }, 2000); // 2-second delay to show loading state smoothly
      });

    toast.promise(logoutAction(), {
      loading: "Logging you out...",
      success: "Logged out safely. See you soon!",
      error: "Something went wrong during logout.",
    });
  };

  // Backend se services fetch karne ke liye useEffect

  useEffect(() => {
    const fetchNavbarServices = async () => {
      try {
        

        const { data } = await axios.get("https://digital-pintu-backend.onrender.com/api/services");
        setServices(data);
      } catch (error) {
        console.error("Unable to fetch navbar services:", error);
        setServicesError("Services are unavailable right now.");
      } finally {
        setServicesLoading(false);
      }
    };

    fetchNavbarServices();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.1,
        ease: "easeOut",
       }}
      className="fixed top-0 left-0 w-full z-50 flex justify-center"
    >
      <motion.div
        animate={{
          width: scrolled ? "88%" : "95%",
          marginTop: scrolled ? 16 : 8,
        }}
        transition={{
          type: "spring",
          stiffness:650,
          damping:32,
          mass:0.45,
        }}
        className={`rounded-full transition-all duration-500 ${
          scrolled
            ? "bg-[#07111d]/75 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,255,255,.10)]"
            : "bg-[#07111d]/35 backdrop-blur-xl"
        }`}
      >
        <div className="h-20 px-8 flex items-center justify-between">
          {/* Logo */}
          <Link className="flex items-center gap-3" to="/">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1 }}
              // className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center text-black font-black text-xl shadow-lg"
            >
              {/* DP */}
              {/* <img src={logo} width="150"  alt="Logo" /> */}
              <img src={digitalPintuLogo} width="150"  alt="Logo" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold">
                {/* <span className="text-white">Digital</span>
                <span className="text-cyan-400"> Pintu</span> */}
                {/* <img src={digitalPintuLogo} width="80"  alt="Logo" /> */}
              </h2>
              <p className="text-[10px] uppercase tracking-[4px] text-gray-400">
                DIGITAL Pintu <br/> Solutions
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((item) =>
              item.mega ? (
                <div
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => {
                    setServiceOpen(true);
                    setActive(item.title);
                  }}
                  onMouseLeave={() => setServiceOpen(false)}
                >
                  <button
                    onClick={() => navigate(item.path)}
                    className="relative px-5 py-3 rounded-full flex items-center gap-2 text-gray-300 hover:text-white transition"
                  >
                    {active === item.title && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-cyan-500/10 border border-cyan-400/30"
                      />
                    )}
                    <span className="relative z-10">Services</span>
                    <motion.div animate={{ rotate: serviceOpen ? 180 : 0 }}>
                      <FiChevronDown />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {serviceOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 180 }}
                        className="absolute left-1/2 -translate-x-1/2 top-16 w-[760px] rounded-3xl overflow-hidden border border-white/10 bg-[#09131f]/95 backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,255,255,.12)]"
                      >
                        <div className="grid grid-cols-2 gap-3 p-6">
                          {servicesLoading && Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="h-28 animate-pulse rounded-2xl bg-white/5" />
                          ))}
                          {servicesError && <p className="col-span-2 p-5 text-center text-sm text-gray-400">{servicesError}</p>}
                          {!servicesLoading && !servicesError && services.map((service, index) => {
                            const Icon = iconMap[service.icon] || FaCode;
                            return (
                              <motion.div
                                key={service._id || service.title}
                                initial={{ opacity: 0, y: 25 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{
                                  x: 8,
                                  backgroundColor: "rgba(255,255,255,.05)",
                                }}
                                className="rounded-2xl p-5 cursor-pointer group transition-all"
                              >
                                <Link 
                                  className="flex items-start gap-4" 
                                  to={`/services/${service.slug}`}
                                  onClick={() => setServiceOpen(false)}
                                >
                                  <div className="text-4xl text-cyan-400"><Icon /></div>
                                  <div>
                                    <h3 className="text-white text-lg font-semibold group-hover:text-cyan-400 transition">
                                      {service.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                                      {service.shortDescription || service.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-cyan-400 mt-4 opacity-0 group-hover:opacity-100 transition">
                                      Explore <FiArrowRight />
                                    </div>
                                  </div>
                                </Link>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.title}
                  to={item.path}
                  onMouseEnter={() => setActive(item.title)}
                  onClick={(e) => handleNavLinkClick(e, item)}
                  className="relative px-5 py-3 rounded-full"
                >
                  {active === item.title && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-cyan-500/10 border border-cyan-400/30"
                    />
                  )}
                  <motion.span
                    whileHover={{ y: -2 }}
                    className="relative z-10 text-gray-300 hover:text-white transition"
                  >
                    {item.title}
                  </motion.span>
                </Link>
              )
            )}
          </nav>

          {/* Desktop Right Side Auth Controls */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-xl hover:border-cyan-400/50 transition"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-11 h-11 rounded-full border-2 border-cyan-400 object-cover"
                  />
                  <div className="text-left">
                    <p className="text-white text-sm font-semibold">
                      {user.name}
                    </p>
                    <p className="text-gray-400 text-xs">{user.email}</p>
                  </div>
                  <motion.div animate={{ rotate: profileOpen ? 180 : 0 }}>
                    <FiChevronDown className="text-cyan-400" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 20, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 180 }}
                      className="absolute right-0 mt-5 w-72 overflow-hidden rounded-3xl border border-white/10 bg-[#0b1320]/95 backdrop-blur-3xl shadow-[0_20px_70px_rgba(0,0,0,.45)]"
                    >
                      <div className="p-7 text-center border-b border-white/10">
                        <motion.img
                          whileHover={{ scale: 1.08 }}
                          src={user.avatar}
                          alt={user.name}
                          className="w-24 h-24 rounded-full mx-auto border-2 border-cyan-400 object-cover"
                        />
                        <h3 className="mt-4 text-lg text-white font-bold">
                          {user.name}
                        </h3>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                      {/* 3. Updated Desktop Logout Action Button */}
                      <button
                        onClick={handleLogout}
                        className="w-full px-6 py-5 flex items-center gap-3 text-red-400 hover:bg-red-500/10 transition"
                      >
                        <FiLogOut /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link className="px-6 py-3 rounded-full border border-cyan-400 text-cyan-400 hover:bg-cyan-500 hover:text-white transition" to="/login">
                  Login
                </Link>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 40px rgba(34,211,238,.35)",
                  }}
                  whileTap={{ scale: 0.96 }}
                  className="relative overflow-hidden rounded-full"
                >
                  <motion.div
                    animate={{ x: ["-120%", "120%"] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.8,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  />
                  <Link className="relative flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 px-7 py-3 font-semibold text-white" to="/register">
                    Get Started <FiArrowRight />
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white text-3xl"
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute top-28 w-[95%] rounded-3xl overflow-hidden bg-[#08111f]/95 backdrop-blur-3xl border border-white/10 lg:hidden"
          >
            <div className="flex flex-col gap-2 p-6">
              {navLinks.map((item) =>
                item.mega ? (
                  <div key={item.title}>
                    <div className="w-full flex items-center justify-between rounded-xl px-4 py-4 text-gray-300 hover:bg-white/5">
                      <Link
                        to={item.path}
                        onClick={() => {
                          setMobileOpen(false);
                          setServiceOpen(false);
                        }}
                        className="flex-1"
                      >
                        Services
                      </Link>
                      <button
                        type="button"
                        aria-label="Toggle services menu"
                        onClick={() => setServiceOpen(!serviceOpen)}
                      >
                        <motion.div animate={{ rotate: serviceOpen ? 180 : 0 }}>
                          <FiChevronDown />
                        </motion.div>
                      </button>
                    </div>

                    <AnimatePresence>
                      {serviceOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-4"
                        >
                          {servicesLoading && <div className="mx-4 my-3 h-12 animate-pulse rounded-xl bg-white/5" />}
                          {servicesError && <p className="px-4 py-3 text-sm text-gray-400">{servicesError}</p>}
                          {!servicesLoading && !servicesError && services.map((service) => {
                            const Icon = iconMap[service.icon] || FaCode;
                            return (
                              <Link
                                key={service._id || service.title}
                                to={`/services/${service.slug}`}
                                onClick={() => {
                                  setMobileOpen(false);
                                  setServiceOpen(false);
                                }}
                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-400 hover:text-cyan-400"
                              >
                                <Icon className="text-2xl text-cyan-400" />
                                <span>{service.title}</span>
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.title}
                    to={item.path}
                    onClick={(e) => handleNavLinkClick(e, item)}
                    className="rounded-xl px-4 py-4 text-gray-300 hover:bg-white/5"
                  >
                    {item.title}
                  </Link>
                )
              )}

              {user ? (
                <>
                  <div className="mt-6 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-14 h-14 rounded-full border-2 border-cyan-400 object-cover"
                    />
                    <div>
                      <h3 className="text-white font-semibold">{user.name}</h3>
                      <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                  </div>

                  {/* 4. Updated Mobile Logout Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogout}
                    className="mt-5 flex items-center justify-center gap-3 rounded-2xl bg-red-500 py-4 font-semibold text-white transition hover:bg-red-600"
                  >
                    <FiLogOut /> Logout
                  </motion.button>
                </>
              ) : (
                <div className="mt-6 flex flex-col gap-4">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-2xl border border-cyan-400 py-4 text-center font-semibold text-cyan-400 transition hover:bg-cyan-500 hover:text-white"
                  >
                    Login
                  </Link>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/register"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 py-4 font-semibold text-white shadow-lg"
                    >
                      Get Started <FiArrowRight />
                    </Link>
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
