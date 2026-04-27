export const fakeDelay = (value, timeout = 350) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(value), timeout);
  });

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
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
  return request("/api/auth/me", {
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

export function fetchMarketplaceListings() {
  // API CALL
  // fetch("YOUR_API_KEY/get-listings")
  return request("/api/listings");
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
