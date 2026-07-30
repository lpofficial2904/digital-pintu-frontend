import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCalendar } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getCachedJson } from "../utils/publicApi";
import { getBlogImage } from "../utils/blogImages";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    getCachedJson("/api/blogs", { maxAge: 5 * 60 * 1000 })
      .then((data) => {
        if (active) setBlogs(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (active) setError("We could not load the blogs. Please try again shortly.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const prefetchBlog = (slug) => {
    getCachedJson(`/api/blogs/${encodeURIComponent(slug)}`, {
      maxAge: 10 * 60 * 1000,
    }).catch(() => {});
  };
  return <div className="min-h-screen bg-[#050b14] text-white"><Navbar /><main className="px-5 pb-24 pt-36"><section className="mx-auto max-w-7xl">
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mb-14 max-w-3xl text-center"><span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2 text-sm uppercase tracking-[3px] text-cyan-300">Our Blog</span><h1 className="mt-6 text-4xl font-black sm:text-5xl">Insights for your <span className="text-cyan-400">digital growth</span></h1><p className="mt-5 text-gray-400">Explore practical ideas, technology updates, and business insights from Digital Pintu.</p></motion.div>
    {loading && <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="h-96 animate-pulse rounded-3xl bg-white/5" />)}</div>}
    {error && <p className="rounded-3xl border border-red-400/20 bg-red-500/10 p-8 text-center text-gray-300">{error}</p>}
    {!loading && !error && <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{blogs.map((blog, index) => { const blogImage = getBlogImage(blog); return <motion.article key={blog._id} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }} onMouseEnter={() => prefetchBlog(blog.slug)} onFocus={() => prefetchBlog(blog.slug)} className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[.035] transition hover:-translate-y-2 hover:border-cyan-400/40">{blogImage ? <img src={blogImage} alt={blog.title} loading="lazy" decoding="async" className="h-52 w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="h-52 bg-gradient-to-br from-cyan-500/20 to-blue-600/20" />}<div className="p-6"><div className="flex items-center justify-between gap-3 text-xs text-gray-400"><span className="rounded-full bg-cyan-500/10 px-3 py-1 text-cyan-300">{blog.category || "General"}</span><span className="flex items-center gap-1"><FiCalendar /> {new Date(blog.createdAt).toLocaleDateString()}</span></div><h2 className="mt-5 text-2xl font-bold transition group-hover:text-cyan-300">{blog.title}</h2><p className="mt-3 line-clamp-3 leading-7 text-gray-400">{blog.excerpt}</p><Link to={`/blogs/${blog.slug}`} className="mt-6 inline-flex items-center gap-2 font-semibold text-cyan-400">Read article <FiArrowRight /></Link></div></motion.article>; })}</div>}
    {!loading && !error && !blogs.length && <p className="rounded-3xl border border-dashed border-white/15 p-10 text-center text-gray-400">No blogs are available yet.</p>}
  </section></main><Footer /></div>;
}
