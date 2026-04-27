import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import SectionHeader from "../components/SectionHeader";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

export default function ProfilePage() {
  const { profile, role, setRole, updateProfile } = useAppContext();
  const [formData, setFormData] = useState(profile);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      await updateProfile({ ...formData, role });
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
            <FormInput label="Farm Size" name="farmSize" value={formData.farmSize} onChange={handleChange} />
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
