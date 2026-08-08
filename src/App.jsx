import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TechMarquee from "./components/TechMarquee";
import Services from "./components/Services";
import StatsSection from "./components/StatsSection";
import WhyChooseUs from "./components/WhyChooseUs";
import ReviewSection from "./components/ReviewSection";
import AddReview from "./components/AddReview";

import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingContactButtons from "./components/FloatingContactButtons";
import AIChatBot from "./components/AIChatBot";
import ProcessSection from "./components/ProcessSection";
import { getCachedJson } from "./utils/publicApi";
import RealtimeWebsiteUpdates from "./components/RealtimeWebsiteUpdates";
import SeoManager from "./components/SeoManager";
import ThemeManager from "./components/ThemeManager";
import OfferDisplay from "./components/OfferDisplay";
import useSiteSettings from "./utils/useSiteSettings";
import { API_BASE_URL } from "./utils/publicApi";

const WEBSITE_PAGES_API = `${API_BASE_URL}/api/website-pages`;
const Login = lazy(() => import("./pages/Login")); const Register = lazy(() => import("./pages/Register")); const ServiceDetails = lazy(() => import("./pages/ServiceDetails")); const Blogs = lazy(() => import("./pages/Blogs")); const BlogDetails = lazy(() => import("./pages/BlogDetails")); const ManagedPage = lazy(() => import("./pages/ManagedPage")); const LegalPage = lazy(() => import("./pages/LegalPage")); const NotFound = lazy(() => import("./pages/NotFound"));

function PageGate({ slug, children }) {
  const [allowed, setAllowed] = useState(true);

  useEffect(() => {
    let active = true;
    getCachedJson(`${WEBSITE_PAGES_API}/${slug}`)
      .then(() => { if (active) setAllowed(true); })
      .catch((error) => {
        if (active) setAllowed(error.status === 404 ? false : true);
      });
    return () => { active = false; };
  }, [slug]);

  if (!allowed) return <ManagedPage pageSlug={slug} />;
  return children;
}

function Home({ refreshReviews, handleReviewAdded }) {
  const { contentSettings } = useSiteSettings();
  const sections = contentSettings.sections || {};
  const [activePages, setActivePages] = useState(null);

  useEffect(() => {
    const load = () => getCachedJson(WEBSITE_PAGES_API, { force: true, maxAge: 0 })
      .then((data) => setActivePages(new Set(data.map((page) => page.key))))
      .catch(() => setActivePages(null));
    load(); const interval = window.setInterval(load, 10000); window.addEventListener("focus", load);
    return () => { window.clearInterval(interval); window.removeEventListener("focus", load); };
  }, []);

  const visible = (key) => activePages === null || activePages.has(key);

  return (
    <div id="home" className="bg-[#070B14] text-white">
      <Navbar />
      <Hero />
      {sections.tech !== false && <TechMarquee />}
      {sections.services !== false && visible("services") && <Services showNavbar={false} />}
      {sections.stats !== false && <StatsSection />}
      {sections.whyChooseUs !== false && <WhyChooseUs />}
      {sections.process !== false && visible("process") && <ProcessSection />}

      {sections.reviews !== false && visible("reviews") && <ReviewSection refresh={refreshReviews} />}

      {/* <AddReview onReviewAdded={handleReviewAdded} /> */}
      {sections.contact !== false && visible("contact") && <Contact showNavbar={false}/>}
      <Footer/>
    </div>
  );
}

function App() {
  const [refreshReviews, setRefreshReviews] = useState(false);

  const handleReviewAdded = () => {
    setRefreshReviews((prev) => !prev);
  };

  return (
    <>
    <ThemeManager />
    <OfferDisplay />
    <RealtimeWebsiteUpdates />
    <SeoManager headOnly />
    <Suspense fallback={<div className="min-h-screen bg-[#070b14]" />}><Routes>
      <Route
        path="/"
        element={
          <Home
            refreshReviews={refreshReviews}
            handleReviewAdded={handleReviewAdded}
          />
        }
      />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
      <Route path="/services" element={<PageGate slug="services"><Services /></PageGate>} />
      {/* <Route path="/services/:slug" element={<ServiceDetails />} /> */}
      <Route
  path="/services/:slug"
  element={
    <PageGate slug="services">
      <Navbar />
      <ServiceDetails />
      <Contact showNavbar={false} />
      <Footer />
    </PageGate>
  }
/>
      <Route path="/contact/" element={<PageGate slug="contact"><Contact /></PageGate>} />
      <Route path="/blogs" element={<PageGate slug="blogs"><Blogs /></PageGate>} />
      <Route path="/blogs/:slug" element={<PageGate slug="blogs"><BlogDetails /></PageGate>} />
      <Route path="/about" element={<ManagedPage pageSlug="about" />} />
      <Route path="/careers" element={<ManagedPage pageSlug="careers" />} />
      <Route path="/privacy-policy" element={<LegalPage type="privacy" />} />
      <Route path="/terms" element={<LegalPage type="terms" />} />
      <Route path="/pages/:slug" element={<ManagedPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes></Suspense>
    <SeoManager contentOnly />
    <FloatingContactButtons />
    <AIChatBot />
    </>
  );
}

export default App;
