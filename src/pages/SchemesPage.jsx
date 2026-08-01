import { useEffect, useMemo, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { fetchSchemes } from "../services/api";
import SectionHeader from "../components/SectionHeader";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";

const pageCopy = {
  en: {
    eyebrow: "Government Support",
    title: "Government Schemes",
    description: "Search support programs, review eligibility, check required documents, and apply directly to official government portals.",
    placeholder: "Search schemes, states, benefits or eligibility...",
    benefitLabel: "Benefit",
    eligibilityLabel: "Eligibility",
    documentsLabel: "Documents Required",
    guideLabel: "Application Guide",
    applyLabel: "Apply on Official Portal ↗",
    loading: "Loading schemes..."
  },
  hi: {
    eyebrow: "सरकारी सहायता",
    title: "सरकारी योजनाएँ",
    description: "सहायता कार्यक्रमों की खोज करें, पात्रता की समीक्षा करें, आवश्यक दस्तावेजों की जांच करें, और सीधे आधिकारिक सरकारी पोर्टलों पर आवेदन करें।",
    placeholder: "योजनाएँ, राज्य, लाभ या पात्रता खोजें...",
    benefitLabel: "लाभ",
    eligibilityLabel: "पात्रता",
    documentsLabel: "आवश्यक दस्तावेज़",
    guideLabel: "आवेदन गाइड",
    applyLabel: "आधिकारिक पोर्टल पर आवेदन करें ↗",
    loading: "योजनाएँ लोड की जा रही हैं..."
  }
};

export default function SchemesPage() {
  const { schemes, language } = useAppContext();
  const lang = language === "hi" ? "hi" : "en";
  const copy = pageCopy[lang];
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchSchemes(schemes).then(() => {
      if (active) {
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [schemes]);

  const filteredSchemes = useMemo(
    () =>
      schemes.filter((scheme) => {
        const name = scheme.name?.[lang] || scheme.name?.en || "";
        const state = scheme.state?.[lang] || scheme.state?.en || "";
        const eligibility = scheme.eligibility?.[lang] || scheme.eligibility?.en || "";
        const benefit = scheme.benefit?.[lang] || scheme.benefit?.en || "";
        const guide = scheme.guide?.[lang] || scheme.guide?.en || "";
        return `${name} ${state} ${eligibility} ${benefit} ${guide}`
          .toLowerCase()
          .includes(search.toLowerCase());
      }),
    [schemes, search, lang]
  );

  return (
    <div className="page-stack">
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />
      <SearchBar
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder={copy.placeholder}
      />
      {loading ? (
        <Loader message={copy.loading} />
      ) : (
        <div className="scheme-grid">
          {filteredSchemes.map((scheme) => {
            const name = scheme.name?.[lang] || scheme.name?.en || "";
            const state = scheme.state?.[lang] || scheme.state?.en || "";
            const benefit = scheme.benefit?.[lang] || scheme.benefit?.en || "";
            const eligibility = scheme.eligibility?.[lang] || scheme.eligibility?.en || "";
            const documents = scheme.documents?.[lang] || scheme.documents?.en || [];
            const guide = scheme.guide?.[lang] || scheme.guide?.en || "";

            return (
              <article className="panel scheme-card" key={scheme.id}>
                <div className="scheme-card-header">
                  <h3>{name}</h3>
                  <span className="scheme-state">{state}</span>
                </div>
                
                <div className="scheme-card-body">
                  <div className="scheme-section">
                    <strong>💡 {copy.benefitLabel}:</strong>
                    <p>{benefit}</p>
                  </div>
                  
                  <div className="scheme-section">
                    <strong>🎯 {copy.eligibilityLabel}:</strong>
                    <p>{eligibility}</p>
                  </div>
                  
                  {documents.length > 0 && (
                    <div className="scheme-section">
                      <strong>📄 {copy.documentsLabel}:</strong>
                      <div className="scheme-docs-container">
                        {documents.map((doc, idx) => (
                          <span className="scheme-doc-tag" key={idx}>
                            {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="scheme-section">
                    <strong>📋 {copy.guideLabel}:</strong>
                    <p>{guide}</p>
                  </div>
                </div>

                <div className="scheme-card-action">
                  <a
                    href={scheme.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary scheme-apply-btn"
                  >
                    {copy.applyLabel}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
