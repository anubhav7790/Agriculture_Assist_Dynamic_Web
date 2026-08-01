import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SectionHeader from "../components/SectionHeader";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

const maxUploadBytes = 8 * 1024 * 1024;

function resizeImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();

      image.onload = () => {
        const maxSize = 1200;
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);

        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.78));
      };

      image.onerror = () => reject(new Error("Unable to read this image. Please try another one."));
      image.src = reader.result;
    };

    reader.onerror = () => reject(new Error("Unable to read this image. Please try another one."));
    reader.readAsDataURL(file);
  });
}

export default function AddListingPage() {
  const navigate = useNavigate();
  const { addListing, profile, showToast } = useAppContext();
  const [submitting, setSubmitting] = useState(false);
  const profileDistrict = (profile.address || "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .at(-2) || "";
  const [formData, setFormData] = useState({
    cropName: "",
    price: "",
    quantity: "",
    district: profileDistrict,
    location: "",
    phone: profile.phone || "",
    image: "",
    description: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setFormData((current) => ({ ...current, image: "" }));
      return;
    }

    if (!file.type.startsWith("image/")) {
      showToast("Please select a valid crop image.", "error");
      event.target.value = "";
      return;
    }

    if (file.size > maxUploadBytes) {
      showToast("Image size should be below 8 MB.", "error");
      event.target.value = "";
      return;
    }

    try {
      const imageData = await resizeImageFile(file);
      setFormData((current) => ({ ...current, image: imageData }));
    } catch (error) {
      showToast(error.message, "error");
      event.target.value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const quantityKg = Number(formData.quantity);

    if (!Number.isFinite(quantityKg) || quantityKg < 30) {
      showToast("Enter crop quantity of 30 kg or more.", "error");
      return;
    }

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
        description="Publish an available crop with clear quantity, district, price, photo, and contact details."
      />
      <form className="panel listing-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <FormInput label="Crop Name" name="cropName" value={formData.cropName} onChange={handleChange} required />
          <FormInput label="Price (Rs / kg)" name="price" type="number" min="1" step="0.01" value={formData.price} onChange={handleChange} required />
          <FormInput label="Quantity (kg)" name="quantity" type="number" min="30" step="1" value={formData.quantity} onChange={handleChange} placeholder="Minimum 30 kg" required />
          <FormInput label="District" name="district" value={formData.district} onChange={handleChange} placeholder="eg. Pune" required />
          <FormInput label="Village / Market Location" name="location" value={formData.location} onChange={handleChange} placeholder="eg. Baramati APMC" required />
          <FormInput label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required />
          <label className="form-field">
            <span>Crop Image</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>
        </div>
        {formData.image ? (
          <div className="listing-image-preview">
            <img src={formData.image} alt="Selected crop preview" />
          </div>
        ) : null}
        <p className="form-helper">
          Listings below 30 kg are not accepted. Buyers and farmers will see listings from their selected district.
        </p>
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
