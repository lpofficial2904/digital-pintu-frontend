import { motion } from "framer-motion";
import { FaStar, FaQuoteRight, FaUser } from "react-icons/fa";

export default function ReviewCard({ review }) {
  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      transition={{ duration: 0.35 }}
      className="group relative h-full overflow-hidden rounded-2xl border border-slate-700 bg-[#111827] p-5 transition-all duration-500 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]"
    >
      {/* Glow */}
      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />

      {/* Quote */}
      <motion.div
        whileHover={{ rotate: 15, scale: 1.15 }}
        className="absolute top-6 right-6 text-cyan-500 text-4xl opacity-20"
      >
        <FaQuoteRight />
      </motion.div>

      {/* Stars */}
      <div className="relative flex gap-1 mb-6">
        {[...Array(review.rating || 5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: i * 0.08,
            }}
          >
            <FaStar className="text-cyan-400 text-lg" />
          </motion.div>
        ))}
      </div>

      {/* Review */}
      <p className="relative text-gray-300 leading-8 text-lg min-h-[150px]">
        "{review.review}"
      </p>

      {/* Divider */}
      <div className="relative my-8 border-t border-slate-700"></div>

      {/* User */}
      <div className="relative flex items-center gap-4">

        {review.avatar ? (

          <img
            src={review.avatar}
            alt={review.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500"
          />

        ) : (

          <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center text-2xl text-white">
            <FaUser />
          </div>

        )}

        <div>

          <h3 className="text-white font-bold text-xl">
            {review.name}
          </h3>

          <p className="text-cyan-400 text-sm mt-1">
            {review.designation}
          </p>

          <p className="text-gray-500 text-sm">
            {review.company}
          </p>

        </div>

      </div>

      {/* Bottom Line Animation */}
      <motion.div
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: .4 }}
        className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-cyan-400 to-blue-500"
      />
    </motion.div>
  );
}