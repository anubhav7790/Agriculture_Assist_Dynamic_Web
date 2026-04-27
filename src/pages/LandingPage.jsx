import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SectionHeader from "../components/SectionHeader";
import Button from "../components/Button";

const features = [
  {
    title: "Soil Health",
    icon: "🌱",
    copy: "Upload NPK data, review soil cards, and get fertilizer recommendations."
  },
  {
    title: "Safety",
    icon: "🛡️",
    copy: "Learn safe pesticide handling, equipment use, and voice-guided precautions."
  },
  {
    title: "Government Schemes",
    icon: "🏛️",
    copy: "Explore support programs, eligibility guidance, and application preparation."
  },
  {
    title: "Marketplace",
    icon: "🛒",
    copy: "List crops and connect directly with buyers without middlemen."
  }
];

export default function LandingPage() {
  const { text } = useAppContext();

  return (
    <div className="landing-page">
      <header className="landing-nav">
        <div className="brand">
          <span className="brand-mark">🌾</span>
          <strong>Krishi Vikas</strong>
        </div>
        <div className="landing-nav-actions">
          <Link to="/login" className="btn btn-secondary">
            Login
          </Link>
          <Link to="/register" className="btn btn-primary">
            Register
          </Link>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Smart Agriculture Platform</p>
          <h1>{text.heroTitle}</h1>
          <p>{text.heroSubtitle}</p>
          <div className="hero-actions">
            <Link to="/register">
              <Button>Start Free</Button>
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Explore Dashboard
            </Link>
          </div>
          <div className="hero-metrics">
            <div>
              <strong>4 Core Modules</strong>
              <span>Advisory + trade in one place</span>
            </div>
            <div>
              <strong>Farmer Friendly</strong>
              <span>Simple cards, clear labels, mobile-first UI</span>
            </div>
          </div>
        </div>

        <div className="hero-panel">
          <div className="floating-card">
            <span>🌿</span>
            <h3>Today's Soil Status</h3>
            <p>pH balanced, potassium moderate, fertilizer advice ready.</p>
          </div>
          <div className="floating-card accent-card">
            <span>📈</span>
            <h3>Direct Selling</h3>
            <p>List crops, share contact, and get connected with buyers faster.</p>
          </div>
        </div>
      </section>

      <section className="feature-section">
        <SectionHeader
          eyebrow="Platform Features"
          title="Built for everyday farm decisions"
          description="Each module is designed to stay simple for first-time digital users while still supporting real agricultural workflows."
        />
        <div className="feature-grid">
          {features.map((feature) => (
            <article key={feature.title} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
