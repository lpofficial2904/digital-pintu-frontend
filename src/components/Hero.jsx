import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroDashboardVisual from "../assets/hero-dashboard-visual.png";
import useSiteSettings from "../utils/useSiteSettings";

export default function Hero() {
  const { contentSettings } = useSiteSettings();
  const hero = contentSettings.hero;
  const primaryButtonUrl = !hero.primaryButtonUrl || hero.primaryButtonUrl === "/#contact"
    ? "/contact/"
    : hero.primaryButtonUrl;
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-[#070B14] pt-32">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,.12) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow Effects */}
      <div className="absolute -top-32 left-20 w-96 h-96 bg-cyan-500/20 blur-[160px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/20 blur-[180px] rounded-full" />

      <div className="relative mx-auto grid min-h-[85vh] min-w-0 max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
          className="min-w-0 max-w-full"
        >
          <div className="mb-8 flex w-full max-w-full items-center justify-center whitespace-normal break-words rounded-md border border-cyan-500/40 bg-cyan-500/10 px-3 py-2 text-center text-[9px] uppercase leading-5 tracking-[1.5px] text-cyan-300 sm:inline-flex sm:w-auto sm:px-5 sm:text-xs sm:tracking-[3px]">
            {hero.badge}
          </div>

          <h1 className="max-w-full break-words text-[2.15rem] font-bold leading-tight min-[400px]:text-4xl sm:text-5xl">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {hero.titleAccent}
            </span>

            <br />

            <span className="text-white">
              {hero.titleMain}
            </span>

            <br />

            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              {hero.titleGradient}
            </span>
          </h1>

          <p className="mt-8 max-w-xl break-words text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">
           {hero.description}
          </p>

          <div className="mt-10 flex min-w-0 flex-wrap gap-5">

            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(0,255,255,.35)",
              }}
              whileTap={{ scale: .95 }}
              className="w-full rounded sm:w-auto"
            >
              <Link to={primaryButtonUrl} className="flex w-full items-center justify-center gap-2 rounded bg-cyan-400 px-5 py-4 font-bold text-black sm:px-8">
                {hero.primaryButtonLabel}
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="w-full rounded-lg border border-purple-500 px-5 py-4 text-white hover:bg-purple-500/10 sm:w-auto sm:px-8"
            >
              {/* Explore Services */}
              <Link to={hero.secondaryButtonUrl}>{hero.secondaryButtonLabel}</Link>

            </motion.button>

          </div>

          {/* Stats */}

          <div className="mt-16 grid grid-cols-3 gap-4 sm:flex sm:gap-12">
            {hero.stats.map((item, index) => (
              <div key={`${item.label}-${index}`}>
                <h2 className={`text-3xl font-bold sm:text-4xl ${index === 0 ? "text-cyan-400" : index === 1 ? "text-blue-400" : "text-purple-400"}`}>{item.value}</h2>
                <p className="text-gray-500">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Previous code showcase is temporarily disabled below. */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8, delay: .2 }}
          className="relative mx-auto w-full max-w-[590px] px-4 py-16 sm:px-12 lg:px-8"
        >
          <div className="absolute inset-x-16 top-20 h-72 rounded-full bg-cyan-500/20 blur-[100px]" />
          <div className="absolute bottom-8 right-12 h-44 w-44 rounded-full bg-purple-600/20 blur-[90px]" />

          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="relative overflow-hidden rounded-[28px] border border-cyan-400/30 bg-[#0d1625] shadow-[0_25px_90px_rgba(6,182,212,.18)]"
          >
            <img src={heroDashboardVisual} alt="Modern analytics dashboard" className="aspect-[4/3] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07111d] via-transparent to-cyan-500/5" />
            <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-[#111827]/90 px-6 py-5 backdrop-blur-xl">
              <h3 className="font-bold text-white">Digital Growth Dashboard</h3>
              <p className="mt-1 text-sm text-gray-400">React.js · Node.js · Tailwind</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
            className="absolute left-0 top-4 z-10 hidden rounded-2xl border border-cyan-400/30 bg-[#111827]/95 p-4 shadow-[0_18px_45px_rgba(6,182,212,.18)] backdrop-blur-xl lg:block lg:-left-4 lg:top-20"
          >
            <p className="text-[10px] uppercase tracking-wider text-gray-400">Active Projects</p>
            <p className="mt-1 text-2xl font-black text-cyan-400">48+</p>
            <p className="mt-1 text-xs text-emerald-400">↑ 18% this month</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1, delay: .3, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
            className="absolute right-0 top-8 z-10 hidden rounded-2xl border border-purple-400/40 bg-[#111827]/95 p-4 shadow-[0_18px_45px_rgba(168,85,247,.16)] backdrop-blur-xl lg:block lg:-right-5 lg:top-32"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-purple-400">✦ New Project</p>
            <p className="mt-1 text-sm font-bold text-white">AI Automation</p>
            <p className="mt-1 text-xs text-gray-400">Kick-off: Tomorrow</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1, delay: .6, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
            className="absolute -bottom-1 right-2 z-10 hidden min-w-44 rounded-2xl border border-blue-400/35 bg-[#111827]/95 p-4 shadow-[0_18px_45px_rgba(59,130,246,.18)] backdrop-blur-xl lg:block lg:-right-1 lg:bottom-8"
          >
            <p className="text-[10px] uppercase tracking-wider text-gray-400">Project Status</p>
            <p className="mt-1 text-sm font-bold text-white">Business Platform</p>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                <motion.div initial={{ width: 0 }} animate={{ width: "82%" }} transition={{ duration: 1.2, delay: .8 }} className="h-full rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400" />
              </div>
              <span className="text-xs font-bold text-purple-400">82%</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side Code Card */}
        {false && (
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8, delay: .2 }}
          whileHover={{ y: -8 }}
           className="relative mx-auto w-full max-w-[400px] lg:max-w-[420px] scale-90"
        >
          <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-2xl"></div>

          <div className="relative rounded-2xl bg-[#111827]/90 border border-white/10 overflow-hidden shadow-2xl">

            {/* Header */}

            <div className="flex items-center gap-2 px-5 py-4 border-b border-white/10">

              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>

              <span className="ml-4 text-gray-400 text-sm">
                nexcore @latest
              </span>

            </div>

           <pre className="bg-[#0B1120] text-sm leading-7 p-6 rounded-xl overflow-x-auto font-mono">
  <code>
    <span className="text-purple-400">import</span>{" "}
    <span className="text-cyan-300">nexcore</span>{" "}
    <span className="text-purple-400">as</span>{" "}
    <span className="text-orange-400">nc</span>

    {"\n\n"}

    <span className="text-cyan-300">pipeline</span>{" "}
    <span className="text-white">=</span>{" "}
    <span className="text-green-400">nc</span>
    <span className="text-white">.</span>
    <span className="text-yellow-400">Pipeline</span>
    <span className="text-white">(</span>

    {"\n    "}
    <span className="text-red-400">model</span>
    <span className="text-white">=</span>
    <span className="text-green-300">"gpt-4"</span>
    <span className="text-white">,</span>

    {"\n    "}
    <span className="text-red-400">security</span>
    <span className="text-white">=</span>
    <span className="text-green-300">"zero-trust"</span>
    <span className="text-white">,</span>

    {"\n    "}
    <span className="text-red-400">infra</span>
    <span className="text-white">=</span>
    <span className="text-green-300">"kubernetes"</span>

    {"\n"}
    <span className="text-white">)</span>

    {"\n\n"}

    <span className="text-cyan-300">pipeline</span>
    <span className="text-white">.</span>
    <span className="text-yellow-400">deploy</span>
    <span className="text-white">(</span>
    <span className="text-red-400">env</span>
    <span className="text-white">=</span>
    <span className="text-green-300">"production"</span>
    <span className="text-white">)</span>

    {"\n\n"}

    <span className="text-green-400">✓ Deployment Successful</span>

    {"\n"}

    <span className="text-cyan-400">✓ 99.9% uptime guaranteed</span>
  </code>
</pre>

            <div className="border-t border-white/10 px-6 py-3 text-green-400 text-sm">
              ● LIVE &nbsp; Node 3.11 • k8s cluster • 0 errors
            </div>

          </div>
        </motion.div>
        )}

      </div>
    </section>
  );
}
