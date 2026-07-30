import aiBusinessAutomation from "../assets/blog-images/ai-business-automation.jpg";
import conversionRateOptimization from "../assets/blog-images/conversion-rate-optimization.jpg";
import customWebDevelopment from "../assets/blog-images/custom-web-development-guide.jpg";
import ecommerceDevelopment from "../assets/blog-images/ecommerce-website-development.jpg";
import googleAdsStrategy from "../assets/blog-images/google-ads-strategy.jpg";
import localSeoStrategy from "../assets/blog-images/local-seo-strategy.jpg";
import mobileAppDevelopment from "../assets/blog-images/mobile-app-development-guide.jpg";
import socialMediaStrategy from "../assets/blog-images/social-media-marketing-strategy.jpg";
import technicalSeoChecklist from "../assets/blog-images/technical-seo-checklist.jpg";
import websiteMaintenance from "../assets/blog-images/website-maintenance-checklist.jpg";

const imagesBySlug = {
  "ai-business-automation": aiBusinessAutomation,
  "conversion-rate-optimization": conversionRateOptimization,
  "custom-web-development-guide": customWebDevelopment,
  "ecommerce-website-development": ecommerceDevelopment,
  "google-ads-strategy": googleAdsStrategy,
  "local-seo-strategy": localSeoStrategy,
  "mobile-app-development-guide": mobileAppDevelopment,
  "social-media-marketing-strategy": socialMediaStrategy,
  "technical-seo-checklist-for-rankings-and-performance": technicalSeoChecklist,
  "technical-seo-checklist": technicalSeoChecklist,
  "website-maintenance-checklist": websiteMaintenance,
};

const imageMatchers = [
  ["ai-business-automation", aiBusinessAutomation],
  ["conversion-rate-optimization", conversionRateOptimization],
  ["custom-web-development", customWebDevelopment],
  ["ecommerce-website-development", ecommerceDevelopment],
  ["google-ads", googleAdsStrategy],
  ["local-seo", localSeoStrategy],
  ["mobile-app-development", mobileAppDevelopment],
  ["social-media-marketing", socialMediaStrategy],
  ["technical-seo", technicalSeoChecklist],
  ["website-maintenance", websiteMaintenance],
];

export const getBlogImage = (blog) => {
  const slug = blog?.slug || "";
  return (
    imagesBySlug[slug] ||
    imageMatchers.find(([keyword]) => slug.includes(keyword))?.[1] ||
    (blog?.image && !blog.image.startsWith("data:") ? blog.image : "")
  );
};
