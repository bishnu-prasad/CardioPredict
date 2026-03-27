import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function FeatureChart({ importance }) {
  if (!importance) return null;
  const data = Object.keys(importance)
    .map(key => ({ name: key, value: Number((Math.abs(importance[key]) * 100).toFixed(1)) }))
    .sort((a,b) => b.value - a.value)
    .slice(0, 5);

  return (
    <div style={{ width: '100%', height: 240, marginTop: '5px' }}>
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }} barCategoryGap="20%">
          <defs>
            <linearGradient id="colorBar" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6A89A7" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="#88BDF2" stopOpacity={1}/>
            </linearGradient>
          </defs>
          <XAxis type="number" hide />
          <YAxis dataKey="name" type="category" tick={{ fill: 'var(--text-2)', fontSize: 13, fontWeight: 600 }} axisLine={false} tickLine={false} width={110} />
          <Tooltip 
            cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} 
            contentStyle={{ background: 'rgba(17, 24, 39, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', color: '#fff' }} 
            itemStyle={{ color: '#88BDF2', fontWeight: 700 }}
            formatter={(val) => [`${val}%`, 'Impact']}
          />
          <Bar dataKey="value" radius={[0, 8, 8, 0]} fill="url(#colorBar)" animationDuration={1000} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
