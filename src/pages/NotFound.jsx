import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import useSiteSettings from "../utils/useSiteSettings";

export default function NotFound() {
  const { contentSettings } = useSiteSettings();
  const copy = contentSettings.notFound;
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#070B14] px-6 text-white">
      <div className="w-full max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.45em] text-cyan-400">{copy.eyebrow}</p>
        <h1 className="mt-5 text-7xl font-black sm:text-9xl">404</h1>
        <h2 className="mt-4 text-2xl font-bold sm:text-3xl">{copy.heading}</h2>
        <p className="mx-auto mt-4 max-w-lg text-gray-400">{copy.description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={() => window.history.back()} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-gray-200 transition hover:border-cyan-400/60 hover:text-white"><ArrowLeft size={18} /> {copy.backLabel}</button>
          <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"><Home size={18} /> {copy.homeLabel}</Link>
        </div>
      </div>
    </main>
  );
}
