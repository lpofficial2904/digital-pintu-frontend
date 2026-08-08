import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import useSiteSettings from "../utils/useSiteSettings";

const absolute = (base, value) => !value ? "" : /^https?:\/\//i.test(value) ? value : `${base}${value.startsWith("/") ? "" : "/"}${value}`;

export default function SeoManager({ headOnly = false, contentOnly = false }) {
  const { pathname } = useLocation();
  const settings = useSiteSettings();
  const { seoSettings = {}, logoData, phoneNumber, contactEmail, address, facebookUrl, instagramUrl, twitterUrl, linkedinUrl } = settings;
  const base = String(seoSettings.siteUrl || "https://www.digitalpintu.com").replace(/\/$/, "");
  const page = seoSettings.pageSeo?.[pathname] || {};
  const title = page.title || seoSettings.defaultTitle || "Digital Pintu Solutions";
  const description = page.description || seoSettings.defaultDescription || "Digital solutions for modern businesses.";
  const canonical = page.canonicalUrl || `${base}${pathname === "/" ? "/" : pathname}`;
  const image = absolute(base, page.ogImage || seoSettings.defaultOgImage || logoData);
  const robots = `${page.noIndex || seoSettings.robotsIndex === false ? "noindex" : "index"},${seoSettings.robotsFollow === false ? "nofollow" : "follow"}`;
  const crumbs = pathname === "/" ? [] : pathname.split("/").filter(Boolean).map((part, index, list) => ({ name: index === list.length - 1 ? (page.breadcrumbName || part.replace(/-/g," ")) : part.replace(/-/g," "), url: `${base}/${list.slice(0,index+1).join("/")}` }));
  const faqs = (page.faqs || []).filter((item) => item.question && item.answer);
  const sameAs = [facebookUrl, instagramUrl, twitterUrl, linkedinUrl].filter(Boolean);
  const organization = { "@context":"https://schema.org", "@type":seoSettings.organizationType || "ProfessionalService", "@id":`${base}/#business`, name:seoSettings.siteName || "Digital Pintu", url:base, logo:absolute(base,seoSettings.organizationLogo || logoData), image, description:seoSettings.businessDescription || description, telephone:phoneNumber, email:contactEmail, address:{ "@type":"PostalAddress", streetAddress:address, addressLocality:"Jaipur", addressRegion:"Rajasthan", addressCountry:"IN" }, areaServed:{ "@type":"City", name:"Jaipur" }, sameAs };
  const websiteSchema = { "@context":"https://schema.org", "@type":"WebSite", "@id":`${base}/#website`, url:`${base}/`, name:seoSettings.siteName || "Digital Pintu", publisher:{ "@id":`${base}/#business` }, inLanguage:"en-IN" };
  const webPageSchema = { "@context":"https://schema.org", "@type":"WebPage", "@id":`${canonical}#webpage`, url:canonical, name:title, description, isPartOf:{ "@id":`${base}/#website` }, about:{ "@id":`${base}/#business` }, inLanguage:"en-IN" };
  const breadcrumbSchema = crumbs.length ? { "@context":"https://schema.org", "@type":"BreadcrumbList", itemListElement:[{ "@type":"ListItem", position:1, name:"Home", item:`${base}/` }, ...crumbs.map((item,index)=>({"@type":"ListItem",position:index+2,name:item.name,item:item.url}))] } : null;
  const faqSchema = faqs.length ? { "@context":"https://schema.org", "@type":"FAQPage", mainEntity:faqs.map((item)=>({"@type":"Question",name:item.question,acceptedAnswer:{"@type":"Answer",text:item.answer}})) } : null;

  useEffect(() => {
    const configured = seoSettings.imageAltText || {};
    document.querySelectorAll("img").forEach((img) => {
      const key = img.dataset.seoKey || Object.keys(configured).find((candidate) => img.currentSrc?.includes(candidate) || img.src?.includes(candidate));
      if (key && configured[key]) img.alt = configured[key];
    });
  }, [pathname, seoSettings.imageAltText]);

  const head = <Helmet>
      <title>{title}</title><meta name="description" content={description}/>{page.keywords && <meta name="keywords" content={page.keywords}/>}<meta name="robots" content={robots}/><link rel="canonical" href={canonical}/>
      <meta property="og:type" content="website"/><meta property="og:site_name" content={seoSettings.siteName || "Digital Pintu Solutions"}/><meta property="og:title" content={page.ogTitle || title}/><meta property="og:description" content={page.ogDescription || description}/><meta property="og:url" content={canonical}/>{image && <meta property="og:image" content={image}/>}<meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content={page.ogTitle || title}/><meta name="twitter:description" content={page.ogDescription || description}/>{image && <meta name="twitter:image" content={image}/>} {seoSettings.twitterHandle && <meta name="twitter:site" content={seoSettings.twitterHandle}/>} {seoSettings.googleVerification && <meta name="google-site-verification" content={seoSettings.googleVerification}/>} {seoSettings.bingVerification && <meta name="msvalidate.01" content={seoSettings.bingVerification}/>}<script type="application/ld+json">{JSON.stringify(organization)}</script>{breadcrumbSchema && <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>}{faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script><script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
    </Helmet>;
  const content = (crumbs.length > 0 || faqs.length > 0) && <aside className="bg-[#050b14] px-5 pb-16 text-white"><div className="mx-auto max-w-6xl">{crumbs.length > 0 && <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap gap-2 text-sm text-slate-400"><Link to="/" className="text-cyan-400">Home</Link>{crumbs.map((item,index)=><span key={item.url}> / {index===crumbs.length-1 ? <span>{item.name}</span> : <Link to={new URL(item.url).pathname} className="text-cyan-400">{item.name}</Link>}</span>)}</nav>}{faqs.length > 0 && <section><h2 className="text-3xl font-bold">Frequently asked questions</h2><div className="mt-6 space-y-3">{faqs.map((item)=><details key={item.question} className="rounded-2xl border border-white/10 bg-white/[.035] p-5"><summary className="cursor-pointer font-semibold">{item.question}</summary><p className="mt-3 leading-7 text-slate-400">{item.answer}</p></details>)}</div></section>}</div></aside>;
  return <>{!contentOnly && head}{!headOnly && content}</>;
}
