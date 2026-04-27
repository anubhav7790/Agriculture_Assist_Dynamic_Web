import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SectionHeader from "../components/SectionHeader";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

export default function AddListingPage() {
  const navigate = useNavigate();
  const { addListing, showToast } = useAppContext();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    cropName: "",
    price: "",
    quantity: "",
    location: "",
    phone: "",
    image: "",
    description: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      await addListing(formData);
      navigate("/marketplace");
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-stack">
      <SectionHeader
        eyebrow="New Marketplace Listing"
        title="Add Crop Listing"
        description="Fill in the crop details so buyers can contact you directly without any middleman."
      />
      <form className="panel listing-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <FormInput label="Crop Name" name="cropName" value={formData.cropName} onChange={handleChange} required />
          <FormInput label="Price (Rs / kg)" name="price" type="number" value={formData.price} onChange={handleChange} required />
          <FormInput label="Quantity" name="quantity" value={formData.quantity} onChange={handleChange} required />
          <FormInput label="Location" name="location" value={formData.location} onChange={handleChange} required />
          <FormInput label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required />
          <FormInput label="Image URL / Upload Path" name="image" value={formData.image} onChange={handleChange} />
        </div>
        <label className="form-field">
          <span>Description</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe crop quality, freshness, dispatch details, or organic notes"
            rows="5"
          />
        </label>
        <Button type="submit" className="fit-btn">
          {submitting ? "Publishing..." : "Publish Listing"}
        </Button>
      </form>
    </div>
  );
}
