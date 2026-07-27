import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useSiteSettings from "../utils/useSiteSettings";

const policies = {
  privacy: {
    eyebrow: "Privacy Policy",
    title: "Your privacy matters to us.",
    intro:
      "This Privacy Policy explains how Digital Pintu Solutions collects, uses, stores, and protects information when you visit our website, contact us, create an account, or use our IT and digital services.",
    sections: [
      {
        title: "Information we collect",
        content:
          "We may collect your name, email address, phone number, company and project details, account information, messages, job application details, uploaded documents, and technical information such as IP address, browser, device, pages visited, and usage activity.",
      },
      {
        title: "How we use information",
        content:
          "We use information to respond to enquiries, provide quotations and services, manage accounts and applications, improve website performance, prevent misuse, maintain security, communicate service updates, and meet applicable legal or contractual requirements.",
      },
      {
        title: "Cookies and analytics",
        content:
          "Our website may use essential cookies and similar technologies for authentication, preferences, visitor analytics, performance, and security. You can control non-essential cookies through your browser settings, although some features may then work differently.",
      },
      {
        title: "Sharing and service providers",
        content:
          "We do not sell personal information. We may share only the information required with trusted hosting, database, communications, analytics, payment, or project-delivery providers. We may also disclose information when required by law or to protect users, our business, or our systems.",
      },
      {
        title: "Data security and retention",
        content:
          "We use reasonable administrative and technical safeguards to protect information. No online system is completely risk-free. We retain information only for as long as needed for the stated purpose, business records, dispute resolution, security, or applicable legal obligations.",
      },
      {
        title: "Your choices",
        content:
          "You may request access, correction, deletion, or withdrawal of consent for your personal information, subject to applicable law and legitimate record-keeping requirements. You may also unsubscribe from optional marketing communications at any time.",
      },
      {
        title: "Third-party links",
        content:
          "Our website may link to third-party websites or platforms. Their privacy practices are governed by their own policies, and Digital Pintu Solutions is not responsible for their content or data handling.",
      },
    ],
  },
  terms: {
    eyebrow: "Terms & Conditions",
    title: "Clear terms for using our website and services.",
    intro:
      "These Terms & Conditions govern your use of the Digital Pintu Solutions website and any IT, design, development, marketing, consulting, maintenance, hosting, or related service provided under an agreed proposal or contract.",
    sections: [
      {
        title: "Website use",
        content:
          "You may use this website only for lawful purposes. You must not attempt unauthorized access, disrupt the website, introduce malicious code, misuse forms, copy protected material, or use our website in a way that harms Digital Pintu Solutions or another person.",
      },
      {
        title: "Projects and service scope",
        content:
          "Project scope, deliverables, timelines, fees, revision limits, dependencies, and support terms are defined in the applicable quotation, proposal, statement of work, or written agreement. Any work outside the agreed scope may require revised pricing and delivery dates.",
      },
      {
        title: "Client responsibilities",
        content:
          "Clients must provide accurate requirements, timely feedback, required access, lawful content, approvals, and payments. Delays in these items may affect delivery schedules. Clients confirm that materials supplied to us may legally be used for the project.",
      },
      {
        title: "Payments and cancellation",
        content:
          "Invoices must be paid according to the agreed schedule. Work may be paused for overdue payments. Deposits, completed milestones, third-party purchases, and work already performed may be non-refundable unless the applicable written agreement states otherwise.",
      },
      {
        title: "Intellectual property",
        content:
          "Digital Pintu Solutions retains ownership of its pre-existing tools, reusable code, methods, templates, and know-how. Ownership or licence rights for final project deliverables transfer only as specified in the project agreement and after all applicable payments are received.",
      },
      {
        title: "Third-party services",
        content:
          "Domains, hosting, APIs, plugins, advertising platforms, payment gateways, app stores, and other third-party services are subject to their own terms, availability, pricing, and policies. We are not responsible for interruptions or changes controlled by those providers.",
      },
      {
        title: "Warranties and liability",
        content:
          "We provide services with reasonable professional care. Unless expressly agreed in writing, the website and services are provided without guarantees of uninterrupted operation, specific rankings, revenue, traffic, or business outcomes. Liability is limited to the extent permitted by applicable law and the relevant service agreement.",
      },
      {
        title: "Termination and changes",
        content:
          "Either party may terminate services as allowed by the applicable agreement. Obligations relating to payment, confidentiality, intellectual property, and liability continue where relevant. We may update these website terms, and the revised version becomes effective when published here.",
      },
    ],
  },
};

export default function LegalPage({ type }) {
  const page = policies[type] || policies.privacy;
  const settings = useSiteSettings();

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#070B14] text-white">
      <Navbar />
      <main className="relative px-4 pb-24 pt-36 sm:px-6 lg:px-8">
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto max-w-4xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-400">
            {page.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">{page.title}</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">{page.intro}</p>
          <p className="mt-4 text-sm text-slate-500">Last updated: July 27, 2026</p>

          <div className="mt-12 space-y-5">
            {page.sections.map((section, index) => (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.03 }}
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 sm:p-8"
              >
                <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                <p className="mt-3 leading-7 text-slate-400">{section.content}</p>
              </motion.section>
            ))}
          </div>

          <section className="mt-8 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.06] p-6 sm:p-8">
            <h2 className="text-xl font-semibold">Questions or requests</h2>
            <p className="mt-3 leading-7 text-slate-300">
              Contact Digital Pintu Solutions at{" "}
              <a className="text-cyan-400 hover:text-cyan-300" href={`mailto:${settings.contactEmail}`}>
                {settings.contactEmail}
              </a>
              , call{" "}
              <a className="text-cyan-400 hover:text-cyan-300" href={`tel:${settings.phoneNumber.replace(/[^+\d]/g, "")}`}>
                {settings.phoneNumber}
              </a>
              , or write to {settings.address}.
            </p>
          </section>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
