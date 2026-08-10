// The production API is intentionally fixed here so a stale hosting-level
// VITE_API_URL cannot send requests back to the retired Render service.
export const API_BASE_URL = import.meta.env.DEV
  ? (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "")
  : "https://api.digitalpintu.com";

const memoryCache = new Map();
const pendingRequests = new Map();
const STORAGE_PREFIX = "digital-pintu-api:";

// Remove responses cached by older builds. Public API data is now kept only in
// memory, so complete JSON payloads are not persisted in browser storage.
try {
  Object.keys(localStorage)
    .filter((key) => key.startsWith(STORAGE_PREFIX))
    .forEach((key) => localStorage.removeItem(key));
} catch {
  // Storage can be unavailable in privacy modes.
}

export const clearPublicApiCache = () => {
  memoryCache.clear();
  pendingRequests.clear();
  try {
    Object.keys(localStorage)
      .filter((key) => key.startsWith(STORAGE_PREFIX))
      .forEach((key) => localStorage.removeItem(key));
  } catch {
    // Storage can be unavailable in privacy modes.
  }
};

const store = (url, data) => {
  memoryCache.set(url, { data, savedAt: Date.now() });
};

export const getCachedJson = (path, { maxAge = 5 * 60 * 1000, force = false } = {}) => {
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;

  if (!force) {
    const cached = memoryCache.get(url);
    if (cached && Date.now() - cached.savedAt < maxAge) {
      return Promise.resolve(cached.data);
    }

  }

  if (pendingRequests.has(url)) return pendingRequests.get(url);

  const request = fetch(url)
    .then((response) => {
      if (!response.ok) {
        const error = new Error(`API request failed (${response.status})`);
        error.status = response.status;
        throw error;
      }
      return response.json();
    })
    .then((data) => {
      store(url, data);
      return data;
    })
    .finally(() => pendingRequests.delete(url));

  pendingRequests.set(url, request);
  return request;
};
