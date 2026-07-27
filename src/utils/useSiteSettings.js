import { useEffect, useState } from "react";

export const defaultSiteSettings = {
  phoneNumber: "+91 86196 27463",
  contactEmail: "hello@digitalpintu.com",
  address: "Mansarovar, Jaipur, Rajasthan, India",
  whatsappNumber: "918619627463",
  whatsappMessage: "Hello Digital Pintu, I want to know about your services.",
};

export default function useSiteSettings() {
  const [settings, setSettings] = useState(defaultSiteSettings);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/site-settings`, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load site settings");
        return response.json();
      })
      .then((data) => setSettings((current) => ({ ...current, ...data })))
      .catch(() => {});
  }, []);

  return settings;
}
