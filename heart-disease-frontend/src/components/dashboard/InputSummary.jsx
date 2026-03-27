import React from 'react';
import { User, Activity, Droplets, Zap, ShieldCheck, Heart } from 'lucide-react';

export default function InputSummary({ data }) {
  const getIcon = (key) => {
    switch (key) {
      case 'Age': return <User size={14} />;
      case 'Sex': return <ShieldCheck size={14} />;
      case 'RestingBP': return <Activity size={14} />;
      case 'Cholesterol': return <Droplets size={14} />;
      case 'MaxHR': return <Zap size={14} />;
      default: return <Heart size={14} />;
    }
  };

  const getLabel = (key) => {
    switch (key) {
      case 'RestingBP': return 'Pressure';
      case 'FastingBS': return 'Sugar';
      case 'ChestPainType': return 'Type';
      default: return key;
    }
  };

  const getInterpretation = (key, val) => {
    const v = Number(val);
    if (key === 'RestingBP') {
      if (v >= 140) return { t: 'High', c: '#ff6b6b' };
      if (v >= 120) return { t: 'Elevated', c: '#f5b041' };
      return { t: 'Normal', c: '#22c55e' };
    }
    if (key === 'Cholesterol') {
      if (v >= 240) return { t: 'High', c: '#ff6b6b' };
      if (v >= 200) return { t: 'Borderline', c: '#f5b041' };
      return { t: 'Normal', c: '#22c55e' };
    }
    if (key === 'FastingBS') {
      return v === 1 ? { t: 'High', c: '#ff6b6b' } : { t: 'Normal', c: '#22c55e' };
    }
    return null;
  };

  const keys = ['Age', 'RestingBP', 'Cholesterol', 'MaxHR', 'FastingBS'];

  return (
    <div className="summary-card-grid">
      {keys.map(k => {
        const interp = getInterpretation(k, data[k]);
        return (
          <div key={k} className="mini-stat-card">
            <div className="mini-stat-header">
              {getIcon(k)}
              <span className="mini-stat-label">{getLabel(k)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', justifyContent: 'center' }}>
              <span className="mini-stat-value">{data[k]}</span>
              {interp && (
                <span style={{ fontSize: '10px', fontWeight: 700, color: interp.c, textTransform: 'uppercase' }}>
                  {interp.t}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
