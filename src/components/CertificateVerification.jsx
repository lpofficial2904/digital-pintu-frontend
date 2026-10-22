import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  BadgeCheck,
  ShieldCheck,
  Search,
  X,
  CircleAlert,
  LoaderCircle,
  ArrowUpRight,
} from "lucide-react";
import { API_BASE_URL } from "../utils/publicApi";

const dateText = (value) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

export default function CertificateVerification({ initialNumber = "" }) {
  const [number, setNumber] = useState(initialNumber);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const requestRef = useRef(null);
  const dialogRef = useRef(null);
  const sectionRef = useRef(null);
  const timerRef = useRef(null);

  async function verify(value, quiet = false) {
    clearTimeout(timerRef.current);
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    setLoading(true);
    setResult(null);
    setError("");
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/certificates/verify/${encodeURIComponent(value.trim().toUpperCase())}`,
        { cache: "no-store", signal: controller.signal },
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Unable to verify certificate");
      if (controller.signal.aborted) return;
      setResult(data);
      setOpen(true);
    } catch (error) {
      if (!controller.signal.aborted) {
        setError(
          error instanceof TypeError
            ? "Verification is temporarily unavailable. Please try again."
            : error.message,
        );
        if (!quiet) setOpen(true);
      }
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }
  useEffect(() => {
    setNumber(initialNumber);
    if (initialNumber) {
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    return () => {
      requestRef.current?.abort();
      clearTimeout(timerRef.current);
    };
  }, [initialNumber]);
  useEffect(() => {
    const value = number.trim().toUpperCase();
    const fromQr = !!value && value === initialNumber.trim().toUpperCase();
    if (!value || (!fromQr && !/^[A-Z0-9][A-Z0-9-]{7,63}$/.test(value))) return;
    timerRef.current = setTimeout(
      () => verify(value, !fromQr),
      fromQr ? 0 : 800,
    );
    return () => clearTimeout(timerRef.current);
  }, [number, initialNumber]);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);
  function changeNumber(value) {
    clearTimeout(timerRef.current);
    requestRef.current?.abort();
    setNumber(value);
    setResult(null);
    setError("");
    setLoading(false);
    setOpen(false);
  }
  const valid = result?.valid;
  const certificate = result?.certificate;
  const details = certificate
    ? [
        ["Certificate number", certificate.certificateNumber],
        ["Internship field", certificate.field],
        ["Start date", dateText(certificate.startDate)],
        ["Completion date", dateText(certificate.endDate)],
        ["Issue date", dateText(certificate.issueDate)],
        ["Status", "Issued / valid"],
        ["Authorized by", certificate.signatoryName],
        ["Designation", certificate.signatoryTitle],
      ]
    : [];
  return (
    <>
      <section
        ref={sectionRef}
        id="verify-certificate"
        className="relative mx-auto my-12 max-w-4xl scroll-mt-28 overflow-hidden rounded-3xl border border-cyan-400/20 bg-[#101722] p-6 text-white sm:p-9"
      >
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="relative flex items-start gap-4">
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-cyan-300">
            <ShieldCheck size={27} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[.25em] text-cyan-300">
              Official credential verification
            </p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Your achievement. Verified.
            </h2>
          </div>
        </div>
        <p className="relative mt-5 max-w-2xl text-sm leading-6 text-slate-400">
          Check a Digital Pintu IT Solutions internship certificate against our
          official records. Enter the certificate number below to view its
          details and validity.
        </p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            verify(number);
          }}
          className="relative mt-6 flex flex-col gap-3 sm:flex-row"
        >
          <div className="flex-1">
            <label
              htmlFor="certificate-number"
              className="text-sm text-slate-300"
            >
              Certificate number
            </label>
            <div className="relative mt-2">
              <Search
                size={18}
                className="absolute left-4 top-4 text-slate-500"
              />
              <input
                id="certificate-number"
                required
                maxLength={64}
                pattern="[A-Za-z0-9][A-Za-z0-9-]{2,63}"
                value={number}
                onChange={(event) => changeNumber(event.target.value)}
                placeholder="DP-INT-2026-XXXXXXXXXX"
                autoComplete="off"
                spellCheck={false}
                className="w-full rounded-xl border border-white/15 bg-[#070d16] py-3 pl-12 pr-4 uppercase text-white outline-none focus:border-cyan-400"
              />
            </div>
          </div>
          <button
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 disabled:opacity-60 sm:self-end"
          >
            {loading ? (
              <LoaderCircle size={18} className="animate-spin" />
            ) : (
              <BadgeCheck size={18} />
            )}
            {loading ? "Checking records..." : "Verify certificate"}
          </button>
        </form>
        <p className="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck size={14} /> Secure lookup directly from the issuing
          organization.
        </p>
        <div aria-live="polite">
          {error && !open && (
            <p role="alert" className="mt-4 text-sm text-rose-300">
              {error}
            </p>
          )}
          {result && !open && (
            <button
              onClick={() => setOpen(true)}
              className="mt-4 text-sm text-cyan-300 underline"
            >
              View verification result
            </button>
          )}
        </div>
      </section>
      {createPortal(
        <dialog
          ref={dialogRef}
          data-status={valid ? "verified" : "invalid"}
          onCancel={() => setOpen(false)}
          onClose={() => setOpen(false)}
          aria-labelledby="verification-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
          className="certificate-result-dialog fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-2xl overflow-y-auto rounded-3xl p-0 backdrop:bg-slate-950/80 backdrop:backdrop-blur-sm"
        >
          <div className="certificate-result-header relative overflow-hidden border-b border-[var(--certificate-border)] px-6 pb-7 pt-8 text-center sm:px-10">
            <button
              autoFocus
              onClick={() => setOpen(false)}
              aria-label="Close verification result"
              className="certificate-result-close absolute right-4 top-4 rounded-full border border-[var(--certificate-border)] p-2 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--site-primary)]"
            >
              <X size={18} />
            </button>
            <div className="certificate-result-badge mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border">
              {valid ? <BadgeCheck size={33} /> : <CircleAlert size={30} />}
            </div>
            <p
              className={`text-[10px] font-bold uppercase tracking-[.25em] ${valid ? "text-[var(--site-primary)]" : "text-rose-400"}`}
            >
              Digital Pintu IT Solutions
            </p>
            <h2
              id="verification-title"
              className="mt-2 text-2xl font-bold sm:text-3xl"
            >
              {valid
                ? "Certificate verified"
                : result?.status === "revoked"
                  ? "Certificate revoked"
                  : "Unable to verify"}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--site-muted)]">
              {valid
                ? "This certificate is authentic and matches the official record issued by Digital Pintu IT Solutions."
                : result?.message || error}
            </p>
          </div>
          {valid && (
            <div className="px-6 pb-2 sm:px-10">
              <div className="border-b border-[var(--certificate-border)] py-6">
                <p className="text-xs uppercase tracking-widest text-[var(--site-primary)]">
                  Awarded to
                </p>
                <h3 className="mt-2 break-words text-2xl font-semibold sm:text-3xl">
                  {certificate.recipientName}
                </h3>
                <p className="mt-2 text-sm text-[var(--site-muted)]">
                  Internship completion certificate
                </p>
              </div>
              <dl className="grid gap-x-6 gap-y-5 py-6 text-sm sm:grid-cols-2">
                {details.map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs text-[var(--site-muted)]">
                      {label}
                    </dt>
                    <dd
                      className={`mt-1.5 break-words font-medium ${label === "Status" ? "text-[var(--site-primary)]" : ""}`}
                    >
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="flex items-center gap-2 border-t border-[var(--certificate-border)] py-4 text-xs text-[var(--site-muted)]">
                <ShieldCheck
                  size={16}
                  className="shrink-0 text-[var(--site-primary)]"
                />{" "}
                Verified against the current issuer record.
              </div>
            </div>
          )}
          <div className="certificate-result-footer flex flex-wrap items-center justify-between gap-4 border-t border-[var(--certificate-border)] px-6 py-5 sm:px-10">
            <a
              href="/careers#verify-certificate"
              onClick={() => setOpen(false)}
              className="flex items-center gap-1 text-sm font-medium text-[var(--site-muted)] transition hover:text-[var(--site-primary)]"
            >
              Careers at Digital Pintu <ArrowUpRight size={16} />
            </a>
            <button
              onClick={() => setOpen(false)}
              className="certificate-result-done rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--site-primary)]"
            >
              Done
            </button>
          </div>
        </dialog>,
        document.body,
      )}
    </>
  );
}
