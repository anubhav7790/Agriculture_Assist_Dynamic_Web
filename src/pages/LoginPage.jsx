import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, showToast } = useAppContext();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ emailOrPhone: "", password: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      await login(formData);
      navigate("/dashboard");
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Login</p>
        <h1>Welcome back</h1>
        <p>Access your farm dashboard, crop listings, and advisory tools.</p>
        <FormInput
          label="Email / Phone"
          name="emailOrPhone"
          value={formData.emailOrPhone}
          onChange={(event) =>
            setFormData((current) => ({ ...current, emailOrPhone: event.target.value }))
          }
          placeholder="Enter email or phone"
          required
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={(event) =>
            setFormData((current) => ({ ...current, password: event.target.value }))
          }
          placeholder="Enter password"
          required
        />
        <button type="button" className="text-link">
          Forgot Password?
        </button>
        <Button type="submit">{submitting ? "Logging in..." : "Login"}</Button>
        <p className="auth-switch">
          New user? <Link to="/register">Create account</Link>
        </p>
      </form>
    </section>
  );
}
