import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const RED = '#E10600';

export default function FeatureChart({ importance }) {
  if (!importance) return null;
  const data = Object.keys(importance)
    .map((key) => ({ name: key, value: Number((Math.abs(importance[key]) * 100).toFixed(1)) }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return (
    <div className="w-full h-64 sm:h-72 mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 24, left: 8, bottom: 5 }} barSize={22}>
          <XAxis type="number" hide />
          <YAxis
            dataKey="name"
            type="category"
            tick={{ fill: '#6B6B6B', fontSize: 11, fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
            width={120}
          />
          <Tooltip
            cursor={{ fill: 'rgba(225, 6, 0, 0.06)' }}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #E5E5E5',
              borderRadius: '4px',
              boxShadow: 'none',
              padding: '10px 12px',
            }}
            itemStyle={{ color: RED, fontWeight: 700, textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.08em' }}
            formatter={(val) => [`${val}%`, 'Weight']}
          />
          <Bar dataKey="value" radius={[0, 2, 2, 0]} animationDuration={900} animationEasing="ease-out">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? RED : `rgba(225, 6, 0, ${0.75 - index * 0.12})`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
