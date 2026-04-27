import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, showToast } = useAppContext();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
    role: "Farmer"
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }
    try {
      setSubmitting(true);
      await register(formData);
      navigate("/dashboard");
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-page">
      <form className="auth-card large-auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Register</p>
        <h1>Create your account</h1>
        <div className="form-grid">
          <FormInput label="Name" name="name" value={formData.name} onChange={handleChange} required />
          <FormInput label="Phone" name="phone" value={formData.phone} onChange={handleChange} required />
          <FormInput label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          <FormInput label="Address" name="address" value={formData.address} onChange={handleChange} required />
          <label className="form-field">
            <span>Role</span>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="Farmer">Farmer</option>
              <option value="Buyer">Buyer</option>
            </select>
          </label>
          <FormInput label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />
          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">{submitting ? "Creating account..." : "Register"}</Button>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </section>
  );
}
