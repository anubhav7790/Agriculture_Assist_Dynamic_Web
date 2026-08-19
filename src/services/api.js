const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

export const fakeDelay = (value, timeout = 350) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(value), timeout);
  });

async function request(url, options = {}) {
  let response;
  const method = options.method || "GET";
  const fullUrl = url.startsWith("http") ? url : `${API_BASE_URL}${url}`;

  try {
    const { headers, ...restOptions } = options;
    response = await fetch(fullUrl, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(headers || {})
      },
      ...restOptions
    });
  } catch (_error) {
    throw new Error("Network issue while contacting server. Please refresh and try again.");
  }

  const rawText = await response.text();
  let data = {};

  try {
    data = rawText ? JSON.parse(rawText) : {};
  } catch (_error) {
    data = {};
  }

  if (!response.ok) {
    const textSnippet = rawText ? rawText.slice(0, 220) : "";
    const debugInfo = data.debug ? ` Debug: ${JSON.stringify(data.debug)}` : "";
    const baseMessage =
      data.message ||
      (textSnippet
        ? `Request failed (${response.status}). ${textSnippet}`
        : `Request failed with status ${response.status}.`);
    throw new Error(
      `${baseMessage}${debugInfo}`
    );
  }

  return data;
}

export function registerUser(payload) {
  // API CALL (COMMENTED)
  // fetch("YOUR_API_KEY/register", { method: "POST" })
  return request("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function loginUser(payload) {
  // API CALL (COMMENTED)
  // fetch("YOUR_API_KEY/login", { method: "POST" })
  return request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function fetchCurrentUser(token) {
  return request(`/api/auth/me?ts=${Date.now()}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function updateCurrentUser(token, payload) {
  return request("/api/auth/profile", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
}

export function logoutUser(token) {
  return request("/api/auth/logout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function fetchMarketplaceListings(district = "") {
  // API CALL
  // fetch("YOUR_API_KEY/get-listings")
  const query = district ? `?district=${encodeURIComponent(district)}` : "";
  return request(`/api/listings${query}`);
}

export function createMarketplaceListing(token, payload) {
  // API CALL
  // fetch("YOUR_API_KEY/add-listing")
  return request("/api/listings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
}

export function deleteMarketplaceListing(token, listingId) {
  return request(`/api/listings/${listingId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function fetchSoilReports(token) {
  // API CALL
  // fetch("YOUR_API_KEY/soil-reports")
  return request("/api/soil-reports", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function createSoilReport(token, payload) {
  // API CALL
  // fetch("YOUR_API_KEY/upload-soil")
  return request("/api/soil-reports", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
}

export function analyzeSoilReport(token, payload) {
  return request("/api/soil-analysis", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
}

export function analyzeSoilImageReport(token, payload) {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return request("/api/soil-image-analysis", {
    method: "POST",
    headers,
    body: JSON.stringify(payload)
  });
}

export async function fetchSafetyGuidelines(data) {
  // API CALL
  // fetch("YOUR_API_KEY/safety")
  return fakeDelay(data);
}

export async function fetchSchemes(data) {
  // API CALL
  // fetch("YOUR_API_KEY/schemes")
  return fakeDelay(data);
}
