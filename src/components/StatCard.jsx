import { Link } from "react-router-dom";

export default function StatCard({ icon, label, value, detail, to }) {
  const Component = to ? Link : "article";
  return (
    <Component className="stat-card" to={to} style={to ? { textDecoration: "none", color: "inherit" } : undefined}>
      <div className="stat-icon">{icon}</div>
      <div>
        <p>{label}</p>
        <h3>{value}</h3>
        <small>{detail}</small>
      </div>
    </Component>
  );
}
