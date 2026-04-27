import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { globalSearch, setGlobalSearch, language, setLanguage, role } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setGlobalSearch(event.target.value);
    if (!location.pathname.includes("marketplace")) {
      navigate("/marketplace");
    }
  };

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brand-mark">🌾</span>
        <div>
          <strong>Krishi Vikas</strong>
          <small>{role} Mode</small>
        </div>
      </Link>
      <div className="navbar-actions">
        <SearchBar
          value={globalSearch}
          onChange={handleSearch}
          placeholder="Search crops, schemes, or modules"
        />
        <select
          className="language-switch"
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>
        <ThemeToggle />
      </div>
    </header>
  );
}
