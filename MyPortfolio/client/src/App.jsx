import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Education from './pages/Education';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Signin from './pages/SignIn';
import Signup from './pages/Signup';

import './App.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000';

function App() {
  const [auth, setAuth] = useState({ token: null, user: null });

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken || savedUser) {
      try {
        setAuth({
          token: savedToken,
          user: savedUser ? JSON.parse(savedUser) : null,
        });
      } catch {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleAuthSuccess = (data) => {
    setAuth({
      token: data.token || localStorage.getItem('token'),
      user: data.user || null,
    });
  };

  const handleSignout = async () => {
    try {
      await fetch(`${API_BASE}/auth/signout`, {
        method: 'GET',
        credentials: 'include',
        headers: auth.token ? { Authorization: `Bearer ${auth.token}` } : {},
      });
    } catch {
      // Clear local auth state even if the signout request encounters a network issue
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setAuth({ token: null, user: null });
    }
  };

  return (
    <Router>
      <div className="app-container">
        {/* Sidebar Navigation */}
        <nav className="sidebar">
          {/* Custom Logo Area */}
          <div className="logo-container">
            <img src="/logo.png" alt="Portfolio Logo" className="site-logo" />
          </div>

          <hr className="sidebar-divider" />

          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/projects" className="nav-link">Projects</Link>
          <Link to="/education" className="nav-link">Education</Link>
          <Link to="/services" className="nav-link">Services</Link>
          <Link to="/contact" className="nav-link">Contact</Link>

          <hr className="sidebar-divider" />

          {auth.user ? (
            <>
              <span className="nav-link">
                {auth.user.name || auth.user.email} ({auth.user.role || 'User'})
              </span>
              <button type="button" onClick={handleSignout} className="nav-link">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="nav-link">Sign In</Link>
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </>
          )}
        </nav>

        {/* Main Content Area */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home auth={auth} />} />
            <Route path="/about" element={<About auth={auth} />} />
            <Route path="/projects" element={<Projects auth={auth} />} />
            <Route path="/education" element={<Education auth={auth} />} />
            <Route path="/services" element={<Services auth={auth} />} />
            <Route path="/contact" element={<Contact auth={auth} />} />
            <Route
              path="/signin"
              element={<Signin onAuthSuccess={handleAuthSuccess} />}
            />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;