import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const API_BASE_URL = "https://api.digitalpintu.com";

export default function VisitorTracker() { const location = useLocation(); useEffect(() => { const key = "visitor_tracker_id"; const visitorId = localStorage.getItem(key) || crypto.randomUUID(); localStorage.setItem(key, visitorId); const landingPage = sessionStorage.getItem("visitor_landing_page") || location.pathname; sessionStorage.setItem("visitor_landing_page", landingPage); fetch(`${API_BASE_URL}/api/tracker/visit`, { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ visitorId, currentPage: location.pathname, landingPage, referrer: document.referrer || "Direct" }) }).catch(() => { }); }, [location.pathname]); return null; }
