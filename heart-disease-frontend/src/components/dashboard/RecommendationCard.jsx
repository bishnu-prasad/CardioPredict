import React from 'react';
import { Stethoscope, HeartPulse, AlertTriangle, CheckCircle } from 'lucide-react';

export default function RecommendationCard({ riskLevel, colorClass }) {
  const getContent = () => {
    switch (riskLevel) {
      case "High Risk":
        return {
          icon: <AlertTriangle size={24} color="#ff6b6b" />,
          bgColor: "rgba(255, 107, 107, 0.08)",
          borderColor: "rgba(255, 107, 107, 0.2)",
          title: "Urgent Medical Consultation Recommended",
          items: [
            "Strongly recommend consulting a cardiologist immediately",
            "Immediate lifestyle and dietary changes required",
            "Further diagnostic tests (ECG, Stress Test) suggested"
          ]
        };
      case "Moderate Risk":
        return {
          icon: <HeartPulse size={24} color="#f5b041" />,
          bgColor: "rgba(245, 176, 65, 0.08)",
          borderColor: "rgba(245, 176, 65, 0.2)",
          title: "Proactive Health Monitoring Suggested",
          items: [
            "Closely monitor blood pressure and sugar levels",
            "Consult a healthcare professional if any symptoms appear",
            "Review dietary habits and increase moderate physical activity"
          ]
        };
      default:
        return {
          icon: <CheckCircle size={24} color="#22c55e" />,
          bgColor: "rgba(34, 197, 94, 0.08)",
          borderColor: "rgba(34, 197, 94, 0.2)",
          title: "Maintain Current Healthy Trajectory",
          items: [
            "Continue maintaining a healthy, active lifestyle",
            "Ensure a balanced diet rich in heart-healthy nutrients",
            "Regular annual checkups are recommended for baseline monitoring"
          ]
        };
    }
  };

  const content = getContent();

  return (
    <div className={`dash-card reco-card reco-${colorClass}`} style={{ 
      background: content.bgColor, 
      border: `1px solid ${content.borderColor}`,
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          padding: '10px', 
          borderRadius: '12px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          {content.icon}
        </div>
        <div>
          <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-1)' }}>{content.title}</h4>
          <span style={{ fontSize: '12px', color: 'var(--text-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Professional Guidance</span>
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {content.items.map((item, index) => (
          <div key={index} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <div style={{ marginTop: '6px', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-3)', flexShrink: 0 }} />
            <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--text-2)', lineHeight: '1.5' }}>{item}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '8px', padding: '10px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Stethoscope size={14} color="var(--text-3)" />
        <span style={{ fontSize: '11px', color: 'var(--text-3)', fontWeight: 600 }}>Disclaimer: This is an AI assessment. Consult a doctor for clinical diagnosis.</span>
      </div>
    </div>
  );
}
