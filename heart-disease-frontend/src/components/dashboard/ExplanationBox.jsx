import React from 'react';
import { Lightbulb, CheckCircle2 } from 'lucide-react';

export default function ExplanationBox({ data }) {
  const insights = [];

  const bp = Number(data.RestingBP);
  const cholesterol = Number(data.Cholesterol);
  const sugar = Number(data.FastingBS);

  if (bp >= 140)
    insights.push({
      color: '#E10600',
      label: 'High BP',
      text: 'Elevated blood pressure strains your cardiovascular system.',
    });
  else if (bp >= 120)
    insights.push({
      color: '#E10600',
      opacity: 0.85,
      label: 'Elevated BP',
      text: 'Pre-hypertension levels detected; monitoring recommended.',
    });
  else
    insights.push({
      color: '#15803d',
      label: 'Normal BP',
      text: 'Resting blood pressure is within the optimal range.',
    });

  if (cholesterol >= 240)
    insights.push({
      color: '#E10600',
      label: 'High cholesterol',
      text: 'High serum cholesterol is a primary risk factor for heart disease.',
    });
  else if (cholesterol >= 200)
    insights.push({
      color: '#E10600',
      opacity: 0.85,
      label: 'Borderline',
      text: 'Cholesterol levels are at the upper limit of normal.',
    });
  else
    insights.push({
      color: '#15803d',
      label: 'Healthy cholesterol',
      text: 'Your cholesterol profile looks favorable.',
    });

  if (sugar === 1 || sugar === '1')
    insights.push({
      color: '#E10600',
      label: 'Elevated glucose',
      text: 'High fasting blood sugar indicates metabolic concerns.',
    });
  else
    insights.push({
      color: '#15803d',
      label: 'Normal glucose',
      text: 'Fasting blood sugar is within range.',
    });

  return (
    <div className="flex flex-col gap-4">
      <ul className="divide-y divide-line border-t border-b border-line">
        {insights.map((ins, i) => (
          <li key={i} className="py-6 flex gap-4">
            <div
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: ins.color, opacity: ins.opacity ?? 1 }}
            />
            <div className="min-w-0">
              <span
                className="text-sm md:text-base font-semibold uppercase tracking-widest block mb-1"
                style={{ color: ins.color, opacity: ins.opacity ?? 1 }}
              >
                {ins.label}
              </span>
              <p className="text-base md:text-lg text-ink/90 leading-relaxed">{ins.text}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-between text-muted">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 border border-line flex items-center justify-center">
            <Lightbulb size={14} className="text-accent" strokeWidth={2} />
          </div>
          <span className="text-sm md:text-base font-semibold uppercase tracking-widest">Clinical notes</span>
        </div>
        <CheckCircle2 size={16} className="text-line" strokeWidth={2} />
      </div>
    </div>
  );
}
