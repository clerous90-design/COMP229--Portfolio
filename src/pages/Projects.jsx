
import React from 'react';

function Projects() {
  const projectList = [
    {
      title: " Current project - React Portfolio Website",
      description: "A fully responsive, multi-page personal portfolio built using React, Vite, and React Router with custom branding.",
      image: "/project1.png",
      tags: ["React", "Vite", "CSS"]
    },
    {
      title: "Past Project -Software Engineering Task Manager",
      description: "A collaborative task tracking tool designed for software development workflows with priority tagging and status filtering.",
      image: "/project2.png",
      tags: ["Draw.IO", "JavaScript", "CSS"]
    },
    {
      title: " Past Project - Enterprise Car Rental Management System",
      description: "A comprehensive car rental management system with user authentication, booking management, and reporting features.",
      image: "/project3.png",
      tags: ["Oracle", "Draw.IO", "Java"]
    }
  ];

  return (
    <div className="page-content">
      <h1>My Projects</h1>
      <br></br>
      <p style={{ color: '#b0a6d7', marginBottom: '30px' }}>
        Here is a selection of recent applications and systems I have built and designed.
      </p>

      <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
        {projectList.map((project, index) => (
          <div key={index} className="project-card" style={{ background: '#1e1b2e', borderRadius: '12px', overflow: 'hidden', border: '1px solid #362e59', display: 'flex', flexDirection: 'column' }}>
            
            <div className="project-img-container" style={{ height: '180px', overflow: 'hidden', backgroundColor: '#2a2542' }}>
              <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div className="project-info" style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <h3 style={{ color: '#fff', marginBottom: '10px' }}>{project.title}</h3>
              <p style={{ color: '#d0c9e8', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '20px', flexGrow: 1 }}>
                {project.description}
              </p>

              <div className="project-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} style={{ backgroundColor: '#362e59', color: '#d0c9e8', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;