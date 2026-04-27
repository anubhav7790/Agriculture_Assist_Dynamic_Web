export default function StatCard({ icon, label, value, detail }) {
  return (
    <article className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div>
        <p>{label}</p>
        <h3>{value}</h3>
        <small>{detail}</small>
      </div>
    </article>
  );
}
