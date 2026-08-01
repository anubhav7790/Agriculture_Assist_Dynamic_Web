import { useCallback, useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const MODEL = "gemini-2.5-flash";

const NUTRIENT_CONFIG = {
  Low: { label: "Deficient", labelHindi: "कमी", bg: "rgba(239, 68, 68, 0.08)", color: "#EF4444", bar: "#EF4444" },
  Adequate: { label: "Adequate", labelHindi: "पर्याप्त", bg: "rgba(34, 197, 94, 0.08)", color: "#22C55E", bar: "#22C55E" },
  High: { label: "Excess", labelHindi: "अधिकता", bg: "rgba(245, 158, 11, 0.08)", color: "#F59E0B", bar: "#EAB308" }
};

const HEALTH_COLORS = {
  Poor: "#EF4444",
  Fair: "#F59E0B",
  Good: "#22C55E",
  Excellent: "#10B981"
};

const NUTRIENT_TRANSLATIONS = {
  "Nitrogen (N)": "नाइट्रोजन (N)",
  "Phosphorus (P)": "फॉस्फोरस (P)",
  "Potassium (K)": "पोटाश (K)",
  "Organic Matter": "जैविक पदार्थ",
  "pH Balance": "pH संतुलन",
  "Iron (Fe)": "लोहा (Fe)",
  "Zinc (Zn)": "जस्ता (Zn)",
  "Magnesium (Mg)": "मैग्नीशियम (Mg)"
};

const HEALTH_TRANSLATIONS = {
  Poor: "कमज़ोर",
  Fair: "सामान्य",
  Good: "अच्छा",
  Excellent: "उत्कृष्ट"
};

const SEASON_TRANSLATIONS = {
  "Kharif": "खरीफ",
  "Rabi": "रबी",
  "Zaid": "जायद",
  "Year-round": "वर्षभर",
  "Kharif / Rabi": "खरीफ / रबी",
  "Rabi / Kharif": "रबी / खरीफ"
};

const SOIL_TYPE_TRANSLATIONS = {
  "Clay loam": "दोमट मिट्टी",
  "Sandy soil": "बलुई मिट्टी",
  "Loamy soil": "दोमट मिट्टी",
  "Sandy loam": "बलुई दोमट मिट्टी",
  "Clay soil": "चिकनी मिट्टी",
  "Silt loam": "महीन दोमट मिट्टी"
};

const pageCopy = {
  en: {
    eyebrow: "Soil Analysis",
    title: "Soil Nutrient Analyzer",
    description: "Upload a soil photo to detect nutrient deficiencies and excesses",
    uploadTitle: "Upload Soil Image",
    uploadSubtitle: "Drag and drop or click - JPG, PNG, WEBP",
    loadingReading: "Reading image...",
    loadingAnalyzing: "Gemini is analyzing your soil...",
    tryAgain: "Try Again",
    analyzeAnother: "Analyze Another Image",
    nutrientLevels: "Nutrient Levels",
    recommendations: "Recommendations",
    suitableCrops: "Suitable Crops",
    avoidCrops: "Crops to Avoid",
    season: "Season",
    yield: "Yield",
    deficient: "Deficient",
    excess: "Excess",
    adequate: "Adequate"
  },
  hi: {
    eyebrow: "मिट्टी विश्लेषण",
    title: "मृदा पोषक तत्व विश्लेषक",
    description: "पोषक तत्वों की कमी और अधिकता का पता लगाने के लिए मिट्टी की तस्वीर अपलोड करें",
    uploadTitle: "मिट्टी की फोटो अपलोड करें",
    uploadSubtitle: "ड्रैग और ड्रॉप करें या क्लिक करें - JPG, PNG, WEBP",
    loadingReading: "तस्वीर पढ़ी जा रही है...",
    loadingAnalyzing: "Gemini आपकी मिट्टी का विश्लेषण कर रहा है...",
    tryAgain: "दोबारा प्रयास करें",
    analyzeAnother: "दूसरी तस्वीर का विश्लेषण करें",
    nutrientLevels: "पोषक तत्व स्तर",
    recommendations: "सुझाव (अनुशंसाएँ)",
    suitableCrops: "उपयुक्त फसलें",
    avoidCrops: "फसलें जिनसे बचें",
    season: "मौसम",
    yield: "पैदावार",
    deficient: "कमी",
    excess: "अधिकता",
    adequate: "पर्याप्त"
  }
};

const PROMPT = `You are an expert soil scientist and agronomist. Analyze this soil image carefully.

Look at soil color, texture, structure, moisture, and visible characteristics to predict nutrient status.

Respond ONLY in valid JSON with this exact structure (no markdown, no extra text):
{
  "soilType": "e.g. Clay loam",
  "soilTypeHindi": "मृदा का प्रकार (e.g. बलुई दोमट मिट्टी)",
  "color": "e.g. Dark brown",
  "colorHindi": "रंग (e.g. गहरा भूरा)",
  "overallHealth": "Poor | Fair | Good | Excellent",
  "summary": "2-3 sentence summary of observations and likely nutritional status in English",
  "summaryHindi": "2-3 sentence summary of observations and likely nutritional status in Hindi",
  "nutrients": [
    {"name": "Nitrogen (N)", "level": 50, "status": "Low|Adequate|High", "note": "short English note", "noteHindi": "short Hindi note"},
    {"name": "Phosphorus (P)", "level": 50, "status": "Low|Adequate|High", "note": "short English note", "noteHindi": "short Hindi note"},
    {"name": "Potassium (K)", "level": 50, "status": "Low|Adequate|High", "note": "short English note", "noteHindi": "short Hindi note"},
    {"name": "Organic Matter", "level": 50, "status": "Low|Adequate|High", "note": "short English note", "noteHindi": "short Hindi note"},
    {"name": "pH Balance", "level": 50, "status": "Low|Adequate|High", "note": "acidic/neutral/alkaline in English", "noteHindi": "acidic/neutral/alkaline in Hindi"},
    {"name": "Iron (Fe)", "level": 50, "status": "Low|Adequate|High", "note": "short English note", "noteHindi": "short Hindi note"},
    {"name": "Zinc (Zn)", "level": 50, "status": "Low|Adequate|High", "note": "short English note", "noteHindi": "short Hindi note"},
    {"name": "Magnesium (Mg)", "level": 50, "status": "Low|Adequate|High", "note": "short English note", "noteHindi": "short Hindi note"}
  ],
  "recommendations": [
    "Actionable recommendation 1 in English",
    "Actionable recommendation 2 in English",
    "Actionable recommendation 3 in English",
    "Actionable recommendation 4 in English"
  ],
  "recommendationsHindi": [
    "Actionable recommendation 1 in Hindi",
    "Actionable recommendation 2 in Hindi",
    "Actionable recommendation 3 in Hindi",
    "Actionable recommendation 4 in Hindi"
  ],
  "suitableCrops": [
    {
      "name": "Crop name in English",
      "nameHindi": "फसल का नाम (Hindi)",
      "emoji": "single relevant emoji",
      "season": "e.g. Kharif / Rabi / Year-round",
      "seasonHindi": "मौसम (e.g. खरीफ / रबी)",
      "yield": "e.g. 3-4 tonnes/hectare",
      "yieldHindi": "पैदावार (e.g. 3-4 टन/हेक्टेयर)",
      "why": "One sentence why this soil suits this crop in English",
      "whyHindi": "One sentence why this soil suits this crop in Hindi",
      "tip": "One practical growing tip in English",
      "tipHindi": "One practical growing tip in Hindi"
    }
  ],
  "avoidCrops": [
    {
      "name": "Crop name in English",
      "nameHindi": "फसल का नाम (Hindi)",
      "emoji": "single relevant emoji",
      "reason": "One sentence why this crop would struggle in this soil in English",
      "reasonHindi": "One sentence why this crop would struggle in this soil in Hindi"
    }
  ]
}`;

function UploadZone({ onFile, copy }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      setDragging(false);
      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        onFile(file);
      }
    },
    [onFile]
  );

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      style={{
        border: `2px dashed ${dragging ? "var(--primary)" : "var(--border)"}`,
        borderRadius: 20,
        padding: "4rem 2rem",
        textAlign: "center",
        cursor: "pointer",
        background: dragging ? "var(--primary-soft)" : "var(--surface)",
        boxShadow: "var(--shadow-sm)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "var(--shadow)";
        e.currentTarget.style.borderColor = "var(--primary)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "var(--shadow-sm)";
        e.currentTarget.style.borderColor = dragging ? "var(--primary)" : "var(--border)";
      }}
    >
      <div style={{ fontSize: 54, marginBottom: 16, filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.08))" }}>🌱</div>
      <p
        style={{
          fontSize: 20,
          fontWeight: 700,
          margin: "0 0 8px",
          color: "var(--text)"
        }}
      >
        {copy.uploadTitle}
      </p>
      <p style={{ fontSize: 14.5, color: "var(--muted)", margin: 0 }}>
        {copy.uploadSubtitle}
      </p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(event) => event.target.files[0] && onFile(event.target.files[0])}
      />
    </div>
  );
}

function NutrientBar({ nutrient, lang }) {
  const config = NUTRIENT_CONFIG[nutrient.status] || NUTRIENT_CONFIG.Adequate;
  const labelText = lang === "hi" ? config.labelHindi : config.label;
  const displayName = lang === "hi" ? NUTRIENT_TRANSLATIONS[nutrient.name] || nutrient.name : nutrient.name;

  return (
    <div style={{ marginBottom: 14 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{displayName}</span>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: 99,
            background: config.bg,
            color: config.color,
            letterSpacing: "0.04em",
            textTransform: "uppercase"
          }}
        >
          {labelText}
        </span>
      </div>
      <div style={{ height: 8, borderRadius: 99, background: "var(--border)", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            borderRadius: 99,
            width: `${nutrient.level}%`,
            background: config.bar,
            transition: "width 0.8s ease"
          }}
        />
      </div>
      <p style={{ fontSize: 12, color: "var(--muted)", margin: "3px 0 0" }}>
        {lang === "hi" ? nutrient.noteHindi || nutrient.note : nutrient.note}
      </p>
    </div>
  );
}

function Results({ result, onReset, lang, copy, preview }) {
  const low = result.nutrients.filter((nutrient) => nutrient.status === "Low");
  const high = result.nutrients.filter((nutrient) => nutrient.status === "High");

  const recommendationsList = lang === "hi" ? result.recommendationsHindi || result.recommendations : result.recommendations;
  const displayHealth = lang === "hi" ? HEALTH_TRANSLATIONS[result.overallHealth] || result.overallHealth : result.overallHealth;
  const soilTypeText = lang === "hi" ? result.soilTypeHindi || SOIL_TYPE_TRANSLATIONS[result.soilType] || result.soilType : result.soilType;
  const colorText = lang === "hi" ? result.colorHindi || result.color : result.color;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginTop: "1.5rem" }}>
      
      {/* ROW 1: Soil Image (Left) & Overall Status + Count Badges (Right) */}
      <div style={{
        display: "flex",
        flexDirection: "row",
        gap: "2rem",
        flexWrap: "wrap",
        alignItems: "stretch"
      }}>
        {preview && (
          <div style={{ flex: "1 1 350px", minWidth: "320px", display: "flex" }}>
            <img
              src={preview}
              alt="Analyzed soil"
              style={{
                width: "100%",
                maxHeight: "320px",
                objectFit: "cover",
                borderRadius: 20,
                boxShadow: "var(--shadow-sm)",
                border: "1px solid var(--border)"
              }}
            />
          </div>
        )}

        {/* Overall Status & Health Column */}
        <div style={{
          flex: "1.2 1 450px",
          minWidth: "320px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "1rem"
        }}>
          {/* Overall Health Card */}
          <div
            style={{
              background: "linear-gradient(135deg, var(--primary-hover), var(--primary))",
              borderRadius: 20,
              padding: "1.75rem 2rem",
              color: "#fff",
              boxShadow: "var(--shadow)",
              position: "relative",
              overflow: "hidden",
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <div style={{
              position: "absolute",
              top: "-20px",
              right: "-20px",
              width: "120px",
              height: "120px",
              background: "rgba(255,255,255,0.06)",
              borderRadius: "50%"
            }} />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 12
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 22,
                    fontWeight: 700,
                    margin: "0 0 4px",
                    lineHeight: 1.2
                  }}
                >
                  {soilTypeText}
                </p>
                <p style={{ fontSize: 14, color: "rgba(255, 255, 255, 0.75)", margin: 0 }}>
                  {colorText}
                </p>
              </div>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  padding: "6px 16px",
                  borderRadius: 99,
                  background: "#ffffff26",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em"
                }}
              >
                {displayHealth}
              </span>
            </div>
            <p style={{ fontSize: 14.5, color: "rgba(255, 255, 255, 0.9)", lineHeight: 1.6, margin: 0 }}>
              {lang === "hi" ? result.summaryHindi || result.summary : result.summary}
            </p>
          </div>

          {/* Count Stats Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {[
              { label: copy.deficient, count: low.length, color: "#EF4444", bg: "rgba(239, 68, 68, 0.08)" },
              { label: copy.excess, count: high.length, color: "#F59E0B", bg: "rgba(245, 158, 11, 0.08)" },
              {
                label: copy.adequate,
                count: result.nutrients.filter((n) => n.status === "Adequate").length,
                color: "#22C55E",
                bg: "rgba(34, 197, 94, 0.08)"
              }
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: stat.bg,
                  borderRadius: 16,
                  padding: "12px 10px",
                  textAlign: "center",
                  border: `1px solid ${stat.color}15`
                }}
              >
                <p style={{ fontSize: 24, fontWeight: 800, color: stat.color, margin: "0 0 2px" }}>{stat.count}</p>
                <p style={{ fontSize: 11.5, fontWeight: 600, color: "var(--text-soft)", margin: 0 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 2: Nutrient Levels (Left) & Recommendations (Right) */}
      <div style={{
        display: "flex",
        flexDirection: "row",
        gap: "2rem",
        flexWrap: "wrap",
        alignItems: "stretch"
      }}>
        {/* Nutrient Levels Card */}
        <div style={{
          flex: "1.2 1 450px",
          minWidth: "320px",
          background: "var(--surface-strong)",
          border: "1px solid var(--border)",
          borderRadius: 20,
          padding: "2rem",
          boxShadow: "var(--shadow-sm)",
          display: "flex",
          flexDirection: "column"
        }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              margin: "0 0 20px"
            }}
          >
            {copy.nutrientLevels}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.2rem 1.5rem", flexGrow: 1 }}>
            {result.nutrients.map((nutrient) => (
              <NutrientBar key={nutrient.name} nutrient={nutrient} lang={lang} />
            ))}
          </div>
        </div>

        {/* Recommendations Card */}
        <div style={{
          flex: "1 1 380px",
          minWidth: "320px",
          background: "var(--primary-soft)",
          border: "1px solid var(--border)",
          borderRadius: 20,
          padding: "2rem",
          boxShadow: "var(--shadow-sm)"
        }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "var(--primary)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              margin: "0 0 16px"
            }}
          >
            {copy.recommendations}
          </p>
          {recommendationsList && recommendationsList.map((recommendation, index) => (
            <div key={index} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>🌿</span>
              <p style={{ fontSize: 14.5, color: "var(--text)", margin: 0, lineHeight: 1.5 }}>{recommendation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ROW 3: Suitable Crops (Left, 60%) & Crops to Avoid (Right, 40%) */}
      <div style={{
        display: "flex",
        flexDirection: "row",
        gap: "2rem",
        flexWrap: "wrap",
        alignItems: "stretch"
      }}>
        {/* Suitable Crops Column */}
        {result.suitableCrops?.length > 0 && (
          <div style={{ flex: "1.5 1 500px", minWidth: "320px" }}>
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "var(--primary)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                margin: "0 0 14px",
                paddingLeft: "0.5rem"
              }}
            >
              {copy.suitableCrops}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
              {result.suitableCrops.map((crop, index) => (
                <div
                  key={index}
                  style={{
                    background: "var(--surface-strong)",
                    border: "1px solid var(--border)",
                    borderRadius: 20,
                    padding: "1.5rem",
                    boxShadow: "var(--shadow-sm)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                      <span style={{ fontSize: 32 }}>{crop.emoji || "🌾"}</span>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", margin: 0 }}>
                          {lang === "hi" ? crop.nameHindi || crop.name : crop.name}
                        </p>
                        <div style={{ display: "flex", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
                          {(crop.season || crop.seasonHindi) && (
                            <span
                              style={{
                                fontSize: 10,
                                padding: "2px 8px",
                                borderRadius: 99,
                                background: "var(--primary-soft)",
                                color: "var(--primary)",
                                fontWeight: 600
                              }}
                            >
                              {copy.season}: {lang === "hi" ? crop.seasonHindi || SEASON_TRANSLATIONS[crop.season] || crop.season : crop.season}
                            </span>
                          )}
                          {(crop.yield || crop.yieldHindi) && (
                            <span
                              style={{
                                fontSize: 10,
                                padding: "2px 8px",
                                borderRadius: 99,
                                background: "rgba(16, 163, 74, 0.1)",
                                color: "var(--success)",
                                fontWeight: 600
                              }}
                            >
                              {copy.yield}: {lang === "hi" ? crop.yieldHindi || crop.yield : crop.yield}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {(crop.why || crop.whyHindi) && (
                      <p style={{ fontSize: 13.5, color: "var(--text-soft)", margin: "0 0 10px", lineHeight: 1.5 }}>
                        {lang === "hi" ? crop.whyHindi || crop.why : crop.why}
                      </p>
                    )}
                  </div>
                  {(crop.tip || crop.tipHindi) && (
                    <p style={{ fontSize: 13, color: "var(--primary)", margin: 0, lineHeight: 1.5, fontStyle: "italic", borderTop: "1px dashed var(--border)", paddingTop: "8px" }}>
                      💡 {lang === "hi" ? crop.tipHindi || crop.tip : crop.tip}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Crops to Avoid Column */}
        {result.avoidCrops?.length > 0 && (
          <div style={{ flex: "1 1 350px", minWidth: "320px" }}>
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "var(--danger)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                margin: "0 0 14px",
                paddingLeft: "0.5rem"
              }}
            >
              {copy.avoidCrops}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {result.avoidCrops.map((crop, index) => (
                <div
                  key={index}
                  style={{
                    background: "var(--surface-strong)",
                    border: "1px solid rgba(220, 38, 38, 0.2)",
                    borderRadius: 20,
                    padding: "1.5rem",
                    boxShadow: "var(--shadow-sm)",
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                    flexGrow: 1
                  }}
                >
                  <span style={{ fontSize: 26, flexShrink: 0 }}>{crop.emoji || "🚫"}</span>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: "var(--danger)", margin: "0 0 4px" }}>
                      {lang === "hi" ? crop.nameHindi || crop.name : crop.name}
                    </p>
                    <p style={{ fontSize: 13.5, color: "var(--text-soft)", margin: 0, lineHeight: 1.5 }}>
                      {lang === "hi" ? crop.reasonHindi || crop.reason : crop.reason}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Center aligned Reset Button */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
        <button
          onClick={onReset}
          style={{
            padding: "14px 40px",
            borderRadius: 14,
            border: "1.5px solid var(--border)",
            background: "var(--surface)",
            cursor: "pointer",
            fontSize: 15,
            fontWeight: 600,
            color: "var(--text)",
            transition: "all 0.2s ease",
            boxShadow: "var(--shadow-sm)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--primary-soft)";
            e.currentTarget.style.borderColor = "var(--primary)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--surface)";
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {copy.analyzeAnother}
        </button>
      </div>

    </div>
  );
}

export default function SoilUploadPage() {
  const { language } = useAppContext();
  const lang = language === "hi" ? "hi" : "en";
  const copy = pageCopy[lang];

  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
  const model = import.meta.env.VITE_GEMINI_MODEL || MODEL;

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const analyzeImage = async (file) => {
    setPreview(URL.createObjectURL(file));
    setStatus("loading");
    setLoadingMsg(copy.loadingReading);
    setError("");

    try {
      if (!apiKey) {
        throw new Error("VITE_GEMINI_API_KEY is missing in your .env file.");
      }

      const base64 = await toBase64(file);
      setLoadingMsg(copy.loadingAnalyzing);

      const response = await fetch(`${API_URL}/${model}:generateContent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  inlineData: {
                    mimeType: file.type,
                    data: base64
                  }
                },
                { text: PROMPT }
              ]
            }
          ],
          generationConfig: {
            responseMimeType: "application/json"
          }
        })
      });

      if (!response.ok) {
        const responseText = await response.text();
        throw new Error(`API error: ${response.status} ${responseText}`);
      }

      const data = await response.json();
      const raw = data?.candidates?.[0]?.content?.parts?.map((item) => item.text || "").join("") || "";
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
      setStatus("done");
    } catch (analysisError) {
      console.error(analysisError);
      setError(analysisError.message || "Analysis failed. Please try again.");
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setResult(null);
    setPreview(null);
    setError("");
    setLoadingMsg("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at 10% 20%, rgba(46, 125, 50, 0.05) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(217, 119, 6, 0.03) 0%, transparent 50%), var(--bg)",
        fontFamily: "'Poppins', sans-serif",
        padding: "2rem 1rem",
        transition: "background 0.3s ease"
      }}
    >
      <div style={{ maxWidth: status === "done" ? 1200 : 520, margin: "0 auto", transition: "max-width 0.4s ease" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontSize: 54, marginBottom: 12, filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.06))" }}>🌾</div>
          <h1
            style={{
              fontFamily: "inherit",
              fontSize: 32,
              fontWeight: 700,
              color: "var(--text)",
              margin: "0 0 8px"
            }}
          >
            {copy.title}
          </h1>
          <p style={{ fontSize: 15.5, color: "var(--muted)", margin: 0 }}>
            {copy.description}
          </p>
        </div>

        {status === "idle" && <UploadZone onFile={analyzeImage} copy={copy} />}

        {status === "loading" && (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            {preview && (
              <img
                src={preview}
                alt="Soil preview"
                style={{ width: "100%", maxHeight: 220, objectFit: "cover", borderRadius: 20, marginBottom: 24, boxShadow: "var(--shadow-sm)", border: "1px solid var(--border)" }}
              />
            )}
            <div
              style={{
                width: 44,
                height: 44,
                border: "3px solid var(--border)",
                borderTopColor: "var(--primary)",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
                margin: "0 auto 16px"
              }}
            />
            <p style={{ color: "var(--muted)", fontSize: 15 }}>{loadingMsg}</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {status === "error" && (
          <div style={{ textAlign: "center", padding: "2rem", background: "var(--surface)", borderRadius: 20, border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
            <p style={{ color: "var(--danger)", fontSize: 15, marginBottom: 16 }}>⚠️ {error}</p>
            <button
              onClick={reset}
              style={{
                padding: "10px 24px",
                borderRadius: 10,
                border: "1.5px solid var(--border)",
                background: "var(--surface)",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 600,
                color: "var(--text)"
              }}
            >
              {copy.tryAgain}
            </button>
          </div>
        )}

        {status === "done" && result && (
          <Results result={result} onReset={reset} lang={lang} copy={copy} preview={preview} />
        )}
      </div>
    </div>
  );
}
