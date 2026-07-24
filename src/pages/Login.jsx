import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from 'sonner';

// const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); 

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    // const loginAction = () => 
    //   new Promise(async (resolve, reject) => {
    //     try {
    //       const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    //         method: "POST",
    //         credentials: "include",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(form),
    //       });

    //       const data = await res.json();

    //       if (!data.success) {
       
    //         return reject(new Error(data.message || "Login failed"));
    //       }

    //       localStorage.setItem("token", data.token);
    //       localStorage.setItem("user", JSON.stringify(data.user));
    //       resolve(data);
    //     } catch (err) {
    //       reject(new Error("Server Error. Please try again."));
    //     }
    //   });


    const loginAction = () =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        return reject(new Error(data.message || "Login failed"));
      }

      // localStorage.setItem("token", data.token);
      
      localStorage.setItem("user", JSON.stringify(data.user));

      resolve(data);
    } catch (err) {
      reject(new Error("Server Error. Please try again."));
    }
  });
  
    toast.promise(loginAction(), {
      loading: "Logging you in...",
      success: (data) => {
        login(data.user); 
        navigate("/");  
        setLoading(false);
        return `Welcome back, ${data.user.name || "User"}!`;
      },
      error: (err) => {
        setLoading(false);
        return err.message; 
      },
    });
  };

  return (
    <section className="min-h-screen bg-[#07111d] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md bg-[#101b2a] border border-[#233147] rounded-2xl p-10 shadow-2xl"
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          Welcome Back
        </h1>

        <p className="text-gray-400 mb-8">
          Login to continue
        </p>

       

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full bg-[#162233] border border-[#2a3d58] rounded-lg px-5 py-4 text-white outline-none focus:border-cyan-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full bg-[#162233] border border-[#2a3d58] rounded-lg px-5 py-4 text-white outline-none focus:border-cyan-400"
          />

          <button
            disabled={loading}
            className="w-full py-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 transition text-black font-bold disabled:opacity-50"
          >
            {loading ? "Please Wait..." : "Login"}
          </button>
        </form>

        <p className="text-gray-400 mt-6 text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-cyan-400 hover:text-cyan-300"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </section>
  );
}
