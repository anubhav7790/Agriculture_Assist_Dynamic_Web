import { useAppContext } from "../context/AppContext";
import SectionHeader from "../components/SectionHeader";
import Loader from "../components/Loader";

export default function SoilAdvicePage() {
  const { currentSoilReport, soilReports, soilReportsLoading } = useAppContext();
  const latest = currentSoilReport || soilReports[0];

  if (soilReportsLoading) {
    return <Loader message="Loading recommendations..." />;
  }

  if (!latest) {
    return (
      <div className="page-stack">
        <SectionHeader
          eyebrow="Recommendation"
          title="No recommendation available"
          description="Upload a soil report first so recommendations can be generated."
        />
      </div>
    );
  }

  const english = latest.analysis?.english;
  const hindi = latest.analysis?.hindi;
  const fallbackRecommendations = latest.recommendations || [];

  return (
    <div className="page-stack">
      <SectionHeader
        eyebrow="Recommendation"
        title="Detailed Soil Analysis"
        description="The analysis explains what is right, what needs attention, and what action you can take next in both English and Hindi."
      />
      <section className="panel">
        <div className="stats-row">
          <div className="stat-card">
            <span>Crop</span>
            <strong>{latest.crop}</strong>
          </div>
          <div className="stat-card">
            <span>Status</span>
            <strong>{latest.status}</strong>
          </div>
          <div className="stat-card">
            <span>pH</span>
            <strong>{latest.ph}</strong>
          </div>
        </div>
      </section>

      {english ? (
        <section className="panel">
          <SectionHeader
            eyebrow="English"
            title="English Analysis"
            description={english.summary}
          />
          <div className="recommendation-list">
            {english.whatIsGood?.map((item, index) => (
              <div className="recommendation-item" key={`en-good-${index}`}>
                <span>Good</span>
                <p>{item}</p>
              </div>
            ))}
            {english.whatIsWrong?.map((item, index) => (
              <div className="recommendation-item" key={`en-wrong-${index}`}>
                <span>Issue</span>
                <p>{item}</p>
              </div>
            ))}
            {english.recommendations?.map((item, index) => (
              <div className="recommendation-item" key={`en-rec-${index}`}>
                <span>Do</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {hindi ? (
        <section className="panel">
          <SectionHeader
            eyebrow="Hindi"
            title="Hindi Analysis"
            description={hindi.summary}
          />
          <div className="recommendation-list">
            {hindi.whatIsGood?.map((item, index) => (
              <div className="recommendation-item" key={`hi-good-${index}`}>
                <span>Achha</span>
                <p>{item}</p>
              </div>
            ))}
            {hindi.whatIsWrong?.map((item, index) => (
              <div className="recommendation-item" key={`hi-wrong-${index}`}>
                <span>Dhyan</span>
                <p>{item}</p>
              </div>
            ))}
            {hindi.recommendations?.map((item, index) => (
              <div className="recommendation-item" key={`hi-rec-${index}`}>
                <span>Karen</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {!english && !hindi && fallbackRecommendations.length ? (
        <section className="panel">
          <SectionHeader
            eyebrow="Recommendation"
            title="Basic Suggestions"
            description="Fallback suggestions are shown when AI analysis is not available."
          />
          <div className="recommendation-list">
            {fallbackRecommendations.map((item, index) => (
              <div className="recommendation-item" key={`fallback-${index}`}>
                <span>Tip</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
