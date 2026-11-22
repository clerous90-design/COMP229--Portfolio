import React, { useCallback, useEffect, useState } from "react";
import EducationForm from "./EducationForm"; // update path if saved in a different folder
import "./PortfolioForms.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:3000";

function Education() {
  const [qualifications, setQualifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null); // 1. Track item being edited

  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const isAdmin = storedUser?.role === "Admin";

  const fetchQualifications = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/qualifications`);
      if (!res.ok) {
        setQualifications([]);
        return;
      }
      const data = await res.json();
      setQualifications(Array.isArray(data) ? data : []);
    } catch {
      setQualifications([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQualifications();
  }, [fetchQualifications]);

  return (
    <div className="page-content">
      <h2>Education & Credentials</h2>

      {/* 2. Pass editing item + refresh callbacks into EducationForm for Admin */}
      {isAdmin && (
        <EducationForm
          initialData={editingItem}
          onSaved={() => {
            setEditingItem(null);
            fetchQualifications();
          }}
          onDeleted={() => {
            setEditingItem(null);
            fetchQualifications();
          }}
          onCancel={editingItem ? () => setEditingItem(null) : undefined}
        />
      )}

      {loading ? (
        <p>Loading education records...</p>
      ) : qualifications.length > 0 ? (
        <div className="edu-list">
          {qualifications.map((item) => (
            <div className="edu-item" key={item._id}>
              <h3>{item.title}</h3>
              <p className="institution">
                {item.institution}
                {item.year ? ` | ${item.year}` : ""}
              </p>
              {item.description && <p>{item.description}</p>}

              {/* 3. Admin-only Edit button that loads this item into the form */}
              {isAdmin && (
                <div className="form-actions" style={{ marginTop: "12px" }}>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingItem(item);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="edu-item">
          <h3>Software Engineering Technician Diploma</h3>
          <p className="institution">Centennial College | 2025 – Present</p>
          <p>
            Focused on full-stack development, software design principles, and
            modern web frameworks.
          </p>

          <h3>Industrial Mechanical Millwright Technician</h3>
          <p className="institution">Cambrian College | 2012 – 2014</p>
          <p>
            Specialized in industrial machinery maintenance, precision
            measurement, and mechanical systems.
          </p>
        </div>
      )}
    </div>
  );
}

export default Education;