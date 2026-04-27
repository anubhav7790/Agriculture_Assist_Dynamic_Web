import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SectionHeader from "../components/SectionHeader";
import Button from "../components/Button";

const featuresByLanguage = {
  en: [
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
  ],
  hi: [
    {
      title: "मिट्टी स्वास्थ्य",
      icon: "🌱",
      copy: "NPK डेटा अपलोड करें, मिट्टी कार्ड देखें, और खाद की सिफारिश पाएं।"
    },
    {
      title: "सुरक्षा",
      icon: "🛡️",
      copy: "कीटनाशक सुरक्षा, उपकरण उपयोग, और आवाज़ आधारित मार्गदर्शन प्राप्त करें।"
    },
    {
      title: "सरकारी योजनाएं",
      icon: "🏛️",
      copy: "सहायता योजनाएं, पात्रता जानकारी, और आवेदन मार्गदर्शन देखें।"
    },
    {
      title: "मार्केटप्लेस",
      icon: "🛒",
      copy: "बिना बिचौलियों के फसल सूची बनाएं और खरीदारों से सीधे जुड़ें।"
    }
  ]
};

const labels = {
  en: {
    login: "Login",
    register: "Register",
    start: "Start Free",
    explore: "Explore Dashboard",
    eyebrow: "Platform Features",
    title: "Built for everyday farm decisions",
    description:
      "Each module is designed to stay simple for first-time digital users while still supporting real agricultural workflows.",
    soilTitle: "Today's Soil Status",
    soilCopy: "pH balanced, potassium moderate, fertilizer advice ready.",
    sellTitle: "Direct Selling",
    sellCopy: "List crops, share contact, and get connected with buyers faster.",
    metrics: [
      { title: "4 Core Modules", copy: "Advisory and trade in one place" },
      { title: "Farmer Friendly", copy: "Simple cards, clear labels, mobile-first UI" }
    ]
  },
  hi: {
    login: "लॉगिन",
    register: "रजिस्टर",
    start: "शुरू करें",
    explore: "डैशबोर्ड देखें",
    eyebrow: "प्लेटफ़ॉर्म फीचर्स",
    title: "रोज़मर्रा के कृषि निर्णयों के लिए तैयार",
    description:
      "हर मॉड्यूल को पहली बार डिजिटल उपयोग करने वाले किसानों के लिए आसान और वास्तविक कृषि कामों के लिए उपयोगी बनाया गया है।",
    soilTitle: "आज की मिट्टी स्थिति",
    soilCopy: "pH संतुलित है, पोटाश मध्यम है, और खाद की सलाह तैयार है।",
    sellTitle: "सीधी बिक्री",
    sellCopy: "फसल सूची बनाइए, संपर्क साझा कीजिए, और खरीदारों से सीधे जुड़िए।",
    metrics: [
      { title: "4 मुख्य मॉड्यूल", copy: "सलाह और बिक्री एक ही प्लेटफ़ॉर्म पर" },
      { title: "किसान अनुकूल", copy: "सरल कार्ड, साफ़ नेविगेशन, मोबाइल फ्रेंडली अनुभव" }
    ]
  }
};

export default function LandingHomePage() {
  const { language, setLanguage, text } = useAppContext();
  const currentLabels = labels[language];
  const features = featuresByLanguage[language];

  return (
    <div className="landing-page">
      <header className="landing-nav">
        <div className="landing-nav-left">
          <button
            type="button"
            className="language-slider"
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            aria-label="Toggle English and Hindi"
          >
            <span className={`language-slider-pill ${language === "hi" ? "is-hindi" : ""}`}>
              <span className="slider-option">EN</span>
              <span className="slider-option">हिं</span>
            </span>
          </button>

          <div className="brand">
            <span className="brand-mark">🌾</span>
            <strong>Krishi Vikas</strong>
          </div>
        </div>

        <div className="landing-nav-actions">
          <Link to="/login" className="btn btn-secondary">
            {currentLabels.login}
          </Link>
          <Link to="/register" className="btn btn-primary">
            {currentLabels.register}
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
              <Button>{currentLabels.start}</Button>
            </Link>
            <Link to="/login" className="btn btn-secondary">
              {currentLabels.explore}
            </Link>
          </div>
          <div className="hero-metrics">
            {currentLabels.metrics.map((metric) => (
              <div key={metric.title}>
                <strong>{metric.title}</strong>
                <span>{metric.copy}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-panel">
          <div className="floating-card">
            <span>🌿</span>
            <h3>{currentLabels.soilTitle}</h3>
            <p>{currentLabels.soilCopy}</p>
          </div>
          <div className="floating-card accent-card">
            <span>📈</span>
            <h3>{currentLabels.sellTitle}</h3>
            <p>{currentLabels.sellCopy}</p>
          </div>
        </div>
      </section>

      <section className="feature-section">
        <SectionHeader
          eyebrow={currentLabels.eyebrow}
          title={currentLabels.title}
          description={currentLabels.description}
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
