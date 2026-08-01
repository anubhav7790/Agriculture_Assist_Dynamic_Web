import { useMemo, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { safetyCrops } from "../data/safetyData";
import SectionHeader from "../components/SectionHeader";
import Button from "../components/Button";

const pageCopy = {
  en: {
    eyebrow: "Voice Assist",
    title: "Voice Safety Guidance",
    description:
      "Play spoken safety reminders in English or Hindi for farmers who prefer listening over reading.",
    cropLabel: "Select Crop",
    chemicalLabel: "Select Chemical",
    play: "Play Voice Guidance",
    stop: "Stop Audio",
    preview: "Voice preview",
    started: "Voice guidance started",
    stopped: "Voice guidance stopped",
    unsupported: "Speech API not supported on this device"
  },
  hi: {
    eyebrow: "वॉइस सहायता",
    title: "वॉइस सुरक्षा मार्गदर्शन",
    description:
      "ऐसे किसानों के लिए अंग्रेज़ी या हिंदी में बोली जाने वाली सुरक्षा सलाह चलाएँ जो पढ़ने के बजाय सुनना पसंद करते हैं।",
    cropLabel: "फसल चुनें",
    chemicalLabel: "रसायन चुनें",
    play: "वॉइस मार्गदर्शन चलाएँ",
    stop: "ऑडियो बंद करें",
    preview: "वॉइस प्रीव्यू",
    started: "वॉइस मार्गदर्शन शुरू हो गया",
    stopped: "वॉइस मार्गदर्शन बंद किया गया",
    unsupported: "इस डिवाइस पर Speech API उपलब्ध नहीं है"
  }
};

function buildVoiceMessage(crop, chemical, lang) {
  const cropName = crop.name[lang];
  const summary = chemical.summary[lang];
  const before = chemical.beforeSpray[lang][0];
  const during = chemical.duringSpray[lang][0];
  const after = chemical.afterSpray[lang][0];
  const firstAid = chemical.firstAid[lang];

  if (lang === "hi") {
    return `${cropName} के लिए ${chemical.name} उपयोग करते समय ध्यान दें। ${summary} छिड़काव से पहले: ${before} छिड़काव के दौरान: ${during} छिड़काव के बाद: ${after} आपात स्थिति में: ${firstAid}`;
  }

  return `For ${cropName}, while using ${chemical.name}, remember this. ${summary} Before spray: ${before} During spray: ${during} After spray: ${after} Emergency advice: ${firstAid}`;
}

export default function VoiceInstructionsPage() {
  const { chemicals, language, showToast } = useAppContext();
  const lang = language === "hi" ? "hi" : "en";
  const copy = pageCopy[lang];
  const [selectedCropId, setSelectedCropId] = useState(safetyCrops[0].id);
  const [selectedChemicalId, setSelectedChemicalId] = useState(chemicals[0]?.id || "");

  const selectedCrop = safetyCrops.find((crop) => crop.id === selectedCropId) || safetyCrops[0];
  const availableChemicals = chemicals.filter((chemical) =>
    selectedCrop.recommendedChemicalIds.includes(chemical.id)
  );
  const activeChemical =
    availableChemicals.find((chemical) => chemical.id === selectedChemicalId) || availableChemicals[0];

  const message = useMemo(() => {
    if (!activeChemical) {
      return "";
    }
    return buildVoiceMessage(selectedCrop, activeChemical, lang);
  }, [activeChemical, lang, selectedCrop]);

  const playVoice = () => {
    if (!("speechSynthesis" in window)) {
      showToast(copy.unsupported, "error");
      return;
    }

    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = lang === "hi" ? "hi-IN" : "en-IN";
    speech.rate = 0.95;
    window.speechSynthesis.speak(speech);
    showToast(copy.started, "info");
  };

  const stopVoice = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      showToast(copy.stopped, "info");
    }
  };

  return (
    <div className="page-stack">
      <SectionHeader eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
      <section className="panel voice-panel voice-shell">
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
          <label className="form-field">
            <span>{copy.chemicalLabel}</span>
            <select value={activeChemical?.id || ""} onChange={(event) => setSelectedChemicalId(event.target.value)}>
              {availableChemicals.map((chemical) => (
                <option key={chemical.id} value={chemical.id}>
                  {chemical.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="voice-preview-card">
          <h3>{copy.preview}</h3>
          <p>{message}</p>
        </div>

        <div className="hero-actions">
          <Button onClick={playVoice}>{copy.play}</Button>
          <button type="button" className="btn btn-secondary" onClick={stopVoice}>
            {copy.stop}
          </button>
        </div>
      </section>
    </div>
  );
}
