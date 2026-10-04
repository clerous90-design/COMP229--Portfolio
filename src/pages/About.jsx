import React from 'react';

function About() {
  return (
    <div className="page-content">
      <h1>About Me</h1>
      
      <div className="about-container" style={{ display: 'flex', alignItems: 'center', gap: '30px', marginTop: '20px' }}>
        <div className="about-img-container">
          <img 
            src="/IMG_20241005_121443.jpg" 
            alt="Sarah Cleroux" 
            style={{ width: '220px', height: '220px', objectFit: 'cover', borderRadius: '50%' }} 
          />
        </div>
        
        <div className="about-text">
          <p>
            Hello! I'm Sarah Cleroux, a Software Engineering Technology student passionate about building clean, responsive, and functional digital experiences. 
          </p>
          <p>
            With a strong eye for detail and a drive for continuous learning, I love turning complex problems into elegant code solutions.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;