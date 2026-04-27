import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SectionHeader from "../components/SectionHeader";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

export default function SoilUploadPage() {
  const navigate = useNavigate();
  const { addSoilReport, showToast } = useAppContext();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ n: "", p: "", k: "", ph: "", crop: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      await addSoilReport({
        crop: formData.crop,
        n: Number(formData.n),
        p: Number(formData.p),
        k: formData.k === "" ? "" : Number(formData.k),
        ph: Number(formData.ph)
      });
      navigate("/soil/recommendations");
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-stack">
      <SectionHeader
        eyebrow="Soil Health"
        title="Upload Soil Data"
        description="Enter crop name, N, P, K, and pH values to generate a detailed English and Hindi soil analysis."
      />
      <form className="panel soil-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <FormInput label="Crop Name" name="crop" value={formData.crop} onChange={handleChange} required />
          <FormInput label="Nitrogen (N)" name="n" type="number" value={formData.n} onChange={handleChange} required />
          <FormInput label="Phosphorus (P)" name="p" type="number" value={formData.p} onChange={handleChange} required />
          <FormInput label="Potassium (K) - Optional" name="k" type="number" value={formData.k} onChange={handleChange} />
          <FormInput label="pH Value" name="ph" type="number" value={formData.ph} onChange={handleChange} required />
        </div>
        <Button type="submit" className="fit-btn">
          {submitting ? "Analyzing Soil..." : "Submit for AI Analysis"}
        </Button>
      </form>
    </div>
  );
}
