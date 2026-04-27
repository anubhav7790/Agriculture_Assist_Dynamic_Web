import { useAppContext } from "../context/AppContext";
import SectionHeader from "../components/SectionHeader";
import Loader from "../components/Loader";

export default function SoilHistoryPage() {
  const { soilReports, soilReportsLoading } = useAppContext();

  if (soilReportsLoading) {
    return <Loader message="Loading soil history..." />;
  }

  return (
    <div className="page-stack">
      <SectionHeader
        eyebrow="History"
        title="Previous Soil Reports"
        description="Review old records to spot nutrient trends and crop planning improvements over time."
      />
      <section className="panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Crop</th>
                <th>N</th>
                <th>P</th>
                <th>K</th>
                <th>pH</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {soilReports.map((report) => (
                <tr key={report.id}>
                  <td>{new Date(report.date).toLocaleDateString("en-IN")}</td>
                  <td>{report.crop}</td>
                  <td>{report.n}</td>
                  <td>{report.p}</td>
                  <td>{report.k}</td>
                  <td>{report.ph}</td>
                  <td>{report.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
