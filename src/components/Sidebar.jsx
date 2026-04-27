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

export default function Sidebar() {
  const { logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span>🌿</span>
        <div>
          <strong>Krishi Vikas</strong>
          <small>Farmer Support Platform</small>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink key={item.path} to={item.path} className="nav-item">
            <span>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button className="btn btn-secondary sidebar-logout" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}
