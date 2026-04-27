import { useAppContext } from "../context/AppContext";
import SectionHeader from "../components/SectionHeader";

export default function SoilRecommendationsPage() {
  const { soilReports } = useAppContext();
  const latest = soilReports[0];

  const recommendations = [
    latest.n < 60 ? "Apply nitrogen-rich fertilizer in split doses after irrigation." : "Nitrogen levels are stable. Maintain current schedule.",
    latest.p < 40 ? "Use single super phosphate to strengthen root growth and early crop vigor." : "Phosphorus is in a safe range for current crop cycle.",
    latest.k < 50 ? "Add muriate of potash to improve water regulation and crop quality." : "Potassium is healthy and supports balanced crop growth.",
    latest.ph > 7.5 ? "Add organic matter to reduce alkalinity and improve nutrient absorption." : "Soil pH is suitable for most field crops."
  ];

  return (
    <div className="page-stack">
      <SectionHeader
        eyebrow="Recommendation"
        title="Fertilizer Guidance"
        description="These suggestions are generated from the latest uploaded soil values and can be replaced later with live API analysis."
      />
      <section className="panel">
        <div className="recommendation-list">
          {recommendations.map((item) => (
            <div className="recommendation-item" key={item}>
              <span>✅</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
