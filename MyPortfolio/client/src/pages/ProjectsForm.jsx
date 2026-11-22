import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:3000";

const INITIAL_PROJECT = {
  title: "",
  description: "",
  technologies: "",
  repoUrl: "",
  liveUrl: "",
};

export default function ProjectForm({
  initialData = null,
  onSaved,
  onDeleted,
  onCancel,
}) {
  const [formData, setFormData] = useState(INITIAL_PROJECT);
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
        description: initialData.description || "",
        technologies: Array.isArray(initialData.technologies)
          ? initialData.technologies.join(", ")
          : initialData.technologies || "",
        repoUrl: initialData.repoUrl || "",
        liveUrl: initialData.liveUrl || "",
      });
    } else {
      setFormData(INITIAL_PROJECT);
    }
  }, [initialData]);

  if (!isAdmin) {
    return (
      <p className="role-notice">
        Admin privileges are required to add or edit projects.
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
      ? `${API_BASE}/api/projects/${initialData._id}`
      : `${API_BASE}/api/projects`;
    const method = isEditing ? "PUT" : "POST";

    const payload = {
      ...formData,
      technologies: formData.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean),
    };

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || data.error || "Failed to save project");
      }

      setStatus({
        loading: false,
        error: "",
        message: isEditing ? "Project updated." : "Project added.",
      });

      if (!isEditing) {
        setFormData(INITIAL_PROJECT);
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
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    setStatus({ loading: true, error: "", message: "" });
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_BASE}/api/projects/${initialData._id}`, {
        method: "DELETE",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || data.error || "Failed to delete project");
      }

      setFormData(INITIAL_PROJECT);
      setStatus({
        loading: false,
        error: "",
        message: "Project deleted.",
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
      <h2>{initialData?._id ? "Edit Project" : "Add Project"}</h2>

      {status.error && <div className="form-error">{status.error}</div>}
      {status.message && <div className="form-success">{status.message}</div>}

      <div className="form-field">
        <label htmlFor="project-title">Project Title</label>
        <input
          id="project-title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., CampusConnect"
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="project-description">Description</label>
        <textarea
          id="project-description"
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          placeholder="What the project does and your role"
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="project-tech">Technologies (comma-separated)</label>
        <input
          id="project-tech"
          type="text"
          name="technologies"
          value={formData.technologies}
          onChange={handleChange}
          placeholder="e.g., React, Node.js, Express, MongoDB"
        />
      </div>

      <div className="form-field">
        <label htmlFor="project-repo">Repository URL</label>
        <input
          id="project-repo"
          type="url"
          name="repoUrl"
          value={formData.repoUrl}
          onChange={handleChange}
          placeholder="https://github.com/..."
        />
      </div>

      <div className="form-field">
        <label htmlFor="project-live">Live / Demo URL</label>
        <input
          id="project-live"
          type="url"
          name="liveUrl"
          value={formData.liveUrl}
          onChange={handleChange}
          placeholder="https://..."
        />
      </div>

      <div className="form-field">
  <label htmlFor="project-image">Image Path</label>
  <input
    id="project-image"
    type="text"
    name="image"
    value={formData.image}
    onChange={handleChange}
    placeholder="/project1.png"
  />
</div>

      <div className="form-actions">
        <button type="submit" disabled={status.loading}>
          {status.loading
            ? "Saving..."
            : initialData?._id
            ? "Update Project"
            : "Save Project"}
        </button>

        {initialData?._id && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={status.loading}
          >
            Delete Project
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