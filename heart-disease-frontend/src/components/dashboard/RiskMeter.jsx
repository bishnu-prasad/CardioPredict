import React, { useEffect, useState } from 'react';
import { animate } from 'framer-motion';

export default function RiskMeter({ probability, colorClass }) {
  const radius = 100;
  
  // COLOR MAPPING
  let strokeColor = "#22c55e"; // safe (Green)
  let shadowColor = "rgba(34, 197, 94, 0.4)";
  let glowColor = "rgba(34, 197, 94, 0.2)";
  
  if (colorClass === "danger") {
    strokeColor = "#ff6b6b"; // High (Red)
    shadowColor = "rgba(255, 107, 107, 0.4)";
    glowColor = "rgba(255, 107, 107, 0.2)";
  } else if (colorClass === "warn") {
    strokeColor = "#f5b041"; // Moderate (Yellow)
    shadowColor = "rgba(245, 176, 65, 0.4)";
    glowColor = "rgba(245, 176, 65, 0.2)";
  }

  // REFINED THICKNESS (v2)
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const pct = (probability * 100).toFixed(1);
  
  const [strokeDashoffset, setDashOffset] = useState(circumference);
  const countRef = React.useRef(null);

  useEffect(() => {
    // Animate stroke
    const offset = circumference - (probability) * circumference;
    setTimeout(() => setDashOffset(offset), 100);

    // Animate number
    if (countRef.current) {
      const controls = animate(0, parseFloat(pct), {
        duration: 1.5,
        ease: "easeOut",
        onUpdate(cur) {
          if (countRef.current) {
            countRef.current.textContent = cur.toFixed(1) + '%';
          }
        }
      });
      return () => controls.stop();
    }
  }, [probability, circumference, pct]);

  return (
    <div className="risk-meter-container" style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '10px 0' }}>
      <div style={{ position: 'relative', width: radius * 2, height: radius * 2 }}>
        <svg height={radius * 2} width={radius * 2} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            stroke="rgba(255, 255, 255, 0.08)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeLinecap="round"
          />
          <circle
            stroke={strokeColor}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ 
              strokeDashoffset, 
              transition: 'stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)' 
            }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeLinecap="round"
            filter={`drop-shadow(0 0 12px ${shadowColor})`}
          />
        </svg>
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%'
        }}>
          <span className="risk-pct-text" ref={countRef} style={{ 
            color: strokeColor, 
            fontWeight: 600, 
            textShadow: `0px 2px 8px ${glowColor}`,
            letterSpacing: '-1px',
            lineHeight: 1,
            marginBottom: '8px' // Spacing below percentage (v2)
          }}>
            0.0%
          </span>
          <span style={{ 
            fontSize: '12px', 
            color: 'var(--text-3)', 
            textTransform: 'uppercase', 
            letterSpacing: '1px', 
            fontWeight: 400, // Lighter (v2)
            opacity: 0.7
          }}>
            score
          </span>
        </div>
      </div>
    </div>
  );
}
