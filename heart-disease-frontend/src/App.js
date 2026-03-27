import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import "./App.css";

import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Predict from "./components/Predict";
import Dashboard from "./components/Dashboard"; // NEW
import Learn from "./components/Learn";
import Footer from "./components/Footer";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, hash]);
  return null;
}

// Wrapper for AnimatePresence
function AnimatedRoutes({ isDark, setIsDark }) {
  const location = useLocation();
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState(null);
  
  return (
    <div className="page">
      <ScrollToTop />
      <div className="blobs">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <div className="layer">
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', minHeight: 'calc(100vh - 64px)' }}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Landing />} />
            <Route 
              path="/predict" 
              element={<Predict result={result} setResult={setResult} formData={formData} setFormData={setFormData} />} 
            />
            <Route 
              path="/dashboard" 
              element={<Dashboard result={result} formData={formData} setResult={setResult} />} 
            />
            <Route path="/learn" element={<Learn />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(false);

  // Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08 });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // Theme apply
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <Router>
      <AnimatedRoutes isDark={isDark} setIsDark={setIsDark} />
    </Router>
  );
}