import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ title }) => {
  const data = {
    labels: ['Aktif', 'Dipinjam', 'Rusak'],
    datasets: [
      {
        data: [40, 30, 30],
        backgroundColor: ['#4ade80', '#facc15', '#f87171'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // agar bisa ditentukan tinggi manual
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div style={{ width: '200px', height: '200px', margin: 'auto' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
