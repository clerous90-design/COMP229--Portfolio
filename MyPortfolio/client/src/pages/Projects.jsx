import React, { useCallback, useEffect, useState } from "react";
import ProjectForm from "./ProjectsForm";
import "./PortfolioForms.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:3000";

const INITIAL_PROJECTS = [
  {
    _id: null,
    title: "Current project - React Portfolio Website",
    description:
      "A fully responsive, multi-page personal portfolio built using React, Vite, and React Router with custom branding.",
    image: "/project1.png",
    tags: ["React", "Vite", "CSS"],
  },
  {
    _id: null,
    title: "Past Project - Software Engineering Task Manager",
    description:
      "A collaborative task tracking tool designed for software development workflows with priority tagging and status filtering.",
    image: "/project2.png",
    tags: ["Draw.IO", "JavaScript", "CSS"],
  },
  {
    _id: null,
    title: "Past Project - Enterprise Car Rental Management System",
    description:
      "A comprehensive car rental management system with user authentication, booking management, and reporting features.",
    image: "/project3.png",
    tags: ["Oracle", "Draw.IO", "Java"],
  },
];

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const isAdmin = storedUser?.role === "Admin";

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/projects`);
      if (!res.ok) {
        setProjects([]);
        return;
      }
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const itemsToRender = projects.length > 0 ? projects : INITIAL_PROJECTS;

  return (
    <div className="page-content">
      <h1>My Projects</h1>
      <br />
      <p style={{ color: "#b0a6d7", marginBottom: "30px" }}>
        Here is a selection of recent applications and systems I have built and designed.
      </p>

      {isAdmin && (
        <div style={{ marginBottom: "30px", maxWidth: "600px" }}>
          <ProjectForm
            initialData={editingProject}
            onSaved={() => {
              setEditingProject(null);
              fetchProjects();
            }}
            onDeleted={() => {
              setEditingProject(null);
              fetchProjects();
            }}
            onCancel={editingProject ? () => setEditingProject(null) : undefined}
          />
        </div>
      )}

      {loading ? (
        <p style={{ color: "#d0c9e8" }}>Loading projects...</p>
      ) : (
        <div
          className="projects-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "25px",
          }}
        >
          {itemsToRender.map((project, index) => {
            const tags = Array.isArray(project.tags)
              ? project.tags
              : Array.isArray(project.technologies)
              ? project.technologies
              : [];

            return (
              <div
                key={project._id || index}
                className="project-card"
                style={{
                  background: "#1e1b2e",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid #362e59",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  className="project-img-container"
                  style={{
                    height: "180px",
                    overflow: "hidden",
                    backgroundColor: "#2a2542",
                  }}
                >
                  <img
                    src={project.image || "/project1.png"}
                    alt={project.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div
                  className="project-info"
                  style={{
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                  }}
                >
                  <h3 style={{ color: "#fff", marginBottom: "10px" }}>
                    {project.title}
                  </h3>
                  <p
                    style={{
                      color: "#d0c9e8",
                      fontSize: "0.95rem",
                      lineHeight: "1.5",
                      marginBottom: "20px",
                      flexGrow: 1,
                    }}
                  >
                    {project.description}
                  </p>

                  {tags.length > 0 && (
                    <div
                      className="project-tags"
                      style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
                    >
                      {tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          style={{
                            backgroundColor: "#362e59",
                            color: "#d0c9e8",
                            padding: "4px 10px",
                            borderRadius: "6px",
                            fontSize: "0.8rem",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {isAdmin && project._id && (
                    <div className="form-actions" style={{ marginTop: "16px" }}>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProject(project);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Projects;