import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import "./App.css";

import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Predict from "./components/Predict";
import Dashboard from "./components/Dashboard";
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

function MainLayout() {
  const location = useLocation();
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState(null);
  
  return (
    <div className="relative min-h-screen flex flex-col items-center bg-cream text-ink">
      <ScrollToTop />

      <Navbar />
      
      <main className="w-full relative z-10 flex flex-col items-center flex-1">
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
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  // Lenis Smooth Scroll Initialization
  useEffect(() => {
    const lenis = new Lenis({ 
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    
    return () => lenis.destroy();
  }, []);

  return (
    <Router>
      <MainLayout />
    </Router>
  );
}