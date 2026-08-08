import { useEffect, useState } from "react";
import { API_BASE_URL, getCachedJson } from "./publicApi";

export const defaultContentSettings = {
  hero: {
    badge: "Digital Pintu IT Solutions • Est. 2014", titleAccent: "Architecting", titleMain: "The Next-Gen", titleGradient: "Digital Future.",
    description: "Digital Pintu is an IT company in Mansarovar, Jaipur helping businesses grow with website development, mobile apps, UI/UX, SEO, Google Ads and digital marketing solutions.",
    primaryButtonLabel: "Start Your Project", primaryButtonUrl: "/contact/", secondaryButtonLabel: "Explore Services", secondaryButtonUrl: "/services",
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
    description: "Digital Pintu is an IT and web development company in Mansarovar, Jaipur. We create scalable websites, mobile apps and digital growth solutions with thoughtful design, modern engineering and dependable support.",
    cards: [
      { title: "Why We Exist", description: "We help ambitious businesses turn complex ideas into reliable, user-friendly digital products that create measurable value.", note: "Technology built around real business goals." },
      { title: "Our Mission", description: "To deliver high-performing websites, mobile apps and digital experiences that help brands grow, compete and lead online.", note: "Every project is focused on performance and results." },
      { title: "Our Vision", description: "To become a trusted technology partner for startups and growing businesses building the next generation of digital solutions.", note: "Long-term partnerships. Future-ready products." },
      { title: "Our Work Culture", description: "We combine clear communication, creative thinking and engineering discipline to deliver quality without unnecessary complexity.", note: "Transparent collaboration from idea to launch." },
    ],
  },
  process: { eyebrow:"How We Work", heading:"From Idea to", accentHeading:"Launch", interval:2200, isActive:true, steps:[{number:"01",title:"Discovery",description:"Deep dive into your goals, users, and competitive landscape."},{number:"02",title:"UI/UX Strategy",description:"Wireframes and high-fidelity prototypes reviewed with you."},{number:"03",title:"Build & Code",description:"Agile sprints with weekly demos and clean code."},{number:"04",title:"Launch & Scale",description:"Performance monitoring and growth-ready infrastructure."}] },
  technologies: { isActive:true, speed:38, items:["MongoDB","Express.js","React.js","Next.js","Node.js","AWS","Figma","Google Analytics"] },
  contact: { eyebrow:"Contact Us", heading:"Let's Build Something Great", description:"Tell us about your requirements and our team will get back to you.", workingHours:"Mon - Sat | 9 AM - 8 PM", submitLabel:"Send Message", servicePlaceholder:"Choose Service", serviceOptions:["Web Development","App Development","UI / UX Design","SEO Optimization","Digital Marketing","E-Commerce"] },
  footer: { description:"We build fast, responsive and scalable digital solutions that help businesses grow.", quickLinksTitle:"Quick Links", servicesTitle:"Our Services", contactTitle:"Contact Us", copyrightText:"Digital Pintu. All Rights Reserved." },
  servicesSection: { eyebrow:"Our Services", heading:"We Build", accentHeading:"Digital Experiences", description:"From websites to mobile applications, branding, marketing and SEO — we create high-performance digital products that help businesses grow.", activeLabel:"Active", learnMoreLabel:"Learn More" },
  reviewsSection: { eyebrow:"Client Proof", heading:"Words from", accentHeading:"Happy Clients" },
  blogsPage: { eyebrow:"Our Blog", heading:"Insights for your", accentHeading:"digital growth", description:"Explore practical ideas, technology updates, and business insights from Digital Pintu.", readLabel:"Read article", emptyMessage:"No blogs are available yet." },
  serviceDetails: { featuresHeading:"Our Service Features & Process", featuresDescription:"We drive dynamic software operations using an engineered structure from conceptual designs to complete code architecture.", technologiesHeading:"Our Technologies", technologiesDescription:"We utilize a range of industry-leading cloud and engineering technologies tailored to deliver outstanding apps." },
  aboutCta: { eyebrow:"What we bring together", heading:"Strategy, design and technology—under one roof.", description:"From websites and mobile apps to SEO, automation and digital marketing, our team builds connected solutions for sustainable growth.", buttonLabel:"Explore Services", buttonUrl:"/services" },
  notFound: { eyebrow:"Error 404", heading:"Page not found", description:"The page you are looking for does not exist, may have moved, or the URL is incorrect.", backLabel:"Go back", homeLabel:"Home page" },
  sections: { tech:true, services:true, stats:true, whyChooseUs:true, process:true, reviews:true, contact:true },
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
  logoData: "",
  logoWidth: 112,
  logoHeight: 72,
  navbarBrandText: "Digital Pintu Solutions",
  navbarBrandActive: true,
  contentSettings: defaultContentSettings,
  themeSettings: {},
};

export default function useSiteSettings() {
  const [settings, setSettings] = useState(defaultSiteSettings);

  useEffect(() => {
    let active = true;
    const syncSettings = (force = false) => getCachedJson("/api/site-settings", { maxAge: 30000, force })
      .then((data) => {
        if (!active) return;
        setSettings((current) => ({
        ...current,
        ...data,
        logoData: data.logoData ? (data.logoData.startsWith("http") ? data.logoData : `${API_BASE_URL}${data.logoData}`) : "",
        navbarBrandText: data.navbarBrandText ?? data.contentSettings?.navbarBrandText ?? defaultSiteSettings.navbarBrandText,
        navbarBrandActive: data.navbarBrandActive ?? data.contentSettings?.navbarBrandActive ?? defaultSiteSettings.navbarBrandActive,
        contentSettings: {
          ...defaultContentSettings,
          ...(data.contentSettings || {}),
          hero: { ...defaultContentSettings.hero, ...(data.contentSettings?.hero || {}) },
          whyChooseUs: { ...defaultContentSettings.whyChooseUs, ...(data.contentSettings?.whyChooseUs || {}) },
          about: { ...defaultContentSettings.about, ...(data.contentSettings?.about || {}) },
          process: { ...defaultContentSettings.process, ...(data.contentSettings?.process || {}) },
          technologies: { ...defaultContentSettings.technologies, ...(data.contentSettings?.technologies || {}) },
          contact: { ...defaultContentSettings.contact, ...(data.contentSettings?.contact || {}) },
          footer: { ...defaultContentSettings.footer, ...(data.contentSettings?.footer || {}) },
          servicesSection: { ...defaultContentSettings.servicesSection, ...(data.contentSettings?.servicesSection || {}) }, reviewsSection: { ...defaultContentSettings.reviewsSection, ...(data.contentSettings?.reviewsSection || {}) }, blogsPage: { ...defaultContentSettings.blogsPage, ...(data.contentSettings?.blogsPage || {}) }, serviceDetails: { ...defaultContentSettings.serviceDetails, ...(data.contentSettings?.serviceDetails || {}) }, aboutCta: { ...defaultContentSettings.aboutCta, ...(data.contentSettings?.aboutCta || {}) }, notFound: { ...defaultContentSettings.notFound, ...(data.contentSettings?.notFound || {}) },
          sections: { ...defaultContentSettings.sections, ...(data.contentSettings?.sections || {}) },
        },
        }));
      })
      .catch(() => {});

    syncSettings(false);
    const interval = window.setInterval(() => {
      if (!document.hidden) syncSettings(true);
    }, 15000);
    const refresh = () => active && syncSettings(true);
    window.addEventListener("focus", refresh);

    return () => {
      active = false;
      window.clearInterval(interval);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  return settings;
}
