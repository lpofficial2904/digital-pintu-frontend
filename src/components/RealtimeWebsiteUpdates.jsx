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
        const previous = sessionStorage.getItem(VERSION_KEY);
        if (!previous) sessionStorage.setItem(VERSION_KEY, String(version));
        else if (previous !== String(version)) refreshWebsite(version);
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

    return () => {
      stopped = true;
      events.close();
      window.clearTimeout(refreshTimer);
    };
  }, []);

  return null;
}
