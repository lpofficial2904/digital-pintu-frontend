
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import {
  FiBriefcase,
  FiMessageSquare,
  FiStar,
  FiSend,
  FiUser,
  FiHome,
} from "react-icons/fi";

// const API = "http://localhost:5000/api/reviews";
const API = `${import.meta.env.VITE_API_URL || "https://api.digitalpintu.com"}/api/reviews`;

export default function AddReview({ onReviewAdded }) {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [designation, setDesignation] = useState("");
  const [company, setCompany] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please Login First");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(API, {
        method: "POST",
         credentials: "include",

        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          designation,
          company,
          review,
          rating,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      
      toast.success('Review Added Successfully !');

     setDesignation("");
setCompany("");
setReview("");
setRating(5);

      if (onReviewAdded) {
        onReviewAdded();
      }

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-[#07111d]">

      <div className="max-w-3xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
          className="bg-[#101827] rounded-3xl border border-white/10 p-8"
        >

          <h2 className="text-4xl font-bold text-white text-center mb-8">
            Share Your Review
          </h2>

          {user && (
            <div className="flex items-center gap-4 mb-8">

              <img
                src={user.avatar}
                alt=""
                className="w-16 h-16 rounded-full border-2 border-cyan-400"
              />

              <div>
                <h3 className="text-white font-semibold">
                  {user.name}
                </h3>

                <p className="text-gray-400">
                  {user.email}
                </p>
              </div>

            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Designation */}

            <div className="relative">

              <FiBriefcase className="absolute left-4 top-5 text-cyan-400" />

              <input
                type="text"
                placeholder="Designation"
                required
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="w-full h-14 rounded-xl bg-[#0d1725] pl-12 pr-5 text-white border border-white/10"
              />

            </div>

            {/* Company */}

           <div className="relative">

  <FiHome className="absolute left-4 top-5 text-cyan-400" />

  <input
    type="text"
    placeholder="Company"
    required
    value={company}
    onChange={(e) => setCompany(e.target.value)}
    className="w-full h-14 rounded-xl bg-[#0d1725] pl-12 pr-5 text-white border border-white/10"
  />

</div>

            {/* Rating */}

            <div className="relative">

              <FiStar className="absolute left-4 top-5 text-cyan-400" />

              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full h-14 rounded-xl bg-[#0d1725] pl-12 pr-5 text-white border border-white/10"
              >
                <option value={5}>⭐⭐⭐⭐⭐</option>
                <option value={4}>⭐⭐⭐⭐</option>
                <option value={3}>⭐⭐⭐</option>
                <option value={2}>⭐⭐</option>
                <option value={1}>⭐</option>
              </select>

            </div>

            {/* Review */}

            <div className="relative">

              <FiMessageSquare className="absolute left-4 top-5 text-cyan-400" />

              <textarea
                rows="5"
                placeholder="Write your review..."
                required
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full rounded-xl bg-[#0d1725] pl-12 pt-4 pr-5 text-white border border-white/10"
              />

            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: .97 }}
              disabled={loading}
              className="w-full h-14 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </motion.button>

          </form>

        </motion.div>

      </div>

    </section>
  );
}
