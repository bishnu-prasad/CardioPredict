import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Activity, ShieldCheck, BrainCircuit } from 'lucide-react';

export default function HeroVisual() {
  return (
    <div className="hero-right">
      <motion.div 
        className="floating-card"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ background: 'rgba(136, 189, 242, 0.1)', p: '6px', borderRadius: '8px' }}>
              <HeartPulse size={18} color="#88BDF2" />
            </div>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase' }}>Real-time Analysis</span>
          </div>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff6b6b', boxShadow: '0 0 10px #ff6b6b' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          {/* Mock Meter */}
          <div style={{ position: 'relative', width: '160px', height: '160px' }}>
            <svg width="160" height="160" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,0.05)" strokeWidth="10" fill="transparent" />
              <motion.circle 
                cx="80" cy="80" r="70" stroke="#ff6b6b" strokeWidth="10" 
                fill="transparent" strokeDasharray="440" strokeDashoffset="123" 
                strokeLinecap="round"
                initial={{ strokeDashoffset: 440 }}
                animate={{ strokeDashoffset: 123 }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <span style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-1)' }}>72%</span>
              <p style={{ fontSize: '10px', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '1px' }}>Risk</p>
            </div>
          </div>

          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <StatRow icon={<Activity size={14} />} label="Blood Pressure" value="142/90" status="High" color="#ff6b6b" />
            <StatRow icon={<ShieldCheck size={14} />} label="Cholesterol" value="238 mg/dl" status="Borderline" color="#f5b041" />
            <StatRow icon={<BrainCircuit size={14} />} label="Fasting Sugar" value="105 mg/dl" status="Normal" color="#22c55e" />
          </div>
        </div>

        {/* Floating Accent Blobs */}
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '100px', height: '100px', background: 'rgba(136, 189, 242, 0.1)', filter: 'blur(40px)', zIndex: -1 }} />
      </motion.div>
    </div>
  );
}

function StatRow({ icon, label, value, status, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ opacity: 0.6 }}>{icon}</div>
        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-2)' }}>{label}</span>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: 'var(--text-1)' }}>{value}</p>
        <span style={{ fontSize: '9px', fontWeight: 700, color: color, textTransform: 'uppercase' }}>{status}</span>
      </div>
    </div>
  );
}
