import { Navigate, Route, Routes } from "react-router-dom";
import { useAppContext } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import ToastContainer from "./components/ToastContainer";
import Loader from "./components/Loader";
import LandingLocalizedPage from "./pages/LandingLocalizedPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import SoilUploadPage from "./pages/SoilUploadPage";
import SoilCardPage from "./pages/SoilCardPage";
import SoilAdvicePage from "./pages/SoilAdvicePage";
import SoilHistoryPage from "./pages/SoilHistoryPage";
import SafetyGuidelinesPage from "./pages/SafetyGuidelinesPage";
import ProtectiveEquipmentPage from "./pages/ProtectiveEquipmentPage";
import VoiceInstructionsPage from "./pages/VoiceInstructionsPage";
import SchemesPage from "./pages/SchemesPage";
import MarketplacePage from "./pages/MarketplacePage";
import AddListingPage from "./pages/AddListingPage";
import ListingDetailsPage from "./pages/ListingDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

function AppShell() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Navbar />
        <main className="content-shell">
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/soil/upload" element={<SoilUploadPage />} />
            <Route path="/soil/card" element={<SoilCardPage />} />
            <Route path="/soil/recommendations" element={<SoilAdvicePage />} />
            <Route path="/soil/history" element={<SoilHistoryPage />} />
            <Route path="/safety/guidelines" element={<SafetyGuidelinesPage />} />
            <Route path="/safety/equipment" element={<ProtectiveEquipmentPage />} />
            <Route path="/safety/voice" element={<VoiceInstructionsPage />} />
            <Route path="/schemes" element={<SchemesPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/marketplace/add" element={<AddListingPage />} />
            <Route path="/marketplace/:listingId" element={<ListingDetailsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const { authLoading, isAuthenticated } = useAppContext();

  if (authLoading) {
    return (
      <div className="app-frame">
        <Loader message="Restoring your session..." />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="app-frame">
      <Routes>
        <Route path="/" element={<LandingLocalizedPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/*"
          element={isAuthenticated ? <AppShell /> : <Navigate to="/login" replace />}
        />
      </Routes>
      {!isAuthenticated && <Footer />}
      <ToastContainer />
    </div>
  );
}
