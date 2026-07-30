import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiCalendar, FiUser } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getCachedJson } from "../utils/publicApi";
import { getBlogImage } from "../utils/blogImages";

export default function BlogDetails() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    setError("");
    getCachedJson(`/api/blogs/${encodeURIComponent(slug)}`, {
      maxAge: 10 * 60 * 1000,
    })
      .then((data) => {
        if (active) setBlog(data);
      })
      .catch(() => {
        if (active) setError("This blog could not be found.");
      });
    return () => { active = false; };
  }, [slug]);
  if (error) return <div className="min-h-screen bg-[#050b14] text-white"><Navbar /><main className="flex min-h-screen items-center justify-center px-5"><div className="text-center"><p className="text-gray-300">{error}</p><Link to="/blogs" className="mt-5 inline-block text-cyan-400">Back to blogs</Link></div></main></div>;
  if (!blog) return <div className="min-h-screen bg-[#050b14] px-5 pt-40"><div className="mx-auto h-96 max-w-4xl animate-pulse rounded-3xl bg-white/5" /></div>;
  const title = blog.metaTitle || `${blog.title} | Digital Pintu`;
  const description = blog.metaDescription || blog.excerpt;
  const blogImage = getBlogImage(blog);
  return <div className="min-h-screen bg-[#050b14] text-white"><Helmet><title>{title}</title><meta name="description" content={description} />{blog.metaKeywords && <meta name="keywords" content={blog.metaKeywords} />}</Helmet><Navbar /><main className="px-5 pb-24 pt-36"><article className="mx-auto max-w-4xl"><Link to="/blogs" className="inline-flex items-center gap-2 text-cyan-400"><FiArrowLeft /> All blogs</Link><div className="mt-8"><span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">{blog.category || "General"}</span><h1 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">{blog.title}</h1><div className="mt-6 flex flex-wrap gap-5 text-sm text-gray-400"><span className="flex items-center gap-2"><FiUser /> {blog.author}</span><span className="flex items-center gap-2"><FiCalendar /> {new Date(blog.createdAt).toLocaleDateString()}</span></div></div>{blogImage && <img src={blogImage} alt={blog.title} className="mt-10 max-h-[520px] w-full rounded-3xl object-cover" />}<p className="mt-10 text-xl leading-9 text-gray-300">{blog.excerpt}</p><div className="mt-8 whitespace-pre-wrap text-base leading-8 text-gray-400">{blog.content}</div></article></main><Footer /></div>;
}
