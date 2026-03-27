import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

export default function Tooltip({ text, children }) {
  const [show, setShow] = useState(false);

  return (
    <div 
      className="tooltip-container" 
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => setShow(!show)} // Mobile support
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'help' }}
    >
      {children}
      <Info size={14} className="info-icon" style={{ opacity: 0.6 }} />
      
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="tooltip-box"
            style={{
              position: 'absolute',
              bottom: 'calc(100% + 10px)',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#333',
              color: '#fff',
              padding: '8px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              lineHeight: '1.4',
              whiteSpace: 'normal',
              width: '200px',
              zIndex: 1000,
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              pointerEvents: 'none'
            }}
          >
            {text}
            {/* Arrow */}
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              borderWidth: '6px',
              borderStyle: 'solid',
              borderColor: '#333 transparent transparent transparent'
            }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
