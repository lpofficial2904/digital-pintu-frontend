import { useEffect, useState } from "react";

export const defaultContentSettings = {
  hero: {
    badge: "Digital Pintu IT Solutions • Est. 2014", titleAccent: "Architecting", titleMain: "The Next-Gen", titleGradient: "Digital Future.",
    description: "Transforming ideas into powerful digital experiences with innovative websites, mobile apps, UI/UX design, SEO, and result-driven marketing solutions that fuel business success.",
    primaryButtonLabel: "Start Your Project", primaryButtonUrl: "/#contact", secondaryButtonLabel: "Explore Services", secondaryButtonUrl: "/services",
    stats: [{ value: "500+", label: "Projects" }, { value: "99.9%", label: "Uptime" }, { value: "150+", label: "Clients" }],
  },
  stats: [
    { value: 500, decimals: 0, suffix: "+", title: "Projects Delivered" },
    { value: 99.9, decimals: 1, suffix: "%", title: "Uptime SLA" },
    { value: 150, decimals: 0, suffix: "+", title: "Enterprise Clients" },
    { value: 12, decimals: 0, suffix: "yrs", title: "Industry Experience" },
  ],
  whyChooseUs: {
    eyebrow: "// WHY DIGITAL PINTU SOLUTIONS", heading: "Built for enterprises that can't afford failure.",
    description: "We don't just deliver code — we architect resilient systems engineered for the demands of modern business. Every engagement comes with SLA guarantees, dedicated engineers, and ongoing support.",
    features: [
      { title: "Delivery in 2–4 weeks", description: "Sprint-based, milestone-driven execution with weekly demos." },
      { title: "Security-first architecture", description: "Every system built with zero-trust, encrypted-at-rest defaults." },
      { title: "24/7 monitoring & support", description: "NOC team on-call, P1 response under 15 minutes." },
      { title: "Global delivery, local care", description: "Teams across IST, GMT, and PST for overlap at every hour." },
    ],
  },
  about: {
    eyebrow: "Who we are", heading: "Empowering Businesses with", accentHeading: "Modern Technology",
    description: "Digital Pintu is an IT solutions company helping businesses build powerful digital products through modern technology, thoughtful design and dependable execution.",
    cards: [
      { title: "Why We Exist", description: "We help ambitious businesses turn complex ideas into reliable, user-friendly digital products that create measurable value.", note: "Technology built around real business goals." },
      { title: "Our Mission", description: "To deliver high-performing websites, mobile apps and digital experiences that help brands grow, compete and lead online.", note: "Every project is focused on performance and results." },
      { title: "Our Vision", description: "To become a trusted technology partner for startups and growing businesses building the next generation of digital solutions.", note: "Long-term partnerships. Future-ready products." },
      { title: "Our Work Culture", description: "We combine clear communication, creative thinking and engineering discipline to deliver quality without unnecessary complexity.", note: "Transparent collaboration from idea to launch." },
    ],
  },
};

export const defaultSiteSettings = {
  phoneNumber: "+91 86196 27463",
  contactEmail: "hello@digitalpintu.com",
  address: "Mansarovar, Jaipur, Rajasthan, India",
  whatsappNumber: "918619627463",
  whatsappMessage: "Hello Digital Pintu, I want to know about your services.",
  facebookUrl: "https://www.facebook.com/pintuattends",
  instagramUrl: "",
  twitterUrl: "https://x.com/pintuattends",
  linkedinUrl: "",
  githubUrl: "",
  contentSettings: defaultContentSettings,
};

export default function useSiteSettings() {
  const [settings, setSettings] = useState(defaultSiteSettings);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/site-settings`, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load site settings");
        return response.json();
      })
      .then((data) => setSettings((current) => ({
        ...current,
        ...data,
        contentSettings: {
          ...defaultContentSettings,
          ...(data.contentSettings || {}),
          hero: { ...defaultContentSettings.hero, ...(data.contentSettings?.hero || {}) },
          whyChooseUs: { ...defaultContentSettings.whyChooseUs, ...(data.contentSettings?.whyChooseUs || {}) },
          about: { ...defaultContentSettings.about, ...(data.contentSettings?.about || {}) },
        },
      })))
      .catch(() => {});
  }, []);

  return settings;
}
