import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const LineChartcomponent = ({ data = [] }) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="bulan" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="kerusakan" stroke="#007bff" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LineChartcomponent;

