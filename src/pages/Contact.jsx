

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const navigate = useNavigate(); // 2. Initialize the navigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Optional: You can handle backend message sending logic here later.
    
    // 3. Redirect back to the Home page ('/')
    navigate('/');
  };

  return (
    <div className="page-content">
      <h1>Get in Touch</h1>
      <p style={{ color: '#b0a6d7', marginBottom: '25px' }}>
        Have a question, a project proposal, or just want to connect? Reach out directly or send a message below!
      </p>

      {/* Your Contact Info Section */}
      <div className="contact-info-box" style={{ background: '#1e1b2e', padding: '20px 25px', borderRadius: '12px', border: '1px solid #362e59', marginBottom: '30px', maxWidth: '600px' }}>
        <h3 style={{ color: '#fff', marginBottom: '10px', fontSize: '1.1rem' }}>Direct Details</h3>
        <p style={{ color: '#d0c9e8', margin: '6px 0' }}>
          <strong>Email:</strong> <a href="mailto: scleroux@my.centennialcollege.ca" style={{ color: '#9952e6', textDecoration: 'underline' }}>scleroux@my.centennialcollege.ca</a>
        </p>
        <p style={{ color: '#d0c9e8', margin: '6px 0' }}>
          <strong>Location:</strong> Ontario, Canada
          </p>

        <p style={{ color: '#d0c9e8', margin: '6px 0' }}>
          <strong> GitHub:</strong> <a href="https://github.com/clerous90-design" target="_blank" rel="noopener noreferrer" style={{ color: '#9952e6', textDecoration: 'underline' }}>clerous90-design</a>
        </p>
      </div>

      {/* Interactive Form Section */}
      <form onSubmit={handleSubmit} className="contact-form" style={{ background: '#1e1b2e', padding: '30px', borderRadius: '12px', border: '1px solid #362e59', maxWidth: '600px' }}>
        <h3 style={{ color: '#fff', marginBottom: '20px', fontSize: '1.1rem' }}>Send Me a Message</h3>
        
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', color: '#d0c9e8', marginBottom: '8px', fontSize: '0.95rem' }}>Your Name</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            placeholder="e.g. Jane Doe"
            style={{ width: '100%', padding: '12px', background: '#2a2542', border: '1px solid #362e59', borderRadius: '8px', color: '#fff', fontSize: '1rem' }}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', color: '#d0c9e8', marginBottom: '8px', fontSize: '0.95rem' }}>Your Email</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            placeholder="e.g. jane@example.com"
            style={{ width: '100%', padding: '12px', background: '#2a2542', border: '1px solid #362e59', borderRadius: '8px', color: '#fff', fontSize: '1rem' }}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', color: '#d0c9e8', marginBottom: '8px', fontSize: '0.95rem' }}>Your Message</label>
          <textarea 
            name="message" 
            rows="5" 
            value={formData.message} 
            onChange={handleChange} 
            required 
            placeholder="Type your message here..."
            style={{ width: '100%', padding: '12px', background: '#2a2542', border: '1px solid #362e59', borderRadius: '8px', color: '#fff', fontSize: '1rem', resize: 'vertical' }}
          />
        </div>

        <button 
          type="submit" 
          style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #7e22ce, #a855f7)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', transition: 'opacity 0.2s' }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;