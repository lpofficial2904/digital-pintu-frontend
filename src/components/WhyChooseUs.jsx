import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

import {
    FiZap,
    FiLock,
    FiDatabase,
    FiGlobe,
} from "react-icons/fi";

const features = [
    {
        icon: FiZap,
        title: "Delivery in 2–4 weeks",
        description:
            "Sprint-based, milestone-driven execution with weekly demos.",
    },
    {
        icon: FiLock,
        title: "Security-first architecture",
        description:
            "Every system built with zero-trust, encrypted-at-rest defaults.",
    },
    {
        icon: FiDatabase,
        title: "24/7 monitoring & support",
        description:
            "NOC team on-call, P1 response under 15 minutes.",
    },
    {
        icon: FiGlobe,
        title: "Global delivery, local care",
        description:
            "Teams across IST, GMT, and PST for overlap at every hour.",
    },
];
function AnimatedCounter({
    end,
    duration = 2500,
    suffix = "",
    start,
}) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) return;

        let frame;
        let startTime = null;

        const animate = (time) => {
            if (!startTime) startTime = time;

            const progress = Math.min(
                (time - startTime) / duration,
                1
            );

            const eased = 1 - Math.pow(1 - progress, 3);

            setCount(Math.floor(end * eased));

            if (progress < 1) {
                frame = requestAnimationFrame(animate);
            }
        };

        frame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frame);
    }, [start, end, duration]);

    return (
        <>
            {count}
            {suffix}
        </>
    );
}

const stats = [
    {
        label: "CLIENT RETENTION",
        end: 96,
        suffix: "%",
        sub: "Year-over-year",
    },
    {
        label: "CODE COVERAGE",
        end: 98,
        suffix: "%",
        sub: "Avg test suite",
    },
    {
        label: "DEPLOY FREQUENCY",
        text: "Daily",
        sub: "Across all accounts",
    },
    {
        label: "RESPONSE SLA",
        text: "<15m",
        sub: "P1 incidents",
    },
];

export default function WhyChooseUs() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.35,
    });
    return (
        <section ref={ref} className="bg-[#07111d] py-28 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* LEFT */}

                    <motion.div
                        initial={{ opacity: 0, x: -80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: .8 }}
                    >

                        <p className="uppercase tracking-[4px] text-cyan-400 text-sm font-semibold mb-6">
              // WHY NEXCORE
                        </p>

                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white">

                            Built for{" "}

                            <span className="bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 bg-clip-text text-transparent">
                                enterprises
                            </span>

                            <br />

                            that can't afford{" "}

                            <span className="bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 bg-clip-text text-transparent">
                                failure.
                            </span>

                        </h2>

                        <p className="mt-8 text-gray-400 leading-8 text-lg max-w-xl">
                            We don't just deliver code — we architect resilient
                            systems engineered for the demands of modern
                            business. Every engagement comes with SLA
                            guarantees, dedicated engineers, and ongoing
                            support.
                        </p>

                        {/* Features */}

                        <div className="mt-14 space-y-5">

                            {features.map((item, index) => {

                                const Icon = item.icon;

                                return (

                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.6,
                                            delay: index * 0.15,
                                            ease: "easeOut",
                                        }}
                                        whileHover={{
                                            y: -8,
                                            scale: 1.02,
                                            transition: { duration: 0.3 },
                                        }}
                                        className="group relative overflow-hidden border border-[#1f2b3d] bg-[#0d1625] p-4 sm:p-6 flex items-start gap-4 sm:gap-5 rounded-lg transition-all duration-500 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
                                    >
                                        {/* Hover Glow */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-cyan-500/5 via-transparent to-violet-500/5"></div>

                                        {/* Icon */}
                                        <motion.div
                                            whileHover={{
                                                rotate: 360,
                                                scale: 1.15,
                                            }}
                                            transition={{ duration: 0.7 }}
                                            className="relative w-12 h-12 border border-cyan-500 rounded-md flex items-center justify-center text-cyan-400 text-xl flex-shrink-0"
                                        >
                                            <Icon />
                                        </motion.div>

                                        {/* Content */}
                                        <div className="relative">
                                            <h3 className="text-white font-semibold text-xl">
                                                {item.title}
                                            </h3>

                                            <p className="text-gray-400 mt-2 leading-7">
                                                {item.description}
                                            </p>
                                        </div>

                                        {/* Bottom Border Animation */}
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileHover={{ width: "100%" }}
                                            transition={{ duration: 0.4 }}
                                            className="absolute left-0 bottom-0 h-[2px] bg-gradient-to-r from-cyan-400 to-violet-500" />
                                    </motion.div>


                                );
                            })}

                        </div>

                    </motion.div>

                    {/* RIGHT */}

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                        {stats.map((item, index) => (

                            <div
                                key={index}
                                className="bg-[#111b2a] border border-[#223046] p-6 sm:p-8 hover:border-cyan-500 transition-all duration-300"
                            >

                                <p className="text-xs tracking-[3px] text-gray-500 uppercase mb-6">
                                    {item.label}
                                </p>

                                <h3 className="text-5xl font-bold text-cyan-400">

                                    {item.end ? (

                                        <AnimatedCounter
                                            end={item.end}
                                            duration={3000}
                                            suffix={item.suffix}
                                            start={inView}
                                        />

                                    ) : (

                                        item.text

                                    )}

                                </h3>

                                <p className="text-gray-400 mt-4">
                                    {item.sub}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </div>
        </section>
    );
}
