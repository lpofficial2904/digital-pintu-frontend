import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReviewCard from "./ReviewCard";
import { useAuth } from "../context/AuthContext";



// const API_URL = "http://localhost:5000/api/reviews";
const API_URL = "https://digital-pintu-backend.onrender.com/api/reviews";

export default function ReviewSection({ refresh }) {
  const { user } = useAuth();
  // console.log(user);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      // Cache bypass ensures the public section reflects moderation changes on refresh.
      const response = await fetch(`${API_URL}?_t=${Date.now()}`, { cache: "no-store" });

      const data = await response.json();
      // console.log(data);

      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

 useEffect(() => {
  fetchReviews();
}, [refresh]);

  return (
    <section id="reviews" className="bg-[#08111f] py-24 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >

          <p className="uppercase tracking-[5px] text-cyan-400 font-semibold text-sm">
            TESTIMONIALS
          </p>

          <h2 className="text-5xl md:text-6xl font-bold text-white mt-4">

            Trusted by

            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {" "}Industry Leaders
            </span>

          </h2>

          <p className="text-gray-400 mt-8 max-w-3xl mx-auto text-lg leading-8">

            We build scalable digital products that help
            startups and enterprises grow faster.

          </p>

        </motion.div>

        {/* Loading */}

        {loading ? (

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

            {[1,2,3,4,5,6].map((item)=>(
              <div
                key={item}
                className="h-[320px] rounded-2xl bg-[#111b2a] animate-pulse"
              />
            ))}

          </div>

        ) : (

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden:{},
              show:{
                transition:{
                  staggerChildren:.15
                }
              }
            }}
            className="grid lg:grid-cols-4 md:grid-cols-2 gap-8"
          >

            {reviews.map((review,index)=>(

              <motion.div

                key={review._id}

                variants={{
                  hidden:{
                    opacity:0,
                    y:50
                  },

                  show:{
                    opacity:1,
                    y:0
                  }

                }}

                transition={{
                  duration:.6
                }}

              >

                <ReviewCard review={review}/>

              </motion.div>

            ))}

          </motion.div>

        )}

      </div>

    </section>
  );
}
