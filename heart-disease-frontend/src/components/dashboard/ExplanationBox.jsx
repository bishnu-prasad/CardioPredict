import React from 'react';
import { Lightbulb, ChevronRight, ShieldCheck } from 'lucide-react';

export default function ExplanationBox({ data }) {
  const insights = [];
  
  const age = Number(data.Age);
  const cholesterol = Number(data.Cholesterol);
  const bp = Number(data.RestingBP);
  const maxHR = Number(data.MaxHR);
  const sugar = Number(data.FastingBS);

  // 1. BLOOD PRESSURE
  if (bp >= 140) insights.push({ color: "#ff6b6b", text: <span><strong>Hypertension detected:</strong> High blood pressure (≥140) contributes to significant heart strain and vascular stress.</span> });
  else if (bp >= 120) insights.push({ color: "#f5b041", text: <span><strong>Pre-hypertension:</strong> Elevated blood pressure levels (120-139) indicate an early risk factor.</span> });
  else insights.push({ color: "#22c55e", text: <span><strong>Blood pressure is optimal:</strong> Current levels (&lt;120) are within the medically recommended range.</span> });

  // 2. CHOLESTEROL
  if (cholesterol >= 240) insights.push({ color: "#ff6b6b", text: <span><strong>High Cholesterol (≥240):</strong> Significantly increases cardiovascular risk through arterial plaque buildup.</span> });
  else if (cholesterol >= 200) insights.push({ color: "#f5b041", text: <span><strong>Borderline High Cholesterol:</strong> Levels (200-239) should be monitored to prevent cardiac complications.</span> });
  else insights.push({ color: "#22c55e", text: <span><strong>Cholesterol is Normal:</strong> Sergio serum levels (&lt;200) maintain good cardiovascular health.</span> });

  // 3. FASTING BLOOD SUGAR
  if (sugar === 1 || sugar === "1") insights.push({ color: "#ff6b6b", text: <span><strong>Elevated glucose detected:</strong> Fasting sugar &gt;120 mg/dl indicates potential diabetic/metabolic risk.</span> });
  else insights.push({ color: "#22c55e", text: <span><strong>Glucose levels normal:</strong> Fasting blood sugar is within the target range.</span> });


  // 4. MAX HEART RATE (Age-Relative)
  const thr = (220 - age) * 0.6;
  if (maxHR < thr && maxHR > 0) insights.push({ color: "#f5b041", text: <span><strong>Max Heart Rate concern:</strong> A value lower than age-relative thresholds ({thr.toFixed(0)} bpm) suggests reduced cardiac reserve.</span> });

  // FALLBACK
  const allNormal = bp < 120 && cholesterol < 200 && sugar === 0;
  if (allNormal && insights.length === 3) {
      return (
        <div className="explanation-insight-box">
           <div className="explain-item">
              <ShieldCheck size={18} color="#22c55e" />
              <span className="explain-text"><strong>All major clinical markers are within normal range.</strong> Our AI analysis suggests a high probability of cardiovascular stability based on the provided inputs.</span>
           </div>
        </div>
      );
  }

  return (
    <div className="explanation-insight-box">
      <div className="explanation-list">
        {insights.map((ins, i) => (
          <div key={i} className="explain-item">
            <div style={{ marginTop: '3px' }}><ChevronRight size={16} color={ins.color} strokeWidth={3} /></div>
            <span className="explain-text">{ins.text}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-3)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        <Lightbulb size={14} color="#f5b041" />
        <span>Clinical Narrative Generation</span>
      </div>
    </div>
  );
}
