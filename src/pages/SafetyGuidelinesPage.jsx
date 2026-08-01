import { useEffect, useMemo, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { safetyCrops } from "../data/safetyData";
import { fetchSafetyGuidelines } from "../services/api";
import SectionHeader from "../components/SectionHeader";
import Loader from "../components/Loader";

const pageCopy = {
  en: {
    eyebrow: "Health & Safety",
    title: "Crop & Pesticide Safety Awareness",
    description:
      "Use crop-wise safety awareness for day-to-day field decisions, or open the chemical library to understand handling, timing, and first aid.",
    cropLabel: "Select Crop",
    chemicalLabel: "Select Chemical",
    cropMode: "Crop Safety",
    chemicalMode: "Chemical Safety",
    cropReady: "Crop awareness ready",
    chemicalReady: "Chemical safety ready",
    cropSeason: "Season",
    riskLabel: "Risk level",
    waitingLabel: "Harvest waiting period",
    reentryLabel: "Field re-entry",
    cropRisks: "Crop risks to watch",
    cropFocus: "Crop safety focus",
    sprayWindow: "Best spray window",
    doList: "What farmers should do",
    dontList: "What to avoid",
    commonChemicalExamples: "Common chemical examples",
    commonChemicalNote: "These are awareness examples for this crop, not final prescription advice.",
    summary: "Chemical summary",
    cropTargets: "Common target crops",
    before: "Before spray",
    during: "During spray",
    after: "After spray",
    firstAid: "Emergency first aid",
    professionalTips: "Professional spray checklist",
    professionalChecklist: [
      "Spray only when wind is low and no rain is expected soon.",
      "Keep a record of date, product, dose, and crop stage after every spray.",
      "Never reuse pesticide containers for water, milk, or food storage."
    ],
    loading: "Preparing safety guidance...",
    cropModeNote:
      "This section is for crop-wise safety awareness. Chemicals shown here are common examples, not final prescription advice.",
    chemicalModeNote:
      "This section explains how to safely handle the selected chemical, independent of a final field prescription.",
  },
  hi: {
    eyebrow: "स्वास्थ्य और सुरक्षा",
    title: "फसल और कीटनाशक सुरक्षा जागरूकता",
    description:
      "रोज़मर्रा के खेत निर्णयों के लिए फसल-आधारित सुरक्षा जानकारी देखें, या रसायन लाइब्रेरी खोलकर दवा की हैंडलिंग, समय और प्राथमिक उपचार समझें।",
    cropLabel: "फसल चुनें",
    chemicalLabel: "रसायन चुनें",
    cropMode: "फसल सुरक्षा",
    chemicalMode: "रसायन सुरक्षा",
    cropReady: "फसल सुरक्षा जानकारी तैयार",
    chemicalReady: "रसायन सुरक्षा जानकारी तैयार",
    cropSeason: "मौसम",
    riskLabel: "जोखिम स्तर",
    waitingLabel: "कटाई से पहले इंतज़ार",
    reentryLabel: "खेत में दोबारा प्रवेश",
    cropRisks: "ध्यान देने वाले जोखिम",
    cropFocus: "फसल सुरक्षा फोकस",
    sprayWindow: "बेहतर स्प्रे समय",
    doList: "क्या करें",
    dontList: "क्या न करें",
    commonChemicalExamples: "सामान्य रसायन उदाहरण",
    commonChemicalNote: "ये इस फसल के लिए जागरूकता उदाहरण हैं, अंतिम दवा सलाह नहीं।",
    summary: "रसायन का सार",
    cropTargets: "उपयोग वाली फसलें",
    before: "छिड़काव से पहले",
    during: "छिड़काव के दौरान",
    after: "छिड़काव के बाद",
    firstAid: "आपातकालीन प्राथमिक उपचार",
    professionalTips: "प्रोफेशनल स्प्रे चेकलिस्ट",
    professionalChecklist: [
      "कम हवा और बिना तुरंत बारिश वाले समय में ही स्प्रे करें।",
      "हर छिड़काव के बाद तारीख, दवा, मात्रा और फसल की अवस्था लिखें।",
      "कीटनाशक के खाली डिब्बों का पानी, दूध या भोजन रखने में उपयोग न करें।"
    ],
    loading: "सुरक्षा मार्गदर्शन तैयार किया जा रहा है...",
    cropModeNote:
      "यह सेक्शन फसल के अनुसार सुरक्षा जागरूकता के लिए है। यहां दिखाए गए रसायन सामान्य उदाहरण हैं, अंतिम दवा और मात्रा के लिए कृषि विशेषज्ञ से सलाह लें।",
    chemicalModeNote:
      "यह सेक्शन चुने गए रसायन की सुरक्षा जानकारी देता है, ताकि किसान दवा को सही तरीके से संभाल सके।"
  }
};

export default function SafetyGuidelinesPage() {
  const { chemicals, language } = useAppContext();
  const lang = language === "hi" ? "hi" : "en";
  const copy = pageCopy[lang];
  const [mode, setMode] = useState("crop");
  const [selectedCropId, setSelectedCropId] = useState(safetyCrops[0].id);
  const [selectedLibraryChemicalId, setSelectedLibraryChemicalId] = useState(chemicals[0]?.id || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchSafetyGuidelines({ crops: safetyCrops, chemicals }).then(() => {
      if (active) {
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [chemicals]);

  const selectedCrop = useMemo(
    () => safetyCrops.find((crop) => crop.id === selectedCropId) || safetyCrops[0],
    [selectedCropId]
  );

  const cropChemicalExamples = useMemo(
    () => chemicals.filter((chemical) => selectedCrop.recommendedChemicalIds.includes(chemical.id)),
    [chemicals, selectedCrop]
  );

  const activeLibraryChemical =
    chemicals.find((chemical) => chemical.id === selectedLibraryChemicalId) || chemicals[0];

  if (loading) {
    return (
      <div className="page-stack">
        <SectionHeader eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
        <Loader message={copy.loading} />
      </div>
    );
  }

  return (
    <div className="page-stack">
      <SectionHeader eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

      <section className="panel safety-shell">
        <div className="safety-mode-switch">
          <button
            type="button"
            className={`safety-mode-tab ${mode === "crop" ? "active" : ""}`}
            onClick={() => setMode("crop")}
          >
            {copy.cropMode}
          </button>
          <button
            type="button"
            className={`safety-mode-tab ${mode === "chemical" ? "active" : ""}`}
            onClick={() => setMode("chemical")}
          >
            {copy.chemicalMode}
          </button>
        </div>

        <div className="provider-note" style={{ marginTop: 0 }}>
          <p>{mode === "crop" ? copy.cropModeNote : copy.chemicalModeNote}</p>
        </div>

        {mode === "crop" ? (
          <>
            <div className="safety-form-grid">
              <label className="form-field">
                <span>{copy.cropLabel}</span>
                <select value={selectedCropId} onChange={(event) => setSelectedCropId(event.target.value)}>
                  {safetyCrops.map((crop) => (
                    <option key={crop.id} value={crop.id}>
                      {crop.name[lang]}
                    </option>
                  ))}
                </select>
              </label>
              <div className="panel safety-mini-card">
                <strong>📅 {copy.cropSeason}</strong>
                <span>{selectedCrop.season[lang]}</span>
              </div>
            </div>

            <div className="safety-hero-card">
              <div>
                <p className="eyebrow">{copy.cropReady}</p>
                <h3>{selectedCrop.icon} {selectedCrop.name[lang]}</h3>
                <p>{selectedCrop.safetyFocus[lang]}</p>
              </div>
              <div className="safety-badges">
                <span className="safety-badge">⚠️ {selectedCrop.commonRisks[lang].length}</span>
                <span className="safety-badge">{selectedCrop.season[lang]}</span>
              </div>
            </div>

            <div className="safety-stat-grid">
              <article className="panel safety-mini-card">
                <strong>🕒 {copy.sprayWindow}</strong>
                <span>{selectedCrop.sprayWindow[lang]}</span>
              </article>
              <article className="panel safety-mini-card">
                <strong>🛡️ {copy.cropFocus}</strong>
                <span>{selectedCrop.safetyFocus[lang]}</span>
              </article>
              <article className="panel safety-mini-card">
                <strong>🧪 {copy.commonChemicalExamples}</strong>
                <span>{cropChemicalExamples.length} {lang === "hi" ? "उदाहरण उपलब्ध" : "examples available"}</span>
              </article>
              <article className="panel safety-mini-card">
                <strong>📋 {copy.cropRisks}</strong>
                <span>{selectedCrop.commonRisks[lang].join(", ")}</span>
              </article>
            </div>

            <div className="safety-info-grid">
              <article className="panel safety-info-card">
                <h3>🐛 {copy.cropRisks}</h3>
                <ul className="bullet-list">
                  {selectedCrop.commonRisks[lang].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="panel safety-info-card">
                <h3>✅ {copy.doList}</h3>
                <ul className="bullet-list">
                  {selectedCrop.doList[lang].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="panel safety-info-card emergency">
                <h3>⛔ {copy.dontList}</h3>
                <ul className="bullet-list">
                  {selectedCrop.dontList[lang].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>

            <section className="panel safety-example-panel">
              <div className="panel-header">
                <h3>🧴 {copy.commonChemicalExamples}</h3>
                <span className="safety-badge">{copy.commonChemicalNote}</span>
              </div>
              <div className="safety-example-grid">
                {cropChemicalExamples.map((chemical) => (
                  <article key={chemical.id} className="safety-chemical-preview">
                    <div className="safety-chemical-preview-top">
                      <h4>{chemical.name}</h4>
                      <span className="safety-badge alert">{chemical.riskLevel[lang]}</span>
                    </div>
                    <p>{chemical.summary[lang]}</p>
                    <div className="safety-preview-meta">
                      <span>🏷️ {chemical.category[lang]}</span>
                      <span>⏳ {chemical.waitingPeriod[lang]}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </>
        ) : (
          <>
            <div className="safety-form-grid">
              <label className="form-field">
                <span>{copy.chemicalLabel}</span>
                <select
                  value={selectedLibraryChemicalId}
                  onChange={(event) => setSelectedLibraryChemicalId(event.target.value)}
                >
                  {chemicals.map((chemical) => (
                    <option key={chemical.id} value={chemical.id}>
                      {chemical.name}
                    </option>
                  ))}
                </select>
              </label>
              <div className="panel safety-mini-card">
                <strong>📚 {copy.chemicalMode}</strong>
                <span>{lang === "hi" ? "रसायन सुरक्षा लाइब्रेरी" : "Chemical safety library"}</span>
              </div>
            </div>

            <div className="safety-hero-card">
              <div>
                <p className="eyebrow">{copy.chemicalReady}</p>
                <h3>🧪 {activeLibraryChemical.name}</h3>
                <p>{activeLibraryChemical.summary[lang]}</p>
              </div>
              <div className="safety-badges">
                <span className="safety-badge">🏷️ {activeLibraryChemical.category[lang]}</span>
                <span className="safety-badge alert">⚠️ {activeLibraryChemical.riskLevel[lang]}</span>
              </div>
            </div>

            <div className="safety-stat-grid">
              <article className="panel safety-mini-card">
                <strong>⏳ {copy.waitingLabel}</strong>
                <span>{activeLibraryChemical.waitingPeriod[lang]}</span>
              </article>
              <article className="panel safety-mini-card">
                <strong>🚜 {copy.reentryLabel}</strong>
                <span>{activeLibraryChemical.reEntry[lang]}</span>
              </article>
              <article className="panel safety-mini-card">
                <strong>⚠️ {copy.riskLabel}</strong>
                <span>{activeLibraryChemical.riskLevel[lang]}</span>
              </article>
              <article className="panel safety-mini-card">
                <strong>🌱 {copy.cropTargets}</strong>
                <span>{activeLibraryChemical.targetCrops[lang].join(", ")}</span>
              </article>
            </div>

            <div className="safety-steps-grid">
              <article className="panel safety-step-card">
                <h3>🧯 {copy.before}</h3>
                <ul className="bullet-list">
                  {activeLibraryChemical.beforeSpray[lang].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="panel safety-step-card">
                <h3>🚜 {copy.during}</h3>
                <ul className="bullet-list">
                  {activeLibraryChemical.duringSpray[lang].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="panel safety-step-card">
                <h3>🧼 {copy.after}</h3>
                <ul className="bullet-list">
                  {activeLibraryChemical.afterSpray[lang].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>

            <div className="safety-info-grid">
              <article className="panel safety-info-card emergency">
                <h3>🏥 {copy.firstAid}</h3>
                <p>{activeLibraryChemical.firstAid[lang]}</p>
              </article>

              <article className="panel safety-info-card">
                <h3>📋 {copy.professionalTips}</h3>
                <ul className="bullet-list">
                  {copy.professionalChecklist.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </>
        )}

      </section>
    </div>
  );
}
