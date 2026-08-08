import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiCalendar, FiClock, FiSearch } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getCachedJson } from "../utils/publicApi";
import { getBlogImage } from "../utils/blogImages";
import useSiteSettings from "../utils/useSiteSettings";

const readTime = (blog) => Math.max(1, Math.ceil(`${blog.excerpt || ""} ${blog.content || ""}`.split(/\s+/).length / 200));
const formatDate = (value) => new Intl.DateTimeFormat("en-IN", { day:"numeric", month:"short", year:"numeric" }).format(new Date(value));

export default function Blogs() {
  const { contentSettings } = useSiteSettings();
  const copy = contentSettings.blogsPage;
  const [blogs, setBlogs] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState(""); const [query, setQuery] = useState("");
  useEffect(() => { let active=true; const load=()=>getCachedJson("/api/blogs",{force:true,maxAge:0}).then(data=>{if(active){setBlogs(Array.isArray(data)?data:[]);setError("");}}).catch(()=>active&&setError("We could not load the blogs. Please try again shortly.")).finally(()=>active&&setLoading(false)); load(); window.addEventListener("focus",load); return()=>{active=false;window.removeEventListener("focus",load);}; },[]);
  const filtered = useMemo(() => { const needle=query.trim().toLowerCase(); return needle ? blogs.filter(blog=>[blog.title,blog.excerpt,blog.category,...(blog.tags||[])].some(value=>String(value||"").toLowerCase().includes(needle))) : blogs; },[blogs,query]);
  const featured=filtered[0]; const remaining=filtered.slice(1);
  const prefetch=(slug)=>getCachedJson(`/api/blogs/${encodeURIComponent(slug)}`,{maxAge:600000}).catch(()=>{});
  return <div className="min-h-screen overflow-hidden bg-[#050b14] text-white"><Navbar/><main className="relative px-5 pb-28 pt-36">
    <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[150px]"/>
    <section className="relative mx-auto max-w-7xl">
      <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} className="mx-auto mb-12 max-w-4xl text-center"><span className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-400/10 px-5 py-2 text-xs font-bold uppercase tracking-[.3em] text-cyan-300">{copy.eyebrow}</span><h1 className="mt-7 text-5xl font-black tracking-tight sm:text-7xl">{copy.heading} <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">{copy.accentHeading}</span></h1><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">{copy.description}</p></motion.div>
      <div className="relative mx-auto mb-12 max-w-xl"><FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search articles, topics or categories..." className="w-full rounded-2xl border border-white/10 bg-white/[.045] py-4 pl-13 pr-5 text-sm outline-none backdrop-blur-xl transition focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-400/5"/></div>
      {loading&&<div className="grid gap-7 lg:grid-cols-2"><div className="h-[460px] animate-pulse rounded-[2rem] bg-white/5"/><div className="grid gap-7 sm:grid-cols-2">{[1,2,3,4].map(x=><div key={x} className="h-72 animate-pulse rounded-3xl bg-white/5"/>)}</div></div>}
      {error&&<p className="rounded-3xl border border-red-400/20 bg-red-500/10 p-8 text-center text-gray-300">{error}</p>}
      {!loading&&!error&&featured&&<>
        <motion.article initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} onMouseEnter={()=>prefetch(featured.slug)} className="group relative mb-10 grid overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[.075] to-white/[.02] shadow-2xl shadow-cyan-950/20 lg:grid-cols-[1.2fr_.8fr]">
          <div className="relative min-h-72 overflow-hidden lg:min-h-[430px]">{getBlogImage(featured)?<img src={getBlogImage(featured)} alt={featured.imageAlt||featured.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"/>:<div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-700/20"/>}<div className="absolute inset-0 bg-gradient-to-t from-[#07111d]/90 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#09131f]"/><span className="absolute left-6 top-6 rounded-full border border-white/15 bg-slate-950/70 px-4 py-2 text-xs font-bold uppercase tracking-widest text-cyan-300 backdrop-blur">Featured insight</span></div>
          <div className="flex flex-col justify-center p-7 sm:p-10"><span className="w-fit rounded-full bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-300">{featured.category||"Insights"}</span><h2 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">{featured.title}</h2><p className="mt-5 line-clamp-3 leading-7 text-slate-400">{featured.excerpt}</p><div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-500"><span className="flex items-center gap-1.5"><FiCalendar/> {formatDate(featured.publishedAt||featured.createdAt)}</span><span className="flex items-center gap-1.5"><FiClock/> {readTime(featured)} min read</span></div><Link to={`/blogs/${featured.slug}`} className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-300">Read full article <FiArrowUpRight/></Link></div>
        </motion.article>
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{remaining.map((blog,index)=><motion.article key={blog._id} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:index*.04}} onMouseEnter={()=>prefetch(blog.slug)} className="group flex overflow-hidden rounded-3xl border border-white/10 bg-white/[.035] transition duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-950/30"><Link to={`/blogs/${blog.slug}`} className="flex w-full flex-col"><div className="relative h-56 overflow-hidden">{getBlogImage(blog)?<img src={getBlogImage(blog)} alt={blog.imageAlt||blog.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110"/>:<div className="h-full bg-gradient-to-br from-cyan-500/20 to-blue-700/20"/>}<span className="absolute left-5 top-5 rounded-full bg-slate-950/75 px-3 py-1.5 text-xs text-cyan-300 backdrop-blur">{blog.category||"Insights"}</span></div><div className="flex flex-1 flex-col p-6"><div className="flex gap-4 text-xs text-slate-500"><span className="flex items-center gap-1"><FiCalendar/> {formatDate(blog.publishedAt||blog.createdAt)}</span><span className="flex items-center gap-1"><FiClock/> {readTime(blog)} min</span></div><h2 className="mt-4 text-xl font-bold leading-snug transition group-hover:text-cyan-300">{blog.title}</h2><p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">{blog.excerpt}</p><span className="mt-6 inline-flex items-center gap-2 font-semibold text-cyan-400">Read article <FiArrowUpRight className="transition group-hover:translate-x-1 group-hover:-translate-y-1"/></span></div></Link></motion.article>)}</div>
      </>}
      {!loading&&!error&&!filtered.length&&<p className="rounded-3xl border border-dashed border-white/15 p-12 text-center text-gray-400">{query?"No articles match your search.":copy.emptyMessage}</p>}
    </section>
  </main><Footer/></div>;
}
