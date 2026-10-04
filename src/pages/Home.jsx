import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page-content">
      <h1>Welcome to My Portfolio</h1>
      <br></br>
      <p className="subtitle">Hi, I'm Sarah, a Software Engineering Technician student building modern web applications.</p>
      <div className="cta-container">
        <Link to="/projects" className="btn-primary">View My Work</Link> 
        <br></br>
        <br></br>
        <Link to="/contact" className="btn-secondary">Get in Touch</Link>
      </div>
    </div>
  );
}

export default Home;