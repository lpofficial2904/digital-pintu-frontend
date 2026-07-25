import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const loginAction = async () => {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message || "Login failed");
      localStorage.setItem("user", JSON.stringify(data.user));
      return data;
    };

    toast.promise(loginAction(), {
      loading: "Logging you in...",
      success: (data) => {
        login(data.user);
        setLoading(false);

        if (location.state?.returnToContact) {
          navigate("/#contact", { replace: true });
          window.setTimeout(() => {
            document.getElementById("contact")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 150);
        } else {
          navigate("/");
        }

        return `Welcome back, ${data.user.name || "User"}!`;
      },
      error: (error) => {
        setLoading(false);
        return error.message || "Server error. Please try again.";
      },
    });
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050b14] px-5 py-12 text-white">
      <motion.div
        className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-cyan-500/20 blur-[130px]"
        animate={{ x: [0, 70, 0], y: [0, 35, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-48 -right-40 h-[560px] w-[560px] rounded-full bg-blue-600/20 blur-[140px]"
        animate={{ x: [0, -60, 0], y: [0, -40, 0], scale: [1.1, 0.95, 1.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-white/10 bg-[#0b1625]/85 p-7 shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:p-10"
      >
        <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-cyan-300">
            <FiArrowLeft /> Back to website
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-8 mt-8"
        >
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/10 text-2xl text-cyan-300 shadow-[0_0_35px_rgba(34,211,238,0.12)]">
            <FiLock />
          </div>
          <h1 className="text-4xl font-black tracking-tight">Welcome back</h1>
          <p className="mt-2 text-gray-400">
            {location.state?.returnToContact
              ? "Log in to securely submit your contact request."
              : "Log in to continue to your account."}
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.35 } } }}
          className="space-y-5"
        >
          <motion.label variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="block">
            <span className="mb-2 block text-sm font-medium text-gray-300">Email address</span>
            <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 transition focus-within:border-cyan-400/70 focus-within:ring-2 focus-within:ring-cyan-400/10">
              <FiMail className="shrink-0 text-cyan-400" />
              <input type="email" name="email" value={form.email} onChange={handleChange} required autoComplete="email" placeholder="you@example.com" className="w-full bg-transparent py-3.5 outline-none placeholder:text-gray-600" />
            </span>
          </motion.label>

          <motion.label variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="block">
            <span className="mb-2 block text-sm font-medium text-gray-300">Password</span>
            <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 transition focus-within:border-cyan-400/70 focus-within:ring-2 focus-within:ring-cyan-400/10">
              <FiLock className="shrink-0 text-cyan-400" />
              <input type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange} required autoComplete="current-password" placeholder="Enter your password" className="w-full bg-transparent py-3.5 outline-none placeholder:text-gray-600" />
              <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"} className="text-gray-400 transition hover:text-cyan-300">
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </span>
          </motion.label>

          <motion.button
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ scale: loading ? 1 : 1.02, boxShadow: "0 0 38px rgba(34,211,238,0.25)" }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            disabled={loading}
            className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 py-4 font-bold text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
          >
            <AnimatePresence mode="wait">
              <motion.span key={loading ? "loading" : "login"} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                {loading ? "Signing in..." : "Login securely"}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </motion.form>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }} className="mt-7 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-cyan-400 transition hover:text-cyan-300">Create an account</Link>
        </motion.p>
      </motion.div>
    </section>
  );
}
