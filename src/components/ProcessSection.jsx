import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useSiteSettings from "../utils/useSiteSettings";

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
  },
];

export default function ProcessSection() {
  const { contentSettings } = useSiteSettings();
  const process = contentSettings.process;
  const managedSteps = process.steps?.length ? process.steps : steps;
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % managedSteps.length);
    }, Math.max(1200, Number(process.interval || 2200) * 0.75));

    return () => window.clearInterval(timer);
  }, [managedSteps.length, process.interval]);
  if (process.isActive === false) return null;

  return (
    <section id="process" className="relative overflow-hidden bg-[#07111d] py-20 text-white sm:py-24 lg:py-28">
      <div className="absolute right-0 top-0 h-full w-[42%] bg-blue-600/[0.08] blur-3xl" />

      <div className="relative mx-auto max-w-[1460px] px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/[0.08] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,.8)]" />
            {process.eyebrow}
          </div>

          <h2 className="mt-7 text-[40px] font-black leading-tight tracking-[-0.045em] sm:text-5xl lg:text-[62px]">
            {process.heading}{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 bg-clip-text text-transparent">
              {process.accentHeading}
            </span>
          </h2>
        </motion.div>

        <div className="relative mt-12 lg:mt-8">
          <div className="absolute left-6 top-6 h-[calc(100%-3rem)] w-px bg-gradient-to-b from-cyan-400/40 via-sky-500/35 to-blue-600/40 lg:left-[3.2%] lg:right-[5%] lg:top-[52px] lg:h-px lg:w-auto" />

          <div className="relative grid gap-4 lg:grid-cols-4 lg:gap-0">
            {managedSteps.map((step, index) => {
              const highlighted = index === activeStep;
              return (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                className={`relative pl-20 lg:min-h-[240px] lg:px-6 lg:pb-7 lg:pt-7 ${
                  highlighted
                    ? "rounded-3xl border border-cyan-400/30 bg-cyan-950/25 py-7 pr-6 shadow-[0_20px_60px_rgba(6,182,212,.1)] lg:-mt-5 lg:min-h-[240px] lg:py-7"
                    : "py-5 pr-3"
                }`}
              >
                <div
                  className={`absolute left-0 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border text-sm font-bold lg:static lg:mb-5 ${
                    highlighted
                      ? "border-cyan-300/40 bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-[0_0_24px_rgba(34,211,238,.35)]"
                      : "border-slate-700 bg-[#1a1f2c] text-slate-400"
                  }`}
                >
                  {step.number}
                </div>

                <h3 className={`text-lg font-bold ${highlighted ? "text-white" : "text-slate-300"}`}>
                  {step.title}
                </h3>
                <p className={`mt-3 max-w-[290px] text-[15px] leading-[1.75] ${highlighted ? "text-slate-300" : "text-slate-500"}`}>
                  {step.description}
                </p>
              </motion.article>
            )})}
          </div>
        </div>
      </div>
    </section>
  );
}
