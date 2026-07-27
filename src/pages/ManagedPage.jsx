import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = `${import.meta.env.VITE_API_URL || "https://digital-pintu-backend.onrender.com"}/api/website-pages`;
const CAREER_APPLICATIONS_API = `${import.meta.env.VITE_API_URL || "https://digital-pintu-backend.onrender.com"}/api/career-applications`;

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
      await axios.post(CAREER_APPLICATIONS_API, { jobId: selectedJob, answers, attachments: Object.values(attachments) });
      toast.success("Your application has been submitted successfully.");
      setSubmitMessage("Your application has been submitted successfully.");
      setAnswers({});
      setAttachments({});
      setSelectedJob("");
    } catch (requestError) {
      const message = requestError.response?.data?.message || "Unable to submit your application. Please try again.";
      toast.error(message);
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
            <section className="relative mx-auto max-w-6xl">
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
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
