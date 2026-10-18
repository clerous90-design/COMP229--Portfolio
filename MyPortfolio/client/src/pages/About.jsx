import React from 'react';

function About() {
  return (
    <div className="page-content">
      <h1>About Me</h1>
      
      <div className="about-container" style={{ display: 'flex', alignItems: 'center', gap: '30px', marginTop: '20px', flexWrap: 'wrap' }}>
        
        {/* Left Side: Headshot */}
        <div className="about-img-container">
          <img 
            src="/IMG_20241005_121443.jpg" 
            alt="Sarah Cleroux" 
            style={{ width: '220px', height: '220px', objectFit: 'cover', borderRadius: '50%' }} 
          />
        </div>
        
        {/* Right Side: Text & Resume Button Grouped Together */}
        <div className="about-content-right" style={{ flex: '1', minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <p style={{ color: '#d0c9e8', lineHeight: '1.6', margin: 0 }}>
            Hello! I'm Sarah Cleroux, a Software Engineering Technology student passionate about building clean, responsive, and functional digital experiences. 
          </p>
          <p style={{ color: '#d0c9e8', lineHeight: '1.6', margin: 0 }}>
            With a strong eye for detail and a drive for continuous learning, I love turning complex problems into elegant code solutions.
          </p>
          
          <div className="about-resume-section" style={{ marginTop: '10px' }}>
            <a 
              href="/Portfolio_resume_2026.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'inline-block',
                backgroundColor: '#362e59', 
                color: '#ffffff', 
                padding: '12px 24px', 
                borderRadius: '8px', 
                textDecoration: 'none',
                fontWeight: 'bold',
                textAlign: 'center',
                whiteSpace: 'nowrap'
              }}
            >
              View / Download My Resume (PDF)
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;