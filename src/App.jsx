import { Routes, Route } from "react-router-dom";
import { useState } from "react";

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

function Home({ refreshReviews, handleReviewAdded }) {
  return (
    <div id="home" className="bg-[#070B14] text-white">
      <Navbar />
      <Hero />
      <TechMarquee />
      <Services />
      <StatsSection />
      <WhyChooseUs />

      <ReviewSection refresh={refreshReviews} />

      {/* <AddReview onReviewAdded={handleReviewAdded} /> */}
      <Contact/>
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
      <Route path="/services" element={<Services />} />
      {/* <Route path="/services/:slug" element={<ServiceDetails />} /> */}
      <Route
  path="/services/:slug"
  element={
    <>
      <Navbar />
      <ServiceDetails />
      <Contact />
      <Footer />
    </>
  }
/>
      <Route path="/contact/" element={<Contact />} />
    </Routes>
  );
}

export default App;
