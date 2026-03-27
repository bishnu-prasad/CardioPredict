import React, { useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import gsap from 'gsap';

export default function Navbar({ isDark, setIsDark }) {
  const navRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  return (
    <nav ref={navRef} className="navbar" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <span className="nav-logo-text" style={{ fontSize: '20px' }}>CardioPredict </span>
        </Link>
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
          <NavLink to="/predict" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Predict</NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Dashboard</NavLink>
          <NavLink to="/learn" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Learn</NavLink>
        </div>
        <div className="nav-right">
          <button className="theme-btn" onClick={() => setIsDark(!isDark)}>
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
}
