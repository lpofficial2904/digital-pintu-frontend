import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReviewCard from "./ReviewCard";

const API_URL = "https://api.digitalpintu.com/api/reviews";

export default function ReviewSection({ refresh }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let mounted = true;
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_URL}?_t=${Date.now()}`, {
          cache: "no-store",
        });
        const data = await response.json();
        if (mounted && data.success) {
          const managedReviews = [...(data.reviews || [])].sort(
            (first, second) => Number(second.featured) - Number(first.featured)
          );
          setReviews(managedReviews);
          const featuredIndex = managedReviews.findIndex((review) => review.featured);
          setActiveIndex(featuredIndex >= 0 ? featuredIndex : 0);
        }
      } catch {
        if (mounted) setReviews([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchReviews();
    return () => {
      mounted = false;
    };
  }, [refresh]);

  useEffect(() => {
    if (reviews.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % reviews.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [reviews.length]);

  const visibleReviews = useMemo(() => {
    if (!reviews.length) return [];
    if (reviews.length === 1) {
      return [{ review: reviews[0], index: 0, position: "center" }];
    }
    const previousIndex = (activeIndex - 1 + reviews.length) % reviews.length;
    const nextIndex = (activeIndex + 1) % reviews.length;
    return [
      { review: reviews[previousIndex], index: previousIndex, position: "left" },
      { review: reviews[activeIndex], index: activeIndex, position: "center" },
      { review: reviews[nextIndex], index: nextIndex, position: "right" },
    ];
  }, [activeIndex, reviews]);

  return (
    <section id="reviews" className="relative overflow-hidden bg-[#08111f] py-20 text-white sm:py-24">
      <div className="absolute inset-y-0 left-0 w-[34%] bg-cyan-950/10 blur-3xl" />
      <div className="relative mx-auto max-w-[1460px] px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/[0.08] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,.8)]" />
            Client Proof
          </div>
          <h2 className="mt-6 text-[40px] font-black leading-tight tracking-[-0.04em] sm:text-5xl lg:text-[62px]">
            Words from{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 bg-clip-text text-transparent">
              Happy Clients
            </span>
          </h2>
        </motion.div>

        {loading ? (
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-[362px] animate-pulse rounded-[26px] border border-white/[0.06] bg-white/[0.03]" />
            ))}
          </div>
        ) : reviews.length ? (
          <>
            <div className={`mt-9 grid gap-8 ${reviews.length === 1 ? "mx-auto max-w-xl" : "md:grid-cols-3"}`}>
              <AnimatePresence mode="popLayout" initial={false}>
                {visibleReviews.map(({ review, index, position }, cardIndex) => (
                  <motion.div
                    key={`${position}-${review._id}`}
                    layout
                    className={position === "center" ? "order-first md:order-none" : "hidden md:block"}
                    onClick={() => setActiveIndex(index)}
                  >
                    <ReviewCard
                      review={review}
                      active={position === "center"}
                      accentIndex={cardIndex}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {reviews.length > 1 && (
              <div className="mt-9 flex items-center justify-center gap-2" aria-label="Review carousel navigation">
                {reviews.map((review, index) => (
                  <button
                    key={review._id}
                    type="button"
                    aria-label={`Show review ${index + 1}`}
                    aria-current={index === activeIndex}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "w-7 bg-cyan-400"
                        : "w-2 bg-slate-700 hover:bg-slate-500"
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="mt-10 rounded-3xl border border-dashed border-white/10 p-10 text-center text-slate-500">
            Client reviews will appear here.
          </p>
        )}
      </div>
    </section>
  );
}
