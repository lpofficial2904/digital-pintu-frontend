import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Globe2, Handshake, Rocket, Target, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useSiteSettings from "../utils/useSiteSettings";

const API_URL = `${import.meta.env.VITE_API_URL || "https://digital-pintu-backend.onrender.com"}/api/website-pages`;
const CAREER_APPLICATIONS_API = `${import.meta.env.VITE_API_URL || "https://digital-pintu-backend.onrender.com"}/api/career-applications`;

const aboutCards = [
  {
    icon: Globe2,
    title: "Why We Exist",
    description: "We help ambitious businesses turn complex ideas into reliable, user-friendly digital products that create measurable value.",
    note: "Technology built around real business goals.",
  },
  {
    icon: Target,
    title: "Our Mission",
    description: "To deliver high-performing websites, mobile apps and digital experiences that help brands grow, compete and lead online.",
    note: "Every project is focused on performance and results.",
  },
  {
    icon: Rocket,
    title: "Our Vision",
    description: "To become a trusted technology partner for startups and growing businesses building the next generation of digital solutions.",
    note: "Long-term partnerships. Future-ready products.",
  },
  {
    icon: Handshake,
    title: "Our Work Culture",
    description: "We combine clear communication, creative thinking and engineering discipline to deliver quality without unnecessary complexity.",
    note: "Transparent collaboration from idea to launch.",
  },
];

function AboutPage() {
  const { contentSettings } = useSiteSettings();
  const about = contentSettings.about;
  return (
    <section className="relative mx-auto max-w-6xl">
      <div className="pointer-events-none absolute left-1/2 top-16 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/15 blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 top-96 h-64 w-64 rounded-full bg-purple-600/10 blur-[120px]" />

      <motion.header
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .65 }}
        className="relative mx-auto max-w-4xl text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[.3em] text-cyan-400">// {about.eyebrow}</p>
        <h1 className="mt-5 text-4xl font-black leading-[1.08] tracking-tight sm:text-6xl">
          {about.heading}
          <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            {about.accentHeading}
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg">
          {about.description}
        </p>
      </motion.header>

      <div className="relative mt-14 grid gap-5 md:grid-cols-2">
        {(about.cards || aboutCards).map((card, index) => {
          const Icon = aboutCards[index % aboutCards.length].icon;
          return (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: .25 }}
              transition={{ delay: index * .08, duration: .5 }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-lg border border-[#1f2b3d] bg-[#0d1625] p-7 transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,.15)] sm:p-8"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-violet-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-md border border-cyan-500 text-cyan-400">
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <h2 className="mt-6 text-xl font-bold text-white">{card.title}</h2>
                <p className="mt-3 leading-7 text-gray-400">{card.description}</p>
                <p className="mt-4 text-sm font-semibold text-cyan-400">{card.note}</p>
              </div>
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-500 group-hover:w-full" />
            </motion.article>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mt-6 flex flex-col items-start justify-between gap-6 overflow-hidden rounded-lg border border-[#223046] bg-[#111b2a] p-7 transition-colors hover:border-cyan-500 sm:flex-row sm:items-center sm:p-9"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-[.24em] text-cyan-400">What we bring together</p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Strategy, design and technology—under one roof.</h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-400">
            From websites and mobile apps to SEO, automation and digital marketing, our team builds connected solutions for sustainable growth.
          </p>
        </div>
        <Link
          to="/services"
          className="inline-flex shrink-0 items-center gap-2 rounded bg-cyan-400 px-6 py-3.5 font-bold text-black transition hover:bg-cyan-300 hover:shadow-[0_0_30px_rgba(0,255,255,.25)]"
        >
          Explore Services <ArrowRight size={18} />
        </Link>
      </motion.div>
    </section>
  );
}

export default function ManagedPage({ pageSlug }) {
  const params = useParams();
  const slug = pageSlug || params.slug;
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const [answers, setAnswers] = useState({});
  const [attachments, setAttachments] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await axios.get(`${API_URL}/${slug}`);
        if (active) setPage(data);
      } catch {
        if (active) setError("This page is currently unavailable.");
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => { active = false; };
  }, [slug]);

  const applyForJob = (jobId) => {
    setSelectedJob(jobId);
    setSubmitMessage("");
    window.setTimeout(() => document.getElementById("career-application")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };

  const submitApplication = async (event) => {
    event.preventDefault();
    if (!selectedJob) {
      setSubmitMessage("Please select an open position.");
      return;
    }
    setSubmitting(true);
    setSubmitMessage("");
    try {
      const request = axios.post(CAREER_APPLICATIONS_API, {
        jobId: selectedJob,
        answers,
        attachments: Object.values(attachments),
      });
      await toast.promise(request, {
        loading: "Submitting your application...",
        success: ({ data }) => data.confirmationEmailSent
          ? "Application submitted. A confirmation email has been sent."
          : "Your application has been submitted successfully.",
        error: (requestError) => requestError.response?.data?.message || "Unable to submit your application. Please try again.",
      });
      setSubmitMessage("Your application has been submitted successfully.");
      setAnswers({});
      setAttachments({});
      setSelectedJob("");
    } catch (requestError) {
      const message = requestError.response?.data?.message || "Unable to submit your application. Please try again.";
      setSubmitMessage(message);
    } finally {
      setSubmitting(false);
    }
  };

  const formFields = (page?.applicationFields || [])
    .filter((field) => field.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);
  const regularFields = formFields.filter((field) => field.type !== "file");
  const fileFields = formFields.filter((field) => field.type === "file");

  const selectAttachment = (field, file) => {
    setSubmitMessage("");
    if (!file) {
      setAttachments((current) => {
        const next = { ...current };
        delete next[field.name];
        return next;
      });
      return;
    }
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
    ];
    if (!allowedTypes.includes(file.type)) {
      setSubmitMessage(`${field.label} must be a PDF, DOC, DOCX, JPG, or PNG file.`);
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setSubmitMessage(`${field.label} must be smaller than 2 MB.`);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setAttachments((current) => ({
      ...current,
      [field.name]: {
        fieldName: field.name,
        label: field.label,
        fileName: file.name,
        mimeType: file.type,
        data: reader.result,
      },
    }));
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#050b14] text-white">
      <Navbar />
      <main className="px-5 pb-24 pt-36">
        {loading && <div className="mx-auto h-96 max-w-5xl animate-pulse rounded-[32px] bg-white/5" />}
        {!loading && error && (
          <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/[.04] p-10 text-center">
            <p className="text-gray-300">{error}</p>
            <Link to="/" className="mt-5 inline-block text-cyan-400">Back to home</Link>
          </div>
        )}
        {!loading && page && (
          <>
            <Helmet>
              <title>{page.metaTitle || `${page.title} | Digital Pintu`}</title>
              <meta name="description" content={page.metaDescription || page.intro || page.content?.slice(0, 155)} />
            </Helmet>
            {slug === "about" ? <AboutPage /> : <section className="relative mx-auto max-w-6xl">
              <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
              <motion.header initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="relative mx-auto max-w-4xl text-center">
                <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-[.25em] text-cyan-300">
                  {page.pageType === "careers" ? "Careers" : "Digital Pintu"}
                </span>
                <h1 className="mt-7 text-4xl font-black leading-tight sm:text-6xl">{page.title}</h1>
                {page.intro && <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">{page.intro}</p>}
              </motion.header>

              {page.content && (
                <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 }} className="relative mx-auto mt-14 max-w-4xl whitespace-pre-wrap rounded-[32px] border border-white/10 bg-white/[.035] p-6 text-base leading-8 text-gray-300 sm:p-10">
                  {page.content}
                </motion.div>
              )}

              {page.pageType === "careers" && (
                <>
                <section className="relative mt-16">
                  <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div><p className="text-sm uppercase tracking-[.25em] text-cyan-300">Open positions</p><h2 className="mt-2 text-3xl font-bold">Current opportunities</h2></div>
                    <span className="rounded-full border border-cyan-400/25 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">{page.jobs?.length || 0} roles available</span>
                  </div>
                  {page.jobs?.length ? (
                    <div className="space-y-5">
                      {page.jobs.map((job, index) => (
                        <motion.article key={job._id || index} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }} whileHover={{ y: -3 }} className="relative flex flex-col gap-6 rounded-[26px] border border-white/10 bg-[#101722] p-6 transition-colors hover:border-cyan-400/30 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                          {job.showNewBadge && <motion.span animate={{ scale: [1, 1.08, 1], boxShadow: ["0 0 0 rgba(34,211,238,0)", "0 0 24px rgba(34,211,238,.35)", "0 0 0 rgba(34,211,238,0)"] }} transition={{ duration: 1.8, repeat: Infinity }} className="absolute -top-3 left-7 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-3 py-1 text-[10px] font-black uppercase tracking-[.18em] text-slate-950">New</motion.span>}
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-3"><h3 className="text-xl font-bold sm:text-2xl">{job.title}</h3>{job.department && <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-300">{job.department}</span>}</div>
                            <p className="mt-3 max-w-3xl whitespace-pre-wrap leading-7 text-gray-400">{job.description}</p>
                            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-400"><span className="text-cyan-300">● {job.location}</span><span>{job.type}</span>{job.experience && <span>{job.experience}</span>}</div>
                          </div>
                          <button type="button" onClick={() => applyForJob(job._id)} className="shrink-0 rounded-xl bg-white px-7 py-3.5 font-bold text-slate-950 transition hover:bg-cyan-300">Apply Now</button>
                        </motion.article>
                      ))}
                    </div>
                  ) : (
                    <p className="rounded-3xl border border-dashed border-white/15 p-10 text-center text-gray-400">There are no active openings right now. Please check again soon.</p>
                  )}
                </section>

                <section id="career-application" className="relative scroll-mt-32 pt-20">
                  <form onSubmit={submitApplication} className="mx-auto max-w-5xl rounded-[30px] border border-white/10 bg-[#101722] p-5 shadow-[0_30px_90px_rgba(0,0,0,.28)] sm:p-9">
                    <div className="border-b border-white/10 pb-5"><p className="text-sm uppercase tracking-[.22em] text-cyan-300">Join our team</p><h2 className="mt-2 text-3xl font-bold">Application Form</h2></div>
                    <div className="mt-7 grid gap-5 md:grid-cols-2">
                      <label className="space-y-2 text-sm font-medium text-gray-300">
                        Applying for (Role) *
                        <select required value={selectedJob} onChange={(event) => setSelectedJob(event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#070d16] px-4 py-4 text-white outline-none focus:border-cyan-400">
                          <option value="">Select a role...</option>
                          {page.jobs.map((job) => <option key={job._id} value={job._id}>{job.title}</option>)}
                        </select>
                      </label>
                      {regularFields.map((field) => (
                        <label key={field._id || field.name} className={`space-y-2 text-sm font-medium text-gray-300 ${field.type === "textarea" ? "md:col-span-2" : ""}`}>
                          {field.label}{field.required ? " *" : ""}
                          {field.type === "textarea" ? (
                            <textarea required={field.required} rows="5" placeholder={field.placeholder} value={answers[field.name] || ""} onChange={(event) => setAnswers((current) => ({ ...current, [field.name]: event.target.value }))} className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-[#070d16] px-4 py-4 text-white outline-none placeholder:text-gray-600 focus:border-cyan-400" />
                          ) : field.type === "select" ? (
                            <select required={field.required} value={answers[field.name] || ""} onChange={(event) => setAnswers((current) => ({ ...current, [field.name]: event.target.value }))} className="mt-2 w-full rounded-xl border border-white/10 bg-[#070d16] px-4 py-4 text-white outline-none focus:border-cyan-400">
                              <option value="">Select...</option>{(field.options || []).map((option) => <option key={option}>{option}</option>)}
                            </select>
                          ) : (
                            <input type={field.type} required={field.required} placeholder={field.placeholder} value={answers[field.name] || ""} onChange={(event) => setAnswers((current) => ({ ...current, [field.name]: event.target.value }))} className="mt-2 w-full rounded-xl border border-white/10 bg-[#070d16] px-4 py-4 text-white outline-none placeholder:text-gray-600 focus:border-cyan-400" />
                          )}
                        </label>
                      ))}
                    </div>
                    {fileFields.length > 0 && (
                      <div className="mt-8 border-t border-white/10 pt-7">
                        <h3 className="text-lg font-bold text-cyan-300">Required Documents</h3>
                        <div className="mt-5 grid gap-4 md:grid-cols-3">
                          {fileFields.map((field) => (
                            <label key={field._id || field.name} className="group rounded-2xl border border-white/10 bg-[#070d16] p-5 text-center transition hover:border-cyan-400/40">
                              <span className="block text-sm font-semibold text-gray-200">📄 {field.label}{field.required ? " *" : ""}</span>
                              <span className="mx-auto mt-4 inline-flex cursor-pointer rounded-full bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white transition group-hover:bg-cyan-500">
                                Choose File
                              </span>
                              <input
                                type="file"
                                required={field.required}
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                onChange={(event) => selectAttachment(field, event.target.files?.[0])}
                                className="sr-only"
                              />
                              <span className="mt-3 block truncate text-xs text-gray-500">{attachments[field.name]?.fileName || "No file chosen"}</span>
                              <span className="mt-1 block text-[10px] text-gray-600">PDF, DOC, DOCX, JPG or PNG · Max 2 MB</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                    {submitMessage && <p className={`mt-5 rounded-xl px-4 py-3 text-sm ${submitMessage.includes("successfully") ? "bg-emerald-500/10 text-emerald-300" : "bg-rose-500/10 text-rose-300"}`}>{submitMessage}</p>}
                    <button disabled={submitting} className="mx-auto mt-8 flex min-w-60 justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-bold disabled:opacity-60">{submitting ? "Submitting..." : "Submit Application"}</button>
                  </form>
                </section>
                </>
              )}
            </section>}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
