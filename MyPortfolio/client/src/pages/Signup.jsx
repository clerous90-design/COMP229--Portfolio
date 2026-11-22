import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthPages.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:3000";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState({ loading: false, error: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: "", message: "" });

    try {
 const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role: "User" }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || data.error || "Failed to create account");
      }

      setStatus({
        loading: false,
        error: "",
        message: "Account created! Redirecting to Sign In...",
      });
      setTimeout(() => navigate("/signin"), 900);
    } catch (err) {
      setStatus({ loading: false, error: err.message, message: "" });
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <h1>Sign Up</h1>
        <p className="auth-subtitle">
          Create a standard user account to view portfolio entries.
        </p>

        {status.error && <div className="auth-error">{status.error}</div>}
        {status.message && <div className="auth-success">{status.message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="signup-name">Name</label>
            <input
              id="signup-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              minLength={6}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={status.loading}
          >
            {status.loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="auth-switch-text">
          Already have an account?{" "}
          <Link to="/signin" className="auth-switch-link">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}