import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import useSiteSettings from "../utils/useSiteSettings";

export default function FloatingContactButtons() {
  const settings = useSiteSettings();

  if (!settings.phoneNumber && !settings.whatsappNumber) return null;
  const phone = settings.phoneNumber.replace(/[^+\d]/g, "");
  const whatsappUrl = settings.whatsappNumber && `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(settings.whatsappMessage || "")}`;

  return <>
    {phone && <a aria-label="Call us" href={`tel:${phone}`} className="fixed bottom-5 left-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-lg text-slate-950 shadow-lg transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white"><FaPhoneAlt /></a>}
    {whatsappUrl && <a aria-label="Chat on WhatsApp" href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-xl text-white shadow-lg transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white"><FaWhatsapp /></a>}
  </>;
}
