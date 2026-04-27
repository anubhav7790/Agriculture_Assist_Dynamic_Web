import { useAppContext } from "../context/AppContext";
import SectionHeader from "../components/SectionHeader";

export default function ProtectiveEquipmentPage() {
  const { equipmentItems } = useAppContext();

  return (
    <div className="page-stack">
      <SectionHeader
        eyebrow="Safety Gear"
        title="Protective Equipment"
        description="Simple guidance on the basic gear farmers should use while spraying or handling agricultural chemicals."
      />
      <div className="equipment-grid">
        {equipmentItems.map((item) => (
          <article key={item.title} className="panel equipment-card">
            <span className="equipment-icon">{item.icon}</span>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
