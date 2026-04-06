import React from 'react';
import { Stethoscope, HeartPulse, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

export default function RecommendationCard({ riskLevel }) {
  const red = '#E10600';
  const green = '#15803d';

  const getContent = () => {
    switch (riskLevel) {
      case 'High Risk':
        return {
          icon: <AlertTriangle size={22} style={{ color: red }} strokeWidth={2} />,
          border: 'border-line',
          title: 'Immediate cardiovascular consultation',
          subtitle: 'Urgent actions',
          items: [
            'Consult a board-certified cardiologist promptly.',
            'Monitor blood pressure and lipids closely.',
            'Discuss stress testing or ECG with your clinician.',
          ],
        };
      case 'Moderate Risk':
        return {
          icon: <HeartPulse size={22} style={{ color: red }} strokeWidth={2} />,
          border: 'border-line',
          title: 'Proactive health steps',
          subtitle: 'Prevention focus',
          items: [
            'Schedule a routine check-up with your provider.',
            'Adopt heart-healthy nutrition patterns.',
            'Aim for at least 150 minutes of moderate activity per week.',
          ],
        };
      default:
        return {
          icon: <CheckCircle size={22} style={{ color: green }} strokeWidth={2} />,
          border: 'border-line',
          title: 'Maintain your trajectory',
          subtitle: 'Favorable profile',
          items: [
            'Keep current activity and nutrition habits.',
            'Continue annual cardiovascular screening.',
            'Watch for new symptoms and report changes.',
          ],
        };
    }
  };

  const content = getContent();

  return (
    <div className={`border ${content.border} bg-white p-8 md:p-10`}>
      <div className="flex items-start gap-5 mb-8 pb-8 border-b border-line">
        <div className="w-12 h-12 border border-line flex items-center justify-center shrink-0 bg-cream">
          {content.icon}
        </div>
        <div>
          <h4 className="text-xl font-black text-ink tracking-tight">{content.title}</h4>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">{content.subtitle}</span>
        </div>
      </div>

      <ul className="space-y-0 divide-y divide-line border-t border-b border-line mb-8">
        {content.items.map((item, index) => (
          <li key={index} className="py-4 text-sm text-ink/80 leading-relaxed">
            {item}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between text-muted">
        <div className="flex items-center gap-2">
          <Stethoscope size={14} strokeWidth={2} />
          <span className="text-[10px] font-semibold uppercase tracking-widest">Guidance</span>
        </div>
        <ArrowRight size={14} strokeWidth={2} className="opacity-30" />
      </div>
    </div>
  );
}
