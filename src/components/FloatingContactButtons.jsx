import { useEffect, useState } from "react";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function FloatingContactButtons() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/site-settings`)
      .then((response) => (response.ok ? response.json() : null))
      .then(setSettings)
      .catch(() => setSettings(null));
  }, []);

  if (!settings?.phoneNumber && !settings?.whatsappNumber) return null;
  const phone = settings.phoneNumber.replace(/[^+\d]/g, "");
  const whatsappUrl = settings.whatsappNumber && `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(settings.whatsappMessage || "")}`;

  return <>
    {phone && <a aria-label="Call us" href={`tel:${phone}`} className="fixed bottom-5 left-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-lg text-slate-950 shadow-lg transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white"><FaPhoneAlt /></a>}
    {whatsappUrl && <a aria-label="Chat on WhatsApp" href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-xl text-white shadow-lg transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white"><FaWhatsapp /></a>}
  </>;
}
