import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const BarChartcomponent = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChartcomponent data={data}>
          <XAxis dataKey="kategori" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="jumlah" fill="#007bff" />
        </BarChartcomponent>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChartcomponent;
