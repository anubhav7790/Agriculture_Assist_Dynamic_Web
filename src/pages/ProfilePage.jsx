import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import SectionHeader from "../components/SectionHeader";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

export default function ProfilePage() {
  const { profile, role, setRole, showToast, updateProfile } = useAppContext();
  const [formData, setFormData] = useState(profile);
  const [saving, setSaving] = useState(false);
  const [farmSizeValue, setFarmSizeValue] = useState("");
  const [farmSizeUnit, setFarmSizeUnit] = useState("Acres");

  useEffect(() => {
    setFormData(profile);
    if (profile.farmSize) {
      const match = String(profile.farmSize).match(/^([\d.]+)\s*(.*)$/);
      if (match) {
        setFarmSizeValue(match[1]);
        setFarmSizeUnit(match[2] || "Acres");
      } else {
        setFarmSizeValue(profile.farmSize);
        setFarmSizeUnit("Acres");
      }
    } else {
      setFarmSizeValue("");
      setFarmSizeUnit("Acres");
    }
  }, [profile]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleFarmSizeValueChange = (event) => {
    const val = event.target.value;
    setFarmSizeValue(val);
    setFormData((current) => ({
      ...current,
      farmSize: val ? `${val} ${farmSizeUnit}` : ""
    }));
  };

  const handleFarmSizeUnitChange = (event) => {
    const unit = event.target.value;
    setFarmSizeUnit(unit);
    setFormData((current) => ({
      ...current,
      farmSize: farmSizeValue ? `${farmSizeValue} ${unit}` : ""
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      await updateProfile({ ...formData, role });
      showToast("Profile saved successfully");
    } catch (error) {
      showToast(error.message || "Unable to save profile right now.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page-stack">
      <SectionHeader
        eyebrow="Profile"
        title="Farmer / Buyer Profile"
        description="Switch role-based UI and keep your contact and farm details updated."
      />
      <section className="dashboard-grid">
        <form className="panel" onSubmit={handleSubmit}>
          <div className="form-grid">
            <FormInput label="Name" name="name" value={formData.name} onChange={handleChange} />
            <FormInput label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
            <FormInput label="Email" name="email" value={formData.email} onChange={handleChange} />
            <FormInput label="Address" name="address" value={formData.address} onChange={handleChange} />
            <div className="form-field">
              <span>Farm Size</span>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="number"
                  step="any"
                  name="farmSizeValue"
                  value={farmSizeValue}
                  onChange={handleFarmSizeValueChange}
                  placeholder="e.g. 5"
                  style={{ flex: 1 }}
                />
                <select
                  name="farmSizeUnit"
                  value={farmSizeUnit}
                  onChange={handleFarmSizeUnitChange}
                  style={{ width: "130px" }}
                >
                  <option value="Acres">Acres</option>
                  <option value="Hectares">Hectares</option>
                  <option value="Bigha">Bigha</option>
                  <option value="Kanal">Kanal</option>
                </select>
              </div>
            </div>
            <FormInput label="Crop Focus" name="cropFocus" value={formData.cropFocus} onChange={handleChange} />
          </div>
          <Button type="submit" className="fit-btn">
            {saving ? "Saving..." : "Save Profile"}
          </Button>
        </form>

        <div className="panel">
          <h3>Role-Based Mode</h3>
          <p>Choose whether you mostly use the platform as a farmer or as a buyer.</p>
          <div className="role-toggle">
            <button
              type="button"
              className={`role-chip ${role === "Farmer" ? "active-chip" : ""}`}
              onClick={() => setRole("Farmer")}
            >
              Farmer
            </button>
            <button
              type="button"
              className={`role-chip ${role === "Buyer" ? "active-chip" : ""}`}
              onClick={() => setRole("Buyer")}
            >
              Buyer
            </button>
          </div>
          <div className="profile-note">
            <p>
              <strong>Active Mode:</strong> {role}
            </p>
            <p>
              Farmers can list crops quickly, while buyers can use search and favorites to compare listings.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
