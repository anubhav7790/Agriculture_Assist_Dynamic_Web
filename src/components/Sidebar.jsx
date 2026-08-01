import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: "🏠" },
  { label: "Soil Health", path: "/soil/upload", icon: "🌱" },
  { label: "Safety Awareness", path: "/safety/guidelines", icon: "🛡️" },
  { label: "Government Schemes", path: "/schemes", icon: "🏛️" },
  { label: "Marketplace", path: "/marketplace", icon: "🛒" },
  { label: "Profile", path: "/profile", icon: "👤" }
];

export default function Sidebar({ isOpen, onClose }) {
  const { logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
    navigate("/");
  };

  return (
    <>
      <div className={`sidebar-backdrop ${isOpen ? "show" : ""}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <span>🌿</span>
          <div>
            <strong>Krishi Vikas</strong>
          </div>
          <button className="sidebar-close-btn" onClick={onClose} aria-label="Close sidebar">
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className="nav-item" onClick={onClose}>
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button className="btn btn-secondary sidebar-logout" onClick={handleLogout}>
          Logout
        </button>
      </aside>
    </>
  );
}
