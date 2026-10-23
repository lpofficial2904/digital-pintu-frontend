import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  BadgeCheck,
  CircleCheck,
  ShieldCheck,
  Search,
  CircleAlert,
  LoaderCircle,
  Download,
  Share2,
} from "lucide-react";
import { API_BASE_URL } from "../utils/publicApi";

const dateText = (value) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

export default function CertificateVerification({ initialNumber = "" }) {
  const [number, setNumber] = useState(initialNumber);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [actionNotice, setActionNotice] = useState(null);
  const [showShareLink, setShowShareLink] = useState(false);
  const requestRef = useRef(null);
  const dialogRef = useRef(null);
  const titleRef = useRef(null);
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
    setActionNotice(null);
    setShowShareLink(false);
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
    if (open && !dialog.open) {
      dialog.showModal();
      titleRef.current?.focus({ preventScroll: true });
      dialog.scrollTop = 0;
    }
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
  const shareUrl = certificate
    ? result.verificationUrl || new URL(
        `/careers?certificate=${encodeURIComponent(certificate.certificateNumber)}#verify-certificate`,
        window.location.origin,
      ).href
    : "";

  async function downloadPdf() {
    if (!valid || downloading) return;
    setDownloading(true);
    setActionNotice(null);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/certificates/verify/${encodeURIComponent(certificate.certificateNumber)}/pdf`,
        { cache: "no-store" },
      );
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Unable to download the certificate. Please try again.");
      }
      const url = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = url;
      const studentName = String(certificate.recipientName || "Student")
        .normalize("NFC")
        .replace(/[^\p{L}\p{M}\p{N}._-]+/gu, "-")
        .replace(/-+/g, "-")
        .replace(/^[.-]+|[.-]+$/g, "") || "Student";
      link.download = certificate.downloadFilename || `${studentName}-${certificate.certificateNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setActionNotice({ text: "Your certificate PDF download has started." });
    } catch (error) {
      setActionNotice({
        error: true,
        text: error instanceof TypeError
          ? "Download is temporarily unavailable. Please try again."
          : error.message,
      });
    } finally {
      setDownloading(false);
    }
  }

  async function shareCertificate() {
    if (!valid || sharing) return;
    setSharing(true);
    setActionNotice(null);
    setShowShareLink(false);
    try {
      if (navigator.share) {
        try {
          await navigator.share({
            title: "Digital Pintu IT Solutions — Verified Certificate",
            text: `View the verified internship completion certificate issued to ${certificate.recipientName} in ${certificate.field}.`,
            url: shareUrl,
          });
          return;
        } catch (error) {
          if (error.name === "AbortError") return;
          // Browsers that cannot share can still copy the verification link.
        }
      }
      try {
        await navigator.clipboard.writeText(shareUrl);
        setActionNotice({ text: "Verification link copied to clipboard." });
      } catch {
        setShowShareLink(true);
        setActionNotice({ text: "Copy this verification link to share the certificate." });
      }
    } finally {
      setSharing(false);
    }
  }

  const details = certificate
    ? [
        ["Certificate ID", certificate.certificateNumber],
        ["Internship Field", certificate.field],
        ["Start Date", dateText(certificate.startDate)],
        ["Completion Date", dateText(certificate.endDate)],
        ["Date of Issue", dateText(certificate.issueDate)],
        ["Authorized Signatory", certificate.signatoryName],
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
              Official Certificate Verification
            </p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Verify an Internship Certificate
            </h2>
          </div>
        </div>
        <p className="relative mt-5 max-w-2xl text-sm leading-6 text-slate-400">
          Confirm the authenticity of a certificate issued by Digital Pintu IT
          Solutions. Enter the certificate ID to view the recipient, internship
          details and current validity status.
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
              Certificate ID
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
            {loading ? "Verifying..." : "Verify Certificate"}
          </button>
        </form>
        <p className="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck size={14} /> Certificate details are checked against the
          issuer's official records.
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
              View Verification Result
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
          aria-describedby="verification-description"
          className="certificate-result-dialog"
        >
          <div className="certificate-result-header">
            <div className="certificate-result-badge" aria-hidden="true">
              {valid ? <CircleCheck size={30} /> : <CircleAlert size={30} />}
            </div>
            <p className="certificate-result-issuer">
              Digital Pintu IT Solutions
            </p>
            <h2 ref={titleRef} id="verification-title" tabIndex={-1}>
              {valid
                ? "Certificate Verified"
                : result?.status === "revoked"
                  ? "Certificate Revoked"
                  : "Unable to Verify"}
            </h2>
            <p id="verification-description" className="certificate-result-description">
              {valid
                ? "This certificate is authentic and matches the official records of Digital Pintu IT Solutions."
                : result?.message || error}
            </p>
            {valid && (
              <span className="certificate-result-status">
                <CircleCheck size={16} aria-hidden="true" /> Issued and Valid
              </span>
            )}
          </div>
          {valid && (
            <div className="certificate-result-content">
              <div className="certificate-result-record" data-has-qr={!!result.qrCode}>
                <div>
                  <div className="certificate-result-recipient">
                    <p className="certificate-result-eyebrow">
                      Certificate Recipient
                    </p>
                    <h3>{certificate.recipientName}</h3>
                    <p className="certificate-result-subtitle">
                      Certificate of Internship Completion
                    </p>
                  </div>
                  <dl className="certificate-result-details">
                    {details.map(([label, value]) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>
                          {value}
                          {label === "Authorized Signatory" && certificate.signatoryTitle && (
                            <span className="certificate-result-designation">
                              {certificate.signatoryTitle}
                            </span>
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
                {result.qrCode && (
                  <figure className="certificate-result-qr">
                    <a
                      href={shareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="certificate-result-qr-link"
                      aria-label={`Open the official verification record for certificate ${certificate.certificateNumber} (opens in a new tab)`}
                    >
                      <img
                        src={result.qrCode}
                        width={360}
                        height={360}
                        alt={`QR code to verify certificate ${certificate.certificateNumber}`}
                      />
                    </a>
                    <figcaption>
                      <strong>Scan to Verify</strong>
                      <span>Scan this QR code to view the official verification record.</span>
                    </figcaption>
                  </figure>
                )}
              </div>
              <div className="certificate-result-trust">
                <ShieldCheck size={16} aria-hidden="true" />
                Verified directly with the issuing organization.
              </div>
            </div>
          )}
          <div className="certificate-result-footer">
            {valid && (
              <div className="certificate-result-actions">
                <button
                  type="button"
                  onClick={downloadPdf}
                  disabled={downloading}
                  aria-busy={downloading}
                  className="certificate-result-action"
                >
                  {downloading
                    ? <LoaderCircle size={17} className="animate-spin" aria-hidden="true" />
                    : <Download size={17} aria-hidden="true" />}
                  {downloading ? "Preparing PDF..." : "Download PDF"}
                </button>
                <button
                  type="button"
                  onClick={shareCertificate}
                  disabled={sharing}
                  className="certificate-result-action"
                >
                  <Share2 size={17} aria-hidden="true" />
                  {sharing ? "Sharing..." : "Share Certificate"}
                </button>
              </div>
            )}
            {actionNotice && (
              <p
                role={actionNotice.error ? "alert" : "status"}
                className={`certificate-result-notice${actionNotice.error ? " certificate-result-notice-error" : ""}`}
              >
                {actionNotice.text}
              </p>
            )}
            {showShareLink && (
              <input
                aria-label="Certificate verification link"
                className="certificate-result-share-link"
                readOnly
                value={shareUrl}
                onFocus={(event) => event.target.select()}
                onClick={(event) => event.currentTarget.select()}
              />
            )}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="certificate-result-done"
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
