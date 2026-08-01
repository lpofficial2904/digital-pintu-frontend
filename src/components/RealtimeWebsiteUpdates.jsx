import { useEffect } from "react";
import { API_BASE_URL, clearPublicApiCache } from "../utils/publicApi";

const VERSION_KEY = "digital-pintu-realtime-version";

export default function RealtimeWebsiteUpdates() {
  useEffect(() => {
    let refreshTimer;
    let stopped = false;

    const refreshWebsite = (version) => {
      if (stopped || refreshTimer) return;
      const previous = sessionStorage.getItem(VERSION_KEY);
      if (version && String(version) === previous) return;
      if (version) sessionStorage.setItem(VERSION_KEY, String(version));

      clearPublicApiCache();
      refreshTimer = window.setTimeout(() => window.location.reload(), 250);
    };

    const events = new EventSource(`${API_BASE_URL}/api/realtime/events`);
    events.addEventListener("connected", (event) => {
      try {
        const { version } = JSON.parse(event.data);
        if (!sessionStorage.getItem(VERSION_KEY)) {
          sessionStorage.setItem(VERSION_KEY, String(version));
        }
      } catch {
        // A malformed handshake should not stop future update events.
      }
    });
    events.addEventListener("website-update", (event) => {
      try {
        refreshWebsite(JSON.parse(event.data).version);
      } catch {
        refreshWebsite();
      }
    });

    // A small version check covers sleeping tabs and temporary SSE disconnects.
    const checkVersion = () => {
      fetch(`${API_BASE_URL}/api/realtime/version`, { cache: "no-store" })
        .then((response) => response.ok ? response.json() : null)
        .then((data) => {
          if (!data?.version) return;
          const previous = sessionStorage.getItem(VERSION_KEY);
          if (!previous) sessionStorage.setItem(VERSION_KEY, String(data.version));
          else if (previous !== String(data.version)) refreshWebsite(data.version);
        })
        .catch(() => {});
    };
    const interval = window.setInterval(checkVersion, 15000);
    window.addEventListener("focus", checkVersion);

    return () => {
      stopped = true;
      events.close();
      window.clearInterval(interval);
      window.clearTimeout(refreshTimer);
      window.removeEventListener("focus", checkVersion);
    };
  }, []);

  return null;
}
