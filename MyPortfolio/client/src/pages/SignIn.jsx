import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthPages.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:3000";

export default function Signin({ onAuthSuccess }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ loading: false, error: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: "", message: "" });

    try {
      const res = await fetch(`${API_BASE}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || data.error || "Failed to sign in");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      if (onAuthSuccess) {
        onAuthSuccess(data);
      }

      setStatus({ loading: false, error: "", message: "Signed in successfully." });
      navigate("/");
    } catch (err) {
      setStatus({ loading: false, error: err.message, message: "" });
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <h1>Sign In</h1>
        <p className="auth-subtitle">
          Sign in to access your account and role-based portfolio features.
        </p>

        {status.error && <div className="auth-error">{status.error}</div>}
        {status.message && <div className="auth-success">{status.message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="signin-email">Email</label>
            <input
              id="signin-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="signin-password">Password</label>
            <input
              id="signin-password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={status.loading}
          >
            {status.loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="auth-switch-text">
          Need an account?{" "}
          <Link to="/signup" className="auth-switch-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}