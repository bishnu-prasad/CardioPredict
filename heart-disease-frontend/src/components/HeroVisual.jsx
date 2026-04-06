import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Activity, ShieldCheck, BrainCircuit } from 'lucide-react';

export default function HeroVisual() {
  return (
    <div className="w-full max-w-md">
      <div className="border border-line bg-white p-8 md:p-10">
        <div className="flex justify-between items-center mb-10 pb-6 border-b border-line">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-line flex items-center justify-center">
              <HeartPulse size={20} className="text-accent" strokeWidth={2} />
            </div>
            <span className="text-xs font-semibold text-muted uppercase tracking-widest">Sample readout</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-accent" aria-hidden />
        </div>

        <div className="flex flex-col items-center gap-10">
          <div className="relative w-48 h-48">
            <svg width="192" height="192" className="transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="80"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                className="text-line"
              />
              <motion.circle
                cx="96"
                cy="96"
                r="80"
                stroke="#E10600"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray="502"
                strokeLinecap="butt"
                initial={{ strokeDashoffset: 502 }}
                animate={{ strokeDashoffset: 140 }}
                transition={{ duration: 1.8, ease: 'easeOut', delay: 0.2 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-ink tracking-tight">72%</span>
              <p className="text-[10px] font-semibold text-accent uppercase tracking-[0.2em] mt-1">High risk</p>
            </div>
          </div>

          <div className="w-full border border-line">
            <StatRow
              icon={<Activity size={16} strokeWidth={2} />}
              label="Blood pressure"
              value="142/90"
              status="High"
              statusColor="#E10600"
            />
            <StatRow
              icon={<ShieldCheck size={16} strokeWidth={2} />}
              label="Cholesterol"
              value="238 mg/dl"
              status="Borderline"
              statusColor="#E10600"
            />
            <StatRow
              icon={<BrainCircuit size={16} strokeWidth={2} />}
              label="Fasting sugar"
              value="105 mg/dl"
              status="Normal"
              statusColor="#15803d"
              isLast
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatRow({ icon, label, value, status, statusColor, isLast }) {
  return (
    <div
      className={`flex items-center justify-between gap-4 px-4 py-4 bg-white ${!isLast ? 'border-b border-line' : ''}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="text-muted shrink-0">{icon}</div>
        <span className="text-[10px] font-semibold text-muted uppercase tracking-wider truncate">{label}</span>
      </div>
      <div className="text-right shrink-0">
        <p className="text-sm font-bold text-ink">{value}</p>
        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: statusColor }}>
          {status}
        </span>
      </div>
    </div>
  );
}
