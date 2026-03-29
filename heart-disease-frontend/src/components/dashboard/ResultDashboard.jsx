import React from 'react';
import { ChevronLeft, RefreshCw, BarChart2, Info, Activity, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';
import RiskMeter from './RiskMeter';
import FeatureChart from './FeatureChart';
import ExplanationBox from './ExplanationBox';
import InputSummary from './InputSummary';
import RecommendationCard from './RecommendationCard';

export default function ResultDashboard({ result, formData, onReset }) {
  const probability = result.probability; // Exact match with backend (0.0 to 1.0)
  const pct = (probability * 100).toFixed(1);
  
  // CENTRAL MEDICAL LOGIC
  let riskLevel = "Low Risk";
  let colorClass = "safe";
  
  if (probability >= 0.70) {
    riskLevel = "High Risk";
    colorClass = "danger";
  } else if (probability >= 0.30) {
    riskLevel = "Moderate Risk";
    colorClass = "warn";
  }

  return (
    <motion.div 
      className="result-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="dash-header">
        <div className="header-titles">
          <h2 className="dash-title">Comprehensive Cardiac Report</h2>
          <p className="dash-subtitle">Analyzed Probability & Clinical Correlations</p>
        </div>
        <div className="dash-actions">
          <button className="dash-btn secondary" onClick={onReset}>
            <ChevronLeft size={16} /> Edit Data
          </button>
          <button className="dash-btn primary" onClick={() => window.location.reload()}>
            <RefreshCw size={16} /> New Assessment
          </button>
        </div>
      </div>

      <div className="dash-grid-top">
        {/* TOP LEFT: Risk Meter */}
        <div className={`dash-card risk-card glow-${colorClass}`}>
          <div className="card-header-simple">
            <HeartPulse size={18} />
            <span>Risk Classification</span>
          </div>
          <div className="risk-meter-layout">
            <RiskMeter probability={probability} colorClass={colorClass} />
          </div>
          <div className="risk-statement">
            <h3 className={`statement-title ${colorClass}`}>{riskLevel}</h3>
            <div className="confidence-badge">
              Confidence: {Math.max(probability, 1 - probability).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 0})}
            </div>
            <p className="statement-desc">
              Clinical probability is calculated at <strong>{pct}%</strong> based on multivariate model analysis.
            </p>
          </div>
        </div>

        {/* TOP RIGHT: AI & Recommendations */}
        <div className="dash-sections-stacked">
            <div className="dash-card explanation-card" style={{ flex: 1 }}>
                <div className="card-header-simple">
                    <Info size={18} />
                    <span>Why this prediction?</span>
                </div>
                <ExplanationBox data={formData} />
            </div>
            
            <RecommendationCard riskLevel={riskLevel} colorClass={colorClass} />
        </div>
      </div>

      <div className="dash-sections-stacked" style={{ marginTop: '20px' }}>
        {/* MIDDLE: Feature Chart (Full Width) */}
        <div className="dash-card chart-card-full">
          <div className="card-header-simple">
            <BarChart2 size={18} />
            <span>Primary Influence Factors</span>
          </div>
          <FeatureChart importance={result.importance} />
        </div>

        {/* BOTTOM: Patient Summary (Full Width) */}
        <div className="dash-card summary-card-full">
          <div className="card-header-simple">
            <Activity size={18} />
            <span>Clinical Value Mapping</span>
          </div>
          <InputSummary data={formData} />
        </div>
      </div>

      <div className="medical-disclaimer dash-disclaimer" style={{ marginTop: '40px', paddingBottom: '40px', textAlign: 'center', fontSize: '13px', color: 'var(--text-3)' }}>
        ⚠️ This application is for educational purposes only. The results are not guaranteed and should not be used for medical diagnosis. Always consult a qualified doctor.
      </div>
    </motion.div>
  );
}
