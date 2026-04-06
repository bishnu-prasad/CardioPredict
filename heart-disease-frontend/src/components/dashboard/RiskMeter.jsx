import React, { useEffect, useState, useRef } from 'react';
import { animate, motion } from 'framer-motion';

/** Presentational risk ring; kept for reuse. Dashboard uses large typographic % instead. */
export default function RiskMeter({ probability, colorClass }) {
  const radius = 100;
  let strokeColor = '#15803d';
  if (colorClass === 'danger' || colorClass === 'warn') {
    strokeColor = '#E10600';
  }

  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const pct = (probability * 100).toFixed(1);

  const [strokeDashoffset, setDashOffset] = useState(circumference);
  const countRef = useRef(null);

  useEffect(() => {
    const offset = circumference - probability * circumference;
    const timer = setTimeout(() => setDashOffset(offset), 200);

    if (countRef.current) {
      const controls = animate(0, parseFloat(pct), {
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1],
        onUpdate(cur) {
          if (countRef.current) {
            countRef.current.textContent = `${cur.toFixed(1)}%`;
          }
        },
      });
      return () => {
        clearTimeout(timer);
        controls.stop();
      };
    }
    return () => clearTimeout(timer);
  }, [probability, circumference, pct]);

  return (
    <div className="flex justify-center items-center py-6">
      <div className="relative" style={{ width: radius * 2, height: radius * 2 }}>
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="text-line"
          />
          <motion.circle
            stroke={strokeColor}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{
              strokeDashoffset,
              transition: 'stroke-dashoffset 1.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeLinecap="butt"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-4xl font-black tracking-tight tabular-nums"
            style={{ color: strokeColor }}
            ref={countRef}
          >
            0.0%
          </motion.span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted mt-1">Probability</span>
        </div>
      </div>
    </div>
  );
}
