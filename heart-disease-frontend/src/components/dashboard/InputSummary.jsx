import React from 'react';
import { User, Activity, Droplets, Zap, ShieldCheck, Heart } from 'lucide-react';

export default function InputSummary({ data }) {
  const getIcon = (key) => {
    const props = { size: 14, className: 'text-muted' };
    switch (key) {
      case 'Age':
        return <User {...props} />;
      case 'Sex':
        return <ShieldCheck {...props} />;
      case 'RestingBP':
        return <Activity {...props} />;
      case 'Cholesterol':
        return <Droplets {...props} />;
      case 'MaxHR':
        return <Zap {...props} />;
      default:
        return <Heart {...props} />;
    }
  };

  const getLabel = (key) => {
    switch (key) {
      case 'RestingBP':
        return 'BP';
      case 'FastingBS':
        return 'Sugar';
      case 'ChestPainType':
        return 'Pain';
      default:
        return key;
    }
  };

  const getInterpretation = (key, val) => {
    const v = Number(val);
    const warn = '#E10600';
    const ok = '#15803d';

    if (key === 'RestingBP') {
      if (v >= 140) return { t: 'High', c: warn };
      if (v >= 120) return { t: 'Elevated', c: warn };
      return { t: 'Normal', c: ok };
    }
    if (key === 'Cholesterol') {
      if (v >= 240) return { t: 'High', c: warn };
      if (v >= 200) return { t: 'Borderline', c: warn };
      return { t: 'Normal', c: ok };
    }
    if (key === 'FastingBS') {
      return v === 1 || v === '1' ? { t: 'High', c: warn } : { t: 'Normal', c: ok };
    }
    return null;
  };

  const keys = ['Age', 'RestingBP', 'Cholesterol', 'MaxHR', 'FastingBS'];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {keys.map((k) => {
        const interp = getInterpretation(k, data[k]);
        return (
          <div key={k} className="border border-line bg-cream px-3 py-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-muted">{getIcon(k)}</div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">{getLabel(k)}</span>
            </div>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-xl font-black text-ink tabular-nums">{data[k]}</span>
              {interp && (
                <span
                  className="text-[8px] font-semibold uppercase tracking-wider"
                  style={{ color: interp.c }}
                >
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
