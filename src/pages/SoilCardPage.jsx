import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SectionHeader from "../components/SectionHeader";
import Loader from "../components/Loader";

function getTone(value) {
  if (value >= 60) return "good";
  if (value >= 40) return "medium";
  return "low";
}

export default function SoilCardPage() {
  const { currentSoilReport, soilReports, soilReportsLoading } = useAppContext();
  const latest = currentSoilReport || soilReports[0];

  if (soilReportsLoading) {
    return <Loader message="Loading soil health card..." />;
  }

  if (!latest) {
    return (
      <div className="page-stack">
        <SectionHeader
          eyebrow="Soil Health Card"
          title="No soil report found"
          description="Upload your first soil report to generate a soil health card."
        />
      </div>
    );
  }

  return (
    <div className="page-stack">
      <SectionHeader
        eyebrow="Soil Health Card"
        title="Nutrient Status Overview"
        description={`Quick overview for ${latest.crop}. Use the detailed analysis page to see what is right, what is wrong, and what to do next.`}
      />
      <section className="panel">
        <div className="soil-card-grid">
          {[
            { label: "Nitrogen", value: latest.n },
            { label: "Phosphorus", value: latest.p },
            { label: "Potassium", value: latest.k ?? "N/A" }
          ].map((item) => (
            <div
              key={item.label}
              className={`nutrient-card ${typeof item.value === "number" ? getTone(item.value) : "medium"}`}
            >
              <p>{item.label}</p>
              <h3>{item.value}</h3>
            </div>
          ))}
          <div className={`nutrient-card ${latest.ph >= 6 && latest.ph <= 7.5 ? "good" : "medium"}`}>
            <p>pH Level</p>
            <h3>{latest.ph}</h3>
          </div>
        </div>
        <div className="stats-row">
          <div className="stat-card">
            <span>Overall Status</span>
            <strong>{latest.status}</strong>
          </div>
          <div className="stat-card">
            <span>Crop</span>
            <strong>{latest.crop}</strong>
          </div>
        </div>
        <div className="inline-links">
          <Link className="btn btn-primary" to="/soil/recommendations">
            View Detailed Analysis
          </Link>
          <Link className="btn btn-secondary" to="/soil/history">
            Open History
          </Link>
        </div>
      </section>
    </div>
  );
}
