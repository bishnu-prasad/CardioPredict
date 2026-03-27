import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, ArrowRight, BrainCircuit } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState() {
  return (
    <motion.div 
      className="empty-state-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '65vh', 
        textAlign: 'center',
        padding: '20px'
      }}
    >
      <div className="empty-state-card dash-card" style={{ 
        maxWidth: '500px', 
        padding: '60px 40px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <motion.div 
          className="empty-icon-wrap"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ 
            width: '80px', 
            height: '80px', 
            background: 'rgba(136, 189, 242, 0.1)', 
            borderRadius: '24px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginBottom: '32px'
          }}
        >
          <Heart size={40} color="#88BDF2" fill="rgba(136, 189, 242, 0.2)" />
        </motion.div>
        
        <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-1)', marginBottom: '12px', letterSpacing: '-0.5px' }}>
          No Prediction Yet
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-3)', lineHeight: '1.6', marginBottom: '32px', maxWidth: '320px' }}>
          Enter patient details in the prediction engine to generate your first AI-powered cardiac report.
        </p>
        
        <Link to="/predict" className="dash-btn primary" style={{ textDecoration: 'none', padding: '14px 28px' }}>
          <span>Start Prediction</span>
          <ArrowRight size={18} style={{ marginLeft: '8px' }} />
        </Link>
        
        <div style={{ marginTop: '40px', display: 'flex', gap: '20px', opacity: 0.5 }}>
          <Activity size={18} color="var(--text-3)" />
          <BrainCircuit size={18} color="var(--text-3)" />
          <Heart size={18} color="var(--text-3)" />
        </div>
      </div>
    </motion.div>
  );
}
