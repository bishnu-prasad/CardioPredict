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
  if (bp >= 140) insights.push({ color: "#ff6b6b", text: <span><strong>High Blood Pressure:</strong> Your blood pressure is elevated, which can strain your heart and arteries.</span> });
  else if (bp >= 120) insights.push({ color: "#f5b041", text: <span><strong>Slightly Elevated Blood Pressure:</strong> This is an early warning sign and should be monitored.</span> });
  else insights.push({ color: "#22c55e", text: <span><strong>Healthy Blood Pressure:</strong> Your blood pressure is in a normal, healthy range.</span> });

  // 2. CHOLESTEROL
  if (cholesterol >= 240) insights.push({ color: "#ff6b6b", text: <span><strong>High Cholesterol:</strong> Elevated cholesterol increases your risk of heart disease.</span> });
  else if (cholesterol >= 200) insights.push({ color: "#f5b041", text: <span><strong>Borderline Cholesterol:</strong> Your levels are slightly high and should be monitored.</span> });
  else insights.push({ color: "#22c55e", text: <span><strong>Healthy Cholesterol:</strong> Your cholesterol levels are completely normal.</span> });

  // 3. FASTING BLOOD SUGAR
  if (sugar === 1 || sugar === "1") insights.push({ color: "#ff6b6b", text: <span><strong>Elevated Blood Sugar:</strong> High blood sugar is a risk factor for heart health.</span> });
  else insights.push({ color: "#22c55e", text: <span><strong>Normal Blood Sugar:</strong> Your blood sugar levels are healthy.</span> });


  // 4. MAX HEART RATE (Age-Relative)
  const thr = (220 - age) * 0.6;
  if (maxHR < thr && maxHR > 0) insights.push({ color: "#f5b041", text: <span><strong>Heart Rate Concern:</strong> Your maximum heart rate during exercise is lower than expected for your age.</span> });

  // FALLBACK
  const allNormal = bp < 120 && cholesterol < 200 && sugar === 0;
  if (allNormal && insights.length === 3) {
      return (
        <div className="explanation-insight-box">
           <div className="explain-item">
              <ShieldCheck size={18} color="#22c55e" />
              <span className="explain-text"><strong>All major factors look great.</strong> Your profile suggests a very healthy cardiovascular system.</span>
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
        <span>AI Health Analysis</span>
      </div>
    </div>
  );
}
