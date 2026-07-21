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

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-20 items-center min-h-[85vh]">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
        >
          <div className="inline-flex items-center gap-2 border border-cyan-500/40 bg-cyan-500/10 px-5 py-2 text-xs tracking-[3px] uppercase text-cyan-300 rounded-md mb-8">
            • Next-Gen IT Solutions • Est. 2012
          </div>

          <h1 className="text-5xl md:text-5xl font-bold leading-tight">
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

          <p className="mt-8 text-gray-400 text-lg leading-8 max-w-xl">
            We engineer transformative technology solutions—from cloud-native
            infrastructure and AI systems to bulletproof cybersecurity.
            Your vision. Our execution.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(0,255,255,.35)",
              }}
              whileTap={{ scale: .95 }}
              className="px-8 py-4 rounded bg-cyan-400 text-black font-bold flex items-center gap-2"
            >
              <Link to="/contact">Start Your Project</Link>
              <ArrowRight size={18} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 rounded-lg border border-purple-500 text-white hover:bg-purple-500/10"
            >
              {/* Explore Services */}
              <Link to="/services">Explore Services</Link>

            </motion.button>

          </div>

          {/* Stats */}

          <div className="flex gap-12 mt-16">

            <div>
              <h2 className="text-4xl font-bold text-cyan-400">500+</h2>
              <p className="text-gray-500">Projects</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-blue-400">99.9%</h2>
              <p className="text-gray-500">Uptime</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-purple-400">150+</h2>
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