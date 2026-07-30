export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://digital-pintu-backend.onrender.com";

const memoryCache = new Map();
const pendingRequests = new Map();
const STORAGE_PREFIX = "digital-pintu-api:";

const readStored = (url, maxAge) => {
  try {
    const stored = JSON.parse(localStorage.getItem(`${STORAGE_PREFIX}${url}`));
    if (stored && Date.now() - stored.savedAt < maxAge) return stored.data;
  } catch {
    // Ignore unavailable or invalid browser storage.
  }
  return undefined;
};

const store = (url, data) => {
  memoryCache.set(url, { data, savedAt: Date.now() });
  try {
    localStorage.setItem(
      `${STORAGE_PREFIX}${url}`,
      JSON.stringify({ data, savedAt: Date.now() })
    );
  } catch {
    // The in-memory cache still works when storage is full or unavailable.
  }
};

export const getCachedJson = (path, { maxAge = 5 * 60 * 1000, force = false } = {}) => {
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;

  if (!force) {
    const cached = memoryCache.get(url);
    if (cached && Date.now() - cached.savedAt < maxAge) {
      return Promise.resolve(cached.data);
    }

    const stored = readStored(url, maxAge);
    if (stored !== undefined) {
      memoryCache.set(url, { data: stored, savedAt: Date.now() });
      return Promise.resolve(stored);
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
