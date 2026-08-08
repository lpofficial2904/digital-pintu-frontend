import { useEffect } from "react";
import useSiteSettings from "../utils/useSiteSettings";

export default function ThemeManager(){
 const {themeSettings:t={},logoData}=useSiteSettings();
 useEffect(()=>{const root=document.documentElement;const vars={"--site-primary":t.primaryColor||"#22d3ee","--site-secondary":t.secondaryColor||"#3b82f6","--site-accent":t.accentColor||"#8b5cf6","--site-bg":t.backgroundColor||"#070b14","--site-surface":t.surfaceColor||"#0b1020","--site-text":t.textColor||"#fff","--site-muted":t.mutedTextColor||"#94a3b8","--site-radius":`${Number(t.borderRadius??16)}px`,"--site-font":t.fontFamily||"Inter"};Object.entries(vars).forEach(([k,v])=>root.style.setProperty(k,v));document.body.dataset.theme=t.mode||"dark";document.body.classList.toggle("reduce-site-motion",t.animationEnabled===false);},[t]);
 useEffect(()=>{let icon=document.querySelector('link[rel="icon"]');if(!icon){icon=document.createElement("link");icon.rel="icon";document.head.appendChild(icon)}icon.href=logoData||"/favicon.svg";},[logoData]);
 return null;
}
