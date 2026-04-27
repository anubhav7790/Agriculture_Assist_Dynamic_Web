import { useAppContext } from "../context/AppContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useAppContext();

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
