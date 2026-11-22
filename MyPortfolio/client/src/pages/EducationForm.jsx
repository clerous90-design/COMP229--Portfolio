import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:3000";

const INITIAL_EDUCATION = {
  title: "",
  institution: "",
  year: "",
  description: "",
};

export default function EducationForm({
  initialData = null,
  onSaved,
  onDeleted,
  onCancel,
}) {
  const [formData, setFormData] = useState(INITIAL_EDUCATION);
  const [status, setStatus] = useState({
    loading: false,
    error: "",
    message: "",
  });

  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const isAdmin = storedUser?.role === "Admin";

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        institution: initialData.institution || "",
        year: initialData.year || "",
        description: initialData.description || "",
      });
    } else {
      setFormData(INITIAL_EDUCATION);
    }
  }, [initialData]);

  if (!isAdmin) {
    return (
      <p className="role-notice">
        Admin privileges are required to add or edit education records.
      </p>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: "", message: "" });

    const token = localStorage.getItem("token");
    const isEditing = Boolean(initialData?._id);
    const url = isEditing
      ? `${API_BASE}/api/qualifications/${initialData._id}`
      : `${API_BASE}/api/qualifications`;
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.message || data.error || "Failed to save education record"
        );
      }

      setStatus({
        loading: false,
        error: "",
        message: isEditing
          ? "Education record updated."
          : "Education record added.",
      });

      if (!isEditing) {
        setFormData(INITIAL_EDUCATION);
      }
      if (onSaved) {
        onSaved(data);
      }
    } catch (err) {
      setStatus({ loading: false, error: err.message, message: "" });
    }
  };

  const handleDelete = async () => {
    if (!initialData?._id) return;
    if (!window.confirm("Are you sure you want to delete this education record?"))
      return;

    setStatus({ loading: true, error: "", message: "" });
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_BASE}/api/qualifications/${initialData._id}`, {
        method: "DELETE",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          data.message || data.error || "Failed to delete education record"
        );
      }

      setFormData(INITIAL_EDUCATION);
      setStatus({
        loading: false,
        error: "",
        message: "Education record deleted.",
      });

      if (onDeleted) {
        onDeleted(initialData._id);
      } else if (onSaved) {
        onSaved(null);
      }
    } catch (err) {
      setStatus({ loading: false, error: err.message, message: "" });
    }
  };

  return (
    <form className="portfolio-form" onSubmit={handleSubmit}>
      <h2>{initialData?._id ? "Edit Education" : "Add Education"}</h2>

      {status.error && <div className="form-error">{status.error}</div>}
      {status.message && <div className="form-success">{status.message}</div>}

      <div className="form-field">
        <label htmlFor="edu-title">Program / Credential Title</label>
        <input
          id="edu-title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Software Engineering Technology"
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="edu-institution">Institution</label>
        <input
          id="edu-institution"
          type="text"
          name="institution"
          value={formData.institution}
          onChange={handleChange}
          placeholder="e.g., Centennial College"
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="edu-year">Year / Period</label>
        <input
          id="edu-year"
          type="text"
          name="year"
          value={formData.year}
          onChange={handleChange}
          placeholder="e.g., 2025 - 2026"
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="edu-description">Description</label>
        <textarea
          id="edu-description"
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          placeholder="Key coursework, honors, or focus areas"
        />
      </div>

      <div className="form-actions">
        <button type="submit" disabled={status.loading}>
          {status.loading
            ? "Saving..."
            : initialData?._id
            ? "Update Education"
            : "Save Education"}
        </button>

        {initialData?._id && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={status.loading}
          >
            Delete Education
          </button>
        )}

        {onCancel && (
          <button type="button" onClick={onCancel} disabled={status.loading}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}