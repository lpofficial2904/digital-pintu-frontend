import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TechMarquee from "./components/TechMarquee";
import Services from "./components/Services";
import StatsSection from "./components/StatsSection";
import WhyChooseUs from "./components/WhyChooseUs";
import ReviewSection from "./components/ReviewSection";
import AddReview from "./components/AddReview";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ServiceDetails from "./pages/ServiceDetails";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingContactButtons from "./components/FloatingContactButtons";
import AIChatBot from "./components/AIChatBot";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import ProcessSection from "./components/ProcessSection";
import ManagedPage from "./pages/ManagedPage";
import LegalPage from "./pages/LegalPage";
import { getCachedJson } from "./utils/publicApi";
import RealtimeWebsiteUpdates from "./components/RealtimeWebsiteUpdates";
import NotFound from "./pages/NotFound";

const WEBSITE_PAGES_API = `${import.meta.env.VITE_API_URL || "https://api.digitalpintu.com"}/api/website-pages`;

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
  const [activePages, setActivePages] = useState(null);

  useEffect(() => {
    getCachedJson(WEBSITE_PAGES_API)
      .then((data) => setActivePages(new Set(data.map((page) => page.key))))
      .catch(() => setActivePages(null));
  }, []);

  const visible = (key) => activePages === null || activePages.has(key);

  return (
    <div id="home" className="bg-[#070B14] text-white">
      <Navbar />
      <Hero />
      <TechMarquee />
      {visible("services") && <Services />}
      <StatsSection />
      <WhyChooseUs />
      {visible("process") && <ProcessSection />}

      {visible("reviews") && <ReviewSection refresh={refreshReviews} />}

      {/* <AddReview onReviewAdded={handleReviewAdded} /> */}
      {visible("contact") && <Contact/>}
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
    <RealtimeWebsiteUpdates />
    <Routes>
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
      <Contact />
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
    </Routes>
    <FloatingContactButtons />
    <AIChatBot />
    </>
  );
}

export default App;
