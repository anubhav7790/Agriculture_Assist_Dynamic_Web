import { useAppContext } from "../context/AppContext";
import SectionHeader from "../components/SectionHeader";

const pageCopy = {
  en: {
    eyebrow: "Safety Gear",
    title: "Protective Equipment",
    description:
      "Use the right gear before mixing, spraying, and washing equipment to reduce chemical exposure.",
    priorityLabel: "Priority",
    noteTitle: "Farmer checklist",
    note:
      "Keep one dedicated spraying kit at the farm. Never use safety gloves or boots inside the home kitchen or sleeping area."
  },
  hi: {
    eyebrow: "सुरक्षा उपकरण",
    title: "व्यक्तिगत सुरक्षा उपकरण",
    description:
      "दवा मिलाने, छिड़काव करने और मशीन साफ करने से पहले सही सुरक्षा उपकरण पहनें ताकि रसायनों का असर कम हो।",
    priorityLabel: "प्राथमिकता",
    noteTitle: "किसान चेकलिस्ट",
    note:
      "खेत के लिए एक अलग स्प्रे सुरक्षा किट रखें। दस्ताने या बूट को घर की रसोई या सोने की जगह पर उपयोग न करें।"
  }
};

const priorityMap = {
  en: {
    Required: "Required",
    Recommended: "Recommended",
    Emergency: "Emergency"
  },
  hi: {
    Required: "ज़रूरी",
    Recommended: "सुझावित",
    Emergency: "आपात"
  }
};

export default function ProtectiveEquipmentPage() {
  const { equipmentItems, language } = useAppContext();
  const lang = language === "hi" ? "hi" : "en";
  const copy = pageCopy[lang];

  return (
    <div className="page-stack">
      <SectionHeader eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
      <div className="equipment-grid">
        {equipmentItems.map((item) => (
          <article key={item.title} className="panel equipment-card safety-equipment-card">
            <div className="equipment-card-top">
              <span className="equipment-icon">{item.icon}</span>
              <span className={`equipment-priority ${item.priority.toLowerCase()}`}>{priorityMap[lang][item.priority] || item.priority}</span>
            </div>
            <h3>{lang === "hi" ? item.titleHi : item.title}</h3>
            <p>{lang === "hi" ? item.detailHi : item.detail}</p>
          </article>
        ))}
      </div>
      <section className="panel provider-note">
        <h3>{copy.noteTitle}</h3>
        <p>{copy.note}</p>
      </section>
    </div>
  );
}
