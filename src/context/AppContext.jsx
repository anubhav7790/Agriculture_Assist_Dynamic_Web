import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  chemicals,
  equipmentItems,
  initialListings,
  initialSchemes,
  initialSoilReports,
  userProfile
} from "../data/mockData";
import { languageText } from "../data/i18n";
import {
  createMarketplaceListing,
  analyzeSoilReport,
  deleteMarketplaceListing,
  fetchCurrentUser,
  fetchMarketplaceListings,
  fetchSoilReports,
  loginUser,
  logoutUser,
  registerUser,
  updateCurrentUser
} from "../services/api";

const AppContext = createContext(null);
const authStorageKey = "kv-auth-token";

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("kv-theme") || "light");
  const [language, setLanguage] = useState(localStorage.getItem("kv-language") || "en");
  const [role, setRole] = useState(localStorage.getItem("kv-role") || "Farmer");
  const [authToken, setAuthToken] = useState(localStorage.getItem(authStorageKey) || "");
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem(authStorageKey)));
  const [authLoading, setAuthLoading] = useState(Boolean(localStorage.getItem(authStorageKey)));
  const [listingsLoading, setListingsLoading] = useState(true);
  const [soilReportsLoading, setSoilReportsLoading] = useState(true);
  const [toasts, setToasts] = useState([]);
  const [globalSearch, setGlobalSearch] = useState("");
  const [soilReports, setSoilReports] = useState(initialSoilReports);
  const [currentSoilReport, setCurrentSoilReport] = useState(null);
  const [schemes] = useState(initialSchemes);
  const [listings, setListings] = useState(initialListings);
  const [favorites, setFavorites] = useState([]);
  const [profile, setProfile] = useState(userProfile);

  useEffect(() => {
    let active = true;
    setListingsLoading(true);

    fetchMarketplaceListings()
      .then(({ listings: remoteListings }) => {
        if (!active) {
          return;
        }
        setListings(remoteListings.length ? remoteListings : initialListings);
      })
      .catch(() => {
        if (!active) {
          return;
        }
        setListings(initialListings);
      })
      .finally(() => {
        if (active) {
          setListingsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!authToken) {
      setSoilReportsLoading(false);
      return;
    }

    let active = true;
    setSoilReportsLoading(true);

    fetchSoilReports(authToken)
      .then(({ reports }) => {
        if (!active) {
          return;
        }
        setSoilReports(reports.length ? reports : initialSoilReports);
      })
      .catch(() => {
        if (!active) {
          return;
        }
        setSoilReports(initialSoilReports);
      })
      .finally(() => {
        if (active) {
          setSoilReportsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [authToken]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("kv-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("kv-language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("kv-role", role);
  }, [role]);

  useEffect(() => {
    if (!authToken) {
      setAuthLoading(false);
      return;
    }

    let active = true;
    setAuthLoading(true);

    fetchCurrentUser(authToken)
      .then(({ user }) => {
        if (!active) {
          return;
        }
        setProfile((current) => ({ ...current, ...user }));
        setRole(user.role || "Farmer");
        setIsAuthenticated(true);
      })
      .catch(() => {
        if (!active) {
          return;
        }
        localStorage.removeItem(authStorageKey);
        setAuthToken("");
        setIsAuthenticated(false);
      })
      .finally(() => {
        if (active) {
          setAuthLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [authToken]);

  const showToast = (message, variant = "success") => {
    const id = Date.now();
    setToasts((current) => [...current, { id, message, variant }]);
    setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const login = async (credentials) => {
    const { token, user, message } = await loginUser(credentials);
    localStorage.setItem(authStorageKey, token);
    setAuthToken(token);
    setProfile((current) => ({ ...current, ...user }));
    setRole(user.role || "Farmer");
    setIsAuthenticated(true);
    showToast(message || "Welcome back to Krishi Vikas");
  };

  const register = async (payload) => {
    const { token, user, message } = await registerUser(payload);
    localStorage.setItem(authStorageKey, token);
    setAuthToken(token);
    setProfile((current) => ({ ...current, ...user }));
    setRole(user.role || payload.role || "Farmer");
    setIsAuthenticated(true);
    showToast(message || "Registration successful");
  };

  const logout = async () => {
    if (authToken) {
      try {
        await logoutUser(authToken);
      } catch (_error) {
        // Ignore logout API errors and clear local session anyway.
      }
    }
    localStorage.removeItem(authStorageKey);
    setAuthToken("");
    setIsAuthenticated(false);
    setProfile(userProfile);
    showToast("Logged out safely", "info");
  };

  const addSoilReport = async (report) => {
    if (!authToken) {
      throw new Error("Please login again to analyze the soil report.");
    }

    const { report: analyzedReport, message } = await analyzeSoilReport(authToken, report);
    setCurrentSoilReport(analyzedReport);
    showToast(message || "Soil analysis generated");
  };

  const addListing = async (listing) => {
    if (!authToken) {
      throw new Error("Please login again to add a listing.");
    }

    const { listing: createdListing, message } = await createMarketplaceListing(authToken, listing);
    setListings((current) => [createdListing, ...current]);
    showToast(message || "Crop listing added");
  };

  const deleteListing = async (listingId) => {
    if (!authToken) {
      throw new Error("Please login again to delete a listing.");
    }

    const { message } = await deleteMarketplaceListing(authToken, listingId);
    setListings((current) => current.filter((item) => item.id !== listingId));
    showToast(message || "Listing removed");
  };

  const toggleFavorite = (listingId) => {
    setFavorites((current) =>
      current.includes(listingId)
        ? current.filter((id) => id !== listingId)
        : [...current, listingId]
    );
  };

  const updateProfile = async (updates) => {
    if (!authToken) {
      throw new Error("Please login again.");
    }
    const { user, message } = await updateCurrentUser(authToken, updates);
    setProfile((current) => ({ ...current, ...user }));
    setRole(user.role || role);
    showToast(message || "Profile updated");
  };

  const text = languageText[language];

  const value = useMemo(
    () => ({
      chemicals,
      equipmentItems,
      favorites,
      globalSearch,
      authLoading,
      isAuthenticated,
      language,
      listings,
      listingsLoading,
      login,
      logout,
      profile,
      register,
      role,
      schemes,
      setGlobalSearch,
      setLanguage,
      setRole,
      showToast,
      currentSoilReport,
      soilReports,
      soilReportsLoading,
      text,
      theme,
      toasts,
      deleteListing,
      toggleFavorite,
      toggleTheme: () => setTheme((current) => (current === "light" ? "dark" : "light")),
      updateProfile,
      addListing,
      addSoilReport
    }),
    [
      favorites,
      globalSearch,
      authLoading,
      isAuthenticated,
      language,
      listings,
      listingsLoading,
      profile,
      role,
      schemes,
      soilReports,
      soilReportsLoading,
      currentSoilReport,
      text,
      theme,
      toasts
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
