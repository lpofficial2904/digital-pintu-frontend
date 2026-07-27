import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
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
            • Digital Pintu IT Solutions • Est. 2014
          </div>

          <h1 className="max-w-full break-words text-[2.15rem] font-bold leading-tight min-[400px]:text-4xl sm:text-5xl">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Architecting
            </span>

            <br />

            <span className="text-white">
              The Next-Gen
            </span>

            <br />

            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Digital Future.
            </span>
          </h1>

          <p className="mt-8 max-w-xl break-words text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">
           Transforming ideas into powerful digital experiences with innovative websites, mobile apps, UI/UX design, SEO, and result-driven marketing solutions that fuel business success.
          </p>

          <div className="mt-10 flex min-w-0 flex-wrap gap-5">

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(0,255,255,.35)",
              }}
              whileTap={{ scale: .95 }}
              className="flex w-full items-center justify-center gap-2 rounded bg-cyan-400 px-5 py-4 font-bold text-black sm:w-auto sm:px-8"
            >
              <Link to="/contact">Start Your Project</Link>
              <ArrowRight size={18} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="w-full rounded-lg border border-purple-500 px-5 py-4 text-white hover:bg-purple-500/10 sm:w-auto sm:px-8"
            >
              {/* Explore Services */}
              <Link to="/services">Explore Services</Link>

            </motion.button>

          </div>

          {/* Stats */}

          <div className="mt-16 grid grid-cols-3 gap-4 sm:flex sm:gap-12">

            <div>
              <h2 className="text-3xl font-bold text-cyan-400 sm:text-4xl">500+</h2>
              <p className="text-gray-500">Projects</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-blue-400 sm:text-4xl">99.9%</h2>
              <p className="text-gray-500">Uptime</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-purple-400 sm:text-4xl">150+</h2>
              <p className="text-gray-500">Clients</p>
            </div>

          </div>
        </motion.div>

        {/* Right Side Code Card */}

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

      </div>
    </section>
  );
}
