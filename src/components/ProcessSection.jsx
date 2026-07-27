import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "Deep dive into your goals, users, and competitive landscape to shape a bulletproof strategy.",
  },
  {
    number: "02",
    title: "UI/UX Strategy",
    description:
      "Wireframes, information architecture, and high-fidelity Figma prototypes reviewed with you.",
  },
  {
    number: "03",
    title: "Build & Code",
    description:
      "Agile sprints with weekly demos. Clean, documented code shipped to your repo.",
  },
  {
    number: "04",
    title: "Launch & Scale",
    description:
      "CI/CD pipelines, performance monitoring, and growth-ready infrastructure from day one.",
    highlighted: true,
  },
];

export default function ProcessSection() {
  return (
    <section className="relative overflow-hidden bg-[#11151e] py-20 text-white sm:py-24 lg:py-28">
      <div className="absolute right-0 top-0 h-full w-[42%] bg-violet-950/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1460px] px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/[0.07] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-fuchsia-400">
            <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_10px_rgba(232,121,249,.8)]" />
            How We Work
          </div>

          <h2 className="mt-7 text-[40px] font-black leading-tight tracking-[-0.045em] sm:text-5xl lg:text-[62px]">
            From Idea to{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-400 bg-clip-text text-transparent">
              Launch
            </span>
          </h2>
        </motion.div>

        <div className="relative mt-12 lg:mt-8">
          <div className="absolute left-6 top-6 h-[calc(100%-3rem)] w-px bg-gradient-to-b from-cyan-400/35 via-violet-500/35 to-fuchsia-500/35 lg:left-[3.2%] lg:right-[5%] lg:top-[52px] lg:h-px lg:w-auto" />

          <div className="relative grid gap-4 lg:grid-cols-4 lg:gap-0">
            {steps.map((step, index) => (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                className={`relative pl-20 lg:min-h-[240px] lg:px-6 lg:pb-7 lg:pt-7 ${
                  step.highlighted
                    ? "rounded-3xl border border-violet-500/40 bg-violet-950/35 py-7 pr-6 shadow-[0_20px_60px_rgba(70,35,120,.12)] lg:-mt-5 lg:min-h-[240px] lg:py-7"
                    : "py-5 pr-3"
                }`}
              >
                <div
                  className={`absolute left-0 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border text-sm font-bold lg:static lg:mb-5 ${
                    step.highlighted
                      ? "border-cyan-300/40 bg-gradient-to-br from-cyan-400 to-violet-600 text-white shadow-[0_0_24px_rgba(34,211,238,.35)]"
                      : "border-slate-700 bg-[#1a1f2c] text-slate-400"
                  }`}
                >
                  {step.number}
                </div>

                <h3 className={`text-lg font-bold ${step.highlighted ? "text-white" : "text-slate-300"}`}>
                  {step.title}
                </h3>
                <p className={`mt-3 max-w-[290px] text-[15px] leading-[1.75] ${step.highlighted ? "text-slate-300" : "text-slate-500"}`}>
                  {step.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
