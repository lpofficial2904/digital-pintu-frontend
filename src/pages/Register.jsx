import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner"; 
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!name || !email || !password || !confirmPassword) {
      return toast.error("Please fill all fields");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);

  

    const registerAction = () =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await fetch(
            "https://digital-pintu-backend.onrender.com/api/auth/register",
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name, email, password }),
            }
          );

          const data = await response.json();

          if (!response.ok) {
            return reject(new Error(data.message || "Registration Failed"));
          }

          // Store local authentication variables
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          resolve(data);
        } catch (err) {
          reject(new Error("Server Error. Please try again later."));
        }
      });

    // 4. Trigger the Sonner Promise Toast
    toast.promise(registerAction(), {
      loading: "Creating your profile...",
      success: () => {
        setLoading(false);
        navigate("/");
        return "Registration Successful! 🎉";
      },
      error: (err) => {
        setLoading(false);
        return err.message;
      },
    });
  };

  return (
    <section className="min-h-screen bg-[#07111d] relative overflow-hidden flex items-center justify-center px-6 py-20">
      {/* Background Blobs */}
      <div className="absolute w-[450px] h-[450px] bg-cyan-500/20 blur-[140px] rounded-full -top-32 -left-32"></div>
      <div className="absolute w-[400px] h-[400px] bg-violet-500/20 blur-[140px] rounded-full bottom-0 right-0"></div>

      {/* Card Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 shadow-[0_20px_80px_rgba(0,0,0,.5)]"
      >
        {/* Headings */}
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-white"
          >
            Create Account
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-gray-400 mt-3"
          >
            Join us and start your journey today.
          </motion.p>
        </div>

        {/* Form Elements */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Username Input */}
          <div>
            <label className="text-gray-300 text-sm block mb-2">Username</label>
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-lg" />
              <input
                type="text"
                placeholder="Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-14 pl-12 pr-4 rounded-xl bg-[#111827] border border-gray-700 text-white outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="text-gray-300 text-sm block mb-2">Email</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-lg" />
              <input
                type="email"
                placeholder="Enter Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 pl-12 pr-4 rounded-xl bg-[#111827] border border-gray-700 text-white outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="text-gray-300 text-sm block mb-2">Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-lg" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 pl-12 pr-12 rounded-xl bg-[#111827] border border-gray-700 text-white outline-none focus:border-cyan-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="text-gray-300 text-sm block mb-2">Confirm Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-lg" />
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-14 pl-12 pr-12 rounded-xl bg-[#111827] border border-gray-700 text-white outline-none focus:border-cyan-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400"
              >
                {showConfirm ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Submit Action */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            disabled={loading}
            type="submit"
            className="w-full h-14 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </motion.button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-8 text-gray-400"
        >
          Already have an account?
          <Link
            to="/login"
            className="text-cyan-400 ml-2 hover:text-cyan-300 font-semibold"
          >
            Login
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}