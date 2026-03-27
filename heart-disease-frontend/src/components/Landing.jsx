import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import { Zap, ShieldCheck, BrainCircuit } from 'lucide-react';
import HeroVisual from './HeroVisual';

export default function Landing() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const el = containerRef.current;
    gsap.fromTo(el.querySelectorAll('.hero-fade'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.1 }
    );
  }, []);

  return (
    <motion.section 
      ref={containerRef}
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="hero-glow" />
      <div className="hero-blob blob-1" />
      <div className="hero-blob blob-2" />
      
      <div className="hero-left">
        <h1 className="hero-title hero-fade">
          Know Your <b>Heart Risk</b><br/>Before It Becomes Serious
        </h1>
        <p className="hero-sub hero-fade">
          Advanced machine learning models analyze your health data to detect early cardiovascular risk and provide clinical insights.
        </p>
        
        <div className="hero-fade">
          <div className="hero-actions">
            <button className="hero-cta" onClick={() => navigate('/predict')}>
              Start Free Prediction
            </button>
            <button className="hero-ghost" onClick={() => navigate('/learn')}>
              See How It Works
            </button>
          </div>

          <div className="trust-line">
            <div className="trust-item">
              <Zap size={14} color="#88BDF2" />
              <span>Instant Results</span>
            </div>
            <div className="trust-item">
              <ShieldCheck size={14} color="#88BDF2" />
              <span>Secure & Private</span>
            </div>
            <div className="trust-item">
              <BrainCircuit size={14} color="#88BDF2" />
              <span>AI-Powered</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-fade hero-visual-container">
        <HeroVisual />
      </div>
    </motion.section>
  );
}
