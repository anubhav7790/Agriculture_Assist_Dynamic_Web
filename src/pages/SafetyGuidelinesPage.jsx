import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { fetchSafetyGuidelines } from "../services/api";
import SectionHeader from "../components/SectionHeader";
import Loader from "../components/Loader";

export default function SafetyGuidelinesPage() {
  const { chemicals } = useAppContext();
  const [selected, setSelected] = useState(chemicals[0].name);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchSafetyGuidelines(chemicals).then(() => {
      if (active) {
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [chemicals]);

  const activeChemical = chemicals.find((chemical) => chemical.name === selected);

  return (
    <div className="page-stack">
      <SectionHeader
        eyebrow="Health & Safety"
        title="Safety Guidelines"
        description="Select a chemical to view usage instructions in a clear and farmer-friendly format."
      />
      {loading ? (
        <Loader message="Loading safety guidance..." />
      ) : (
        <section className="panel">
          <label className="form-field max-field">
            <span>Select Chemical</span>
            <select value={selected} onChange={(event) => setSelected(event.target.value)}>
              {chemicals.map((chemical) => (
                <option key={chemical.name} value={chemical.name}>
                  {chemical.name}
                </option>
              ))}
            </select>
          </label>
          <div className="safety-highlight">
            <h3>{activeChemical.name}</h3>
            <p>{activeChemical.instruction}</p>
          </div>
        </section>
      )}
    </div>
  );
}
