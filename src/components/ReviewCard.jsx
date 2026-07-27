import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const accentStyles = [
  {
    avatar: "border-cyan-400/60 bg-cyan-500/25 text-cyan-200",
  },
  {
    avatar: "border-sky-400/60 bg-sky-500/25 text-sky-100",
  },
  {
    avatar: "border-blue-400/50 bg-blue-500/20 text-blue-200",
  },
];

const getInitials = (name = "Client") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

export default function ReviewCard({ review, active = false, accentIndex = 0 }) {
  const accent = accentStyles[accentIndex % accentStyles.length];
  const rating = Math.max(1, Math.min(5, Number(review.rating) || 5));

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: active ? 1 : 0.42, y: 0, scale: active ? 1.015 : 1 }}
      whileHover={{ opacity: 1, y: -4 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`flex min-h-[362px] w-full flex-col rounded-[26px] border px-8 py-10 transition-colors duration-500 sm:px-10 ${
        active
          ? "border-cyan-400/45 bg-[#101b2a] shadow-[0_18px_55px_rgba(6,182,212,0.12)]"
          : "border-white/[0.07] bg-[#151923]"
      }`}
    >
      <div className="flex gap-1.5" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, index) => (
          <FaStar
            key={index}
            className={`text-[14px] ${
              index < rating ? "text-[#ffac39]" : "text-[#a06d28]/45"
            }`}
          />
        ))}
      </div>

      <blockquote className="mt-7 flex-1">
        <p className="text-[17px] italic leading-[1.85] text-slate-300">
          “{review.review}”
        </p>
      </blockquote>

      <footer className="mt-8 flex items-center gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${accent.avatar}`}
          aria-hidden="true"
        >
          {getInitials(review.name)}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-base font-bold text-white">{review.name}</h3>
          <p className="mt-1 truncate text-sm text-slate-500">
            {[review.designation, review.company].filter(Boolean).join(", ")}
          </p>
        </div>
      </footer>
    </motion.article>
  );
}
