import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import gsap from 'gsap';

export default function Learn() {
  const contentRef = React.useRef(null);

  React.useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.1 }
      );
    }
  }, []);

  return (
    <motion.div className="section form-section" style={{ alignItems: 'flex-start', paddingTop: '40px', width: '100%' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-3)', fontSize: '14px', marginBottom: '25px', display: 'inline-block', fontWeight: 600 }}>← Back to Home</Link>
      <h2 className="section-title" style={{ width: '100%', textAlign: 'left', marginBottom: '10px' }}>Learn More</h2>
      <p style={{ color: 'var(--text-3)', marginBottom: '30px', fontSize: '15px' }}>Understanding heart disease predictions, features, and functionality.</p>
      <div className="divider" />
      
      <div ref={contentRef} className="glass-card" style={{ padding: '40px 48px', width: '100%', display: 'flex', flexDirection: 'column', gap: '30px', textAlign: 'left' }}>
        
        <div id="about">
          <h3 style={{ color: 'var(--text-1)', fontSize: '18px', marginBottom: '10px' }}>A. About the Project</h3>
          <p style={{ color: 'var(--text-2)', fontSize: '14.5px', lineHeight: 1.6 }}>
            Heart disease is the leading cause of death globally. Early detection of cardiovascular markers significantly saves lives and improves treatment outcomes. This system helps assess underlying risks using machine learning based on a patient's clinical markers.
          </p>
        </div>

        <div id="how-it-works">
          <h3 style={{ color: 'var(--text-1)', fontSize: '18px', marginBottom: '10px' }}>B. How This App Works</h3>
          <p style={{ color: 'var(--text-2)', fontSize: '14.5px', lineHeight: 1.6 }}>
            The app collects 11 specific clinical diagnostic features securely on the frontend. The data is processed by a FastAPI backend using a pre-trained ML classifier (like Random Forest or XGBoost) to predict the probability of heart disease presence. It also extracts feature importance to show which conditions had the biggest impact on the final decision.
          </p>
        </div>

        <div id="input-guide">
          <h3 style={{ color: 'var(--text-1)', fontSize: '18px', marginBottom: '10px' }}>C. Input Glossary</h3>
          <ul style={{ color: 'var(--text-2)', fontSize: '14.5px', lineHeight: 1.7, paddingLeft: '20px' }}>
            <li><strong>Age:</strong> The patient's biological age in years.</li>
            <li><strong>RestingBP:</strong> Resting blood pressure measured in mm Hg upon hospital admission.</li>
            <li><strong>Cholesterol:</strong> Serum cholesterol in mg/dl. High cholesterol increases heart risk.</li>
            <li><strong>FastingBS:</strong> Fasting blood sugar level. 1 = &gt;120 mg/dl; 0 = otherwise.</li>
            <li><strong>MaxHR:</strong> Maximum heart rate achieved during physical stress or test.</li>
            <li><strong>ChestPainType:</strong> Type of chest pain (Angina, Atypical, Non-Anginal, Asymptomatic).</li>
            <li><strong>ST Depression (Oldpeak):</strong> Depression in the ST segment of an ECG induced by exercise.</li>
          </ul>
        </div>
        
        <div id="privacy" style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', marginTop: '10px' }}>
          <p style={{ color: 'var(--text-3)', fontSize: '12.5px', fontWeight: 600 }}>⚠️ DISCLAIMER: This tool is for educational and demonstrative purposes only.</p>
          <p id="terms" style={{ color: 'var(--text-3)', fontSize: '12.5px', fontWeight: 600, marginTop: '8px' }}>By using this app, you agree to these terms of service and our data privacy structure.</p>
        </div>

      </div>
    </motion.div>
  );
}
