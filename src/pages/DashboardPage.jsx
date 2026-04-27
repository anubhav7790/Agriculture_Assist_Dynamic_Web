import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SectionHeader from "../components/SectionHeader";
import StatCard from "../components/StatCard";

export default function DashboardPage() {
  const { listings, soilReports, text } = useAppContext();
  const latestReport = soilReports[0];

  return (
    <div className="page-stack">
      <SectionHeader
        eyebrow="Dashboard"
        title={text.dashboardTitle}
        description="Track your soil condition, recent reports, recommendations, and active crop listings from one place."
      />

      <div className="stats-grid">
        <StatCard icon="🌱" label="Soil Status" value={latestReport.status} detail={`pH ${latestReport.ph}`} />
        <StatCard icon="📄" label="Recent Reports" value={soilReports.length} detail="Historical records available" />
        <StatCard icon="🧪" label="Recommendations" value="3 Ready" detail="Balanced NPK action plan" />
        <StatCard icon="🛒" label="Active Listings" value={listings.length} detail="Buyer-ready marketplace cards" />
      </div>

      <div className="dashboard-grid">
        <section className="panel">
          <h3>Quick Actions</h3>
          <div className="action-list">
            <Link className="quick-link" to="/soil/upload">
              Upload Soil Report
            </Link>
            <Link className="quick-link" to="/marketplace/add">
              Add Crop Listing
            </Link>
            <Link className="quick-link" to="/schemes">
              Check Government Schemes
            </Link>
            <Link className="quick-link" to="/safety/voice">
              Listen to Safety Voice Guide
            </Link>
          </div>
        </section>

        <section className="panel">
          <h3>Latest Soil Report</h3>
          <div className="report-summary">
            <p>
              <strong>Crop:</strong> {latestReport.crop}
            </p>
            <p>
              <strong>N:</strong> {latestReport.n} | <strong>P:</strong> {latestReport.p} | <strong>K:</strong> {latestReport.k}
            </p>
            <p>
              <strong>Result:</strong> {latestReport.status}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
