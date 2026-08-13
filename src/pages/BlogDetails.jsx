import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiBookOpen, FiCalendar, FiCheck, FiClock, FiHome, FiUser } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getCachedJson } from "../utils/publicApi";
import { getBlogImage } from "../utils/blogImages";

const cleanLine = (line) => line.trim().replace(/^[-*•]\s*/, "");
const isListLine = (line) => /^([-*•]|\d+[.)])\s+/.test(line.trim());
const isHeading = (text, title) => {
  const value = text.trim();
  if (!value || value === title || value.length > 105 || /[.!]$/.test(value)) return false;
  return /[?:]$/.test(value) || /^(what|why|how|when|benefits|importance|conclusion|final thoughts|key|our|seo|google ads|local seo|on-page|off-page|technical seo)/i.test(value);
};
const sectionId = (text, index) => `section-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 40)}`;

function RichBlogContent({ content, title }) {
  const blocks = useMemo(() => String(content || "").replace(/\r/g, "").split(/\n\s*\n+/).map((block) => block.trim()).filter(Boolean), [content]);
  let headingNumber = 0;
  return <div className="blog-copy">{blocks.map((block, index) => {
    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
    if (lines.length === 1 && isHeading(lines[0], title)) { headingNumber += 1; return <h2 id={sectionId(lines[0], index)} key={index} data-number={String(headingNumber).padStart(2, "0")}>{lines[0].replace(/:$/, "")}</h2>; }
    if (lines.length > 1 && lines.every(isListLine)) return <ul key={index}>{lines.map((line, i) => <li key={i}><span><FiCheck/></span>{cleanLine(line).replace(/^\d+[.)]\s*/, "")}</li>)}</ul>;
    if (lines.length > 1 && isHeading(lines[0], title)) {
      const rest = lines.slice(1);
      headingNumber += 1;
      return <section key={index}><h2 id={sectionId(lines[0], index)} data-number={String(headingNumber).padStart(2, "0")}>{lines[0].replace(/:$/, "")}</h2>{rest.every(isListLine) ? <ul>{rest.map((line, i) => <li key={i}><span><FiCheck/></span>{cleanLine(line).replace(/^\d+[.)]\s*/, "")}</li>)}</ul> : <p>{rest.join(" ")}</p>}</section>;
    }
    if (lines.length >= 2 && lines.every((line) => line.length < 100 && !/[.!?]$/.test(line))) return <ul key={index}>{lines.map((line, i) => <li key={i}><span><FiCheck/></span>{cleanLine(line)}</li>)}</ul>;
    return <p key={index}>{lines.join(" ")}</p>;
  })}</div>;
}

export default function BlogDetails() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null); const [error, setError] = useState(""); const [progress, setProgress] = useState(0);
  useEffect(() => { let active = true; setError(""); getCachedJson(`/api/blogs/${encodeURIComponent(slug)}`, { maxAge: 600000 }).then((data) => active && setBlog(data)).catch(() => active && setError("This blog could not be found.")); return () => { active = false; }; }, [slug]);
  useEffect(() => { const update = () => { const total = document.documentElement.scrollHeight - window.innerHeight; setProgress(total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0); }; update(); window.addEventListener("scroll", update, { passive: true }); return () => window.removeEventListener("scroll", update); }, []);
  if (error) return <div className="min-h-screen bg-[#050b14] text-white"><Navbar/><main className="flex min-h-screen items-center justify-center"><div className="text-center"><p>{error}</p><Link to="/blogs" className="mt-5 inline-block text-cyan-400">Back to blogs</Link></div></main></div>;
  if (!blog) return <div className="min-h-screen bg-[#050b14] px-5 pt-40"><div className="mx-auto h-96 max-w-4xl animate-pulse rounded-3xl bg-white/5"/></div>;
  const title = blog.metaTitle || `${blog.title} | Digital Pintu`;
  const description = blog.metaDescription || blog.excerpt;
  const blogImage = getBlogImage(blog);
  const canonical = blog.canonicalUrl || `https://www.digitalpintu.com/blogs/${blog.slug}`;
  const contentBlocks = String(blog.content || "").replace(/\r/g, "").split(/\n\s*\n+/).map((block) => block.trim()).filter(Boolean);
  const sections = contentBlocks.map((block, index) => ({ text: block.split("\n")[0].trim(), index })).filter(({ text }) => isHeading(text, blog.title)).slice(0, 8);
  const articleSchema = { "@context":"https://schema.org", "@type":"BlogPosting", headline:blog.title, description, image:blog.ogImage || blogImage || undefined, datePublished:blog.publishedAt || blog.createdAt, dateModified:blog.updatedAt, author:{ "@type":"Organization", name:blog.author || "Digital Pintu" }, publisher:{ "@type":"Organization", name:"Digital Pintu", url:"https://www.digitalpintu.com" }, mainEntityOfPage:canonical, keywords:[blog.focusKeyword,...(blog.secondaryKeywords||[]),...(blog.tags||[])].filter(Boolean).join(", ") };
  const breadcrumbSchema = { "@context":"https://schema.org", "@type":"BreadcrumbList", itemListElement:[{ "@type":"ListItem", position:1, name:"Home", item:"https://www.digitalpintu.com/" },{ "@type":"ListItem", position:2, name:"Blog", item:"https://www.digitalpintu.com/blogs" },{ "@type":"ListItem", position:3, name:blog.title, item:canonical }] };
  const faqSchema = blog.faqs?.length ? { "@context":"https://schema.org", "@type":"FAQPage", mainEntity:blog.faqs.map((faq)=>({ "@type":"Question", name:faq.question, acceptedAnswer:{ "@type":"Answer", text:faq.answer } })) } : null;
  return <div className="min-h-screen bg-[#050b14] text-white">
    <Helmet><title>{title}</title><meta name="description" content={description}/>{blog.metaKeywords&&<meta name="keywords" content={blog.metaKeywords}/>}<meta name="robots" content={blog.noIndex?"noindex,follow":"index,follow"}/><link rel="canonical" href={canonical}/><meta property="og:type" content="article"/><meta property="og:title" content={blog.ogTitle||title}/><meta property="og:description" content={blog.ogDescription||description}/><meta property="og:url" content={canonical}/>{(blog.ogImage||blogImage)&&<meta property="og:image" content={blog.ogImage||blogImage}/>}<meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content={blog.ogTitle||title}/><meta name="twitter:description" content={blog.ogDescription||description}/>{(blog.ogImage||blogImage)&&<meta name="twitter:image" content={blog.ogImage||blogImage}/>}<script type="application/ld+json">{JSON.stringify(articleSchema)}</script><script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>{faqSchema&&<script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}</Helmet>
    <div className="fixed inset-x-0 top-0 z-[100] h-[3px] bg-white/5"><div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_12px_rgba(34,211,238,.8)]" style={{ width: `${progress}%` }}/></div><Navbar/><main className="relative overflow-hidden px-4 pb-28 pt-32 sm:px-6 sm:pt-40"><div className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,.16),transparent_58%)]"/><article className="relative mx-auto max-w-6xl">
      <nav className="flex items-center gap-2 text-sm text-slate-500" aria-label="Breadcrumb"><Link to="/" className="hover:text-cyan-300"><FiHome/></Link><span>/</span><Link to="/blogs" className="hover:text-cyan-300">Insights</Link><span>/</span><span className="max-w-[230px] truncate text-slate-300 sm:max-w-md">{blog.title}</span></nav>
      <header className="mx-auto mt-10 max-w-4xl text-center"><span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-cyan-300"><FiBookOpen/>{blog.category||"General"}</span><h1 className="mx-auto mt-7 text-4xl font-black leading-[1.08] tracking-[-.035em] sm:text-6xl lg:text-7xl">{blog.title}</h1><p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-400 sm:text-xl sm:leading-9">{blog.excerpt}</p><div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-400"><span className="flex items-center gap-2"><span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600"><FiUser/></span>{blog.author||"Digital Pintu"}</span><time className="flex items-center gap-2" dateTime={blog.publishedAt||blog.createdAt}><FiCalendar className="text-cyan-400"/>{new Date(blog.publishedAt||blog.createdAt).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}</time><span className="flex items-center gap-2"><FiClock className="text-cyan-400"/>{Math.max(1,Math.ceil(String(blog.content||"").split(/\s+/).length/200))} min read</span></div></header>
      {blogImage&&<div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-1.5 shadow-[0_30px_100px_-30px_rgba(6,182,212,.25)]"><img src={blogImage} alt={blog.imageAlt||blog.title} width="1200" height="630" className="aspect-[1.9/1] w-full rounded-[1.15rem] object-cover"/></div>}
      <div className="mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,1fr)_250px] lg:items-start"><div className="min-w-0 overflow-hidden rounded-3xl border border-white/[.08] bg-[#0a111c]/90 shadow-2xl shadow-black/20"><div className="border-b border-white/[.07] bg-gradient-to-r from-cyan-400/[.07] to-transparent px-6 py-4 text-xs font-semibold uppercase tracking-[.18em] text-slate-400 sm:px-12">Expert insight <span className="mx-2 text-cyan-400">•</span> Updated {new Date(blog.updatedAt||blog.publishedAt||blog.createdAt).toLocaleDateString("en-IN",{month:"short",year:"numeric"})}</div><div className="px-6 py-8 sm:px-12 sm:py-12"><RichBlogContent content={blog.content} title={blog.title}/></div></div><aside className="hidden lg:sticky lg:top-32 lg:block"><div className="rounded-2xl border border-white/10 bg-[#0a111c]/95 p-5 shadow-xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-400">In this article</p>{sections.length>0?<ol className="mt-4 space-y-1">{sections.map(({text,index},i)=><li key={index}><a href={`#${sectionId(text,index)}`} className="group flex gap-3 rounded-lg px-2 py-2 text-[13px] leading-5 text-slate-400 transition hover:bg-white/5 hover:text-white"><span className="font-bold text-slate-600 group-hover:text-cyan-400">{String(i+1).padStart(2,"0")}</span><span>{text.replace(/:$/,"")}</span></a></li>)}</ol>:<p className="mt-3 text-sm leading-6 text-slate-400">A practical guide by Digital Pintu experts.</p>}<div className="my-5 h-px bg-white/10"/><Link to="/contact" className="group flex items-center justify-between gap-3 font-semibold">Grow your business <FiArrowRight className="text-cyan-400 transition group-hover:translate-x-1"/></Link></div></aside></div>
      {blog.faqs?.length>0&&<section className="mx-auto mt-20 max-w-3xl"><p className="text-center text-sm font-bold uppercase tracking-[.25em] text-cyan-400">Helpful answers</p><h2 className="mt-3 text-center text-3xl font-black sm:text-4xl">Frequently asked questions</h2><div className="mt-8 space-y-4">{blog.faqs.map((faq)=><details key={faq.question} className="group rounded-2xl border border-white/10 bg-white/[.03] p-5 transition open:border-cyan-400/30"><summary className="cursor-pointer font-semibold marker:text-cyan-400">{faq.question}</summary><p className="mt-4 leading-7 text-slate-400">{faq.answer}</p></details>)}</div></section>}
      <div className="mx-auto mt-20 flex max-w-3xl flex-col items-center justify-between gap-5 rounded-3xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 p-7 text-center sm:flex-row sm:text-left"><div><p className="text-xl font-bold">Ready to grow your online presence?</p><p className="mt-1 text-sm text-slate-400">Let's turn your digital goals into measurable results.</p></div><Link to="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-300">Talk to an expert <FiArrowRight/></Link></div><Link to="/blogs" className="mx-auto mt-10 flex w-fit items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-cyan-300"><FiArrowLeft/> Back to all insights</Link>
    </article></main><Footer/>
  </div>;
}
